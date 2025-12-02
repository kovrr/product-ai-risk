#!/bin/bash

# Run news crawlers on GCloud VM
# Run this from your local machine

set -e

echo "🤖 Running News Crawlers on GCloud VM"
echo "======================================"
echo ""

# Configuration
VM_NAME="platform"
ZONE="us-central1-f"

echo "🚀 Running crawlers on VM..."
echo ""

gcloud compute ssh $VM_NAME --zone $ZONE --tunnel-through-iap --command "
  echo '======================================'
  echo '🤖 AIKovrr News Crawlers'
  echo '======================================'
  echo ''
  
  cd /opt/aikovrr/backend
  source venv/bin/activate
  
  echo '📰 Step 1/2: Running IAPP Crawler...'
  echo ''
  python manage.py fetch_iapp_news --max-articles 10
  
  echo ''
  echo '📰 Step 2/2: Running Compliance Week Crawler...'
  echo ''
  python manage.py fetch_compliance_week_news --max-articles 10
  
  echo ''
  echo '======================================'
  echo '✅ Crawlers Complete!'
  echo '======================================'
  echo ''
  echo '📊 Checking results...'
  python manage.py shell -c \"
from news.models import NewsArticle
print(f'Total articles in database: {NewsArticle.objects.count()}')
print('')
print('Latest 5 articles:')
for article in NewsArticle.objects.all().order_by('-published_at')[:5]:
    print(f'  • {article.source}: {article.title[:60]}...')
\"
"

echo ""
echo "======================================"
echo "✅ Done!"
echo ""
echo "🌐 View news feed on dashboard:"
echo "   http://136.113.138.156:8000"
echo ""
