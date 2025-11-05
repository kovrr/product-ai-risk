# HTML Mockups Summary & Implementation Plan

**Date**: November 5, 2025  
**Status**: Ready for React Implementation

---

## 📁 Available HTML Mockups (Nov 4, 2025)

### 1. ✅ AI Assurance Plan
**Folder**: `AI Assurance Plan - 01 - Nov 4 2025/`  
**Files**: 1 HTML file  
**Status**: ✅ Fully Reviewed & Production-Ready

### 2. ✅ AI Risk Register v4
**Folder**: `AI Risk Register - 02 - Nov 4 2025/`  
**Files**: 3 HTML files + 4 JSON data files + Documentation  
**Status**: ✅ Complete with v4.0 enhancements

### 3. ✅ Compliance Readiness
**Folder**: `Compliance Readiness - 01 - Nov 4 2025/`  
**Files**: 1 HTML file + NIST data files  
**Status**: ✅ Self-assessment interface ready

### 4. ✅ GenAI Quantification Model v3
**Folder**: `GenAI Quantification Model - 03- Nov 4 2025/`  
**Files**: 5 HTML files (multi-step workflow)  
**Status**: ✅ Financial quantification workflow

---

## 🎯 Module 1: AI Assurance Plan

### Files
- `ai-assurance-plan.html` (2,633 lines)

### What's Implemented
✅ **Two-View Architecture**
- Actions Center (main table view)
- Kovrr Insights (AI recommendations)

✅ **Controls Gap Analysis Table**
- Columns: Control ID, Name, Status, Current, Target, Gap, Priority (0-100), ROSI %, Stakeholders
- Sortable by Priority and Gap
- Color-coded badges
- Click-to-open drawer

✅ **Right-Drawer with 3 Tabs**
- **Tab 1: Scoring & Prioritization**
  - KPI tiles (Priority, Gap, Reg. Urgency, Benefit Share)
  - Maturity adjustment (Current/Target)
  - Multi-stakeholder configuration (add/remove, influence %, criterion weights, scores)
  - Contributions breakdown table
  - Normalize buttons
- **Tab 2: Remediation Guidance & ROSI**
  - AI chat interface
  - ROSI Calculator (currency, period, costs, savings)
  - Bar chart visualization
  - Formula display
- **Tab 3: Notes & Attachments**
  - Notes list with timestamp, owner, attachment
  - Add note functionality
  - Owner assignment

✅ **Prioritization Methodology**
- Gap calculation: `(target - current) / 4`
- Global weight blending
- Gap-adjusted scoring: `score × (1 + gap)`
- Inverted cost scoring: `6 - score`
- Normalized priority (0-100)

✅ **Pre-populated Data**
- Top 5 controls with complete stakeholder data
- Realistic ROSI values (45% to 180%)
- Chat history for first 2 controls
- Notes and attachments

### Changes Required for React Implementation

#### 1. Convert to React Components
```
<AIAssurancePlan>
  ├─ <AssessmentToolbar />
  ├─ <TabNavigation />
  ├─ <ActionsCenterView>
  │   ├─ <SortingToolbar />
  │   └─ <ControlsTable />
  ├─ <KovrrInsightsView />
  ├─ <ControlDrawer>
  │   ├─ <ScoringTab />
  │   ├─ <RemediationTab />
  │   └─ <NotesTab />
  └─ <ExplainerModal />
```

#### 2. Replace HTML Elements with Design System Components
- `.btn` → `<Button>` from `/components/atoms/button.jsx`
- `.card` → `<Card>` from `/components/atoms/card.jsx`
- `.badge` → `<Badge>` from `/components/atoms/badge.jsx`
- `<table>` → `<Table>` components from `/components/atoms/table.jsx`
- `<input>` → `<Input>` from `/components/atoms/input.jsx`
- `<label>` → `<Label>` from `/components/atoms/label.jsx`

#### 3. State Management
```javascript
const [controls, setControls] = useState([]);
const [selectedControl, setSelectedControl] = useState(null);
const [drawerOpen, setDrawerOpen] = useState(false);
const [activeTab, setActiveTab] = useState('scoring');
const [activeView, setActiveView] = useState('table');
```

#### 4. API Integration Needed
- `GET /api/control-assessments/` - Fetch controls
- `POST /api/stakeholder-prioritizations/` - Save stakeholder configs
- `POST /api/rosi-calculations/` - Save ROSI data
- `POST /api/control-notes/` - Save notes
- `POST /api/ai-chat/` - AI guidance chat

#### 5. Additional Features to Add
- Populate Kovrr Insights content (3-5 AI recommendations)
- Add Priority Scoring Explainer modal content
- Implement filters (Framework, Status, Owner)
- Add search functionality
- CSV/PDF export (future)

---

## 🎯 Module 2: AI Risk Register v4

### Files
- `ai-risk-register-table-v4.html` (main page)
- `ai-risk-scenario-modal-v4.html` (create/edit form)
- `ai-risk-scenario-page-v4.html` (detail view)
- `10-scenarios-data.json` (10 complete scenarios)
- `nist-controls-simple.json` (29 NIST controls)
- `risk-register-options.json` (dropdown options)
- `genai-models.json` (AI models list)

### What's Implemented (v4.0 Enhancements)

✅ **3-Tab Interface**
- **Tab 1: Risk Register Table**
  - 10 pre-populated scenarios
  - Search and filter
  - Click row → detail page
  - Add scenario button → modal
- **Tab 2: Risk Register Visualization**
  - 5×5 risk matrix (was 4×4)
  - Color-coded cells (Critical, High, Medium, Low)
  - Metrics sidebar (total scenarios, by priority)
  - Scenario distribution
- **Tab 3: Kovrr Insights**
  - AI recommendations
  - Chat agent
  - "How Priority Scoring Works" button (ℹ️)
  - Methodology modal

✅ **Create/Edit Modal**
- Fixed Scenario Category dropdown (now opens properly)
- Multi-select fields working
- All form fields from PRD
- Returns to table on submit

✅ **Detail Page**
- 3 tabs: Risk Management, Relevant Controls, Notes
- NIST AI RMF controls displayed (4 controls per scenario)
- Full scenario data
- Back link to main table

✅ **Styling**
- Exact match to AI Assurance Plan
- 38px page title (was 28px)
- Purple hover on buttons: `rgb(97, 94, 251)`
- Consistent icon sizing (16px)

✅ **Data**
- 10 comprehensive scenarios with all fields populated
- 29 NIST AI RMF controls mapped
- MITRE ATLAS tactics
- Impact types, event types, assets
- Priority, status, owner for each

### Changes Required for React Implementation

#### 1. Convert to React Components
```
<RiskRegister>
  ├─ <TabNavigation />
  ├─ <RiskRegisterTable />
  ├─ <RiskVisualization>
  │   ├─ <RiskMatrix5x5 />
  │   └─ <MetricsSidebar />
  ├─ <KovrrInsightsTab>
  │   ├─ <AIRecommendations />
  │   ├─ <ChatAgent />
  │   └─ <MethodologyModal />
  ├─ <ScenarioModal />
  └─ <ScenarioDetailPage>
      ├─ <RiskManagementTab />
      ├─ <RelevantControlsTab />
      └─ <NotesTab />
```

#### 2. Replace with Design System Components
- Same as AI Assurance Plan (Button, Card, Badge, Table, Input, Label)
- Add `<Dialog>` for modal (need to create from Radix UI)
- Add `<Select>` for dropdowns (need to create from Radix UI)
- Add multi-select component

#### 3. State Management
```javascript
const [scenarios, setScenarios] = useState([]);
const [selectedScenario, setSelectedScenario] = useState(null);
const [modalOpen, setModalOpen] = useState(false);
const [activeTab, setActiveTab] = useState('table');
const [filters, setFilters] = useState({});
```

#### 4. API Integration Needed
- `GET /api/risk-scenarios/` - Fetch scenarios
- `POST /api/risk-scenarios/` - Create scenario
- `PUT /api/risk-scenarios/:id/` - Update scenario
- `GET /api/nist-controls/` - Fetch NIST controls
- `POST /api/ai-insights/` - Get AI recommendations
- `POST /api/risk-chat/` - Chat agent

#### 5. Additional Features to Add
- Implement 5×5 risk matrix calculation logic
- Add scenario filtering and search
- Populate "How Priority Scoring Works" modal content
- Implement AI recommendations engine
- Add export functionality (future)

---

## 🎯 Module 3: Compliance Readiness

### Files
- `compliance-readiness.html` (1,943 lines)
- `nist_data.js` (1.4MB - complete NIST AI RMF data)
- `original_NIST_AI_RMF_Structure.json` (5.9MB)

### What's Implemented

✅ **Self-Assessment Interface**
- Framework selection (NIST AI RMF, ISO/IEC 42001, EU AI Act)
- Assessment wizard/questionnaire
- Control-by-control evaluation
- Maturity level selection (1-5)
- Gap identification
- Progress tracking

✅ **NIST AI RMF Integration**
- Complete NIST data structure
- All 4 functions: GOVERN, MAP, MEASURE, MANAGE
- Subcategories and controls
- Implementation guidance

✅ **Assessment Results**
- Overall readiness score
- Breakdown by function
- Gap report
- Control assessment list
- Links to AI Assurance Plan

### Changes Required for React Implementation

#### 1. Convert to React Components
```
<ComplianceReadiness>
  ├─ <FrameworkSelector />
  ├─ <AssessmentWizard>
  │   ├─ <FunctionView />
  │   ├─ <SubcategoryView />
  │   └─ <ControlAssessment />
  ├─ <ProgressTracker />
  ├─ <ResultsSummary>
  │   ├─ <ReadinessScore />
  │   ├─ <GapReport />
  │   └─ <ControlsList />
  └─ <AssessmentModal />
```

#### 2. Replace with Design System Components
- Same as previous modules
- Add stepper/wizard component
- Add progress bar component
- Add radio button groups for maturity levels

#### 3. State Management
```javascript
const [selectedFramework, setSelectedFramework] = useState('nist');
const [assessment, setAssessment] = useState({});
const [currentControl, setCurrentControl] = useState(null);
const [progress, setProgress] = useState(0);
```

#### 4. API Integration Needed
- `GET /api/frameworks/` - Fetch available frameworks
- `GET /api/frameworks/:id/controls/` - Fetch framework controls
- `POST /api/assessments/` - Create assessment
- `PUT /api/assessments/:id/` - Update assessment
- `POST /api/control-assessments/` - Save control assessment
- `GET /api/assessments/:id/results/` - Get results

#### 5. Additional Features to Add
- Implement assessment wizard flow
- Add save/resume functionality
- Calculate readiness score
- Generate gap report
- Link to AI Assurance Plan (auto-populate controls)

---

## 🎯 Module 4: GenAI Quantification Model v3

### Files
- `index.html` (landing page)
- `assumptions.html` (input assumptions)
- `entity_exposure.html` (entity exposure calculation)
- `pending.html` (pending items view)
- `results.html` (final results and visualization)

### What's Implemented

✅ **Multi-Step Workflow**
- Landing page with feature overview
- Step 1: Entity Exposure (select entity type, size, industry)
- Step 2: Assumptions (MITRE ATLAS vectors, NIST controls)
- Step 3: Pending (review before calculation)
- Step 4: Results (AAL, 1-in-100 year loss, damage breakdown)

✅ **MITRE ATLAS Integration**
- 6 initial access vectors
- Attack pattern mapping
- Risk quantification per vector

✅ **NIST AI RMF Controls**
- Control effectiveness evaluation
- Coverage across GOVERN, MAP, MEASURE, MANAGE
- Impact on risk reduction

✅ **Financial Metrics**
- Annual Average Loss (AAL)
- 1-in-100 year loss
- Damage type breakdown
- Visualization charts

### Changes Required for React Implementation

#### 1. Convert to React Components
```
<GenAIQuantification>
  ├─ <LandingPage />
  ├─ <StepWizard>
  │   ├─ <EntityExposureStep />
  │   ├─ <AssumptionsStep>
  │   │   ├─ <MITREVectorSelector />
  │   │   └─ <NISTControlSelector />
  │   ├─ <PendingReviewStep />
  │   └─ <ResultsStep>
  │       ├─ <AALDisplay />
  │       ├─ <LossVisualization />
  │       └─ <DamageBreakdown />
  └─ <ProgressIndicator />
```

#### 2. Replace with Design System Components
- Same as previous modules
- Add stepper component
- Add chart components (need to add chart library like Recharts)
- Add progress indicator

#### 3. State Management
```javascript
const [currentStep, setCurrentStep] = useState(0);
const [entityData, setEntityData] = useState({});
const [assumptions, setAssumptions] = useState({});
const [results, setResults] = useState(null);
```

#### 4. API Integration Needed
- `POST /api/quantification/entity/` - Submit entity data
- `POST /api/quantification/assumptions/` - Submit assumptions
- `POST /api/quantification/calculate/` - Calculate results
- `GET /api/quantification/:id/results/` - Get results

#### 5. Additional Features to Add
- Implement step navigation
- Add validation per step
- Calculate AAL and loss metrics
- Generate visualizations
- Add save/export functionality

---

## 📊 Design System Alignment

### Colors (All Modules Match)
```css
--primary-blue: rgb(85, 81, 247);
--primary-blue-light: rgb(97, 94, 251);
--success-green: rgb(13, 199, 131);
--warning-orange: rgb(255, 153, 0);
--error-red: rgb(255, 35, 35);
--info-blue: rgb(21, 77, 171);
--bg-white: rgb(255, 255, 255);
--bg-light: rgb(245, 247, 255);
--bg-blue: rgb(236, 242, 252);
--bg-gray: rgb(237, 242, 247);
--text-dark: rgb(26, 32, 44);
--text-medium-dark: rgb(48, 48, 69);
--text-medium: rgb(74, 85, 104);
--text-light: rgb(113, 118, 126);
--divider: rgb(220, 229, 242);
```

### Typography
- Font: Source Sans Pro
- Weights: 400, 600, 700
- Page Title: 38px, font-weight 700, letter-spacing -0.5px
- Section Headings: 26px, font-weight 700
- Subheadings: 20px, font-weight 600
- Body: 14px, font-weight 400

### Border Radius
- Cards: 15px
- Buttons: 6px
- Inputs: 6px
- Badges: 6px
- Modals: 15-16px

### Spacing
- Container padding: 30px
- Card padding: 20px
- Section margins: 24px
- Element gaps: 8px, 12px, 16px

---

## 🔧 Common Components Needed

### Atoms (Already Created)
✅ Button  
✅ Card  
✅ Badge  
✅ Input  
✅ Label  
✅ Table  

### Atoms (Need to Create)
❌ Dialog (modal)  
❌ Select (dropdown)  
❌ Checkbox  
❌ Radio  
❌ Tooltip  
❌ Separator  
❌ Progress  
❌ Tabs  

### Molecules (Need to Create)
❌ DataTable (with sorting, filtering, pagination)  
❌ RiskMatrix5x5  
❌ ChartComponents (bar, line, pie)  
❌ StepWizard  
❌ MultiSelect  
❌ FileUpload  
❌ ChatInterface  
❌ FormGroup  

---

## 🚀 Implementation Priority

### Phase 1: Core Components (Week 1)
1. Create missing atom components (Dialog, Select, Checkbox, Radio, Tooltip, Tabs)
2. Create DataTable molecule
3. Create ChatInterface molecule

### Phase 2: AI Assurance Plan (Week 2)
1. Convert HTML to React components
2. Integrate with backend APIs
3. Implement prioritization logic
4. Add ROSI calculator
5. Test and refine

### Phase 3: Risk Register (Week 3)
1. Convert HTML to React components
2. Create RiskMatrix5x5 component
3. Integrate with backend APIs
4. Implement AI insights
5. Test and refine

### Phase 4: Compliance Readiness (Week 4)
1. Convert HTML to React components
2. Create assessment wizard
3. Integrate NIST data
4. Implement scoring logic
5. Test and refine

### Phase 5: GenAI Quantification (Week 5)
1. Convert HTML to React components
2. Create step wizard
3. Add chart components
4. Implement calculation logic
5. Test and refine

---

## 📋 Backend API Requirements

### AI Assurance Plan APIs
- `GET /api/control-assessments/`
- `POST /api/control-assessments/`
- `PUT /api/control-assessments/:id/`
- `POST /api/stakeholder-prioritizations/`
- `POST /api/rosi-calculations/`
- `POST /api/rosi-cost-items/`
- `POST /api/rosi-savings-items/`
- `POST /api/control-notes/`
- `POST /api/ai-chat/remediation/`

### Risk Register APIs
- `GET /api/risk-scenarios/`
- `POST /api/risk-scenarios/`
- `PUT /api/risk-scenarios/:id/`
- `DELETE /api/risk-scenarios/:id/`
- `GET /api/nist-controls/`
- `POST /api/ai-insights/risk/`
- `POST /api/risk-chat/`

### Compliance Readiness APIs
- `GET /api/frameworks/`
- `GET /api/frameworks/:id/controls/`
- `POST /api/assessments/`
- `PUT /api/assessments/:id/`
- `POST /api/control-assessments/`
- `GET /api/assessments/:id/results/`

### GenAI Quantification APIs
- `POST /api/quantification/entity/`
- `POST /api/quantification/assumptions/`
- `POST /api/quantification/calculate/`
- `GET /api/quantification/:id/results/`

---

## ✅ Summary

### What We Have
✅ 4 complete HTML mockups with realistic data  
✅ Consistent design system across all modules  
✅ Detailed functionality specifications  
✅ Pre-populated data for testing  
✅ Cross-referenced workflows  

### What We Need
❌ Convert HTML to React components  
❌ Create missing atom/molecule components  
❌ Integrate with Django backend APIs  
❌ Implement business logic (calculations, scoring)  
❌ Add state management (Context API or Redux)  
❌ Testing and refinement  

### Estimated Timeline
- **Phase 1 (Components)**: 1 week
- **Phase 2 (AI Assurance Plan)**: 1 week
- **Phase 3 (Risk Register)**: 1 week
- **Phase 4 (Compliance Readiness)**: 1 week
- **Phase 5 (GenAI Quantification)**: 1 week
- **Total**: 5 weeks for complete implementation

---

**Ready to start implementation!** 🚀
