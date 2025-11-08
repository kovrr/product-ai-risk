# Kovrr Design System

## Design System Documentation

This document outlines the complete design system used across the Kovrr AI Risk Management Platform.

---

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Components](#components)
5. [Layout](#layout)
6. [Icons](#icons)
7. [Shadows & Effects](#shadows--effects)
8. [Usage Guidelines](#usage-guidelines)

---

## Color Palette

### Primary Colors

```css
--primary-blue: rgb(85, 81, 247);
--primary-blue-light: rgb(97, 94, 251);
```

**Usage:**
- Primary actions (buttons, links)
- Active states in navigation
- Brand accents (borders, highlights)
- Focus states

**Example:**
- Primary button background
- Active navigation item color
- Tab bottom border (active state)
- Logo accent color (optional)

---

### Status Colors

```css
--success-green: rgb(13, 199, 131);
--warning-orange: rgb(255, 153, 0);
--error-red: rgb(255, 35, 35);
--info-blue: rgb(21, 77, 171);
```

**Usage:**
- **Success Green:** Completed states, positive metrics, success badges
- **Warning Orange:** Warnings, in-progress states, caution indicators
- **Error Red:** Errors, critical issues, danger states
- **Info Blue:** Informational messages, help text

---

### Background Colors

```css
--bg-white: rgb(255, 255, 255);
--bg-light: rgb(245, 247, 255);
--bg-blue: rgb(236, 242, 252);
--bg-gray: rgb(237, 242, 247);
```

**Usage:**
- **White:** Cards, modals, main content areas
- **Light:** Page background, subtle backgrounds
- **Blue:** Active/hover states, highlights
- **Gray:** Table headers, disabled states, secondary backgrounds

---

### Text Colors

```css
--text-dark: rgb(26, 32, 44);
--text-dark-alt: rgb(28, 28, 45);
--text-medium-dark: rgb(48, 48, 69);
--text-medium: rgb(74, 85, 104);
--text-light: rgb(113, 118, 126);
```

**Hierarchy:**
- **Dark:** Page titles, headings, primary content
- **Medium-Dark:** Body text, descriptions
- **Medium:** Secondary text, labels
- **Light:** Tertiary text, placeholders, disabled text

---

### Border & Divider Colors

```css
--divider: rgb(220, 229, 242);
--border-gray: rgb(163, 173, 181);
```

**Usage:**
- **Divider:** Subtle separators, card borders, section dividers
- **Border Gray:** Input borders, stronger dividers, defined boundaries

---

## Typography

### Font Family

```css
font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
```

**Weights Available:**
- 400 (Regular)
- 500 (Medium)
- 600 (Semi-Bold)
- 700 (Bold)
- 900 (Black) - for logo

---

### Type Scale

#### Page Titles
```css
font-size: 38px;
font-weight: 700;
color: var(--text-dark);
letter-spacing: -0.5px;
line-height: 1.2;
```
**Usage:** Main page headings, hero titles

---

#### Section Headings (H2)
```css
font-size: 26px;
font-weight: 700;
color: var(--text-dark);
line-height: 1.2;
```
**Usage:** Major section headings

---

#### Subsection Headings (H3)
```css
font-size: 20px;
font-weight: 600;
color: var(--text-medium-dark);
line-height: 1.3;
```
**Usage:** Card titles, subsection headings

---

#### Body Text
```css
font-size: 14px;
font-weight: 400;
color: var(--text-medium-dark);
line-height: 1.5;
```
**Usage:** Default body text, descriptions, paragraphs

---

#### Small Text / Labels
```css
font-size: 12px;
font-weight: 600;
color: var(--text-medium);
text-transform: uppercase;
letter-spacing: 0.5px;
```
**Usage:** Labels, table headers, metadata

---

#### Navigation Items
```css
font-size: 15px;
font-weight: 500; /* inactive */
font-weight: 600; /* active */
color: var(--text-light); /* inactive */
color: var(--primary-blue); /* active */
```
**Usage:** Sidebar navigation, tab navigation

---

## Spacing System

### Base Unit: 4px

All spacing follows a 4px grid system for consistency.

```css
4px   → 0.25rem
8px   → 0.5rem
12px  → 0.75rem
16px  → 1rem
20px  → 1.25rem
24px  → 1.5rem
30px  → 1.875rem
32px  → 2rem
40px  → 2.5rem
48px  → 3rem
```

---

### Common Spacing Values

**Component Padding:**
- Cards: `20px` or `24px`
- Buttons: `8px 16px` (vertical horizontal)
- Inputs: `10px 12px`
- Sections: `30px`

**Margins:**
- Between sections: `24px` or `32px`
- Between elements: `16px` or `20px`
- Between small items: `8px` or `12px`

**Gaps (Grid/Flex):**
- Small gap: `8px`
- Medium gap: `12px` or `16px`
- Large gap: `20px` or `24px`

---

## Components

### Buttons

#### Primary Button
```css
.btn-primary {
  background-color: var(--primary-blue);
  color: var(--bg-white);
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background-color: var(--primary-blue-light);
}
```

---

#### Secondary Button
```css
.btn-secondary {
  background-color: var(--bg-white);
  color: var(--primary-blue);
  border: 1px solid var(--primary-blue);
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  box-shadow: var(--shadow-sm);
}

.btn-secondary:hover {
  background-color: var(--bg-blue);
}
```

---

#### Tertiary Button
```css
.btn-tertiary {
  background-color: transparent;
  color: var(--text-medium);
  border: none;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
}

.btn-tertiary:hover {
  background-color: var(--bg-light);
}
```

---

### Cards

```css
.card {
  background: var(--bg-white);
  border-radius: 15px;
  box-shadow: var(--shadow-sm);
  padding: 20px;
}
```

**Variants:**
- Standard card: `15px` border-radius
- Smaller radius: `12px` for nested elements
- Large radius: `20px` for hero elements

---

### Badges

#### Badge Base
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}
```

#### Badge Variants
```css
.badge-primary {
  background-color: rgba(85, 81, 247, 0.1);
  color: var(--primary-blue);
}

.badge-success {
  background-color: rgba(13, 199, 131, 0.1);
  color: var(--success-green);
}

.badge-warning {
  background-color: rgba(255, 153, 0, 0.1);
  color: var(--warning-orange);
}

.badge-error {
  background-color: rgba(255, 35, 35, 0.1);
  color: var(--error-red);
}
```

**Note:** Badges use 10% opacity background with full-color text

---

### Form Inputs

```css
.form-input {
  font-family: "Source Sans Pro";
  font-size: 14px;
  color: var(--text-medium-dark);
  background: var(--bg-white);
  border: 1px solid var(--border-gray);
  border-radius: 6px;
  padding: 10px 12px;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(85, 81, 247, 0.12);
}
```

**Focus State:**
- Blue border
- Subtle blue glow shadow

---

### Tables

#### Table Structure
```css
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: left;
  padding: 12px 16px;
  background-color: var(--bg-gray);
  border-bottom: 1px solid var(--divider);
}

td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--divider);
  color: var(--text-medium-dark);
  font-size: 14px;
}

tbody tr:hover {
  background-color: var(--bg-blue);
}
```

---

### Tabs

#### Tab Container
```css
.tabs {
  display: flex;
  border-bottom: 1px solid var(--divider);
  background-color: var(--bg-white);
}
```

#### Individual Tab
```css
.tab {
  flex: 1;
  padding: 16px 24px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-light);
  border: none;
  background: transparent;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.tab:hover {
  background-color: var(--bg-light);
}

.tab.active {
  font-weight: 600;
  color: var(--primary-blue);
  border-bottom-color: var(--primary-blue);
  background-color: var(--bg-white);
}
```

**Key Features:**
- 3px bottom border when active
- Weight changes: 500 → 600
- Color changes: light gray → blue
- Equal width tabs (flex: 1)

---

### Sidebar Navigation

```css
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: var(--text-medium);
  font-size: 15px;
  font-weight: 500;
  border-left: 3px solid transparent;
  transition: all 0.2s;
}

.nav-item:hover {
  background: var(--bg-light);
  color: var(--text-dark);
}

.nav-item.active {
  background: var(--bg-blue);
  color: var(--primary-blue);
  font-weight: 600;
  border-left-color: var(--primary-blue);
}
```

**Active Indicators:**
- 3px left border (blue)
- Blue background
- Bold text (600)
- Blue text color

---

## Layout

### Container Widths

```css
/* Main content wrapper */
.wrap {
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px;
}

/* Sidebar */
.sidebar {
  width: 280px;
}
```

---

### Grid Systems

#### Standard Grid
```css
.grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.grid-3col {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
```

#### Responsive Grid
```css
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
```

---

## Icons

### Icon Style

**Vector-Based SVG Icons:**
- Stroke-only (no fill)
- Stroke width: 2px
- Size: 20×20px (in nav) or 18×18px (in buttons)
- Color: Inherits from text color
- Rounded caps and joins

```css
.icon svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

**Examples:**
- Dashboard: Grid/layout icon
- Search: Magnifying glass
- Alert: Triangle with exclamation
- Check: Checkmark
- Shield: Protection/security icon
- Settings: Gear icon

---

## Shadows & Effects

### Shadow Values

```css
--shadow-sm: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
--shadow-md: rgba(0, 0, 0, 0.1) 0px 4px 20px 0px;
```

**Usage:**
- **Small Shadow:** Cards, buttons, subtle elevation
- **Medium Shadow:** Modals, dropdowns, significant elevation

---

### Transitions

**Standard Transition:**
```css
transition: all 0.2s ease;
```

**Common Animated Properties:**
- `background-color`
- `color`
- `border-color`
- `transform`
- `box-shadow`
- `opacity`

---

### Hover Effects

**Cards:**
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

**Buttons:**
```css
.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

---

## Usage Guidelines

### Do's ✅

1. **Use CSS Variables**
   - Always use `var(--primary-blue)` instead of hardcoded colors
   - Ensures consistency and easy theming

2. **Follow Spacing System**
   - Stick to 4px multiples (8, 12, 16, 20, 24, 30, 32)
   - Maintains visual rhythm

3. **Consistent Border Radius**
   - Cards: 15px
   - Buttons/Inputs: 6px
   - Badges: 6px
   - Nested elements: 8-12px

4. **Typography Hierarchy**
   - Use defined type scales
   - Maintain weight consistency (500/600/700)

5. **Shadows Sparingly**
   - Only use when adding elevation
   - Prefer subtle shadows (shadow-sm)

---

### Don'ts ❌

1. **Don't Mix Color Codes**
   - ❌ `color: #5551F7`
   - ✅ `color: var(--primary-blue)`

2. **Don't Use Random Spacing**
   - ❌ `margin: 13px` or `padding: 27px`
   - ✅ `margin: 12px` or `padding: 24px`

3. **Don't Overuse Bold Text**
   - Use weight 600 or 700 sparingly
   - Body text should be 400-500

4. **Don't Stack Multiple Shadows**
   - One shadow per element is sufficient

5. **Don't Use Emoji Icons in Production**
   - Use SVG vector icons instead
   - Ensures consistency across platforms

---

## Component Examples

### Example: Card with Header

```html
<div class="card">
  <h2>Card Title</h2>
  <p>Card content goes here with proper spacing and typography.</p>
</div>
```

```css
.card {
  background: var(--bg-white);
  border-radius: 15px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.card h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 16px 0;
}

.card p {
  font-size: 14px;
  color: var(--text-medium-dark);
  line-height: 1.5;
  margin: 0;
}
```

---

### Example: Form Group

```html
<div class="form-group">
  <label class="form-label">Label Text</label>
  <input type="text" class="form-input" placeholder="Placeholder">
  <span class="form-hint">Helper text goes here</span>
</div>
```

```css
.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-medium);
  margin-bottom: 6px;
  display: block;
}

.form-hint {
  font-size: 12px;
  color: var(--text-light);
  margin-top: 4px;
  display: block;
}
```

---

### Example: Status Badge

```html
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-error">Failed</span>
```

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
  }
  
  .grid-3col {
    grid-template-columns: 1fr;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  .sidebar {
    width: 240px;
  }
  
  .grid-3col {
    grid-template-columns: 1fr 1fr;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  /* Default styles apply */
}
```

---

## Accessibility

### Color Contrast

All text meets WCAG 2.1 AA standards:
- Body text (14px): 4.5:1 contrast ratio
- Large text (18px+): 3:1 contrast ratio

### Focus States

All interactive elements have visible focus states:
```css
:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(85, 81, 247, 0.12);
}
```

---

## CSS Variables Reference

### Complete List

```css
:root {
  /* Colors - Primary */
  --primary-blue: rgb(85, 81, 247);
  --primary-blue-light: rgb(97, 94, 251);
  --link-blue: rgb(139, 159, 248);
  
  /* Colors - Status */
  --success-green: rgb(13, 199, 131);
  --warning-orange: rgb(255, 153, 0);
  --error-red: rgb(255, 35, 35);
  --info-blue: rgb(21, 77, 171);
  
  /* Colors - Background */
  --bg-white: rgb(255, 255, 255);
  --bg-light: rgb(245, 247, 255);
  --bg-blue: rgb(236, 242, 252);
  --bg-gray: rgb(237, 242, 247);
  
  /* Colors - Text */
  --text-dark: rgb(26, 32, 44);
  --text-dark-alt: rgb(28, 28, 45);
  --text-medium-dark: rgb(48, 48, 69);
  --text-medium: rgb(74, 85, 104);
  --text-light: rgb(113, 118, 126);
  
  /* Colors - Borders */
  --divider: rgb(220, 229, 242);
  --border-gray: rgb(163, 173, 181);
  
  /* Effects */
  --shadow-sm: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  --shadow-md: rgba(0, 0, 0, 0.1) 0px 4px 20px 0px;
  --overlay-dark: rgba(30, 30, 30, 0.8);
}
```

---

## Version History

**Version 1.0** - November 2025
- Initial design system documentation
- Used across all Kovrr platform modules:
  - Hero Dashboard
  - Risk Register
  - Compliance Readiness
  - Assurance Plan
  - GenAI Exposure - Financial Quantification

---

## Quick Reference Card

### Most Common Values

**Colors:**
- Primary: `var(--primary-blue)`
- Text: `var(--text-dark)`, `var(--text-medium)`
- Background: `var(--bg-white)`, `var(--bg-light)`

**Typography:**
- Title: `38px / 700`
- Heading: `20px / 600`
- Body: `14px / 400`
- Label: `12px / 600`

**Spacing:**
- Card padding: `20-24px`
- Section gap: `24-32px`
- Item gap: `12-16px`

**Border Radius:**
- Cards: `15px`
- Buttons: `6px`
- Inputs: `6px`

**Shadows:**
- Default: `var(--shadow-sm)`
- Elevated: `var(--shadow-md)`

---

## Support

For questions or additions to this design system, please contact the Kovrr design team.

**Maintained by:** Kovrr Product Team  
**Last Updated:** November 2025

---

*This design system ensures consistency, scalability, and maintainability across the entire Kovrr AI Risk Management Platform.*
