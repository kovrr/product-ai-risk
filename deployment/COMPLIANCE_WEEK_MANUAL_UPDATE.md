# Compliance Week Manual Update Process

## Issue
Compliance Week (complianceweek.com) uses bot protection (Cloudflare/Human Verification) that blocks automated Playwright browsers. The crawler cannot fetch articles automatically.

**Current Status:**
- URL Used: `https://www.complianceweek.com/news`
- Error: "Human Verification" page
- Last successful articles: Nov 26, 2025 (from seed data)
- RSS Feed: Not available

## Solution: Manual Updates

### Option 1: Weekly Manual Addition (Recommended)

Create a Django management command to manually add articles:

```bash
# SSH into server
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap

# Navigate to backend
cd /opt/aikovrr/backend
source venv/bin/activate

# Add article manually
python manage.py shell
```

```python
from news.models import NewsArticle
from django.utils import timezone
from datetime import datetime

# Add new Compliance Week article
NewsArticle.objects.create(
    title="Article Title Here",
    summary="Article summary or first paragraph",
    url="https://www.complianceweek.com/article-url",
    source="Compliance Week",
    source_url="https://www.complianceweek.com",
    framework="AI Governance",  # or specific framework
    article_type="standard",  # or "regulation", "framework", "guidance"
    published_at=timezone.make_aware(datetime(2025, 12, 1)),  # Article date
    is_active=True
)
```

### Option 2: Bulk Import Script

Create `/opt/aikovrr/backend/import_compliance_week.py`:

```python
#!/usr/bin/env python
"""
Manual import script for Compliance Week articles
Usage: python import_compliance_week.py
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aikovrr.settings')
django.setup()

from news.models import NewsArticle
from django.utils import timezone
from datetime import datetime

# Articles to import (update this list weekly)
articles = [
    {
        'title': 'Article Title 1',
        'summary': 'Summary text...',
        'url': 'https://www.complianceweek.com/...',
        'published_at': datetime(2025, 11, 28),
    },
    {
        'title': 'Article Title 2',
        'summary': 'Summary text...',
        'url': 'https://www.complianceweek.com/...',
        'published_at': datetime(2025, 11, 29),
    },
]

for article_data in articles:
    # Check if already exists
    if NewsArticle.objects.filter(url=article_data['url']).exists():
        print(f"⏭️  Skipped (duplicate): {article_data['title'][:50]}...")
        continue
    
    # Create article
    NewsArticle.objects.create(
        title=article_data['title'],
        summary=article_data['summary'],
        url=article_data['url'],
        source='Compliance Week',
        source_url='https://www.complianceweek.com',
        framework='AI Governance',
        article_type='standard',
        published_at=timezone.make_aware(article_data['published_at']),
        is_active=True
    )
    print(f"✅ Added: {article_data['title'][:50]}...")

print(f"\n📊 Total Compliance Week articles: {NewsArticle.objects.filter(source='Compliance Week').count()}")
```

### Option 3: Alternative Sources

Since Compliance Week is difficult to automate, consider these alternatives:

1. **Focus on IAPP** (Working well - 1-3 articles/day)
2. **Add more sources:**
   - NIST AI updates
   - EU AI Act official news
   - ISO standards updates
   - SEC AI disclosure news

## Current Compliance Week Articles

As of Dec 1, 2025:
- Total: 5 articles
- Latest: Nov 26, 2025
- Oldest: Aug 22, 2025

## Recommended Process

### Weekly (Every Monday):

1. Visit https://www.complianceweek.com/news
2. Identify 2-3 AI-related articles from past week
3. Run manual import script or add via Django shell
4. Verify on dashboard

### Monthly Review:

1. Check if Compliance Week has added RSS feed
2. Test if bot protection has changed
3. Consider reaching out to Compliance Week for API access

## Alternative: Disable Compliance Week Crawler

Since it's not working, you can disable it from the cron job:

```bash
# Edit the fetch_news.sh script
sudo nano /opt/aikovrr/backend/fetch_news.sh

# Comment out the Compliance Week line:
# python manage.py fetch_compliance_week_news --max-articles 20 >> $LOG_FILE 2>&1
```

## Summary

**Current Situation:**
- ❌ Automated crawler: Blocked by bot protection
- ✅ Manual updates: Possible via Django shell
- ✅ Existing articles: 5 articles (oldest Nov 26)
- ✅ Alternative: IAPP provides good AI governance coverage

**Recommendation:**
1. Keep existing 5 Compliance Week articles
2. Focus on IAPP (working well)
3. Manually add 1-2 Compliance Week articles weekly if desired
4. Consider adding other automated sources

**Impact:**
- Minimal - IAPP provides sufficient AI governance news
- Dashboard still shows diverse sources (IAPP, CISO Series, GRC World Forums)
- 23 total articles with regular IAPP updates
