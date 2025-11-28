from rest_framework import serializers
from .models import NewsArticle


class NewsArticleSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField()
    
    class Meta:
        model = NewsArticle
        fields = [
            'id', 'title', 'summary', 'url', 'source', 'source_url',
            'framework', 'article_type', 'published_at', 'time_ago'
        ]
    
    def get_time_ago(self, obj):
        return obj.get_time_ago()
