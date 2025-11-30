from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
from bs4 import BeautifulSoup
from news.models import NewsArticle
import re
import os
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

# AI Governance keywords - strict filtering
AI_GOVERNANCE_KEYWORDS = [
    'ai governance', 'ai risk', 'ai regulation', 'ai compliance',
    'artificial intelligence governance', 'ai ethics', 'ai safety',
    'ai audit', 'ai accountability', 'algorithmic accountability',
    'ai transparency', 'explainable ai', 'ai bias', 'ai fairness',
    'ai act', 'ai framework', 'ai policy', 'ai oversight',
    'machine learning governance', 'automated decision', 'ai liability',
    'eu ai act', 'nist ai rmf', 'iso 42001', 'responsible ai',
    'ai assurance', 'ai controls', 'ai assessment', 'gdpr ai',
    'ai data protection', 'ai privacy', 'ai security'
]

class Command(BaseCommand):
    help = 'Fetch AI governance news from IAPP using headless browser'

    def add_arguments(self, parser):
        parser.add_argument(
            '--max-articles',
            type=int,
            default=20,
            help='Maximum number of articles to process'
        )

    def handle(self, *args, **options):
        max_articles = options['max_articles']
        
        self.stdout.write("=" * 80)
        self.stdout.write("🤖 IAPP AI Governance News Extraction (Headless Mode)")
        self.stdout.write("=" * 80)
        
        with sync_playwright() as p:
            self.stdout.write("\n🌐 Launching headless browser...")
            
            # Headless browser for server deployment
            browser = p.chromium.launch(
                headless=True,
                args=[
                    '--disable-blink-features=AutomationControlled',
                    '--disable-dev-shm-usage',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-gpu',
                ]
            )
            
            context = browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                locale='en-US',
            )
            
            page = context.new_page()
            
            try:
                # Step 1: Get article list from news page
                self.stdout.write("📍 Navigating to IAPP news page...")
                page.goto('https://iapp.org/news/', timeout=30000)
                page.wait_for_load_state('networkidle', timeout=30000)
                page.wait_for_timeout(3000)
                
                html = page.content()
                soup = BeautifulSoup(html, 'html.parser')
                
                # Find all article links
                news_links = soup.find_all('a', href=lambda x: x and '/news/a/' in x)
                self.stdout.write(f"✅ Found {len(news_links)} articles on news page")
                
                # Process articles
                added = 0
                skipped_not_ai = 0
                skipped_duplicate = 0
                errors = 0
                
                for i, link in enumerate(news_links[:max_articles], 1):
                    url = link.get('href', '')
                    if not url.startswith('http'):
                        url = 'https://iapp.org' + url
                    
                    # Check if already exists
                    if NewsArticle.objects.filter(url=url).exists():
                        skipped_duplicate += 1
                        continue
                    
                    # Get title from link
                    title = link.get_text(strip=True)
                    
                    # Quick filter: Check if title mentions AI
                    if not self.is_ai_governance_related(title, ''):
                        skipped_not_ai += 1
                        continue
                    
                    self.stdout.write(f"\n📄 [{i}/{len(news_links)}] Processing: {title[:60]}...")
                    
                    # Step 2: Visit article page to get full details
                    try:
                        article_data = self.extract_article_details(page, url, title)
                        
                        if article_data:
                            # Final AI governance filter with full content
                            if self.is_ai_governance_related(article_data['title'], article_data['snippet']):
                                # Save to database
                                NewsArticle.objects.create(
                                    title=article_data['title'][:500],
                                    summary=article_data['snippet'][:500],
                                    url=article_data['url'],
                                    source='IAPP',
                                    source_url='https://iapp.org',
                                    framework='AI Governance',
                                    article_type='standard',
                                    published_at=article_data['published_at'],
                                )
                                added += 1
                                self.stdout.write(self.style.SUCCESS(f"   ✅ Added: {article_data['title'][:60]}..."))
                            else:
                                skipped_not_ai += 1
                                self.stdout.write(f"   ⏭️  Skipped: Not AI governance related")
                        else:
                            errors += 1
                            
                    except Exception as e:
                        errors += 1
                        self.stdout.write(self.style.WARNING(f"   ⚠️  Error: {str(e)}"))
                        continue
                
                # Summary
                self.stdout.write("\n" + "=" * 80)
                self.stdout.write(self.style.SUCCESS(f"✅ Extraction Complete!"))
                self.stdout.write("=" * 80)
                self.stdout.write(f"📊 Results:")
                self.stdout.write(f"   • Added: {added}")
                self.stdout.write(f"   • Skipped (not AI): {skipped_not_ai}")
                self.stdout.write(f"   • Skipped (duplicate): {skipped_duplicate}")
                self.stdout.write(f"   • Errors: {errors}")
                self.stdout.write(f"   • Total in DB: {NewsArticle.objects.count()}")
                
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"\n❌ Fatal error: {str(e)}"))
                import traceback
                traceback.print_exc()
            
            finally:
                browser.close()
    
    def extract_article_details(self, page, url, fallback_title):
        """Visit article page and extract title, snippet, and published date"""
        try:
            page.goto(url, timeout=20000)
            page.wait_for_load_state('domcontentloaded', timeout=10000)
            
            html = page.content()
            soup = BeautifulSoup(html, 'html.parser')
            
            # Extract title
            title = fallback_title
            title_elem = soup.find(['h1', 'h2'], class_=lambda x: x and 'title' in str(x).lower())
            if not title_elem:
                title_elem = soup.find('h1')
            if title_elem:
                title = title_elem.get_text(strip=True)
            
            # Extract snippet (first paragraph or meta description)
            snippet = ''
            
            # Try meta description first
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            if not meta_desc:
                meta_desc = soup.find('meta', attrs={'property': 'og:description'})
            if meta_desc:
                snippet = meta_desc.get('content', '')
            
            # If no meta, get first meaningful paragraph
            if not snippet or len(snippet) < 50:
                # Look for article body
                article_body = soup.find(['article', 'div'], class_=lambda x: x and any(c in str(x).lower() for c in ['content', 'body', 'article', 'entry']))
                if article_body:
                    # Get all paragraphs
                    paragraphs = article_body.find_all('p')
                    for p in paragraphs:
                        text = p.get_text(strip=True)
                        # Skip short paragraphs (likely captions/metadata)
                        if len(text) > 50:
                            snippet = text
                            break
            
            # Fallback: any meaningful paragraph
            if not snippet or len(snippet) < 50:
                paragraphs = soup.find_all('p')
                for p in paragraphs:
                    text = p.get_text(strip=True)
                    if len(text) > 50:
                        snippet = text
                        break
            
            # Last resort: get first 200 chars of text
            if not snippet:
                text_content = soup.get_text(strip=True)
                snippet = text_content[:200]
            
            # Extract published date
            published_at = timezone.now()  # Default to now
            
            # Strategy 1: Look for <time> tag
            time_elem = soup.find('time')
            if time_elem:
                datetime_attr = time_elem.get('datetime')
                if datetime_attr:
                    published_at = self.parse_datetime(datetime_attr)
                else:
                    date_text = time_elem.get_text(strip=True)
                    published_at = self.parse_date_text(date_text)
            
            # Strategy 2: Look for date in meta tags
            if not time_elem:
                meta_date = soup.find('meta', attrs={'property': 'article:published_time'})
                if not meta_date:
                    meta_date = soup.find('meta', attrs={'name': 'publish-date'})
                if meta_date:
                    date_str = meta_date.get('content', '')
                    if date_str:
                        published_at = self.parse_datetime(date_str)
            
            # Strategy 3: Look for date in title first (IAPP often includes date in title)
            if not time_elem and not meta_date:
                date_pattern = r'\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}'
                # Check title first
                match = re.search(date_pattern, title)
                if match:
                    published_at = self.parse_date_text(match.group())
                else:
                    # Search in page text
                    text_content = soup.get_text()[:500]
                    match = re.search(date_pattern, text_content)
                    if match:
                        published_at = self.parse_date_text(match.group())
            
            return {
                'title': title,
                'snippet': snippet,
                'url': url,
                'published_at': published_at,
            }
            
        except PlaywrightTimeout:
            self.stdout.write(f"   ⏱️  Timeout loading article")
            return None
        except Exception as e:
            self.stdout.write(f"   ⚠️  Error extracting: {str(e)}")
            return None
    
    def is_ai_governance_related(self, title, snippet):
        """Check if article is about AI governance/regulation/frameworks"""
        text = f"{title} {snippet}".lower()
        return any(keyword in text for keyword in AI_GOVERNANCE_KEYWORDS)
    
    def parse_datetime(self, datetime_str):
        """Parse ISO datetime string"""
        try:
            # Try ISO format
            dt = datetime.fromisoformat(datetime_str.replace('Z', '+00:00'))
            return timezone.make_aware(dt) if timezone.is_naive(dt) else dt
        except:
            return self.parse_date_text(datetime_str)
    
    def parse_date_text(self, date_text):
        """Parse various date text formats"""
        if not date_text:
            return timezone.now()
        
        # Clean up text
        date_text = date_text.strip()
        
        # Try common formats
        formats = [
            '%d %b. %Y',      # 26 Nov. 2025
            '%d %b %Y',       # 26 Nov 2025
            '%d %B %Y',       # 26 November 2025
            '%B %d, %Y',      # November 26, 2025
            '%b %d, %Y',      # Nov 26, 2025
            '%Y-%m-%d',       # 2025-11-26
            '%m/%d/%Y',       # 11/26/2025
        ]
        
        for fmt in formats:
            try:
                dt = datetime.strptime(date_text, fmt)
                return timezone.make_aware(dt)
            except:
                continue
        
        # If all fail, return current time
        return timezone.now()
