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
**Status**: ✅ Implemented  
**Route**: `/assets`  
**User Personas**: IT Security, Risk Managers, Compliance Officers

#### Purpose
Provide complete visibility into all AI tools, models, and services being used across the organization, including both sanctioned (approved) and shadow AI (unapproved), enabling risk assessment and governance.

#### User Stories
1. **As an IT Security Manager**, I want to see all AI tools in use so that I can identify unauthorized shadow AI and assess security risks.
2. **As a Risk Manager**, I want to categorize AI assets by type so that I can apply appropriate risk frameworks.
3. **As a Compliance Officer**, I want to track when AI assets were first discovered so that I can ensure timely risk assessments.

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

#### Data Model
```javascript
AIAsset {
  id: integer (PK)
  tenant_id: integer (FK → Tenant)
  name: string (max 255, required)
  vendor: string (max 255, required)
  category: enum (required)
    - 'GenAI'
    - 'ML Model'
    - 'Automation'
    - 'Data Analytics'
    - 'Code Generation'
    - 'Other'
  status: enum (required)
    - 'Sanctioned' (approved for use)
    - 'Shadow' (discovered, not approved)
    - 'Unknown' (pending review)
  domain: string (max 255, optional)
    - URL/domain where asset is used
  description: text (optional)
  first_seen: date (auto-set on creation)
  last_seen: date (auto-updated)
  risk_profile_id: integer (FK → RiskProfile, optional)
  created_at: timestamp
  updated_at: timestamp
}

// Relationships
AIAsset → Tenant (many-to-one)
AIAsset → RiskProfile (many-to-one, optional)
AIAsset → UsageIndicators (one-to-many, future)
AIAsset → AssetRelationships (one-to-many, tracks user connections)
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

### 2.5 AI Assurance Plan
**Status**: ✅ Implemented  
**Route**: `/ai-assurance-plan`

#### Description
Detailed control-by-control evaluation that identifies missing or weak controls and generates prioritized action plans for control enhancements.

#### Features
- **Summary Cards**:
  - Total controls assessed
  - Breakdown by status (Implemented/Partial/Missing)
- **Control Assessments List**:
  - Control ID and description
  - Implementation status with icons
  - Priority badges
  - Gap descriptions
  - Target completion dates
  - Linked action plans
- **Action Plan View**:
  - Prioritized list of actions
  - Status tracking
  - Effort and cost estimates
  - Assignment and due dates
- **Gap Report Summary**:
  - Count of gaps by priority

#### Data Model
```
ControlAssessment:
  - tenant: FK
  - control: FK
  - implementation_status: enum (Implemented, Partial, Missing, Not Applicable)
  - gap_description: text
  - priority: enum (Critical, High, Medium, Low)
  - assessed_by: FK User
  - assessment_date: date
  - target_completion_date: date

ActionPlan:
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

#### Future Enhancements
- [ ] Auto-generate action plans from gaps
- [ ] Control assessment wizard
- [ ] Progress tracking dashboard
- [ ] Resource allocation view
- [ ] Integration with Jira/ServiceNow
- [ ] Timeline/Gantt chart view
- [ ] Cost-benefit analysis per action

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
