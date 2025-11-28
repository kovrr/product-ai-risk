from django.db import models
from django.utils import timezone


class NewsArticle(models.Model):
    """AI Governance news articles from trusted sources."""
    
    ARTICLE_TYPES = [
        ('regulation', 'Regulation'),
        ('framework', 'Framework'),
        ('standard', 'Standard'),
        ('guidance', 'Guidance'),
    ]
    
    title = models.CharField(max_length=500)
    summary = models.TextField(blank=True, null=True)
    url = models.URLField(max_length=1000, unique=True)
    source = models.CharField(max_length=100)  # IAPP, CISO Series, etc.
    source_url = models.URLField(max_length=500, blank=True, null=True)
    framework = models.CharField(max_length=100, blank=True, null=True)  # EU AI Act, NIST AI RMF, etc.
    article_type = models.CharField(max_length=50, choices=ARTICLE_TYPES, blank=True, null=True)
    published_at = models.DateTimeField()
    fetched_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-published_at']
        indexes = [
            models.Index(fields=['-published_at']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return f"{self.title[:50]}... ({self.source})"
    
    def get_time_ago(self):
        """Return human-readable time ago string."""
        now = timezone.now()
        diff = now - self.published_at
        
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
