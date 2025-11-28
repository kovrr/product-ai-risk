#!/bin/bash

echo "🚀 Setting up Compliance News Feed..."
echo ""

# Navigate to backend
cd backend

# Install feedparser
echo "📦 Installing feedparser..."
pip install feedparser

# Run migrations
echo "🗄️  Running migrations..."
python manage.py makemigrations news
python manage.py migrate

# Fetch initial news
echo "📰 Fetching initial news articles..."
python manage.py fetch_news

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add 'news' to INSTALLED_APPS in settings.py"
echo "2. Add path('api/news/', include('news.urls')) to urls.py"
echo "3. Restart Django server"
echo "4. Refresh frontend to see real news!"
echo ""
echo "Run 'python manage.py fetch_news' daily to update news"
