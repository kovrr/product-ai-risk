from django.contrib import admin
from .models import NewsArticle


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'source', 'framework', 'article_type', 'published_at', 'is_active']
    list_filter = ['source', 'article_type', 'framework', 'is_active', 'published_at']
    search_fields = ['title', 'summary']
    date_hierarchy = 'published_at'
    readonly_fields = ['fetched_at']
    
    fieldsets = (
        ('Article Information', {
            'fields': ('title', 'summary', 'url')
        }),
        ('Source & Classification', {
            'fields': ('source', 'source_url', 'framework', 'article_type')
        }),
        ('Timestamps', {
            'fields': ('published_at', 'fetched_at', 'is_active')
        }),
    )
