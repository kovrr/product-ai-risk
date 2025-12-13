#!/usr/bin/env python
"""
Test extracting and storing a single news article
"""
import os
import sys
import django
from datetime import datetime, timezone, timedelta
import json

# Setup Django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ['DJANGO_SETTINGS_MODULE'] = 'aikovrr.settings'
django.setup()

from news.models import NewsArticle

# Test article data
test_article = {
    'title': 'As US President Trump Signs State AI Executive Order, Legal Questions Remain',
    'summary': 'President Trump signs executive order addressing state-level AI regulations, raising questions about federal preemption and the future of state AI governance frameworks.',
    'url': 'https://iapp.org/news/a/as-us-president-trump-signs-state-ai-executive-order-legal-questions-remain',
    'source': 'IAPP',
    'source_url': 'https://iapp.org',
    'article_type': 'regulation',
    'framework': 'US AI Policy',
    'published_at': datetime.now(timezone.utc) - timedelta(hours=2),
}

print("=" * 80)
print("🧪 Testing Single News Article Extraction")
print("=" * 80)
print()

# Step 1: Show extracted fields
print("📋 EXTRACTED FIELDS:")
print("-" * 80)
for key, value in test_article.items():
    if key == 'published_at':
        print(f"  {key:15} : {value.isoformat()}")
    else:
        print(f"  {key:15} : {value}")
print()

# Step 2: Save to temp file
temp_file = '/tmp/test_news_article.json'
temp_data = {**test_article}
temp_data['published_at'] = test_article['published_at'].isoformat()

with open(temp_file, 'w') as f:
    json.dump(temp_data, f, indent=2)

print(f"💾 SAVED TO TEMP FILE: {temp_file}")
print("-" * 80)
with open(temp_file, 'r') as f:
    print(f.read())
print()

# Step 3: Check if already exists in DB
existing = NewsArticle.objects.filter(url=test_article['url']).first()
if existing:
    print(f"⚠️  ARTICLE ALREADY EXISTS IN DB:")
    print(f"   ID: {existing.id}")
    print(f"   Title: {existing.title}")
    print(f"   Published: {existing.published_at}")
    print()
    print("❓ Do you want to proceed? (This will skip adding)")
else:
    print("✅ ARTICLE DOES NOT EXIST IN DB - Ready to add")
    print()
    
    # Step 4: Ask for confirmation before adding
    print("🔄 ADDING TO DATABASE...")
    try:
        article = NewsArticle.objects.create(**test_article)
        print(f"✅ SUCCESS! Article added with ID: {article.id}")
        print()
        print("📊 VERIFICATION:")
        print(f"   ID: {article.id}")
        print(f"   Title: {article.title}")
        print(f"   Source: {article.source}")
        print(f"   Type: {article.article_type}")
        print(f"   Framework: {article.framework}")
        print(f"   Published: {article.published_at}")
        print(f"   URL: {article.url}")
        print()
        print(f"📈 Total articles in DB: {NewsArticle.objects.count()}")
    except Exception as e:
        print(f"❌ ERROR: {e}")

print()
print("=" * 80)
print("✅ Test Complete!")
print("=" * 80)
