-- AIKovrr PostgreSQL Database Schema v2.0
-- Database: aikovrr
-- Updated: November 5, 2025
-- Changes: Enhanced Assets Visibility with cross-module relationships

-- Create schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS aikovrr;

-- Set search path to use aikovrr schema
SET search_path TO aikovrr, public;

-- Drop existing tables if they exist (in correct order to handle dependencies)
DROP TABLE IF EXISTS asset_evidence CASCADE;
DROP TABLE IF EXISTS asset_note CASCADE;
DROP TABLE IF EXISTS asset_integration CASCADE;
DROP TABLE IF EXISTS asset_risk_link CASCADE;
DROP TABLE IF EXISTS asset_control_link CASCADE;
DROP TABLE IF EXISTS asset_compliance_link CASCADE;
DROP TABLE IF EXISTS governance_custom_field CASCADE;
DROP TABLE IF EXISTS governance_self_assessment_task CASCADE;
DROP TABLE IF EXISTS risk_note CASCADE;
DROP TABLE IF EXISTS risk_scenario_control CASCADE;
DROP TABLE IF EXISTS risk_control CASCADE;
DROP TABLE IF EXISTS risk_framework CASCADE;
DROP TABLE IF EXISTS risk_scenario_categories CASCADE;
DROP TABLE IF EXISTS risk_category CASCADE;
DROP TABLE IF EXISTS risk_scenario CASCADE;
DROP TABLE IF EXISTS visibility_usage_indicator CASCADE;
DROP TABLE IF EXISTS visibility_asset_relationship CASCADE;
DROP TABLE IF EXISTS visibility_discovery_source CASCADE;
DROP TABLE IF EXISTS visibility_risk_profile CASCADE;
DROP TABLE IF EXISTS visibility_ai_asset CASCADE;
DROP TABLE IF EXISTS core_user CASCADE;
DROP TABLE IF EXISTS core_department CASCADE;
DROP TABLE IF EXISTS core_tenant CASCADE;
DROP TABLE IF EXISTS auth_app_user CASCADE;

-- Authentication Tables
CREATE TABLE auth_app_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    role VARCHAR(50) DEFAULT 'analyst', -- admin, analyst, viewer
    is_active BOOLEAN DEFAULT TRUE,
    is_superuser BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Core Tables
CREATE TABLE core_tenant (
    id SERIAL PRIMARY KEY,
    org_name VARCHAR(255) NOT NULL,
    config JSONB DEFAULT '{}',
    admin_contacts TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE core_department (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES core_tenant(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    risk_exposure_agg DECIMAL(15, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE core_user (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES core_tenant(id) ON DELETE CASCADE,
    department_id INTEGER REFERENCES core_department(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(100),
    avatar VARCHAR(500),
    shadow_sanction_ratio DECIMAL(5, 2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Visibility Tables (Enhanced v2.0)
CREATE TABLE visibility_risk_profile (
    id SERIAL PRIMARY KEY,
    kovrr_vendor_id VARCHAR(255),
    risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
    financial_exposure_min DECIMAL(15, 2),
    financial_exposure_max DECIMAL(15, 2),
    incident_history_ref TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE visibility_ai_asset (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES core_tenant(id) ON DELETE CASCADE,
    
    -- Core Identity
    name VARCHAR(255) NOT NULL,
    asset_type VARCHAR(50) NOT NULL, -- model, app, agent, dataset, service
    
    -- Ownership (aligned with risk_scenario.owner_id)
    owner_id INTEGER REFERENCES core_user(id) ON DELETE SET NULL,
    technical_owner_id INTEGER REFERENCES core_user(id) ON DELETE SET NULL,
    owning_org_unit VARCHAR(255),
    
    -- Vendor & Source
    vendor_source VARCHAR(50), -- internal, third_party, open_source
    vendor_name VARCHAR(255),
    
    -- Status (aligned with risk_scenario.status)
    status VARCHAR(50) DEFAULT 'under_review', -- sanctioned, shadow, under_review, blocked, retired
    
    -- Business Context
    use_case VARCHAR(255),
    description TEXT,
    intended_users JSONB DEFAULT '[]', -- ['employees', 'customers', 'public']
    projected_value VARCHAR(255),
    
    -- Lifecycle
    lifecycle_stage VARCHAR(50), -- idea, development, testing, pilot, production, retired
    deployment_platform VARCHAR(50), -- cloud, on_premises, saas, hybrid
    environment JSONB DEFAULT '[]', -- ['dev', 'test', 'prod']
    
    -- Risk Scoring (aligned with risk_scenario.priority)
    risk_tier VARCHAR(20), -- low, medium, high, critical
    risk_score DECIMAL(5, 2), -- 0-100
    inherent_risk_score DECIMAL(5, 2), -- 0-100 before controls
    residual_risk_score DECIMAL(5, 2), -- 0-100 after controls
    
    -- Data Sensitivity
    personal_data_used BOOLEAN DEFAULT FALSE,
    sensitive_categories JSONB DEFAULT '[]', -- ['special_category', 'children', 'biometrics', 'health', 'financial']
    
    -- Compliance
    regulatory_applicability JSONB DEFAULT '[]', -- ['eu_ai_act_high_risk', 'gdpr', 'hipaa', 'ccpa']
    control_coverage JSONB DEFAULT '[]', -- ['explainability', 'human_oversight', 'access_control', 'monitoring']
    
    -- Model Specifics (for asset_type='model')
    model_provider VARCHAR(100),
    model_version VARCHAR(100),
    
    -- Integration Data (auto-populated from AAD, Zscaler, EDR)
    service_principal_id VARCHAR(255),
    aad_permissions JSONB DEFAULT '[]',
    user_assignments JSONB DEFAULT '[]',
    network_destinations JSONB DEFAULT '[]',
    
    -- Dates
    first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    first_deployment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Legacy fields (for backward compatibility)
    risk_profile_id INTEGER REFERENCES visibility_risk_profile(id) ON DELETE SET NULL,
    category VARCHAR(100), -- deprecated, use asset_type
    vendor VARCHAR(255), -- deprecated, use vendor_name
    domain VARCHAR(255),
    entra_service_principal_id VARCHAR(255),
    entra_app_id VARCHAR(255),
    entra_publisher_name VARCHAR(255),
    entra_sign_in_audience VARCHAR(100)
);

-- Asset Evidence (NEW)
CREATE TABLE asset_evidence (
    id SERIAL PRIMARY KEY,
    asset_id INTEGER NOT NULL REFERENCES visibility_ai_asset(id) ON DELETE CASCADE,
    evidence_type VARCHAR(50) NOT NULL, -- dpia, risk_assessment, approval, audit_report, test_results, other
    title VARCHAR(255) NOT NULL,
    file_url VARCHAR(500),
    uploaded_by_id INTEGER REFERENCES core_user(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Asset Notes (NEW)
CREATE TABLE asset_note (
    id SERIAL PRIMARY KEY,
    asset_id INTEGER NOT NULL REFERENCES visibility_ai_asset(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    created_by_id INTEGER REFERENCES core_user(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Asset Integration Status (NEW)
CREATE TABLE asset_integration (
    id SERIAL PRIMARY KEY,
    asset_id INTEGER NOT NULL REFERENCES visibility_ai_asset(id) ON DELETE CASCADE,
    integration_type VARCHAR(50) NOT NULL, -- aad, zscaler, edr, casb
    last_sync TIMESTAMP,
    sync_status VARCHAR(20), -- success, failed, pending
    sync_details JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(asset_id, integration_type)
);

CREATE TABLE visibility_discovery_source (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES core_tenant(id) ON DELETE CASCADE,
    source_type VARCHAR(50) NOT NULL, -- AzureAD, Survey, CSV
    collection_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confidence_level VARCHAR(50), -- High, Medium, Low
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE visibility_asset_relationship (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES core_user(id) ON DELETE CASCADE,
    ai_asset_id INTEGER NOT NULL REFERENCES visibility_ai_asset(id) ON DELETE CASCADE,
    discovery_source_id INTEGER REFERENCES visibility_discovery_source(id) ON DELETE SET NULL,
    relationship_type VARCHAR(50), -- Direct, Integration, Indirect
    confidence_score DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE visibility_usage_indicator (
    id SERIAL PRIMARY KEY,
    ai_asset_id INTEGER NOT NULL REFERENCES visibility_ai_asset(id) ON DELETE CASCADE,
    first_seen TIMESTAMP,
    last_seen TIMESTAMP,
    active_users_count INTEGER DEFAULT 0,
    trend_status VARCHAR(50), -- Increasing, Stable, Decreasing
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Risk Tables
CREATE TABLE risk_category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INTEGER REFERENCES risk_category(id) ON DELETE SET NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE risk_framework (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    version VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE risk_control (
    id SERIAL PRIMARY KEY,
    framework_id INTEGER NOT NULL REFERENCES risk_framework(id) ON DELETE CASCADE,
    control_id VARCHAR(100) NOT NULL,
    description TEXT,
    maturity_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE risk_scenario (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES core_tenant(id) ON DELETE CASCADE,
    owner_id INTEGER REFERENCES core_user(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    likelihood VARCHAR(50), -- Rare, Unlikely, Possible, Likely, Almost Certain
    impact VARCHAR(50), -- Negligible, Minor, Moderate, Major, Severe
    priority VARCHAR(50), -- Low, Medium, High, Critical
    status VARCHAR(50) DEFAULT 'Identified', -- Identified, Analyzing, Mitigating, Monitoring, Closed
    response_plan VARCHAR(50), -- Mitigate, Accept, Avoid, Transfer
    annual_likelihood DECIMAL(5, 2),
    peer_rate DECIMAL(5, 2),
    financial_loss_min DECIMAL(15, 2),
    financial_loss_max DECIMAL(15, 2),
    pii_exposure INTEGER DEFAULT 0,
    pci_exposure INTEGER DEFAULT 0,
    phi_exposure INTEGER DEFAULT 0,
    review_date DATE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mitigation_cost DECIMAL(15, 2),
    ticket_link VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE risk_scenario_categories (
    id SERIAL PRIMARY KEY,
    scenario_id INTEGER NOT NULL REFERENCES risk_scenario(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES risk_category(id) ON DELETE CASCADE,
    UNIQUE(scenario_id, category_id)
);

CREATE TABLE risk_scenario_control (
    id SERIAL PRIMARY KEY,
    scenario_id INTEGER NOT NULL REFERENCES risk_scenario(id) ON DELETE CASCADE,
    control_id INTEGER NOT NULL REFERENCES risk_control(id) ON DELETE CASCADE,
    compliance_status VARCHAR(50), -- Compliant, Partial, Non-Compliant, Not Applicable
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(scenario_id, control_id)
);

CREATE TABLE risk_note (
    id SERIAL PRIMARY KEY,
    scenario_id INTEGER NOT NULL REFERENCES risk_scenario(id) ON DELETE CASCADE,
    author_id INTEGER NOT NULL REFERENCES core_user(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cross-Module Relationship Tables (NEW)

-- Assets <-> Risks (Many-to-Many)
CREATE TABLE asset_risk_link (
    id SERIAL PRIMARY KEY,
    asset_id INTEGER NOT NULL REFERENCES visibility_ai_asset(id) ON DELETE CASCADE,
    risk_id INTEGER NOT NULL REFERENCES risk_scenario(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(asset_id, risk_id)
);

-- Assets <-> Controls (Many-to-Many)
CREATE TABLE asset_control_link (
    id SERIAL PRIMARY KEY,
    asset_id INTEGER NOT NULL REFERENCES visibility_ai_asset(id) ON DELETE CASCADE,
    control_id INTEGER NOT NULL REFERENCES risk_control(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(asset_id, control_id)
);

-- Assets <-> Compliance Assessments (Many-to-Many)
-- Note: Compliance assessment table will be added when implementing that module
-- For now, we'll use a placeholder structure
CREATE TABLE asset_compliance_link (
    id SERIAL PRIMARY KEY,
    asset_id INTEGER NOT NULL REFERENCES visibility_ai_asset(id) ON DELETE CASCADE,
    assessment_id INTEGER, -- Will link to compliance_readiness table when created
    framework_id INTEGER REFERENCES risk_framework(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Governance Tables
CREATE TABLE governance_self_assessment_task (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES core_tenant(id) ON DELETE CASCADE,
    framework_id INTEGER REFERENCES risk_framework(id) ON DELETE SET NULL,
    control_id INTEGER REFERENCES risk_control(id) ON DELETE SET NULL,
    assigned_to_id INTEGER REFERENCES core_user(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Not Started', -- Not Started, In Progress, Ready for Review, Approved
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance_custom_field (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES core_tenant(id) ON DELETE CASCADE,
    entity_type VARCHAR(100) NOT NULL, -- risk_scenario, ai_asset, etc.
    entity_id INTEGER NOT NULL,
    field_name VARCHAR(255) NOT NULL,
    field_type VARCHAR(50), -- text, number, date, boolean
    field_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_app_user_username ON auth_app_user(username);
CREATE INDEX idx_app_user_email ON auth_app_user(email);
CREATE INDEX idx_user_tenant ON core_user(tenant_id);
CREATE INDEX idx_user_department ON core_user(department_id);
CREATE INDEX idx_user_email ON core_user(email);
CREATE INDEX idx_department_tenant ON core_department(tenant_id);

-- Enhanced indexes for visibility_ai_asset
CREATE INDEX idx_ai_asset_tenant ON visibility_ai_asset(tenant_id);
CREATE INDEX idx_ai_asset_status ON visibility_ai_asset(status);
CREATE INDEX idx_ai_asset_type ON visibility_ai_asset(asset_type);
CREATE INDEX idx_ai_asset_vendor_source ON visibility_ai_asset(vendor_source);
CREATE INDEX idx_ai_asset_risk_tier ON visibility_ai_asset(risk_tier);
CREATE INDEX idx_ai_asset_lifecycle ON visibility_ai_asset(lifecycle_stage);
CREATE INDEX idx_ai_asset_owner ON visibility_ai_asset(owner_id);
CREATE INDEX idx_ai_asset_tech_owner ON visibility_ai_asset(technical_owner_id);

-- Indexes for new tables
CREATE INDEX idx_asset_evidence_asset ON asset_evidence(asset_id);
CREATE INDEX idx_asset_note_asset ON asset_note(asset_id);
CREATE INDEX idx_asset_integration_asset ON asset_integration(asset_id);
CREATE INDEX idx_asset_risk_link_asset ON asset_risk_link(asset_id);
CREATE INDEX idx_asset_risk_link_risk ON asset_risk_link(risk_id);
CREATE INDEX idx_asset_control_link_asset ON asset_control_link(asset_id);
CREATE INDEX idx_asset_control_link_control ON asset_control_link(control_id);
CREATE INDEX idx_asset_compliance_link_asset ON asset_compliance_link(asset_id);

-- Existing indexes
CREATE INDEX idx_asset_relationship_user ON visibility_asset_relationship(user_id);
CREATE INDEX idx_asset_relationship_asset ON visibility_asset_relationship(ai_asset_id);
CREATE INDEX idx_risk_scenario_tenant ON risk_scenario(tenant_id);
CREATE INDEX idx_risk_scenario_owner ON risk_scenario(owner_id);
CREATE INDEX idx_risk_scenario_status ON risk_scenario(status);
CREATE INDEX idx_risk_scenario_priority ON risk_scenario(priority);
CREATE INDEX idx_sa_task_tenant ON governance_self_assessment_task(tenant_id);
CREATE INDEX idx_sa_task_assigned ON governance_self_assessment_task(assigned_to_id);
CREATE INDEX idx_sa_task_status ON governance_self_assessment_task(status);

-- Comments for documentation
COMMENT ON TABLE visibility_ai_asset IS 'Enhanced AI Asset inventory v2.0 with cross-module relationships';
COMMENT ON COLUMN visibility_ai_asset.asset_type IS 'Type: model, app, agent, dataset, service';
COMMENT ON COLUMN visibility_ai_asset.status IS 'Status: sanctioned, shadow, under_review, blocked, retired (aligned with risk_scenario.status)';
COMMENT ON COLUMN visibility_ai_asset.risk_tier IS 'Risk tier: low, medium, high, critical (aligned with risk_scenario.priority)';
COMMENT ON COLUMN visibility_ai_asset.risk_score IS 'Risk score 0-100 (aligned with control priority_score methodology)';
COMMENT ON TABLE asset_risk_link IS 'Many-to-many relationship between assets and risks';
COMMENT ON TABLE asset_control_link IS 'Many-to-many relationship between assets and controls';
COMMENT ON TABLE asset_compliance_link IS 'Many-to-many relationship between assets and compliance assessments';
