# ✅ Deployment Successful! Next Steps for News Extraction

## 🎉 Main Application Deployed Successfully!

Your application is now running at: **http://136.113.138.156:8000**

---

## 📰 Complete News Extraction Setup (5 minutes)

### SSH to Server and Run Setup Script:

```bash
# 1. SSH to server
ssh user@136.113.138.156

# 2. Navigate to backend
cd /opt/aikovrr/backend
source venv/bin/activate

# 3. Install Playwright (one-time setup)
pip install playwright beautifulsoup4
playwright install chromium
playwright install-deps chromium

# 4. Test extraction
python manage.py fetch_all_news --max-articles 5

# 5. Setup cron jobs
crontab -e

# Add these 2 lines:
0 6 * * * cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news --max-articles 20 >> /var/log/aikovrr-news.log 2>&1
@reboot sleep 300 && cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news --max-articles 20 >> /var/log/aikovrr-news.log 2>&1

# Save and exit (Ctrl+X, Y, Enter)

# 6. Verify cron is set
crontab -l
```

---

## ✅ Verification

### Check Articles in Database:
```bash
python manage.py shell -c "from news.models import NewsArticle; print(f'Total: {NewsArticle.objects.count()}')"
```

### Check API:
```bash
curl http://localhost:8001/api/news/articles/ | python -m json.tool
```

### View Logs:
```bash
tail -f /var/log/aikovrr-news.log
```

---

## 📅 Schedule Summary

- **Daily**: 6:00 AM every day
- **On Restart**: 5 minutes after server boot
- **Retries**: 2 automatic retries on failure
- **Sources**: IAPP + Compliance Week

---

## 🎯 Expected Results

After setup:
- ✅ 3-5 new AI governance articles per day
- ✅ Automatic extraction (no manual intervention)
- ✅ Frontend displays latest 20 articles
- ✅ Zero cost, zero 3rd party services

---

## 🔍 Troubleshooting

### If extraction fails:
```bash
# Check if Chromium is installed
playwright install --dry-run chromium

# Check logs
tail -50 /var/log/aikovrr-news.log

# Run manually to see errors
python manage.py fetch_all_news --max-articles 5
```

### If cron doesn't run:
```bash
# Check cron service
sudo systemctl status cron

# Check cron logs
grep CRON /var/log/syslog | tail -20
```

---

## 📞 Quick Commands

```bash
# Manual extraction
python manage.py fetch_all_news --max-articles 20

# Check database
python manage.py shell -c "from news.models import NewsArticle; print(NewsArticle.objects.count())"

# View latest articles
python manage.py shell -c "from news.models import NewsArticle; [print(f'{a.source}: {a.title[:60]}') for a in NewsArticle.objects.all()[:5]]"

# Check cron schedule
crontab -l

# View logs
tail -f /var/log/aikovrr-news.log
```

---

## 🚀 You're Done!

Once you complete the 5-minute setup above, your news extraction will run automatically every day at 6 AM!

**Current Status:**
- ✅ Main application deployed
- ⏳ News extraction setup pending (5 minutes)

**After setup:**
- ✅ Everything automated
- ✅ Fresh news daily
- ✅ Zero maintenance required
