# Style Nuances Checklist - Exact Match to HTML Mockups

**Date:** November 12, 2025  
**Purpose:** Document all small style nuances that must match exactly

---

## 🎨 Global Styling

### Page Background
```css
background: rgb(245, 247, 255); /* Light blue-gray */
```

### Content Container
```css
max-width: 1440px;
margin: 0 auto;
padding: 30px;
```

### Card Shadows
```css
box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px; /* Subtle */
```

---

## 📊 Assets Visibility Page

### Page Header Card
```css
background: rgb(255, 255, 255);
border-radius: 15px; /* NOT 10px */
padding: 24px 30px;
margin-bottom: 24px;
box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
```

### Title Styling
```css
h1 {
  font-size: 38px; /* NOT 28px */
  font-weight: 700;
  color: rgb(26, 32, 44); /* Dark gray, not pure black */
  margin-bottom: 4px;
}

subtitle {
  font-size: 14px;
  color: rgb(74, 85, 104); /* Medium gray */
}
```

### Stats Cards (5 or 6 cards)
```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* HTML shows 5 */
  /* OR repeat(6, 1fr) if keeping 3rd Party */
  gap: 16px;
}

.stat-card {
  background: rgb(245, 247, 255); /* Light blue-gray, NOT white */
  border-radius: 12px; /* NOT 10px */
  padding: 20px;
}

.stat-value {
  font-size: 26px; /* NOT 24px */
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: rgb(74, 85, 104);
  font-weight: 400; /* NOT 600 */
}
```

### Stat Value Colors
```css
.total { color: rgb(26, 32, 44); } /* Dark gray */
.sanctioned { color: rgb(13, 199, 131); } /* Green */
.shadow { color: rgb(255, 35, 35); } /* Red */
.pending { color: rgb(255, 193, 7); } /* Yellow/Orange */
.high-risk { color: rgb(255, 35, 35); } /* Red */
.third-party { color: rgb(85, 81, 247); } /* Primary blue */
```

### Discover Assets Button
```css
.btn-discover {
  background: rgb(85, 81, 247);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}

.btn-discover:hover {
  background: rgb(97, 94, 251);
  transform: translateY(-1px);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px 0px;
}
```

### Search Bar
```css
.search-input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid rgb(220, 229, 242);
  border-radius: 6px;
  font-size: 14px;
  background: white;
}

.search-input::placeholder {
  color: rgb(163, 173, 181);
}
```

### Filter Dropdowns
```css
select {
  padding: 10px 16px;
  border: 1px solid rgb(220, 229, 242);
  border-radius: 6px;
  font-size: 14px;
  color: rgb(48, 48, 69);
  background: white;
  min-width: 150px;
}
```

### Table Section
```css
.table-container {
  background: white;
  border-radius: 15px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table-title {
  font-size: 18px;
  font-weight: 700;
  color: rgb(26, 32, 44);
}

.table-count {
  font-size: 13px;
  color: rgb(74, 85, 104);
}
```

### Table Column Headers
```css
th {
  font-size: 11px; /* Small */
  font-weight: 700;
  color: rgb(74, 85, 104);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: left;
  padding: 12px 16px;
  background-color: rgb(250, 251, 252); /* Very light gray */
  border-bottom: 1px solid rgb(220, 229, 242);
}
```

### Table Cells
```css
td {
  padding: 16px;
  border-bottom: 1px solid rgb(220, 229, 242);
  font-size: 14px;
  color: rgb(48, 48, 69);
}

tr:hover {
  background-color: rgb(236, 242, 252); /* Light blue on hover */
}
```

### Risk Tier Badges
```css
.badge-high {
  background: rgba(255, 153, 0, 0.1);
  color: rgb(255, 153, 0);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-critical {
  background: rgba(255, 35, 35, 0.1);
  color: rgb(255, 35, 35);
}

.badge-low {
  background: rgba(13, 199, 131, 0.1);
  color: rgb(13, 199, 131);
}
```

### Risk Score Progress Bar (CRITICAL!)
```css
.risk-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%; /* Full width of cell */
}

.risk-bar {
  flex: 1;
  height: 8px; /* Exact height */
  background: rgb(237, 242, 247);
  border-radius: 4px;
  overflow: hidden;
}

.risk-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* Colors by tier */
.risk-fill.high {
  background: rgb(255, 153, 0); /* Orange */
}

.risk-fill.critical {
  background: rgb(255, 35, 35); /* Red */
}

.risk-fill.low {
  background: rgb(13, 199, 131); /* Green */
}

.risk-score-number {
  font-size: 14px;
  font-weight: 600;
  color: rgb(48, 48, 69);
  min-width: 25px;
  text-align: right;
}
```

### Regulatory Badges
```css
.regulatory-badge {
  background: rgba(85, 81, 247, 0.1);
  color: rgb(85, 81, 247);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  margin-right: 4px;
}
```

### User Avatars
```css
.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgb(85, 81, 247);
  color: white;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 🎯 Hero Dashboard

### Tab Navigation
```css
.tab-navigation {
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
  border-bottom: 2px solid rgb(220, 229, 242);
  padding-bottom: 0;
}

.tab-button {
  background: none;
  border: none;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  color: rgb(74, 85, 104);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
}

.tab-button:hover {
  color: rgb(26, 32, 44);
  background: rgba(150, 160, 180, 0.08);
}

.tab-button.active {
  color: rgb(85, 81, 247);
  border-bottom-color: rgb(85, 81, 247);
}
```

### Intelligence Cards
```css
.intelligence-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 30px;
}

.intelligence-card {
  background: rgb(255, 255, 255);
  border-radius: 15px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  border: 1px solid rgb(220, 229, 242);
  min-height: 500px;
}

.intelligence-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgb(220, 229, 242);
}

.intelligence-card-title {
  font-size: 18px;
  font-weight: 700;
  color: rgb(26, 32, 44);
}

.intelligence-card-subtitle {
  font-size: 13px;
  color: rgb(74, 85, 104);
  margin-top: 4px;
}
```

### Insight Badges
```css
.insight-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.insight-badge.critical {
  background: rgba(255, 35, 35, 0.1);
  color: rgb(255, 35, 35);
}

.insight-badge.high {
  background: rgba(255, 153, 0, 0.1);
  color: rgb(255, 153, 0);
}
```

---

## 📐 Spacing Scale

```css
/* Consistent spacing */
--spacing-xs: 8px;
--spacing-sm: 12px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

---

## 🎨 Color Palette (Exact RGB Values)

```css
/* Primary */
--primary-blue: rgb(85, 81, 247);
--primary-blue-light: rgb(97, 94, 251);

/* Status Colors */
--success-green: rgb(13, 199, 131);
--warning-orange: rgb(255, 153, 0);
--error-red: rgb(255, 35, 35);
--pending-yellow: rgb(255, 193, 7);

/* Backgrounds */
--bg-white: rgb(255, 255, 255);
--bg-light: rgb(245, 247, 255);
--bg-gray: rgb(237, 242, 247);
--bg-hover: rgb(236, 242, 252);

/* Text Colors */
--text-dark: rgb(26, 32, 44);
--text-medium-dark: rgb(48, 48, 69);
--text-medium: rgb(74, 85, 104);
--text-light: rgb(113, 118, 126);
--text-placeholder: rgb(163, 173, 181);

/* Borders */
--divider: rgb(220, 229, 242);
--border-gray: rgb(163, 173, 181);
```

---

## ✅ Critical Differences Found

### Current vs Target

| Element | Current | Target | Status |
|---------|---------|--------|--------|
| Page title font-size | 28px | 38px | ❌ Fix needed |
| Stats card background | `fill-base-secondary` | `rgb(245,247,255)` | ⚠️ Verify |
| Stats card border-radius | 10px | 12px | ❌ Fix needed |
| Stats value font-size | 24px | 26px | ❌ Fix needed |
| Header card border-radius | varies | 15px | ⚠️ Verify |
| Risk progress bar | ✅ Implemented | ✅ Matches | ✅ Good |
| Table hover color | varies | `rgb(236,242,252)` | ⚠️ Verify |

---

## 🔧 Action Items

1. ✅ **Risk Progress Bar** - Already implemented correctly
2. ❌ **Page title** - Increase from 28px to 38px
3. ❌ **Stats cards** - Update border-radius 10px → 12px
4. ❌ **Stats values** - Update font-size 24px → 26px
5. ⚠️ **Container width** - Add max-width: 1440px
6. ⚠️ **Background colors** - Verify exact RGB values
7. ⚠️ **Card shadows** - Ensure consistent subtle shadow

---

**Next Step:** Apply these exact values to all components systematically.
