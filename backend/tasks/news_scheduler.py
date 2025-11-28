"""
Scheduled task to fetch news articles daily.
Run this with: python -m tasks.news_scheduler
Or integrate with APScheduler/Celery for production.
"""

import asyncio
import logging
from datetime import datetime
from sqlalchemy.orm import Session

from database import SessionLocal
from services.news_aggregator import aggregate_all_feeds, cleanup_old_articles

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def fetch_daily_news():
    """Fetch news articles from all sources."""
    db = SessionLocal()
    try:
        logger.info(f"Starting daily news fetch at {datetime.now()}")
        
        # Fetch new articles
        results = await aggregate_all_feeds(db)
        logger.info(f"Fetch results: {results}")
        
        # Cleanup old articles (older than 90 days)
        cleanup_count = cleanup_old_articles(db, days=90)
        logger.info(f"Cleaned up {cleanup_count} old articles")
        
        logger.info("Daily news fetch completed successfully")
        
    except Exception as e:
        logger.error(f"Error in daily news fetch: {str(e)}")
    finally:
        db.close()


if __name__ == "__main__":
    # Run immediately
    asyncio.run(fetch_daily_news())
