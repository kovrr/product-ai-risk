# Combined AI Asset Detection Guide

**Script**: `combined_ai_asset_detector.py`  
**Purpose**: Cross-validate AI assets using both Zscaler and DSPM data sources

---

## 🎯 Key Features

### 1. **Cross-Validation**
- Detects AI assets in Zscaler logs (network traffic)
- Detects AI assets in DSPM logs (application usage)
- **Cross-validates** when same asset found in both sources → CONFIRMED

### 2. **Confidence Levels**
- **CONFIRMED**: Detected in both Zscaler AND DSPM (highest confidence)
- **VERY HIGH**: Detected in DSPM only (application-level detection)
- **HIGH**: Detected in Zscaler only (network traffic analysis)

### 3. **Asset Classification**
- ✅ **Approved AI**: Sanctioned enterprise tools (e.g., Microsoft 365 Copilot)
- ❌ **Shadow AI**: Unapproved tools (e.g., ChatGPT, Claude)
- 🚨 **Risk Levels**: CRITICAL, HIGH, MEDIUM

---

## 📋 Matching Rules

### **Rule 1: Exact Name Match (DSPM)**
```
DSPM App Name = "ChatGPT"
→ Asset: ChatGPT
→ Confidence: VERY HIGH
→ Reason: Application-level detection
```

### **Rule 2: URL Pattern Match (Zscaler)**
```
Zscaler URL contains "openai.com"
→ Asset: ChatGPT
→ Confidence: HIGH
→ Reason: Network traffic to known AI domain
```

### **Rule 3: Cross-Validation (Both Sources)**
```
DSPM: "ChatGPT" detected (5 times)
Zscaler: "openai.com" detected (87 times)
→ Asset: ChatGPT
→ Confidence: CONFIRMED
→ Reason: Validated across multiple data sources
```

### **Rule 4: Sensitive Data Exposure (DSPM Only)**
```
DSPM: "Microsoft 365 Copilot Chat" + Sensitive Data: "PHI, PII"
→ Asset: Microsoft 365 Copilot
→ Risk Level: MEDIUM → HIGH (due to data exposure)
→ Action: Review DPA/BAA compliance
```

### **Rule 5: Shadow AI Detection**
```
IF Asset NOT in approved list
AND (Zscaler detections > 0 OR DSPM detections > 0)
THEN
    → Shadow AI ❌
    → Flag for investigation
```

---

## 🚀 Usage

### **Basic Usage**
```bash
python combined_ai_asset_detector.py zscaler_logs.csv dspm_logs.csv output_report.xlsx
```

### **With Your Test Data**
```bash
cd /Users/liransorani/CascadeProjects/aikovrr/product/eval/network_analysis

python combined_ai_asset_detector.py \
    /tmp/ff/2025-11-26T06-18-37_UTC_web_log-redacted.csv \
    DSPM_list_of_apps_governance_2025-11-26.csv \
    combined_ai_assets_report.xlsx
```

---

## 📊 Output Report Structure

### **Sheet 1: Executive Summary**
- Total assets detected
- Confirmed vs single-source detections
- Approved vs shadow AI breakdown
- Risk level distribution

### **Sheet 2: Confirmed Assets** ⭐
- Assets detected in BOTH sources
- Highest confidence
- Cross-validated usage statistics

### **Sheet 3: Shadow AI Assets** 🚨
- All unapproved AI tools
- Sorted by risk level
- Includes sensitive data exposure

### **Sheet 4: Approved AI Assets** ✅
- Sanctioned enterprise tools
- Usage monitoring data
- Compliance tracking

### **Sheet 5: Zscaler Only**
- Assets detected in network traffic only
- May indicate web-based usage without DSPM coverage

### **Sheet 6: DSPM Only**
- Assets detected in application logs only
- Very high confidence (app-level detection)

### **Sheet 7: Asset Catalog**
- Reference guide for all known AI assets
- Matching patterns for each asset
- Risk levels and classifications

---

## 🔍 Detection Examples

### **Example 1: ChatGPT (Confirmed)**

**Zscaler Detection:**
```
URL: https://chat.openai.com/c/abc123
Policy Action: Allowed
Department: Marketing
→ Matched Pattern: "openai.com"
→ Asset: ChatGPT
```

**DSPM Detection:**
```
Activity type: AI website visit
App accessed in: ChatGPT
Sensitive info type: 0
→ Matched Pattern: "ChatGPT"
→ Asset: ChatGPT
```

**Result:**
```
Asset: ChatGPT
Confidence: CONFIRMED ✅
Validation: Cross-validated (Zscaler + DSPM)
Zscaler Detections: 87
DSPM Detections: 97
Total Detections: 184
Risk Level: CRITICAL
Status: Shadow AI ❌
Action: BLOCK or require enterprise license
```

---

### **Example 2: Microsoft 365 Copilot (Approved)**

**Zscaler Detection:**
```
URL: https://copilot.microsoft.com/chat
Policy Action: Allowed
Department: IT Infrastructure
→ Matched Pattern: "copilot.microsoft.com"
→ Asset: Microsoft 365 Copilot
```

**DSPM Detection:**
```
Activity type: Sensitive info types
App accessed in: Microsoft 365 Copilot Chat
Sensitive info type: All Full Names, PHI, Finance
→ Matched Pattern: "Microsoft 365 Copilot Chat"
→ Asset: Microsoft 365 Copilot
```

**Result:**
```
Asset: Microsoft 365 Copilot
Confidence: CONFIRMED ✅
Validation: Cross-validated (Zscaler + DSPM)
Zscaler Detections: 1,200
DSPM Detections: 5,266
Total Detections: 6,466
Risk Level: MEDIUM (HIGH due to PHI exposure)
Status: Approved ✅
Sensitive Data: PHI, PII, Finance (4,180 instances)
Action: Review BAA compliance, implement data governance
```

---

### **Example 3: Azure OpenAI (Zscaler Only)**

**Zscaler Detection:**
```
URL: https://myorg.openai.azure.com/api/v1/chat/completions
Policy Action: Allowed
Department: Application Development
→ Matched Pattern: "openai.azure.com"
→ Asset: Azure OpenAI
```

**DSPM Detection:**
```
(No detection - cloud API not tracked by DSPM)
```

**Result:**
```
Asset: Azure OpenAI
Confidence: HIGH
Validation: Zscaler network traffic
Zscaler Detections: 450
DSPM Detections: 0
Risk Level: CRITICAL
Status: Shadow AI ❌ (if not approved)
Action: Verify if sanctioned, establish governance
Note: DSPM blind spot - API usage not tracked
```

---

### **Example 4: Doubao (DSPM Only)**

**Zscaler Detection:**
```
(No detection - may be using VPN or not in Zscaler logs)
```

**DSPM Detection:**
```
Activity type: AI website visit
App accessed in: Doubao
AI app category: Other AI apps
→ Matched Pattern: "Doubao"
→ Asset: Doubao
```

**Result:**
```
Asset: Doubao
Confidence: VERY HIGH
Validation: DSPM application-level detection
Zscaler Detections: 0
DSPM Detections: 1
Risk Level: CRITICAL
Status: Shadow AI ❌
Data Sovereignty Risk: YES (Chinese AI)
Action: IMMEDIATE BLOCK - Compliance violation
```

---

## 🎯 Validation Logic

### **High Confidence Shadow AI Criteria**

An asset is flagged as **high-confidence Shadow AI** if:

1. **Confirmed Detection**:
   - Detected in Zscaler OR DSPM
   - Matches known AI asset in catalog

2. **NOT Approved**:
   - Asset not in approved list
   - No enterprise license/governance

3. **Risk Indicators**:
   - CRITICAL: Generative AI, Cloud AI platforms, Foreign AI
   - HIGH: Code generation, API usage, productivity tools
   - MEDIUM: Design tools, writing assistants

4. **Usage Patterns**:
   - Multiple users (>5)
   - Multiple departments (>2)
   - Frequent usage (>10 detections)

### **Validation Confidence Matrix**

| Detection Source | Confidence | Reason |
|-----------------|------------|--------|
| **Zscaler + DSPM** | CONFIRMED | Cross-validated across sources |
| **DSPM Only** | VERY HIGH | Application-level detection |
| **Zscaler Only** | HIGH | Network traffic to known AI domain |
| **Pattern Match** | MEDIUM | URL/name pattern suggests AI |

---

## 📈 Expected Results

### **From Your Test Data**

Based on the individual analyses:

**Zscaler (100K logs):**
- Shadow AI instances: 2,100
- Unique AI services: 10-15

**DSPM (5.4K logs):**
- Shadow AI instances: 134
- Unique AI services: 10

**Combined (Expected):**
- Confirmed assets: 8-10 (detected in both)
- Zscaler only: 5-7 (network traffic)
- DSPM only: 2-3 (app-level)
- Total unique assets: 15-20

**High Confidence Shadow AI:**
- ChatGPT: CONFIRMED (87 Zscaler + 97 DSPM)
- Anthropic Claude: CONFIRMED (10 DSPM, likely in Zscaler)
- Perplexity AI: CONFIRMED (11 DSPM, likely in Zscaler)
- Azure OpenAI: HIGH (Zscaler only, API usage)
- Doubao: VERY HIGH (DSPM only, critical risk)

---

## 🔧 Customization

### **Add New AI Asset**

Edit `AI_ASSET_CATALOG` in the script:

```python
AI_ASSET_CATALOG = {
    'Your Custom AI': {
        'vendor': 'Vendor Name',
        'category': 'Generative AI',
        'zscaler_patterns': ['customai.com', 'api.customai.com'],
        'dspm_names': ['Custom AI', 'CustomAI'],
        'risk_level': 'CRITICAL',
        'asset_type': 'generative_ai_service'
    },
    # ... existing assets
}
```

### **Modify Risk Levels**

Change risk assessment based on your organization's policies:

```python
# In AI_ASSET_CATALOG
'ChatGPT': {
    'risk_level': 'MEDIUM',  # If you have enterprise license
    'approved': True,        # Mark as approved
}
```

### **Add Custom Matching Rules**

Extend the `MatchingRules` class:

```python
@staticmethod
def match_custom_pattern(data):
    # Your custom matching logic
    pass
```

---

## 🚨 Action Recommendations

### **For Confirmed Shadow AI**
1. **Immediate**: Block or require enterprise license
2. **Short-term**: User training on approved alternatives
3. **Long-term**: Establish AI governance policy

### **For Zscaler-Only Detections**
1. Investigate why not in DSPM (VPN bypass? API usage?)
2. Extend DSPM coverage if needed
3. Implement network-level controls

### **For DSPM-Only Detections**
1. Very high confidence - prioritize investigation
2. May indicate Zscaler blind spots
3. Focus on data exposure risk

### **For Approved AI with High Data Exposure**
1. Review DPA/BAA compliance
2. Implement data classification
3. Restrict access to sensitive data handlers
4. Enable audit logging

---

## 📞 Next Steps

1. **Run the script** on your test data
2. **Review the report** - focus on "Confirmed Assets" sheet
3. **Validate findings** - spot-check a few detections
4. **Take action** - block critical shadow AI
5. **Integrate** - automate this analysis weekly/monthly

---

## 💡 Integration with AIKovrr

This script output can be used to:

1. **Auto-populate Assets Visibility**
   - Import confirmed assets
   - Set approval status
   - Track usage over time

2. **Create Risk Register entries**
   - Flag high-risk shadow AI
   - Link to compliance frameworks
   - Track remediation

3. **Generate Compliance Reports**
   - Document AI usage for audits
   - Show governance coverage
   - Demonstrate risk management

---

**Questions?** Review the script comments or check the individual analysis reports:
- `ZSCALER_SHADOW_AI_ANALYSIS.md`
- `DSPM_ANALYSIS_INSIGHTS.md`
