#!/bin/bash
# Quick local setup for news feed

echo "📰 Setting up News Feed locally..."
echo ""

cd backend

# Step 1: Create database table
echo "Step 1: Creating news table in PostgreSQL..."
psql -d aikovrr -U postgres -f news/create_news_table.sql

if [ $? -eq 0 ]; then
    echo "✅ Database table created"
else
    echo "❌ Failed to create table. Make sure PostgreSQL is running and you have access."
    exit 1
fi

# Step 2: Fetch initial news
echo ""
echo "Step 2: Fetching initial news articles..."
python3 manage.py fetch_news

if [ $? -eq 0 ]; then
    echo "✅ News articles fetched"
else
    echo "⚠️  Could not fetch news. You can try manually later with:"
    echo "   python3 manage.py fetch_news"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Now:"
echo "1. Start backend: python3 manage.py runserver"
echo "2. Start frontend: cd frontend && npm run dev"
echo "3. Check the Compliance News Feed widget on the dashboard!"
