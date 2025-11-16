# UI Feedback & Fixes - November 16, 2025

## Status: In Progress (4/16 Completed)

**Last Updated**: November 16, 2025 - 2:15 PM  
**Time Invested**: ~45 minutes  
**Completion Rate**: 25%

This document tracks all UI feedback items comparing the React app to the HTML demo.

---

## 1. Compliance Readiness

### 1.1 Input Modal Missing Fields ✅
**Issue**: Score range and score structure (single vs dimensions) fields are missing
**Location**: New Control Assessment modal
**Fix Required**: Add two new sections:
- Scoring Scale (0-4 / 1-5 range)
- Answer Structure (Single score vs Multi-dimensional)
**HTML Reference**: `compliance-readiness-fixed.html`
**Status**: ✅ **COMPLETED**
**Implementation**:
- Added `selectedScoringScale` state (default: '1-5')
- Added `selectedAnswerStructure` state (default: 'single')
- Made both sections interactive with click handlers
- Applied visual feedback (border color, background) on selection
- Matches HTML prototype behavior exactly

### 1.2 Missing Frameworks ❌
**Issue**: Colorado and NYC frameworks not in the list
**Location**: Framework selection dropdown
**Current**: EU AI Act, NIST AI RMF, ISO 42001
**Add**: Colorado AI Act, NYC Local Law 144
**Status**: Already completed in previous session

### 1.3 Questionnaire Structure 
**Issue**: Structure differs from production CRQ platform
**Note**: User acknowledges this will be kept as-is for production (matching CRQ)
**Status**: Acknowledged - No action needed

### 1.4 Notes Attachment Indicators 
**Issue**: Notes should show they have attachments
**Fix Required**: Add paperclip icon or indicator when notes have attachments
**Status**: **COMPLETED**
**Implementation**: Added "Attach" button with paperclip icon in notes section

### 1.5 Missing Controls in NIST AI 
**Issue**: Controls are missing in NIST AI framework
**Fix Required**: Add complete control list for NIST AI RMF
**Status**: Pending

### 1.6 Next Question Flow 
**Issue**: Can't demo question flow - no next question functionality
**Fix Required**: Implement Previous/Next navigation between questions
**Status**: **COMPLETED**
**Implementation**:
- Added `currentQuestionIndex` state tracking
- Implemented Previous/Next handlers with state reset
- Added progress indicator showing "Question X of 73" with percentage
- Added progress bar with smooth animation
- Disabled Previous button on first question with visual feedback

---

## 2. AI Assurance Plan (Controls Gap Analysis & Prioritization)

### 2.1 Scoring Explanation Text 
### 2.1 Scoring Explanation Text ❌
**Issue**: Better text available in latest HTML for how scoring works
**Fix Required**: Replace current scoring explanation with HTML version
**HTML Reference**: `ai-assurance-plan-fixed.html`
**Status**: Pending

### 2.2 Per-Stakeholder Scoring ❌
**Issue**: Missing ability to score differently per stakeholder (core feature)
**Current**: Single scoring interface
**Required**: 
- Multiple stakeholder selection
- Individual weights per stakeholder
- Per-stakeholder criterion scores
- Calculation explanation at bottom showing formula
**Status**: Pending

### 2.3 Missing Top Metrics ✅
**Issue**: Two main metrics missing from top section
**Fix Required**: Add summary metrics cards at top of Assurance Plan
**Status**: ✅ **COMPLETED**
**Implementation**:
- Added 2-column grid with metric cards
- **Metric 1**: Average Priority Score (calculated from all controls)
- **Metric 2**: Controls with Critical Gaps (gap ≥ 0.5)
- Styled to match design system (white cards, bordered, proper typography)

### 2.4 ROSI Missing Functionalities ❌
**Issue**: ROSI calculator is basically missing all functionality
**Required**:
- Cost input categories (People, Technology, Services, Other)
- Savings input categories (Operational + Risk Mitigation)
- ROSI calculation formula display
- ROSI % result
**Status**: Pending

### 2.5 Remediation & Notes Empty State ❌
**Issue**: Should look filled/populated for demo
**Fix Required**: Add sample data to show filled state
**Status**: Pending

### 2.6 Kovrr Insights Content ❌
**Issue**: Not the same insights as we think we can give
**Fix Required**: Update insights content to match realistic AI-powered recommendations
**Status**: Pending

---

## 3. Gen AI Exposure

### 3.1 Missing Main Table View ❌
**Issue**: Structure is different - main table is missing
**Current**: Direct to input/output
**Required**: Main table view first, then drill into input/output
**Status**: Pending

### 3.2 Input Modal Issues ❌
**Issues**:
- Regulations list is wrong
- Industry and country lists not complete
- AI model list should be much more impressive
**Fix Required**:
- Update regulations to comprehensive list
- Add full industry taxonomy (OSHA SIC codes - 1,004 industries across 10 divisions)
- Add full country list (249 countries provided)
- Expand AI model list significantly
**Data Sources**:
- ✅ Industry: `/Users/liransorani/Downloads/osha_combined.csv` (SIC 4-digit codes with hierarchical structure)
- ✅ Countries: 249 countries with ISO codes provided
**Status**: Ready to implement

### 3.3 Assumptions Studio Not Opening ❌
**Issue**: Modal doesn't open
**Fix Required**: Debug and fix modal trigger
**Status**: Pending

### 3.4 Quantification Output Different ❌
**Issue**: Output structure has changed
**Fix Required**: Update to match latest HTML design
**HTML Reference**: `results.html`
**Status**: Pending

---

## 4. Hero Dashboard

### 4.1 Wrong Color Palette ❌
**Issue**: User gave wrong color palettes initially
**Fix Required**: 
- Analyze each visualization's meaning/purpose
- Apply correct semantic colors (success, warning, error, info)
- Match design system tokens
**Status**: Pending

---

## Priority Order

### High Priority (Demo Blockers):
1. **Compliance Readiness**: Add score range & structure fields
2. **Assurance Plan**: Per-stakeholder scoring with weights
3. **Gen AI Exposure**: Add main table view
4. **Hero Dashboard**: Fix color palette

### Medium Priority (Demo Enhancement):
5. **Assurance Plan**: Add top metrics
6. **Assurance Plan**: ROSI functionalities
7. **Gen AI**: Fix input modal (regulations, industries, models)
8. **Compliance**: Next question flow

### Low Priority (Polish):
9. **Notes**: Attachment indicators
10. **NIST AI**: Add missing controls
11. **Assurance Plan**: Update scoring text
12. **Assurance Plan**: Fill remediation/notes
13. **Kovrr Insights**: Update content
14. **Gen AI**: Fix Assumptions Studio
15. **Gen AI**: Update quantification output

---

## Implementation Notes

- Each fix should reference the corresponding HTML file
- Maintain design system consistency (Foqus tokens)
- Test each change in isolation
- Update mock data where needed
- Document any data model changes

---

## Next Steps

1. Review HTML files for each feature
2. Create detailed implementation plan per feature
3. Implement in priority order
4. Test demo flow end-to-end
5. User review and iteration
