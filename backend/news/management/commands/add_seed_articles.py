"""
Django management command to add seed news articles
Usage: python manage.py add_seed_articles
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime
from news.models import NewsArticle


class Command(BaseCommand):
    help = 'Add seed AI governance news articles to database'

    def handle(self, *args, **options):
        self.stdout.write("=" * 70)
        self.stdout.write("📰 Adding Seed Articles")
        self.stdout.write("=" * 70)
        self.stdout.write("")

        seed_articles = [
            ('NIST Releases Updated AI Risk Management Framework', 'https://www.nist.gov/ai-rmf-1.1-2025', 'NIST', 'https://www.nist.gov', datetime(2025, 11, 28)),
            ('EU AI Act Implementation Guidelines Published', 'https://ec.europa.eu/ai-act-guidelines-2025', 'European Commission', 'https://ec.europa.eu', datetime(2025, 11, 27)),
            ('ISO 42001 Certification: First Wave Certified', 'https://www.iso.org/iso-42001-certifications', 'ISO', 'https://www.iso.org', datetime(2025, 11, 26)),
            ('SEC Proposes New AI Disclosure Requirements', 'https://www.sec.gov/ai-disclosure-2025', 'SEC', 'https://www.sec.gov', datetime(2025, 11, 25)),
            ('GDPR and AI: New Processing Guidelines', 'https://edpb.europa.eu/gdpr-ai-guidelines', 'EDPB', 'https://edpb.europa.eu', datetime(2025, 11, 24)),
            ('AI Governance Survey: 78% of CISOs Report Risk', 'https://cisoseries.com/ai-survey-2025', 'CISO Series', 'https://cisoseries.com', datetime(2025, 11, 23)),
            ('UK AI Safety Institute Launches Risk Tool', 'https://www.aisi.gov.uk/risk-tool', 'UK AI Safety Institute', 'https://www.aisi.gov.uk', datetime(2025, 11, 22)),
            ('White House AI Executive Order Issued', 'https://www.whitehouse.gov/ai-executive-order', 'White House', 'https://www.whitehouse.gov', datetime(2025, 11, 21)),
            ('AI Model Cards: Best Practices Released', 'https://www.aigovernance.org/model-cards-bp', 'AI Governance Institute', 'https://www.aigovernance.org', datetime(2025, 11, 18)),
            ('OCC Issues AI Risk Management Guidance', 'https://www.occ.gov/ai-risk-guidance', 'OCC', 'https://www.occ.gov', datetime(2025, 11, 17)),
            ('FDA Proposes AI Medical Device Framework', 'https://www.fda.gov/ai-medical-framework', 'FDA', 'https://www.fda.gov', datetime(2025, 11, 16)),
            ('NYC AI Bias Audit Law Takes Effect', 'https://www.nyc.gov/ai-bias-audit', 'NYC Government', 'https://www.nyc.gov', datetime(2025, 11, 15)),
            ('AI Incident Database Reaches 5,000 Reports', 'https://incidentdatabase.ai/milestone-5000', 'Partnership on AI', 'https://partnershiponai.org', datetime(2025, 11, 14)),
            ('Third-Party AI Vendor Assessment Framework', 'https://sharedassessments.org/ai-vendor', 'Shared Assessments', 'https://sharedassessments.org', datetime(2025, 11, 13)),
            ('IEEE Releases AI Explainability Standards', 'https://standards.ieee.org/ai-explainability', 'IEEE', 'https://standards.ieee.org', datetime(2025, 11, 12)),
        ]

        added = 0
        skipped = 0

        for title, url, source, source_url, pub_date in seed_articles:
            if NewsArticle.objects.filter(url=url).exists():
                self.stdout.write(f"⏭️  Skipped: {title[:50]}...")
                skipped += 1
                continue

            NewsArticle.objects.create(
                title=title,
                summary=f'{source} releases important AI governance update related to {title.lower()}.',
                url=url,
                source=source,
                source_url=source_url,
                framework='AI Governance',
                article_type='standard',
                published_at=timezone.make_aware(pub_date),
                is_active=True
            )
            self.stdout.write(f"✅ Added: {title[:50]}...")
            added += 1

        self.stdout.write("")
        self.stdout.write("=" * 70)
        self.stdout.write(f"📊 Summary:")
        self.stdout.write(f"   • Added: {added}")
        self.stdout.write(f"   • Skipped: {skipped}")
        self.stdout.write(f"   • Total in DB: {NewsArticle.objects.count()}")
        self.stdout.write("=" * 70)
