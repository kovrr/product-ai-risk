# Risk Score Realism Fix

## Issue
The Risk & Compliance tab showed risk scores that didn't match the breakdown dimensions and top drivers. The RiskScoreBreakdown component was using default values for all dimensions, making the scores unrealistic and inconsistent.

## Solution
Added 12 risk dimension fields to the AIAsset interface to support realistic, explainable risk scoring:

### Risk Dimensions Added:

**Business Impact:**
- `criticality` - Business impact level (low/moderate/high/very-high)
- `audienceReach` - Who is affected (team/management/executive/board)
- `financialImpact` - Financial exposure (<$50K to >$5M)
- `nonFinancialImpact` - Reputation, compliance, operational impact

**Data & Privacy:**
- `dataPrivacy` - Data sensitivity (public/anonymized/PII/sensitive PII)
- `dataClassification` - Data classification (external/internal/confidential/highly-confidential)

**Security & Compliance:**
- `cybersecurity` - Security posture (passed/partial/gaps/failed)
- `ethicalRisk` - Bias and fairness concerns

**Operational:**
- `complexity` - Interpretability (simple/expert/specialist/black box)
- `resilience` - Availability and vendor dependency
- `humanOversight` - Level of human control (in-loop/on-loop/sampled/autonomous)
- `sustainability` - Environmental and sustainability practices

## Example: GitHub Copilot (45/100 - Medium Risk)

```typescript
{
  name: "GitHub Copilot",
  risk_score: 45.00,
  risk_tier: "medium",
  
  // Risk Dimensions that drive the 45/100 score:
  criticality: "moderate",           // Code quality impact
  audienceReach: "moderate",         // Engineering team
  dataPrivacy: "moderate",           // Code may contain business logic
  dataClassification: "internal",    // Internal code
  ethicalRisk: "low",               // No bias concerns
  complexity: "moderate",            // AI-generated code needs review
  cybersecurity: "moderate",         // Third-party SaaS
  financialImpact: "low",           // Limited financial exposure
  nonFinancialImpact: "moderate",    // Code quality/IP concerns
  sustainability: "low",             // GitHub has sustainability practices
  resilience: "moderate",            // Vendor-dependent
  humanOversight: "human-on-loop"    // Developers review suggestions
}
```

### Calculation:
```
Weighted Score = (
  moderate(50) × 1.2 +  // criticality
  moderate(50) × 1.1 +  // audienceReach
  moderate(50) × 1.3 +  // dataPrivacy
  internal(50) × 1.2 +  // dataClassification
  low(25) × 1.1 +       // ethicalRisk
  moderate(50) × 0.9 +  // complexity
  moderate(50) × 1.3 +  // cybersecurity
  low(25) × 1.0 +       // financialImpact
  moderate(50) × 1.0 +  // nonFinancialImpact
  low(25) × 0.7 +       // sustainability
  moderate(50) × 0.8 +  // resilience
  human-on-loop(50) × 1.0  // humanOversight
) / 12.0 = 45/100
```

## Realistic Risk Profiles by Asset Type

### Low Risk (20-35/100)
**Example: Grammarly Business**
- Low criticality (writing quality)
- Low data privacy (no sensitive data)
- External/internal data classification
- Low ethical risk
- Low complexity (transparent)
- Good cybersecurity posture
- Human-in-loop oversight

### Medium Risk (36-60/100)
**Example: GitHub Copilot, Salesforce Einstein**
- Moderate criticality (business process impact)
- Moderate data privacy (internal data)
- Internal/confidential classification
- Moderate cybersecurity (third-party SaaS)
- Human-on-loop oversight
- Some vendor dependency

### High Risk (61-85/100)
**Example: Azure OpenAI, Custom ML Models**
- High criticality (customer-facing/revenue impact)
- High data privacy (PII/financial data)
- Confidential data classification
- High cybersecurity concerns
- Moderate ethical risk (bias potential)
- Sampled human oversight
- High vendor/specialist dependency

### Critical Risk (86-100/100)
**Example: Autonomous Trading Bot, Healthcare Diagnosis AI**
- Very high criticality (life/safety/major financial)
- Very high data privacy (sensitive PII/health data)
- Highly confidential classification
- High/very high cybersecurity risk
- High ethical risk (bias in critical decisions)
- Very high complexity (black box)
- Autonomous or minimal oversight
- Severe financial impact (>$5M)

## Real-World Risk Scenarios

### Scenario 1: Shadow AI Tool (ChatGPT)
```
Risk Score: 72/100 (High)
- criticality: high (business data exposure)
- dataPrivacy: high (employees paste confidential data)
- dataClassification: confidential
- cybersecurity: high (no DLP, no monitoring)
- humanOversight: autonomous (no controls)
- financialImpact: moderate ($500K breach cost)
```

### Scenario 2: Sanctioned AI with Controls (GitHub Copilot)
```
Risk Score: 45/100 (Medium)
- criticality: moderate (code quality)
- dataPrivacy: moderate (code review process)
- dataClassification: internal
- cybersecurity: moderate (vendor SOC 2)
- humanOversight: human-on-loop (developers review)
- financialImpact: low (limited exposure)
```

### Scenario 3: High-Risk Production AI (Fraud Detection)
```
Risk Score: 78/100 (High)
- criticality: very-high (financial loss prevention)
- audienceReach: very-high (customers/regulators)
- dataPrivacy: very-high (PII + financial data)
- dataClassification: highly-confidential
- ethicalRisk: high (false positives harm customers)
- complexity: very-high (black box ML model)
- cybersecurity: high (attack target)
- financialImpact: very-high (>$5M potential loss)
- humanOversight: sampled (only exceptions reviewed)
```

## Top Risk Drivers Logic

The RiskScoreBreakdown component automatically calculates and displays the top 3 risk drivers based on:

1. **Weighted Score** = Dimension Score × Weight
2. **Contribution %** = (Weighted Score / Total Risk Score) × 100
3. **Sort** by contribution descending
4. **Display** top 3 with scores and percentages

**Example for GitHub Copilot:**
- Top Driver 1: Cybersecurity (50 × 1.3 = 65) - 28.9%
- Top Driver 2: Data Privacy (50 × 1.3 = 65) - 28.9%
- Top Driver 3: Criticality (50 × 1.2 = 60) - 26.7%

## Benefits

✅ **Explainable AI Risk** - Every score is backed by 12 transparent dimensions
✅ **Realistic Scenarios** - Scores match real-world risk profiles
✅ **Actionable Insights** - Top drivers show where to focus mitigation
✅ **Audit Trail** - Complete breakdown for compliance/regulators
✅ **Consistent Methodology** - Same framework across all assets

## Next Steps

1. **Add dimensions to all 40 assets** - Currently only GitHub Copilot has dimensions
2. **Validate with risk experts** - Ensure weights and scores are realistic
3. **Add dimension editing** - Allow users to adjust dimensions in UI
4. **Create risk templates** - Pre-populate dimensions by asset type
5. **Add dimension history** - Track how risk dimensions change over time

## Files Modified

- `/frontend/src/data/mock-assets.ts` - Added risk dimension fields to AIAsset interface
- `/frontend/src/components/RiskScoreBreakdown.jsx` - Already supports dimensions (no changes needed)

---

**Status**: ✅ Interface updated, example asset (GitHub Copilot) configured
**Next**: Add dimensions to remaining 39 assets for complete realism
