# News Feed Fix Summary

## Issue
The Compliance News Feed was showing empty even though 20 articles were imported during deployment.

## Root Cause
The database uses a custom schema called `aikovrr` (not the default `public` schema). 

**What happened:**
1. Django migrations created the `news_newsarticle` table in the `aikovrr` schema
2. The deployment script imported news articles using `psql -f news_articles_data.sql`
3. Without setting the search_path, psql defaulted to the `public` schema
4. Articles were inserted into `public.news_newsarticle` (wrong table)
5. Django queries the `aikovrr.news_newsarticle` table (correct table, but empty)

**Result:** Two tables existed with the same name in different schemas:
- `public.news_newsarticle` - Had 20 articles (wrong location)
- `aikovrr.news_newsarticle` - Empty (correct location for Django)

## Solution Applied

### 1. Immediate Fix (Manual)
Copied data from public schema to aikovrr schema:
```sql
INSERT INTO aikovrr.news_newsarticle 
SELECT * FROM public.news_newsarticle
ON CONFLICT (url) DO NOTHING;
```

### 2. Deployment Script Fix
Updated `/deployment/deploy_to_gcloud.sh` Step 9.5 to set the correct schema before importing:

**Before:**
```bash
sudo -u postgres psql -d $DB_NAME -f $APP_DIR/database/news_articles_data.sql
```

**After:**
```bash
sudo -u postgres psql -d $DB_NAME <<EOSQL
-- Set search path to aikovrr schema
SET search_path TO aikovrr, public;

-- Import news articles
\i $APP_DIR/database/news_articles_data.sql

-- Verify import
SELECT COUNT(*) as article_count FROM news_newsarticle;
EOSQL
```

## Verification

### Check articles are in correct schema:
```bash
sudo -u postgres psql -d aikovrr -c "SELECT COUNT(*) FROM aikovrr.news_newsarticle;"
```

### Test API endpoint:
```bash
curl https://risk-ai.kovrr.com/api/news/articles/ | jq '.count'
# Should return: 20
```

### Test in browser:
1. Go to https://risk-ai.kovrr.com
2. Login with any user
3. Check Compliance News Feed on dashboard
4. Should show 20 articles

## Database Schema Structure

The database uses a custom schema:
```sql
CREATE SCHEMA IF NOT EXISTS aikovrr;
SET search_path TO aikovrr, public;
```

**All Django models use the `aikovrr` schema:**
- auth_app_user
- core_tenant
- core_department
- core_user
- news_newsarticle
- visibility_asset
- risk_scenario
- governance_framework
- etc.

## Future Deployments

The deployment script is now fixed and will:
1. ✅ Create database
2. ✅ Import schema (creates `aikovrr` schema)
3. ✅ Import data (uses `aikovrr` schema)
4. ✅ Run Django migrations (creates tables in `aikovrr` schema)
5. ✅ Import news articles **into `aikovrr` schema** (FIXED)
6. ✅ Set user passwords
7. ✅ Build and deploy frontend

## Related Files

- `/deployment/deploy_to_gcloud.sh` - Main deployment script (FIXED)
- `/database/aikovrr_schema_v2.sql` - Schema definition (creates aikovrr schema)
- `/database/news_articles_data.sql` - News articles data
- `/backend/news/models.py` - NewsArticle model
- `/backend/aikovrr/settings.py` - Django settings (uses postgres user with aikovrr schema)

## Lessons Learned

1. **Always set search_path** when importing data into PostgreSQL with custom schemas
2. **Verify data location** after import (check which schema)
3. **Test API endpoints** after deployment to catch schema issues early
4. **Document schema structure** clearly in deployment guides

## Status

✅ **FIXED** - News feed now works correctly
✅ **DEPLOYED** - Fix is live on production server
✅ **TESTED** - API returns 20 articles
✅ **FUTURE-PROOF** - Deployment script updated for future deployments
