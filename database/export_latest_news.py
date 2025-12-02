#!/usr/bin/env python3
"""
Export latest 20 news articles from local database to SQL file
This file will be deployed to the server during deployment

Usage:
    python export_latest_news.py
"""

import os
import sys
import django
from datetime import datetime

# Setup Django
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aikovrr.settings')
django.setup()

from news.models import NewsArticle

def export_articles():
    """Export latest 20 articles to SQL file"""
    
    # Get latest 20 active articles
    articles = NewsArticle.objects.filter(is_active=True).order_by('-published_at')[:20]
    
    if not articles:
        print("❌ No articles found in database")
        return
    
    print(f"📊 Found {articles.count()} articles to export")
    
    # Generate SQL file
    sql_file = os.path.join(os.path.dirname(__file__), 'news_articles_data.sql')
    
    with open(sql_file, 'w') as f:
        f.write("-- News Articles Data\n")
        f.write(f"-- Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"-- Total articles: {articles.count()}\n")
        f.write("-- This file contains the latest 20 articles from local database\n")
        f.write("-- Duplicates (same URL) will be skipped during import\n\n")
        
        for article in articles:
            # Escape single quotes in text fields
            title = article.title.replace("'", "''")
            summary = (article.summary or '').replace("'", "''")
            url = article.url.replace("'", "''")
            source = article.source.replace("'", "''")
            source_url = article.source_url.replace("'", "''")
            framework = (article.framework or 'AI Governance').replace("'", "''")
            article_type = article.article_type.replace("'", "''")
            
            # Format published_at as ISO string
            published_at = article.published_at.isoformat()
            fetched_at = article.fetched_at.isoformat() if article.fetched_at else datetime.now().isoformat()
            
            # Generate INSERT with ON CONFLICT to keep latest
            f.write(f"""-- {source}: {title[:60]}...
INSERT INTO news_newsarticle (title, summary, url, source, source_url, framework, article_type, published_at, is_active, fetched_at)
VALUES (
  '{title}',
  '{summary}',
  '{url}',
  '{source}',
  '{source_url}',
  '{framework}',
  '{article_type}',
  '{published_at}',
  true,
  '{fetched_at}'
)
ON CONFLICT (url) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  source = EXCLUDED.source,
  source_url = EXCLUDED.source_url,
  framework = EXCLUDED.framework,
  article_type = EXCLUDED.article_type,
  published_at = EXCLUDED.published_at,
  fetched_at = EXCLUDED.fetched_at,
  is_active = EXCLUDED.is_active;

""")
    
    print(f"✅ Exported to: {sql_file}")
    print(f"\n📋 Articles exported:")
    for i, article in enumerate(articles, 1):
        print(f"  {i}. [{article.source}] {article.title[:60]}... ({article.published_at.strftime('%Y-%m-%d')})")
    
    print(f"\n💡 This file will be deployed to the server during next deployment")
    print(f"   Duplicates will be updated with latest data")

if __name__ == '__main__':
    print("=" * 70)
    print("📰 Exporting Latest News Articles")
    print("=" * 70)
    print()
    
    try:
        export_articles()
        print()
        print("=" * 70)
        print("✅ Export Complete!")
        print("=" * 70)
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
