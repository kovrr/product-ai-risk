# PRD vs HTML Mockups - Gap Analysis

**Date**: November 5, 2025  
**Purpose**: Identify features in PRD that are NOT in HTML mockups

---

## 🎯 Module 1: AI Assurance Plan

### ✅ In HTML Mockups
- Controls Gap Analysis Table
- Multi-stakeholder weighted scoring
- ROSI Calculator
- AI chat interface
- Notes & attachments
- Status tracking
- Kovrr Insights panel

### ❌ Missing from HTML (In PRD)
- **CSV/PDF export** of prioritization report
- **Control dependency mapping & sequencing**
- **What-If scenario comparison** (side-by-side)
- **Integration with Risk Register** (auto-populate ALE values)
- **Cross-framework mapping** (NIST + ISO + EU AI Act in one view)
- **AI-assisted weighting suggestions** ("Similar organizations weight Regulatory 40%")
- **Historical trending** (priority changes over time)
- **Integration with Jira/ServiceNow**
- **Timeline/Gantt chart view**
- **Resource allocation view**

---

## 🎯 Module 2: Risk Register

### ✅ In HTML Mockups (v4)
- Risk list table with search
- 5×5 risk matrix visualization
- Create/edit risk modal
- Risk detail page
- NIST controls integration
- Kovrr Insights with AI recommendations
- Priority calculation
- Status workflow

### ❌ Missing from HTML (In PRD)
#### From Main Features:
- **Bulk Actions**: Select multiple risks for bulk status update
- **Export to CSV**: Export filtered view
- **Multi-column sorting**
- **Pagination**: 25 risks per page
- **Rich text editor** for description (HTML has plain textarea)
- **Peer Rate** field (percentage, optional)
- **PII/PCI/PHI Exposure** fields (number of records)
- **Ticket Link** field (URL to Jira/ServiceNow)
- **Unsaved changes warning** on cancel
- **Concurrent edit warning** (if modified by another user)

#### From Future Enhancements:
- **Risk heat map**
- **Automated risk scoring** based on asset data
- **Risk trend analysis** over time
- **Link risks to specific AI assets**
- **Mitigation task tracking**
- **Risk appetite threshold indicators**
- **Monte Carlo simulation** for financial impact
- **Email notifications** on status changes
- **Risk report generation** (PDF)
- **Comments/discussion thread** per risk
- **File attachments** (evidence, reports)
- **Activity timeline** in risk details
- **Related assets** display
- **Financial calculations breakdown** view
- **Mitigation history** tracking

---

## 🎯 Module 3: Compliance Readiness

### ✅ In HTML Mockups
- Framework selection
- Assessment interface
- NIST AI RMF data structure
- Control evaluation
- Maturity level selection

### ❌ Missing from HTML (In PRD)
#### From Main Features:
- **Readiness Score Dashboard**:
  - Overall readiness score (0-100)
  - Current maturity level (Initial → Optimizing)
  - Frameworks assessed count
- **Framework Assessments**:
  - Per-framework maturity breakdown
  - Domain-level scoring (Governance, Map, Measure, Manage)
  - Progress bars with color coding
  - Key recommendations
- **Maturity Levels Guide**:
  - Visual representation of 5 maturity levels
  - Descriptions for each level

#### From Future Enhancements:
- **Assessment wizard/questionnaire** (step-by-step)
- **Historical trend tracking**
- **Peer benchmarking**
- **Framework comparison view**
- **Export assessment report**
- **Action plan generation from gaps** (links to AI Assurance Plan)

---

## 🎯 Module 4: GenAI Quantification Model

### ✅ In HTML Mockups
- Multi-step workflow (landing, entity, assumptions, pending, results)
- MITRE ATLAS vectors
- NIST controls evaluation
- AAL calculation
- 1-in-100 year loss
- Damage breakdown

### ❌ Missing from HTML (In PRD - Financial Quantification)
#### From Main Features:
- **Financial Summary Dashboard**:
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

#### From Future Enhancements:
- **Interactive risk calculator**
- **Monte Carlo simulation**
- **Scenario analysis** (best/worst case)
- **Historical loss data integration**
- **Industry benchmark comparison**
- **Multi-year projections**
- **Sensitivity analysis**
- **Export financial reports**
- **Chart visualizations** (pie, bar, line)

---

## 🎯 Module 5: Dashboard (Hero Dashboard)

### ✅ In HTML Mockups
- Basic dashboard implemented (from previous work)

### ❌ Missing from HTML (In PRD)
#### From Main Features:
- **Metrics Cards** (4 cards):
  - AI Assets Card with breakdown
  - Risk Scenarios Card with priority breakdown
  - Compliance Readiness Card with score
  - Open Alerts Card with severity breakdown
- **Recent Activity Feed**:
  - Last 10 activities across all modules
  - Icon, description, timestamp, user avatar
  - Auto-refresh every 30 seconds
- **Risk Distribution Visualization**:
  - Horizontal bar chart or pie chart
  - Risks grouped by category
  - Click category to filter Risk Register
- **Quick Actions Section**:
  - Add AI Asset button
  - Create Risk Scenario button
  - Start Assessment button

#### From Future Enhancements:
- **Real-time data refresh via WebSocket**
- **Customizable dashboard widgets** (drag & drop)
- **Export dashboard as PDF report**
- **Trend indicators** (up/down arrows)
- **Drill-down capabilities**
- **Personalized views** per user role

---

## 🎯 Module 6: Assets Visibility

### ✅ In HTML Mockups
- None (not provided)

### ❌ Missing from HTML (In PRD)
#### From Main Features:
- **Assets Table**:
  - Asset name, type, vendor, status, risk level, discovery date
  - Search and filter functionality
  - Sort by columns
  - Click row for details
- **Discovery Sources**:
  - Integration status
  - Last sync time
  - Asset count per source
- **Shadow AI Detection**:
  - Sanctioned vs. unsanctioned assets
  - Alert badges
- **Asset Details Modal**:
  - Full asset information
  - Associated risks
  - Linked controls
  - Usage analytics

#### From Future Enhancements:
- **Asset details page** with:
  - Usage analytics (who, when, how often)
  - Associated risks
  - Compliance status
  - Cost tracking
- **Asset lifecycle management**
- **Automated discovery scheduling**
- **Asset tagging and categorization**
- **Dependency mapping**
- **Integration health monitoring**

---

## 🎯 Module 7: Governance & Monitoring

### ✅ In HTML Mockups
- None (not provided)

### ❌ Missing from HTML (In PRD)
#### From Main Features:
- **Statistics Dashboard**:
  - Open alerts count
  - Policy violations count
  - Evidence items count
  - Audit events count
- **Tabbed Interface**:
  - **Alerts Tab**: System-generated alerts with severity and status
  - **Policy Violations Tab**: Detected violations with review workflow
  - **Evidence Tab**: Uploaded evidence files with metadata
  - **Audit Log Tab**: Complete activity history with filters

#### From Future Enhancements:
- **Real-time alert notifications**
- **Alert rules engine**
- **Evidence file upload**
- **Policy violation workflow**
- **Audit log export**
- **Compliance reporting**

---

## 🎯 Module 8: Integration Hub

### ✅ In HTML Mockups
- None (not provided)

### ❌ Missing from HTML (In PRD)
#### From Main Features:
- **Available Integrations Grid**:
  - Integration cards (logo, name, description, status)
  - Connect/Configure buttons
- **Active Integrations List**:
  - Integration name, status, last sync, actions
- **Sync History**:
  - Timestamp, status, records synced, errors
- **Integration Details Modal**:
  - Configuration form
  - Authentication setup
  - Sync settings

#### From Future Enhancements:
- **Connector configuration UI**
- **OAuth authentication flows**
- **Sync scheduling**
- **Data mapping interface**
- **Sync history and logs**
- **Error handling and retry logic**
- **Webhook support**
- **API rate limiting**
- **Connection health monitoring**

---

## 📊 Summary Statistics

### Coverage by Module

| Module | HTML Coverage | Missing Features (Main) | Missing Features (Future) |
|--------|---------------|------------------------|---------------------------|
| AI Assurance Plan | 85% | 0 | 10 |
| Risk Register | 70% | 10 | 14 |
| Compliance Readiness | 50% | 6 | 6 |
| GenAI Quantification | 60% | 8 | 9 |
| Dashboard | 40% | 9 | 6 |
| Assets Visibility | 0% | 12 | 6 |
| Governance & Monitoring | 0% | 8 | 6 |
| Integration Hub | 0% | 8 | 9 |

### Total Missing Features
- **Main Features**: 61 features
- **Future Enhancements**: 66 features
- **Total**: 127 features not in HTML mockups

---

## 🚀 Updated Implementation Priority

### Phase 1: Core Components (Week 1)
- Create missing atom components
- Create molecule components
- Set up state management

### Phase 2: AI Assurance Plan (Week 2)
- ✅ Convert HTML mockup
- ❌ Add CSV/PDF export
- ❌ Add historical trending
- ❌ Add dependency mapping

### Phase 3: Risk Register (Week 3)
- ✅ Convert HTML mockup
- ❌ Add bulk actions
- ❌ Add pagination
- ❌ Add rich text editor
- ❌ Add PII/PCI/PHI fields
- ❌ Add file attachments
- ❌ Add activity timeline

### Phase 4: Compliance Readiness (Week 4)
- ✅ Convert HTML mockup
- ❌ Add readiness score dashboard
- ❌ Add domain-level scoring
- ❌ Add progress bars
- ❌ Add maturity levels guide

### Phase 5: GenAI Quantification (Week 5)
- ✅ Convert HTML mockup
- ❌ Add financial summary dashboard
- ❌ Add risk distribution charts
- ❌ Add methodology guide

### Phase 6: Dashboard (Week 6) ⭐ NEW
- ❌ Create metrics cards
- ❌ Create recent activity feed
- ❌ Create risk distribution visualization
- ❌ Create quick actions section

### Phase 7: Assets Visibility (Week 7) ⭐ NEW
- ❌ Create assets table
- ❌ Create discovery sources view
- ❌ Create shadow AI detection
- ❌ Create asset details modal

### Phase 8: Governance & Monitoring (Week 8) ⭐ NEW
- ❌ Create statistics dashboard
- ❌ Create alerts tab
- ❌ Create policy violations tab
- ❌ Create evidence tab
- ❌ Create audit log tab

### Phase 9: Integration Hub (Week 9) ⭐ NEW
- ❌ Create integrations grid
- ❌ Create active integrations list
- ❌ Create sync history
- ❌ Create integration details modal

---

## 📅 Revised Timeline

**Total Estimated Time**: **9 weeks** (was 5 weeks)

**Breakdown**:
- **Weeks 1-5**: HTML mockup conversion + basic features (as planned)
- **Weeks 6-9**: Missing modules (Dashboard, Assets, Governance, Integration Hub)
- **Future Phases**: 127 additional features (enhancements)

---

## ✅ Action Items

1. **Immediate**: Focus on converting existing HTML mockups (Weeks 1-5)
2. **Short-term**: Build missing modules without HTML mockups (Weeks 6-9)
3. **Medium-term**: Add missing main features to existing modules
4. **Long-term**: Implement future enhancements (127 features)

---

**Conclusion**: The HTML mockups cover **~60% of main features** in PRD. We need to build **4 additional modules** and add **61 missing main features** to reach full PRD compliance.
