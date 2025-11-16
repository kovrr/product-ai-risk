# AIKovrr Design System – Color Guidelines

> **Goal:** Keep color usage consistent across the entire product (layout, components, notifications, statuses, charts, and typography).

---

## 1. Core Color Palette

### 1.1 Brand Purples

- **Purple-500** `#5551F7` – Primary brand color  
  - Usage: primary actions, primary charts, key highlights.
- **Purple-400** `#8B9FF8` – Secondary brand color  
  - Usage: secondary actions, secondary charts, emphasis backgrounds.
- **Purple-2-200** `#BBBAFC` – Light brand tint  
  - Usage: subtle backgrounds, chips, soft highlights.

### 1.2 Blues (Neutrals / Surfaces)

- **Blue-400** `#DCE5F2`  
  - Usage: cards, light panels, low-emphasis surfaces.
- **Blue-300** `#EAF1FC`  
  - Usage: table rows, secondary surfaces, subtle callouts.
- **Blue-200** `#F5F7FF`  
  - Usage: soft backgrounds, hover states.
- **Blue-2-300** `#EAF4FF`  
  - Usage: soft informational backgrounds, info banners.

### 1.3 Grays (Neutral Scale)

- **Gray-2-400** `#8A8DA9`  
  - Usage: alternative gray for visualization, NA states.
- **Black** `#1C1C2D`  
  - Usage: primary text on light backgrounds.
- **Gray-900** `#303045`  
  - Usage: strong headings, sidebar primary.
- **Gray-700** `#7A7F86`  
  - Usage: secondary text, icons default.
- **Gray-600** `#A9B4BC`  
  - Usage: tertiary text, muted labels.
- **Gray-500** `#CED7DE`  
  - Usage: borders, axis lines, neutral strokes.
- **Gray-300** `#F1F1F1`  
  - Usage: dividers, disabled backgrounds, soft strokes.
- **Gray-200** `#F8F8F8`  
  - Usage: very light backgrounds, table striping.
- **White** `#FFFFFF`  
  - Usage: main background, card surface.

### 1.4 Semantic Colors

- **Green-100** `#CEFFE0`  
  - Usage: soft positive backgrounds.
- **Green-200** `#7CD011`  
  - Usage: positive tags, medium-high success.
- **Green-2-500** `#0DC783`  
  - Usage: primary success, strong positive states.
- **Green-2-300** `#397858`  
  - Usage: darker success/emphasis, charts.
- **Blue-800** `#154DAB`  
  - Usage: information emphasis, strong informational text.
- **Blue-900** `#202993`  
  - Usage: deep information / focus states.
- **Red-500** `#EB491F`  
  - Usage: errors, high-risk, critical issues.
- **Red-2-300** `#DE5B58`  
  - Usage: secondary error, warnings in charts.
- **Orange-400** `#FF802E`  
  - Usage: medium risk / warning.
- **Orange-300** `#FF9900`  
  - Usage: general warning, alert backgrounds.
- **Orange-200 (Yellow)** `#FBBC09`  
  - Usage: low-severity warnings, upcoming events.
- **Brown** `#9F3C00`  
  - Usage: special impact scenarios.
- **Sand** `#FCD4A4`  
  - Usage: regulatory/NA scenarios, subtle highlights.

### 1.5 Alpha

- **Black_90** `rgba(28, 28, 30, 0.9)` (Black with 90% opacity)  
  - Usage: overlays, modals, drawers, focus dimmers.

---

## 2. Color Tokens

### 2.1 Fill Tokens

#### 2.1.1 Fill Base Scale

- **Fill/Base/+5** → Gray-500  
- **Fill/Base/+4** → Blue-400  
- **Fill/Base/+3** → Blue-300  
- **Fill/Base/+2** → Blue-2-300  
- **Fill/Base/+1** → Blue-200  
- **Fill/Base/0**  → White  
- **Fill/Base/-1** → Gray-200  

Usage:

- Use **+5 / +4** for dense surfaces (sidebars, panels with high visual weight).  
- Use **+3 / +2 / +1** for soft backgrounds, table rows, "cards inside cards".  
- Use **0 / -1** for page background, section separation.

#### 2.1.2 Fill Brand

- **Fill/Brand/Primary** → Purple-500  
- **Fill/Brand/Secondary** → Purple-400  

Usage:

- Primary buttons, key CTAs, primary chips/badges → `Fill/Brand/Primary`.  
- Secondary buttons, secondary nav elements → `Fill/Brand/Secondary`.

#### 2.1.3 Fill Specific

- **Fill/Specific/Tooltip** → Black_90  
- **Fill/Specific/Background** → Blue-300  
- **Fill/Specific/Divider** → Blue-400  
- **Fill/Specific/SidebarPrimary** → Gray-900  
- **Fill/Specific/SidebarChild** → Black  
- **Fill/Specific/IconDefault** → Gray-700  
- **Fill/Specific/IconHover** → Gray-200  
- **Fill/Specific/IconOnPress** → Gray-300  

Usage:

- Tooltips and overlays always use `Tooltip`.  
- All global app background sections use `Background`.  
- Sidebars follow `SidebarPrimary` for base and `SidebarChild` for nested items.  
- Icon states (default / hover / press) must use these tokens, not raw hex.

#### 2.1.4 Fill Information

- **Fill/Info/NegativeError** → Red-500  
- **Fill/Info/Warning** → Yellow  
- **Fill/Info/Success** → Green-2-500  
- **Fill/Info/Information** → Blue-800  

Usage:

- All banners, toasts, inline alerts and status badges map directly to these four tokens.

---

## 3. Text Tokens

### 3.1 Text Base

- **Text/Base/Primary** → Gray-900  
- **Text/Base/Secondary** → Gray-700  
- **Text/Base/Tertiary** → Gray-600  
- **Text/Base/Invert** → White  

Usage:

- Main body + key titles → `Primary`.  
- Labels, helper text, subtitled metrics → `Secondary`.  
- Hints, disabled labels → `Tertiary`.  
- Text on dark surfaces (sidebars, chips, CTAs on dark) → `Invert`.

### 3.2 Text Brand

- **Text/Brand/Primary** → Purple-500  
- **Text/Brand/Secondary** → Purple-400  

Usage:

- Links, clickable text in brand color, KPI highlights.

### 3.3 Text Specific

- **Text/Specific/SidebarIdle** → Gray-600  
- **Text/Specific/SidebarHover** → Gray-500  
- **Text/Specific/SidebarActive** → White  

Usage:

- Navigation sidebar states (idle/hover/active) must use these tokens.

### 3.4 Text Information

- **Text/Info/NegativeError** → Red-500  
- **Text/Info/Success** → Green-2-500  
- **Text/Info/Information** → Blue-800  

Usage:

- Inline status text (e.g., "Failed", "Completed", "In progress") uses these tokens and should be aligned with the corresponding Fill/Info tokens.

---

## 4. Stroke (Border) Tokens

### 4.1 Stroke Base

- **Stroke/Base/+2** → Gray-700  
- **Stroke/Base/+1** → Gray-600  
- **Stroke/Base/0**  → Gray-500  

Usage:

- Strong borders (focus, selected) → `+2`.  
- Default component borders → `+1`.  
- Subtle separators, chart axes → `0`.

### 4.2 Stroke Brand

- **Stroke/Brand/Primary** → Purple-500  
- **Stroke/Brand/Secondary** → Purple-400  

Usage:

- Active states for brand components, focused fields, selected items.

### 4.3 Stroke Information

- **Stroke/Info/NegativeError** → Red-500  

Usage:

- Error field borders, error segments in charts, critical outlines.

---

## 5. Visualization Tokens

### 5.1 Visualization Base

- **Viz/Base/Primary** → Purple-500  
- **Viz/Base/Secondary** → Blue-300  
- **Viz/Base/Tertiary** → Black  
- **Viz/Base/Marker** → Red-500  

Usage:

- Primary series in charts → `Primary`.  
- Secondary series → `Secondary`.  
- Generic/neutral series → `Tertiary`.  
- Thresholds, markers, outliers → `Marker`.

### 5.2 Visualization – Event Types

- **Viz/Event/Attritional** → Gray-2-400  
- **Viz/Event/DataBreach** → Orange-300  
- **Viz/Event/Interruption** → Green-2-100  
- **Viz/Event/Ransomware** → Red-2-300  

Usage:

- All charts and legends representing event types must use these colors consistently.

### 5.3 Visualization – Maturity Levels

- **Viz/Maturity/0** → Red-500  
- **Viz/Maturity/1** → Orange-400  
- **Viz/Maturity/2** → Yellow  
- **Viz/Maturity/3** → Green-2-200  
- **Viz/Maturity/4** → Green-2-500  
- **Viz/Maturity/NA** → Gray-2-400  

Usage:

- Maturity heatmaps, score badges, AI Assurance maturity visuals.

### 5.4 Visualization – Impact Scenarios

- **Viz/Scenario/RansomwareExtortion** → Blue-800  
- **Viz/Scenario/BusinessInterruption** → Purple-500  
- **Viz/Scenario/ThirdPartyServiceProvider** → Purple-2-200  
- **Viz/Scenario/ThirdPartyLiability** → Brown  
- **Viz/Scenario/DataBreachPrivacy** → Orange-400  
- **Viz/Scenario/RegulationCompliance** → Sand  

Usage:

- Scenario-based views, risk maps, scenario filters.

### 5.5 Visualization – Sphere

- **Viz/Sphere/AG** → Blue-400  
- **Viz/Sphere/AGType** → Purple-500  
- **Viz/Sphere/Company** → Purple-400  

Usage:

- Diagrams where sphere/type/company are distinct clusters.

### 5.6 Visualization – Hazard

- **Viz/Hazard/Tech** → Purple-400  
- **Viz/Hazard/Provider** → Orange-400  

Usage:

- Hazard categories in charts or legends.

### 5.7 Visualization – Risk Position

- **Viz/Risk/Current** → Purple-500  
- **Viz/Risk/Baseline** → Blue-800  
- **Viz/Risk/Minimal** → Purple-400  
- **Viz/Risk/19-** → Red-500  
- **Viz/Risk/20-39** → Orange-400  
- **Viz/Risk/40-69** → Yellow  
- **Viz/Risk/70-89** → Green-2-200  
- **Viz/Risk/90+** → Green-2-500  

Usage:

- Risk thermometer, banded charts, heatmaps.

---

## 6. General Rules

- **Never use raw hex values directly in the app.** Always use the token name (e.g., `Text/Base/Primary`, `Fill/Info/Success`).
- **Status colors are global.**  
  Error/warning/success/info must look the same in:
  - Toasts  
  - Banners  
  - Badges  
  - Inline labels  
  - Icons
- **Dark text on light backgrounds:** use `Text/Base/Primary` or `Secondary`.  
  **Light text on dark backgrounds:** use `Text/Base/Invert`.
- **Brand usage:**  
  Purple-500 and Purple-400 are reserved for primary emphasis and should not be overused on secondary UI clutter.
- **Accessibility:**  
  When in doubt, prefer higher contrast combinations:  
  - Text/Base/Primary on Fill/Base/0–+2.  
  - Text/Base/Invert on SidebarPrimary, SidebarChild, and overlays.
