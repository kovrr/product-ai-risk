# Risk Dimensions Implementation Status

## ✅ **Completed Assets (5/40)**

### 1. GitHub Copilot (ID: 1) - 48/100 Medium Risk
- All dimensions configured
- Contributions sum to 100%
- Realistic for code completion tool

### 2. Grammarly Business (ID: 2) - 28/100 Low Risk  
- All dimensions configured
- Low risk writing assistant
- Minimal data sensitivity

### 3. Salesforce Einstein (ID: 3) - 42/100 Medium Risk
- All dimensions configured
- Customer data (GDPR)
- Confidential classification

### 4. Zendesk AI Agent (ID: 4) - 58/100 High Risk
- All dimensions configured
- Customer-facing with PII
- High data privacy and audience reach

### 5. ChatGPT (ID: 21) - 85/100 Critical Risk
- All dimensions configured
- Shadow AI with no oversight
- Very high across all categories

---

## ⏳ **Remaining Assets (35/40)**

### **Priority 1: High/Critical Risk Assets (Need Dimensions)**

| ID | Name | Score | Tier | Status | Notes |
|----|------|-------|------|--------|-------|
| 6 | Azure OpenAI | 60 | high | ❌ Missing | PII, financial data |
| 11 | Autonomous Trading Bot | 85 | critical | ❌ Missing | Financial impact |
| 12 | Healthcare Diagnosis AI | 82 | critical | ❌ Missing | Life/safety critical |
| 14 | Facial Recognition System | 80 | critical | ❌ Missing | Biometric data |
| 16 | Predictive Policing AI | 70 | high | ❌ Missing | Ethical concerns |
| 20 | Deepfake Detection | 66 | high | ❌ Missing | Security critical |
| 22 | DeepSeek Coder | 82 | critical | ❌ Missing | Shadow AI |
| 23 | Midjourney | 80 | critical | ❌ Missing | Shadow AI |
| 24 | Claude AI | 90 | critical | ❌ Missing | Shadow AI |
| 25 | Perplexity AI | 92 | critical | ❌ Missing | Shadow AI |

### **Priority 2: Medium Risk Assets (Need Dimensions)**

| ID | Name | Score | Tier | Status |
|----|------|-------|------|--------|
| 5 | Tableau AI | 32 | low | ❌ Missing |
| 7 | Microsoft 365 Copilot | 38 | medium | ❌ Missing |
| 8 | Notion AI | 48 | medium | ❌ Missing |
| 9 | Jasper AI | 48 | medium | ❌ Missing |
| 10 | Copy.ai | 40 | medium | ❌ Missing |
| 13 | Sentiment Analysis API | 62 | high | ❌ Missing |
| 15 | Resume Screening AI | 54 | medium | ❌ Missing |
| 17 | Chatbot Builder | 48 | medium | ❌ Missing |
| 18 | Translation API | 48 | medium | ❌ Missing |
| 19 | OCR Service | 64 | high | ❌ Missing |
| 26 | Stable Diffusion | 62 | high | ❌ Missing |
| 27 | Runway ML | 54 | medium | ❌ Missing |

### **Priority 3: Low Risk Assets (Need Dimensions)**

| ID | Name | Score | Tier | Status |
|----|------|-------|------|--------|
| 28 | Zapier AI | 22 | low | ❌ Missing |
| 29 | Calendly AI | 25 | low | ❌ Missing |
| 30 | Loom AI | 28 | low | ❌ Missing |
| ... | (remaining low-risk) | <35 | low | ❌ Missing |

---

## 📋 **Implementation Guide**

### **For Each Asset, Add:**

```typescript
// Risk Dimensions ([Tier] Risk - [Score]/100)
// Target: [Score] = Total Weighted Score / 12.0
criticality: "low|moderate|high|very-high",
audienceReach: "low|moderate|high|very-high",
dataPrivacy: "low|moderate|high|very-high",
dataClassification: "external|internal|confidential|highly-confidential",
ethicalRisk: "low|moderate|high|very-high",
complexity: "low|moderate|high|very-high",
cybersecurity: "low|moderate|high|very-high",
financialImpact: "low|moderate|high|very-high",
nonFinancialImpact: "low|moderate|high|very-high",
sustainability: "low|moderate|high|very-high|unknown",
resilience: "low|moderate|high|very-high",
humanOversight: "human-in-loop|human-on-loop|sampled|autonomous"
// Total: [calculated] / 12.0 = [result] ≈ [target]
```

### **Score Calculation:**
- low = 25
- moderate = 50
- high = 75
- very-high = 100

### **Weights:**
- criticality: 1.2
- audienceReach: 1.1
- dataPrivacy: 1.3
- dataClassification: 1.2
- ethicalRisk: 1.1
- complexity: 0.9
- cybersecurity: 1.3
- financialImpact: 1.0
- nonFinancialImpact: 1.0
- sustainability: 0.7
- resilience: 0.8
- humanOversight: 1.0

### **Formula:**
```
Total Weighted Score = Σ(dimension_score × weight)
Final Score = Total Weighted Score / 12.0
```

---

## 🎯 **Quick Reference by Risk Tier**

### **Critical (85-100)**
- Very high: criticality, dataPrivacy, cybersecurity, nonFinancialImpact
- High: audienceReach, ethicalRisk, complexity, financialImpact, resilience
- Autonomous: humanOversight
- Highly-confidential: dataClassification

### **High (61-84)**
- High: criticality, dataPrivacy, cybersecurity, nonFinancialImpact, resilience
- Moderate: audienceReach, ethicalRisk, complexity, financialImpact, sustainability
- Sampled: humanOversight
- Confidential: dataClassification

### **Medium (36-60)**
- Moderate: most dimensions
- Low: ethicalRisk, financialImpact
- Human-on-loop: humanOversight
- Internal/Confidential: dataClassification

### **Low (0-35)**
- Low: all dimensions
- Human-in-loop: humanOversight
- External: dataClassification

---

## ✅ **Validation Checklist**

For each asset with dimensions:
- [ ] Calculated score matches asset.risk_score (±3 points acceptable)
- [ ] Category contributions sum to 100%
- [ ] Dimensions make sense for asset type
- [ ] Personal data → higher dataPrivacy
- [ ] Customer-facing → higher audienceReach
- [ ] Shadow AI → autonomous oversight, very-high cybersecurity
- [ ] Financial systems → higher financialImpact
- [ ] Healthcare/Safety → very-high criticality

---

**Status**: 5/40 assets complete (12.5%)
**Next**: Add dimensions to remaining 35 assets systematically
