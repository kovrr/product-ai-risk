-- AIKovrr Demo Data v2.0 - Minimal Version
-- Updated: November 5, 2025
-- Quick start with essential data

SET search_path TO aikovrr, public;

-- Insert Application Users
INSERT INTO auth_app_user (id, username, email, password_hash, first_name, last_name, role, is_superuser) VALUES
(1, 'admin', 'admin@aikovrr.com', 'pbkdf2_sha256$600000$placeholder', 'Admin', 'User', 'admin', TRUE),
(2, 'or', 'or@kovrr.com', 'pbkdf2_sha256$600000$placeholder', 'Or', 'Amir', 'analyst', FALSE);

-- Insert Tenant
INSERT INTO core_tenant (id, org_name, admin_contacts) VALUES
(1, 'Swift Tech', 'admin@swifttech.com');

-- Insert Departments
INSERT INTO core_department (id, tenant_id, name, risk_exposure_agg) VALUES
(1, 1, 'Engineering', 125000.00),
(2, 1, 'Marketing', 45000.00),
(3, 1, 'Sales', 67000.00),
(4, 1, 'Finance', 89000.00),
(5, 1, 'HR', 34000.00);

-- Insert Users (20 users)
INSERT INTO core_user (id, tenant_id, department_id, name, email, role, avatar) VALUES
(1, 1, 1, 'Albert Tross', 'albert.tross@swifttech.com', 'Senior Engineer', 'https://i.pravatar.cc/150?img=1'),
(2, 1, 1, 'Owen Authora', 'owen.authora@swifttech.com', 'Tech Lead', 'https://i.pravatar.cc/150?img=2'),
(3, 1, 1, 'Capt. Trunk', 'capt.trunk@swifttech.com', 'DevOps Engineer', 'https://i.pravatar.cc/150?img=3'),
(4, 1, 2, 'Theodore Calvin', 'theodore.calvin@swifttech.com', 'Marketing Manager', 'https://i.pravatar.cc/150?img=4'),
(5, 1, 2, 'Hannibal Smith', 'hannibal.smith@swifttech.com', 'Content Strategist', 'https://i.pravatar.cc/150?img=5'),
(6, 1, 3, 'Sarah Connor', 'sarah.connor@swifttech.com', 'Sales Director', 'https://i.pravatar.cc/150?img=6'),
(7, 1, 4, 'John McClane', 'john.mcclane@swifttech.com', 'CFO', 'https://i.pravatar.cc/150?img=7'),
(8, 1, 5, 'Ellen Ripley', 'ellen.ripley@swifttech.com', 'HR Manager', 'https://i.pravatar.cc/150?img=8'),
(9, 1, 1, 'Ada Lovelace', 'ada.lovelace@swifttech.com', 'ML Engineer', 'https://i.pravatar.cc/150?img=9'),
(10, 1, 1, 'Alan Turing', 'alan.turing@swifttech.com', 'AI Researcher', 'https://i.pravatar.cc/150?img=10'),
(11, 1, 2, 'Don Draper', 'don.draper@swifttech.com', 'Creative Director', 'https://i.pravatar.cc/150?img=11'),
(12, 1, 3, 'Jordan Belfort', 'jordan.belfort@swifttech.com', 'VP Sales', 'https://i.pravatar.cc/150?img=12'),
(13, 1, 4, 'Bruce Wayne', 'bruce.wayne@swifttech.com', 'Financial Analyst', 'https://i.pravatar.cc/150?img=13'),
(14, 1, 5, 'Michael Scott', 'michael.scott@swifttech.com', 'HR Specialist', 'https://i.pravatar.cc/150?img=14'),
(15, 1, 1, 'Grace Hopper', 'grace.hopper@swifttech.com', 'Principal Engineer', 'https://i.pravatar.cc/150?img=15'),
(16, 1, 4, 'Tony Stark', 'tony.stark@swifttech.com', 'CTO', 'https://i.pravatar.cc/150?img=16'),
(17, 1, 2, 'Leslie Knope', 'leslie.knope@swifttech.com', 'Marketing Analyst', 'https://i.pravatar.cc/150?img=17'),
(18, 1, 3, 'Harvey Specter', 'harvey.specter@swifttech.com', 'Sales Manager', 'https://i.pravatar.cc/150?img=18'),
(19, 1, 5, 'Atticus Finch', 'atticus.finch@swifttech.com', 'Compliance Officer', 'https://i.pravatar.cc/150?img=19'),
(20, 1, 1, 'Linus Torvalds', 'linus.torvalds@swifttech.com', 'Staff Engineer', 'https://i.pravatar.cc/150?img=20');

-- Insert Risk Frameworks
INSERT INTO risk_framework (id, name, version, description) VALUES
(1, 'NIST AI RMF', '1.0', 'NIST AI Risk Management Framework'),
(2, 'ISO/IEC 42001', '2023', 'AI Management System'),
(3, 'EU AI Act', 'Draft', 'European Union AI Act');

-- Insert Risk Controls
INSERT INTO risk_control (id, framework_id, control_id, description, maturity_level) VALUES
(1, 1, 'GOVERN-1.1', 'Legal and regulatory requirements', 'Level 3'),
(2, 1, 'GOVERN-1.2', 'Risk management processes', 'Level 3'),
(3, 1, 'MAP-1.1', 'Context documentation', 'Level 2'),
(4, 1, 'MEASURE-2.3', 'Privacy assessment', 'Level 2'),
(5, 1, 'MANAGE-1.1', 'Risk prioritization', 'Level 3'),
(6, 2, 'A.5.1', 'AI system inventory', 'Level 4'),
(7, 2, 'A.6.1', 'Data governance', 'Level 3'),
(8, 3, 'Art.9', 'High-risk AI systems', 'Level 2'),
(9, 3, 'Art.10', 'Data and data governance', 'Level 2'),
(10, 3, 'Art.15', 'Accuracy, robustness and cybersecurity', 'Level 3');

-- Insert Risk Scenarios
INSERT INTO risk_scenario (id, tenant_id, owner_id, name, description, likelihood, impact, priority, status, financial_loss_min, financial_loss_max) VALUES
(1, 1, 1, 'Sensitive data exposure via AI tools', 'Employees may inadvertently share confidential information with AI assistants', 'Likely', 'Major', 'High', 'Analyzing', 50000, 500000),
(2, 1, 2, 'Code vulnerability from AI suggestions', 'AI-generated code may contain security flaws or vulnerabilities', 'Possible', 'Moderate', 'Medium', 'Mitigating', 20000, 200000),
(3, 1, 6, 'Biased AI recommendations in sales', 'AI sales tools may provide biased recommendations affecting customer fairness', 'Possible', 'Major', 'High', 'Identified', 30000, 300000),
(4, 1, 7, 'Financial fraud via AI manipulation', 'AI models used in finance could be manipulated for fraudulent activities', 'Unlikely', 'Severe', 'High', 'Analyzing', 100000, 1000000),
(5, 1, 8, 'Privacy breach in HR AI systems', 'AI tools processing employee data may violate privacy regulations', 'Possible', 'Major', 'High', 'Mitigating', 40000, 400000);

-- Insert 10 AI Assets (Sanctioned)
INSERT INTO visibility_ai_asset (
    id, tenant_id, name, asset_type, owner_id, technical_owner_id, owning_org_unit,
    vendor_source, vendor_name, status, use_case, description, intended_users,
    projected_value, lifecycle_stage, deployment_platform, environment,
    risk_tier, risk_score, inherent_risk_score, residual_risk_score,
    personal_data_used, sensitive_categories, regulatory_applicability, control_coverage,
    model_provider, model_version
) VALUES
(1, 1, 'GitHub Copilot', 'app', 2, 1, 'Engineering', 'third_party', 'GitHub', 'sanctioned', 
 'Code completion', 'AI code assistant', '["employees"]', '$50K productivity', 
 'production', 'saas', '["prod"]', 'medium', 45.00, 55.00, 45.00, 
 false, '[]', '[]', '["access_control", "monitoring"]', 'OpenAI', 'GPT-4'),

(2, 1, 'Grammarly Business', 'app', 4, 5, 'Marketing', 'third_party', 'Grammarly', 'sanctioned',
 'Writing assistance', 'Grammar and style checking', '["employees"]', '$30K time savings',
 'production', 'saas', '["prod"]', 'low', 25.00, 35.00, 25.00,
 false, '[]', '[]', '["access_control"]', 'Grammarly', '2.0'),

(3, 1, 'Salesforce Einstein', 'model', 6, 12, 'Sales', 'third_party', 'Salesforce', 'sanctioned',
 'Sales forecasting', 'AI-powered CRM analytics', '["employees"]', '$100K revenue increase',
 'production', 'saas', '["prod"]', 'medium', 40.00, 50.00, 40.00,
 true, '["financial"]', '["gdpr"]', '["explainability", "monitoring"]', 'Salesforce', 'Einstein 3.0'),

(4, 1, 'Zendesk AI Agent', 'agent', 17, 17, 'Marketing', 'third_party', 'Zendesk', 'sanctioned',
 'Customer support', 'AI chatbot', '["customers"]', '$75K cost reduction',
 'production', 'saas', '["prod"]', 'high', 55.00, 70.00, 55.00,
 true, '["special_category"]', '["gdpr", "ccpa"]', '["human_oversight", "monitoring"]', 'Zendesk', 'Answer Bot 2.0'),

(5, 1, 'Tableau AI', 'app', 7, 13, 'Finance', 'third_party', 'Tableau', 'sanctioned',
 'Data visualization', 'BI and analytics', '["employees"]', '$60K better decisions',
 'production', 'saas', '["prod"]', 'low', 30.00, 40.00, 30.00,
 true, '["financial"]', '["sox"]', '["access_control"]', 'Tableau', 'Einstein Discovery'),

(6, 1, 'Internal Fraud Detection', 'model', 7, 13, 'Finance', 'internal', 'Swift Tech', 'sanctioned',
 'Fraud detection', 'Custom ML model', '["employees"]', '$200K fraud prevention',
 'production', 'cloud', '["prod"]', 'high', 60.00, 75.00, 60.00,
 true, '["financial", "special_category"]', '["gdpr", "sox"]', '["explainability", "human_oversight", "monitoring"]', 'Internal', 'v2.1'),

(7, 1, 'HubSpot AI', 'app', 4, 11, 'Marketing', 'third_party', 'HubSpot', 'sanctioned',
 'Marketing automation', 'AI marketing platform', '["employees"]', '$80K efficiency',
 'production', 'saas', '["prod"]', 'medium', 42.00, 52.00, 42.00,
 true, '[]', '["gdpr"]', '["access_control"]', 'HubSpot', 'Content Assistant 1.0'),

(8, 1, 'Workday AI', 'app', 8, 14, 'HR', 'third_party', 'Workday', 'sanctioned',
 'HR analytics', 'HR management system', '["employees"]', '$45K HR efficiency',
 'production', 'saas', '["prod"]', 'medium', 48.00, 58.00, 48.00,
 true, '["special_category", "health"]', '["gdpr", "hipaa"]', '["explainability", "monitoring"]', 'Workday', 'Prism Analytics'),

(9, 1, 'Zoom AI Companion', 'app', 16, 3, 'Engineering', 'third_party', 'Zoom', 'sanctioned',
 'Meeting transcription', 'AI meeting assistant', '["employees"]', '$35K time savings',
 'production', 'saas', '["prod"]', 'low', 28.00, 38.00, 28.00,
 false, '[]', '[]', '["monitoring"]', 'Zoom', 'AI Companion 1.0'),

(10, 1, 'Microsoft 365 Copilot', 'app', 16, 15, 'Engineering', 'third_party', 'Microsoft', 'sanctioned',
 'Productivity', 'AI for Office apps', '["employees"]', '$120K productivity',
 'production', 'saas', '["prod"]', 'medium', 44.00, 54.00, 44.00,
 true, '[]', '["gdpr"]', '["access_control", "monitoring"]', 'Microsoft', 'Copilot 1.0');

-- Insert 5 Shadow AI Assets
INSERT INTO visibility_ai_asset (
    id, tenant_id, name, asset_type, owner_id, technical_owner_id, owning_org_unit,
    vendor_source, vendor_name, status, use_case, description, intended_users,
    lifecycle_stage, deployment_platform, environment,
    risk_tier, risk_score, inherent_risk_score, residual_risk_score,
    personal_data_used, sensitive_categories, regulatory_applicability, control_coverage,
    model_provider, model_version
) VALUES
(11, 1, 'ChatGPT', 'app', 1, 1, 'Engineering', 'third_party', 'OpenAI', 'shadow',
 'General AI assistant', 'Unapproved usage', '["employees"]',
 'production', 'saas', '["prod"]', 'critical', 85.00, 95.00, 85.00,
 true, '["special_category"]', '["gdpr"]', '[]', 'OpenAI', 'GPT-4'),

(12, 1, 'Claude AI', 'app', 9, 10, 'Engineering', 'third_party', 'Anthropic', 'shadow',
 'AI research assistant', 'Unapproved tool', '["employees"]',
 'production', 'saas', '["prod"]', 'high', 72.00, 82.00, 72.00,
 true, '[]', '["gdpr"]', '[]', 'Anthropic', 'Claude 2'),

(13, 1, 'Jasper AI', 'app', 5, 11, 'Marketing', 'third_party', 'Jasper', 'shadow',
 'Content generation', 'Unapproved content tool', '["employees"]',
 'production', 'saas', '["prod"]', 'high', 68.00, 78.00, 68.00,
 false, '[]', '[]', '[]', 'Jasper', '2.0'),

(14, 1, 'Midjourney', 'app', 11, 11, 'Marketing', 'third_party', 'Midjourney', 'shadow',
 'Image generation', 'Unapproved design tool', '["employees"]',
 'testing', 'saas', '["test"]', 'medium', 62.00, 72.00, 62.00,
 false, '[]', '[]', '[]', 'Midjourney', 'v5'),

(15, 1, 'Perplexity AI', 'app', 6, 12, 'Sales', 'third_party', 'Perplexity', 'shadow',
 'AI search', 'Unapproved research tool', '["employees"]',
 'production', 'saas', '["prod"]', 'medium', 58.00, 68.00, 58.00,
 false, '[]', '[]', '[]', 'Perplexity', '1.0');

-- Link Assets to Risks (asset_risk_link)
INSERT INTO asset_risk_link (asset_id, risk_id) VALUES
(1, 2),  -- GitHub Copilot → Code vulnerability
(11, 1), -- ChatGPT → Data exposure
(12, 1), -- Claude → Data exposure
(3, 3),  -- Salesforce Einstein → Biased recommendations
(6, 4),  -- Fraud Detection → Financial fraud
(8, 5);  -- Workday AI → Privacy breach

-- Link Assets to Controls (asset_control_link)
INSERT INTO asset_control_link (asset_id, control_id) VALUES
(1, 1), (1, 2), (1, 5),  -- GitHub Copilot
(3, 1), (3, 3), (3, 4),  -- Salesforce Einstein
(4, 1), (4, 4), (4, 5),  -- Zendesk AI
(6, 1), (6, 2), (6, 4), (6, 5), (6, 10),  -- Fraud Detection
(8, 1), (8, 4), (8, 7);  -- Workday AI

-- Reset sequences
SELECT setval('auth_app_user_id_seq', (SELECT MAX(id) FROM auth_app_user));
SELECT setval('core_tenant_id_seq', (SELECT MAX(id) FROM core_tenant));
SELECT setval('core_department_id_seq', (SELECT MAX(id) FROM core_department));
SELECT setval('core_user_id_seq', (SELECT MAX(id) FROM core_user));
SELECT setval('risk_framework_id_seq', (SELECT MAX(id) FROM risk_framework));
SELECT setval('risk_control_id_seq', (SELECT MAX(id) FROM risk_control));
SELECT setval('risk_scenario_id_seq', (SELECT MAX(id) FROM risk_scenario));
SELECT setval('visibility_ai_asset_id_seq', (SELECT MAX(id) FROM visibility_ai_asset));
