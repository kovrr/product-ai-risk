# AI Asset Visibility - Complete Attribute List

**Date**: November 5, 2025  
**Version**: 2.0  
**Total Attributes**: 60+

This document lists all attributes for AI Assets in the Assets Visibility module, organized by category with descriptions.

---

## 🆔 **Core Identity** (5 attributes)

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | number | Unique identifier for the asset |
| `name` | string | Asset name (e.g., "ChatGPT", "GitHub Copilot") |
| `asset_type` | enum | Type of AI asset: `model`, `app`, `agent`, `dataset`, `service` |
| `description` | string | Detailed description of what the asset does |
| `use_case` | string | Primary business use case (e.g., "Code completion", "Customer support") |

---

## 👥 **Ownership & Organization** (4 attributes)

| Attribute | Type | Description |
|-----------|------|-------------|
| `owner_id` | number | Business owner responsible for the asset (links to User) |
| `technical_owner_id` | number | Technical owner managing the asset (links to User) |
| `owning_org_unit` | string | Department/team that owns it (e.g., "Engineering", "Marketing") |
| `intended_users` | array | Who can use it: `["employees"]`, `["customers"]`, `["public"]` |

---

## 🏢 **Vendor & Source** (3 attributes)

| Attribute | Type | Description |
|-----------|------|-------------|
| `vendor_source` | enum | Source type: `internal`, `third_party`, `open_source` |
| `vendor_name` | string | Vendor/provider name (e.g., "OpenAI", "Microsoft", "Swift Tech") |
| `projected_value` | string | Expected business value (e.g., "$50K productivity", "$100K revenue") |

---

## 🚦 **Status & Lifecycle** (4 attributes)

| Attribute | Type | Description |
|-----------|------|-------------|
| `status` | enum | Approval status: `sanctioned`, `shadow`, `under_review`, `blocked`, `retired` |
| `lifecycle_stage` | enum | Development stage: `idea`, `development`, `testing`, `pilot`, `production`, `retired` |
| `deployment_platform` | enum | Where deployed: `cloud`, `on_premises`, `saas`, `hybrid` |
| `environment` | array | Environments: `["dev"]`, `["test"]`, `["prod"]` |

---

## ⚠️ **Risk Assessment** (4 attributes)

| Attribute | Type | Description |
|-----------|------|-------------|
| `risk_tier` | enum | Overall risk level: `low`, `medium`, `high`, `critical` |
| `risk_score` | number | Current risk score (0-100) after controls applied |
| `inherent_risk_score` | number | Risk score without any controls (0-100) |
| `residual_risk_score` | number | Risk score after controls (same as risk_score) |

---

## 🔒 **Data Privacy & Sensitivity** (3 attributes)

| Attribute | Type | Description |
|-----------|------|-------------|
| `personal_data_used` | boolean | Does it process personal data? (GDPR relevant) |
| `sensitive_categories` | array | Types of sensitive data: `special_category`, `children`, `biometrics`, `health`, `financial` |
| `data_retention_period` | string | How long data is kept (e.g., "90 days", "1 year") |

---

## 📋 **Compliance & Regulatory** (2 attributes)

| Attribute | Type | Description |
|-----------|------|-------------|
| `regulatory_applicability` | array | Applicable regulations: `eu_ai_act_high_risk`, `gdpr`, `hipaa`, `ccpa`, `sox` |
| `compliance_status` | string | Current compliance state (e.g., "Compliant", "Gap identified") |

---

## 🛡️ **Controls & Security** (2 attributes)

| Attribute | Type | Description |
|-----------|------|-------------|
| `control_coverage` | array | Applied controls: `explainability`, `human_oversight`, `access_control`, `monitoring`, `audit_trail` |
| `security_classification` | string | Data classification level (e.g., "Public", "Internal", "Confidential") |

---

## 🤖 **AI Model Details** (3 attributes)

| Attribute | Type | Description |
|-----------|------|-------------|
| `model_provider` | string | Who provides the AI model (e.g., "OpenAI", "Anthropic", "Internal") |
| `model_version` | string | Model version (e.g., "GPT-4", "Claude 2", "v2.1") |
| `model_type` | string | Type of model (e.g., "LLM", "Computer Vision", "NLP") |

---

## 🔗 **Integration & Technical** (5 attributes - JSONB)

| Attribute | Type | Description |
|-----------|------|-------------|
| `api_endpoints` | jsonb | API endpoints used by the asset |
| `data_sources` | jsonb | Where the asset gets its data from |
| `integration_points` | jsonb | Systems it integrates with (e.g., Zscaler, AAD, EDR) |
| `authentication_method` | string | How users authenticate (e.g., "SSO", "API Key", "OAuth") |
| `network_access` | string | Network requirements (e.g., "Internet", "VPN", "Internal only") |

---

## 📊 **Business Context** (3 attributes - JSONB)

| Attribute | Type | Description |
|-----------|------|-------------|
| `business_criticality` | string | How critical to business: `low`, `medium`, `high`, `critical` |
| `user_count` | number | Number of users/employees using it |
| `transaction_volume` | string | Usage volume (e.g., "1000 requests/day") |

---

## 📝 **Documentation & Evidence** (3 attributes - JSONB)

| Attribute | Type | Description |
|-----------|------|-------------|
| `documentation_links` | jsonb | Links to documentation, policies, procedures |
| `approval_documents` | jsonb | Approval forms, DPIAs, risk assessments |
| `training_materials` | jsonb | User training and guidelines |

---

## 🔍 **Discovery & Monitoring** (4 attributes - JSONB)

| Attribute | Type | Description |
|-----------|------|-------------|
| `discovery_source` | string | How it was discovered (e.g., "Zscaler", "User report", "IT scan") |
| `discovery_date` | date | When it was first discovered |
| `last_assessment_date` | date | Last time it was assessed |
| `monitoring_enabled` | boolean | Is it being actively monitored? |

---

## 📈 **Performance & Metrics** (3 attributes - JSONB)

| Attribute | Type | Description |
|-----------|------|-------------|
| `performance_metrics` | jsonb | KPIs and performance data |
| `cost_data` | jsonb | Licensing costs, usage costs |
| `roi_metrics` | jsonb | Return on investment data |

---

## 🔗 **Relationships** (3 attributes - via link tables)

| Attribute | Type | Description |
|-----------|------|-------------|
| `linked_risks` | array | Risk scenarios this asset is associated with (via `asset_risk_link`) |
| `linked_controls` | array | Controls applied to this asset (via `asset_control_link`) |
| `linked_assessments` | array | Compliance assessments covering this asset |

---

## 📅 **Audit Trail** (2 attributes)

| Attribute | Type | Description |
|-----------|------|-------------|
| `created_at` | timestamp | When the asset record was created |
| `updated_at` | timestamp | Last time the asset record was updated |

---

## 📊 **Summary by Category**

| Category | Count | Purpose |
|----------|-------|---------|
| Core Identity | 5 | Basic asset information |
| Ownership | 4 | Who owns and manages it |
| Vendor | 3 | Where it comes from |
| Status | 4 | Current state and deployment |
| Risk | 4 | Risk assessment scores |
| Privacy | 3 | Data protection concerns |
| Compliance | 2 | Regulatory requirements |
| Controls | 2 | Security measures |
| AI Model | 3 | Model-specific details |
| Integration | 5 | Technical connections |
| Business | 3 | Business value and usage |
| Documentation | 3 | Supporting materials |
| Discovery | 4 | How we found it |
| Performance | 3 | Metrics and costs |
| Relationships | 3 | Cross-module links |
| Audit | 2 | Change tracking |

**Total: 60+ attributes** covering all aspects of AI asset governance!

---

## 🎯 UI Display Priority

### **Assets List View** (11 columns)
The main table shows these critical attributes:
1. **Name + Type** - Asset identification
2. **Vendor** - Provider information
3. **Status** - Approval state (sanctioned/shadow/under_review)
4. **Owner** - Business owner with avatar
5. **Technical Owner** - Technical contact with avatar
6. **Risk Tier** - Visual risk badge (low/medium/high/critical)
7. **Risk Score** - Progress bar (0-100)
8. **Regulatory** - Compliance tags (GDPR, HIPAA, etc.)
9. **Lifecycle** - Development stage
10. **Personal Data** - Yes/No indicator
11. **Actions** - View button

### **Asset Detail View** (5 tabs)
Full detail page organized into tabs:

#### **Tab 1: Overview**
- Core Identity (5 attributes)
- Ownership (4 attributes)
- Vendor & Source (3 attributes)
- Status & Lifecycle (4 attributes)

#### **Tab 2: Risk & Compliance**
- Risk Assessment (4 attributes)
- Data Privacy (3 attributes)
- Compliance & Regulatory (2 attributes)
- Controls & Security (2 attributes)

#### **Tab 3: Technical Details**
- AI Model Details (3 attributes)
- Integration & Technical (5 attributes)
- Discovery & Monitoring (4 attributes)

#### **Tab 4: Business Context**
- Business Context (3 attributes)
- Performance & Metrics (3 attributes)
- Documentation & Evidence (3 attributes)

#### **Tab 5: Relationships**
- Linked Risks (with count and list)
- Linked Controls (with count and list)
- Linked Assessments (with count and list)
- Related Assets (similar assets)

---

## 🔄 **Cross-Module Integration**

### **Risk Register**
- Shows "Affected Assets" for each risk
- Links via `asset_risk_link` table
- Example: "Data exposure" risk → ChatGPT, Claude, Bard

### **AI Assurance Plan**
- Shows "Applicable Assets" for each control
- Links via `asset_control_link` table
- Example: "Access Control" → 15 assets

### **Compliance Readiness**
- Shows "Assessed Assets" per framework
- Filters by `regulatory_applicability`
- Example: GDPR → 12 assets

### **Dashboard**
- Asset statistics (total, shadow, high-risk)
- Recent assets widget
- High-risk assets widget

---

## 📝 **Data Model Alignment**

### **Database Schema**
- Table: `aikovrr.visibility_ai_asset`
- 60+ columns covering all attributes
- JSONB fields for flexible data
- Foreign keys to users, departments

### **TypeScript Interface**
```typescript
export interface AIAsset {
  // Core Identity
  id: number;
  name: string;
  asset_type: 'model' | 'app' | 'agent' | 'dataset' | 'service';
  description: string;
  use_case: string;
  
  // Ownership
  owner_id: number;
  technical_owner_id: number;
  owning_org_unit: string;
  intended_users: string[];
  
  // Vendor
  vendor_source: 'internal' | 'third_party' | 'open_source';
  vendor_name: string;
  projected_value?: string;
  
  // Status
  status: 'sanctioned' | 'shadow' | 'under_review' | 'blocked' | 'retired';
  lifecycle_stage: 'idea' | 'development' | 'testing' | 'pilot' | 'production' | 'retired';
  deployment_platform: 'cloud' | 'on_premises' | 'saas' | 'hybrid';
  environment: string[];
  
  // Risk
  risk_tier: 'low' | 'medium' | 'high' | 'critical';
  risk_score: number;
  inherent_risk_score: number;
  residual_risk_score: number;
  
  // Privacy
  personal_data_used: boolean;
  sensitive_categories: string[];
  
  // Compliance
  regulatory_applicability: string[];
  
  // Controls
  control_coverage: string[];
  
  // AI Model
  model_provider: string;
  model_version: string;
}
```

---

## 🎨 **UI Components Used**

- **StatusBadge** - For status display
- **RiskScoreBadge** - For risk tier
- **RiskScoreProgress** - For risk score bar
- **UserAvatar** - For owners
- **DataTable** - For list view
- **Tabs** - For detail view organization
- **Badge** - For regulatory tags
- **Checkbox** - For personal data indicator

---

## 📚 **References**

- **Database Schema**: `/database/aikovrr_schema_v2.sql`
- **Mock Data**: `/frontend/src/data/mock-assets.ts`
- **TypeScript Types**: `/frontend/src/data/mock-assets.ts`
- **UI Components**: `/frontend/src/components/molecules/`
- **List View**: `/frontend/src/pages/AssetsVisibility/AssetsListView.tsx`

---

**Last Updated**: November 5, 2025  
**Status**: Complete - All 60+ attributes defined and documented
