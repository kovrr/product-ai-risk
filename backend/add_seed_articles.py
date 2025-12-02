#!/usr/bin/env python
"""
Add seed news articles to local database
Run: python add_seed_articles.py
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aikovrr.settings')
django.setup()

from news.models import NewsArticle
from django.utils import timezone
from datetime import datetime, timedelta

# Seed articles for AI governance news feed
seed_articles = [
    {
        'title': 'NIST Releases Updated AI Risk Management Framework',
        'summary': 'The National Institute of Standards and Technology has published version 1.1 of its AI Risk Management Framework, incorporating feedback from industry and addressing emerging AI governance challenges.',
        'url': 'https://www.nist.gov/ai-rmf-1.1-update',
        'source': 'NIST',
        'source_url': 'https://www.nist.gov',
        'framework': 'NIST AI RMF',
        'article_type': 'framework',
        'published_at': datetime(2025, 11, 28),
    },
    {
        'title': 'EU AI Act Implementation Guidelines Published',
        'summary': 'The European Commission has released comprehensive implementation guidelines for the AI Act, providing clarity on compliance requirements for high-risk AI systems.',
        'url': 'https://ec.europa.eu/ai-act-guidelines-2025',
        'source': 'European Commission',
        'source_url': 'https://ec.europa.eu',
        'framework': 'EU AI Act',
        'article_type': 'guidance',
        'published_at': datetime(2025, 11, 27),
    },
    {
        'title': 'ISO 42001 Certification: First Wave of Organizations Certified',
        'summary': 'Over 50 organizations worldwide have achieved ISO 42001 certification for AI management systems, marking a significant milestone in AI governance standardization.',
        'url': 'https://www.iso.org/iso-42001-certifications',
        'source': 'ISO',
        'source_url': 'https://www.iso.org',
        'framework': 'ISO 42001',
        'article_type': 'standard',
        'published_at': datetime(2025, 11, 26),
    },
    {
        'title': 'SEC Proposes New AI Disclosure Requirements',
        'summary': 'The Securities and Exchange Commission has proposed new rules requiring public companies to disclose material AI risks and governance practices in their annual reports.',
        'url': 'https://www.sec.gov/ai-disclosure-proposal-2025',
        'source': 'SEC',
        'source_url': 'https://www.sec.gov',
        'framework': 'AI Governance',
        'article_type': 'regulation',
        'published_at': datetime(2025, 11, 25),
    },
    {
        'title': 'GDPR and AI: New Guidelines on Data Processing',
        'summary': 'European Data Protection Board releases guidelines on applying GDPR principles to AI systems, focusing on transparency, fairness, and data minimization.',
        'url': 'https://edpb.europa.eu/gdpr-ai-guidelines',
        'source': 'EDPB',
        'source_url': 'https://edpb.europa.eu',
        'framework': 'GDPR',
        'article_type': 'guidance',
        'published_at': datetime(2025, 11, 24),
    },
    {
        'title': 'AI Governance Survey: 78% of CISOs Report Increased AI Risk',
        'summary': 'New survey from CISO Series reveals that 78% of security leaders are concerned about AI-related risks, with shadow AI being the top concern.',
        'url': 'https://cisoseries.com/ai-governance-survey-2025',
        'source': 'CISO Series',
        'source_url': 'https://cisoseries.com',
        'framework': 'AI Governance',
        'article_type': 'standard',
        'published_at': datetime(2025, 11, 23),
    },
    {
        'title': 'UK AI Safety Institute Launches Risk Assessment Tool',
        'summary': 'The UK AI Safety Institute has launched a free risk assessment tool for organizations to evaluate AI systems against safety and governance standards.',
        'url': 'https://www.aisi.gov.uk/risk-assessment-tool',
        'source': 'UK AI Safety Institute',
        'source_url': 'https://www.aisi.gov.uk',
        'framework': 'AI Governance',
        'article_type': 'standard',
        'published_at': datetime(2025, 11, 22),
    },
    {
        'title': 'White House Issues Executive Order on Federal AI Use',
        'summary': 'President issues executive order establishing governance requirements for AI use across federal agencies, including risk assessments and transparency measures.',
        'url': 'https://www.whitehouse.gov/ai-executive-order-2025',
        'source': 'White House',
        'source_url': 'https://www.whitehouse.gov',
        'framework': 'AI Governance',
        'article_type': 'regulation',
        'published_at': datetime(2025, 11, 21),
    },
    {
        'title': 'AI Model Cards: Best Practices for Documentation',
        'summary': 'Industry consortium releases best practices for AI model cards, providing standardized approach to documenting AI system capabilities and limitations.',
        'url': 'https://www.aigovernance.org/model-cards-best-practices',
        'source': 'AI Governance Institute',
        'source_url': 'https://www.aigovernance.org',
        'framework': 'AI Governance',
        'article_type': 'guidance',
        'published_at': datetime(2025, 11, 18),
    },
    {
        'title': 'Financial Services AI Risk Management: New OCC Guidance',
        'summary': 'Office of the Comptroller of the Currency issues guidance on AI risk management for banks, emphasizing model validation and governance.',
        'url': 'https://www.occ.gov/ai-risk-management-guidance',
        'source': 'OCC',
        'source_url': 'https://www.occ.gov',
        'framework': 'AI Governance',
        'article_type': 'guidance',
        'published_at': datetime(2025, 11, 17),
    },
    {
        'title': 'Healthcare AI: FDA Proposes Regulatory Framework',
        'summary': 'FDA proposes comprehensive regulatory framework for AI/ML-based medical devices, including continuous monitoring and post-market surveillance requirements.',
        'url': 'https://www.fda.gov/ai-medical-devices-framework',
        'source': 'FDA',
        'source_url': 'https://www.fda.gov',
        'framework': 'AI Governance',
        'article_type': 'regulation',
        'published_at': datetime(2025, 11, 16),
    },
    {
        'title': 'AI Bias Audit Requirements: NYC Law Takes Effect',
        'summary': 'New York City law requiring bias audits for AI-based hiring tools takes effect, setting precedent for AI governance in employment.',
        'url': 'https://www.nyc.gov/ai-bias-audit-law',
        'source': 'NYC Government',
        'source_url': 'https://www.nyc.gov',
        'framework': 'AI Governance',
        'article_type': 'regulation',
        'published_at': datetime(2025, 11, 15),
    },
    {
        'title': 'AI Incident Database Surpasses 5,000 Reports',
        'summary': 'Partnership on AI\'s incident database reaches milestone of 5,000 reported AI failures, providing valuable insights for risk management.',
        'url': 'https://incidentdatabase.ai/milestone-5000',
        'source': 'Partnership on AI',
        'source_url': 'https://partnershiponai.org',
        'framework': 'AI Governance',
        'article_type': 'standard',
        'published_at': datetime(2025, 11, 14),
    },
    {
        'title': 'Third-Party AI Risk: New Vendor Assessment Framework',
        'summary': 'Shared Assessments releases AI-specific vendor risk assessment framework, addressing third-party AI governance challenges.',
        'url': 'https://sharedassessments.org/ai-vendor-framework',
        'source': 'Shared Assessments',
        'source_url': 'https://sharedassessments.org',
        'framework': 'AI Governance',
        'article_type': 'framework',
        'published_at': datetime(2025, 11, 13),
    },
    {
        'title': 'AI Explainability Standards: IEEE Releases Guidelines',
        'summary': 'IEEE publishes standards for AI explainability, providing technical guidance for transparent and interpretable AI systems.',
        'url': 'https://standards.ieee.org/ai-explainability',
        'source': 'IEEE',
        'source_url': 'https://standards.ieee.org',
        'framework': 'AI Governance',
        'article_type': 'standard',
        'published_at': datetime(2025, 11, 12),
    },
]

print("=" * 70)
print("📰 Adding Seed Articles to Local Database")
print("=" * 70)
print()

added = 0
skipped = 0

for article_data in seed_articles:
    # Check if already exists
    if NewsArticle.objects.filter(url=article_data['url']).exists():
        print(f"⏭️  Skipped (exists): {article_data['title'][:50]}...")
        skipped += 1
        continue
    
    # Create article
    NewsArticle.objects.create(
        title=article_data['title'],
        summary=article_data['summary'],
        url=article_data['url'],
        source=article_data['source'],
        source_url=article_data['source_url'],
        framework=article_data['framework'],
        article_type=article_data['article_type'],
        published_at=timezone.make_aware(article_data['published_at']),
        is_active=True
    )
    print(f"✅ Added: {article_data['title'][:50]}...")
    added += 1

print()
print("=" * 70)
print(f"📊 Summary:")
print(f"   • Added: {added}")
print(f"   • Skipped: {skipped}")
print(f"   • Total in DB: {NewsArticle.objects.count()}")
print("=" * 70)
