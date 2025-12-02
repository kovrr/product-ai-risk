-- News Articles Data
-- Generated: 2025-12-01 10:34:28
-- Total articles: 5
-- This file contains the latest 20 articles from local database
-- Duplicates (same URL) will be skipped during import

-- Compliance Week: The rise of the AI compliance officer...
INSERT INTO news_newsarticle (title, summary, url, source, source_url, framework, article_type, published_at, is_active, fetched_at)
VALUES (
  'The rise of the AI compliance officer',
  'As AI reshapes business operations and regulators move quickly, companies increasingly need a dedicated AI compliance officer to ensure ethical, transparent, and accountable deployment.',
  'https://www.complianceweek.com/opinion/the-rise-of-the-ai-compliance-officer/36343.article',
  'Compliance Week',
  'https://www.complianceweek.com',
  'AI Governance',
  'standard',
  '2025-11-29T13:59:32.119499+00:00',
  true,
  '2025-11-29T13:59:32.123563+00:00'
)
ON CONFLICT (url) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  source = EXCLUDED.source,
  source_url = EXCLUDED.source_url,
  framework = EXCLUDED.framework,
  article_type = EXCLUDED.article_type,
  published_at = EXCLUDED.published_at,
  fetched_at = EXCLUDED.fetched_at,
  is_active = EXCLUDED.is_active;

-- Compliance Week: The AI audit burden: Why ‘Explainable AI’ is the key...
INSERT INTO news_newsarticle (title, summary, url, source, source_url, framework, article_type, published_at, is_active, fetched_at)
VALUES (
  'The AI audit burden: Why ‘Explainable AI’ is the key',
  'AI decisions are only defensible when the reasoning behind them is visible, traceable, and auditable. Explainable AI delivers that visibility, turning black-box outputs into documented logic that compliance officers can stand behind when regulators, auditors, or stakeholders demand answers.',
  'https://www.complianceweek.com/opinion/the-ai-audit-burden-why-explainable-ai-is-the-key/36361.article',
  'Compliance Week',
  'https://www.complianceweek.com',
  'AI Governance',
  'standard',
  '2025-11-29T13:59:29.754231+00:00',
  true,
  '2025-11-29T13:59:29.758369+00:00'
)
ON CONFLICT (url) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  source = EXCLUDED.source,
  source_url = EXCLUDED.source_url,
  framework = EXCLUDED.framework,
  article_type = EXCLUDED.article_type,
  published_at = EXCLUDED.published_at,
  fetched_at = EXCLUDED.fetched_at,
  is_active = EXCLUDED.is_active;

-- IAPP: 20 Nov. 2025Notes from the Asia-Pacific region: India releas...
INSERT INTO news_newsarticle (title, summary, url, source, source_url, framework, article_type, published_at, is_active, fetched_at)
VALUES (
  '20 Nov. 2025Notes from the Asia-Pacific region: India releases DPDPA rules, AI governance guidelines',
  'IAPPYou need to enable JavaScript to run this app.Loading...',
  'https://iapp.org/news/a/notes-from-the-asia-pacific-region-india-releases-dpdpa-rules-ai-governance-guidelines',
  'IAPP',
  'https://iapp.org',
  'AI Governance',
  'standard',
  '2025-11-20T00:00:00+00:00',
  true,
  '2025-11-29T13:59:09.742538+00:00'
)
ON CONFLICT (url) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  source = EXCLUDED.source,
  source_url = EXCLUDED.source_url,
  framework = EXCLUDED.framework,
  article_type = EXCLUDED.article_type,
  published_at = EXCLUDED.published_at,
  fetched_at = EXCLUDED.fetched_at,
  is_active = EXCLUDED.is_active;

-- IAPP: 20 Nov. 2025Joint guidelines on GDPR-AI Act interplay to com...
INSERT INTO news_newsarticle (title, summary, url, source, source_url, framework, article_type, published_at, is_active, fetched_at)
VALUES (
  '20 Nov. 2025Joint guidelines on GDPR-AI Act interplay to come soon, EDPS says',
  'IAPPYou need to enable JavaScript to run this app.Loading...',
  'https://iapp.org/news/a/edps-to-issue-joint-guidance-on-gdpr-ai-act-interplay-with-european-commission',
  'IAPP',
  'https://iapp.org',
  'AI Governance',
  'standard',
  '2025-11-20T00:00:00+00:00',
  true,
  '2025-11-29T13:59:10.850564+00:00'
)
ON CONFLICT (url) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  source = EXCLUDED.source,
  source_url = EXCLUDED.source_url,
  framework = EXCLUDED.framework,
  article_type = EXCLUDED.article_type,
  published_at = EXCLUDED.published_at,
  fetched_at = EXCLUDED.fetched_at,
  is_active = EXCLUDED.is_active;

-- IAPP: 19 Nov. 2025European Commission proposes significant reforms...
INSERT INTO news_newsarticle (title, summary, url, source, source_url, framework, article_type, published_at, is_active, fetched_at)
VALUES (
  '19 Nov. 2025European Commission proposes significant reforms to GDPR, AI Act',
  'IAPPYou need to enable JavaScript to run this app.Loading...',
  'https://iapp.org/news/a/european-commission-proposes-significant-reforms-to-gdpr-ai-act',
  'IAPP',
  'https://iapp.org',
  'AI Governance',
  'standard',
  '2025-11-19T00:00:00+00:00',
  true,
  '2025-11-30T09:56:11.292830+00:00'
)
ON CONFLICT (url) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  source = EXCLUDED.source,
  source_url = EXCLUDED.source_url,
  framework = EXCLUDED.framework,
  article_type = EXCLUDED.article_type,
  published_at = EXCLUDED.published_at,
  fetched_at = EXCLUDED.fetched_at,
  is_active = EXCLUDED.is_active;

