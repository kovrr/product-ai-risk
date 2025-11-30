# AI Governance News Extraction - Technical Implementation Plan

## Date: November 29, 2025

## Executive Summary

This plan adapts the news extraction requirements to work within the existing Django/Python framework with **zero 3rd party service dependencies** and **no registration/API keys required**.

## Constraints & Requirements

### Hard Requirements:
- ✅ **Free** - No paid services (no CAPTCHA solvers, no OpenAI API)
- ✅ **No Registration** - No 3rd party API keys or accounts
- ✅ **Django/Python** - Integrate with existing backend
- ✅ **Self-Hosted** - All processing on our infrastructure

### Technical Stack (Already Available):
- Python 3.9+
- Django 4.2.7
- PostgreSQL (existing database)
- Existing `NewsArticle` model

## Revised Source Assessment

Based on CAPTCHA/authentication barriers, here's the realistic approach:

### ✅ Viable Sources (No CAPTCHA):
1. **IAPP** - Browser automation possible
2. **RSS Feeds** - If available (test first)

### ⚠️ Challenging Sources (CAPTCHA Protected):
3. **CISO Series** - Cloudflare CAPTCHA
4. **GRC World Forums** - Cloudflare CAPTCHA
5. **Compliance Week** - Cloudflare CAPTCHA + Paywall

### ❌ Not Viable:
6. **AI Governance Institute** - Outdated (last update 2018)

## Recommended Implementation Strategy

### Phase 1: RSS-First Approach (Week 1) - PRIORITY
**Goal:** Extract maximum content with minimal complexity

#### Implementation:
```python
# backend/news/extractors/rss_extractor.py

import feedparser
import requests
from datetime import datetime
from django.utils import timezone
from news.models import NewsArticle

RSS_SOURCES = {
    'IAPP': 'https://iapp.org/rss/daily-dashboard',
    'CISO Series': [
        'https://cisoseries.com/feed/',
        'https://cisoseries.com/category/podcast/cyber-security-headlines/feed/',
    ],
    'GRC World Forums': [
        'https://www.grcworldforums.com/rss',
        'https://www.grcworldforums.com/feed',
    ],
    'Compliance Week': [
        'https://www.complianceweek.com/rss',
        'https://www.complianceweek.com/feed',
    ]
}

def test_rss_feed(url):
    """Test if RSS feed is accessible without CAPTCHA"""
    try:
        response = requests.get(url, timeout=10, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        })
        if response.status_code == 200 and 'xml' in response.headers.get('Content-Type', ''):
            feed = feedparser.parse(response.content)
            return len(feed.entries) > 0
        return False
    except:
        return False

def extract_from_rss(source_name, feed_url):
    """Extract articles from RSS feed"""
    feed = feedparser.parse(feed_url)
    articles = []
    
    for entry in feed.entries[:20]:
        # Filter for AI governance keywords
        if is_ai_governance_related(entry.title, entry.get('summary', '')):
            articles.append({
                'title': entry.title[:500],
                'summary': clean_text(entry.get('summary', ''))[:500],
                'url': entry.link,
                'source': source_name,
                'published_at': parse_date(entry.get('published_parsed')),
            })
    
    return articles
```

**Deliverables:**
- Django management command: `python manage.py test_rss_feeds`
- Django management command: `python manage.py fetch_rss_news`
- Automated keyword filtering (AI governance related)
- Deduplication by URL

**Effort:** 8-12 hours

---

### Phase 2: Playwright Browser Automation (Week 2) - IAPP ONLY
**Goal:** Extract from IAPP using browser automation (no CAPTCHA)

#### Implementation:
```python
# backend/news/extractors/iapp_extractor.py

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from news.models import NewsArticle

def extract_iapp_articles():
    """Extract AI governance articles from IAPP using Playwright"""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Navigate to IAPP news page
        page.goto('https://iapp.org/news/')
        
        # Apply AI Governance filter (if available)
        # Wait for dynamic content to load
        page.wait_for_selector('.article-card', timeout=10000)
        
        # Extract article cards
        html = page.content()
        soup = BeautifulSoup(html, 'html.parser')
        
        articles = []
        for card in soup.select('.article-card')[:20]:
            title = card.select_one('.article-title').text.strip()
            url = card.select_one('a')['href']
            date_str = card.select_one('.article-date').text.strip()
            summary = card.select_one('.article-summary').text.strip()
            
            if is_ai_governance_related(title, summary):
                articles.append({
                    'title': title[:500],
                    'summary': summary[:500],
                    'url': url,
                    'source': 'IAPP',
                    'published_at': parse_date(date_str),
                })
        
        browser.close()
        return articles
```

**Dependencies to Add:**
```txt
# backend/requirements.txt
playwright==1.40.0
beautifulsoup4==4.12.2
```

**Setup:**
```bash
pip install playwright
playwright install chromium
```

**Deliverables:**
- Django management command: `python manage.py fetch_iapp_news`
- Headless browser automation
- CSS selector-based extraction
- Error handling and retries

**Effort:** 12-16 hours

---

### Phase 3: Smart Summarization (Week 3) - NO OPENAI
**Goal:** Generate summaries without paid APIs

#### Free Alternatives to OpenAI:

**Option A: Extract First N Words**
```python
def generate_summary(article_text, max_words=25):
    """Extract first 25 words as summary"""
    words = article_text.split()[:max_words]
    return ' '.join(words) + '...'
```

**Option B: Use Free Local LLM (Ollama)**
```python
# Requires: pip install ollama
import ollama

def generate_summary_local(article_text, max_words=25):
    """Generate summary using local Ollama model"""
    response = ollama.chat(model='llama2', messages=[
        {
            'role': 'system',
            'content': 'You are a compliance news summarizer. Create concise summaries.'
        },
        {
            'role': 'user',
            'content': f'Summarize in {max_words} words: {article_text[:2000]}'
        }
    ])
    return response['message']['content']
```

**Option C: Use Hugging Face Transformers (Free)**
```python
from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def generate_summary_hf(article_text, max_words=25):
    """Generate summary using Hugging Face model"""
    summary = summarizer(article_text[:1024], max_length=50, min_length=20)
    return summary[0]['summary_text']
```

**Recommended:** Option A (simple) for MVP, Option C (Hugging Face) for quality

**Deliverables:**
- Summary generation function
- Caching to avoid re-processing
- Django management command: `python manage.py generate_summaries`

**Effort:** 6-10 hours

---

### Phase 4: CAPTCHA Handling - FREE APPROACH (Week 4)
**Goal:** Bypass CAPTCHA without paid services

#### Stealth Browser Automation (Free):
```python
# backend/news/extractors/stealth_browser.py

from playwright.sync_api import sync_playwright
from playwright_stealth import stealth_sync

def create_stealth_browser():
    """Create browser with anti-detection measures"""
    p = sync_playwright().start()
    browser = p.chromium.launch(
        headless=False,  # Some CAPTCHAs detect headless
        args=[
            '--disable-blink-features=AutomationControlled',
            '--disable-dev-shm-usage',
            '--no-sandbox',
        ]
    )
    context = browser.new_context(
        viewport={'width': 1920, 'height': 1080},
        user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    )
    page = context.new_page()
    stealth_sync(page)  # Apply stealth patches
    return browser, page
```

**Dependencies:**
```txt
playwright-stealth==1.0.6
```

**Success Rate:** 60-80% (may still trigger CAPTCHA)

**Fallback Strategy:**
```python
def extract_with_fallback(source_name, url):
    """Try stealth browser, fallback to manual flag"""
    try:
        return extract_with_stealth(url)
    except CaptchaDetectedError:
        # Log for manual review
        logger.warning(f"CAPTCHA detected for {source_name}")
        # Send admin notification
        send_admin_email(f"Manual intervention needed for {source_name}")
        return []
```

**Deliverables:**
- Stealth browser wrapper
- CAPTCHA detection logic
- Admin notification system
- Manual intervention workflow

**Effort:** 10-15 hours

---

## Django Integration Architecture

### New Django App Structure:
```
backend/news/
├── models.py (existing NewsArticle model)
├── extractors/
│   ├── __init__.py
│   ├── base.py           # Base extractor class
│   ├── rss_extractor.py  # RSS feed extraction
│   ├── iapp_extractor.py # IAPP browser automation
│   └── stealth_browser.py # Anti-CAPTCHA utilities
├── management/
│   └── commands/
│       ├── test_rss_feeds.py
│       ├── fetch_rss_news.py
│       ├── fetch_iapp_news.py
│       ├── fetch_all_news.py
│       └── generate_summaries.py
├── utils/
│   ├── filters.py        # AI governance keyword filtering
│   ├── deduplication.py  # Duplicate detection
│   └── summarizer.py     # Summary generation
└── services.py (updated)
```

### Updated Models (No Changes Needed):
```python
# backend/news/models.py - Already exists, no changes needed!

class NewsArticle(models.Model):
    title = models.CharField(max_length=500)
    summary = models.TextField(blank=True, null=True)
    url = models.URLField(max_length=1000, unique=True)
    source = models.CharField(max_length=100)
    source_url = models.URLField(max_length=500, blank=True, null=True)
    framework = models.CharField(max_length=100, blank=True, null=True)
    article_type = models.CharField(max_length=50, choices=ARTICLE_TYPES)
    published_at = models.DateTimeField()
    fetched_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
```

### AI Governance Keyword Filtering:
```python
# backend/news/utils/filters.py

AI_GOVERNANCE_KEYWORDS = [
    'ai governance', 'ai risk', 'ai regulation', 'ai compliance',
    'artificial intelligence governance', 'ai ethics', 'ai safety',
    'ai audit', 'ai accountability', 'algorithmic accountability',
    'ai transparency', 'explainable ai', 'ai bias', 'ai fairness',
    'ai act', 'ai framework', 'ai policy', 'ai oversight',
    'machine learning governance', 'automated decision', 'ai liability',
    'eu ai act', 'nist ai rmf', 'iso 42001', 'responsible ai'
]

def is_ai_governance_related(title, summary):
    """Check if article is about AI risk governance"""
    text = f"{title} {summary}".lower()
    return any(keyword in text for keyword in AI_GOVERNANCE_KEYWORDS)
```

### Deduplication:
```python
# backend/news/utils/deduplication.py

from difflib import SequenceMatcher

def is_duplicate(new_article, existing_articles):
    """Check if article is duplicate using fuzzy matching"""
    for existing in existing_articles:
        # Check URL match
        if new_article['url'] == existing.url:
            return True
        
        # Check title similarity (90% threshold)
        similarity = SequenceMatcher(None, 
            new_article['title'].lower(), 
            existing.title.lower()
        ).ratio()
        
        if similarity > 0.9:
            return True
    
    return False
```

### Scheduling (Using Django-Cron or Celery):

**Option A: Django Management Command + Cron**
```bash
# /etc/cron.d/aikovrr-news
0 6 * * * cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news >> /var/log/aikovrr-news.log 2>&1
```

**Option B: Celery Beat (if already using Celery)**
```python
# backend/aikovrr/celery.py

from celery import Celery
from celery.schedules import crontab

app = Celery('aikovrr')

app.conf.beat_schedule = {
    'fetch-news-daily': {
        'task': 'news.tasks.fetch_all_news',
        'schedule': crontab(hour=6, minute=0),  # 6 AM daily
    },
}
```

---

## Implementation Phases - Revised Timeline

### Phase 1: RSS-First MVP (Week 1) ✅ RECOMMENDED START
**Effort:** 8-12 hours
**Cost:** $0
**Success Rate:** 80-90% (if RSS feeds work)

**Tasks:**
1. Test all RSS feed URLs
2. Implement RSS extractor
3. Add keyword filtering
4. Add deduplication
5. Create management command
6. Test with real data

**Deliverable:** Working RSS extraction for all sources that have feeds

---

### Phase 2: IAPP Browser Automation (Week 2)
**Effort:** 12-16 hours
**Cost:** $0
**Success Rate:** 90-95%

**Tasks:**
1. Install Playwright
2. Implement IAPP extractor
3. Add error handling
4. Test extraction reliability
5. Create management command
6. Schedule daily runs

**Deliverable:** Automated IAPP article extraction

---

### Phase 3: Free Summarization (Week 3)
**Effort:** 6-10 hours
**Cost:** $0
**Success Rate:** 100%

**Tasks:**
1. Choose summarization approach (simple vs. Hugging Face)
2. Implement summary generator
3. Add caching
4. Backfill existing articles
5. Test quality

**Deliverable:** Auto-generated summaries for all articles

---

### Phase 4: Stealth CAPTCHA Bypass (Week 4) - OPTIONAL
**Effort:** 10-15 hours
**Cost:** $0
**Success Rate:** 60-80%

**Tasks:**
1. Install playwright-stealth
2. Implement stealth browser
3. Test against CAPTCHA sites
4. Add fallback logic
5. Setup admin notifications

**Deliverable:** Partial automation for CAPTCHA-protected sites

---

## Total Effort & Cost Estimate

### Development Time:
- **Minimum (RSS only):** 8-12 hours
- **Recommended (RSS + IAPP):** 20-28 hours
- **Full (All phases):** 36-53 hours

### Monthly Operating Costs:
- **Infrastructure:** $0 (using existing server)
- **APIs:** $0 (no paid services)
- **Total:** $0/month

### One-Time Setup:
- Playwright installation: 30 minutes
- Hugging Face models (optional): 1-2 hours download

---

## Risk Mitigation

### Risk 1: RSS Feeds Don't Exist
**Mitigation:** Focus on IAPP browser automation first

### Risk 2: CAPTCHA Blocks All Automation
**Mitigation:** 
- Use stealth techniques
- Fallback to manual article addition (current workflow)
- Run extractions less frequently (weekly vs. daily)

### Risk 3: Site Structure Changes
**Mitigation:**
- Robust CSS selectors
- Error notifications
- Graceful degradation

### Risk 4: Summary Quality (Without OpenAI)
**Mitigation:**
- Use Hugging Face transformers (free, good quality)
- Or keep simple "first N words" approach
- Manual review workflow

---

## Recommended Implementation Path

### 🎯 MVP (2 weeks, $0 cost):

**Week 1:**
1. Test all RSS feeds
2. Implement RSS extractor for working feeds
3. Add keyword filtering
4. Deploy and test

**Week 2:**
1. Implement IAPP browser automation
2. Add deduplication
3. Setup daily cron job
4. Monitor for 1 week

**Result:** Automated daily news from IAPP + any working RSS feeds

### 🚀 Enhanced (4 weeks, $0 cost):

Add Phases 3-4 for summarization and CAPTCHA handling

---

## Success Metrics

### Technical Metrics:
- Articles extracted per day: 10-20
- Extraction success rate: >80%
- Duplicate rate: <5%
- AI governance relevance: >90%

### Business Metrics:
- Fresh news in dashboard daily
- 4 diverse sources represented
- Zero manual intervention needed
- Zero operating costs

---

## Next Steps

### Immediate Actions:
1. ✅ Test RSS feeds for all 4 sources
2. ✅ Choose Phase 1 (RSS) or Phase 2 (IAPP) to start
3. ✅ Install Playwright if doing browser automation
4. ✅ Create `extractors/` directory structure
5. ✅ Implement first extractor

### Decision Points:
- **Use Playwright?** YES if RSS feeds don't work
- **Use Hugging Face?** YES if summary quality matters
- **Use stealth CAPTCHA bypass?** ONLY if other methods fail

---

## Conclusion

This plan provides a **100% free, self-hosted solution** for automated AI governance news extraction using Django/Python. The RSS-first approach minimizes complexity while the browser automation fallback ensures we can extract from IAPP reliably.

**Recommended Start:** Phase 1 (RSS testing) - 8-12 hours, $0 cost

**Expected Outcome:** Daily automated news from 2-4 sources with zero ongoing costs.
