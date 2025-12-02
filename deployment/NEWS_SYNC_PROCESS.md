# News Articles Sync Process

## Overview

The deployment process now automatically syncs the latest 20 news articles from your local database to the server. This ensures the server always has the most recent articles.

## How It Works

### Step 1: Export from Local Database
Before deployment, the script exports the latest 20 articles from your local database:

```bash
cd database
python export_latest_news.py
```

**Output**: `/database/news_articles_data.sql`

### Step 2: Deploy to Server
The SQL file is packaged and deployed to the server.

### Step 3: Import on Server
During deployment, the server imports the articles:

```sql
-- For each article:
INSERT INTO news_newsarticle (...)
VALUES (...)
ON CONFLICT (url) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  ...
  published_at = EXCLUDED.published_at;
```

**Behavior**:
- **New articles**: Inserted into database
- **Existing articles** (same URL): Updated with latest data
- **Server-only articles**: Kept unchanged (not deleted)

## What Gets Synced

- **Count**: Latest 20 articles (by published_at date)
- **Sources**: All sources (IAPP, Compliance Week, CISO Series, etc.)
- **Fields**: Title, summary, URL, source, framework, article_type, published_at
- **Duplicates**: Handled by URL uniqueness - latest data wins

## Deployment Flow

```
Local Database (5 articles)
    ↓
Export Script (export_latest_news.py)
    ↓
SQL File (news_articles_data.sql)
    ↓
Deployment Package (aikovrr-deploy.tar.gz)
    ↓
Server Import (psql)
    ↓
Server Database (23 articles)
    - 5 updated from local
    - 18 kept from server (crawler results)
```

## Example Scenario

### Before Deployment:
- **Local DB**: 5 articles (manually added Compliance Week articles)
- **Server DB**: 23 articles (20 seed + 3 from IAPP crawler)

### After Deployment:
- **Server DB**: 23 articles
  - 5 articles updated with latest local data
  - 18 articles unchanged (server-only articles from crawler)

### Result:
✅ Latest local articles synced to server
✅ Server crawler articles preserved
✅ No duplicates
✅ Always keeps the most recent data

## Manual Export

To export articles without deploying:

```bash
cd /Users/liransorani/CascadeProjects/aikovrr/database
python export_latest_news.py
```

View the generated SQL:
```bash
cat news_articles_data.sql
```

## Troubleshooting

### Export Fails
```
⚠️  Warning: Failed to export news articles, using existing file
```
**Solution**: The deployment will use the existing SQL file. Check:
- Django is installed: `python -c "import django"`
- Database is accessible
- news_newsarticle table exists

### Duplicates Not Updating
**Check**: URL field must be unique in the database
```sql
-- Verify unique constraint
SELECT COUNT(*), url 
FROM news_newsarticle 
GROUP BY url 
HAVING COUNT(*) > 1;
```

### Wrong Articles Exported
**Check**: The script exports latest 20 by `published_at` date
```python
# In export_latest_news.py
articles = NewsArticle.objects.filter(is_active=True).order_by('-published_at')[:20]
```

## Files

- **Export Script**: `/database/export_latest_news.py`
- **Generated SQL**: `/database/news_articles_data.sql`
- **Deployment Script**: `/deployment/deploy.sh` (Step 0/4)
- **Server Import**: `/deployment/deploy_to_gcloud.sh` (Step 9.5)

## Benefits

✅ **Always Fresh**: Server gets latest articles from local DB
✅ **No Data Loss**: Server crawler articles preserved
✅ **No Duplicates**: URL uniqueness prevents duplicates
✅ **Automatic**: Runs during every deployment
✅ **Safe**: ON CONFLICT ensures no errors

## Workflow

### Adding New Articles Locally
1. Add articles to local database (Django admin or shell)
2. Run deployment: `./deployment/deploy.sh`
3. Articles automatically synced to server

### Server Crawler Articles
1. Daily cron runs IAPP crawler
2. New articles added to server database
3. These articles stay on server (not overwritten)
4. Next deployment syncs local articles without affecting crawler articles

---

**Last Updated**: December 1, 2025
**Status**: ✅ Implemented and tested
