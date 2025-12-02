#!/bin/bash

# Setup daily cron job for news crawlers on GCloud VM
# Run this from your local machine

set -e

echo "⏰ Setting up Daily News Crawler Cron Job"
echo "=========================================="
echo ""

# Configuration
VM_NAME="platform"
ZONE="us-central1-f"

echo "📤 Installing cron job on VM..."
echo ""

gcloud compute ssh $VM_NAME --zone $ZONE --tunnel-through-iap --command "
  echo '⏰ Setting up daily news crawler cron job...'
  echo ''
  
  # Create the cron script
  cat > /tmp/fetch_news.sh <<'CRONSCRIPT'
#!/bin/bash
# Daily news crawler script
# Runs at 6 AM daily

cd /opt/aikovrr/backend
source venv/bin/activate

# Log file
LOG_FILE=\"/opt/aikovrr/backend/logs/news_crawler_\$(date +%Y%m%d).log\"
mkdir -p /opt/aikovrr/backend/logs

echo \"===========================================\" >> \$LOG_FILE
echo \"News Crawler Run: \$(date)\" >> \$LOG_FILE
echo \"===========================================\" >> \$LOG_FILE

# Run IAPP crawler
echo \"Running IAPP crawler...\" >> \$LOG_FILE
python manage.py fetch_iapp_news --max-articles 20 >> \$LOG_FILE 2>&1
IAPP_STATUS=\$?

# Run Compliance Week crawler (may fail due to site restrictions)
echo \"Running Compliance Week crawler...\" >> \$LOG_FILE
python manage.py fetch_compliance_week_news --max-articles 20 >> \$LOG_FILE 2>&1
CW_STATUS=\$?

# Summary
echo \"\" >> \$LOG_FILE
echo \"IAPP Status: \$IAPP_STATUS\" >> \$LOG_FILE
echo \"Compliance Week Status: \$CW_STATUS\" >> \$LOG_FILE
echo \"Total articles in DB: \$(python manage.py shell -c 'from news.models import NewsArticle; print(NewsArticle.objects.count())')\" >> \$LOG_FILE
echo \"===========================================\" >> \$LOG_FILE
echo \"\" >> \$LOG_FILE

# Keep only last 7 days of logs
find /opt/aikovrr/backend/logs -name \"news_crawler_*.log\" -mtime +7 -delete
CRONSCRIPT

  # Make script executable
  chmod +x /tmp/fetch_news.sh
  sudo mv /tmp/fetch_news.sh /opt/aikovrr/backend/fetch_news.sh
  sudo chown \$USER:\$USER /opt/aikovrr/backend/fetch_news.sh
  
  # Add to crontab (runs daily at 6 AM)
  (crontab -l 2>/dev/null | grep -v 'fetch_news.sh'; echo '0 6 * * * /opt/aikovrr/backend/fetch_news.sh') | crontab -
  
  echo '✅ Cron job installed successfully!'
  echo ''
  echo 'Cron schedule:'
  crontab -l | grep fetch_news
  echo ''
  echo '📋 To view logs:'
  echo '   tail -f /opt/aikovrr/backend/logs/news_crawler_*.log'
  echo ''
  echo '🧪 To test manually:'
  echo '   /opt/aikovrr/backend/fetch_news.sh'
"

echo ""
echo "=========================================="
echo "✅ Cron Job Setup Complete!"
echo "=========================================="
echo ""
echo "📅 Schedule: Daily at 6:00 AM (server time)"
echo "📝 Script: /opt/aikovrr/backend/fetch_news.sh"
echo "📊 Logs: /opt/aikovrr/backend/logs/news_crawler_YYYYMMDD.log"
echo ""
echo "🧪 To test the cron job now:"
echo "   gcloud compute ssh $VM_NAME --zone $ZONE --tunnel-through-iap --command '/opt/aikovrr/backend/fetch_news.sh'"
echo ""
echo "📋 To view cron logs:"
echo "   gcloud compute ssh $VM_NAME --zone $ZONE --tunnel-through-iap --command 'tail -f /opt/aikovrr/backend/logs/news_crawler_*.log'"
echo ""
