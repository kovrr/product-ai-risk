#!/bin/bash

# Test news crawlers on GCloud VM
# Run this from your local machine

set -e

echo "🔍 Testing News Crawlers on GCloud VM"
echo "======================================"
echo ""

# Configuration
VM_NAME="platform"
ZONE="us-central1-f"

echo "📤 Step 1/2: Uploading test script to VM..."
gcloud compute scp ../backend/test_crawler_connectivity.py $VM_NAME:/tmp/ \
  --zone $ZONE \
  --tunnel-through-iap

echo "✅ Upload complete"
echo ""

echo "🧪 Step 2/2: Running connectivity test on VM..."
echo ""
gcloud compute ssh $VM_NAME --zone $ZONE --tunnel-through-iap --command "
  echo '🔍 Testing Internet Connectivity & Playwright...'
  echo ''
  cd /opt/aikovrr/backend
  cp /tmp/test_crawler_connectivity.py .
  source venv/bin/activate
  python test_crawler_connectivity.py
"

echo ""
echo "======================================"
echo "📋 Next Steps:"
echo ""
echo "If connectivity test passed, run the crawlers:"
echo ""
echo "1. SSH into the server:"
echo "   gcloud compute ssh $VM_NAME --zone $ZONE --tunnel-through-iap"
echo ""
echo "2. Navigate to backend:"
echo "   cd /opt/aikovrr/backend"
echo "   source venv/bin/activate"
echo ""
echo "3. Run IAPP crawler:"
echo "   python manage.py fetch_iapp_news --max-articles 10"
echo ""
echo "4. Run Compliance Week crawler:"
echo "   python manage.py fetch_compliance_week_news --max-articles 10"
echo ""
echo "5. Check results:"
echo "   python manage.py shell"
echo "   >>> from news.models import NewsArticle"
echo "   >>> NewsArticle.objects.count()"
echo "   >>> for article in NewsArticle.objects.all()[:5]:"
echo "   ...     print(f'{article.source}: {article.title}')"
echo ""
