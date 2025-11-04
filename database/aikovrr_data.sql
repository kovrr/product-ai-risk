-- AIKovrr Demo Data
-- Insert demo data for testing

-- Set search_path to use aikovrr schema
SET search_path TO aikovrr, public;

-- Insert Application Users (for logging into AIKovrr app)
-- Password for all users is 'password123' (hashed with bcrypt)
-- In production, use proper password hashing via Django
INSERT INTO auth_app_user (id, username, email, password_hash, first_name, last_name, role, is_superuser) VALUES
(1, 'admin', 'admin@aikovrr.com', 'pbkdf2_sha256$600000$placeholder', 'Admin', 'User', 'admin', TRUE),
(2, 'or', 'or@kovrr.com', 'pbkdf2_sha256$600000$placeholder', 'Or', 'Amir', 'analyst', FALSE),
(3, 'shai', 'shai@kovrr.com', 'pbkdf2_sha256$600000$placeholder', 'Shai', 'Yanovski', 'analyst', FALSE),
(4, 'liran', 'liran@kovrr.com', 'pbkdf2_sha256$600000$placeholder', 'Liran', 'Sorani', 'analyst', FALSE),
(5, 'yakir', 'yakir@kovrr.com', 'pbkdf2_sha256$600000$placeholder', 'Yakir', 'Golan', 'analyst', FALSE);

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

-- Insert Users
INSERT INTO core_user (id, tenant_id, department_id, name, email, role, shadow_sanction_ratio) VALUES
(1, 1, 1, 'Albert Tross', 'albert.tross@swifttech.com', 'Senior Engineer', 2.5),
(2, 1, 1, 'Owen Authora', 'owen.authora@swifttech.com', 'Tech Lead', 1.8),
(3, 1, 1, 'Capt. Trunk', 'capt.trunk@swifttech.com', 'DevOps Engineer', 3.2),
(4, 1, 2, 'Theodore T.C. Calvin', 'theodore.calvin@swifttech.com', 'Marketing Manager', 2.1),
(5, 1, 2, 'Hannibal Smith', 'hannibal.smith@swifttech.com', 'Content Strategist', 1.5),
(6, 1, 3, 'Sarah Connor', 'sarah.connor@swifttech.com', 'Sales Director', 1.9),
(7, 1, 4, 'John McClane', 'john.mcclane@swifttech.com', 'CFO', 0.8),
(8, 1, 5, 'Ellen Ripley', 'ellen.ripley@swifttech.com', 'HR Manager', 1.2);

-- Insert Risk Profiles
INSERT INTO visibility_risk_profile (id, kovrr_vendor_id, risk_score, financial_exposure_min, financial_exposure_max) VALUES
(1, 'OPENAI-001', 65, 50000, 500000),
(2, 'GITHUB-001', 45, 20000, 200000),
(3, 'JASPER-001', 55, 30000, 300000);

-- Insert AI Assets
INSERT INTO visibility_ai_asset (id, tenant_id, risk_profile_id, name, category, vendor, domain, status, first_seen, last_seen) VALUES
(1, 1, 1, 'ChatGPT', 'Generative AI', 'OpenAI', 'chat.openai.com', 'Shadow', '2024-01-15', '2024-11-01'),
(2, 1, 2, 'GitHub Copilot', 'Code Assistant', 'GitHub', 'github.com', 'Sanctioned', '2024-02-01', '2024-11-01'),
(3, 1, 3, 'Jasper AI', 'Content Generation', 'Jasper', 'jasper.ai', 'Shadow', '2024-03-10', '2024-10-28'),
(4, 1, NULL, 'Grammarly', 'Writing Assistant', 'Grammarly', 'grammarly.com', 'Sanctioned', '2024-01-20', '2024-11-01'),
(5, 1, NULL, 'Notion AI', 'Productivity', 'Notion', 'notion.so', 'Shadow', '2024-04-05', '2024-10-30');

-- Insert Discovery Sources
INSERT INTO visibility_discovery_source (id, tenant_id, source_type, confidence_level) VALUES
(1, 1, 'AzureAD', 'High'),
(2, 1, 'Survey', 'Medium'),
(3, 1, 'CSV', 'High');

-- Insert Asset Relationships
INSERT INTO visibility_asset_relationship (user_id, ai_asset_id, discovery_source_id, relationship_type, confidence_score) VALUES
(1, 1, 1, 'Direct', 95.0),
(1, 2, 1, 'Direct', 98.0),
(2, 2, 1, 'Direct', 98.0),
(3, 1, 2, 'Direct', 85.0),
(4, 3, 2, 'Direct', 80.0),
(5, 3, 1, 'Direct', 90.0);

-- Insert Risk Categories
INSERT INTO risk_category (id, name, parent_id) VALUES
(1, 'Privacy', NULL),
(2, 'Security', NULL),
(3, 'Fairness', NULL),
(4, 'Transparency', NULL),
(5, 'Data Leakage', 1),
(6, 'Unauthorized Access', 2);

-- Insert Frameworks
INSERT INTO risk_framework (id, name, version) VALUES
(1, 'NIST AI RMF', '1.0'),
(2, 'ISO/IEC 42001', '2023'),
(3, 'EU AI Act', 'Draft');

-- Insert Controls
INSERT INTO risk_control (id, framework_id, control_id, description, maturity_level) VALUES
(1, 1, 'GV-1.2', 'AI risk management processes', 'Level 3'),
(2, 1, 'MP-4.1', 'Model performance monitoring', 'Level 2'),
(3, 2, 'A.5.1', 'AI system inventory', 'Level 4');

-- Insert Risk Scenarios
INSERT INTO risk_scenario (id, tenant_id, owner_id, name, description, likelihood, impact, priority, status) VALUES
(1, 1, 1, 'Sensitive data exposure via ChatGPT', 'Employees may inadvertently share confidential information', 'Likely', 'Major', 'High', 'Analyzing'),
(2, 1, 2, 'Code vulnerability from AI suggestions', 'AI-generated code may contain security flaws', 'Possible', 'Moderate', 'Medium', 'Mitigating');

-- Reset sequences
SELECT setval('auth_app_user_id_seq', (SELECT MAX(id) FROM auth_app_user));
SELECT setval('core_tenant_id_seq', (SELECT MAX(id) FROM core_tenant));
SELECT setval('core_department_id_seq', (SELECT MAX(id) FROM core_department));
SELECT setval('core_user_id_seq', (SELECT MAX(id) FROM core_user));
SELECT setval('visibility_risk_profile_id_seq', (SELECT MAX(id) FROM visibility_risk_profile));
SELECT setval('visibility_ai_asset_id_seq', (SELECT MAX(id) FROM visibility_ai_asset));
SELECT setval('visibility_discovery_source_id_seq', (SELECT MAX(id) FROM visibility_discovery_source));
SELECT setval('risk_category_id_seq', (SELECT MAX(id) FROM risk_category));
SELECT setval('risk_framework_id_seq', (SELECT MAX(id) FROM risk_framework));
SELECT setval('risk_control_id_seq', (SELECT MAX(id) FROM risk_control));
SELECT setval('risk_scenario_id_seq', (SELECT MAX(id) FROM risk_scenario));
