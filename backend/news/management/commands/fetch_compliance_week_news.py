from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
from bs4 import BeautifulSoup
from news.models import NewsArticle
import re
import os
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

# AI Governance keywords
AI_GOVERNANCE_KEYWORDS = [
    'ai governance', 'ai risk', 'ai regulation', 'ai compliance',
    'artificial intelligence', 'ai ethics', 'ai safety', 'ai audit',
    'algorithmic accountability', 'explainable ai', 'ai bias',
    'ai act', 'ai framework', 'ai policy', 'ai oversight',
    'machine learning governance', 'automated decision', 'ai liability',
    'eu ai act', 'nist ai rmf', 'iso 42001', 'responsible ai',
    'ai assurance', 'ai controls', 'ai assessment'
]

class Command(BaseCommand):
    help = 'Fetch AI governance news from Compliance Week'

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
        self.stdout.write("📰 Compliance Week AI Governance News Extraction")
        self.stdout.write("=" * 80)
        
        with sync_playwright() as p:
            self.stdout.write("\n🌐 Launching headless browser...")
            
            browser = p.chromium.launch(
                headless=True,
                args=[
                    '--disable-blink-features=AutomationControlled',
                    '--disable-dev-shm-usage',
                    '--no-sandbox',
                ]
            )
            
            context = browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
            )
            
            page = context.new_page()
            
            try:
                # Navigate to AI news category page
                self.stdout.write("📍 Navigating to Compliance Week AI category...")
                page.goto('https://www.complianceweek.com/news/ai', timeout=30000)
                page.wait_for_load_state('domcontentloaded', timeout=30000)
                page.wait_for_timeout(3000)
                
                html = page.content()
                soup = BeautifulSoup(html, 'html.parser')
                
                # Find article links (ending in .article)
                all_links = soup.find_all('a', href=True)
                article_links = [
                    l for l in all_links
                    if '.article' in l.get('href', '')
                ]
                
                self.stdout.write(f"✅ Found {len(article_links)} potential articles")
                
                added = 0
                skipped_not_ai = 0
                skipped_duplicate = 0
                errors = 0
                
                for i, link in enumerate(article_links[:max_articles], 1):
                    url = link.get('href', '')
                    if not url.startswith('http'):
                        url = 'https://www.complianceweek.com' + url
                    
                    # Check if already exists
                    if NewsArticle.objects.filter(url=url).exists():
                        skipped_duplicate += 1
                        continue
                    
                    # Get title from link
                    title = link.get_text(strip=True)
                    
                    # Quick filter
                    if not self.is_ai_governance_related(title, ''):
                        skipped_not_ai += 1
                        continue
                    
                    self.stdout.write(f"\n📄 [{i}/{max_articles}] Processing: {title[:60]}...")
                    
                    # Extract article details
                    try:
                        article_data = self.extract_article_details(page, url, title)
                        
                        if article_data:
                            # Final AI governance filter
                            if self.is_ai_governance_related(article_data['title'], article_data['snippet']):
                                NewsArticle.objects.create(
                                    title=article_data['title'][:500],
                                    summary=article_data['snippet'][:500],
                                    url=article_data['url'],
                                    source='Compliance Week',
                                    source_url='https://www.complianceweek.com',
                                    framework='AI Governance',
                                    article_type='standard',
                                    published_at=article_data['published_at'],
                                )
                                added += 1
                                self.stdout.write(self.style.SUCCESS(f"   ✅ Added"))
                            else:
                                skipped_not_ai += 1
                                self.stdout.write(f"   ⏭️  Skipped: Not AI governance")
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
            
            finally:
                browser.close()
    
    def extract_article_details(self, page, url, fallback_title):
        """Visit article and extract details"""
        try:
            page.goto(url, timeout=20000, wait_until='domcontentloaded')
            page.wait_for_timeout(2000)
            
            html = page.content()
            soup = BeautifulSoup(html, 'html.parser')
            
            # Extract title
            title = fallback_title
            title_elem = soup.find('h1')
            if title_elem:
                title = title_elem.get_text(strip=True)
            
            # Extract snippet
            snippet = ''
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            if not meta_desc:
                meta_desc = soup.find('meta', attrs={'property': 'og:description'})
            if meta_desc:
                snippet = meta_desc.get('content', '')
            
            if not snippet or len(snippet) < 50:
                paragraphs = soup.find_all('p')
                for p in paragraphs:
                    text = p.get_text(strip=True)
                    if len(text) > 50:
                        snippet = text
                        break
            
            # Extract date
            published_at = timezone.now()
            
            # Strategy 1: Look for time tag
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
                if not meta_date:
                    meta_date = soup.find('meta', attrs={'name': 'date'})
                if meta_date:
                    published_at = self.parse_datetime(meta_date.get('content', ''))
            
            # Strategy 3: Look for date in page text (e.g., "November 26, 2025")
            if not time_elem and not meta_date:
                date_pattern = r'(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},\s+\d{4}'
                text_content = soup.get_text()[:1000]
                match = re.search(date_pattern, text_content)
                if match:
                    published_at = self.parse_date_text(match.group())
            
            return {
                'title': title,
                'snippet': snippet,
                'url': url,
                'published_at': published_at,
            }
            
        except Exception as e:
            return None
    
    def is_ai_governance_related(self, title, snippet):
        """Check if article is about AI governance"""
        text = f"{title} {snippet}".lower()
        return any(keyword in text for keyword in AI_GOVERNANCE_KEYWORDS)
    
    def parse_datetime(self, datetime_str):
        """Parse ISO datetime"""
        try:
            dt = datetime.fromisoformat(datetime_str.replace('Z', '+00:00'))
            return timezone.make_aware(dt) if timezone.is_naive(dt) else dt
        except:
            return timezone.now()
    
    def parse_date_text(self, date_text):
        """Parse date text"""
        if not date_text:
            return timezone.now()
        
        formats = [
            '%B %d, %Y',
            '%b %d, %Y',
            '%Y-%m-%d',
            '%m/%d/%Y',
        ]
        
        for fmt in formats:
            try:
                dt = datetime.strptime(date_text.strip(), fmt)
                return timezone.make_aware(dt)
            except:
                continue
        
        return timezone.now()
