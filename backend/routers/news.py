from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from pydantic import BaseModel

from database import get_db
from models.news_article import NewsArticle
from services.news_aggregator import aggregate_all_feeds, get_recent_articles, cleanup_old_articles

router = APIRouter(prefix="/api/news", tags=["news"])


class NewsArticleResponse(BaseModel):
    id: int
    title: str
    summary: str | None
    url: str
    source: str
    source_url: str | None
    framework: str | None
    article_type: str | None
    published_at: datetime
    time_ago: str
    
    class Config:
        from_attributes = True


def get_time_ago(published_at: datetime) -> str:
    """Convert datetime to human-readable 'time ago' format."""
    now = datetime.now(published_at.tzinfo) if published_at.tzinfo else datetime.now()
    diff = now - published_at
    
    if diff.days > 365:
        years = diff.days // 365
        return f"{years} year{'s' if years > 1 else ''} ago"
    elif diff.days > 30:
        months = diff.days // 30
        return f"{months} month{'s' if months > 1 else ''} ago"
    elif diff.days > 0:
        return f"{diff.days} day{'s' if diff.days > 1 else ''} ago"
    elif diff.seconds > 3600:
        hours = diff.seconds // 3600
        return f"{hours} hour{'s' if hours > 1 else ''} ago"
    elif diff.seconds > 60:
        minutes = diff.seconds // 60
        return f"{minutes} min ago"
    else:
        return "Just now"


@router.get("/articles", response_model=List[NewsArticleResponse])
async def get_news_articles(
    limit: int = 20,
    days: int = 30,
    db: Session = Depends(get_db)
):
    """Get recent news articles for the compliance feed."""
    articles = get_recent_articles(db, limit=limit, days=days)
    
    # Convert to response format with time_ago
    response = []
    for article in articles:
        article_dict = {
            "id": article.id,
            "title": article.title,
            "summary": article.summary,
            "url": article.url,
            "source": article.source,
            "source_url": article.source_url,
            "framework": article.framework,
            "article_type": article.article_type,
            "published_at": article.published_at,
            "time_ago": get_time_ago(article.published_at)
        }
        response.append(NewsArticleResponse(**article_dict))
    
    return response


@router.post("/refresh")
async def refresh_news_feed(db: Session = Depends(get_db)):
    """Manually trigger news feed refresh (admin only)."""
    try:
        results = await aggregate_all_feeds(db)
        return {
            "status": "success",
            "message": "News feed refreshed successfully",
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to refresh news feed: {str(e)}")


@router.post("/cleanup")
async def cleanup_old_news(days: int = 90, db: Session = Depends(get_db)):
    """Cleanup old news articles (admin only)."""
    try:
        count = cleanup_old_articles(db, days=days)
        return {
            "status": "success",
            "message": f"Marked {count} old articles as inactive"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to cleanup: {str(e)}")
