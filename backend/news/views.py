from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from .models import NewsArticle
from .serializers import NewsArticleSerializer
from .services import fetch_all_news, cleanup_old_articles


class NewsArticleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for news articles.
    GET /api/news/articles/ - List recent articles
    POST /api/news/articles/refresh/ - Manually refresh feed
    """
    serializer_class = NewsArticleSerializer
    
    def get_queryset(self):
        """Get recent active articles."""
        # Get all active articles, sorted by published date
        return NewsArticle.objects.filter(
            is_active=True
        ).order_by('-published_at')[:20]
    
    @action(detail=False, methods=['post'])
    def refresh(self, request):
        """Manually trigger news feed refresh."""
        try:
            results = fetch_all_news()
            return Response({
                'status': 'success',
                'message': 'News feed refreshed successfully',
                'results': results
            })
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['post'])
    def cleanup(self, request):
        """Cleanup old news articles."""
        try:
            days = int(request.data.get('days', 90))
            count = cleanup_old_articles(days=days)
            return Response({
                'status': 'success',
                'message': f'Marked {count} old articles as inactive'
            })
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
