# AIKovrr - Product Requirements Document (PRD)

**Version**: 1.0  
**Last Updated**: November 4, 2025  
**Owner**: Kovrr Product Team

---

## 1. Product Overview

AIKovrr is an AI Governance Platform that enables organizations to discover, assess, and manage AI-related risks while maintaining compliance with regulatory frameworks (NIST AI RMF, ISO 42001, EU AI Act).

### Key Objectives
- Provide complete visibility into AI asset usage (sanctioned and shadow AI)
- Enable comprehensive risk assessment and quantification
- Support compliance readiness evaluation and maturity tracking
- Generate actionable plans for control implementation
- Monitor ongoing governance and policy enforcement

---

## 2. Core Components

### 2.1 Hero Dashboard
**Status**: ✅ Implemented  
**Route**: `/dashboard`  
**User Personas**: Executives, Risk Managers, Compliance Officers

#### Purpose
Provide a comprehensive, at-a-glance view of the organization's AI governance posture, enabling quick decision-making and identifying areas requiring immediate attention.

#### User Stories
1. **As an Executive**, I want to see high-level metrics on one screen so that I can quickly understand our AI risk posture without diving into details.
2. **As a Risk Manager**, I want to see active risk scenarios and alerts so that I can prioritize my daily work.
3. **As a Compliance Officer**, I want to monitor our compliance readiness score so that I can track progress toward regulatory requirements.

#### Features

##### Metrics Cards (4 cards in grid layout)
1. **AI Assets Card**
   - **Display**: Total count with breakdown (Sanctioned vs Shadow)
   - **Visual**: Icon with count, percentage breakdown
   - **Click Action**: Navigate to Assets Visibility page
   - **Color Coding**: 
     - Green if Shadow AI < 10%
     - Yellow if Shadow AI 10-30%
     - Red if Shadow AI > 30%

2. **Risk Scenarios Card**
   - **Display**: Total active risks with priority breakdown
   - **Visual**: Count by priority (Critical/High/Medium/Low)
   - **Click Action**: Navigate to Risk Register
   - **Alert**: Red indicator if any Critical risks exist

3. **Compliance Readiness Card**
   - **Display**: Overall readiness score (0-100)
   - **Visual**: Circular progress indicator
   - **Trend**: Up/down arrow showing change from last assessment
   - **Click Action**: Navigate to Compliance Readiness

4. **Open Alerts Card**
   - **Display**: Count of unresolved alerts
   - **Visual**: Severity breakdown
   - **Click Action**: Navigate to Governance & Monitoring
   - **Real-time**: Updates when new alerts created

##### Recent Activity Feed
- **Display**: Last 10 activities across all modules
- **Format**: 
  - Icon (based on activity type)
  - Description (e.g., "John added AI Asset: ChatGPT")
  - Timestamp (relative time, e.g., "2 hours ago")
  - User avatar
- **Activities Tracked**:
  - Asset added/modified
  - Risk scenario created/updated
  - Assessment completed
  - Alert triggered
  - Control status changed
- **Interaction**: Click to view related item
- **Refresh**: Auto-refresh every 30 seconds

##### Risk Distribution Visualization
- **Chart Type**: Horizontal bar chart or pie chart
- **Data**: Risks grouped by category
- **Categories**: Data Privacy, Model Bias, Security, Compliance, Operational
- **Display**: Count and percentage per category
- **Color Coding**: Consistent with risk priority colors
- **Interaction**: Click category to filter Risk Register

##### Quick Actions Section
- **Buttons**:
  1. "Add AI Asset" → Opens asset creation form
  2. "Create Risk Scenario" → Opens risk creation form
  3. "Start Assessment" → Opens compliance assessment wizard
- **Position**: Top-right or bottom of dashboard
- **Permissions**: Only show actions user has permission to perform

#### Layout Specifications
```
┌─────────────────────────────────────────────────────┐
│  Hero Dashboard                    [Quick Actions]  │
├─────────────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐           │
│  │Assets│  │Risks │  │Compli│  │Alerts│           │
│  │ 45   │  │ 12   │  │ 67%  │  │  3   │           │
│  └──────┘  └──────┘  └──────┘  └──────┘           │
├─────────────────────────────────────────────────────┤
│  Recent Activity          │  Risk Distribution     │
│  • John added...          │  ┌──────────────┐      │
│  • Sarah updated...       │  │ Data Privacy │      │
│  • System alert...        │  │ Model Bias   │      │
│                           │  │ Security     │      │
└─────────────────────────────────────────────────────┘
```

#### Data Requirements
- **Aggregations**:
  - `COUNT(ai_assets) GROUP BY status`
  - `COUNT(risk_scenarios) WHERE status != 'Closed' GROUP BY priority`
  - `AVG(compliance_readiness.readiness_score)`
  - `COUNT(alerts) WHERE status = 'Open'`
- **Recent Activity**: Last 10 from `audit_log` table, ordered by timestamp DESC
- **Risk Distribution**: `COUNT(risk_scenarios) GROUP BY category`

#### Acceptance Criteria
- ✅ Dashboard loads in < 2 seconds
- ✅ All metrics display accurate real-time data
- ✅ Cards are clickable and navigate to correct pages
- ✅ Recent activity shows last 10 items with correct formatting
- ✅ Risk distribution chart displays all categories
- ✅ Quick action buttons are visible and functional
- ✅ Dashboard is responsive on tablet and desktop
- ✅ Empty states show helpful messages when no data exists

#### Error Handling
- **No Data**: Show "0" with message "No [items] found. Get started by..."
- **API Error**: Show error message with retry button
- **Loading State**: Show skeleton loaders for each section

#### Future Enhancements
- [ ] Real-time data refresh via WebSocket
- [ ] Customizable dashboard widgets (drag & drop)
- [ ] Export dashboard as PDF report
- [ ] Date range filter for metrics
- [ ] Comparison view (current vs previous period)
- [ ] Drill-down capability on charts
- [ ] Personalized views per user role

---

### 2.2 Assets Visibility (Third Party Inside)
**Status**: 🔄 Enhanced with Comprehensive Data Model  
**Route**: `/assets`  
**User Personas**: IT Security, Risk Managers, Compliance Officers, Business Owners, Technical Owners  
**Version**: v2.0  
**Last Updated**: November 5, 2025

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
- **Search Functionality**:
  - **Fields**: Name, Vendor, Domain
  - **Type**: Real-time search (updates as user types)
  - **Behavior**: Case-insensitive, partial match
  - **Position**: Top of table with search icon

- **Filter Controls**:
  - **Status Filter**: Dropdown with options
    - All Statuses (default)
    - Sanctioned (approved AI)
    - Shadow (unapproved/discovered AI)
    - Unknown (pending classification)
  - **Category Filter**: Multi-select dropdown
    - GenAI (e.g., ChatGPT, Claude)
    - ML Model (custom models)
    - Automation (RPA tools)
    - Data Analytics
    - Code Generation
    - All Categories (default)
  - **Vendor Filter**: Searchable dropdown of all vendors

- **Table Columns**:
  1. **Asset Name** (sortable)
     - Primary identifier
     - Bold text
     - Click to view details (future)
  
  2. **Vendor** (sortable)
     - Company providing the AI service
     - Display logo icon if available
  
  3. **Category** (sortable)
     - Type of AI tool
     - Badge with category-specific color
  
  4. **Status** (sortable, filterable)
     - Visual badge with color coding:
       - Sanctioned: Green badge
       - Shadow: Orange/Yellow badge
       - Unknown: Gray badge
  
  5. **First Seen** (sortable)
     - Date format: MM/DD/YYYY
     - Tooltip shows exact timestamp
     - Helps track shadow AI discovery
  
  6. **Last Seen** (sortable)
     - Date format: MM/DD/YYYY
     - Indicates recent activity
     - Red indicator if > 30 days ago

  7. **Actions** (non-sortable)
     - Edit icon button
     - Delete icon button (with confirmation)
     - View details icon (future)

- **Table Behavior**:
  - **Sorting**: Click column header to sort (asc/desc)
  - **Pagination**: 50 items per page
  - **Row Hover**: Highlight on hover
  - **Empty State**: "No assets found. Click 'Discover Assets' to get started."
  - **Loading State**: Skeleton rows while fetching

##### Discovery Actions
- **"Discover Assets" Button** (Primary action, top-right)
  - Opens modal/form for manual asset addition
  - Fields:
    - Asset Name* (required)
    - Vendor* (required)
    - Category* (dropdown, required)
    - Status* (dropdown, required)
    - Domain (optional, e.g., marketing.company.com)
    - Description (optional, text area)
    - Risk Profile (optional, dropdown)
  - Validation: Required fields must be filled
  - Success: Show toast notification, refresh table

- **Bulk Import** (Future)
  - CSV upload functionality
  - Template download link
  - Field mapping interface
  - Validation and error reporting

- **Integration Discovery** (Future)
  - Auto-discovery via CASB integration
  - Scheduled scans
  - Conflict resolution (if asset already exists)

#### Layout Specifications
```
┌─────────────────────────────────────────────────────┐
│  Assets Visibility (Third Party Inside)             │
│  Discover and inventory all AI tools...             │
│                                    [Discover Assets] │
├─────────────────────────────────────────────────────┤
│  [🔍 Search...]  [Status ▼] [Category ▼] [Vendor ▼]│
├─────────────────────────────────────────────────────┤
│  Name      │ Vendor  │ Category │ Status │ First...│
│  ─────────────────────────────────────────────────  │
│  ChatGPT   │ OpenAI  │ GenAI    │🟢Sanct │ 01/15/24│
│  Copilot   │ GitHub  │ Code Gen │🟢Sanct │ 02/01/24│
│  Claude    │ Anthropic│ GenAI   │🟡Shadow│ 03/10/24│
│  ...                                                 │
└─────────────────────────────────────────────────────┘
```

#### Data Model (Aligned with Risk Register, AI Assurance Plan, Compliance Readiness)

```python
AIAsset:
  # Core Identity
  - id: integer (PK)
  - tenant: FK Tenant
  - name: string (display name, business-friendly)
  - asset_type: enum (model, app, agent, dataset, service)
  
  # Ownership (aligned with RiskScenario.owner, ControlAssessment.owner)
  - owner: FK User (business owner)
  - technical_owner: FK User
  - owning_org_unit: string
  
  # Vendor & Source
  - vendor_source: enum (internal, third_party, open_source)
  - vendor_name: string
  
  # Status (aligned with RiskScenario.status, ControlAssessment.status)
  - status: enum (sanctioned, shadow, under_review, blocked, retired)
  
  # Business Context
  - use_case: string
  - description: text (aligned with RiskScenario.description)
  - intended_users: JSON ['employees', 'customers', 'public']
  - projected_value: string (KPI/ROI)
  
  # Lifecycle
  - lifecycle_stage: enum (idea, development, testing, pilot, production, retired)
  - deployment_platform: enum (cloud, on_premises, saas, hybrid)
  - environment: JSON ['dev', 'test', 'prod']
  
  # Risk Scoring (aligned with RiskScenario.priority, ControlAssessment.priority_score)
  - risk_tier: enum (low, medium, high, critical)  # Aligned with RiskScenario.priority
  - risk_score: decimal (0-100)  # Aligned with ControlAssessment.priority_score
  - inherent_risk_score: decimal (0-100)  # Before controls
  - residual_risk_score: decimal (0-100)  # After controls
  
  # Data Sensitivity
  - personal_data_used: boolean
  - sensitive_categories: JSON ['special_category', 'children', 'biometrics', 'health', 'financial']
  
  # Compliance (aligned with ComplianceReadiness)
  - regulatory_applicability: JSON ['eu_ai_act_high_risk', 'gdpr', 'hipaa', 'ccpa']
  - control_coverage: JSON ['explainability', 'human_oversight', 'access_control', 'monitoring']
  
  # Model Specifics (for asset_type='model')
  - model_provider: string (OpenAI, Anthropic, Azure OpenAI, Internal)
  - model_version: string
  
  # Integration Data (auto-populated from AAD, Zscaler, EDR)
  - service_principal_id: string (from AAD)
  - aad_permissions: JSON (from AAD)
  - user_assignments: JSON (from AAD)
  - network_destinations: JSON (from Zscaler)
  
  # Dates (aligned with all modules)
  - first_seen: date (discovery date)
  - last_seen: date (last activity)
  - first_deployment_date: date
  - created_at: timestamp
  - updated_at: timestamp
  
  # Cross-Module Relationships
  - related_risks: M2M RiskScenario
  - related_controls: M2M Control
  - compliance_assessments: M2M ComplianceReadiness

AssetEvidence:
  - asset: FK AIAsset
  - evidence_type: enum (dpia, risk_assessment, approval, audit_report, test_results)
  - title: string
  - file_url: URL
  - uploaded_file: file
  - uploaded_by: FK User
  - uploaded_at: timestamp

AssetNote:
  - asset: FK AIAsset
  - note: text
  - created_by: FK User
  - created_at: timestamp

AssetIntegration:
  - asset: FK AIAsset
  - integration_type: enum (aad, zscaler, edr, casb)
  - last_sync: timestamp
  - sync_status: enum (success, failed, pending)
  - sync_details: JSON
```

**Risk Scoring Algorithm** (aligned with ControlAssessment.priority_score):
```
Risk Score (0-100) = 
  Data Sensitivity (0-30) +
  User Impact (0-30) +
  Lifecycle Stage (0-20) +
  Vendor Risk (0-20) -
  Control Coverage (0-50 reduction)

Risk Tier:
  - Critical: 75-100
  - High: 50-74
  - Medium: 25-49
  - Low: 0-24
```

#### Business Rules
1. **Shadow AI Detection**: Any asset with status='Shadow' should trigger an alert
2. **Duplicate Prevention**: Prevent duplicate assets (same name + vendor + tenant)
3. **Last Seen Update**: Automatically update when asset activity detected
4. **Status Workflow**: 
   - Unknown → (review) → Sanctioned or Shadow
   - Shadow → (approval) → Sanctioned
5. **Deletion**: Soft delete only (mark as inactive, don't remove from DB)

#### Acceptance Criteria
- ✅ Table displays all assets with correct data
- ✅ Search filters assets in real-time
- ✅ Status filter works correctly
- ✅ Category filter supports multiple selections
- ✅ Sorting works on all sortable columns
- ✅ "Discover Assets" button opens form
- ✅ Form validation prevents invalid submissions
- ✅ New assets appear in table immediately after creation
- ✅ Edit and delete actions work correctly
- ✅ Empty state shows when no assets exist
- ✅ Shadow AI assets are visually distinct

#### Error Handling
- **API Failure**: Show error toast, allow retry
- **Validation Error**: Highlight invalid fields with error messages
- **Duplicate Asset**: Show warning "Asset already exists. View existing?"
- **Delete Confirmation**: "Are you sure? This action cannot be undone."

#### Performance Requirements
- Table loads in < 1 second for up to 1000 assets
- Search responds in < 200ms
- Pagination for large datasets (>100 assets)

#### Future Enhancements
- [ ] Asset details page with:
  - Usage analytics (who, when, how often)
  - Associated risks
  - Compliance status
  - Activity timeline
- [ ] Risk scoring per asset (auto-calculated)
- [ ] Integration with CASB for auto-discovery
- [ ] Asset lifecycle management (approval workflow)
- [ ] Usage metrics and trends (charts)
- [ ] Export to CSV/PDF
- [ ] Bulk status update
- [ ] Asset tagging system
- [ ] Relationship mapping (which users/departments use which assets)

---

### 2.3 Risk Register
**Status**: ✅ Implemented  
**Route**: `/risk-register`  
**User Personas**: Risk Managers, Compliance Officers, Business Unit Leaders

#### Purpose
Centralized repository for identifying, documenting, and managing AI-related risk scenarios with quantitative assessments to support informed decision-making and mitigation planning.

#### User Stories
1. **As a Risk Manager**, I want to document all AI-related risks so that I can track and manage them systematically.
2. **As a Business Unit Leader**, I want to see risks prioritized by severity so that I can allocate resources appropriately.
3. **As a Compliance Officer**, I want to link risks to controls so that I can demonstrate risk mitigation efforts.

#### Features

##### Risk List View (Main Table)
- **Search Functionality**:
  - **Fields**: Risk name, description
  - **Type**: Real-time search
  - **Position**: Top-left of table

- **Filter Controls**:
  - **Priority Filter**: Multi-select
    - Critical (red)
    - High (orange)
    - Medium (yellow)
    - Low (green)
  - **Status Filter**: Dropdown
    - Identified (new risk)
    - Analyzing (under assessment)
    - Mitigating (actions in progress)
    - Monitoring (controlled)
    - Closed (resolved)
  - **Likelihood Filter**: Range selector
  - **Impact Filter**: Range selector
  - **Owner Filter**: User dropdown

- **Table Columns**:
  1. **Risk Name** (sortable)
     - Primary identifier
     - Click to open details modal
     - Bold text
  
  2. **Priority** (sortable, filterable)
     - Auto-calculated from Likelihood × Impact
     - Color-coded badge:
       - Critical: Red
       - High: Orange
       - Medium: Yellow
       - Low: Green
  
  3. **Likelihood** (sortable)
     - 5-point scale:
       - Rare (1)
       - Unlikely (2)
       - Possible (3)
       - Likely (4)
       - Almost Certain (5)
     - Display as text with icon
  
  4. **Impact** (sortable)
     - 5-point scale:
       - Negligible (1)
       - Minor (2)
       - Moderate (3)
       - Major (4)
       - Severe (5)
     - Display as text with icon
  
  5. **Status** (sortable, filterable)
     - Workflow badge with color
     - Shows current stage
  
  6. **Owner** (sortable, filterable)
     - Assigned risk owner
     - Display name with avatar
     - Unassigned shown as "—"
  
  7. **Last Updated** (sortable)
     - Date of last modification
     - Relative time on hover

  8. **Actions**
     - Edit button
     - Delete button (with confirmation)
     - View details button

- **Table Features**:
  - **Bulk Actions**: Select multiple risks for bulk status update
  - **Export**: Export filtered view to CSV
  - **Sorting**: Multi-column sorting
  - **Pagination**: 25 risks per page

##### Create/Edit Risk Form
- **Modal Dialog** with tabs:
  
  **Tab 1: Basic Information**
  - Risk Name* (text, max 255 chars)
  - Description* (rich text editor, supports formatting)
  - Category* (multi-select):
    - Data Privacy
    - Model Bias
    - Security
    - Compliance
    - Operational
    - Reputational
  - Owner* (user dropdown)
  - Status* (dropdown)
  
  **Tab 2: Assessment**
  - Likelihood* (5-point scale with descriptions)
  - Impact* (5-point scale with descriptions)
  - Priority (auto-calculated, read-only)
  - Annual Likelihood (percentage, 0-100%)
  - Peer Rate (percentage, optional)
  
  **Tab 3: Financial Impact**
  - Financial Loss Min ($, optional)
  - Financial Loss Max ($, optional)
  - Expected Annual Loss (auto-calculated)
  - Mitigation Cost ($, optional)
  - PII Exposure (number of records)
  - PCI Exposure (number of records)
  - PHI Exposure (number of records)
  
  **Tab 4: Response Plan**
  - Response Strategy* (dropdown):
    - Mitigate (reduce risk)
    - Accept (acknowledge and monitor)
    - Avoid (eliminate activity)
    - Transfer (insurance/outsource)
  - Mitigation Actions (text area)
  - Review Date (date picker)
  - Ticket Link (URL, optional)

- **Validation**:
  - Required fields must be filled
  - Financial Min < Max
  - Dates must be future dates
  - URL format validation

- **Actions**:
  - Save & Close
  - Save & Add Another
  - Cancel (with unsaved changes warning)

##### Risk Details View (Future)
- Full risk information display
- Linked controls
- Mitigation history
- Notes/comments thread
- Activity timeline
- Related assets
- Financial calculations breakdown

#### Layout Specifications
```
┌─────────────────────────────────────────────────────┐
│  Risk Register                    [+ Create Risk]   │
├─────────────────────────────────────────────────────┤
│  [🔍 Search] [Priority▼] [Status▼] [Owner▼] [Export]│
├─────────────────────────────────────────────────────┤
│  Name          │Pri│Like│Imp│Status  │Owner │Last..│
│  ──────────────────────────────────────────────────  │
│  Data Leakage  │🔴H│ 4  │ 5 │Mitigat │John  │2d ago│
│  Model Bias    │🟠M│ 3  │ 4 │Analyzin│Sarah │1w ago│
│  ...                                                 │
└─────────────────────────────────────────────────────┘
```

#### Business Rules
1. **Priority Calculation**: 
   ```
   Score = Likelihood × Impact
   Critical: Score >= 20
   High: Score 15-19
   Medium: Score 8-14
   Low: Score < 8
   ```

2. **Status Workflow**:
   - Identified → Analyzing → Mitigating → Monitoring → Closed
   - Can skip stages but not go backwards (except reopen)

3. **Expected Annual Loss**:
   ```
   EAL = Annual Likelihood × ((Min Loss + Max Loss) / 2)
   ```

4. **Ownership**: Every risk must have an owner before moving to "Mitigating"

5. **Review Dates**: Automatically set based on priority:
   - Critical: 30 days
   - High: 60 days
   - Medium: 90 days
   - Low: 180 days

#### Acceptance Criteria
- ✅ Table displays all risks with correct data
- ✅ Search and filters work correctly
- ✅ Priority is auto-calculated and color-coded
- ✅ Create risk form validates all required fields
- ✅ Edit preserves existing data
- ✅ Delete requires confirmation
- ✅ Status workflow is enforced
- ✅ Financial calculations are accurate
- ✅ Export generates valid CSV
- ✅ Bulk actions work on selected risks

#### Error Handling
- **Validation Errors**: Highlight fields with specific error messages
- **Save Failure**: Show error, preserve form data, allow retry
- **Delete Failure**: Show error message
- **Concurrent Edit**: Warn if risk was modified by another user

#### Performance Requirements
- Load 100 risks in < 1 second
- Search responds in < 300ms
- Form saves in < 500ms

#### Future Enhancements
- [ ] Risk details page/modal
- [ ] Risk matrix visualization (2D grid)
- [ ] Risk heat map
- [ ] Automated risk scoring based on asset data
- [ ] Risk trend analysis over time
- [ ] Link risks to specific AI assets
- [ ] Mitigation task tracking
- [ ] Risk appetite threshold indicators
- [ ] Monte Carlo simulation for financial impact
- [ ] Integration with ticketing systems (Jira, ServiceNow)
- [ ] Email notifications on status changes
- [ ] Risk report generation (PDF)
- [ ] Comments/discussion thread per risk
- [ ] File attachments (evidence, reports)

#### Data Model
```
RiskScenario:
  - name: string
  - description: text
  - likelihood: enum (Rare, Unlikely, Possible, Likely, Almost Certain)
  - impact: enum (Negligible, Minor, Moderate, Major, Severe)
  - priority: enum (Low, Medium, High, Critical)
  - status: enum (Identified, Analyzing, Mitigating, Monitoring, Closed)
  - response_plan: enum (Mitigate, Accept, Avoid, Transfer)
  - financial_loss_min: decimal
  - financial_loss_max: decimal
  - annual_likelihood: decimal
  - mitigation_cost: decimal
  - owner: FK User
  - tenant: FK
```

#### Future Enhancements
- [ ] Risk details modal/page
- [ ] Risk matrix visualization
- [ ] Automated risk scoring
- [ ] Risk trend analysis
- [ ] Link risks to assets
- [ ] Mitigation tracking

---

### 2.4 Compliance Readiness
**Status**: ✅ Implemented  
**Route**: `/compliance-readiness`

#### Description
High-level governance and maturity self-evaluation aligned to frameworks (NIST AI RMF, ISO 42001, EU AI Act).

#### Features
- **Readiness Score Dashboard**:
  - Overall readiness score (0-100)
  - Current maturity level (Initial → Optimizing)
  - Frameworks assessed count
- **Framework Assessments**:
  - Per-framework maturity breakdown
  - Domain-level scoring (e.g., Governance, Map, Measure, Manage)
  - Progress bars with color coding
  - Key recommendations
- **Maturity Levels Guide**:
  - Visual representation of 5 maturity levels
  - Descriptions for each level

#### Data Model
```
ComplianceReadiness:
  - tenant: FK
  - framework: FK
  - readiness_score: decimal (0-100)
  - maturity_level: enum (Initial, Developing, Defined, Managed, Optimizing)
  - assessment_date: date
  - assessed_by: FK User
  - notes: text

MaturityAssessment:
  - compliance_readiness: FK
  - domain: string (e.g., "Governance", "Risk Management")
  - score: decimal (0-100)
  - strengths: text
  - weaknesses: text
  - recommendations: text
```

#### Future Enhancements
- [ ] Assessment wizard/questionnaire
- [ ] Historical trend tracking
- [ ] Peer benchmarking
- [ ] Framework comparison view
- [ ] Export assessment report
- [ ] Action plan generation from gaps

---

### 2.5 AI Assurance Plan (Controls Gap Analysis & Prioritization)
**Status**: 🔄 Enhanced with Prioritization & ROSI  
**Route**: `/ai-assurance-plan`  
**Owner**: Or Amir (Product)  
**Version**: v2.0  
**Last Updated**: November 5, 2025  
**User Personas**: Risk Managers, Compliance Officers, CISOs, CFOs, Legal Counsel, Ethics Officers

#### Mission Statement
Empower organizations to transform AI governance self-assessments into defensible, stakeholder-aligned action plans by providing transparent prioritization, explainable scoring methodology, and quantifiable ROI analysis—enabling teams to confidently allocate resources, demonstrate compliance, and accelerate AI maturity.

#### Description
Comprehensive control gap analysis with data-driven prioritization, multi-stakeholder weighted scoring, ROSI calculation, and AI-powered remediation guidance. Transforms self-assessment results into actionable, justified implementation plans.

#### Problem Statement
Organizations completing AI governance self-assessments face critical challenges:
- **Lack of Actionable Prioritization**: Teams assess 15-50+ controls but struggle to decide which to tackle first
- **Inability to Justify Investment**: CFOs demand ROI justification for governance spend
- **Siloed Stakeholder Perspectives**: CISO, Legal, and Ethics teams have conflicting priorities
- **Lack of Traceability**: No system of record for tracking status, ownership, or implementation progress
- **Manual, Time-Intensive Process**: Spreadsheet-based scoring requires hours of manual calculation

#### Key Features

##### 1. Controls Maturity Gap Analysis Table
**Display**:
- Assessment dropdown (select from completed self-assessments)
- Sortable/filterable table with columns:
  - Control ID (e.g., GOVERN-1)
  - Control Name
  - Framework (NIST AI RMF, ISO/IEC 42001, EU AI Act)
  - Current Maturity (1-5)
  - Target Maturity (1-5)
  - Gap (0-100%, normalized)
  - **Priority Score (0-100)** ⭐ NEW
  - **ROSI %** ⭐ NEW
  - Status Badge (Draft, In Progress, Completed)
  - Owner (assigned user)

**Interactions**:
- Click row → Opens right-drawer with 3 tabs
- Sort by Priority (descending), Gap, ROSI
- Filter by Framework, Status, Owner
- Search by control name/ID

**Visual Design**:
- Priority score color-coded:
  - 80-100: Red (Critical)
  - 60-79: Orange (High)
  - 40-59: Yellow (Medium)
  - 0-39: Green (Low)

##### 2. Right-Drawer: Control Details (3 Tabs) ⭐ NEW

**Tab 1: Scoring & Prioritization**
- **KPI Tiles**: Priority Score, Gap %, Regulatory Urgency, Benefit Share
- **Maturity Adjustment**: Current/Target maturity sliders
- **Multi-Stakeholder Configuration**:
  - Add stakeholders (e.g., CISO, Legal, Ethics)
  - Set Influence % per stakeholder (must sum to 100%)
  - Set Criterion Weights per stakeholder: Impact, Regulatory, Ethical, Cost, Effort (must sum to 100%)
  - Set Criterion Scores per stakeholder (1-5 rating)
  - "Normalize" helpers
- **Contributions Breakdown**: Visual showing how each criterion contributes to final priority
- **Actions**: Recalculate, Apply to Table, Reset to Defaults

**Tab 2: Remediation Guidance & ROSI**
- **AI Chat Interface**: 
  - Ask AI for implementation guidance
  - Get step-by-step recommendations
  - Tool suggestions and best practices
- **ROSI Calculator**:
  - Currency selector (USD, EUR, GBP, etc.)
  - Investment period (1-5 years)
  - **Implementation Costs** (expandable):
    - People: Implementation Labor, Ongoing Management
    - Technology: Licensing, Infrastructure
    - Services: Implementation Support, Training, Change Management
    - Other: Monitoring, Opportunity Cost
  - **Annual Savings/Benefits** (expandable):
    - Operational Benefits: Efficiency Gains, Fewer Incidents, Tool Consolidation, Reduced Downtime
    - Risk Mitigation Value: Strategic, Operational, Technical, Privacy, Security, Ethical, Legal/Compliance, Safety, Insurance, Third-Party
  - **Calculation Display**: Total Costs, Annual Savings, Total Savings, ROSI %, Net Benefit, Payback Period
  - **Visual Output**: ROSI % (color-coded), bar chart (Costs vs. Savings)
  - **Actions**: Calculate ROSI, Save to Control, Export Report

**Tab 3: Notes & Attachments**
- Rich text notes with timestamp and author
- Owner assignment with avatar
- File attachments (upload, download, delete)
- Audit trail for decisions

**Drawer Header**:
- Control ID and Name
- Framework badge
- Status dropdown (Draft → In Progress → Completed)
- Close button

##### 3. Kovrr Insights: AI-Based Prioritization ⭐ NEW
- AI-powered recommendations based on:
  - Industry data (implementation patterns)
  - Control dependencies (blocking relationships)
  - Strategic initiatives (bundling opportunities)
- Activation: Requires minimum 2 controls with calculated priorities
- Display: Collapsible insights panel with recommendations
- Actions: Apply Recommendation, Dismiss

##### 4. Action Plan View (Existing)
- Prioritized list of actions linked to controls
- Status tracking (Not Started, In Progress, Blocked, Completed)
- Assignment and due dates
- Effort and cost estimates
- Progress tracking

#### Prioritization Methodology ⭐ NEW

Uses a **gap-adjusted weighted scoring model** that combines:
1. **Maturity Gap**: (Target - Current) / 4
2. **Stakeholder Influence**: Organizational power weighting (e.g., CISO 40%, Legal 35%, Ethics 25%)
3. **Criterion Weights**: Impact, Regulatory, Ethical, Cost, Effort (per stakeholder, must sum to 100%)
4. **Criterion Scores**: 1-5 rating per criterion (per stakeholder)

**Formula**:
```
Step 1: Gap = (Target - Current) / 4
Step 2: Global Weight (Criterion C) = Σ(Stakeholder Influence × Stakeholder Weight for C)
Step 3: Adjusted Score = Raw Score × (1 + Gap)  [for benefits]
        Adjusted Score = (6 - Raw Score) × (1 + Gap)  [for costs, inverted]
Step 4: Blended Score (C) = Σ(Stakeholder Influence × Adjusted Score for C)
Step 5: Contribution (C) = Global Weight (C) × Blended Score (C)
Step 6: Priority Score = (Σ Contributions / Max Possible) × 100
```

**Why This Methodology?**
- **Transparent & Explainable**: Every number traces back to explicit inputs
- **Stakeholder Alignment**: Blends perspectives democratically
- **Gap-Adjusted**: Larger gaps get higher urgency
- **Cost-Conscious**: Cost/Effort inverted (lower cost = higher score)

#### ROSI Calculation Model ⭐ NEW

**Formula**:
```
Total Costs = Σ(Implementation Costs)
Annual Savings = Σ(Operational Benefits + Risk Mitigation Value)
Total Savings = Annual Savings × Investment Period (years)
ROSI % = ((Total Savings - Total Costs) / Total Costs) × 100
Net Benefit = Total Savings - Total Costs
Payback Period = Total Costs / Annual Savings (years)
```

**Cost Categories**: People, Technology, Services, Other (9 subcategories)  
**Savings Categories**: Operational Benefits + Risk Mitigation Value (14 subcategories)

#### Data Model (Enhanced)

```python
ControlAssessment:
  # Existing fields
  - tenant: FK
  - control: FK
  - implementation_status: enum (Implemented, Partial, Missing, Not Applicable)
  - gap_description: text
  - assessed_by: FK User
  - assessment_date: date
  - target_completion_date: date
  
  # NEW: Maturity fields
  - current_maturity: int (1-5)
  - target_maturity: int (1-5)
  - gap_normalized: decimal (0-1)
  
  # NEW: Prioritization fields
  - priority_score: decimal (0-100)
  - status: enum (draft, in_progress, completed)
  - owner: FK User
  
  # NEW: ROSI fields
  - rosi_percentage: decimal
  - total_costs: decimal
  - annual_savings: decimal
  - net_benefit: decimal
  - investment_period_years: int (default 3)
  - currency: string (default 'USD')

StakeholderPrioritization (NEW):
  - assessment: FK ControlAssessment
  - stakeholder_name: string
  - influence_percentage: decimal (0-100)
  
  # Criterion weights (must sum to 100%)
  - weight_impact: decimal
  - weight_regulatory: decimal
  - weight_ethical: decimal
  - weight_cost: decimal
  - weight_effort: decimal
  
  # Criterion scores (1-5)
  - score_impact: int
  - score_regulatory: int
  - score_ethical: int
  - score_cost: int
  - score_effort: int

ROSICostItem (NEW):
  - assessment: FK ControlAssessment
  - category: enum (people_implementation, people_ongoing, tech_licensing, 
                    tech_infrastructure, services_implementation, services_training,
                    services_change, other_monitoring, other_opportunity)
  - amount: decimal
  - description: text

ROSISavingsItem (NEW):
  - assessment: FK ControlAssessment
  - category: enum (operational_efficiency, operational_incidents, operational_tools,
                    operational_downtime, risk_strategic, risk_operational, risk_technical,
                    risk_privacy, risk_security, risk_ethical, risk_legal, risk_safety,
                    risk_insurance, risk_thirdparty)
  - amount: decimal (annual)
  - description: text

ActionPlan (Existing):
  - tenant: FK
  - control_assessment: FK
  - title: string
  - description: text
  - priority: enum (Critical, High, Medium, Low)
  - status: enum (Not Started, In Progress, Blocked, Completed)
  - assigned_to: FK User
  - due_date: date
  - estimated_effort: string
  - estimated_cost: decimal
  - completion_date: date
  - notes: text
```

#### User Flow

1. **Select Assessment**: Choose completed self-assessment from dropdown
2. **Review Gap Analysis**: Scan table showing all controls with gaps
3. **Configure Prioritization** (per control):
   - Adjust maturity levels
   - Add stakeholders with influence %
   - Set criterion weights and scores
   - Recalculate priority
4. **Calculate ROSI** (per control):
   - Enter implementation costs
   - Enter annual savings/benefits
   - Calculate ROSI %
   - Save to control
5. **Get AI Guidance**: Chat with AI for implementation recommendations
6. **Document Decisions**: Add notes, assign owner, attach files
7. **Update Status**: Draft → In Progress → Completed
8. **Review Insights**: Apply AI-powered prioritization recommendations
9. **Create Action Plans**: Link prioritized controls to action items
10. **Track Progress**: Monitor implementation status across all controls

#### Scope

**Enhanced in v2.0**:
- ✅ Multi-stakeholder weighted scoring engine
- ✅ ROSI calculator with detailed cost/benefit categories
- ✅ AI-powered remediation guidance (chat interface)
- ✅ Maturity level tracking (current → target)
- ✅ Priority score calculation (0-100)
- ✅ Status workflow (Draft → In Progress → Completed)
- ✅ Owner assignment and notes/attachments
- ✅ Kovrr Insights (AI-based prioritization recommendations)

**Future Enhancements**:
- [ ] CSV/PDF export of prioritization report
- [ ] Control dependency mapping & sequencing
- [ ] What-If scenario comparison (side-by-side)
- [ ] Integration with Risk Register (auto-populate ALE values)
- [ ] Cross-framework mapping (NIST + ISO + EU AI Act in one view)
- [ ] AI-assisted weighting suggestions
- [ ] Historical trending (priority changes over time)
- [ ] Integration with Jira/ServiceNow
- [ ] Timeline/Gantt chart view
- [ ] Resource allocation view

#### Full Specification
Complete requirements with detailed features, user flows, methodology, ROSI calculations, wireframes, and technical specifications available in:
- **`/product/CONTROLS_PRIORITIZATION_FULL_SPEC.md`**

---

### 2.6 Governance & Monitoring
**Status**: ✅ Implemented  
**Route**: `/governance-monitoring`

#### Description
Continuous oversight, evidence tracking, alerts, policy enforcement, and comprehensive audit trail.

#### Features
- **Statistics Dashboard**:
  - Open alerts count
  - Policy violations count
  - Evidence items count
  - Audit events count
- **Tabbed Interface**:
  - **Alerts Tab**: System-generated alerts with severity and status
  - **Policy Violations Tab**: Detected violations with review workflow
  - **Evidence Tab**: Uploaded evidence for compliance controls
  - **Audit Trail Tab**: Complete activity log
- **Alert Management**:
  - Severity levels (Low, Medium, High, Critical)
  - Status workflow (Open → Acknowledged → Resolved)
  - Assignment to users
  - Link to related risk scenarios

#### Data Model
```
Alert:
  - tenant: FK
  - title: string
  - description: text
  - severity: enum (Low, Medium, High, Critical)
  - status: enum (Open, Acknowledged, Resolved, Dismissed)
  - alert_type: string
  - related_scenario: FK (optional)
  - assigned_to: FK User
  - created_at: datetime
  - resolved_at: datetime

Evidence:
  - tenant: FK
  - control: FK
  - title: string
  - description: text
  - evidence_type: string (Document, Screenshot, Log, Report)
  - file_path: string
  - uploaded_by: FK User
  - uploaded_at: datetime
  - verified: boolean
  - verified_by: FK User
  - verified_at: datetime

PolicyViolation:
  - tenant: FK
  - policy_name: string
  - violation_description: text
  - user: FK (optional)
  - status: enum (Detected, Under Review, Confirmed, False Positive, Remediated)
  - detected_at: datetime
  - reviewed_by: FK User
  - remediation_action: text
  - remediated_at: datetime

AuditLog:
  - tenant: FK
  - user: FK
  - action: string (Create, Update, Delete, View)
  - entity_type: string
  - entity_id: integer
  - description: text
  - ip_address: string
  - user_agent: string
  - timestamp: datetime
```

#### Future Enhancements
- [ ] Real-time alert notifications
- [ ] Alert rules engine
- [ ] Evidence file upload
- [ ] Evidence verification workflow
- [ ] Advanced audit log filtering
- [ ] Compliance report generation
- [ ] Email/Slack notifications
- [ ] Dashboard widgets

---

### 2.7 Integration Hub
**Status**: ✅ Implemented  
**Route**: `/integration-hub`

#### Description
Data connectors for identity providers, security tools, and external systems enabling real-time data streams.

#### Features
- **Connection Statistics**:
  - Active connections count
  - Data synced today
  - Available connectors
  - Error count
- **Available Connectors**:
  - Microsoft Entra ID (Identity)
  - CASB - Cloud Access Security Broker (Security)
  - DLP - Data Loss Prevention (Security)
  - Jira (Project Management)
  - ServiceNow (ITSM)
  - Slack (Communication)
  - Custom API (Custom)
  - SIEM Integration (Coming Soon)
- **Connector Cards**:
  - Icon and name
  - Category badge
  - Status indicator
  - Description
  - Connect button
- **Integration Categories View**

#### Data Model (Future)
```
Connector:
  - tenant: FK
  - connector_type: string
  - name: string
  - status: enum (Connected, Error, Syncing, Disconnected)
  - config: JSON
  - last_sync: datetime
  - created_at: datetime

SyncLog:
  - connector: FK
  - sync_type: string
  - records_synced: integer
  - errors: integer
  - started_at: datetime
  - completed_at: datetime
  - status: enum (Success, Failed, Partial)
```

#### Future Enhancements
- [ ] Connector configuration UI
- [ ] OAuth authentication flows
- [ ] Sync scheduling
- [ ] Data mapping interface
- [ ] Sync history and logs
- [ ] Error handling and retry logic
- [ ] Webhook support
- [ ] API rate limiting
- [ ] Connection health monitoring

---

### 2.8 Financial Quantification
**Status**: ✅ Implemented  
**Route**: `/financial-quantification`

#### Description
Financial quantification of risks based on identified control gaps with ROI analysis and cost-benefit calculations.

#### Features
- **Financial Summary**:
  - Total risk exposure (annual expected loss)
  - Gap-related risks
  - Total mitigation cost
  - ROI percentage
- **Risk Exposure by Gap Table**:
  - Control gap details
  - Framework reference
  - Priority
  - Annual likelihood
  - Expected loss (min/max)
  - Mitigation cost
- **Risk Distribution Charts**:
  - Risk by category
  - Cost-benefit analysis
- **Quantification Methodology Guide**:
  - 3-step process visualization
  - Sample calculation example

#### Calculation Logic
```
Expected Annual Loss = Annual Likelihood × Expected Loss
Net Benefit = Risk Exposure - Mitigation Cost
ROI = (Net Benefit / Mitigation Cost) × 100%
```

#### Data Requirements
- Link ControlAssessment to RiskScenario
- Financial fields on RiskScenario (already exist)
- Aggregation queries for totals

#### Future Enhancements
- [ ] Interactive risk calculator
- [ ] Monte Carlo simulation
- [ ] Scenario analysis (best/worst case)
- [ ] Historical loss data integration
- [ ] Industry benchmark comparison
- [ ] Multi-year projections
- [ ] Sensitivity analysis
- [ ] Export financial reports
- [ ] Chart visualizations (pie, bar, line)

---

## 3. Technical Architecture

### 3.1 Frontend Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: TailwindCSS (Kovrr Design System)
- **Routing**: React Router v6
- **State Management**: Context API
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

### 3.2 Backend Stack
- **Framework**: Django 4.2
- **API**: Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: Session-based
- **ORM**: Django ORM

### 3.3 Database Modules
- `core` - Users, Tenants, Departments
- `visibility` - AI Assets, Discovery Sources
- `risk` - Risk Scenarios, Controls, Frameworks, Assessments, Action Plans
- `governance` - Compliance Readiness, Maturity Assessments, Self-Assessment Tasks
- `monitoring` - Alerts, Evidence, Policy Violations, Audit Logs
- `reports` - Export functionality

---

## 4. Design System

### 4.1 Colors
- **Primary**: #5E5694 (Purple)
- **Secondary**: #00A3E0 (Blue)
- **Success**: #28A745
- **Warning**: #FFC107
- **Error**: #DC3545
- **Info**: #17A2B8
- **Neutral**: Grayscale palette

### 4.2 Components
- Buttons (primary, secondary, outline, ghost)
- Cards with headers
- Tables with hover states
- Badges (success, warning, error, info)
- Form inputs with focus states
- Modal dialogs
- Loading spinners
- Empty states

### 4.3 Typography
- **Font**: Source Sans Pro
- **Headings**: Bold, 24-36px
- **Body**: Regular, 14-16px
- **Small**: 12px

---

## 5. User Roles & Permissions

### Current Users
- Admin (full access)
- Analyst (read/write)

### Future Roles
- [ ] Risk Manager
- [ ] Compliance Officer
- [ ] Auditor (read-only)
- [ ] Executive (dashboard only)

---

## 6. API Endpoints

### Authentication
- `POST /api/auth/login/`
- `POST /api/auth/logout/`
- `GET /api/auth/me/`

### Visibility
- `GET /api/visibility/assets/`
- `POST /api/visibility/assets/`
- `GET /api/visibility/assets/{id}/`
- `PUT /api/visibility/assets/{id}/`
- `DELETE /api/visibility/assets/{id}/`

### Risk
- `GET /api/risk/scenarios/`
- `GET /api/risk/controls/`
- `GET /api/risk/control-assessments/`
- `GET /api/risk/action-plans/`
- `GET /api/risk/frameworks/`

### Governance
- `GET /api/governance/compliance-readiness/`
- `GET /api/governance/maturity-assessments/`
- `GET /api/governance/tasks/`

### Monitoring
- `GET /api/monitoring/alerts/`
- `GET /api/monitoring/evidence/`
- `GET /api/monitoring/violations/`
- `GET /api/monitoring/audit-logs/`

---

## 7. Change Log

### Version 1.0 - November 4, 2025
- ✅ Implemented all 8 core views
- ✅ Created backend models for all modules
- ✅ Set up API endpoints
- ✅ Designed UI with Kovrr design system
- ✅ Added navigation and routing

---

## 8. Pending Items

### High Priority
- [ ] Connect frontend to backend APIs
- [ ] Implement database migrations for new models
- [ ] Add CRUD operations for all entities
- [ ] Implement authentication flow

### Medium Priority
- [ ] Add chart visualizations
- [ ] Implement CSV import/export
- [ ] Add filtering and sorting
- [ ] Create detail pages/modals

### Low Priority
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Mobile responsiveness
- [ ] Dark mode

---

## 9. How to Update This PRD

### For New Features
Add to the relevant component section:
```markdown
#### Future Enhancements
- [ ] Your new feature description
```

### For Changes to Existing Features
Update the component description and mark the change:
```markdown
**Updated**: [Date] - [Description of change]
```

### For Data Model Changes
Update the data model section and increment version number

### For Bug Fixes
Add to a "Known Issues" section (create if needed)

---

## 10. Success Metrics

### Phase 1 (Current)
- ✅ All 8 views implemented
- ✅ Backend models created
- ✅ API structure defined

### Phase 2 (Next)
- [ ] Full CRUD functionality
- [ ] Data persistence
- [ ] User testing completed

### Phase 3 (Future)
- [ ] Integration connectors working
- [ ] 100+ AI assets tracked
- [ ] 50+ risk scenarios managed
- [ ] 5+ frameworks assessed

---

**End of PRD v1.0**
