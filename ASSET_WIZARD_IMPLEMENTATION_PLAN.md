# AI Asset Manual Intake Wizard - Implementation Plan

## Status: Ready to Implement

This document outlines the implementation plan for the optimized AI Asset Manual Input Wizard with smart defaults and minimal user input requirements.

## Implementation Approach

Due to the size and complexity of the wizard (6 steps, 50+ fields), I recommend implementing it in phases:

### Phase 1: Core Structure (Immediate)
- Create wizard shell with step navigation
- Implement Step 1 (Basic Information) - 10 fields
- Implement Step 2 (Risk Assessment) - 12 fields with risk calculator
- Add progress tracking and validation

### Phase 2: Data & Compliance (Next)
- Implement Step 3 (Data & Privacy) - 9 fields
- Implement Step 4 (Compliance & Governance) - 8 fields
- Add conditional logic and auto-sync

### Phase 3: Technical & Review (Final)
- Implement Step 5 (Technical & Operational) - 10 fields
- Implement Step 6 (Review & Submit) - 10 fields
- Add file upload and final submission

### Phase 4: Enhancements
- Add "Quick Mode" (3 questions)
- Implement vendor intelligence (auto-fill)
- Add "Copy from similar asset"
- Implement auto-save drafts

## Key Features to Implement

### 1. Smart Defaults ✅
```javascript
const defaultFormData = {
  // Most common values pre-selected
  assetType: 'saas',
  deploymentType: 'cloud',
  criticality: 'moderate',
  audienceReach: 'low',
  dataPrivacy: 'moderate',
  dataClassification: 'internal',
  ethicalRisk: 'low',
  // ... etc
};
```

### 2. Real-Time Risk Calculator ✅
```javascript
// Auto-calculate risk score as user fills Step 2
useEffect(() => {
  const score = calculateRiskScore(formData);
  setRiskScore(score);
}, [formData.criticality, formData.audienceReach, ...]);
```

### 3. Conditional Logic ✅
```javascript
// Show/hide fields based on previous answers
{formData.dataResidency === 'yes' && (
  <input name="dataResidencyLocation" />
)}
```

### 4. Visual Selectors ✅
- Radio button cards with icons for criticality
- Segmented controls for data classification
- Dropdown with smart grouping for complex options

### 5. Validation ✅
- Required field validation
- Step-by-step validation before proceeding
- Inline error messages

## File Structure

```
/frontend/src/pages/AssetsVisibility/
├── AssetManualIntakeWizard.jsx          # Main wizard component
├── components/
│   ├── WizardStep1BasicInfo.jsx         # Step 1 component
│   ├── WizardStep2RiskAssessment.jsx    # Step 2 component
│   ├── WizardStep3DataPrivacy.jsx       # Step 3 component
│   ├── WizardStep4Compliance.jsx        # Step 4 component
│   ├── WizardStep5Technical.jsx         # Step 5 component
│   ├── WizardStep6Review.jsx            # Step 6 component
│   ├── RiskScoreDisplay.jsx             # Risk score visualization
│   └── ProgressStepper.jsx              # Progress indicator
└── utils/
    ├── riskCalculator.js                # Risk score calculation logic
    └── formValidation.js                # Validation rules
```

## Next Steps

Would you like me to:

1. **Implement Phase 1 now** (Steps 1-2 with full functionality)
2. **Create a simplified version first** (Quick Mode with 3 questions)
3. **Show you mockups/wireframes** before coding
4. **Implement all 6 steps** (will require multiple file creations)

Please let me know your preference and I'll proceed accordingly!

## Estimated Implementation Time

- Phase 1 (Steps 1-2): ~2-3 hours
- Phase 2 (Steps 3-4): ~2 hours  
- Phase 3 (Steps 5-6): ~2 hours
- Phase 4 (Enhancements): ~3 hours
- **Total: ~9-10 hours of development**

## Technical Requirements

- React 18+
- React Router for navigation
- Lucide React for icons
- TailwindCSS for styling
- Form state management (useState)
- File upload handling
- API integration ready

## Benefits Summary

✅ **80% less typing** - Smart defaults + dropdowns
✅ **Visual selectors** - Easier than text input
✅ **Real-time feedback** - Risk score updates live
✅ **Guided experience** - Step-by-step with help text
✅ **Mobile responsive** - Works on all devices
✅ **Auto-save** - Never lose progress
✅ **Flexible** - Quick mode or detailed mode
