# Module-by-Module Detailed Specifications

This document provides exact CSS values, HTML structures, and implementation details for each module.

---

## Module 1: Dashboard (Hero Dashboard)

### Exact CSS Values from HTML

```css
/* Tab Navigation */
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
  font-family: "Source Sans Pro", sans-serif;
}

.tab-button:hover {
  color: rgb(26, 32, 44);
  background: rgba(150, 160, 180, 0.08);
}

.tab-button.active {
  color: rgb(85, 81, 247);
  border-bottom-color: rgb(85, 81, 247);
}

/* Intelligence Grid */
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

.insight-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: rgba(255, 153, 0, 0.1);
  color: rgb(255, 153, 0);
}

.insight-badge.critical {
  background: rgba(255, 35, 35, 0.1);
  color: rgb(255, 35, 35);
}

/* Portfolio Cards */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.portfolio-card {
  background: rgb(255, 255, 255);
  border-radius: 12px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}

.portfolio-card-title {
  font-size: 14px;
  font-weight: 600;
  color: rgb(74, 85, 104);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.portfolio-metric {
  font-size: 32px;
  font-weight: 700;
  color: rgb(26, 32, 44);
  margin-bottom: 8px;
}

/* Kovrr Insights */
.actionable-steps {
  list-style: none;
  padding: 0;
  margin: 0;
}

.actionable-steps li {
  font-size: 13px;
  color: rgb(48, 48, 69);
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
  line-height: 1.4;
}

.actionable-steps li:before {
  content: "→";
  position: absolute;
  left: 0;
  color: rgb(85, 81, 247);
  font-weight: 600;
}
```

### React Component Structure

```jsx
// Dashboard.jsx
<div className="dashboard-container">
  {/* Tab Navigation */}
  <div className="tab-navigation">
    <button className={`tab-button ${activeTab === 'intelligence' ? 'active' : ''}`}>
      Risk Intelligence
    </button>
    <button className={`tab-button ${activeTab === 'portfolio' ? 'active' : ''}`}>
      Portfolio Health
    </button>
    <button className={`tab-button ${activeTab === 'insights' ? 'active' : ''}`}>
      Kovrr Insights
    </button>
  </div>

  {/* Tab Content */}
  {activeTab === 'intelligence' && (
    <div className="intelligence-grid">
      <div className="intelligence-card">
        <div className="intelligence-card-header">
          <div>
            <div className="intelligence-card-title">Risk-Control Coverage Matrix</div>
            <div className="intelligence-card-subtitle">Dot = Coverage | Color = Gap Status</div>
          </div>
          <span className="insight-badge critical">3 critical gaps</span>
        </div>
        <DotMatrixChart />
      </div>
      {/* 3 more visualization cards */}
    </div>
  )}

  {activeTab === 'portfolio' && (
    <div className="portfolio-grid">
      {/* 5 portfolio cards */}
    </div>
  )}

  {activeTab === 'insights' && (
    <div className="insights-grid">
      {/* 6 insight cards */}
    </div>
  )}
</div>
```

### Data Structure for Visualizations

```javascript
// Dot Matrix Data
const dotMatrixData = {
  risks: [
    { id: 'AIR-001', name: 'Payment Fraud' },
    { id: 'AIR-002', name: 'Biased Pricing' },
    // ... more risks
  ],
  controls: [
    { id: 'GOVERN 1.1', gap: 1.0 },
    { id: 'GOVERN 1.6', gap: 3.0 },
    // ... more controls
  ],
  coverage: {
    'AIR-001': ['GOVERN 2.2', 'MAP 3.1', 'MEASURE 2.1'],
    // ... more mappings
  }
};

// Sankey Data
const sankeyData = {
  nodes: [
    { name: 'GPT-4 (78)', layer: 0, status: 'Sanctioned' },
    { name: 'Security', layer: 1 },
    { name: 'AIR-001 (4.5)', layer: 2, priority: 'Critical' },
    // ... more nodes
  ],
  links: [
    { source: 0, target: 4, value: 78 },
    // ... more links
  ]
};

// Portfolio Health Data
const portfolioData = {
  assets: {
    total: 12,
    sanctioned: 8,
    shadow: 4,
    highRisk: 3,
    avgRiskScore: 70
  },
  risks: {
    total: 10,
    critical: 5,
    high: 1,
    medium: 2,
    low: 2
  },
  compliance: {
    maturity: 68,
    assessed: 73,
    criticalGaps: 5,
    target: 85
  },
  assurance: {
    total: 19,
    completed: 12,
    inProgress: 5,
    draft: 2,
    avgGap: 1.4
  },
  genai: {
    aal: 6200000,
    model: 'OpenAI GPT-4 Turbo',
    lastEvaluated: '2025-11-08',
    loss100Year: 85000000,
    likelihood: 68
  }
};
```

---

## Module 2: Assets Visibility

### Exact CSS Values

```css
/* Page Header */
.page-header {
  background: rgb(255, 255, 255);
  border-radius: 15px;
  padding: 24px 30px;
  margin-bottom: 24px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}

.page-header h1 {
  font-size: 38px;
  font-weight: 700;
  color: rgb(26, 32, 44);
  margin-bottom: 4px;
}

/* Stats Grid - 5 columns */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.stat-card {
  background: rgb(245, 247, 255);
  border-radius: 12px;
  padding: 20px;
}

.stat-value {
  font-size: 26px;
  font-weight: 700;
  color: rgb(26, 32, 44);
  margin-bottom: 4px;
}

.stat-value.success {
  color: rgb(13, 199, 131);
}

.stat-value.error {
  color: rgb(255, 35, 35);
}

.stat-value.warning {
  color: rgb(255, 153, 0);
}

.stat-label {
  font-size: 12px;
  color: rgb(74, 85, 104);
  font-weight: 400;
}

/* Risk Progress Bar */
.risk-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.risk-bar {
  flex: 1;
  height: 8px;
  background: rgb(237, 242, 247);
  border-radius: 4px;
  overflow: hidden;
}

.risk-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.risk-fill.low {
  background: rgb(13, 199, 131);
}

.risk-fill.medium {
  background: rgb(255, 153, 0);
}

.risk-fill.high {
  background: rgb(224, 80, 43);
}

.risk-fill.critical {
  background: rgb(255, 35, 35);
}

.risk-score {
  font-size: 14px;
  font-weight: 600;
  color: rgb(48, 48, 69);
  min-width: 30px;
}

/* Table */
tbody tr:hover {
  background-color: rgb(236, 242, 252);
}

td {
  padding: 16px;
  border-bottom: 1px solid rgb(220, 229, 242);
}

/* Discovery Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(30, 30, 30, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: rgb(255, 255, 255);
  border-radius: 16px;
  padding: 30px;
  max-width: 800px;
  width: 90%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px 0px;
}

.discovery-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.discovery-card {
  background: rgb(245, 247, 255);
  border-radius: 15px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.discovery-card:hover {
  transform: translateY(-2px);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px 0px;
}

.discovery-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgb(85, 81, 247), rgb(97, 94, 251));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
}
```

### React Component Changes

```jsx
// RiskProgressBar.jsx
const RiskProgressBar = ({ score, tier }) => {
  const getColorClass = (tier) => {
    const colors = {
      critical: 'critical',
      high: 'high',
      medium: 'medium',
      low: 'low'
    };
    return colors[tier] || 'low';
  };

  return (
    <div className="risk-progress">
      <div className="risk-bar">
        <div 
          className={`risk-fill ${getColorClass(tier)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="risk-score">{score}</span>
    </div>
  );
};

// Table cell usage
<td>
  <RiskProgressBar score={asset.risk_score} tier={asset.risk_tier} />
</td>
```

---

## Module 3: Risk Register

### Matrix Color Specifications

```css
/* Diagonal Gradient - All 25 cells */

/* Severe Row (Top) */
.matrix-cell.severe-expected {
  background-color: rgba(255, 77, 79, 0.65);
}

.matrix-cell.severe-likely {
  background-color: rgba(255, 99, 97, 0.6);
}

.matrix-cell.severe-possible {
  background-color: rgba(255, 138, 101, 0.5);
}

.matrix-cell.severe-unlikely {
  background-color: rgba(255, 171, 145, 0.45);
}

.matrix-cell.severe-rare {
  background-color: rgba(255, 171, 145, 0.4);
}

/* Significant Row */
.matrix-cell.significant-expected {
  background-color: rgba(255, 120, 117, 0.55);
}

.matrix-cell.significant-likely {
  background-color: rgba(255, 160, 122, 0.5);
}

.matrix-cell.significant-possible {
  background-color: rgba(255, 178, 132, 0.45);
}

.matrix-cell.significant-unlikely {
  background-color: rgba(255, 193, 158, 0.4);
}

.matrix-cell.significant-rare {
  background-color: rgba(144, 238, 144, 0.35);
}

/* Moderate Row */
.matrix-cell.moderate-expected {
  background-color: rgba(255, 160, 122, 0.45);
}

.matrix-cell.moderate-likely {
  background-color: rgba(255, 178, 132, 0.4);
}

.matrix-cell.moderate-possible {
  background-color: rgba(255, 193, 158, 0.4);
}

.matrix-cell.moderate-unlikely {
  background-color: rgba(255, 235, 156, 0.5);
}

.matrix-cell.moderate-rare {
  background-color: rgba(144, 238, 144, 0.45);
}

/* Minor Row */
.matrix-cell.minor-expected {
  background-color: rgba(255, 193, 158, 0.35);
}

.matrix-cell.minor-likely {
  background-color: rgba(255, 220, 130, 0.45);
}

.matrix-cell.minor-possible {
  background-color: rgba(255, 235, 156, 0.55);
}

.matrix-cell.minor-unlikely {
  background-color: rgba(255, 235, 156, 0.6);
}

.matrix-cell.minor-rare {
  background-color: rgba(144, 238, 144, 0.55);
}

/* Negligible Row (Bottom) */
.matrix-cell.negligible-expected {
  background-color: rgba(144, 238, 144, 0.35);
}

.matrix-cell.negligible-likely {
  background-color: rgba(144, 238, 144, 0.45);
}

.matrix-cell.negligible-possible {
  background-color: rgba(144, 238, 144, 0.55);
}

.matrix-cell.negligible-unlikely {
  background-color: rgba(144, 238, 144, 0.65);
}

.matrix-cell.negligible-rare {
  background-color: rgba(144, 238, 144, 0.75);
}

/* Cell Count Badge */
.cell-count {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: rgb(85, 81, 247);
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: 600;
}

.cell-scenarios {
  font-size: 10px;
  color: rgb(48, 48, 69);
  text-align: center;
  line-height: 1.3;
}
```

---

## Module 4: Compliance Readiness

### Assessment Card Specifications

```css
.assessment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.assessment-card {
  background: rgb(255, 255, 255);
  border-radius: 15px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.assessment-card:hover {
  border-color: rgb(85, 81, 247);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px 0px;
  transform: translateY(-2px);
}

.assessment-card.selected {
  border-color: rgb(85, 81, 247);
  background: rgba(85, 81, 247, 0.02);
}

/* Maturity Indicator */
.maturity-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.maturity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgb(220, 229, 242);
}

.maturity-dot.filled {
  background: rgb(85, 81, 247);
}

.maturity-dot.target {
  background: rgb(13, 199, 131);
  border: 2px solid rgb(13, 199, 131);
  width: 12px;
  height: 12px;
}
```

---

## Module 5: AI Assurance Plan

### Right Drawer Specifications

```css
.right-drawer {
  position: fixed;
  right: 0;
  top: 0;
  width: 600px;
  height: 100vh;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) -4px 0px 20px 0px;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
}

.right-drawer.open {
  transform: translateX(0);
}

.drawer-header {
  padding: 24px;
  border-bottom: 1px solid rgb(220, 229, 242);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-tabs {
  display: flex;
  border-bottom: 1px solid rgb(220, 229, 242);
  background: rgb(255, 255, 255);
}

.drawer-tab {
  flex: 1;
  padding: 12px 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: rgb(113, 118, 126);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}

.drawer-tab.active {
  font-weight: 600;
  color: rgb(85, 81, 247);
  border-bottom-color: rgb(85, 81, 247);
}

.drawer-content {
  padding: 24px;
}
```

---

## Implementation Order

1. **Dashboard** - Complete rebuild (2-3 days)
2. **Assets Visibility** - Minor updates (0.5 day)
3. **Risk Register** - Color updates (0.5 day)
4. **Compliance Readiness** - New components (2 days)
5. **AI Assurance Plan** - Right drawer (1-2 days)
6. **Financial Quantification** - Backend + frontend (3-4 days)

**Total Estimate:** 9-12 days for all modules
