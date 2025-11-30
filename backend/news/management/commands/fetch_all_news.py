from django.core.management.base import BaseCommand
from django.core.management import call_command
import time
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Fetch AI governance news from all sources with retry logic'

    def add_arguments(self, parser):
        parser.add_argument(
            '--max-articles',
            type=int,
            default=20,
            help='Maximum number of articles to process per source'
        )
        parser.add_argument(
            '--max-retries',
            type=int,
            default=2,
            help='Maximum number of retries per source (default: 2)'
        )
        parser.add_argument(
            '--retry-delay',
            type=int,
            default=30,
            help='Delay in seconds between retries (default: 30)'
        )

    def handle(self, *args, **options):
        max_articles = options['max_articles']
        max_retries = options['max_retries']
        retry_delay = options['retry_delay']
        
        self.stdout.write("=" * 80)
        self.stdout.write("🚀 AI GOVERNANCE NEWS EXTRACTION - ALL SOURCES")
        self.stdout.write("=" * 80)
        self.stdout.write(f"⚙️  Configuration:")
        self.stdout.write(f"   • Max articles per source: {max_articles}")
        self.stdout.write(f"   • Max retries: {max_retries}")
        self.stdout.write(f"   • Retry delay: {retry_delay}s")
        self.stdout.write(f"   • Run frequency: Once per day (recommended)")
        self.stdout.write("")
        
        sources = [
            ('IAPP', 'fetch_iapp_news'),
            ('Compliance Week', 'fetch_compliance_week_news'),
        ]
        
        results = {}
        
        for source_name, command_name in sources:
            self.stdout.write(f"\n{'='*80}")
            self.stdout.write(f"📰 Processing: {source_name}")
            self.stdout.write(f"{'='*80}")
            
            success = False
            attempt = 0
            
            while attempt <= max_retries and not success:
                attempt += 1
                
                if attempt > 1:
                    self.stdout.write(f"\n⏳ Retry attempt {attempt}/{max_retries + 1} after {retry_delay}s delay...")
                    time.sleep(retry_delay)
                
                try:
                    self.stdout.write(f"🔄 Attempt {attempt}/{max_retries + 1}...")
                    
                    # Call the specific source extractor
                    call_command(command_name, max_articles=max_articles, verbosity=0)
                    
                    success = True
                    results[source_name] = {'status': 'success', 'attempts': attempt}
                    self.stdout.write(self.style.SUCCESS(f"✅ {source_name} completed successfully"))
                    
                except Exception as e:
                    error_msg = str(e)
                    self.stdout.write(self.style.WARNING(f"⚠️  Attempt {attempt} failed: {error_msg}"))
                    
                    if attempt > max_retries:
                        results[source_name] = {'status': 'failed', 'attempts': attempt, 'error': error_msg}
                        self.stdout.write(self.style.ERROR(f"❌ {source_name} failed after {max_retries + 1} attempts"))
                    else:
                        self.stdout.write(f"   Will retry in {retry_delay} seconds...")
            
            # Delay between sources to avoid rate limiting
            if source_name != sources[-1][0]:  # Not the last source
                delay = 10
                self.stdout.write(f"\n⏸️  Waiting {delay}s before next source...")
                time.sleep(delay)
        
        # Final summary
        self.stdout.write("\n" + "=" * 80)
        self.stdout.write("📊 EXTRACTION SUMMARY")
        self.stdout.write("=" * 80)
        
        successful = sum(1 for r in results.values() if r['status'] == 'success')
        failed = sum(1 for r in results.values() if r['status'] == 'failed')
        
        for source_name, result in results.items():
            if result['status'] == 'success':
                self.stdout.write(self.style.SUCCESS(
                    f"✅ {source_name}: Success (attempts: {result['attempts']})"
                ))
            else:
                self.stdout.write(self.style.ERROR(
                    f"❌ {source_name}: Failed after {result['attempts']} attempts"
                ))
                self.stdout.write(f"   Error: {result.get('error', 'Unknown')}")
        
        self.stdout.write("")
        self.stdout.write(f"Total: {successful} successful, {failed} failed")
        
        # Check database
        from news.models import NewsArticle
        total_articles = NewsArticle.objects.count()
        self.stdout.write(f"📚 Total articles in database: {total_articles}")
        
        self.stdout.write("\n" + "=" * 80)
        self.stdout.write("⏰ SCHEDULING RECOMMENDATION")
        self.stdout.write("=" * 80)
        self.stdout.write("Run this command ONCE per day via cron:")
        self.stdout.write("0 6 * * * cd /opt/aikovrr/backend && source venv/bin/activate && \\")
        self.stdout.write("  python manage.py fetch_all_news --max-articles 20 >> /var/log/aikovrr-news.log 2>&1")
        self.stdout.write("")
        self.stdout.write("This ensures:")
        self.stdout.write("  • No rate limiting issues")
        self.stdout.write("  • No IP blocking")
        self.stdout.write("  • Automatic retries on failure")
        self.stdout.write("  • Fresh news daily")
        self.stdout.write("")
        
        if failed > 0:
            self.stdout.write(self.style.WARNING("⚠️  Some sources failed. Check logs for details."))
        else:
            self.stdout.write(self.style.SUCCESS("✅ All sources completed successfully!"))
