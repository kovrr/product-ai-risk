#!/usr/bin/env python
"""Add sample news articles for testing"""
import os
import django
from datetime import datetime, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aikovrr.settings')
django.setup()

from django.utils import timezone
from news.models import NewsArticle

# Sample articles with real URLs
articles = [
    {
        'title': 'IAPP: EU AI Act Implementation Guidelines Released',
        'summary': 'The European Data Protection Board has published comprehensive implementation guidelines for the EU AI Act, providing clarity on compliance requirements for high-risk AI systems.',
        'url': 'https://iapp.org/news/a/eu-ai-act-implementation-guidelines/',
        'source': 'IAPP',
        'source_url': 'https://iapp.org',
        'framework': 'EU AI Act',
        'article_type': 'regulation',
        'published_at': timezone.now() - timedelta(hours=2),
    },
    {
        'title': 'NIST Releases AI Risk Management Framework 2.0',
        'summary': 'NIST has published version 2.0 of the AI Risk Management Framework with enhanced guidance on generative AI systems and updated risk assessment methodologies.',
        'url': 'https://www.nist.gov/itl/ai-risk-management-framework',
        'source': 'NIST',
        'source_url': 'https://www.nist.gov',
        'framework': 'NIST AI RMF',
        'article_type': 'framework',
        'published_at': timezone.now() - timedelta(minutes=30),
    },
    {
        'title': 'ISO 42001 Adoption Accelerates Among Fortune 500',
        'summary': 'New survey data shows 67% of Fortune 500 companies are pursuing ISO 42001 certification for AI management systems, driven by regulatory pressure and stakeholder demands.',
        'url': 'https://www.iso.org/standard/81230.html',
        'source': 'ISO',
        'source_url': 'https://www.iso.org',
        'framework': 'ISO 42001',
        'article_type': 'standard',
        'published_at': timezone.now() - timedelta(hours=4),
    },
    {
        'title': 'UK ICO Issues First AI Governance Enforcement Action',
        'summary': 'The Information Commissioner\'s Office has taken its first enforcement action against a company for inadequate AI impact assessments, setting a precedent for AI governance compliance.',
        'url': 'https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/',
        'source': 'UK ICO',
        'source_url': 'https://ico.org.uk',
        'framework': 'UK GDPR',
        'article_type': 'regulation',
        'published_at': timezone.now() - timedelta(hours=6),
    },
    {
        'title': 'SEC Proposes AI Risk Disclosure Requirements',
        'summary': 'The Securities and Exchange Commission has proposed new rules requiring public companies to disclose material AI-related risks in their 10-K and 10-Q filings.',
        'url': 'https://www.sec.gov/news/press-release',
        'source': 'SEC',
        'source_url': 'https://www.sec.gov',
        'framework': 'SEC Disclosure',
        'article_type': 'regulation',
        'published_at': timezone.now() - timedelta(days=1),
    },
    {
        'title': 'EDPB Guidelines on AI Transparency Published',
        'summary': 'The European Data Protection Board has released comprehensive guidelines on transparency obligations for AI systems under GDPR, with practical implementation examples.',
        'url': 'https://edpb.europa.eu/our-work-tools/our-documents/guidelines_en',
        'source': 'EDPB',
        'source_url': 'https://edpb.europa.eu',
        'framework': 'GDPR',
        'article_type': 'guidance',
        'published_at': timezone.now() - timedelta(days=1),
    },
    {
        'title': 'California Passes AI Accountability Act (SB 1047)',
        'summary': 'California legislature has passed SB 1047, requiring algorithmic impact assessments and third-party audits for high-risk AI systems deployed in the state.',
        'url': 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1047',
        'source': 'California Legislature',
        'source_url': 'https://leginfo.legislature.ca.gov',
        'framework': 'California SB 1047',
        'article_type': 'regulation',
        'published_at': timezone.now() - timedelta(days=2),
    },
    {
        'title': 'NIST AI Safety Institute Launches Testing Framework',
        'summary': 'The NIST AI Safety Institute has launched a new testing framework providing standardized approaches for evaluating AI system safety, security, and trustworthiness.',
        'url': 'https://www.nist.gov/artificial-intelligence/artificial-intelligence-safety-institute',
        'source': 'NIST AISI',
        'source_url': 'https://www.nist.gov',
        'framework': 'NIST AISI',
        'article_type': 'framework',
        'published_at': timezone.now() - timedelta(days=3),
    },
]

print("Adding sample news articles...")
added = 0
for article_data in articles:
    article, created = NewsArticle.objects.get_or_create(
        url=article_data['url'],
        defaults=article_data
    )
    if created:
        added += 1
        print(f"✓ Added: {article.title[:60]}...")
    else:
        print(f"- Exists: {article.title[:60]}...")

print(f"\n✅ Done! Added {added} new articles (Total: {NewsArticle.objects.count()})")
