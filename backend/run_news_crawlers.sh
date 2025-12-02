#!/bin/bash

echo "=" 
echo "🤖 AIKovrr News Crawlers - Manual Run"
echo "="
echo ""

# Check if we're in the backend directory
if [ ! -f "manage.py" ]; then
    echo "❌ Error: manage.py not found. Please run this script from the backend directory."
    exit 1
fi

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo "🐍 Activating virtual environment..."
    source venv/bin/activate
elif [ -d "../venv" ]; then
    echo "🐍 Activating virtual environment..."
    source ../venv/bin/activate
fi

# Test connectivity first
echo "🔍 Testing connectivity..."
echo ""
python test_crawler_connectivity.py

echo ""
echo "=" 
echo "Press Enter to continue with crawlers, or Ctrl+C to abort"
read

# Run IAPP crawler
echo ""
echo "=" 
echo "📰 Running IAPP Crawler..."
echo "="
python manage.py fetch_iapp_news --max-articles 10

# Run Compliance Week crawler
echo ""
echo "=" 
echo "📰 Running Compliance Week Crawler..."
echo "="
python manage.py fetch_compliance_week_news --max-articles 10

echo ""
echo "=" 
echo "✅ Crawlers Complete!"
echo "="
echo ""
echo "📊 Check results:"
echo "   python manage.py shell"
echo "   >>> from news.models import NewsArticle"
echo "   >>> NewsArticle.objects.count()"
echo "   >>> NewsArticle.objects.all()[:5]"
echo ""
