# Assets Visibility - PRD Update Summary

**Date**: November 5, 2025  
**Status**: ✅ PRD Updated

---

## ✅ What Was Updated in PRD.md

### Section 2.2: Assets Visibility (Third Party Inside)

**Status Changed**: ✅ Implemented → 🔄 Enhanced with Comprehensive Data Model  
**Version**: v2.0  
**Last Updated**: November 5, 2025

### Updated Components:

1. **User Personas** (Added 2):
   - ✅ IT Security
   - ✅ Risk Managers
   - ✅ Compliance Officers
   - ⭐ Business Owners (NEW)
   - ⭐ Technical Owners (NEW)

2. **Purpose Statement** (Enhanced):
   - Old: Basic visibility into AI tools
   - New: Comprehensive visibility including identity, ownership, business context, lifecycle, data facts, access/security, and compliance/risk attributes

3. **User Stories** (Added 3):
   - Story 1: Enhanced with "access permissions and security posture"
   - Story 2: Enhanced with "lifecycle stage and risk tier"
   - Story 3: Enhanced with "regulatory applicability and control coverage"
   - ⭐ Story 4: NEW - Business Owner perspective (business purpose, projected value, ROI)
   - ⭐ Story 5: NEW - Technical Owner perspective (deployment details, integrations, dependencies)

---

## 📊 Gap Analysis Results

### Current PRD Coverage: 9 fields
✅ Asset Name  
✅ Vendor  
✅ Category (Type)  
✅ Status  
✅ Domain  
✅ Description  
✅ First Seen  
✅ Last Seen  
✅ Risk Profile  

### Missing from PRD: 46 fields (Now Documented)

#### A) Identity & Ownership (8 fields)
1. Display Name (business-friendly label)
2. Owning Org Unit
3. Business Owner
4. Technical Owner
5. Vendor / Source (Internal, 3P Vendor, OSS)
6. Vendor Name / Product
7. Service Principal / App Registration ID
8. Linked Enterprise App(s)

#### B) Business Context (6 fields)
9. Use Case Name
10. Business Purpose
11. Business Processes Impacted
12. Intended Users
13. Geographies of Use
14. Projected Value / KPI

#### C) Lifecycle & Deployment (6 fields)
15. Lifecycle Stage
16. First Deployment Date
17. Last Change Date
18. Environment(s)
19. Deployment Platform
20. Integrations

#### D) Data & Model Facts (11 fields)
21. Model Family / Architecture
22. Model Provider
23. Version / Hash
24. Training Data Summary
25. Personal Data Used
26. Sensitive Categories
27. Inputs
28. Outputs
29. Safety/Quality Evaluations Present

#### E) Access & Security (8 fields)
30. AAD App Permissions
31. Granted Admin Consents
32. User/Group Assignments
33. Network Egress Destinations
34. Observed Traffic Volume
35. EDR Findings Linked
36. Endpoint Coverage
37. Secrets / API Keys Storage Location

#### F) Compliance & Risk (7 fields)
38. Regulatory Applicability
39. Risk Tier
40. Inherent Risk Score
41. Residual Risk Score
42. Control Coverage
43. Evidence Links

---

## 📄 Additional Documentation Created

### 1. ASSETS_VISIBILITY_ENHANCED_PRD.md
**Complete enhanced PRD section** including:
- ✅ All 60+ fields documented
- ✅ Enhanced data model with Python code
- ✅ Risk scoring algorithms (inherent, residual, tier)
- ✅ Integration specifications (AAD, Zscaler, EDR)
- ✅ 7-step wizard for asset creation
- ✅ 7-tab detail page specifications
- ✅ Enhanced business rules
- ✅ API endpoints
- ✅ 8 UI views required
- ✅ Performance requirements

### 2. PRD_VS_HTML_GAP_ANALYSIS.md
**Gap analysis** showing:
- HTML mockup coverage per module
- Missing features from PRD
- Implementation priorities
- Revised timeline (9 weeks)

### 3. HTML_MOCKUPS_SUMMARY.md
**Summary of all HTML mockups** including:
- 4 modules with HTML files
- Feature breakdowns
- Component hierarchies
- API requirements
- Design system alignment

---

## 🎯 Key Enhancements in Enhanced PRD

### 1. Comprehensive Data Model
```python
class AIAsset(models.Model):
    # A) Identity & Ownership (11 fields)
    display_name, asset_type, owning_org_unit, business_owner,
    technical_owner, vendor_source, vendor_name_product,
    service_principal_id, linked_enterprise_apps
    
    # B) Business Context (6 fields)
    use_case_name, business_purpose, business_processes_impacted,
    intended_users, geographies_of_use, projected_value_kpi
    
    # C) Lifecycle & Deployment (6 fields)
    lifecycle_stage, first_deployment_date, last_change_date,
    environments, deployment_platform, integrations
    
    # D) Data & Model Facts (11 fields)
    model_family_architecture, model_provider, version_hash,
    training_data_summary, personal_data_used, sensitive_categories,
    inputs_description, outputs_description, safety_quality_evaluations
    
    # E) Access & Security (8 fields)
    aad_app_permissions, granted_admin_consents, user_group_assignments,
    network_egress_destinations, observed_traffic_volume,
    edr_findings_linked, endpoint_coverage_percent, secrets_storage_location
    
    # F) Compliance & Risk (7 fields)
    regulatory_applicability, risk_tier, inherent_risk_score,
    residual_risk_score, control_coverage, evidence_links
```

### 2. Risk Scoring Algorithms

**Inherent Risk Score** (0-100):
- Data sensitivity (0-30 points)
- User impact (0-30 points)
- Autonomy (0-20 points)
- Scale (0-20 points)

**Residual Risk Score**:
- Inherent - Control Coverage Impact
- Control impact: explainability (10), human-in-loop (15), access control (15), monitoring (10)

**Risk Tier**:
- High: 67-100
- Medium: 34-66
- Low: 0-33

### 3. Integration Specifications

**Azure AD Integration**:
- Auto-discover Service Principals and App Registrations
- Sync permissions, consents, user assignments
- Update frequency: Daily

**Zscaler Integration**:
- Auto-discover network egress to AI service domains
- Sync traffic patterns and volume
- Update frequency: Hourly

**EDR Integration**:
- Auto-discover AI-related processes and findings
- Sync alerts, CVEs, endpoint coverage
- Update frequency: Real-time

### 4. Enhanced UI Views

1. **Assets List View** - Enhanced table with 16 columns
2. **Asset Details Page** - 7 tabs (Identity, Business, Lifecycle, Data, Access, Compliance, Activity)
3. **Create Asset Wizard** - 7 steps
4. **Edit Asset Form** - Inline or wizard
5. **Shadow AI Dashboard** - Dedicated view
6. **Risk Heatmap** - Visual grid by risk tier and lifecycle
7. **Compliance Dashboard** - By regulatory applicability
8. **Integration Status Page** - Sync status for AAD, Zscaler, EDR

### 5. Enhanced Business Rules

1. **Risk Scoring**: Auto-calculated on save
2. **Ownership Requirements**: Must assign owners before Pilot/Prod
3. **Personal Data Handling**: Must document sensitive categories if personal data used
4. **Lifecycle Gates**: Enforce ownership and risk assessment requirements
5. **Shadow AI Workflow**: Shadow → Review → Sanctioned or Blocked
6. **Integration Sync**: AAD (daily), Zscaler (hourly), EDR (real-time)
7. **Regulatory Triggers**: Auto-flag EU AI Act High-Risk, GDPR, HIPAA

---

## 🚀 Implementation Impact

### Database Changes Required

**New Fields to Add** (46 fields):
- 11 Identity & Ownership fields
- 6 Business Context fields
- 6 Lifecycle & Deployment fields
- 11 Data & Model Facts fields
- 8 Access & Security fields
- 7 Compliance & Risk fields

**New Methods to Add**:
- `calculate_inherent_risk_score()`
- `calculate_residual_risk_score()`
- `determine_risk_tier()`

**New Indexes**:
- `(tenant, asset_type)`
- `(tenant, lifecycle_stage)`
- `(tenant, risk_tier)`
- `(tenant, status)`

### API Changes Required

**New Endpoints**:
- `GET /api/assets/:id/risk-score/` - Get risk score breakdown
- `POST /api/assets/:id/calculate-risk/` - Recalculate risk scores
- `GET /api/assets/shadow/` - List shadow AI assets
- `POST /api/assets/:id/approve/` - Approve shadow asset
- `POST /api/assets/:id/block/` - Block shadow asset
- `GET /api/assets/export/` - Export assets
- `POST /api/assets/bulk-import/` - Bulk import
- `GET /api/assets/integrations/sync/` - Trigger sync
- `GET /api/assets/statistics/` - Get statistics

### Frontend Changes Required

**New Components**:
- AssetWizard (7 steps)
- AssetDetailsTabs (7 tabs)
- RiskScoreBreakdown
- IntegrationSyncStatus
- ShadowAIDashboard
- RiskHeatmap
- ComplianceDashboard

**Enhanced Components**:
- AssetsTable (16 columns, advanced filters)
- AssetForm (60+ fields)
- ColumnCustomization
- SavedViews
- BulkActions

### Integration Work Required

1. **Azure AD Integration**:
   - OAuth setup
   - Graph API calls
   - Permission sync logic
   - User/group sync

2. **Zscaler Integration**:
   - API authentication
   - Traffic data ingestion
   - Domain mapping

3. **EDR Integration**:
   - Real-time webhook setup
   - Alert ingestion
   - CVE mapping

---

## 📅 Implementation Timeline

### Phase 1: Database & Backend (Week 1-2)
- Add 46 new fields to AIAsset model
- Implement risk scoring algorithms
- Create new API endpoints
- Set up database indexes

### Phase 2: Integrations (Week 3-4)
- Azure AD integration
- Zscaler integration
- EDR integration
- Sync scheduling

### Phase 3: Frontend - Core (Week 5-6)
- Enhanced assets table (16 columns)
- Asset wizard (7 steps)
- Asset details page (7 tabs)
- Risk score visualization

### Phase 4: Frontend - Advanced (Week 7-8)
- Shadow AI dashboard
- Risk heatmap
- Compliance dashboard
- Integration status page
- Column customization
- Saved views
- Bulk actions

### Phase 5: Testing & Refinement (Week 9)
- Integration testing
- Performance testing
- User acceptance testing
- Bug fixes

**Total Estimated Time**: 9 weeks

---

## ✅ Acceptance Criteria (Enhanced)

- ✅ All 60+ fields captured in data model
- ✅ Asset wizard validates required fields per step
- ✅ Risk scores auto-calculate on save
- ✅ Risk tier badge displays correctly
- ✅ AAD integration syncs permissions and users
- ✅ Zscaler integration syncs network traffic
- ✅ EDR integration syncs security findings
- ✅ Shadow AI detection flags unapproved assets
- ✅ Lifecycle gates enforce ownership requirements
- ✅ Personal data handling triggers GDPR compliance checks
- ✅ Evidence links support file upload and URLs
- ✅ Bulk import handles 1000+ assets
- ✅ Export includes all selected columns
- ✅ Column customization persists per user
- ✅ Saved views allow quick filter access

---

## 🎯 Alignment with Industry Platforms

The enhanced data model aligns with:

- **OneTrust**: Risk levels, inherent/aggregate scores, privacy risk attributes
- **Credo.ai**: Risk ↔ value prioritization, projected KPIs
- **ServiceNow**: Lifecycle status modeling
- **IBM**: AI Factsheets concept (versioned governance, evidence links)
- **Fiddler AI**: Safety/quality evaluations integration
- **MITRE ATLAS**: Threat pattern integration (future)

---

## 📋 Next Steps

1. **Review Enhanced PRD**: Review `ASSETS_VISIBILITY_ENHANCED_PRD.md` for complete specifications
2. **Database Migration**: Plan and execute database schema changes
3. **API Development**: Implement new endpoints and risk scoring logic
4. **Integration Setup**: Configure AAD, Zscaler, EDR integrations
5. **Frontend Development**: Build wizard, detail page, and dashboards
6. **Testing**: Comprehensive testing of all new features
7. **Documentation**: Update API docs and user guides

---

**Summary**: The Assets Visibility module has been significantly enhanced from 9 fields to 60+ fields, providing comprehensive AI asset governance aligned with industry best practices and regulatory requirements. The PRD has been updated to reflect these changes, and detailed implementation specifications are available in the enhanced PRD document.
