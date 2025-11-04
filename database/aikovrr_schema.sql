-- AIKovrr PostgreSQL Database Schema
-- Database: aikovrr
-- Created for Django + React application

-- Create schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS aikovrr;

-- Set search path to use aikovrr schema
SET search_path TO aikovrr, public;

-- Drop existing tables if they exist
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
    shadow_sanction_ratio DECIMAL(5, 2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Visibility Tables
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
    risk_profile_id INTEGER REFERENCES visibility_risk_profile(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    vendor VARCHAR(255),
    domain VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Unknown', -- Sanctioned, Shadow, Unknown
    first_seen TIMESTAMP,
    last_seen TIMESTAMP,
    entra_service_principal_id VARCHAR(255),
    entra_app_id VARCHAR(255),
    entra_publisher_name VARCHAR(255),
    entra_sign_in_audience VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
CREATE INDEX idx_ai_asset_tenant ON visibility_ai_asset(tenant_id);
CREATE INDEX idx_ai_asset_status ON visibility_ai_asset(status);
CREATE INDEX idx_ai_asset_vendor ON visibility_ai_asset(vendor);
CREATE INDEX idx_asset_relationship_user ON visibility_asset_relationship(user_id);
CREATE INDEX idx_asset_relationship_asset ON visibility_asset_relationship(ai_asset_id);
CREATE INDEX idx_risk_scenario_tenant ON risk_scenario(tenant_id);
CREATE INDEX idx_risk_scenario_owner ON risk_scenario(owner_id);
CREATE INDEX idx_risk_scenario_status ON risk_scenario(status);
CREATE INDEX idx_risk_scenario_priority ON risk_scenario(priority);
CREATE INDEX idx_sa_task_tenant ON governance_self_assessment_task(tenant_id);
CREATE INDEX idx_sa_task_assigned ON governance_self_assessment_task(assigned_to_id);
CREATE INDEX idx_sa_task_status ON governance_self_assessment_task(status);
