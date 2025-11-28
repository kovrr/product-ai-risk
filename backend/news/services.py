import logging
from datetime import timedelta
from django.utils import timezone
from .models import NewsArticle

logger = logging.getLogger(__name__)


def fetch_all_news():
    """
    Placeholder function for manual news refresh.
    News articles are now added manually via Django admin or management commands.
    """
    logger.info("Manual news refresh - no automatic fetching configured")
    return {"message": "News articles are managed manually"}


def cleanup_old_articles(days=90):
    """Mark old articles as inactive."""
    cutoff_date = timezone.now() - timedelta(days=days)
    
    updated = NewsArticle.objects.filter(
        published_at__lt=cutoff_date,
        is_active=True
    ).update(is_active=False)
    
    logger.info(f"Marked {updated} old articles as inactive")
    return updated
