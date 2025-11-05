# Mockup Implementation Task List

**Date**: November 5, 2025  
**Scope**: UI mockups with dummy data (no real integrations)  
**Estimated Timeline**: 5 weeks  
**Total Tasks**: 28

---

## 🎯 Scope

### ✅ In Scope:
- Data models (with dummy data)
- UI views and components
- Frontend logic and state management
- Mock API responses
- Cross-module alignment

### ❌ Out of Scope (Future):
- Real Azure AD integration
- Real Zscaler integration
- Real EDR integration
- Production database migrations
- Backend API implementation

---

## 📊 Task Summary by Module

| Module | Tasks | Priority | Estimated Time |
|--------|-------|----------|----------------|
| **Assets Visibility** | 8 tasks | 🔴 Critical | 2 weeks |
| **Risk Register** | 4 tasks | 🟡 Important | 1 week |
| **AI Assurance Plan** | 3 tasks | 🟡 Important | 1 week |
| **Compliance Readiness** | 3 tasks | 🟡 Important | 1 week |
| **Dashboard** | 2 tasks | 🟡 Important | 3 days |
| **Design System** | 3 tasks | 🔴 Critical | 1 week |
| **Cross-Module** | 5 tasks | 🔴 Critical | 1 week |

**Total**: 28 tasks, 5 weeks

---

## 🔴 Module 1: Assets Visibility (2 weeks)

### Task 1.1: Update Data Model with Dummy Data
**Priority**: 🔴 Critical  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Changes**:
- [ ] Update `AIAsset` model structure (no DB changes, just TypeScript types)
- [ ] Add new fields:
  - `asset_type` (model/app/agent/dataset/service)
  - `owner` (FK User)
  - `technical_owner` (FK User)
  - `vendor_source` (internal/third_party/open_source)
  - `risk_tier` (low/medium/high/critical)
  - `risk_score` (0-100)
  - `lifecycle_stage` (idea/dev/test/pilot/prod/retired)
  - `personal_data_used` (boolean)
  - `regulatory_applicability` (array)
  - `control_coverage` (array)
  - `related_risks` (array of IDs)
  - `related_controls` (array of IDs)

- [ ] Create dummy data file: `mock-assets.json` (50 assets)
  - 10 sanctioned assets
  - 5 shadow AI assets
  - 35 under review assets
  - Mix of risk tiers
  - Various lifecycle stages
  - Different vendors (OpenAI, Anthropic, Internal, etc.)

**Acceptance Criteria**:
- TypeScript types defined
- Dummy data file created with 50 realistic assets
- Data includes all new fields

---

### Task 1.2: Create Assets List View (Main Table)
**Priority**: 🔴 Critical  
**Time**: 3 days  
**Assignee**: Frontend Developer

**Components to Build**:
- [ ] `<AssetsTable>` with 12 columns:
  1. Asset Name (clickable)
  2. Type (badge)
  3. Vendor (badge)
  4. Status (badge)
  5. Owner (avatar)
  6. Technical Owner (avatar)
  7. Risk Tier (color-coded badge)
  8. Risk Score (progress bar 0-100)
  9. Regulatory (badges)
  10. Lifecycle (badge)
  11. Personal Data (Yes/No icon)
  12. Actions (View/Edit/Delete)

- [ ] Search functionality (filters dummy data)
- [ ] Filter panel (11 filters)
- [ ] Sort by any column
- [ ] Pagination (25/50/100 per page)
- [ ] Column customization (show/hide)
- [ ] Empty state
- [ ] Loading skeleton

**Acceptance Criteria**:
- Table displays 50 dummy assets
- Search filters correctly
- All filters work
- Sorting works on all columns
- Column customization persists in localStorage

---

### Task 1.3: Create Asset Detail View (5 Tabs)
**Priority**: 🔴 Critical  
**Time**: 4 days  
**Assignee**: Frontend Developer

**Tabs to Build**:

**Tab 1: Overview** (18 fields)
- [ ] Identity section (name, type, vendor, status)
- [ ] Ownership section (owner, technical owner, org unit)
- [ ] Business section (use case, description, intended users)
- [ ] Risk section (tier badge, scores with progress bars, breakdown)
- [ ] Compliance section (regulatory badges, control coverage checklist)
- [ ] Lifecycle section (stage badge, platform)
- [ ] Data section (personal data toggle, sensitive categories chips)

**Tab 2: Business & Lifecycle** (8 fields)
- [ ] Projected value
- [ ] First deployment date
- [ ] Environments (chips)
- [ ] Related risks (linked cards with click → Risk Register)
- [ ] Related controls (linked cards with click → AI Assurance Plan)
- [ ] Service principal ID
- [ ] AAD permissions (mock list)
- [ ] User assignments (mock table)

**Tab 3: Data & Model** (5 fields)
- [ ] Model provider
- [ ] Model version
- [ ] Inputs (text area)
- [ ] Outputs (text area)
- [ ] Safety evaluations (chips)

**Tab 4: Access & Security** (4 fields)
- [ ] AAD permissions (expandable list with mock data)
- [ ] User assignments (table with mock users)
- [ ] Network destinations (list with mock domains)
- [ ] Integration sync status (mock cards: AAD, Zscaler, EDR)

**Tab 5: Compliance & Evidence** (2 fields)
- [ ] Control coverage (checklist with mock controls)
- [ ] Evidence (file upload UI + mock evidence list)

**Activity Timeline** (bottom)
- [ ] Mock activity log (10 entries)

**Acceptance Criteria**:
- All 5 tabs render correctly
- Click between tabs works smoothly
- Related risks/controls link to other modules
- Activity timeline shows mock history

---

### Task 1.4: Create Asset Edit Form (Inline)
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Features**:
- [ ] Inline editing (click field to edit)
- [ ] Form validation (required fields, formats)
- [ ] Mock save (updates local state, shows success toast)
- [ ] Unsaved changes warning
- [ ] Cancel button (reverts changes)

**Acceptance Criteria**:
- Inline editing works
- Validation shows errors
- Mock save updates UI
- Unsaved changes warning works

---

### Task 1.5: Create Asset Wizard (7 Steps)
**Priority**: 🟡 Important  
**Time**: 3 days  
**Assignee**: Frontend Developer

**Steps**:
1. Identity & Ownership (6 fields)
2. Business Context (5 fields)
3. Lifecycle & Deployment (4 fields)
4. Data & Model (5 fields, conditional)
5. Access & Security (auto-populated with mock data)
6. Compliance & Risk (auto-calculated)
7. Review & Submit (summary)

**Features**:
- [ ] Step navigation (back/next)
- [ ] Progress indicator
- [ ] Validation per step
- [ ] Mock save as draft
- [ ] Review summary
- [ ] Mock submit (adds to assets list)

**Acceptance Criteria**:
- All 7 steps work
- Validation prevents progression
- Draft save works (localStorage)
- Submit adds asset to list

---

### Task 1.6: Create Shadow AI Dashboard
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Features**:
- [ ] Filter to show only shadow AI assets (status='shadow')
- [ ] Statistics cards (total shadow AI, by source, trend)
- [ ] Quick approve/block buttons
- [ ] Bulk approve/block
- [ ] Mock approve action (changes status to 'sanctioned')
- [ ] Mock block action (changes status to 'blocked')

**Acceptance Criteria**:
- Shadow AI assets displayed
- Approve/block actions work
- Statistics accurate

---

### Task 1.7: Create Risk Heatmap
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Features**:
- [ ] 2D grid: Risk Tier (Y) × Lifecycle Stage (X)
- [ ] Asset count per cell
- [ ] Color-coded cells (red/orange/yellow/green)
- [ ] Click cell to filter assets table
- [ ] Tooltip with asset names

**Acceptance Criteria**:
- Heatmap renders correctly
- Click to filter works
- Colors match risk tiers
- Tooltip shows details

---

### Task 1.8: Create Compliance Dashboard
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Features**:
- [ ] Assets by regulatory applicability (bar chart)
- [ ] Control coverage summary (donut chart)
- [ ] Compliance gaps (list with mock data)
- [ ] Evidence coverage percentage

**Acceptance Criteria**:
- Charts render with mock data
- Click to drill down works
- Data accurate

---

## 🟡 Module 2: Risk Register (1 week)

### Task 2.1: Update Risk Register Data Model
**Priority**: 🟡 Important  
**Time**: 1 day  
**Assignee**: Frontend Developer

**Changes**:
- [ ] Add `affected_assets` field (array of asset IDs)
- [ ] Update dummy data file: `mock-risks.json` (20 risks)
  - Link 5-10 risks to assets
  - Include asset IDs in `affected_assets`

**Acceptance Criteria**:
- Risk model includes `affected_assets`
- Dummy data links risks to assets

---

### Task 2.2: Update Risk Detail View
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Changes**:
- [ ] Add "Affected Assets" section to Risk Detail page
- [ ] Display linked assets as cards
- [ ] Click asset card → navigates to Asset Detail page
- [ ] Add "Link Asset" button (opens asset picker modal)
- [ ] Mock link action (adds asset ID to risk)

**Acceptance Criteria**:
- Affected assets displayed
- Click to navigate works
- Link asset modal works
- Mock link action updates UI

---

### Task 2.3: Update Risk Register Table
**Priority**: 🟡 Important  
**Time**: 1 day  
**Assignee**: Frontend Developer

**Changes**:
- [ ] Add "Affected Assets" column (count badge)
- [ ] Hover shows asset names tooltip
- [ ] Click badge → filters to show only that risk's assets

**Acceptance Criteria**:
- Column displays asset count
- Tooltip shows asset names
- Click filters correctly

---

### Task 2.4: Create Risk-Asset Link Flow
**Priority**: 🟡 Important  
**Time**: 1 day  
**Assignee**: Frontend Developer

**Features**:
- [ ] From Risk Detail: "Link Asset" button → Asset picker modal
- [ ] From Asset Detail: "Link Risk" button → Risk picker modal
- [ ] Mock link action (bidirectional update)
- [ ] Unlink button (removes link)

**Acceptance Criteria**:
- Link flows work from both sides
- Mock link updates both views
- Unlink works

---

## 🟡 Module 3: AI Assurance Plan (1 week)

### Task 3.1: Update AI Assurance Plan Data Model
**Priority**: 🟡 Important  
**Time**: 1 day  
**Assignee**: Frontend Developer

**Changes**:
- [ ] Add `applicable_assets` field to Control model (array of asset IDs)
- [ ] Update dummy data file: `mock-controls.json`
  - Link 10-15 controls to assets
  - Include asset IDs in `applicable_assets`

**Acceptance Criteria**:
- Control model includes `applicable_assets`
- Dummy data links controls to assets

---

### Task 3.2: Update Control Detail Drawer
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Changes**:
- [ ] Add "Applicable Assets" section to drawer (new tab or section)
- [ ] Display linked assets as cards
- [ ] Click asset card → navigates to Asset Detail page
- [ ] Add "Link Asset" button (opens asset picker modal)
- [ ] Mock link action (adds asset ID to control)

**Acceptance Criteria**:
- Applicable assets displayed
- Click to navigate works
- Link asset modal works
- Mock link action updates UI

---

### Task 3.3: Create Control-Asset Link Flow
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Features**:
- [ ] From Control Drawer: "Link Asset" button → Asset picker modal
- [ ] From Asset Detail: "Link Control" button → Control picker modal
- [ ] Mock link action (bidirectional update)
- [ ] Unlink button (removes link)
- [ ] Show control coverage on Asset Detail (from linked controls)

**Acceptance Criteria**:
- Link flows work from both sides
- Mock link updates both views
- Unlink works
- Control coverage auto-updates

---

## 🟡 Module 4: Compliance Readiness (1 week)

### Task 4.1: Update Compliance Data Model
**Priority**: 🟡 Important  
**Time**: 1 day  
**Assignee**: Frontend Developer

**Changes**:
- [ ] Add `assessed_assets` field to ComplianceReadiness model (array of asset IDs)
- [ ] Update dummy data file: `mock-compliance.json`
  - Link assessments to assets
  - Include asset IDs in `assessed_assets`

**Acceptance Criteria**:
- Compliance model includes `assessed_assets`
- Dummy data links assessments to assets

---

### Task 4.2: Update Compliance Assessment View
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Changes**:
- [ ] Add "Assessed Assets" section to assessment view
- [ ] Display linked assets as cards
- [ ] Show asset risk scores and compliance status
- [ ] Click asset card → navigates to Asset Detail page
- [ ] Add "Link Asset" button (opens asset picker modal)

**Acceptance Criteria**:
- Assessed assets displayed
- Click to navigate works
- Link asset modal works

---

### Task 4.3: Create Compliance-Asset Link Flow
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Features**:
- [ ] From Compliance View: "Link Asset" button → Asset picker modal
- [ ] From Asset Detail: "Link Assessment" button → Assessment picker modal
- [ ] Mock link action (bidirectional update)
- [ ] Show compliance status on Asset Detail (from linked assessments)

**Acceptance Criteria**:
- Link flows work from both sides
- Mock link updates both views
- Compliance status auto-updates on Asset Detail

---

## 🟡 Module 5: Dashboard (3 days)

### Task 5.1: Update Dashboard Metrics
**Priority**: 🟡 Important  
**Time**: 1 day  
**Assignee**: Frontend Developer

**Changes**:
- [ ] Update "AI Assets" card to show:
  - Total assets count
  - Breakdown by type (model/app/agent/dataset/service)
  - Shadow AI count (red badge)
  - High-risk assets count (orange badge)
- [ ] Add click to navigate to Assets Visibility

**Acceptance Criteria**:
- Metrics display correctly with dummy data
- Click navigates to Assets Visibility

---

### Task 5.2: Add Assets Widget to Dashboard
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Features**:
- [ ] New widget: "Recent Assets" (last 5 added)
- [ ] New widget: "High-Risk Assets" (top 5 by risk score)
- [ ] New widget: "Shadow AI Alerts" (shadow assets needing review)
- [ ] Click widget → navigates to Assets Visibility with filter

**Acceptance Criteria**:
- Widgets display correctly
- Click navigates with correct filter

---

## 🔴 Module 6: Design System Components (1 week)

### Task 6.1: Create Missing Atom Components
**Priority**: 🔴 Critical  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Components to Create**:
- [ ] `<Select>` (dropdown with search)
- [ ] `<MultiSelect>` (multi-select dropdown with chips)
- [ ] `<Checkbox>`
- [ ] `<Radio>`
- [ ] `<Tooltip>`
- [ ] `<Tabs>` (tab navigation)
- [ ] `<Progress>` (progress bar for risk scores)
- [ ] `<FileUpload>` (file upload with drag-drop UI only, no actual upload)

**Acceptance Criteria**:
- All components match Foqus design system
- Accessible (ARIA labels, keyboard navigation)
- Storybook stories created

---

### Task 6.2: Create Molecule Components
**Priority**: 🔴 Critical  
**Time**: 3 days  
**Assignee**: Frontend Developer

**Components to Create**:
- [ ] `<DataTable>` (with sorting, filtering, pagination)
- [ ] `<RiskScoreBadge>` (color-coded: Critical/High/Med/Low)
- [ ] `<RiskScoreProgress>` (progress bar 0-100 with color)
- [ ] `<StatusBadge>` (status badge with colors)
- [ ] `<UserAvatar>` (user avatar with name)
- [ ] `<FilterPanel>` (advanced filter panel)
- [ ] `<ColumnCustomizer>` (show/hide columns modal)
- [ ] `<AssetPicker>` (modal to select assets)
- [ ] `<RiskPicker>` (modal to select risks)
- [ ] `<ControlPicker>` (modal to select controls)

**Acceptance Criteria**:
- All components work with design system atoms
- Reusable across modules
- Performance: < 100ms render time

---

### Task 6.3: Create Chart Components
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Components to Create**:
- [ ] `<BarChart>` (for regulatory applicability)
- [ ] `<DonutChart>` (for control coverage)
- [ ] `<Heatmap>` (for risk heatmap)
- [ ] `<LineChart>` (for trends, future use)

**Libraries to Use**:
- Recharts or Chart.js

**Acceptance Criteria**:
- Charts render with mock data
- Responsive
- Accessible

---

## 🔴 Module 7: Cross-Module Integration (1 week)

### Task 7.1: Create Mock Data with Cross-References
**Priority**: 🔴 Critical  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Files to Create**:
- [ ] `mock-assets.json` (50 assets)
- [ ] `mock-risks.json` (20 risks with `affected_assets`)
- [ ] `mock-controls.json` (30 controls with `applicable_assets`)
- [ ] `mock-compliance.json` (5 assessments with `assessed_assets`)
- [ ] `mock-users.json` (20 users for owners)

**Cross-References**:
- [ ] 10 risks linked to 5-10 assets each
- [ ] 15 controls linked to 10-20 assets each
- [ ] 3 compliance assessments linked to 20-30 assets each
- [ ] All assets have owners and technical owners

**Acceptance Criteria**:
- All mock data files created
- Cross-references consistent (no broken links)
- Realistic data (names, descriptions, dates)

---

### Task 7.2: Create Navigation Links
**Priority**: 🔴 Critical  
**Time**: 1 day  
**Assignee**: Frontend Developer

**Links to Add**:
- [ ] Asset Detail → Risk Register (click related risk)
- [ ] Asset Detail → AI Assurance Plan (click related control)
- [ ] Asset Detail → Compliance Readiness (click assessment)
- [ ] Risk Detail → Assets Visibility (click affected asset)
- [ ] Control Drawer → Assets Visibility (click applicable asset)
- [ ] Compliance View → Assets Visibility (click assessed asset)
- [ ] Dashboard → Assets Visibility (click metrics/widgets)

**Acceptance Criteria**:
- All navigation links work
- Context preserved (filters, selected item)

---

### Task 7.3: Create Picker Modals
**Priority**: 🔴 Critical  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Modals to Create**:
- [ ] `<AssetPickerModal>` (search, filter, select assets)
- [ ] `<RiskPickerModal>` (search, filter, select risks)
- [ ] `<ControlPickerModal>` (search, filter, select controls)
- [ ] `<AssessmentPickerModal>` (search, filter, select assessments)

**Features**:
- Search by name
- Filter by type/status
- Multi-select
- Selected items shown as chips
- Cancel/Confirm buttons

**Acceptance Criteria**:
- All modals work correctly
- Search and filter work
- Multi-select works
- Confirm updates parent component

---

### Task 7.4: Implement Bidirectional Linking Logic
**Priority**: 🔴 Critical  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Logic to Implement**:
- [ ] Link asset to risk → updates both asset.related_risks and risk.affected_assets
- [ ] Link asset to control → updates both asset.related_controls and control.applicable_assets
- [ ] Link asset to assessment → updates both asset.compliance_assessments and assessment.assessed_assets
- [ ] Unlink works bidirectionally
- [ ] State management (Context API or Zustand)

**Acceptance Criteria**:
- Linking updates both sides
- Unlinking updates both sides
- State persists across navigation (localStorage)

---

### Task 7.5: Create Global Search
**Priority**: 🟡 Important  
**Time**: 2 days  
**Assignee**: Frontend Developer

**Features**:
- [ ] Global search bar (top navigation)
- [ ] Search across: Assets, Risks, Controls, Assessments
- [ ] Results grouped by type
- [ ] Click result → navigates to detail view
- [ ] Recent searches (localStorage)

**Acceptance Criteria**:
- Search works across all modules
- Results grouped correctly
- Navigation works
- Recent searches persist

---

## 📋 Implementation Order

### Week 1: Design System & Assets Core
1. Task 6.1: Create atom components (2 days)
2. Task 6.2: Create molecule components (3 days)
3. Task 1.1: Update Assets data model (2 days)

### Week 2: Assets UI
4. Task 1.2: Create Assets List View (3 days)
5. Task 1.3: Create Asset Detail View (4 days)

### Week 3: Assets Advanced & Cross-Module Data
6. Task 1.4: Create Asset Edit Form (2 days)
7. Task 1.5: Create Asset Wizard (3 days)
8. Task 7.1: Create mock data with cross-references (2 days)

### Week 4: Cross-Module Integration
9. Task 2.1-2.4: Update Risk Register (5 days)
10. Task 3.1-3.3: Update AI Assurance Plan (5 days)

### Week 5: Compliance, Dashboard & Final Integration
11. Task 4.1-4.3: Update Compliance Readiness (5 days)
12. Task 5.1-5.2: Update Dashboard (3 days)
13. Task 7.2-7.5: Cross-module integration (7 days)

### Week 6 (Optional): Advanced Features
14. Task 1.6: Shadow AI Dashboard (2 days)
15. Task 1.7: Risk Heatmap (2 days)
16. Task 1.8: Compliance Dashboard (2 days)
17. Task 6.3: Chart components (2 days)

---

## ✅ Acceptance Criteria (Overall)

### Functionality:
- [ ] All 50 dummy assets display correctly
- [ ] Search and filters work across all modules
- [ ] Cross-module navigation works (asset ↔ risk ↔ control ↔ compliance)
- [ ] Bidirectional linking works
- [ ] All CRUD operations work with mock data (localStorage)

### Performance:
- [ ] Table renders 50 assets in < 1 second
- [ ] Search responds in < 200ms
- [ ] Filter application < 200ms
- [ ] Navigation between modules < 100ms

### UX:
- [ ] Consistent design across all modules
- [ ] Responsive (desktop, tablet)
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] Loading states for all async operations
- [ ] Error states with helpful messages
- [ ] Success notifications for actions

### Code Quality:
- [ ] TypeScript types for all models
- [ ] Reusable components
- [ ] Clean code (ESLint, Prettier)
- [ ] Component tests (Jest, React Testing Library)
- [ ] Storybook stories for all components

---

## 📊 Summary

**Total Tasks**: 28  
**Total Time**: 5-6 weeks  
**Priority Breakdown**:
- 🔴 Critical: 12 tasks (Design System, Assets Core, Cross-Module)
- 🟡 Important: 16 tasks (Other Modules, Advanced Features)

**Deliverables**:
1. ✅ Assets Visibility module (list, detail, edit, wizard, dashboards)
2. ✅ Updated Risk Register (with asset links)
3. ✅ Updated AI Assurance Plan (with asset links)
4. ✅ Updated Compliance Readiness (with asset links)
5. ✅ Updated Dashboard (with asset metrics)
6. ✅ Design system components (atoms, molecules, charts)
7. ✅ Cross-module navigation and linking
8. ✅ Mock data with realistic cross-references

**Ready for mockup implementation!** 🚀
