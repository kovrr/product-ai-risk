# Product Documentation

This folder contains all product-related documentation for AIKovrr.

## Contents

### 📋 PRD.md
The main Product Requirements Document (PRD) - the single source of truth for all product requirements, features, and specifications.

**How to use:**
1. Review and update requirements directly in PRD.md
2. Mark changes with dates
3. Reference screenshots from the `screenshots/` folder
4. Check off completed items with `[x]`

### 📸 screenshots/
Contains all design mockups, UI references, and annotated screenshots.

**Naming convention:**
- `YYYY-MM-DD_component-name_description.png`
- Example: `2025-11-04_dashboard_new-layout.png`

**Reference in PRD:**
```markdown
**Design Reference**: `product/screenshots/dashboard/new-layout.png`
```

## Workflow

### Making Changes

1. **Add/Update Requirements**
   - Edit `PRD.md` directly
   - Add screenshots to `screenshots/` folder
   - Reference screenshots in PRD
   - Mark section as updated with date

2. **Request Implementation**
   - Tell Cascade: "Check PRD section X, I updated it"
   - Or: "See the screenshot in product/screenshots/..."
   - Cascade will read, implement, and update PRD

3. **Track Progress**
   - Cascade marks completed items with `[x]`
   - Version number increments in PRD
   - Change log updated

## Structure

```
product/
├── README.md                    # This file
├── PRD.md                       # Product Requirements Document
└── screenshots/                 # Design references
    ├── README.md               # Screenshot guidelines
    ├── dashboard/              # Optional: organize by component
    ├── risk-register/
    ├── compliance-readiness/
    └── ...
```

## Best Practices

### For Requirements
- ✅ Be specific and detailed
- ✅ Include acceptance criteria
- ✅ Mark priority (High/Medium/Low)
- ✅ Reference related components
- ✅ Update dates when changing

### For Screenshots
- ✅ Annotate with arrows/notes
- ✅ Use descriptive filenames
- ✅ Include context (before/after)
- ✅ High resolution preferred
- ✅ Reference in PRD

### For Communication
- ✅ Point to specific PRD sections
- ✅ Explain the "why" behind changes
- ✅ Ask questions if unclear
- ✅ Review implementations
- ✅ Provide feedback

## Quick Reference

| Action | Command |
|--------|---------|
| Update requirement | Edit PRD.md section |
| Add screenshot | Save to `screenshots/` folder |
| Request implementation | "Check PRD section X" |
| Track progress | Check `[x]` marks in PRD |
| View history | Check Change Log in PRD |

---

**Last Updated**: November 4, 2025
