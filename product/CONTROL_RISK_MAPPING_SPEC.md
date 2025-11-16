# Control-to-Risk Mapping Specification

**Created**: November 16, 2025  
**Status**: Proposed Enhancement  
**Feedback Source**: First Frontier (Dave) - CISO Brief View

---

## Problem Statement

**Feedback**: "How do you connect controls to the risks provided in the graph in the Hero Dashboard, specifically the CISO brief view?"

**Current Gap**: The Hero Dashboard shows:
- Risk distribution by category (Data Privacy, Model Bias, Security, Compliance, Operational)
- Control maturity gaps from Compliance Readiness
- But **no visual connection** between which controls mitigate which risks

**Business Impact**: CISOs need to understand:
1. Which controls address their highest-priority risks
2. Where control gaps leave them exposed
3. ROI of implementing specific controls (risk reduction value)

---

## Proposed Solution: Control-Risk Mapping Matrix

### 1. Data Model Enhancement

#### New Table: `control_risk_mapping`
```sql
CREATE TABLE control_risk_mapping (
    id SERIAL PRIMARY KEY,
    control_id VARCHAR(50) NOT NULL,  -- e.g., "GOVERN-1.1"
    risk_category VARCHAR(50) NOT NULL,  -- e.g., "Data Privacy"
    mitigation_strength VARCHAR(20),  -- "Primary", "Secondary", "Tertiary"
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (control_id) REFERENCES controls(control_id)
);
```

**Note**: Control effectiveness percentage removed - cannot be reliably determined without organizational feedback mechanisms.

#### Example Data:
| control_id | risk_category | mitigation_strength |
|------------|---------------|---------------------|
| GOVERN-1.1 | Data Privacy | Primary |
| GOVERN-1.1 | Compliance | Secondary |
| MAP-2.1 | Data Privacy | Primary |
| MAP-2.1 | Security | Secondary |
| MANAGE-3.1 | Model Bias | Primary |
| MANAGE-3.1 | Operational | Tertiary |

---

### 2. Hero Dashboard Enhancement: CISO Brief View

#### New Section: "Risk-Control Coverage Matrix"

**Visual Design**: Interactive heat map or Sankey diagram

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Risk-Control Coverage Matrix                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Risk Categories          Controls Addressing Risk          │
│  ┌──────────────────┐    ┌────────────────────────────┐   │
│  │ 🔴 Data Privacy  │────│ GOVERN-1.1 (Gap: 3 levels)│   │
│  │    12 scenarios  │    │ MAP-2.1    (Gap: 2 levels)│   │
│  │    $8.5M AAL     │    │ MANAGE-1.2 (Gap: 4 levels)│   │
│  └──────────────────┘    └────────────────────────────┘   │
│                                                              │
│  ┌──────────────────┐    ┌────────────────────────────┐   │
│  │ 🟠 Model Bias    │────│ MANAGE-3.1 (Gap: 3 levels)│   │
│  │    8 scenarios   │    │ MEASURE-2.1 (Gap: 2 levels)│   │
│  │    $4.2M AAL     │    └────────────────────────────┘   │
│  └──────────────────┘                                       │
│                                                              │
│  ┌──────────────────┐    ┌────────────────────────────┐   │
│  │ 🟡 Security      │────│ MAP-2.1    (Gap: 2 levels)│   │
│  │    5 scenarios   │    │ GOVERN-4.1 (Gap: 1 level) │   │
│  │    $3.1M AAL     │    └────────────────────────────┘   │
│  └──────────────────┘                                       │
│                                                              │
│  [View Detailed Coverage Report →]                          │
└─────────────────────────────────────────────────────────────┘
```

**Color Coding**:
- 🔴 **Red**: High risk, large control gaps (Gap ≥ 3 levels)
- 🟠 **Orange**: Medium risk, moderate gaps (Gap = 2 levels)
- 🟢 **Green**: Low risk, minimal gaps (Gap ≤ 1 level)

**Interaction**:
- Click risk category → Navigate to Risk Register filtered by category
- Click control → Navigate to AI Assurance Plan with control selected
- Hover → Show tooltip with:
  - Risk count in category
  - Total AAL (Annual Aggregate Loss)
  - Mitigation strength (Primary/Secondary/Tertiary)
  - Current vs target maturity

---

### 3. Enhanced Risk Distribution Chart

**Current**: Simple bar/pie chart showing risk count by category

**Enhanced**: Stacked bar chart showing:
- **Bottom layer (Red)**: Risks with no control coverage
- **Middle layer (Yellow)**: Risks with partial control coverage (gaps exist)
- **Top layer (Green)**: Risks with full control coverage (target maturity reached)

**Example**:
```
Data Privacy    ████████████░░░░  (8 covered, 4 gaps)
Model Bias      ██████░░░░░░░░░░  (4 covered, 4 gaps)
Security        ████████████████  (5 covered, 0 gaps)
Compliance      ██████████░░░░░░  (6 covered, 3 gaps)
Operational     ████████░░░░░░░░  (5 covered, 3 gaps)
```

**Legend**:
- 🟢 Green: Risks fully mitigated (controls at target maturity)
- 🟡 Yellow: Risks partially mitigated (controls have gaps)
- 🔴 Red: Risks unmitigated (no controls assigned)

---

### 4. New Widget: "Top Control Priorities by Risk Coverage"

**Purpose**: Show which controls address the most risks and have the largest gaps

**Data Source**: 
```sql
SELECT 
    c.control_id,
    c.control_name,
    c.gap_normalized,
    c.priority_score,
    COUNT(DISTINCT r.risk_id) as risks_addressed,
    COUNT(DISTINCT CASE WHEN crm.mitigation_strength = 'Primary' THEN r.risk_id END) as primary_risks
FROM controls c
JOIN control_risk_mapping crm ON c.control_id = crm.control_id
JOIN risk_scenarios r ON r.category = crm.risk_category
WHERE c.gap_normalized > 0
GROUP BY c.control_id
ORDER BY c.priority_score DESC, risks_addressed DESC
LIMIT 5;
```

**Visual**:
```
┌─────────────────────────────────────────────────────┐
│  Top 5 Controls by Risk Coverage                    │
├─────────────────────────────────────────────────────┤
│  1. GOVERN-1.1 - AI System Mapping                  │
│     � Addresses 12 risks (8 primary)               │
│     � Gap: 3 levels      |  Priority: 87/100       │
│     ────────────────────────────────────────────    │
│  2. MAP-2.1 - Data Classification                   │
│     � Addresses 10 risks (7 primary)               │
│     � Gap: 2 levels      |  Priority: 82/100       │
│     ────────────────────────────────────────────    │
│  3. MANAGE-3.1 - Bias Testing                       │
│     � Addresses 8 risks (6 primary)                │
│     � Gap: 3 levels      |  Priority: 79/100       │
│     ────────────────────────────────────────────    │
│  [View Full Assurance Plan →]                       │
└─────────────────────────────────────────────────────┘
```

---

### 5. Implementation Plan

#### Phase 1: Data Model (1-2 days)
- [ ] Create `control_risk_mapping` table
- [ ] Populate with NIST AI RMF control-to-risk mappings
- [ ] Add API endpoints:
  - `GET /api/controls/{control_id}/risks` - Get risks addressed by control
  - `GET /api/risks/{risk_id}/controls` - Get controls mitigating risk
  - `GET /api/dashboard/control-risk-coverage` - Get coverage matrix data

#### Phase 2: Dashboard UI (2-3 days)
- [ ] Add "Risk-Control Coverage Matrix" widget
- [ ] Enhance risk distribution chart with coverage layers
- [ ] Add "Top Control Priorities" widget
- [ ] Add tooltips and drill-down interactions

#### Phase 3: AI Assurance Plan Integration (1 day)
- [ ] Add "Risks Addressed" column to controls table
- [ ] Add "Risk Reduction Value" metric to control drawer
- [ ] Show risk scenarios linked to each control

#### Phase 4: Risk Register Integration (1 day)
- [ ] Add "Mitigating Controls" section to risk detail view
- [ ] Show control maturity and gap for each linked control
- [ ] Show mitigation strength (Primary/Secondary/Tertiary) for each control

---

### 6. NIST AI RMF Control-to-Risk Category Mapping

**Pre-populated mappings based on NIST AI RMF framework**:

| Control Category | Primary Risk Categories | Secondary Risk Categories |
|------------------|------------------------|---------------------------|
| **GOVERN** | Compliance, Operational | Data Privacy, Security |
| **MAP** | Data Privacy, Security | Compliance, Model Bias |
| **MEASURE** | Model Bias, Operational | Data Privacy, Compliance |
| **MANAGE** | Model Bias, Operational | Security, Compliance |

**Specific Examples**:
- **GOVERN-1.1** (AI System Mapping) → Data Privacy (Primary), Compliance (Secondary)
- **MAP-2.1** (Data Classification) → Data Privacy (Primary), Security (Secondary)
- **MEASURE-2.1** (Bias Testing) → Model Bias (Primary), Compliance (Secondary)
- **MANAGE-3.1** (Incident Response) → Security (Primary), Operational (Secondary)

---

### 7. Business Value

**For CISOs**:
- ✅ Understand which controls address highest-priority risks
- ✅ Justify control implementation with quantified risk reduction
- ✅ Identify coverage gaps (risks with no controls)
- ✅ Prioritize remediation based on risk-adjusted ROI

**For Compliance Officers**:
- ✅ Demonstrate control effectiveness to auditors
- ✅ Map controls to regulatory requirements AND risks
- ✅ Track coverage across risk categories

**For Risk Managers**:
- ✅ Understand control coverage across risk categories
- ✅ Identify single points of failure (one control → many risks)
- ✅ Prioritize controls based on number of risks addressed and maturity gaps

---

### 8. Example User Flow

1. **CISO opens Dashboard** → Sees "Risk-Control Coverage Matrix"
2. **Notices "Data Privacy" has 12 risks, $8.5M AAL, and 3 controls with gaps**
3. **Clicks "Data Privacy"** → Navigates to Risk Register filtered by Data Privacy
4. **Reviews specific risk scenarios** → Sees which controls mitigate each risk
5. **Clicks "GOVERN-1.1"** → Navigates to AI Assurance Plan
6. **Reviews control details** → Sees:
   - Current maturity: Level 2
   - Target maturity: Level 5
   - Gap: 3 levels
   - Risks addressed: 12 scenarios (8 primary, 4 secondary)
   - Priority score: 87/100
7. **Creates action plan** → Assigns owner, sets timeline, tracks progress

---

## Next Steps

1. **Validate with First Frontier (Dave)**: Confirm this addresses their feedback
2. **Prioritize implementation**: Decide if this is pre-sales demo or post-sales feature
3. **Create control-risk mappings**: Populate database with NIST AI RMF mappings
4. **Design mockups**: Create high-fidelity designs for CISO brief view
5. **Implement Phase 1**: Start with data model and API endpoints

---

## Questions for Stakeholders

1. Should control-risk mappings be:
   - **Pre-populated** (based on NIST AI RMF) with ability to customize?
   - **User-defined** (organization creates their own mappings)?
   - **Hybrid** (start with defaults, allow overrides)?

2. Priority for implementation:
   - **High** (needed for First Frontier close)?
   - **Medium** (nice-to-have for demos)?
   - **Low** (post-sales enhancement)?

---

## Design Decision: No Control Effectiveness Percentage

**Rationale**: Control effectiveness cannot be reliably determined without organizational feedback mechanisms. Organizations would need to:
- Conduct control testing and validation
- Measure actual risk reduction post-implementation
- Gather stakeholder feedback on control performance

**Alternative Approach**: Use **Mitigation Strength** (Primary/Secondary/Tertiary) to indicate the relationship between controls and risks without claiming specific effectiveness percentages.

**Future Enhancement**: If organizations want to track effectiveness, they can add this as a custom field with their own measurement methodology.
