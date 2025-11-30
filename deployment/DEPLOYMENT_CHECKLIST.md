# Deployment Checklist - News Feed Update

## Pre-Deployment

### 1. Verify Local Changes
- [ ] Backend server running without errors
- [ ] Frontend server running without errors
- [ ] 20 news articles visible in local Compliance News Feed
- [ ] All article links working
- [ ] No RSS/scraping code remaining

### 2. Prepare Files
- [ ] `backend/` folder (all code)
- [ ] `frontend/` folder (all code)
- [ ] `database/aikovrr_schema_v2.sql`
- [ ] `database/aikovrr_data_v2_minimal.sql`
- [ ] `database/news_articles_data.sql` ← NEW FILE
- [ ] `deployment/deploy_to_gcloud.sh` (updated)

### 3. Verify File Changes
```bash
# Check news_articles_data.sql exists
ls -lh database/news_articles_data.sql

# Check it has 20 articles
grep -c "INSERT INTO news_newsarticle" database/news_articles_data.sql
# Should output: 20

# Check deployment script updated
grep "news_articles_data.sql" deployment/deploy_to_gcloud.sh
# Should show import command

# Check feedparser removed from requirements
grep "feedparser" backend/requirements.txt
# Should return nothing
```

## Deployment Steps

### 1. Copy Files to VM
```bash
# From local machine
cd /Users/liransorani/CascadeProjects/aikovrr

# Copy to VM (adjust path/IP as needed)
scp -r backend frontend database deployment user@136.113.138.156:/opt/aikovrr/
```

### 2. SSH to VM
```bash
ssh user@136.113.138.156
cd /opt/aikovrr
```

### 3. Run Deployment Script
```bash
chmod +x deployment/deploy_to_gcloud.sh
sudo deployment/deploy_to_gcloud.sh
```

### 4. Monitor Deployment
Watch for these key steps:
- [ ] Step 5: Database schema imported
- [ ] Step 9: Migrations completed
- [ ] Step 9.5: News articles imported (NEW)
- [ ] Step 10: User passwords set
- [ ] Step 13: Frontend built
- [ ] Step 18: Services restarted

## Post-Deployment Verification

### 1. Check Services Status
```bash
sudo systemctl status aikovrr-backend
sudo systemctl status nginx
sudo systemctl status postgresql
```
- [ ] All services running (active)

### 2. Verify Database
```bash
# IMPORTANT: Check articles are in the correct schema (aikovrr, not public)
sudo -u postgres psql -d aikovrr -c "SELECT COUNT(*) FROM aikovrr.news_newsarticle WHERE is_active=true;"
# Should return: 20

# Verify no articles in wrong schema
sudo -u postgres psql -d aikovrr -c "SELECT COUNT(*) FROM public.news_newsarticle;" 2>/dev/null || echo "Table not in public (correct)"
# Should error or return 0

# Check sources
sudo -u postgres psql -d aikovrr -c "SELECT source, COUNT(*) FROM aikovrr.news_newsarticle GROUP BY source;"
# Should show: IAPP (4), CISO Series (6), GRC World Forums (5), Compliance Week (5)

# Verify Django can see the articles
cd /opt/aikovrr/backend
source venv/bin/activate
python manage.py shell -c "from news.models import NewsArticle; print(f'Django sees {NewsArticle.objects.count()} articles')"
# Should output: Django sees 20 articles
```
- [ ] Table exists in aikovrr schema
- [ ] 20 articles present in aikovrr schema
- [ ] No articles in public schema (wrong location)
- [ ] Django ORM can query articles
- [ ] All 4 sources represented

### 3. Test Backend API
```bash
# Test news endpoint
curl http://localhost:8001/api/news/articles/ | jq '.results | length'
# Should return: 20

# Test first article
curl http://localhost:8001/api/news/articles/ | jq '.results[0] | {title, source, published_at}'
```
- [ ] API returns 20 articles
- [ ] Articles have all required fields

### 4. Test Frontend
```bash
# Check if frontend is accessible
curl -I http://136.113.138.156:8000
# Should return: 200 OK
```
- [ ] Frontend loads
- [ ] Dashboard accessible
- [ ] Compliance News Feed visible
- [ ] 20 articles displayed
- [ ] Articles ordered by date (most recent first)
- [ ] Article links clickable

### 5. Test Article Links
Open browser and test a few article URLs:
- [ ] IAPP article opens correctly
- [ ] CISO Series article opens correctly
- [ ] GRC World Forums article opens correctly
- [ ] Compliance Week article opens correctly

### 6. Check Logs
```bash
# Backend logs
sudo journalctl -u aikovrr-backend -n 50

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```
- [ ] No errors in backend logs
- [ ] No errors in nginx logs

### 7. Verify No Background Processes
```bash
# Check for feedparser or RSS processes
ps aux | grep -i feed
ps aux | grep -i rss
# Should return nothing related to news fetching
```
- [ ] No RSS/scraping processes running

## Smoke Tests

### Test 1: Load Dashboard
1. Open: http://136.113.138.156:8000
2. Login with admin/admin123
3. Navigate to Dashboard
4. Verify Compliance News Feed shows articles

### Test 2: Click Article
1. Click on any news article in the feed
2. Verify it opens in new tab
3. Verify URL is correct and page loads

### Test 3: Check Recent Articles
1. Verify most recent article is from Nov 27, 2025
2. Verify articles are in descending date order

### Test 4: Check All Sources
1. Verify you see articles from:
   - IAPP
   - CISO Series
   - GRC World Forums
   - Compliance Week

## Rollback (If Needed)

If deployment fails:
```bash
# Stop services
sudo systemctl stop aikovrr-backend
sudo systemctl stop nginx

# Restore previous database
sudo -u postgres psql -c "DROP DATABASE aikovrr;"
sudo -u postgres psql -c "CREATE DATABASE aikovrr;"
sudo -u postgres psql -d aikovrr -f /opt/aikovrr/backup/previous_backup.sql

# Revert code (if you have backup)
cd /opt/aikovrr
rm -rf backend frontend
cp -r backup/backend backup/frontend .

# Restart services
sudo systemctl start aikovrr-backend
sudo systemctl start nginx
```

## Success Criteria

All checkboxes above should be checked ✅

**Deployment is successful when:**
1. All services running
2. 20 news articles in database
3. API returns articles correctly
4. Frontend displays news feed
5. Article links work
6. No errors in logs
7. No background RSS processes

## Contact

If issues arise:
- Check logs first
- Review NEWS_FEED_DEPLOYMENT_NOTES.md
- Verify all files were copied correctly
- Ensure migrations ran successfully

## Completion

Deployment completed by: _______________
Date: _______________
Time: _______________
All checks passed: [ ] YES [ ] NO
Notes: _______________________________________________
