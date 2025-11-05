# UI Implementation Summary

**Date**: November 5, 2025  
**Status**: Ready to Start  
**Timeline**: 5-6 weeks  
**Total Tasks**: 28

---

## 🎯 Overview

We're implementing UI mockups with the **new database schema** (already complete with 40 assets). Focus is on frontend components using **dummy data from PostgreSQL** (no real integrations yet).

---

## ✅ What's Already Done

### Database (Complete)
- ✅ Schema v2.0 with 40 AI assets
- ✅ Cross-module relationships (asset-risk, asset-control links)
- ✅ 20 users, 5 risk scenarios, 10 controls
- ✅ Notes, evidence, integration status tables

### Design System (Complete)
- ✅ Foqus tokens in Tailwind config
- ✅ Atom components: Button, Card, Badge, Input, Label, Table
- ✅ Utils and styling setup
- ✅ Dashboard migrated

---

## 🚀 What Needs to Be Built

### **Phase 1: Design System Components** (Week 1)

#### Missing Atom Components (2 days)
- [ ] `<Select>` - Dropdown with search
- [ ] `<MultiSelect>` - Multi-select with chips
- [ ] `<Checkbox>` - Checkbox input
- [ ] `<Radio>` - Radio button
- [ ] `<Tooltip>` - Hover tooltip
- [ ] `<Tabs>` - Tab navigation
- [ ] `<Progress>` - Progress bar (for risk scores)
- [ ] `<FileUpload>` - File upload UI (no actual upload)

#### Molecule Components (3 days)
- [ ] `<DataTable>` - Sortable, filterable table
- [ ] `<RiskScoreBadge>` - Color-coded risk tier badge
- [ ] `<RiskScoreProgress>` - Progress bar with color (0-100)
- [ ] `<StatusBadge>` - Status badge (sanctioned/shadow/etc.)
- [ ] `<UserAvatar>` - User avatar with name
- [ ] `<FilterPanel>` - Advanced filter sidebar
- [ ] `<ColumnCustomizer>` - Show/hide columns modal
- [ ] `<AssetPicker>` - Modal to select assets
- [ ] `<RiskPicker>` - Modal to select risks
- [ ] `<ControlPicker>` - Modal to select controls

#### Chart Components (2 days)
- [ ] `<BarChart>` - For regulatory applicability
- [ ] `<DonutChart>` - For control coverage
- [ ] `<Heatmap>` - For risk heatmap
- [ ] `<LineChart>` - For trends (future)

**Total Week 1**: 7 days

---

### **Phase 2: Assets Visibility Module** (Weeks 2-3)

#### Task 2.1: Assets List View (3 days)
**Priority**: 🔴 Critical

**Components**:
- [ ] `<AssetsTable>` with 12 columns:
  1. Asset Name (clickable → detail view)
  2. Type (badge: model/app/agent/dataset/service)
  3. Vendor (badge with vendor name)
  4. Status (badge: sanctioned/shadow/under_review)
  5. Owner (avatar + name)
  6. Technical Owner (avatar + name)
  7. Risk Tier (color badge: critical/high/medium/low)
  8. Risk Score (progress bar 0-100)
  9. Regulatory (badges: GDPR, HIPAA, etc.)
  10. Lifecycle (badge: prod/pilot/test/dev)
  11. Personal Data (Yes/No icon)
  12. Actions (View/Edit/Delete dropdown)

**Features**:
- [ ] Real-time search (name, vendor, use case)
- [ ] Advanced filters (11 filters)
- [ ] Sort by any column
- [ ] Pagination (25/50/100 per page)
- [ ] Column customization (show/hide)
- [ ] Bulk selection (checkboxes)
- [ ] Bulk actions toolbar
- [ ] Empty state
- [ ] Loading skeleton

**Data Source**: PostgreSQL via API (40 assets)

---

#### Task 2.2: Asset Detail View (4 days)
**Priority**: 🔴 Critical

**Layout**:
- [ ] Header (asset name, type badge, status badge, actions)
- [ ] 5-tab navigation
- [ ] Activity timeline (bottom)

**Tab 1: Overview** (18 fields):
- [ ] Identity section (name, type, vendor, status)
- [ ] Ownership section (owner, technical owner, org unit)
- [ ] Business section (use case, description, intended users)
- [ ] Risk section (tier badge, scores with progress bars, breakdown)
- [ ] Compliance section (regulatory badges, control coverage checklist)
- [ ] Lifecycle section (stage badge, platform)
- [ ] Data section (personal data toggle, sensitive categories chips)

**Tab 2: Business & Lifecycle** (8 fields):
- [ ] Projected value
- [ ] First deployment date
- [ ] Environments (chips: dev/test/prod)
- [ ] Related risks (linked cards → click navigates to Risk Register)
- [ ] Related controls (linked cards → click navigates to AI Assurance Plan)
- [ ] Service principal ID
- [ ] AAD permissions (expandable list)
- [ ] User assignments (table)

**Tab 3: Data & Model** (5 fields):
- [ ] Model provider
- [ ] Model version
- [ ] Inputs (text area)
- [ ] Outputs (text area)
- [ ] Safety evaluations (chips)

**Tab 4: Access & Security** (4 fields):
- [ ] AAD permissions (detailed expandable list)
- [ ] User assignments (detailed table)
- [ ] Network destinations (list with traffic volume)
- [ ] Integration sync status (cards: AAD, Zscaler, EDR)

**Tab 5: Compliance & Evidence** (2 fields):
- [ ] Control coverage (checklist with status)
- [ ] Evidence (file upload UI + list of evidence documents)

**Activity Timeline**:
- [ ] Chronological log (from asset_note table)
- [ ] Who, what, when
- [ ] Filter by activity type

**Data Source**: PostgreSQL (single asset with all relationships)

---

#### Task 2.3: Asset Edit Form (2 days)
**Priority**: 🟡 Important

- [ ] Inline editing (click field to edit)
- [ ] Form validation (required fields, formats)
- [ ] Mock save (updates local state, shows success toast)
- [ ] Unsaved changes warning
- [ ] Cancel button (reverts changes)

---

#### Task 2.4: Asset Wizard (3 days)
**Priority**: 🟡 Important

**7-Step Wizard**:
1. Identity & Ownership (6 required fields)
2. Business Context (5 required fields)
3. Lifecycle & Deployment (4 required fields)
4. Data & Model (5 fields, conditional)
5. Access & Security (auto-populated, optional)
6. Compliance & Risk (auto-calculated)
7. Review & Submit (summary)

**Features**:
- [ ] Step navigation (back/next)
- [ ] Progress indicator
- [ ] Validation per step
- [ ] Save as draft (localStorage)
- [ ] Review summary before submit
- [ ] Mock submit (adds to assets list)

---

#### Task 2.5: Shadow AI Dashboard (2 days)
**Priority**: 🟡 Important

- [ ] Filter to show only shadow AI (status='shadow')
- [ ] Statistics cards (total, by source, trend)
- [ ] Quick approve/block buttons
- [ ] Bulk approve/block
- [ ] Mock actions (changes status)

---

#### Task 2.6: Risk Heatmap (2 days)
**Priority**: 🟡 Important

- [ ] 2D grid: Risk Tier (Y) × Lifecycle Stage (X)
- [ ] Asset count per cell
- [ ] Color-coded cells (red/orange/yellow/green)
- [ ] Click cell to filter assets table
- [ ] Tooltip with asset names

---

#### Task 2.7: Compliance Dashboard (2 days)
**Priority**: 🟡 Important

- [ ] Assets by regulatory applicability (bar chart)
- [ ] Control coverage summary (donut chart)
- [ ] Compliance gaps (list)
- [ ] Evidence coverage percentage

**Total Weeks 2-3**: 18 days

---

### **Phase 3: Cross-Module Integration** (Week 4)

#### Task 3.1: Risk Register Updates (2 days)
**Priority**: 🟡 Important

**Changes**:
- [ ] Add "Affected Assets" section to Risk Detail page
- [ ] Display linked assets as cards (from asset_risk_link table)
- [ ] Click asset card → navigates to Asset Detail page
- [ ] Add "Link Asset" button (opens AssetPicker modal)
- [ ] Mock link action (adds to asset_risk_link)
- [ ] Add "Affected Assets" column to Risk Register table (count badge)

**Data Source**: PostgreSQL (14 asset-risk links)

---

#### Task 3.2: AI Assurance Plan Updates (2 days)
**Priority**: 🟡 Important

**Changes**:
- [ ] Add "Applicable Assets" section to Control Drawer
- [ ] Display linked assets as cards (from asset_control_link table)
- [ ] Click asset card → navigates to Asset Detail page
- [ ] Add "Link Asset" button (opens AssetPicker modal)
- [ ] Mock link action (adds to asset_control_link)
- [ ] Show control coverage on Asset Detail (from linked controls)

**Data Source**: PostgreSQL (35 asset-control links)

---

#### Task 3.3: Compliance Readiness Updates (2 days)
**Priority**: 🟡 Important

**Changes**:
- [ ] Add "Assessed Assets" section to assessment view
- [ ] Display linked assets as cards
- [ ] Show asset risk scores and compliance status
- [ ] Click asset card → navigates to Asset Detail page
- [ ] Add "Link Asset" button (opens AssetPicker modal)

---

#### Task 3.4: Dashboard Updates (1 day)
**Priority**: 🟡 Important

**Changes**:
- [ ] Update "AI Assets" card:
  - Total assets count (40)
  - Breakdown by type (model/app/agent/dataset/service)
  - Shadow AI count (red badge: 10)
  - High-risk assets count (orange badge: 10)
- [ ] Add new widgets:
  - "Recent Assets" (last 5 added)
  - "High-Risk Assets" (top 5 by risk score)
  - "Shadow AI Alerts" (shadow assets needing review)
- [ ] Click widget → navigates to Assets Visibility with filter

---

#### Task 3.5: Global Navigation (2 days)
**Priority**: 🔴 Critical

**Features**:
- [ ] Navigation links between modules work
- [ ] Context preserved (filters, selected item)
- [ ] Breadcrumbs show current location
- [ ] Global search bar (search across all modules)
- [ ] Recent searches (localStorage)

**Total Week 4**: 9 days

---

## 📊 Implementation Priority

### **Week 1: Foundation**
1. Design system components (atoms, molecules, charts)

### **Week 2: Assets Core**
2. Assets List View (table with 12 columns)
3. Asset Detail View (5 tabs)

### **Week 3: Assets Advanced**
4. Asset Edit Form
5. Asset Wizard
6. Shadow AI Dashboard
7. Risk Heatmap
8. Compliance Dashboard

### **Week 4: Integration**
9. Risk Register updates (asset links)
10. AI Assurance Plan updates (asset links)
11. Compliance Readiness updates
12. Dashboard updates
13. Global navigation

### **Week 5-6: Polish & Testing** (Optional)
14. Component tests
15. E2E tests
16. Performance optimization
17. Accessibility improvements

---

## 🎯 Key Features to Implement

### 1. **Cross-Module Navigation**
- Asset Detail → Risk Register (click related risk)
- Asset Detail → AI Assurance Plan (click related control)
- Risk Detail → Assets Visibility (click affected asset)
- Control Drawer → Assets Visibility (click applicable asset)
- Dashboard → Assets Visibility (click metrics/widgets)

### 2. **Bidirectional Linking**
- Link asset to risk → updates both sides
- Link asset to control → updates both sides
- Unlink works bidirectionally
- State persists (localStorage for mockup)

### 3. **Advanced Filtering**
- 11 filters for assets (type, status, risk tier, owner, etc.)
- Saved views (save filter combinations)
- Clear all filters button
- Filter count badge

### 4. **Rich Data Display**
- User avatars with names
- Color-coded badges (risk tiers, status)
- Progress bars (risk scores)
- Charts (bar, donut, heatmap)
- Expandable lists (permissions, controls)

### 5. **Bulk Operations**
- Bulk select (checkboxes)
- Bulk update status
- Bulk update owner
- Bulk export (CSV/Excel/PDF UI)
- Bulk delete (with confirmation)

---

## 📋 Acceptance Criteria

### Functionality
- [ ] All 40 assets display correctly in table
- [ ] Search and filters work
- [ ] Cross-module navigation works
- [ ] Bidirectional linking works
- [ ] All CRUD operations work (with PostgreSQL)

### Performance
- [ ] Table renders 40 assets in < 1 second
- [ ] Search responds in < 200ms
- [ ] Filter application < 200ms
- [ ] Navigation between modules < 100ms

### UX
- [ ] Consistent design across all modules
- [ ] Responsive (desktop, tablet)
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] Loading states for all async operations
- [ ] Error states with helpful messages
- [ ] Success notifications for actions

### Code Quality
- [ ] TypeScript types for all models
- [ ] Reusable components
- [ ] Clean code (ESLint, Prettier)
- [ ] Component tests (Jest, React Testing Library)
- [ ] Storybook stories for all components

---

## 🗂️ File Structure

```
frontend/src/
├── components/
│   ├── atoms/           # Button, Badge, Input, etc. (DONE)
│   │   ├── Select.tsx   # NEW
│   │   ├── MultiSelect.tsx  # NEW
│   │   ├── Checkbox.tsx     # NEW
│   │   ├── Tabs.tsx         # NEW
│   │   └── Progress.tsx     # NEW
│   ├── molecules/       # DataTable, Pickers, etc.
│   │   ├── DataTable.tsx        # NEW
│   │   ├── RiskScoreBadge.tsx   # NEW
│   │   ├── FilterPanel.tsx      # NEW
│   │   ├── AssetPicker.tsx      # NEW
│   │   └── ...
│   └── charts/          # Bar, Donut, Heatmap
│       ├── BarChart.tsx     # NEW
│       ├── DonutChart.tsx   # NEW
│       └── Heatmap.tsx      # NEW
├── pages/
│   ├── AssetsVisibility/    # NEW MODULE
│   │   ├── AssetsListView.tsx
│   │   ├── AssetDetailView.tsx
│   │   ├── AssetWizard.tsx
│   │   ├── ShadowAIDashboard.tsx
│   │   ├── RiskHeatmap.tsx
│   │   └── ComplianceDashboard.tsx
│   ├── RiskRegister/        # UPDATE
│   │   ├── RiskDetail.tsx   # Add affected assets
│   │   └── RiskTable.tsx    # Add assets column
│   ├── AIAssurancePlan/     # UPDATE
│   │   └── ControlDrawer.tsx # Add applicable assets
│   ├── ComplianceReadiness/ # UPDATE
│   │   └── AssessmentView.tsx # Add assessed assets
│   └── Dashboard/           # UPDATE
│       └── Dashboard.tsx    # Add asset widgets
├── types/
│   ├── asset.types.ts       # NEW
│   ├── risk.types.ts        # UPDATE
│   └── control.types.ts     # UPDATE
├── services/
│   ├── assetService.ts      # NEW (API calls)
│   ├── riskService.ts       # UPDATE
│   └── controlService.ts    # UPDATE
└── utils/
    ├── riskCalculations.ts  # NEW
    └── formatters.ts        # UPDATE
```

---

## 🚀 Getting Started

### Step 1: Design System Components (Week 1)
Start with missing atom components, then molecules, then charts.

### Step 2: Assets List View (Week 2)
Build the main table with all 12 columns and filters.

### Step 3: Asset Detail View (Week 2)
Build the 5-tab detail page with all relationships.

### Step 4: Cross-Module Integration (Week 4)
Update other modules to show asset links.

---

## 📝 Notes

- **Data Source**: All data comes from PostgreSQL (40 assets, 14 asset-risk links, 35 asset-control links)
- **No Backend Changes**: Frontend only, using existing API structure
- **State Management**: Use React Context or Zustand for global state
- **Persistence**: Use localStorage for filters, column customization, saved views
- **Testing**: Write tests as you go, not at the end

---

**Ready to start Week 1: Design System Components!** 🎨

What would you like to tackle first?
