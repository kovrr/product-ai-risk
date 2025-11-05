# AI Risk Register - Gap Analysis

**Date**: November 5, 2025  
**Comparing**: Design Specs (HTML mockups) vs Current Implementation  
**Status**: Major gaps identified - significant work required

---

## 📋 Executive Summary

The current Risk Register implementation is **basic** compared to the detailed design specifications. We have approximately **20% of the required functionality** implemented.

### Current State:
- ✅ Basic table with 5 risk scenarios
- ✅ "Affected Assets" column
- ✅ Priority and status badges
- ❌ Missing 80% of designed features

### Design Spec State:
- 10 detailed risk scenarios
- 3-tab interface (Table, Visualization, Kovrr Insights)
- Risk matrix visualization
- AI-powered insights and chat
- Comprehensive risk detail pages
- Full CRUD operations

---

## 🎯 Gap Analysis by Component

---

## 1. RISK REGISTER TABLE VIEW

### ✅ What We Have:
- Basic table with columns: Name, Priority, Likelihood, Impact, Status, Owner
- "Affected Assets" column with count
- "View →" link to filtered assets
- Priority badges (Critical, High, Medium, Low)
- 5 risk scenarios with mock data

### ❌ What's Missing:

#### Table Enhancements:
- **Risk ID column** (AIR-001, AIR-002, etc.) - Not implemented
- **Category column** (Privacy Risk, Security Risk, Bias/Fairness, Safety, Legal/Compliance) - Not implemented
- **Clickable rows** - Currently disabled (we removed navigation)
- **Search functionality** - Not implemented
- **Sortable columns** - Not implemented
- **10 risk scenarios** - We only have 5

#### Missing Risk Categories:
Design has 5 categories:
1. Privacy Risk
2. Security Risk  
3. Bias/Fairness Risk
4. Safety Risk
5. Legal/Compliance Risk

Current: No category field in mock data

#### Missing Risk Scenarios:
Design has 10 risks, we have 5. Missing:
- Biometric Data Misuse
- Model Poisoning Attack
- Discriminatory Hiring Recommendations
- Prompt Injection Data Leakage
- Hallucinated Medical Recommendations
- Deepfake Executive Fraud
- Copyright Infringement in Training Data
- Automated Credit Denial Bias
- Customer Service Bot Privacy Leak
- Autonomous Vehicle Safety Failure

---

## 2. RISK VISUALIZATION TAB

### ✅ What We Have:
- **NOTHING** - This entire tab doesn't exist

### ❌ What's Missing:

#### Risk Prioritization Matrix (5×5):
- **Interactive heat map** showing Impact vs Likelihood
- **5 Impact levels**: Severe, Significant, Moderate, Minor, Negligible
- **5 Likelihood levels**: Expected, Possible, Unlikely, Rare, Very Rare
- **Risk placement** in matrix cells with scenario IDs
- **Cell counts** showing number of risks per cell
- **Color coding**: Severe (red), Significant (orange), Moderate (yellow), Minor/Negligible (gray)
- **Clickable cells** to filter risks
- **Hover effects** with scenario details

#### Metrics Sidebar:
1. **Top AI Assets by Risk Count**:
   - Shows which assets have most risks
   - Example: "OpenAI - GPT-4 Turbo: 3 risks"
   - Clickable to view asset details

2. **Most Common MITRE ATLAS Tactics**:
   - Shows attack tactics from MITRE ATLAS framework
   - Example: "Phishing (AML.T0052): 3"
   - Links to MITRE documentation

3. **Impact Type Distribution**:
   - Financial Loss
   - Reputational Damage
   - Regulatory Penalties
   - Operational Disruption
   - Data Breach
   - Safety Incidents

**Complexity**: HIGH - Requires:
- D3.js or similar visualization library
- Interactive matrix component
- MITRE ATLAS taxonomy integration
- Real-time metrics calculation

---

## 3. KOVRR INSIGHTS TAB

### ✅ What We Have:
- **NOTHING** - This entire tab doesn't exist

### ❌ What's Missing:

#### AI-Powered Analysis Form:
- **Risk Profile Selector**: Dropdown to select risk scenarios
- **Time Horizon**: Short-term, Medium-term, Long-term
- **Industry Context**: Financial Services, Healthcare, Retail, etc.
- **Regulatory Framework**: GDPR, CCPA, HIPAA, etc.
- **"Analyze with Kovrr AI" button**

#### Recommendations Panel:
- **AI-generated recommendations** based on selected parameters
- **Recommendation cards** with:
  - Title (e.g., "Implement Data Minimization")
  - Detailed explanation
  - Priority level
  - Estimated effort
  - Expected impact

#### AI Chat Interface:
- **Chat messages area** (scrollable, max 400px height)
- **User messages** (right-aligned, blue background)
- **AI agent messages** (left-aligned, gray background)
- **Chat input field** with send button
- **Context-aware responses** about risks
- **Follow-up questions** capability

**Complexity**: VERY HIGH - Requires:
- AI/LLM integration (OpenAI API or similar)
- Chat UI components
- Recommendation engine
- Context management
- Streaming responses

---

## 4. ADD RISK SCENARIO MODAL

### ✅ What We Have:
- **NOTHING** - No create/edit functionality

### ❌ What's Missing:

#### Modal Form Sections:

**1. Basic Information**:
- Scenario Name* (required)
- Category* (dropdown: Privacy, Security, Bias/Fairness, Safety, Legal/Compliance)
- Description* (textarea)
- Risk Owner* (user selector)

**2. Risk Assessment**:
- Impact Level* (dropdown: Severe, Significant, Moderate, Minor, Negligible)
- Likelihood* (dropdown: Expected, Possible, Unlikely, Rare, Very Rare)
- Priority (auto-calculated from Impact × Likelihood)
- Status (dropdown: Identified, Under Assessment, Plan in Progress, Response Plan Decided)

**3. Affected Assets**:
- Multi-select dropdown with search
- Shows selected assets as tags
- Can remove selected assets
- Links to asset details

**4. MITRE ATLAS Mapping**:
- Multi-select for MITRE ATLAS tactics/techniques
- Shows selected tactics as tags
- Helper icon with tooltip
- Examples: "Phishing (AML.T0052)", "AI Supply Chain: Model"

**5. Impact Details**:
- Financial Impact (currency input)
- Reputational Impact (text)
- Regulatory Impact (text)
- Operational Impact (text)

**6. Mitigation Strategy**:
- Current Controls (textarea)
- Planned Controls (textarea)
- Mitigation Timeline (date picker)
- Residual Risk Level (dropdown)

**Form Features**:
- Required field indicators (red asterisk)
- Helper icons with tooltips
- Form validation
- Save/Cancel buttons
- Auto-save draft capability

**Complexity**: HIGH - Requires:
- Modal component
- Form validation library (react-hook-form + zod)
- Multi-select components
- Date picker
- MITRE ATLAS taxonomy data
- Asset picker integration

---

## 5. RISK SCENARIO DETAIL PAGE

### ✅ What We Have:
- **NOTHING** - No detail pages exist

### ❌ What's Missing:

#### Page Layout:
- **2-column grid**: Main content (2fr) + Sidebar (1fr)
- **Back link** to Risk Register
- **Sticky sidebar** for tabs

#### Header Card:
- **Risk ID** (e.g., AIR-001)
- **Scenario Title** (large, bold)
- **Description** (paragraph)
- **Category Tags** (pills showing all categories)

#### Metrics Overview Card:
- **Impact Badge** (large, colored)
- **Likelihood Badge** (large, colored)
- **Edit icons** for inline editing

#### Quantification Card:
- **3-column metrics grid**:
  1. **Expected Annual Loss (EAL)**:
     - Value: $2.4M
     - Description explaining calculation
  2. **Value at Risk (VaR 95%)**:
     - Value: $8.7M
     - Description of 95th percentile
  3. **Maximum Probable Loss**:
     - Value: $15.2M
     - Worst-case scenario

#### Data Exposure Section:
- **Records at Risk**: 125,000
- **Data Types**: PII, Financial, Health, Biometric
- **Jurisdictions**: US, EU, UK, CA
- **Regulatory Frameworks**: GDPR, CCPA, HIPAA

#### Loss Distribution Section:
- **Monte Carlo simulation results**
- **Distribution table**:
  - Percentile (50th, 75th, 90th, 95th, 99th)
  - Loss Amount
  - Probability
- **Description** of methodology

#### Right Sidebar Tabs:

**Tab 1: Affected Assets (count)**:
- List of linked assets
- Asset name, type, status
- Risk score per asset
- Click to view asset detail

**Tab 2: Mitigation (count)**:
- Current controls applied
- Control ID, name, status
- Effectiveness rating
- Planned controls
- Timeline and owner

**Tab 3: Activity Log**:
- Chronological history
- User actions (created, updated, assessed)
- Timestamps
- Comments and notes
- Status changes

**Complexity**: VERY HIGH - Requires:
- Full page component
- Financial modeling for EAL/VaR/MPL
- Monte Carlo simulation
- Activity logging system
- Tabs component
- Asset/control integration

---

## 6. DATA MODEL GAPS

### Current Mock Data (mock-risks.ts):
```typescript
interface RiskScenario {
  id: number;
  name: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  likelihood: string;
  impact: string;
  status: string;
  owner: string;
}
```

### Required Data Model:
```typescript
interface RiskScenario {
  // Basic Info
  id: number;
  risk_id: string;              // ❌ Missing (AIR-001)
  name: string;                 // ✅ Have
  description: string;          // ✅ Have
  category: RiskCategory;       // ❌ Missing
  owner_id: number;             // ❌ Missing (have email string)
  
  // Assessment
  priority: Priority;           // ✅ Have
  impact_level: ImpactLevel;    // ❌ Missing (have string)
  likelihood_level: Likelihood; // ❌ Missing (have string)
  status: RiskStatus;           // ✅ Have
  
  // Quantification
  expected_annual_loss: number; // ❌ Missing
  value_at_risk_95: number;     // ❌ Missing
  maximum_probable_loss: number;// ❌ Missing
  records_at_risk: number;      // ❌ Missing
  
  // MITRE ATLAS
  mitre_tactics: string[];      // ❌ Missing
  mitre_techniques: string[];   // ❌ Missing
  
  // Impact Details
  financial_impact: number;     // ❌ Missing
  reputational_impact: string;  // ❌ Missing
  regulatory_impact: string;    // ❌ Missing
  operational_impact: string;   // ❌ Missing
  
  // Mitigation
  current_controls: string[];   // ❌ Missing
  planned_controls: string[];   // ❌ Missing
  mitigation_timeline: Date;    // ❌ Missing
  residual_risk_level: string;  // ❌ Missing
  
  // Data Exposure
  data_types: string[];         // ❌ Missing
  jurisdictions: string[];      // ❌ Missing
  regulatory_frameworks: string[]; // ❌ Missing
  
  // Distribution
  loss_distribution: {          // ❌ Missing
    percentile: number;
    loss_amount: number;
    probability: number;
  }[];
  
  // Metadata
  created_at: Date;             // ❌ Missing
  updated_at: Date;             // ❌ Missing
  created_by: number;           // ❌ Missing
  last_assessed_at: Date;       // ❌ Missing
}
```

**Missing Fields**: 25+ fields

---

## 7. INTEGRATION GAPS

### Current Integrations:
- ✅ Asset-Risk links (14 links)
- ✅ Navigate to filtered assets

### Missing Integrations:
- ❌ **Control-Risk links**: Which controls mitigate which risks
- ❌ **MITRE ATLAS taxonomy**: Attack tactics and techniques
- ❌ **Financial quantification**: EAL, VaR, MPL calculations
- ❌ **Activity logging**: Track changes and assessments
- ❌ **AI/LLM integration**: Kovrr Insights chat
- ❌ **Monte Carlo simulation**: Loss distribution modeling
- ❌ **Notification system**: Alert on risk changes
- ❌ **Export functionality**: PDF/CSV export of risks

---

## 8. UI/UX GAPS

### Current UI:
- Basic table
- Simple badges
- Minimal styling

### Missing UI Elements:
- ❌ **Tabs component** (3 tabs: Table, Visualization, Insights)
- ❌ **Search bar** with icon
- ❌ **Risk matrix** heat map
- ❌ **Metrics cards** in sidebar
- ❌ **Modal dialogs** for create/edit
- ❌ **Multi-select dropdowns** with tags
- ❌ **Chat interface** for AI insights
- ❌ **Form validation** with error messages
- ❌ **Loading states** for async operations
- ❌ **Empty states** for no data
- ❌ **Tooltips** for helper icons
- ❌ **Date pickers** for timelines
- ❌ **Currency inputs** for financial data
- ❌ **Activity timeline** component
- ❌ **Distribution charts** for loss modeling

---

## 9. FUNCTIONAL GAPS

### Current Functionality:
- ✅ View list of risks
- ✅ See affected assets count
- ✅ Navigate to filtered assets
- ✅ Display priority/status badges

### Missing Functionality:
- ❌ **Create new risk scenario**
- ❌ **Edit existing risk**
- ❌ **Delete risk**
- ❌ **Search/filter risks**
- ❌ **Sort by columns**
- ❌ **View risk detail page**
- ❌ **Visualize risk matrix**
- ❌ **Calculate financial metrics**
- ❌ **Run Monte Carlo simulations**
- ❌ **Get AI recommendations**
- ❌ **Chat with AI about risks**
- ❌ **Link/unlink assets**
- ❌ **Link/unlink controls**
- ❌ **Map MITRE ATLAS tactics**
- ❌ **Track activity history**
- ❌ **Export risks to PDF/CSV**
- ❌ **Bulk operations**
- ❌ **Risk assessment workflow**

---

## 📊 Implementation Complexity Estimate

| Component | Complexity | Est. Time | Priority |
|-----------|------------|-----------|----------|
| **Risk Table Enhancements** | Medium | 2-3 days | High |
| **Risk Detail Page** | High | 5-7 days | High |
| **Create/Edit Modal** | High | 4-5 days | High |
| **Risk Matrix Visualization** | High | 5-7 days | Medium |
| **Kovrr Insights (AI Chat)** | Very High | 10-14 days | Medium |
| **Financial Quantification** | Very High | 14-21 days | Low |
| **MITRE ATLAS Integration** | Medium | 3-4 days | Medium |
| **Activity Logging** | Medium | 3-4 days | Low |
| **Export Functionality** | Low | 2-3 days | Low |

**Total Estimated Time**: 48-68 days (9-13 weeks) for full implementation

---

## 🎯 Recommended Implementation Phases

### Phase 1: Core CRUD (2-3 weeks)
**Priority**: HIGH
1. Enhance risk table (ID, category, search, sort)
2. Create risk detail page (basic version)
3. Add create/edit modal
4. Update data model with all required fields
5. Implement form validation

**Deliverables**:
- Full CRUD operations
- 10 risk scenarios with complete data
- Basic detail view
- Form-based creation/editing

### Phase 2: Visualization (2-3 weeks)
**Priority**: MEDIUM
1. Build risk matrix (5×5 heat map)
2. Add metrics sidebar
3. Implement MITRE ATLAS taxonomy
4. Add interactive filtering

**Deliverables**:
- Risk visualization tab
- Interactive matrix
- Metrics dashboard
- MITRE mapping

### Phase 3: AI Insights (3-4 weeks)
**Priority**: MEDIUM
1. Integrate AI/LLM API
2. Build chat interface
3. Implement recommendation engine
4. Add context management

**Deliverables**:
- Kovrr Insights tab
- AI chat functionality
- Automated recommendations
- Context-aware responses

### Phase 4: Quantification (4-5 weeks)
**Priority**: LOW
1. Implement financial modeling
2. Build Monte Carlo simulation
3. Add loss distribution charts
4. Calculate EAL/VaR/MPL

**Deliverables**:
- Financial metrics
- Simulation results
- Distribution visualization
- Quantified risk exposure

### Phase 5: Polish & Integration (1-2 weeks)
**Priority**: MEDIUM
1. Activity logging
2. Export functionality
3. Notifications
4. Performance optimization

**Deliverables**:
- Complete feature set
- Production-ready code
- Full documentation

---

## 🚨 Critical Gaps Summary

### Must-Have (Phase 1):
1. ❌ Risk ID field (AIR-001, AIR-002, etc.)
2. ❌ Category field (5 categories)
3. ❌ Risk detail page
4. ❌ Create/edit modal
5. ❌ Complete data model (25+ fields)
6. ❌ Form validation
7. ❌ Search functionality
8. ❌ Sortable columns

### Should-Have (Phase 2):
1. ❌ Risk matrix visualization
2. ❌ Metrics sidebar
3. ❌ MITRE ATLAS integration
4. ❌ Interactive filtering

### Nice-to-Have (Phase 3-4):
1. ❌ AI chat interface
2. ❌ Financial quantification
3. ❌ Monte Carlo simulation
4. ❌ Activity logging
5. ❌ Export functionality

---

## 💡 Quick Wins (Low-Hanging Fruit)

These can be implemented quickly to improve the current state:

1. **Add Risk ID column** (2 hours)
   - Add `risk_id` field to mock data
   - Display in table

2. **Add Category column** (3 hours)
   - Add `category` field to mock data
   - Display with color-coded badges

3. **Expand to 10 risks** (2 hours)
   - Add 5 more risk scenarios to mock data

4. **Add search bar** (4 hours)
   - Simple text search across name/description

5. **Make columns sortable** (4 hours)
   - Add sort functionality to table

**Total Quick Wins**: ~15 hours (2 days)

---

## 📈 Current vs Target State

### Current Implementation: 20%
- ✅ Basic table (10%)
- ✅ Affected assets link (5%)
- ✅ Priority badges (5%)

### Target Implementation: 100%
- Risk table with full features (15%)
- Risk detail page (20%)
- Create/edit modal (15%)
- Risk matrix visualization (15%)
- Kovrr Insights + AI chat (20%)
- Financial quantification (10%)
- Activity logging (5%)

---

## 🎯 Next Steps

### Immediate (This Week):
1. Review this gap analysis with stakeholders
2. Prioritize features based on business value
3. Decide on phased approach vs full implementation
4. Allocate resources and timeline

### Short-term (Next 2 Weeks):
1. Implement Quick Wins (2 days)
2. Start Phase 1: Core CRUD (2-3 weeks)
3. Update mock data with complete fields
4. Build risk detail page skeleton

### Medium-term (Next 1-2 Months):
1. Complete Phase 1 & 2
2. User testing and feedback
3. Iterate based on feedback
4. Plan Phase 3 (AI features)

---

**The Risk Register module requires significant development effort to match the design specifications. Recommend phased approach starting with core CRUD functionality.**
