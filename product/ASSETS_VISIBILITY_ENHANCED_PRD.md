# Assets Visibility - Enhanced PRD Section

**Date**: November 5, 2025  
**Status**: Updated with comprehensive data model

---

## Gap Analysis: Current PRD vs. Required Data Model

### Current PRD Fields (9 fields)
✅ Asset Name  
✅ Vendor  
✅ Category (Type)  
✅ Status  
✅ Domain  
✅ Description  
✅ First Seen  
✅ Last Seen  
✅ Risk Profile  

### Missing Fields from Required Data Model (60+ fields)

#### A) Identity & Ownership (Missing: 8 fields)
❌ Display Name (business-friendly label)  
❌ Owning Org Unit  
❌ Business Owner  
❌ Technical Owner  
❌ Vendor / Source (Internal, 3P Vendor, OSS)  
❌ Vendor Name / Product  
❌ Service Principal / App Registration ID  
❌ Linked Enterprise App(s)  

#### B) Business Context (Missing: 6 fields)
❌ Use Case Name  
❌ Business Purpose  
❌ Business Processes Impacted  
❌ Intended Users  
❌ Geographies of Use  
❌ Projected Value / KPI  

#### C) Lifecycle & Deployment (Missing: 6 fields)
❌ Lifecycle Stage  
❌ First Deployment Date  
❌ Last Change Date  
❌ Environment(s)  
❌ Deployment Platform  
❌ Integrations  

#### D) Data & Model Facts (Missing: 11 fields)
❌ Model Family / Architecture  
❌ Model Provider  
❌ Version / Hash  
❌ Training Data Summary  
❌ Personal Data Used  
❌ Sensitive Categories  
❌ Inputs  
❌ Outputs  
❌ Safety/Quality Evaluations Present  

#### E) Access & Security (Missing: 8 fields)
❌ AAD App Permissions  
❌ Granted Admin Consents  
❌ User/Group Assignments  
❌ Network Egress Destinations  
❌ Observed Traffic Volume  
❌ EDR Findings Linked  
❌ Endpoint Coverage  
❌ Secrets / API Keys Storage Location  

#### F) Compliance & Risk (Missing: 7 fields)
❌ Regulatory Applicability  
❌ Risk Tier  
❌ Inherent Risk Score  
❌ Residual Risk Score  
❌ Control Coverage  
❌ Evidence Links  

**Total Missing**: 46 fields

---

## Updated PRD Section: Assets Visibility

### 2.2 Assets Visibility (Third Party Inside)
**Status**: 🔄 Enhanced with Comprehensive Data Model  
**Route**: `/assets`  
**User Personas**: IT Security, Risk Managers, Compliance Officers, Business Owners, Technical Owners

#### Purpose
Provide complete visibility into all AI tools, models, and services being used across the organization, including identity, ownership, business context, lifecycle, data facts, access/security, and compliance/risk attributes—enabling comprehensive governance, risk assessment, and regulatory compliance.

#### User Stories
1. **As an IT Security Manager**, I want to see all AI tools with their access permissions and security posture so that I can identify unauthorized shadow AI and assess security risks.
2. **As a Risk Manager**, I want to categorize AI assets by type, lifecycle stage, and risk tier so that I can apply appropriate risk frameworks and prioritize remediation.
3. **As a Compliance Officer**, I want to track regulatory applicability and control coverage so that I can ensure timely risk assessments and demonstrate compliance.
4. **As a Business Owner**, I want to document business purpose and projected value so that I can justify AI investments and track ROI.
5. **As a Technical Owner**, I want to track deployment details and integrations so that I can manage the asset lifecycle and dependencies.

#### Features

##### Asset List View (Main Table)

**Enhanced Table Columns** (Grouped by Category):

**Core Identification**:
1. **Asset ID** (system-generated, sortable)
2. **Display Name** (business-friendly, sortable, clickable)
3. **Type** (Model/App/Agent/Dataset/Prompt/Service, badge, filterable)
4. **Vendor/Source** (Internal/3P Vendor/OSS, badge, filterable)
5. **Status** (Sanctioned/Shadow/Unknown, badge, filterable)

**Ownership**:
6. **Owning Org Unit** (sortable, filterable)
7. **Business Owner** (user avatar, sortable, filterable)
8. **Technical Owner** (user avatar, sortable, filterable)

**Risk & Compliance**:
9. **Risk Tier** (Low/Med/High, color-coded badge, sortable, filterable)
10. **Inherent Risk Score** (0-100, progress bar, sortable)
11. **Residual Risk Score** (0-100, progress bar, sortable)
12. **Regulatory Applicability** (EU AI Act category, badge, filterable)

**Lifecycle**:
13. **Lifecycle Stage** (Idea/Dev/Test/Pilot/Prod/Retired, badge, filterable)
14. **First Deployment Date** (sortable)
15. **Last Change Date** (sortable)

**Actions**:
16. **Quick Actions** (View Details, Edit, Delete, Export)

**Search & Filter Enhancements**:
- **Global Search**: Name, Display Name, Vendor, Use Case, Business Purpose
- **Advanced Filters**:
  - Type (multi-select)
  - Vendor/Source (multi-select)
  - Status (multi-select)
  - Owning Org Unit (multi-select)
  - Business Owner (user picker)
  - Technical Owner (user picker)
  - Risk Tier (multi-select)
  - Lifecycle Stage (multi-select)
  - Regulatory Applicability (multi-select)
  - Deployment Platform (multi-select)
  - Personal Data Used (Yes/No)
  - Environment (Dev/Test/Prod)

**Table Features**:
- **Column Customization**: Show/hide columns, reorder
- **Saved Views**: Save filter combinations
- **Bulk Actions**: Bulk edit, bulk export, bulk risk assessment
- **Export**: CSV, Excel, PDF with selected columns
- **Pagination**: 25/50/100 per page

##### Asset Details Page (Enhanced)

**Tab 1: Identity & Ownership**
- Asset ID (read-only)
- Display Name* (editable)
- Type* (dropdown: Model/App/Agent/Dataset/Prompt/Service)
- Owning Org Unit* (dropdown from AAD)
- Business Owner* (user picker from AAD)
- Technical Owner* (user picker from AAD)
- Vendor/Source* (dropdown: Internal/3P Vendor/OSS)
- Vendor Name/Product (text, conditional on 3P Vendor)
- Service Principal/App Registration ID (text, from AAD)
- Linked Enterprise App(s) (multi-select from AAD)

**Tab 2: Business Context**
- Use Case Name* (text)
- Business Purpose* (rich text editor)
- Business Processes Impacted (multi-select tags)
- Intended Users* (multi-select: Employees/Customers/Public)
- Geographies of Use (multi-select: regions/countries)
- Projected Value/KPI (number + unit, e.g., "$500K revenue" or "100 hours saved")

**Tab 3: Lifecycle & Deployment**
- Lifecycle Stage* (dropdown: Idea/Dev/Test/Pilot/Prod/Retired)
- First Deployment Date (date picker)
- Last Change Date (auto-updated, read-only)
- Environment(s) (multi-select: Dev/Test/Prod)
- Deployment Platform* (dropdown: Cloud/On-prem/SaaS/Edge)
- Integrations (multi-select tags: APIs/systems)
- Status Workflow (visual timeline showing stage gates)

**Tab 4: Data & Model Facts** (conditional on Type)
- Model Family/Architecture (dropdown: LLM/classifier/tree-based/vision/agent)
- Model Provider (dropdown: OpenAI/Anthropic/Azure OpenAI/custom)
- Version/Hash (text, versioned)
- Training Data Summary (rich text: sources, time range)
- Personal Data Used* (Yes/No toggle)
- Sensitive Categories (multi-select: Special category/children/biometrics)
- Inputs (rich text: prompts, telemetry)
- Outputs (rich text: decision, content, recommendation)
- Safety/Quality Evaluations Present (multi-select: bias/toxicity/robustness)

**Tab 5: Access & Security**
- **Azure AD Integration**:
  - AAD App Permissions (list from AAD: Graph scopes, custom roles)
  - Granted Admin Consents (list from AAD)
  - User/Group Assignments (list from AAD with count)
- **Network Security** (from Zscaler):
  - Network Egress Destinations/Domains (list with traffic volume)
  - Observed Traffic Volume/Patterns (chart showing trends)
- **Endpoint Security** (from EDR):
  - EDR Findings Linked (list: alerts, CVEs, tamper events)
  - Endpoint Coverage (percentage + chart)
- **Secrets Management**:
  - Secrets/API Keys Storage Location (dropdown: KV/Vault/Env)

**Tab 6: Compliance & Risk**
- **Regulatory**:
  - Regulatory Applicability (multi-select: EU AI Act category, sector rules)
- **Risk Scoring**:
  - Risk Tier (computed badge: Low/Med/High)
  - Inherent Risk Score (0-100, computed, with breakdown)
  - Residual Risk Score (0-100, computed, with breakdown)
  - Risk Calculation Breakdown (expandable):
    - Data sensitivity weight
    - User impact weight
    - Autonomy weight
    - Scale weight
- **Controls**:
  - Control Coverage (multi-select: explainability/human-in-the-loop/access control/monitoring)
  - Evidence Links (file upload + URL list: tests, eval reports, DPIA, sign-offs)

**Tab 7: Activity & History**
- Activity Timeline (chronological log of all changes)
- Related Risks (linked risk scenarios)
- Related Controls (linked NIST controls)
- Audit Log (who changed what, when)

##### Create/Edit Asset Form

**Wizard Flow** (7 steps):

**Step 1: Identity & Ownership** (Required)
- Display Name*
- Type*
- Owning Org Unit*
- Business Owner*
- Technical Owner*
- Vendor/Source*
- Vendor Name/Product (if 3P)

**Step 2: Business Context** (Required)
- Use Case Name*
- Business Purpose*
- Business Processes Impacted
- Intended Users*
- Geographies of Use
- Projected Value/KPI

**Step 3: Lifecycle & Deployment** (Required)
- Lifecycle Stage*
- First Deployment Date
- Environment(s)
- Deployment Platform*
- Integrations

**Step 4: Data & Model Facts** (Conditional on Type)
- Model Family/Architecture
- Model Provider
- Version/Hash
- Training Data Summary
- Personal Data Used*
- Sensitive Categories
- Inputs
- Outputs
- Safety/Quality Evaluations

**Step 5: Access & Security** (Optional, auto-populated from integrations)
- Service Principal/App Registration ID
- Linked Enterprise Apps
- Secrets Storage Location

**Step 6: Compliance & Risk** (Optional, some computed)
- Regulatory Applicability
- Control Coverage
- Evidence Links

**Step 7: Review & Submit**
- Summary of all entered data
- Risk score preview
- Validation errors (if any)
- Submit button

**Validation Rules**:
- Required fields must be filled
- Business Owner and Technical Owner must be valid AAD users
- If Personal Data Used = Yes, must select Sensitive Categories
- If Type = Model, must fill Model Facts
- If Vendor/Source = 3P Vendor, must fill Vendor Name/Product
- Geographies of Use required if Intended Users includes Customers or Public
- Evidence Links must be valid URLs or uploaded files

##### Discovery & Integration

**Manual Discovery**:
- "Add Asset" button → Opens wizard
- Quick Add (simplified form for rapid entry)
- Bulk Import (CSV/Excel with template)

**Automated Discovery** (Integration-based):
- **Azure AD Integration**:
  - Auto-discover Service Principals and App Registrations
  - Sync permissions, consents, user assignments
  - Update frequency: Daily
- **Zscaler Integration**:
  - Auto-discover network egress to AI service domains
  - Sync traffic patterns and volume
  - Update frequency: Hourly
- **EDR Integration**:
  - Auto-discover AI-related processes and findings
  - Sync alerts, CVEs, endpoint coverage
  - Update frequency: Real-time
- **CASB Integration** (Future):
  - Auto-discover SaaS AI tools
  - Sync usage and user activity

**Shadow AI Detection**:
- Automated flagging of assets discovered via integrations but not in inventory
- Alert notifications to IT Security and Risk teams
- Workflow: Shadow → Review → Sanctioned or Blocked

#### Data Model (Enhanced)

```python
class AIAsset(models.Model):
    """
    Comprehensive AI Asset model covering identity, ownership, business context,
    lifecycle, data facts, access/security, and compliance/risk.
    """
    
    # A) Identity & Ownership
    id = models.AutoField(primary_key=True)  # Asset ID (system)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=255)  # Business-friendly label
    asset_type = models.CharField(max_length=50, choices=[
        ('model', 'Model'),
        ('app', 'Application'),
        ('agent', 'Agent'),
        ('dataset', 'Dataset'),
        ('prompt', 'Prompt'),
        ('service', 'Service')
    ])
    owning_org_unit = models.CharField(max_length=255)  # From Questionnaire/AAD
    business_owner = models.ForeignKey(User, related_name='owned_assets', on_delete=models.SET_NULL, null=True)
    technical_owner = models.ForeignKey(User, related_name='managed_assets', on_delete=models.SET_NULL, null=True)
    vendor_source = models.CharField(max_length=50, choices=[
        ('internal', 'Internal'),
        ('3p_vendor', 'Third-Party Vendor'),
        ('oss', 'Open Source Software')
    ])
    vendor_name_product = models.CharField(max_length=255, blank=True)  # If 3P
    service_principal_id = models.CharField(max_length=255, blank=True)  # From AAD
    linked_enterprise_apps = models.JSONField(default=list, blank=True)  # From AAD
    
    # B) Business Context
    use_case_name = models.CharField(max_length=255)
    business_purpose = models.TextField()
    business_processes_impacted = models.JSONField(default=list, blank=True)
    intended_users = models.JSONField(default=list)  # ['employees', 'customers', 'public']
    geographies_of_use = models.JSONField(default=list, blank=True)
    projected_value_kpi = models.CharField(max_length=255, blank=True)
    
    # C) Lifecycle & Deployment
    lifecycle_stage = models.CharField(max_length=50, choices=[
        ('idea', 'Idea'),
        ('dev', 'Development'),
        ('test', 'Testing'),
        ('pilot', 'Pilot'),
        ('prod', 'Production'),
        ('retired', 'Retired')
    ])
    first_deployment_date = models.DateField(null=True, blank=True)
    last_change_date = models.DateTimeField(auto_now=True)
    environments = models.JSONField(default=list)  # ['dev', 'test', 'prod']
    deployment_platform = models.CharField(max_length=50, choices=[
        ('cloud', 'Cloud'),
        ('on_prem', 'On-Premises'),
        ('saas', 'SaaS'),
        ('edge', 'Edge')
    ])
    integrations = models.JSONField(default=list, blank=True)  # APIs/systems
    
    # D) Data & Model Facts (model/prompt/dataset specific)
    model_family_architecture = models.CharField(max_length=100, blank=True, choices=[
        ('llm', 'Large Language Model'),
        ('classifier', 'Classifier'),
        ('tree_based', 'Tree-Based'),
        ('vision', 'Computer Vision'),
        ('agent', 'Agent')
    ])
    model_provider = models.CharField(max_length=100, blank=True)
    version_hash = models.CharField(max_length=255, blank=True)
    training_data_summary = models.TextField(blank=True)
    personal_data_used = models.BooleanField(default=False)
    sensitive_categories = models.JSONField(default=list, blank=True)  # ['special_category', 'children', 'biometrics']
    inputs_description = models.TextField(blank=True)
    outputs_description = models.TextField(blank=True)
    safety_quality_evaluations = models.JSONField(default=list, blank=True)  # ['bias', 'toxicity', 'robustness']
    
    # E) Access & Security (via Azure AD, Zscaler, EDR)
    aad_app_permissions = models.JSONField(default=list, blank=True)  # From AAD
    granted_admin_consents = models.JSONField(default=list, blank=True)  # From AAD
    user_group_assignments = models.JSONField(default=list, blank=True)  # From AAD
    network_egress_destinations = models.JSONField(default=list, blank=True)  # From Zscaler
    observed_traffic_volume = models.JSONField(default=dict, blank=True)  # Metrics from Zscaler
    edr_findings_linked = models.JSONField(default=list, blank=True)  # From EDR
    endpoint_coverage_percent = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # From EDR
    secrets_storage_location = models.CharField(max_length=50, blank=True, choices=[
        ('kv', 'Key Vault'),
        ('vault', 'HashiCorp Vault'),
        ('env', 'Environment Variables')
    ])
    
    # F) Compliance & Risk
    regulatory_applicability = models.JSONField(default=list, blank=True)  # ['eu_ai_act_high_risk', 'hipaa', 'gdpr']
    risk_tier = models.CharField(max_length=20, choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High')
    ], blank=True)  # Computed
    inherent_risk_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # 0-100, computed
    residual_risk_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # 0-100, computed
    control_coverage = models.JSONField(default=list, blank=True)  # ['explainability', 'human_in_loop', 'access_control', 'monitoring']
    evidence_links = models.JSONField(default=list, blank=True)  # URLs or file references
    
    # Legacy fields (for backward compatibility)
    name = models.CharField(max_length=255)  # Alias for display_name
    vendor = models.CharField(max_length=255, blank=True)  # Alias for vendor_name_product
    category = models.CharField(max_length=50, blank=True)  # Deprecated, use asset_type
    status = models.CharField(max_length=50, choices=[
        ('sanctioned', 'Sanctioned'),
        ('shadow', 'Shadow'),
        ('unknown', 'Unknown')
    ])
    domain = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    first_seen = models.DateField(auto_now_add=True)
    last_seen = models.DateField(auto_now=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, related_name='created_assets', on_delete=models.SET_NULL, null=True)
    
    class Meta:
        db_table = 'visibility_aiasset'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['tenant', 'asset_type']),
            models.Index(fields=['tenant', 'lifecycle_stage']),
            models.Index(fields=['tenant', 'risk_tier']),
            models.Index(fields=['tenant', 'status']),
        ]
    
    def calculate_inherent_risk_score(self):
        """
        Calculate inherent risk score based on:
        - Data sensitivity (personal_data_used, sensitive_categories)
        - User impact (intended_users, geographies_of_use)
        - Autonomy (asset_type, outputs_description)
        - Scale (user_group_assignments count, observed_traffic_volume)
        """
        score = 0
        
        # Data sensitivity (0-30 points)
        if self.personal_data_used:
            score += 15
        if self.sensitive_categories:
            score += len(self.sensitive_categories) * 5  # Max 15
        
        # User impact (0-30 points)
        if 'public' in self.intended_users:
            score += 15
        elif 'customers' in self.intended_users:
            score += 10
        elif 'employees' in self.intended_users:
            score += 5
        if len(self.geographies_of_use) > 5:
            score += 15
        elif len(self.geographies_of_use) > 2:
            score += 10
        elif len(self.geographies_of_use) > 0:
            score += 5
        
        # Autonomy (0-20 points)
        if self.asset_type in ['agent', 'model']:
            score += 10
        if 'decision' in self.outputs_description.lower():
            score += 10
        
        # Scale (0-20 points)
        user_count = len(self.user_group_assignments)
        if user_count > 1000:
            score += 20
        elif user_count > 100:
            score += 15
        elif user_count > 10:
            score += 10
        elif user_count > 0:
            score += 5
        
        return min(score, 100)
    
    def calculate_residual_risk_score(self):
        """
        Calculate residual risk score after controls:
        Residual = Inherent - (Control Coverage Impact)
        """
        inherent = self.inherent_risk_score or self.calculate_inherent_risk_score()
        
        # Control coverage impact (0-50 points reduction)
        control_impact = 0
        if 'explainability' in self.control_coverage:
            control_impact += 10
        if 'human_in_loop' in self.control_coverage:
            control_impact += 15
        if 'access_control' in self.control_coverage:
            control_impact += 15
        if 'monitoring' in self.control_coverage:
            control_impact += 10
        
        residual = max(inherent - control_impact, 0)
        return residual
    
    def determine_risk_tier(self):
        """
        Determine risk tier based on residual risk score:
        - Low: 0-33
        - Medium: 34-66
        - High: 67-100
        """
        residual = self.residual_risk_score or self.calculate_residual_risk_score()
        if residual >= 67:
            return 'high'
        elif residual >= 34:
            return 'medium'
        else:
            return 'low'
    
    def save(self, *args, **kwargs):
        # Auto-calculate risk scores
        self.inherent_risk_score = self.calculate_inherent_risk_score()
        self.residual_risk_score = self.calculate_residual_risk_score()
        self.risk_tier = self.determine_risk_tier()
        
        # Sync name with display_name for backward compatibility
        if not self.name:
            self.name = self.display_name
        
        super().save(*args, **kwargs)
```

#### Business Rules (Enhanced)

1. **Risk Scoring**:
   - Inherent Risk Score auto-calculated on save based on data sensitivity, user impact, autonomy, and scale
   - Residual Risk Score = Inherent - Control Coverage Impact
   - Risk Tier determined from Residual Risk Score

2. **Ownership Requirements**:
   - Business Owner and Technical Owner must be assigned before moving to Pilot or Prod
   - Owning Org Unit must be valid AAD organizational unit

3. **Personal Data Handling**:
   - If Personal Data Used = Yes, must document Sensitive Categories
   - Must link to DPIA evidence if processing special category data

4. **Lifecycle Gates**:
   - Idea → Dev: No requirements
   - Dev → Test: Must have Technical Owner
   - Test → Pilot: Must have Business Owner, Technical Owner, and Risk Assessment
   - Pilot → Prod: Must have approved Control Coverage and Evidence Links
   - Prod → Retired: Must document retirement reason

5. **Shadow AI Workflow**:
   - Auto-discovered assets start as Shadow
   - Shadow → Review (assign owners, document purpose)
   - Review → Sanctioned (approved) or Blocked (rejected)

6. **Integration Sync**:
   - AAD data syncs daily
   - Zscaler data syncs hourly
   - EDR data syncs real-time
   - Conflicts resolved by "last write wins" with audit log

7. **Regulatory Triggers**:
   - EU AI Act High-Risk: If intended_users includes 'public' AND (asset_type = 'model' OR outputs_description contains 'decision')
   - GDPR: If personal_data_used = True AND geographies_of_use includes EU countries
   - HIPAA: If sensitive_categories includes 'phi'

#### API Endpoints

```
GET    /api/assets/                    # List all assets with filters
POST   /api/assets/                    # Create new asset
GET    /api/assets/:id/                # Get asset details
PUT    /api/assets/:id/                # Update asset
DELETE /api/assets/:id/                # Delete asset (soft delete)
GET    /api/assets/:id/risk-score/     # Get risk score breakdown
POST   /api/assets/:id/calculate-risk/ # Recalculate risk scores
GET    /api/assets/shadow/             # List shadow AI assets
POST   /api/assets/:id/approve/        # Approve shadow asset
POST   /api/assets/:id/block/          # Block shadow asset
GET    /api/assets/export/             # Export assets (CSV/Excel/PDF)
POST   /api/assets/bulk-import/        # Bulk import from CSV
GET    /api/assets/integrations/sync/  # Trigger integration sync
GET    /api/assets/statistics/         # Get asset statistics
```

#### UI Views Required

1. **Assets List View** (Enhanced Table)
2. **Asset Details Page** (7 tabs)
3. **Create Asset Wizard** (7 steps)
4. **Edit Asset Form** (inline or wizard)
5. **Shadow AI Dashboard** (dedicated view for shadow assets)
6. **Risk Heatmap** (visual grid of assets by risk tier and lifecycle stage)
7. **Compliance Dashboard** (assets by regulatory applicability)
8. **Integration Status Page** (AAD, Zscaler, EDR sync status)

#### Acceptance Criteria (Enhanced)

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

#### Performance Requirements

- Load 1000 assets in < 2 seconds
- Search responds in < 300ms
- Risk score calculation < 100ms per asset
- Bulk import processes 1000 assets in < 30 seconds
- Integration sync (AAD) completes in < 5 minutes
- Integration sync (Zscaler) completes in < 2 minutes
- Integration sync (EDR) real-time (< 10 seconds)

#### Future Enhancements

- [ ] AI-powered risk scoring (ML model)
- [ ] Automated control recommendations based on risk profile
- [ ] Integration with ServiceNow for lifecycle workflow
- [ ] Integration with Credo.ai for risk-value prioritization
- [ ] Integration with OneTrust for privacy risk attributes
- [ ] Integration with Fiddler AI for model monitoring
- [ ] Integration with IBM AI Factsheets for versioned governance
- [ ] Asset dependency graph visualization
- [ ] Cost tracking and TCO analysis
- [ ] Usage analytics and adoption metrics
- [ ] Automated DPIA generation
- [ ] Regulatory change impact analysis
- [ ] Asset portfolio optimization recommendations

---

## Summary of Changes

### Added to PRD:
1. **46 new fields** across 6 categories (A-F)
2. **Enhanced data model** with comprehensive schema
3. **Risk scoring algorithms** (inherent, residual, tier)
4. **Integration specifications** (AAD, Zscaler, EDR)
5. **7-step wizard** for asset creation
6. **7-tab detail page** for comprehensive view
7. **Enhanced business rules** (lifecycle gates, regulatory triggers)
8. **API endpoints** for all operations
9. **8 UI views** required
10. **Performance requirements** for integrations

### Maintained from Original PRD:
1. Core table view with search and filters
2. Asset discovery workflow
3. Shadow AI detection
4. Status workflow (Sanctioned/Shadow/Unknown)
5. Basic CRUD operations

### Alignment with Industry Platforms:
- **OneTrust**: Risk levels, inherent/aggregate scores, privacy risk attributes
- **Credo.ai**: Risk ↔ value prioritization, projected KPIs
- **ServiceNow**: Lifecycle status modeling
- **IBM**: AI Factsheets concept (versioned governance, evidence links)
- **Fiddler AI**: Safety/quality evaluations integration
- **MITRE ATLAS**: Threat pattern integration (future)

---

**This enhanced PRD section provides a comprehensive, enterprise-grade AI asset visibility solution aligned with industry best practices and regulatory requirements.**
