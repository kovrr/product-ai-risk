"""
Django management command to verify article URLs and remove broken links
Usage: python manage.py verify_article_urls
"""

from django.core.management.base import BaseCommand
from news.models import NewsArticle
from time import sleep

try:
    import requests
    REQUESTS_AVAILABLE = True
except ImportError:
    REQUESTS_AVAILABLE = False


class Command(BaseCommand):
    help = 'Verify article URLs and remove articles with broken links'

    def add_arguments(self, parser):
        parser.add_argument(
            '--delete',
            action='store_true',
            help='Delete articles with broken links (default: just report)',
        )

    def handle(self, *args, **options):
        if not REQUESTS_AVAILABLE:
            self.stdout.write(self.style.ERROR("❌ Error: 'requests' module not installed"))
            self.stdout.write("Install it with: pip install requests")
            return
        
        delete_broken = options['delete']
        
        self.stdout.write("=" * 70)
        self.stdout.write("🔍 Verifying Article URLs")
        self.stdout.write("=" * 70)
        self.stdout.write("")

        articles = NewsArticle.objects.filter(is_active=True).order_by('-published_at')
        total = articles.count()
        
        self.stdout.write(f"📊 Found {total} active articles to verify")
        self.stdout.write("")

        valid = 0
        broken = 0
        errors = 0
        broken_articles = []

        for i, article in enumerate(articles, 1):
            self.stdout.write(f"[{i}/{total}] Checking: {article.source} - {article.title[:50]}...")
            
            try:
                # Make request with timeout
                response = requests.get(
                    article.url,
                    timeout=10,
                    allow_redirects=True,
                    headers={'User-Agent': 'Mozilla/5.0 (compatible; AIKovrr/1.0)'}
                )
                
                # Check for success
                if response.status_code == 200:
                    # Check if page contains "not found" or "404" in content
                    content_lower = response.text.lower()
                    if 'page not found' in content_lower or '404' in content_lower[:500]:
                        self.stdout.write(f"  ❌ BROKEN: Page not found in content")
                        broken += 1
                        broken_articles.append(article)
                    else:
                        self.stdout.write(f"  ✅ VALID (200 OK)")
                        valid += 1
                elif response.status_code in [301, 302, 307, 308]:
                    self.stdout.write(f"  ✅ VALID (Redirect to: {response.url[:50]}...)")
                    valid += 1
                elif response.status_code >= 400:
                    # Any 4xx or 5xx error is considered broken
                    self.stdout.write(f"  ❌ BROKEN: HTTP {response.status_code}")
                    broken += 1
                    broken_articles.append(article)
                else:
                    self.stdout.write(f"  ✅ VALID (Status {response.status_code})")
                    valid += 1
                    
            except requests.exceptions.Timeout:
                self.stdout.write(f"  ⚠️  TIMEOUT: Could not reach server")
                errors += 1
            except requests.exceptions.ConnectionError:
                self.stdout.write(f"  ⚠️  CONNECTION ERROR: Could not connect")
                errors += 1
            except Exception as e:
                self.stdout.write(f"  ⚠️  ERROR: {str(e)[:50]}")
                errors += 1
            
            # Be nice to servers
            sleep(0.5)

        self.stdout.write("")
        self.stdout.write("=" * 70)
        self.stdout.write("📊 Verification Summary:")
        self.stdout.write(f"   • Total checked: {total}")
        self.stdout.write(f"   • Valid: {valid}")
        self.stdout.write(f"   • Broken: {broken}")
        self.stdout.write(f"   • Errors: {errors}")
        self.stdout.write("=" * 70)

        if broken_articles:
            self.stdout.write("")
            self.stdout.write("🗑️  Broken Articles:")
            for article in broken_articles:
                self.stdout.write(f"   • [{article.source}] {article.title[:50]}...")
                self.stdout.write(f"     URL: {article.url}")

            if delete_broken:
                self.stdout.write("")
                self.stdout.write("🗑️  Deleting broken articles...")
                for article in broken_articles:
                    self.stdout.write(f"   ❌ Deleted: {article.title[:50]}...")
                    article.delete()
                self.stdout.write("")
                self.stdout.write(f"✅ Deleted {len(broken_articles)} broken articles")
                self.stdout.write(f"📊 Remaining articles: {NewsArticle.objects.filter(is_active=True).count()}")
            else:
                self.stdout.write("")
                self.stdout.write("💡 To delete broken articles, run:")
                self.stdout.write("   python manage.py verify_article_urls --delete")
        else:
            self.stdout.write("")
            self.stdout.write("✅ All articles have valid URLs!")

        self.stdout.write("")
        self.stdout.write("=" * 70)
