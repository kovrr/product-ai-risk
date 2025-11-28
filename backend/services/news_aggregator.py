import feedparser
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from sqlalchemy.orm import Session
from models.news_article import NewsArticle
import logging

logger = logging.getLogger(__name__)

# RSS Feed URLs for AI Governance sources
RSS_FEEDS = {
    "IAPP": {
        "url": "https://iapp.org/news/feed/",
        "source_url": "https://iapp.org",
        "keywords": ["AI", "artificial intelligence", "machine learning", "algorithm", "automated decision"]
    },
    "Compliance Week": {
        "url": "https://www.complianceweek.com/feed",
        "source_url": "https://complianceweek.com",
        "keywords": ["AI", "artificial intelligence", "technology risk", "data governance"]
    },
    # Note: CISO Series, GRC World Forums, and AI Governance Institute may not have public RSS feeds
    # We'll need to use web scraping or APIs if available
}

# Fallback: Manual curated sources (updated weekly)
CURATED_SOURCES = [
    {
        "source": "NIST",
        "url": "https://www.nist.gov/artificial-intelligence",
        "source_url": "https://nist.gov",
    },
    {
        "source": "EU AI Act",
        "url": "https://artificialintelligenceact.eu/",
        "source_url": "https://artificialintelligenceact.eu",
    }
]


def is_ai_governance_related(title: str, summary: str, keywords: List[str]) -> bool:
    """Check if article is related to AI governance based on keywords."""
    text = f"{title} {summary}".lower()
    return any(keyword.lower() in text for keyword in keywords)


def classify_article_type(title: str, summary: str) -> str:
    """Classify article type based on content."""
    text = f"{title} {summary}".lower()
    
    if any(word in text for word in ["regulation", "law", "act", "legislation", "enforcement"]):
        return "regulation"
    elif any(word in text for word in ["framework", "standard", "iso", "nist"]):
        return "framework"
    elif any(word in text for word in ["guidance", "guideline", "recommendation", "best practice"]):
        return "guidance"
    else:
        return "standard"


def extract_framework(title: str, summary: str) -> Optional[str]:
    """Extract framework name from article content."""
    text = f"{title} {summary}"
    
    frameworks = {
        "EU AI Act": ["eu ai act", "european ai act", "ai act"],
        "NIST AI RMF": ["nist ai", "nist rmf", "ai risk management framework"],
        "ISO 42001": ["iso 42001", "iso/iec 42001"],
        "GDPR": ["gdpr", "general data protection"],
        "UK GDPR": ["uk gdpr", "uk data protection"],
        "SEC Disclosure": ["sec", "securities and exchange"],
        "California SB 1047": ["sb 1047", "california ai"],
        "ISO/IEC 23894": ["iso 23894", "iso/iec 23894"],
    }
    
    for framework_name, patterns in frameworks.items():
        if any(pattern in text.lower() for pattern in patterns):
            return framework_name
    
    return "AI Governance"


async def fetch_rss_feed(feed_name: str, feed_config: Dict, db: Session) -> int:
    """Fetch and parse RSS feed, store new articles in database."""
    try:
        logger.info(f"Fetching RSS feed: {feed_name}")
        feed = feedparser.parse(feed_config["url"])
        
        new_articles = 0
        keywords = feed_config.get("keywords", [])
        
        for entry in feed.entries[:20]:  # Limit to 20 most recent
            # Check if article is AI governance related
            title = entry.get("title", "")
            summary = entry.get("summary", entry.get("description", ""))
            
            if not is_ai_governance_related(title, summary, keywords):
                continue
            
            # Check if article already exists
            url = entry.get("link", "")
            existing = db.query(NewsArticle).filter(NewsArticle.url == url).first()
            if existing:
                continue
            
            # Parse published date
            published_at = entry.get("published_parsed") or entry.get("updated_parsed")
            if published_at:
                published_at = datetime(*published_at[:6])
            else:
                published_at = datetime.now()
            
            # Create new article
            article = NewsArticle(
                title=title[:500],
                summary=summary[:1000] if summary else None,
                url=url,
                source=feed_name,
                source_url=feed_config["source_url"],
                framework=extract_framework(title, summary),
                article_type=classify_article_type(title, summary),
                published_at=published_at,
            )
            
            db.add(article)
            new_articles += 1
        
        db.commit()
        logger.info(f"Added {new_articles} new articles from {feed_name}")
        return new_articles
        
    except Exception as e:
        logger.error(f"Error fetching RSS feed {feed_name}: {str(e)}")
        db.rollback()
        return 0


async def aggregate_all_feeds(db: Session) -> Dict[str, int]:
    """Fetch all RSS feeds and return count of new articles per source."""
    results = {}
    
    for feed_name, feed_config in RSS_FEEDS.items():
        count = await fetch_rss_feed(feed_name, feed_config, db)
        results[feed_name] = count
    
    return results


def get_recent_articles(db: Session, limit: int = 20, days: int = 30) -> List[NewsArticle]:
    """Get recent articles from the database."""
    cutoff_date = datetime.now() - timedelta(days=days)
    
    articles = db.query(NewsArticle).filter(
        NewsArticle.is_active == True,
        NewsArticle.published_at >= cutoff_date
    ).order_by(
        NewsArticle.published_at.desc()
    ).limit(limit).all()
    
    return articles


def cleanup_old_articles(db: Session, days: int = 90):
    """Mark old articles as inactive."""
    cutoff_date = datetime.now() - timedelta(days=days)
    
    updated = db.query(NewsArticle).filter(
        NewsArticle.published_at < cutoff_date,
        NewsArticle.is_active == True
    ).update({"is_active": False})
    
    db.commit()
    logger.info(f"Marked {updated} old articles as inactive")
    return updated
