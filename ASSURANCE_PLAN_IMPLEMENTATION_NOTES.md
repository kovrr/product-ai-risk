# AI Assurance Plan - Implementation Notes

**Date:** November 12, 2025  
**Status:** 🚧 IN PROGRESS  
**Complexity:** HIGH - Multi-tab interface with drawer, forms, calculations

---

## 📋 HTML Mockup Analysis

### Main Structure
1. **Page Header**
   - Title: "AI Assurance Plan"
   - Subtitle: "Prioritize AI governance controls with weighted scoring and stakeholder alignment"

2. **Assessment Toolbar**
   - Assessment dropdown selector
   - Scale badge (e.g., "Scale: 1–5")
   - Controls count badge (e.g., "19 Controls")

3. **Tab Navigation**
   - Tab 1: 📊 Actions Center (table view)
   - Tab 2: 💡 Kovrr Insights (AI recommendations)

4. **Actions Center View**
   - Sorting toolbar (Sort by Priority, Sort by Gap, Recalculate All)
   - "How Priority Scoring Works" button
   - Controls table with columns:
     - Control ID
     - Control Name
     - Status
     - Current (maturity)
     - Target (maturity)
     - Gap
     - Priority Score (0–100)
     - ROSI %

5. **Right Drawer** (opens on row click)
   - Header: Control name, ID, Status dropdown
   - 3 Tabs:
     - **Scoring Tab:**
       - KPI tiles (Priority Score, Gap, Reg. Urgency, Benefit Share %)
       - Maturity section (Scale, Current, Target)
       - Stakeholders section (dynamic list with influence %, weights, scores)
       - Contributions breakdown table
     - **Remediation Guidance Tab:**
       - AI chat interface
       - ROSI Calculator with cost/savings inputs
     - **Notes & Attachments Tab:**
       - Notes list with add functionality
       - Attachments list with upload

6. **Explainer Modal**
   - "How Priority Scoring Works: The Impact Story"
   - Detailed methodology explanation

---

## 🎨 Styling Requirements

### Colors (from HTML CSS variables)
```css
--primary-blue: rgb(85, 81, 247)
--success-green: rgb(13, 199, 131)
--warning-orange: rgb(255, 153, 0)
--error-red: rgb(255, 35, 35)
--bg-white: rgb(255, 255, 255)
--bg-light: rgb(245, 247, 255)
--bg-blue: rgb(236, 242, 252)
--bg-gray: rgb(237, 242, 247)
--text-dark: rgb(26, 32, 44)
--text-medium: rgb(74, 85, 104)
--divider: rgb(220, 229, 242)
```

### Typography
- Page title: 38px, 700 weight
- Page subtitle: 16px, 400 weight
- H2: 26px, 700 weight
- H3: 20px, 600 weight
- Body: 14px, 400 weight
- Font: "Source Sans Pro"

### Components
- **Card:** white bg, 15px border-radius, shadow-sm
- **Button:** 14px font, 600 weight, 8px/16px padding, 6px border-radius
- **Table:** gray header bg, hover on rows
- **Drawer:** fixed right, 600px width, white bg, shadow
- **Badges:** rounded, colored backgrounds with opacity
- **Progress bars:** 12px height, rounded, primary blue fill

---

## 📊 Data Structure

### Control Object
```javascript
{
  id: number,
  control_id: string,  // e.g., "GOVERN-1.1"
  name: string,
  status: string,  // Draft, In Review, Approved, etc.
  current_maturity: number,  // 1-5
  target_maturity: number,  // 1-5
  gap_normalized: number,  // 0-1
  priority_score: number,  // 0-100
  rosi_percentage: number,
  stakeholders: [
    {
      name: string,
      influence: number,  // %
      weights: { impact, regulatory, ethical, cost, effort },
      scores: { impact, regulatory, ethical, cost, effort }
    }
  ]
}
```

---

## 🔧 Implementation Plan

### Phase 1: Core Structure ✅
- [x] Page header and subtitle
- [x] Assessment toolbar
- [x] Tab navigation
- [ ] Table with all columns
- [ ] Status badges
- [ ] Priority score coloring

### Phase 2: Drawer (Scoring Tab)
- [ ] Drawer slide-in animation
- [ ] KPI tiles
- [ ] Maturity inputs
- [ ] Stakeholders dynamic list
- [ ] Add/remove stakeholders
- [ ] Criterion weights (sum to 100%)
- [ ] Criterion scores (1-5)
- [ ] Contributions breakdown table
- [ ] Recalculate logic

### Phase 3: Drawer (Remediation Tab)
- [ ] AI chat interface
- [ ] Chat messages display
- [ ] Send message functionality
- [ ] ROSI calculator form
- [ ] Cost categories (9 types)
- [ ] Savings categories (14 types)
- [ ] ROSI calculation display

### Phase 4: Drawer (Notes Tab)
- [ ] Notes list display
- [ ] Add note functionality
- [ ] Note metadata (author, date)
- [ ] Attachments list
- [ ] Upload attachment

### Phase 5: Additional Features
- [ ] Kovrr Insights tab
- [ ] Explainer modal
- [ ] Sort functionality
- [ ] Recalculate all
- [ ] Normalize influence

---

## 🎯 Priority

**CRITICAL:** This is a core module with complex calculations and multi-stakeholder workflows.  
**TIMELINE:** Estimated 4-6 hours for full implementation  
**APPROACH:** Build incrementally, test each section

---

## 📝 Notes

- The HTML uses extensive JavaScript for calculations
- Priority score formula involves weighted stakeholder inputs
- ROSI calculation is complex with multiple cost/savings categories
- Need to maintain state for all drawer inputs
- Drawer should persist data when closed/reopened

---

**Next Steps:**
1. Build complete table structure
2. Implement drawer with all 3 tabs
3. Add calculation logic
4. Style to match HTML exactly
5. Test all interactions
