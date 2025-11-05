# User Feedback - Amendments List

**Date**: November 5, 2025  
**Source**: User video feedback  
**Priority**: High

---

## 1. Risk Register Visualization Layout

**Current**: Visualization is in a separate tab  
**Requested**: Move visualization above the table list (not in tabs)  
**Impact**: Better UX - users can see both matrix and list simultaneously  
**Status**: ✅ COMPLETE

**Implementation**:
- Remove "Visualization" tab
- Place Risk Matrix + Metrics Sidebar above the table
- Keep Table, Kovrr Insights, and Financial Quantification as tabs
- Ensure responsive layout

---

## 2. Compliance Readiness - Progress Percentages

**Current**: Progress shown but no percentages  
**Requested**: Add percentage completion indicators  
**Impact**: Better progress tracking  
**Status**: ✅ COMPLETE

**Implementation**:
- Add percentage calculation for "In Progress" assessments
- Display percentage in progress bars
- Show percentage in assessment cards

---

## 3. Compliance Readiness - "Not Started" Status

**Current**: Only "In Progress" and "Completed" statuses  
**Requested**: Add "Not Started" status for frameworks that haven't begun  
**Impact**: Complete status visibility  
**Status**: ✅ COMPLETE

**Implementation**:
- Add "Not Started" status to data model
- Display all frameworks in open view
- Color-code: Not Started (gray), In Progress (blue), Completed (green)
- Update filters to include "Not Started"

---

## 4. Compliance Readiness - Screen Titles Bug

**Current**: When starting new assessment, screens show previous "control assessment" titles  
**Requested**: Fix title persistence issue  
**Impact**: Bug fix - prevents confusion  
**Status**: ✅ COMPLETE (State properly reset with new assessment flow)

**Implementation**:
- Clear previous assessment context when starting new one
- Ensure proper state reset
- Update breadcrumbs and titles dynamically

---

## 5. AI Assurance Plan - Column Name Change

**Current**: Column labeled "Priority"  
**Requested**: Change to "Score/Risk" or similar  
**Impact**: Better terminology alignment  
**Status**: ✅ COMPLETE

**Implementation**:
- Rename "Priority" column to "Risk Score" or "Priority Score"
- Update column header
- Update sorting logic if needed

---

## 6. AI Assurance Plan - Remove Stakeholders Column

**Current**: Right column shows "Stakeholders"  
**Requested**: Remove - takes too much space  
**Impact**: Cleaner UI, more space for important data  
**Status**: ✅ COMPLETE (Table optimized, no stakeholders column)

**Implementation**:
- Remove stakeholders column from main table
- Move stakeholder info to detail view/drawer if needed
- Adjust table layout

---

## 7. GenAI Quantification Model - Rename

**Current**: "GenAI Quantification Model"  
**Requested**: Change to "GenAI Exposure - Financial Quantification"  
**Impact**: Better naming clarity  
**Status**: ✅ COMPLETE

**Implementation**:
- Update page title
- Update navigation menu
- Update breadcrumbs
- Update any references in code

---

## 8. GenAI Quantification Model - Remove Beta Disclaimer

**Current**: Beta disclaimer shown  
**Requested**: Remove beta label  
**Impact**: Production-ready appearance  
**Status**: ✅ COMPLETE (No beta labels found)

**Implementation**:
- Remove beta badge/label
- Update any beta-related messaging
- Ensure production-ready UI

---

## 9. Assets Visibility - Two Discovery Options

**Current**: Single asset discovery flow  
**Requested**: Two options:
1. **Manual** - Similar to Dave's questionnaires
2. **Automated** - Jump to Integration Hub showing active integrations

**Impact**: Flexible asset discovery workflow  
**Status**: ✅ COMPLETE

**Implementation**:
- Create asset discovery selection screen
- Option 1: Manual questionnaire flow
- Option 2: Redirect to Integration Hub with active integrations highlighted
- Add clear CTAs for both paths

---

## 10. Integration Hub - Add Vendor Icons

**Current**: Text-only vendor list  
**Requested**: Add vendor logos/icons  
**Impact**: Better visual recognition  
**Status**: ✅ COMPLETE

**Vendors to add icons for**:
- Existing integrations (Jira, Slack, GitHub, etc.)
- Kovrr's official logo

**Implementation**:
- Source vendor logos (SVG preferred)
- Create icon component
- Add logos to integration cards
- Ensure consistent sizing and styling
- Add Kovrr logo prominently

---

## Summary

**Total Amendments**: 10  
**Completed**: 10  
**In Progress**: 0  
**Todo**: 0

## 🎉 ALL AMENDMENTS COMPLETE! 100%

**Estimated Effort**: 
- Quick wins (1-2): Items 5, 7, 8 (naming/labels)
- Medium effort (3-5): Items 1, 2, 3, 6, 10 (UI changes)
- Higher effort (6-9): Items 4, 9 (logic changes, new flows)

**Recommended Order**:
1. Quick wins first (5, 7, 8)
2. Risk Register layout (1) - high visibility
3. Compliance improvements (2, 3, 4)
4. AI Assurance cleanup (6)
5. Assets & Integration (9, 10)

---

**Last Updated**: November 5, 2025 - 4:52 PM UTC+02:00
