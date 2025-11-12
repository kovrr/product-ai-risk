# AIKovrr Face Lifting - Complete Gap Analysis

**Date:** November 12, 2025  
**Purpose:** Map exact gaps between HTML mockups and current React implementation  
**Approach:** Module-by-module analysis with CSS, HTML structure, and backend changes

---

## 📋 Summary Table

| Module | CSS Changes | HTML Structure | Backend Changes | Priority |
|--------|-------------|----------------|-----------------|----------|
| Dashboard | Major | Complete Rebuild | ✅ None | HIGH |
| Assets Visibility | Minor | Small Updates | ✅ None | MEDIUM |
| Risk Register | Minor | Color Updates | ✅ None | LOW |
| Compliance Readiness | Major | New Components | ✅ None | HIGH |
| AI Assurance Plan | Major | Right Drawer | ✅ None | HIGH |
| Financial Quantification | Major | Complete Rebuild | 🔴 Required | HIGH |

---

## 1. Dashboard (Hero Dashboard)

**HTML:** `hero-dashboard-final.html`  
**Current:** `/frontend/src/pages/Dashboard.jsx`  
**Status:** 🔴 COMPLETE REBUILD REQUIRED

### CSS Gaps

**Missing Entirely:**
- Tab navigation system (3 tabs)
- Intelligence card grid (2x2)
- Portfolio metric cards
- Kovrr insights cards
- D3.js visualization containers
- Chart.js containers

**Key CSS Classes Needed:**
```css
.tab-navigation { /* 3-tab system */ }
.tab-button.active { border-bottom: 3px solid rgb(85,81,247); }
.intelligence-grid { grid-template-columns: repeat(2, 1fr); }
.intelligence-card { min-height: 500px; }
.portfolio-metric { font-size: 32px; font-weight: 700; }
.actionable-steps li:before { content: "→"; }
```

### HTML Structure Gaps

**Current Structure:**
```
- Action buttons (6)
- Stats grid (4 cards)
- Asset widgets (2 cards)
```

**Target Structure:**
```
- Tab Navigation (3 tabs)
  - Risk Intelligence (4 visualizations)
  - Portfolio Health (5 metric cards)
  - Kovrr Insights (6 recommendation cards)
```

### Backend Changes
✅ **NO BACKEND CHANGES** - Use existing data + client-side aggregation

### Dependencies
```bash
npm install d3 d3-sankey chart.js react-chartjs-2
```

### Implementation Tasks
1. Install dependencies
2. Create TabNavigation component
3. Create 4 visualization components (DotMatrix, Sankey, Quadrant, Treemap)
4. Create PortfolioHealthCards (5 cards)
5. Create KovrrInsightsCards (6 cards)
6. Rebuild Dashboard.jsx with tab structure

---

## 2. AI Assets Visibility

**HTML:** `modules/ai-assets-list.html`  
**Current:** `/frontend/src/pages/AssetsVisibility/AssetsListView.tsx`  
**Status:** ⚠️ MINOR UPDATES NEEDED

### CSS Gaps

**Adjustments Needed:**
- Stats grid: Change from 6 to 5 columns
- Table hover: `background-color: rgb(236, 242, 252);`
- Risk progress bar component (new)

**New CSS:**
```css
.risk-progress { display: flex; gap: 8px; }
.risk-bar { height: 8px; background: rgb(237,242,247); }
.risk-fill.high { background: rgb(224,80,43); }
.discovery-modal { /* 2-card grid */ }
```

### HTML Structure Gaps

**Changes:**
1. Replace RiskScoreBadge with RiskProgressBar in table
2. Add DiscoveryModal component (2 cards: Manual/Automated)

### Backend Changes
✅ **NO BACKEND CHANGES**

### Implementation Tasks
1. Update stats grid columns (6→5)
2. Create RiskProgressBar component
3. Create DiscoveryModal component
4. Update table cell to use progress bar
5. Adjust hover colors

---

## 3. AI Risk Register

**HTML:** `modules/ai-risk-register-table-v4.html`  
**Current:** `/frontend/src/pages/RiskRegister.jsx`  
**Status:** ✅ MINOR COLOR UPDATES

### CSS Gaps

**Matrix Colors - Diagonal Gradient:**
```css
/* Current: Simple 4-color scheme */
/* Target: 25 unique colors (5x5 diagonal gradient) */

.matrix-cell.severe-expected { background: rgba(255,77,79,0.65); }
.matrix-cell.severe-likely { background: rgba(255,99,97,0.6); }
/* ... 23 more color variations */
```

### HTML Structure Gaps
- Add cell count badges
- Add scenario IDs in cells
- Metrics sidebar already exists

### Backend Changes
✅ **NO BACKEND CHANGES**

### Implementation Tasks
1. Update matrix cell colors (25 variations)
2. Add cell count badges
3. Add scenario IDs to cells
4. Test matrix interactivity

---

## 4. Compliance Readiness

**HTML:** `modules/compliance-readiness-fixed.html`  
**Current:** `/frontend/src/pages/ComplianceReadiness.jsx`  
**Status:** 🔴 MAJOR REBUILD REQUIRED

### CSS Gaps

**Missing:**
- Assessment card grid
- Circular progress chart
- Expandable table rows
- Maturity indicators
- Function tabs

**Key CSS:**
```css
.assessment-card:hover { transform: translateY(-2px); }
.circular-progress { width: 120px; height: 120px; }
.control-row.expanded { background: rgba(85,81,247,0.02); }
.maturity-dot.filled { background: rgb(85,81,247); }
```

### HTML Structure Gaps

**New Components Needed:**
1. AssessmentCard (grid layout)
2. CircularProgress (maturity chart)
3. ExpandableControlRow
4. MaturityIndicator (dots)
5. FunctionTabs

### Backend Changes
✅ **NO BACKEND CHANGES**

### Implementation Tasks
1. Create AssessmentCard component
2. Create CircularProgress component
3. Create ExpandableControlRow
4. Create MaturityIndicator
5. Add function tabs
6. Implement assessment selection

---

## 5. AI Assurance Plan

**HTML:** `modules/ai-assurance-plan-fixed.html`  
**Current:** `/frontend/src/pages/AIAssurancePlan.jsx`  
**Status:** 🔴 RIGHT DRAWER REQUIRED

### CSS Gaps

**Missing:**
- Right drawer (slide-in panel)
- 3-tab drawer system
- ROSI calculator
- Priority score visualization

**Key CSS:**
```css
.right-drawer { 
  position: fixed; 
  right: 0; 
  width: 600px; 
  height: 100vh;
  transform: translateX(100%);
  transition: transform 0.3s;
}
.right-drawer.open { transform: translateX(0); }
```

### HTML Structure Gaps

**New Components:**
1. RightDrawer (slide-in panel)
2. DrawerTabs (3 tabs: Scoring, ROSI, Notes)
3. PrioritizationForm
4. ROSICalculator
5. NotesAttachments

### Backend Changes
✅ **NO BACKEND CHANGES** (initially - can add later)

### Implementation Tasks
1. Create RightDrawer component
2. Create DrawerTabs
3. Create PrioritizationForm
4. Create ROSICalculator
5. Create NotesAttachments
6. Add drawer trigger from table

---

## 6. GenAI Exposure - Financial Quantification

**HTML:** `modules/entity_exposure.html`  
**Current:** `/frontend/src/pages/FinancialQuantification.jsx`  
**Status:** 🔴 BACKEND REQUIRED

### CSS Gaps

**Major Updates:**
- Form styling
- Results visualization
- Loss distribution chart
- Scenario breakdown

### HTML Structure Gaps

**Multi-step Form:**
1. Entity Information
2. Scenario Selection
3. Assumptions
4. Results

### Backend Changes
🔴 **BACKEND REQUIRED**

**New Endpoints:**
```
POST /api/financial-quantification/calculate/
  - Input: entity data, scenarios, assumptions
  - Output: AAL, loss distribution, metrics

GET /api/financial-quantification/scenarios/
  - Output: Available risk scenarios
```

### Implementation Tasks
1. Backend: Create calculation endpoint
2. Backend: Implement loss distribution model
3. Frontend: Multi-step form
4. Frontend: Results visualization
5. Frontend: Chart.js integration

---

## Implementation Priority

### Phase 1: High Impact, No Backend (Week 1-2)
1. ✅ Dashboard rebuild
2. ✅ Compliance Readiness rebuild
3. ✅ AI Assurance Plan (Right Drawer)

### Phase 2: Medium Impact (Week 3)
4. ✅ Assets Visibility updates
5. ✅ Risk Register color updates

### Phase 3: Backend Required (Week 4)
6. 🔴 Financial Quantification (requires backend)

---

## Dependencies Summary

```json
{
  "d3": "^7.8.5",
  "d3-sankey": "^0.12.3",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0"
}
```

---

## Approval Checklist

- [ ] Dashboard: Tab navigation + 4 visualizations + 2 metric views
- [ ] Assets: Progress bars + discovery modal
- [ ] Risk Register: Matrix color gradient
- [ ] Compliance: Assessment cards + expandable rows
- [ ] Assurance Plan: Right drawer + 3 tabs
- [ ] Financial: Multi-step form + backend API

**Ready for approval and module-by-module implementation.**
