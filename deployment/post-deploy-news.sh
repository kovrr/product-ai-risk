#!/bin/bash
# Post-deployment script for news extraction setup

echo "🚀 Setting up News Extraction on Server"
echo "========================================"

# Install Playwright and dependencies
echo ""
echo "📦 Installing Playwright..."
pip install playwright beautifulsoup4

echo ""
echo "🌐 Installing Chromium browser..."
playwright install chromium

echo ""
echo "🔧 Installing system dependencies..."
playwright install-deps chromium

echo ""
echo "✅ Testing extraction..."
python manage.py fetch_all_news --max-articles 5

echo ""
echo "📋 Setting up cron jobs..."
# Backup existing crontab
crontab -l > /tmp/crontab.backup 2>/dev/null || true

# Add news extraction cron jobs if not already present
(crontab -l 2>/dev/null | grep -v "fetch_all_news"; echo "# AIKovrr News Extraction - Daily at 6 AM"; echo "0 6 * * * cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news --max-articles 20 >> /var/log/aikovrr-news.log 2>&1"; echo "# AIKovrr News Extraction - On server restart"; echo "@reboot sleep 300 && cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news --max-articles 20 >> /var/log/aikovrr-news.log 2>&1") | crontab -

echo ""
echo "✅ Cron jobs configured!"
crontab -l | grep fetch_all_news

echo ""
echo "📊 Checking database..."
python manage.py shell -c "from news.models import NewsArticle; print(f'Total articles: {NewsArticle.objects.count()}')"

echo ""
echo "========================================"
echo "✅ News Extraction Setup Complete!"
echo "========================================"
echo ""
echo "Next automatic run: Tomorrow at 6:00 AM"
echo "Manual run: python manage.py fetch_all_news --max-articles 20"
echo "View logs: tail -f /var/log/aikovrr-news.log"
echo ""
