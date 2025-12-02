# Deployment Final Summary

## ✅ Deployment Process - Complete

### Overview
The deployment script now:
1. **Exports 20 latest articles** from local database
2. **Drops and recreates** server database (fresh start)
3. **Imports 20 articles** to server
4. **Skips package installation** if already installed (faster re-deployments)
5. **Runs news crawlers** to fetch additional articles after deployment

---

## 📊 Deployment Flow

```
┌─────────────────────────────────────────────────────────────┐
│ LOCAL MACHINE                                               │
├─────────────────────────────────────────────────────────────┤
│ Step 0/4: Export Latest 20 News Articles                   │
│   - Query: Latest 20 by published_at                       │
│   - Output: database/news_articles_data.sql                │
│   - Uses: ON CONFLICT to handle duplicates                 │
├─────────────────────────────────────────────────────────────┤
│ Step 1/4: Create Deployment Package                        │
│   - Package: aikovrr-deploy.tar.gz                         │
│   - Includes: backend, frontend, database, deployment      │
├─────────────────────────────────────────────────────────────┤
│ Step 2/4: Upload to VM                                     │
│   - Method: gcloud compute scp                             │
│   - Destination: /tmp/aikovrr-deploy.tar.gz               │
├─────────────────────────────────────────────────────────────┤
│ Step 3/4: Run Deployment on Server                         │
│   - Extracts to: /opt/aikovrr                             │
│   - Runs: deploy_to_gcloud.sh                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SERVER (GCloud VM)                                          │
├─────────────────────────────────────────────────────────────┤
│ Step 1-2: Prerequisites & PostgreSQL                       │
│   - Start PostgreSQL service                               │
│   - Set postgres password                                  │
├─────────────────────────────────────────────────────────────┤
│ Step 3: Drop & Recreate Database                           │
│   - DROP DATABASE aikovrr (removes old data)              │
│   - CREATE DATABASE aikovrr (fresh start)                 │
├─────────────────────────────────────────────────────────────┤
│ Step 4-5: Import Schema & Data                             │
│   - Import: aikovrr_schema_v2.sql                         │
│   - Import: aikovrr_data_v2_minimal.sql                   │
│   - Import: news_articles_data.sql (20 articles)          │
├─────────────────────────────────────────────────────────────┤
│ Step 6-7: Python Environment & Dependencies                │
│   - Create/reuse venv                                      │
│   - Install packages (skip if exists)                      │
│   - Install Playwright browsers (skip if exists)           │
├─────────────────────────────────────────────────────────────┤
│ Step 8-10: Django Setup                                    │
│   - Run migrations                                         │
│   - Import news articles (20 from local)                   │
│   - Set user passwords                                     │
│   - Run news crawlers (fetch additional articles)          │
├─────────────────────────────────────────────────────────────┤
│ Step 11-13: Frontend Build                                 │
│   - Collect static files                                   │
│   - Build React app with Vite                             │
├─────────────────────────────────────────────────────────────┤
│ Step 14-18: Services Configuration                         │
│   - Configure Nginx                                        │
│   - Create systemd service                                 │
│   - Install Gunicorn                                       │
│   - Restart all services                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 News Articles Sync Logic

### What Happens to Articles:

**Before Deployment:**
- Local DB: 20+ articles (your curated collection)
- Server DB: 23 articles (20 seed + 3 from crawler)

**During Deployment:**
- ❌ Server DB: **DROPPED** (all 23 articles deleted)
- ✅ Server DB: **RECREATED** (fresh database)
- ✅ Import: 20 latest articles from local DB
- ✅ Crawlers run: Fetch new articles from IAPP

**After Deployment:**
- Server DB: 20+ articles
  - 20 from local DB (latest by published_at)
  - 0-3 new from IAPP crawler (if any new articles)

### Why Drop Database?

**Pros:**
- ✅ Always get fresh data from local
- ✅ No stale/duplicate articles
- ✅ Clean state every deployment
- ✅ Matches local DB structure exactly

**Cons:**
- ❌ Loses crawler-fetched articles between deployments
- ✅ **BUT**: Crawler runs after deployment to re-fetch

---

## ⚡ Performance Optimizations

### Skip Package Installation
```bash
# Only install if not present
if ! python -c "import playwright" 2>/dev/null; then
    pip install playwright beautifulsoup4 requests
else
    echo "✅ Already installed, skipping"
fi
```

### Skip Browser Installation
```bash
# Only install if not present
if [ ! -d ~/.cache/ms-playwright/chromium-* ]; then
    playwright install chromium
else
    echo "✅ Already installed, skipping"
fi
```

**Result:**
- First deployment: ~5-10 minutes
- Re-deployment: ~2-3 minutes (skips packages)

---

## 📋 Usage

### Full Deployment
```bash
cd /Users/liransorani/CascadeProjects/aikovrr/deployment
./deploy.sh
```

### What Gets Deployed:
1. **Latest 20 articles** from local DB
2. **All code changes** (backend + frontend)
3. **Database schema** (fresh)
4. **User accounts** (passwords reset)
5. **News crawlers** (run automatically)

### After Deployment:
- Dashboard: http://136.113.138.156:8000
- Admin: http://136.113.138.156:8000/admin/
- News Feed: Shows 20+ articles (20 from local + crawler results)

---

## 🔧 Maintenance

### Adding News Articles Locally
1. Add articles to local database (Django admin)
2. Run deployment: `./deploy.sh`
3. Articles automatically synced to server (latest 20)

### Server Crawler
- **Runs**: Daily at 6:00 AM UTC (cron job)
- **Runs**: After each deployment (Step 10.5)
- **Fetches**: 1-3 new IAPP articles daily
- **Result**: Server always has fresh AI governance news

### Manual Crawler Run
```bash
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap
cd /opt/aikovrr/backend && source venv/bin/activate
python manage.py fetch_iapp_news --max-articles 10
```

---

## ✅ Verification

### Check Articles After Deployment
```bash
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap \
  --command "cd /opt/aikovrr/backend && source venv/bin/activate && \
  python manage.py shell -c 'from news.models import NewsArticle; \
  print(f\"Total: {NewsArticle.objects.count()}\")'"
```

### Expected Result:
- Immediately after deployment: 20 articles (from local)
- After crawler runs: 20-23 articles (local + new from IAPP)
- Next day: 21-24 articles (daily crawler adds more)

---

## 📁 Key Files

- **Export Script**: `/database/export_latest_news.py`
- **Generated SQL**: `/database/news_articles_data.sql`
- **Local Deploy**: `/deployment/deploy.sh`
- **Server Deploy**: `/deployment/deploy_to_gcloud.sh`
- **Cron Script**: `/opt/aikovrr/backend/fetch_news.sh` (on server)

---

## 🎯 Summary

✅ **Deployment drops database** - Fresh start each time
✅ **Exports 20 latest articles** - From local DB
✅ **Imports to server** - Clean data
✅ **Runs crawler** - Fetches additional articles
✅ **Skips packages** - If already installed (faster)
✅ **Daily cron** - Keeps news fresh

**Result**: Server always has latest 20+ AI governance articles!

---

**Last Updated**: December 1, 2025  
**Status**: ✅ Fully Operational
