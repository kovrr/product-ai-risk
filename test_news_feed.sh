#!/bin/bash
# Quick test script for news feed functionality

echo "🧪 Testing News Feed Setup..."
echo ""

cd backend

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Run ./setup.sh first."
    exit 1
fi

# Activate venv
source venv/bin/activate

# Test 1: Check if news app is in migrations
echo "Test 1: Checking migrations..."
if python manage.py showmigrations news 2>/dev/null | grep -q "news"; then
    echo "✅ News app migrations found"
else
    echo "❌ News app not in migrations. Running makemigrations..."
    python manage.py makemigrations news
    python manage.py migrate news
fi

# Test 2: Fetch news
echo ""
echo "Test 2: Fetching news articles..."
python manage.py fetch_news

# Test 3: Check if articles were fetched
echo ""
echo "Test 3: Checking database..."
python << 'EOF'
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aikovrr.settings')
django.setup()

from news.models import NewsArticle

count = NewsArticle.objects.count()
print(f"✅ Found {count} articles in database")

if count > 0:
    latest = NewsArticle.objects.first()
    print(f"   Latest: {latest.title[:60]}...")
    print(f"   Source: {latest.source}")
    print(f"   URL: {latest.url}")
EOF

# Test 4: Test API endpoint
echo ""
echo "Test 4: Testing API endpoint..."
echo "Start Django server in another terminal with:"
echo "  cd backend && source venv/bin/activate && python manage.py runserver"
echo ""
echo "Then test with:"
echo "  curl http://localhost:8000/api/news/articles/"
echo ""
echo "✅ All tests completed!"
