# News Extraction - Quick Start Guide

## Goal
Automate AI governance news extraction from 4 sources with **zero cost** and **no 3rd party registrations**.

## Phase 1: Test RSS Feeds (1-2 hours)

### Step 1: Create Test Script
```bash
cd /Users/liransorani/CascadeProjects/aikovrr/backend
```

Create `news/test_rss.py`:
```python
import requests
import feedparser

RSS_URLS = {
    'IAPP': [
        'https://iapp.org/rss/daily-dashboard',
        'https://iapp.org/feed',
    ],
    'CISO Series': [
        'https://cisoseries.com/feed/',
        'https://cisoseries.com/category/podcast/cyber-security-headlines/feed/',
    ],
    'GRC World Forums': [
        'https://www.grcworldforums.com/rss',
        'https://www.grcworldforums.com/feed',
        'https://www.grcworldforums.com/rss.xml',
    ],
    'Compliance Week': [
        'https://www.complianceweek.com/rss',
        'https://www.complianceweek.com/feed',
        'https://www.complianceweek.com/news/feed',
    ]
}

def test_rss_feed(url):
    """Test if RSS feed is accessible"""
    try:
        print(f"\n🔍 Testing: {url}")
        response = requests.get(url, timeout=10, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        })
        
        print(f"   Status: {response.status_code}")
        print(f"   Content-Type: {response.headers.get('Content-Type', 'N/A')}")
        
        if response.status_code == 200:
            feed = feedparser.parse(response.content)
            if len(feed.entries) > 0:
                print(f"   ✅ SUCCESS - {len(feed.entries)} articles found")
                print(f"   Latest: {feed.entries[0].title[:60]}...")
                return True
            else:
                print(f"   ❌ FAIL - No entries found")
        else:
            print(f"   ❌ FAIL - HTTP {response.status_code}")
        
        return False
    except Exception as e:
        print(f"   ❌ ERROR - {str(e)}")
        return False

if __name__ == '__main__':
    print("=" * 80)
    print("RSS FEED TESTING")
    print("=" * 80)
    
    results = {}
    for source, urls in RSS_URLS.items():
        print(f"\n{'='*80}")
        print(f"SOURCE: {source}")
        print(f"{'='*80}")
        
        working_feeds = []
        for url in urls:
            if test_rss_feed(url):
                working_feeds.append(url)
        
        results[source] = working_feeds
    
    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80)
    for source, feeds in results.items():
        if feeds:
            print(f"✅ {source}: {len(feeds)} working feed(s)")
            for feed in feeds:
                print(f"   - {feed}")
        else:
            print(f"❌ {source}: No working RSS feeds")
```

### Step 2: Run Test
```bash
cd /Users/liransorani/CascadeProjects/aikovrr/backend
source venv/bin/activate
python news/test_rss.py
```

### Step 3: Analyze Results
- ✅ If RSS feeds work → Proceed to Phase 2 (RSS Extractor)
- ❌ If no RSS feeds → Proceed to Phase 3 (Browser Automation)

---

## Phase 2: RSS Extractor (4-6 hours)

### Only if RSS feeds work from Phase 1

Create `news/management/commands/fetch_rss_news.py`:
```python
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime
import feedparser
import requests
from news.models import NewsArticle

AI_KEYWORDS = [
    'ai governance', 'ai risk', 'ai regulation', 'ai compliance',
    'artificial intelligence', 'ai ethics', 'ai safety', 'ai audit',
    'algorithmic accountability', 'explainable ai', 'ai bias',
    'eu ai act', 'nist ai rmf', 'iso 42001', 'machine learning governance'
]

RSS_FEEDS = {
    'IAPP': 'https://iapp.org/rss/daily-dashboard',
    # Add working feeds from Phase 1 test results
}

class Command(BaseCommand):
    help = 'Fetch AI governance news from RSS feeds'

    def handle(self, *args, **options):
        total_added = 0
        
        for source, feed_url in RSS_FEEDS.items():
            self.stdout.write(f"\n📰 Fetching from {source}...")
            
            try:
                feed = feedparser.parse(feed_url)
                added = 0
                
                for entry in feed.entries[:20]:
                    title = entry.get('title', '')
                    summary = entry.get('summary', entry.get('description', ''))
                    
                    # Filter for AI governance
                    text = f"{title} {summary}".lower()
                    if not any(kw in text for kw in AI_KEYWORDS):
                        continue
                    
                    url = entry.get('link', '')
                    
                    # Check if already exists
                    if NewsArticle.objects.filter(url=url).exists():
                        continue
                    
                    # Parse date
                    published_parsed = entry.get('published_parsed') or entry.get('updated_parsed')
                    if published_parsed:
                        published_at = timezone.make_aware(datetime(*published_parsed[:6]))
                    else:
                        published_at = timezone.now()
                    
                    # Create article
                    NewsArticle.objects.create(
                        title=title[:500],
                        summary=summary[:500] if summary else '',
                        url=url,
                        source=source,
                        source_url=feed_url.split('/')[0] + '//' + feed_url.split('/')[2],
                        framework='AI Governance',
                        article_type='standard',
                        published_at=published_at,
                    )
                    added += 1
                
                self.stdout.write(self.style.SUCCESS(f"   ✅ Added {added} articles from {source}"))
                total_added += added
                
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"   ❌ Error: {str(e)}"))
        
        self.stdout.write(self.style.SUCCESS(f"\n🎉 Total: {total_added} new articles"))
```

### Test:
```bash
python manage.py fetch_rss_news
```

### Schedule Daily (Cron):
```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 6 AM)
0 6 * * * cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_rss_news >> /var/log/aikovrr-news.log 2>&1
```

---

## Phase 3: Browser Automation for IAPP (8-12 hours)

### Only if RSS feeds don't work

### Step 1: Install Playwright
```bash
cd /Users/liransorani/CascadeProjects/aikovrr/backend
source venv/bin/activate
pip install playwright beautifulsoup4
playwright install chromium
```

### Step 2: Add to requirements.txt
```txt
playwright==1.40.0
beautifulsoup4==4.12.2
```

### Step 3: Create IAPP Extractor
Create `news/management/commands/fetch_iapp_news.py`:
```python
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from news.models import NewsArticle
import re

AI_KEYWORDS = [
    'ai governance', 'ai risk', 'ai regulation', 'artificial intelligence',
    'ai ethics', 'ai safety', 'algorithmic', 'machine learning governance'
]

class Command(BaseCommand):
    help = 'Fetch AI governance news from IAPP using browser automation'

    def handle(self, *args, **options):
        self.stdout.write("🌐 Starting IAPP extraction...")
        
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            
            try:
                # Navigate to IAPP news page
                self.stdout.write("   Navigating to IAPP...")
                page.goto('https://iapp.org/news/', timeout=30000)
                
                # Wait for content to load
                page.wait_for_timeout(3000)
                
                # Get page content
                html = page.content()
                soup = BeautifulSoup(html, 'html.parser')
                
                # Find article elements (adjust selectors based on actual HTML)
                articles = soup.select('article, .news-item, .article-card')
                
                added = 0
                for article in articles[:20]:
                    try:
                        # Extract title
                        title_elem = article.select_one('h2, h3, .title, .headline')
                        if not title_elem:
                            continue
                        title = title_elem.get_text(strip=True)
                        
                        # Extract URL
                        link_elem = article.select_one('a')
                        if not link_elem:
                            continue
                        url = link_elem.get('href', '')
                        if not url.startswith('http'):
                            url = 'https://iapp.org' + url
                        
                        # Extract summary
                        summary_elem = article.select_one('p, .summary, .excerpt')
                        summary = summary_elem.get_text(strip=True) if summary_elem else ''
                        
                        # Extract date
                        date_elem = article.select_one('.date, time, .published')
                        date_str = date_elem.get_text(strip=True) if date_elem else ''
                        
                        # Filter for AI governance
                        text = f"{title} {summary}".lower()
                        if not any(kw in text for kw in AI_KEYWORDS):
                            continue
                        
                        # Check if exists
                        if NewsArticle.objects.filter(url=url).exists():
                            continue
                        
                        # Parse date
                        published_at = self.parse_date(date_str) or timezone.now()
                        
                        # Create article
                        NewsArticle.objects.create(
                            title=title[:500],
                            summary=summary[:500],
                            url=url,
                            source='IAPP',
                            source_url='https://iapp.org',
                            framework='AI Governance',
                            article_type='standard',
                            published_at=published_at,
                        )
                        added += 1
                        self.stdout.write(f"   ✅ {title[:60]}...")
                        
                    except Exception as e:
                        self.stdout.write(self.style.WARNING(f"   ⚠️  Skipped article: {str(e)}"))
                        continue
                
                self.stdout.write(self.style.SUCCESS(f"\n🎉 Added {added} articles from IAPP"))
                
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"❌ Error: {str(e)}"))
            
            finally:
                browser.close()
    
    def parse_date(self, date_str):
        """Parse various date formats"""
        if not date_str:
            return None
        
        # Try common formats
        formats = [
            '%B %d, %Y',  # November 28, 2025
            '%b %d, %Y',  # Nov 28, 2025
            '%Y-%m-%d',   # 2025-11-28
            '%m/%d/%Y',   # 11/28/2025
        ]
        
        for fmt in formats:
            try:
                dt = datetime.strptime(date_str, fmt)
                return timezone.make_aware(dt)
            except:
                continue
        
        return None
```

### Step 4: Test
```bash
python manage.py fetch_iapp_news
```

### Step 5: Inspect HTML to Fix Selectors
If extraction fails, inspect the actual HTML:
```python
# Add this to the command temporarily
with open('/tmp/iapp_page.html', 'w') as f:
    f.write(html)
print("HTML saved to /tmp/iapp_page.html")
```

Then open the file and find the correct CSS selectors for:
- Article containers
- Title elements
- Link elements
- Summary/description elements
- Date elements

---

## Phase 4: Unified Command (1 hour)

Create `news/management/commands/fetch_all_news.py`:
```python
from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Fetch news from all sources'

    def handle(self, *args, **options):
        self.stdout.write("🚀 Fetching news from all sources...\n")
        
        # Try RSS first
        try:
            call_command('fetch_rss_news')
        except:
            self.stdout.write(self.style.WARNING("⚠️  RSS fetch skipped"))
        
        # Try IAPP browser automation
        try:
            call_command('fetch_iapp_news')
        except:
            self.stdout.write(self.style.WARNING("⚠️  IAPP fetch skipped"))
        
        self.stdout.write(self.style.SUCCESS("\n✅ All sources processed"))
```

---

## Deployment Checklist

### Local Testing:
- [ ] RSS feeds tested
- [ ] Extractor commands working
- [ ] Articles appearing in database
- [ ] Frontend displaying articles

### Production Deployment:
- [ ] Add new dependencies to requirements.txt
- [ ] Install Playwright on server (if using browser automation)
- [ ] Setup cron job for daily extraction
- [ ] Test extraction on server
- [ ] Monitor logs for errors

### Cron Setup (Production):
```bash
# SSH to server
ssh user@136.113.138.156

# Edit crontab
crontab -e

# Add daily job at 6 AM
0 6 * * * cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news >> /var/log/aikovrr-news.log 2>&1
```

---

## Monitoring & Maintenance

### Check Logs:
```bash
tail -f /var/log/aikovrr-news.log
```

### Manual Run:
```bash
cd /opt/aikovrr/backend
source venv/bin/activate
python manage.py fetch_all_news
```

### Check Database:
```bash
python manage.py shell
```
```python
from news.models import NewsArticle
print(f"Total articles: {NewsArticle.objects.count()}")
print(f"Last 24h: {NewsArticle.objects.filter(fetched_at__gte=timezone.now() - timedelta(days=1)).count()}")
```

---

## Troubleshooting

### RSS Feed Returns 403/CAPTCHA:
→ Skip that source or use browser automation

### Browser Automation Fails:
→ Check CSS selectors, inspect HTML, adjust wait times

### No Articles Extracted:
→ Check keyword filtering, may be too strict

### Duplicate Articles:
→ URL deduplication should prevent this

---

## Success Criteria

- ✅ 5-15 new articles per day
- ✅ 90%+ AI governance relevance
- ✅ Zero manual intervention
- ✅ Zero operating costs

---

## Next Steps

1. **Start with Phase 1** - Test RSS feeds (1-2 hours)
2. **Choose path** based on results:
   - RSS works → Phase 2 (RSS Extractor)
   - RSS blocked → Phase 3 (Browser Automation)
3. **Deploy** Phase 4 (Unified Command)
4. **Schedule** daily cron job
5. **Monitor** for 1 week

**Estimated Total Time:** 10-20 hours
**Estimated Total Cost:** $0
