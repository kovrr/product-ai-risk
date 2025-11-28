import sys
sys.path.insert(0, '/Users/liransorani/CascadeProjects/aikovrr/backend')

import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aikovrr.settings')

import django
django.setup()

from news.models import NewsArticle
from django.utils import timezone
from datetime import timedelta

articles_data = [
    {
        'title': 'EU AI Act Implementation Guidelines Released',
        'summary': 'The European Data Protection Board has published comprehensive implementation guidelines for the EU AI Act.',
        'url': 'https://iapp.org/news/a/eu-ai-act-implementation/',
        'source': 'IAPP',
        'source_url': 'https://iapp.org',
        'framework': 'EU AI Act',
        'article_type': 'regulation',
        'published_at': timezone.now() - timedelta(hours=2)
    },
    {
        'title': 'NIST Releases AI Risk Management Framework 2.0',
        'summary': 'NIST has published version 2.0 of the AI Risk Management Framework with enhanced guidance.',
        'url': 'https://www.nist.gov/itl/ai-risk-management-framework',
        'source': 'NIST',
        'source_url': 'https://www.nist.gov',
        'framework': 'NIST AI RMF',
        'article_type': 'framework',
        'published_at': timezone.now() - timedelta(minutes=30)
    },
    {
        'title': 'ISO 42001 Adoption Accelerates Among Fortune 500',
        'summary': '67% of Fortune 500 companies are pursuing ISO 42001 certification for AI management systems.',
        'url': 'https://www.iso.org/standard/81230.html',
        'source': 'ISO',
        'source_url': 'https://www.iso.org',
        'framework': 'ISO 42001',
        'article_type': 'standard',
        'published_at': timezone.now() - timedelta(hours=4)
    },
    {
        'title': 'UK ICO Issues First AI Governance Enforcement Action',
        'summary': 'The ICO has taken its first enforcement action for inadequate AI impact assessments.',
        'url': 'https://ico.org.uk/about-the-ico/media-centre/',
        'source': 'UK ICO',
        'source_url': 'https://ico.org.uk',
        'framework': 'UK GDPR',
        'article_type': 'regulation',
        'published_at': timezone.now() - timedelta(hours=6)
    },
    {
        'title': 'SEC Proposes AI Risk Disclosure Requirements',
        'summary': 'The SEC has proposed new rules requiring public companies to disclose material AI-related risks.',
        'url': 'https://www.sec.gov/news/press-release',
        'source': 'SEC',
        'source_url': 'https://www.sec.gov',
        'framework': 'SEC Disclosure',
        'article_type': 'regulation',
        'published_at': timezone.now() - timedelta(days=1)
    },
]

print("Adding sample news articles...")
added = 0
for data in articles_data:
    article, created = NewsArticle.objects.get_or_create(
        url=data['url'],
        defaults=data
    )
    if created:
        added += 1
        print(f"✓ Added: {article.title}")

print(f"\n✅ Done! Added {added} new articles")
print(f"Total articles in database: {NewsArticle.objects.count()}")
