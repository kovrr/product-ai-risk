# AI Asset Risk Assessment - 12 Dimensions

**Date:** November 12, 2025  
**Purpose:** Data Science Meeting - Risk Scoring Model  
**Source:** Manual Asset Discovery Questionnaire (Step 2: Risk Assessment)

---

## 📊 The 12 Risk Dimensions

### 1. Criticality *
**Label:** "1. Criticality"  
**Type:** Button Grid (4 options)

**Options:**
- `low` - ℹ️ **Low** - Info only
- `moderate` - 📊 **Moderate** - Informative
- `high` - ⚠️ **High** - High impact
- `very-high` - 🔴 **Very High** - Critical

**Default:** `moderate`  
**Hint:** 💡 Most business tools fall into 'Moderate'

---

### 2. Audience Reach *
**Label:** "2. Audience Reach"  
**Type:** Dropdown Select

**Options:**
- `low` - 👥 Low - Team/Department
- `moderate` - 👔 Moderate - Senior Management
- `high` - 🎯 High - Executive/Client Impact
- `very-high` - 🏛️ Very High - Board/Regulator

**Default:** `low`

---

### 3. Data Privacy Impact *
**Label:** "3. Data Privacy Impact"  
**Type:** Button Grid (4 options)

**Options:**
- `low` - **Low** - Public data
- `moderate` - **Moderate** - Anonymized
- `high` - **High** - PII/Finance
- `very-high` - **Very High** - Sensitive PII

**Default:** `moderate`

---

### 4. Data Classification *
**Label:** "4. Data Classification"  
**Type:** Button Grid (4 options)

**Options:**
- `external` - **External**
- `internal` - **Internal**
- `confidential` - **Confidential**
- `highly-confidential` - **Highly Conf.**

**Default:** `internal`

---

### 5. Ethical Risk *
**Label:** "5. Ethical Risk"  
**Type:** Dropdown Select

**Options:**
- `low` - ✓ Low - No bias concerns
- `moderate` - ⚠ Moderate - Potential bias but mitigated
- `high` - ⚡ High - Requires oversight
- `very-high` - 🔴 Very High - Strict oversight needed

**Default:** `low`

---

### 6. Complexity & Interpretability *
**Label:** "6. Complexity & Interpretability"  
**Type:** Dropdown Select

**Options:**
- `low` - ✓ Low - Anyone can understand
- `moderate` - 📊 Moderate - Requires expertise
- `high` - ⚡ High - Needs AI specialist
- `very-high` - 🔴 Very High - Black box system

**Default:** `moderate`

---

### 7. Cybersecurity Posture *
**Label:** "7. Cybersecurity Posture"  
**Type:** Dropdown Select

**Options:**
- `low` - ✓ Passed - Assessment achieved
- `moderate` - ⚠ Partially Achieved
- `high` - ⚡ Partially with gaps
- `not-assessed` - ❓ Not Assessed Yet
- `very-high` - 🔴 Failed or Not Performed

**Default:** `not-assessed`

---

### 8. Financial Impact of Failure *
**Label:** "8. Financial Impact of Failure"  
**Type:** Dropdown Select

**Options:**
- `low` - 💵 Minor (<$50K)
- `moderate` - 💰 Moderate ($50K-$500K)
- `high` - 💎 Major ($500K-$5M)
- `very-high` - 🏦 Severe (>$5M)

**Default:** `low`

---

### 9. Non-Financial Impact *
**Label:** "9. Non-Financial Impact"  
**Type:** Dropdown Select

**Options:**
- `low` - ✓ Minor - Limited impact
- `moderate` - ⚠ Moderate - Some concern
- `high` - ⚡ Major - Significant impact
- `very-high` - 🔴 Severe - Critical impact

**Default:** `low`

---

### 10. Sustainability Impact *
**Label:** "10. Sustainability Impact"  
**Type:** Dropdown Select

**Options:**
- `low` - 🌱 Provider has practices
- `moderate` - 🌿 Some practices
- `unknown` - ❓ Unknown
- `high` - ⚠ No details
- `very-high` - 🔴 No approach

**Default:** `unknown`

---

### 11. Availability/Resilience *
**Label:** "11. Availability/Resilience"  
**Type:** Dropdown Select

**Options:**
- `low` - ✓ Internal team - Easy to fix
- `moderate` - 📞 Vendor support - Standard
- `high` - ⚡ Specialized vendor - Complex
- `very-high` - 🔴 Niche specialist - Critical

**Default:** `moderate`

---

### 12. Human Oversight Level *
**Label:** "12. Human Oversight Level"  
**Type:** Dropdown Select

**Options:**
- `human-in-loop` - 👤 Human in the Loop (Recommended)
- `human-on-loop` - 👁️ Human on the Loop
- `sampled` - 📊 Sampled Oversight
- `autonomous` - 🤖 Fully Autonomous

**Default:** `human-in-loop`

---

## 🧮 Risk Score Calculation

### Aggregation Method
The 12 dimensions are combined using a **weighted scoring algorithm**:

```javascript
function calculateRiskScore(formData) {
  const weights = {
    criticality: 1.2,
    audienceReach: 1.1,
    dataPrivacy: 1.3,
    dataClassification: 1.2,
    ethicalRisk: 1.1,
    complexity: 0.9,
    cybersecurity: 1.3,
    financialImpact: 1.0,
    nonFinancialImpact: 1.0,
    sustainability: 0.7,
    resilience: 0.8,
    humanOversight: 1.0
  };
  
  // Convert each dimension to 0-100 scale
  // Apply weights
  // Aggregate to final score
  // Return: { aggregate: 'low|medium|high|critical', percentage: 0-100 }
}
```

### Risk Tiers
- **Low:** 0-35% - Minimal risk, standard monitoring
- **Medium:** 36-60% - Moderate risk, enhanced controls
- **High:** 61-85% - Significant risk, strict governance
- **Critical:** 86-100% - Severe risk, executive approval required

---

## 📋 Data Collection Context

### Where These Dimensions Are Used

1. **Manual Asset Discovery Wizard**
   - Step 2 of 6-step questionnaire
   - User-guided assessment
   - Real-time risk score calculation
   - Visual risk breakdown

2. **Automated Discovery**
   - Pre-populated from integrations (CASB, DLP, etc.)
   - Data scientist reviews and adjusts
   - Confidence scores per dimension

3. **Asset Detail Page**
   - Editable risk profile
   - Historical risk score tracking
   - Dimension-level drill-down

---

## 🎯 Use Cases for Data Scientists

### 1. **Risk Score Validation**
- Validate that weighted algorithm produces accurate risk tiers
- Compare against known high/low risk assets
- Adjust weights based on organizational risk appetite

### 2. **Dimension Correlation Analysis**
- Which dimensions are most correlated?
- Can we reduce dimensionality without losing accuracy?
- Are there redundant dimensions?

### 3. **Predictive Modeling**
- Can we predict risk score from asset metadata?
- Which dimensions are most predictive of incidents?
- Early warning indicators for risk escalation

### 4. **Benchmarking**
- Industry benchmarks per dimension
- Peer comparison (anonymized)
- Risk maturity scoring

### 5. **Automated Risk Assessment**
- ML model to auto-score new assets
- Confidence intervals per dimension
- Flag for human review when confidence is low

---

## 📊 Sample Data Structure

```json
{
  "asset_id": "AST-001",
  "asset_name": "GPT-4 Customer Support",
  "risk_dimensions": {
    "criticality": "high",
    "audienceReach": "critical",
    "dataPrivacy": "high",
    "dataClassification": "confidential",
    "ethicalRisk": "moderate",
    "complexity": "critical",
    "cybersecurity": "moderate",
    "financialImpact": "high",
    "nonFinancialImpact": "high",
    "sustainability": "moderate",
    "resilience": "moderate",
    "humanOversight": "human-in-loop"
  },
  "risk_score": {
    "aggregate": "high",
    "percentage": 78,
    "tier": "high",
    "requires_executive_approval": true,
    "breakdown": {
      "criticality": 75,
      "audienceReach": 90,
      "dataPrivacy": 75,
      "dataClassification": 75,
      "ethicalRisk": 50,
      "complexity": 90,
      "cybersecurity": 50,
      "financialImpact": 75,
      "nonFinancialImpact": 75,
      "sustainability": 50,
      "resilience": 50,
      "humanOversight": 50
    }
  },
  "assessment_date": "2025-11-12",
  "assessed_by": "john.doe@company.com",
  "confidence_score": 0.85
}
```

---

## 🔬 Data Science Opportunities

### Short-term (1-2 months)
1. **Validate current weighting algorithm**
2. **Analyze dimension distributions** across asset portfolio
3. **Identify outliers** and edge cases
4. **Correlation analysis** between dimensions

### Medium-term (3-6 months)
1. **Build ML model** for auto-scoring
2. **Develop confidence scoring** per dimension
3. **Create risk prediction model** (predict future risk score changes)
4. **Benchmark analysis** against industry data

### Long-term (6-12 months)
1. **Advanced NLP** for auto-extracting dimensions from documents
2. **Anomaly detection** for unusual risk profiles
3. **Causal inference** - which controls reduce which dimensions?
4. **Risk simulation** - Monte Carlo for portfolio risk

---

## 📁 Code Locations

**Risk Calculator:**
- `/frontend/src/utils/riskCalculator.js`

**Manual Wizard:**
- `/frontend/src/pages/AssetsVisibility/ManualAssetWizard.jsx`
- `/frontend/src/pages/AssetsVisibility/components/Step2RiskAssessment.jsx`

**Data Model:**
- Backend: `/backend/core/models.py` (AIAsset model)
- Mock Data: `/frontend/src/data/mock-assets.js`

---

## 🎯 Key Questions for Data Scientists

1. **Are these 12 dimensions sufficient?** Or should we add/remove?
2. **Are the weights appropriate?** How should we calibrate them?
3. **Can we reduce to fewer dimensions?** PCA or factor analysis?
4. **How do we handle missing data?** Imputation strategy?
5. **What's the confidence interval** for each risk score?
6. **Can we predict risk score** from asset metadata alone?
7. **How do we validate** the risk scores against real incidents?
8. **What's the inter-rater reliability** when multiple people assess the same asset?

---

**Prepared for:** Data Science Meeting  
**Contact:** AI Risk Team  
**Last Updated:** November 12, 2025
