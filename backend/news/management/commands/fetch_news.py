from django.core.management.base import BaseCommand
from news.services import fetch_all_news, cleanup_old_articles


class Command(BaseCommand):
    help = 'Fetch news articles from RSS feeds'

    def add_arguments(self, parser):
        parser.add_argument(
            '--cleanup',
            action='store_true',
            help='Also cleanup old articles',
        )

    def handle(self, *args, **options):
        self.stdout.write('Fetching news articles...')
        
        results = fetch_all_news()
        
        for source, count in results.items():
            self.stdout.write(
                self.style.SUCCESS(f'✓ {source}: {count} new articles')
            )
        
        if options['cleanup']:
            self.stdout.write('Cleaning up old articles...')
            count = cleanup_old_articles()
            self.stdout.write(
                self.style.SUCCESS(f'✓ Marked {count} old articles as inactive')
            )
        
        self.stdout.write(self.style.SUCCESS('Done!'))
