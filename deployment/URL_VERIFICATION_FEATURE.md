# URL Verification Feature

## Overview

Added URL verification functionality to ensure all news articles have valid, accessible URLs. This prevents broken links from appearing in the news feed.

---

## 🔧 Components Created

### 1. URL Verification Utility (`/backend/news/utils.py`)

**Functions:**
- `verify_url(url, timeout=10)` - Checks if URL is accessible
- `verify_and_create_article()` - Verifies URL before creating article

**Verification Checks:**
- ✅ HTTP status code (200, 301, 302 = valid)
- ❌ 404 Not Found
- ❌ "Page not found" in content
- ❌ Connection errors
- ❌ Timeouts

**Returns:**
```python
(is_valid, status_code, message)
# Example: (True, 200, "OK")
# Example: (False, 404, "404 Not Found")
```

### 2. Verification Management Command (`verify_article_urls.py`)

**Usage:**
```bash
# Check all articles (report only)
python manage.py verify_article_urls

# Check and delete broken articles
python manage.py verify_article_urls --delete
```

**Features:**
- ✅ Checks all active articles
- ✅ Reports valid/broken/error counts
- ✅ Lists broken articles with URLs
- ✅ Optional deletion of broken articles
- ✅ Rate limiting (0.5s delay between requests)
- ✅ User-Agent header to avoid blocks

**Output Example:**
```
🔍 Verifying Article URLs
======================================================================
📊 Found 20 active articles to verify

[1/20] Checking: IAPP - Understanding AI agents...
  ✅ VALID (200 OK)
[2/20] Checking: Compliance Week - The AI audit burden...
  ❌ BROKEN: 404 Not Found

======================================================================
📊 Verification Summary:
   • Total checked: 20
   • Valid: 18
   • Broken: 2
   • Errors: 0
======================================================================

🗑️  Broken Articles:
   • [Compliance Week] The AI audit burden...
     URL: https://www.complianceweek.com/broken-link

💡 To delete broken articles, run:
   python manage.py verify_article_urls --delete
```

---

## 🚀 Usage

### Manual Verification

**Check articles without deleting:**
```bash
cd /Users/liransorani/CascadeProjects/aikovrr/backend
python manage.py verify_article_urls
```

**Check and clean up broken links:**
```bash
python manage.py verify_article_urls --delete
```

### Integrate with Crawlers

The utility functions can be integrated into news crawlers to verify URLs before adding articles:

```python
from news.utils import verify_and_create_article
from news.models import NewsArticle

# Instead of:
# NewsArticle.objects.create(...)

# Use:
created, message = verify_and_create_article(
    article_data={
        'title': title,
        'url': url,
        'source': source,
        # ... other fields
    },
    model_class=NewsArticle,
    stdout=self.stdout,
    verify_urls=True  # Enable URL verification
)

if created:
    print("✅ Article added")
elif message == "duplicate":
    print("⏭️  Skipped (duplicate)")
else:
    print(f"❌ Skipped ({message})")
```

---

## 📋 Verification Process

### What Gets Checked:

1. **HTTP Status Code**
   - 200 OK → Valid
   - 301/302 Redirect → Valid
   - 404 Not Found → Invalid
   - 500+ Server Error → Error (not deleted)

2. **Page Content**
   - Checks first 1000 characters for "page not found"
   - Checks first 500 characters for "404"
   - If found → Invalid

3. **Connection**
   - Timeout (10s) → Error (not deleted)
   - Connection refused → Error (not deleted)

### What Gets Deleted:

✅ **Deleted (with --delete flag):**
- 404 Not Found
- "Page not found" in content

⚠️ **Not Deleted (kept for manual review):**
- Timeouts
- Connection errors
- Server errors (500+)
- Other HTTP errors

---

## 🔄 Recommended Workflow

### Before Deployment:

```bash
# 1. Verify local articles
cd /Users/liransorani/CascadeProjects/aikovrr/backend
python manage.py verify_article_urls

# 2. Clean up broken links
python manage.py verify_article_urls --delete

# 3. Check article count
python manage.py shell -c "from news.models import NewsArticle; print(f'Articles: {NewsArticle.objects.count()}')"

# 4. Deploy to server
cd ../deployment
./deploy.sh
```

### On Server (Monthly Maintenance):

```bash
# SSH to server
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap

# Verify and clean
cd /opt/aikovrr/backend
source venv/bin/activate
python manage.py verify_article_urls --delete
```

---

## 📊 Benefits

✅ **Clean News Feed** - No broken links displayed to users
✅ **Automatic Cleanup** - Remove invalid articles before deployment
✅ **Quality Control** - Ensure all articles are accessible
✅ **User Experience** - Users always get working links
✅ **Maintenance** - Easy to identify and fix broken links

---

## 🔧 Configuration

### Timeout Settings

Default timeout is 10 seconds. To change:

```python
# In utils.py
def verify_url(url, timeout=15):  # Increase to 15 seconds
    ...
```

### Rate Limiting

Default delay is 0.5 seconds between requests. To change:

```python
# In verify_article_urls.py
sleep(1.0)  # Increase to 1 second
```

### User-Agent

Default User-Agent is `Mozilla/5.0 (compatible; AIKovrr/1.0)`. To change:

```python
headers={'User-Agent': 'YourCustomUserAgent/1.0'}
```

---

## 📁 Files Created

- `/backend/news/utils.py` - URL verification utilities
- `/backend/news/management/commands/verify_article_urls.py` - Management command
- `/deployment/URL_VERIFICATION_FEATURE.md` - This documentation

---

## 🎯 Next Steps

1. **Run verification on local database:**
   ```bash
   python manage.py verify_article_urls --delete
   ```

2. **Integrate with crawlers** (optional):
   - Update `fetch_iapp_news.py` to use `verify_and_create_article()`
   - Update `fetch_compliance_week_news.py` to use `verify_and_create_article()`

3. **Schedule regular verification** (optional):
   - Add to cron job to run weekly
   - Clean up broken links automatically

---

**Last Updated**: December 1, 2025  
**Status**: ✅ Implemented and ready to use
