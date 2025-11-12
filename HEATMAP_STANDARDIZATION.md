# Heat Map Standardization - Complete

**Date:** November 12, 2025  
**Status:** ✅ IMPLEMENTED  
**Purpose:** Ensure all risk heat maps use identical colors and styling

---

## 🎯 Objective

All risk prioritization matrices (heat maps) across the application now use the exact same diagonal gradient colors and styling from the HTML mockup.

---

## 📦 Centralized Utility

### Location
`/frontend/src/utils/heatMapColors.ts`

### Exports

#### Functions
- `getHeatMapColor(impactIndex, likelihoodIndex)` - Returns exact RGBA color
- `getImpactIndex(impact)` - Converts impact level to 0-4 index
- `getLikelihoodIndex(likelihood)` - Converts likelihood level to 0-4 index
- `getHeatMapColorFromLevels(impact, likelihood)` - Direct color from strings
- `getHeatMapTextColor()` - Returns consistent text color

#### Constants
- `HEAT_MAP_STYLES` - All styling constants (borders, badges, labels, etc.)

---

## 🎨 Color Matrix (5×5)

### Diagonal Gradient Pattern
**Red (top-left) → Orange → Yellow → Green (bottom-right)**

### Exact Colors

#### Severe Row (impactIndex = 4)
- Expected: `rgba(255, 77, 79, 0.65)` - Darkest red
- Possible: `rgba(255, 99, 97, 0.6)`
- Unlikely: `rgba(255, 138, 101, 0.5)`
- Rare: `rgba(255, 171, 145, 0.45)`
- Very Rare: `rgba(255, 171, 145, 0.4)`

#### Significant Row (impactIndex = 3)
- Expected: `rgba(255, 120, 117, 0.55)`
- Possible: `rgba(255, 160, 122, 0.5)`
- Unlikely: `rgba(255, 178, 132, 0.45)`
- Rare: `rgba(255, 193, 158, 0.4)`
- Very Rare: `rgba(144, 238, 144, 0.35)` - Transition to green

#### Moderate Row (impactIndex = 2)
- Expected: `rgba(255, 160, 122, 0.45)`
- Possible: `rgba(255, 178, 132, 0.4)`
- Unlikely: `rgba(255, 193, 158, 0.4)`
- Rare: `rgba(255, 235, 156, 0.5)` - Yellow
- Very Rare: `rgba(144, 238, 144, 0.45)`

#### Minor Row (impactIndex = 1)
- Expected: `rgba(255, 193, 158, 0.35)`
- Possible: `rgba(255, 220, 130, 0.45)`
- Unlikely: `rgba(255, 235, 156, 0.55)`
- Rare: `rgba(255, 235, 156, 0.6)`
- Very Rare: `rgba(144, 238, 144, 0.55)`

#### Negligible Row (impactIndex = 0)
- Expected: `rgba(144, 238, 144, 0.35)`
- Possible: `rgba(144, 238, 144, 0.45)`
- Unlikely: `rgba(144, 238, 144, 0.55)`
- Rare: `rgba(144, 238, 144, 0.65)`
- Very Rare: `rgba(144, 238, 144, 0.75)` - Lightest green

---

## 🎨 Styling Constants

### Text & Labels
```typescript
textColor: 'rgb(48, 48, 69)'        // Dark text for all cells
labelColor: 'rgb(74, 85, 104)'      // Gray for axis labels
labelFontSize: '11px'
labelFontWeight: '600'
labelTextTransform: 'uppercase'
labelLetterSpacing: '0.5px'
```

### Borders
```typescript
cellBorder: 'rgb(220, 229, 242)'           // Default border
cellBorderSelected: 'rgb(85, 81, 247)'     // Selected cell border
```

### Count Badges
```typescript
countBadgeBg: 'rgb(85, 81, 247)'     // Primary blue
countBadgeText: 'white'
fontSize: '10px'
fontWeight: '600'
padding: '2px 6px'
borderRadius: 'full'
```

---

## 📍 Components Using Heat Map

### 1. RiskMatrix Component ✅
**Location:** `/frontend/src/components/organisms/RiskMatrix.tsx`

**Usage:**
```typescript
import { getHeatMapColor, HEAT_MAP_STYLES } from '../../utils/heatMapColors';

const cellColor = getHeatMapColor(impactIndex, likelihoodIndex);
```

**Status:** ✅ Updated to use centralized utility

---

### 2. Risk Register Visualization Tab ✅
**Location:** `/frontend/src/pages/RiskRegister.jsx`

**Usage:**
```jsx
<RiskMatrix 
  risks={filteredRisks}
  onRiskClick={handleRiskClick}
  onCellClick={handleCellClick}
  selectedCell={selectedCell}
/>
```

**Status:** ✅ Uses RiskMatrix component (inherits standardization)

---

### 3. Dashboard Risk Intelligence ✅
**Location:** `/frontend/src/pages/DashboardNew.jsx`

**Usage:**
```jsx
<RiskMatrix 
  risks={mockRisks}
  className="w-full"
/>
```

**Status:** ✅ Uses RiskMatrix component (inherits standardization)

---

## 🔧 How to Use

### For New Heat Maps

1. **Import the utility:**
```typescript
import { 
  getHeatMapColor, 
  getHeatMapTextColor,
  HEAT_MAP_STYLES 
} from '../utils/heatMapColors';
```

2. **Get cell color:**
```typescript
const cellColor = getHeatMapColor(impactIndex, likelihoodIndex);
// OR
const cellColor = getHeatMapColorFromLevels('Severe', 'Expected');
```

3. **Apply styling:**
```jsx
<div 
  style={{ backgroundColor: cellColor }}
  className={`border-2 text-[${HEAT_MAP_STYLES.textColor}]`}
>
  {/* Cell content */}
</div>
```

4. **Use styling constants:**
```jsx
<div className={`
  border-[${HEAT_MAP_STYLES.cellBorder}]
  text-[${HEAT_MAP_STYLES.labelColor}]
  text-[${HEAT_MAP_STYLES.labelFontSize}]
  font-[${HEAT_MAP_STYLES.labelFontWeight}]
  uppercase
  tracking-[${HEAT_MAP_STYLES.labelLetterSpacing}]
`}>
  IMPACT
</div>
```

---

## ✅ Benefits

1. **Consistency** - All heat maps look identical
2. **Maintainability** - Single source of truth for colors
3. **Easy Updates** - Change once, applies everywhere
4. **Type Safety** - TypeScript types for impact/likelihood levels
5. **Documentation** - Clear color mapping and usage examples

---

## 🎯 Visual Pattern

The heat map creates a smooth diagonal gradient:

```
        RARE    UNLIKELY  POSSIBLE  EXPECTED
SEVERE   🟠       🔴        🔴        🔴
SIGNIF   🟡       🟠        🔴        🔴
MODER    🟢       🟡        🟠        🔴
MINOR    🟢       🟢        🟡        🟠
NEGLIG   🟢       🟢        🟢        🟢
```

- **Top-left (Severe + Expected):** Darkest red
- **Bottom-right (Negligible + Very Rare):** Lightest green
- **Diagonal:** Smooth transition through orange and yellow

---

## 📊 Testing

To verify heat map consistency:

1. **Navigate to Risk Register** → Visualization tab
2. **Navigate to Dashboard** → Risk Intelligence section
3. **Compare colors** - Should be identical
4. **Check labels** - Should use same font, size, color
5. **Check badges** - Should use primary blue background

---

## 🚀 Future Enhancements

Potential additions to the utility:

1. **Risk score calculation** - Centralized formula
2. **Cell hover states** - Consistent hover effects
3. **Animation utilities** - Smooth transitions
4. **Export functions** - Generate heat map images
5. **Accessibility** - WCAG contrast ratios

---

**Implementation Complete:** November 12, 2025  
**All heat maps standardized:** ✅  
**Centralized utility created:** ✅  
**Documentation complete:** ✅
