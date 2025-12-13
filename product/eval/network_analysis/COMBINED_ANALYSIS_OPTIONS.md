# Combined DSPM + Zscaler Analysis - Implementation Options

**Created**: December 7, 2025  
**Purpose**: Identify and validate AI assets using cross-validation

---

## 🎯 Your Requirements

1. **Identify and validate AI assets in the system**
2. **Identify high potential Shadow AI assets based on clear matching rules**

---

## ✅ Solution Delivered

### **Script**: `combined_ai_asset_detector.py`

**What it does:**
- Reads both Zscaler and DSPM CSV files
- Matches AI assets using predefined catalog
- Cross-validates detections from both sources
- Classifies assets as Approved vs Shadow AI
- Generates comprehensive Excel report

---

## 📊 Three Detection Options

### **Option 1: CONFIRMED Assets (Highest Confidence)** ⭐

**Detection Method**: Cross-validation  
**Confidence**: CONFIRMED  
**Criteria**: Asset detected in BOTH Zscaler AND DSPM

**Example:**
```
Asset: ChatGPT
├─ Zscaler: 87 detections (openai.com URLs)
├─ DSPM: 97 detections ("ChatGPT" app visits)
└─ Result: CONFIRMED ✅ (184 total detections)
```

**Why High Confidence:**
- Network traffic confirms usage (Zscaler)
- Application-level detection confirms exact app (DSPM)
- Two independent data sources validate each other

**Use Case:**
- Highest priority for action
- Definitive proof of shadow AI usage
- Strong evidence for blocking/governance decisions

---

### **Option 2: DSPM-Only Assets (Very High Confidence)**

**Detection Method**: Application-level detection  
**Confidence**: VERY HIGH  
**Criteria**: Asset detected in DSPM only

**Example:**
```
Asset: Doubao (Chinese AI)
├─ Zscaler: 0 detections (may be using VPN)
├─ DSPM: 1 detection ("Doubao" app visit)
└─ Result: VERY HIGH ✅ (DSPM knows the exact app)
```

**Why Very High Confidence:**
- DSPM identifies app by name (not URL pattern)
- Microsoft Purview has built-in AI app catalog
- Application-level detection is more accurate than URL matching

**Use Case:**
- Zscaler blind spots (VPN, encrypted traffic)
- Critical findings (e.g., foreign AI like Doubao)
- Sensitive data exposure tracking

---

### **Option 3: Zscaler-Only Assets (High Confidence)**

**Detection Method**: Network traffic analysis  
**Confidence**: HIGH  
**Criteria**: Asset detected in Zscaler only

**Example:**
```
Asset: Azure OpenAI
├─ Zscaler: 450 detections (openai.azure.com URLs)
├─ DSPM: 0 detections (API usage not tracked)
└─ Result: HIGH ✅ (Network evidence)
```

**Why High Confidence:**
- URL patterns match known AI services
- Multiple detections across users/departments
- Network traffic doesn't lie

**Use Case:**
- API-based AI usage (not tracked by DSPM)
- Cloud AI platforms (Azure OpenAI, Vertex AI)
- Broad network coverage

---

## 🔍 Matching Rules

### **Rule 1: Exact App Name Match (DSPM)**
```python
IF DSPM['App accessed in'] == 'ChatGPT':
    → Asset: ChatGPT
    → Confidence: VERY HIGH
```

### **Rule 2: URL Pattern Match (Zscaler)**
```python
IF Zscaler['URL'] contains 'openai.com':
    → Asset: ChatGPT
    → Confidence: HIGH
```

### **Rule 3: Cross-Validation**
```python
IF (Zscaler detects 'openai.com') AND (DSPM detects 'ChatGPT'):
    → Asset: ChatGPT
    → Confidence: CONFIRMED
```

### **Rule 4: Shadow AI Classification**
```python
IF Asset NOT in approved_list:
    → Status: Shadow AI ❌
    → Risk Level: CRITICAL/HIGH/MEDIUM
    → Action: Block or require enterprise license
```

### **Rule 5: Data Exposure Risk (DSPM)**
```python
IF DSPM['Sensitive info type'] contains PHI/PII:
    → Risk Level: Increase by 1 level
    → Action: Review DPA/BAA compliance
```

---

## 📋 Asset Catalog (13 AI Tools)

| Asset | Vendor | Category | Zscaler Patterns | DSPM Names | Risk |
|-------|--------|----------|------------------|------------|------|
| **ChatGPT** | OpenAI | Generative AI | openai.com, chat.openai.com | ChatGPT, OpenAI | CRITICAL |
| **Anthropic Claude** | Anthropic | Generative AI | anthropic.com, claude.ai | Anthropic Claude | CRITICAL |
| **Microsoft 365 Copilot** | Microsoft | Enterprise AI | copilot.microsoft.com | Microsoft 365 Copilot Chat | MEDIUM |
| **Perplexity AI** | Perplexity | Search AI | perplexity.ai | Perplexity AI | HIGH |
| **Azure OpenAI** | Microsoft | Cloud AI Platform | openai.azure.com, azureml.net | - | CRITICAL |
| **Google Vertex AI** | Google | Cloud AI Platform | aiplatform.googleapis.com | - | CRITICAL |
| **Midjourney** | Midjourney | Image Generation | midjourney.com | Midjourney | HIGH |
| **Grammarly** | Grammarly | Productivity AI | grammarly.com | Grammarly | MEDIUM |
| **Notion AI** | Notion | Productivity AI | notion.ai, notion.so | Notion | MEDIUM |
| **GitHub Copilot** | GitHub | Code Generation | copilot.github.com | GitHub Copilot | HIGH |
| **Doubao** | ByteDance | Generative AI | doubao.com | Doubao | CRITICAL |
| **Canva AI** | Canva | Design AI | canva.com | canva.com | MEDIUM |
| **Lovable** | Lovable | Code Generation | lovable.dev | Lovable, Lovable.dev | HIGH |

---

## 🚀 How to Run

### **Option A: Quick Test (Recommended)**
```bash
cd /Users/liransorani/CascadeProjects/aikovrr/product/eval/network_analysis
./run_combined_analysis.sh
```

### **Option B: Manual Run**
```bash
python3 combined_ai_asset_detector.py \
    /tmp/ff/2025-11-26T06-18-37_UTC_web_log-redacted.csv \
    DSPM_list_of_apps_governance_2025-11-26.csv \
    combined_report.xlsx
```

---

## 📊 Expected Output

### **Excel Report (7 Sheets)**

1. **Executive Summary**
   - Total assets detected
   - Confirmed vs single-source
   - Approved vs shadow AI
   - Risk distribution

2. **Confirmed Assets** ⭐ (HIGHEST PRIORITY)
   - Cross-validated detections
   - Zscaler + DSPM counts
   - Sensitive data exposure
   - Action recommendations

3. **Shadow AI Assets** 🚨
   - All unapproved tools
   - Sorted by risk level
   - Usage statistics
   - Blocking recommendations

4. **Approved AI Assets** ✅
   - Sanctioned tools
   - Usage monitoring
   - Compliance tracking

5. **Zscaler Only**
   - Network-detected assets
   - API usage patterns
   - DSPM blind spots

6. **DSPM Only**
   - App-level detections
   - Very high confidence
   - Data exposure details

7. **Asset Catalog**
   - Reference guide
   - Matching patterns
   - Risk classifications

---

## 🎯 Recommended Workflow

### **Step 1: Run Analysis**
```bash
./run_combined_analysis.sh
```

### **Step 2: Review Confirmed Assets**
- Open Excel report
- Go to "Confirmed Assets" sheet
- Focus on CRITICAL risk items

### **Step 3: Validate Findings**
- Spot-check 2-3 detections
- Verify with actual users
- Confirm shadow AI usage

### **Step 4: Take Action**
- Block critical shadow AI (ChatGPT, Claude, Doubao)
- Require enterprise licenses where needed
- Implement governance policies

### **Step 5: Monitor**
- Run weekly/monthly
- Track trends over time
- Measure remediation progress

---

## 💡 Key Advantages

### **vs Zscaler Only**
- ✅ Cross-validation increases confidence
- ✅ Exact app names (not just URLs)
- ✅ Sensitive data exposure tracking
- ✅ Reduces false positives

### **vs DSPM Only**
- ✅ Broader coverage (all network traffic)
- ✅ Detects API usage (not just web visits)
- ✅ Cloud AI platforms visibility
- ✅ Catches DSPM blind spots

### **Combined Approach**
- ✅ Highest confidence detections
- ✅ Comprehensive coverage
- ✅ Data-driven decisions
- ✅ Audit-ready evidence

---

## 🚨 High Confidence Shadow AI Criteria

An asset is flagged as **high-confidence shadow AI** if:

1. ✅ **Detected in at least one source** (Zscaler or DSPM)
2. ✅ **Matches known AI asset** in catalog
3. ✅ **NOT in approved list**
4. ✅ **Risk indicators present**:
   - Multiple users (>5)
   - Multiple departments (>2)
   - Frequent usage (>10 detections)
   - Sensitive data exposure (DSPM)

---

## 📈 Expected Results (Your Data)

Based on individual analyses:

### **Confirmed Assets (8-10 expected)**
- ChatGPT: 87 (Z) + 97 (D) = 184 detections
- Anthropic Claude: ~10 (Z) + 10 (D) = ~20 detections
- Perplexity AI: ~10 (Z) + 11 (D) = ~21 detections
- Microsoft 365 Copilot: ~1,200 (Z) + 5,266 (D) = ~6,466 detections

### **Zscaler Only (5-7 expected)**
- Azure OpenAI: ~450 detections (API usage)
- Google Vertex AI: ~300 detections (cloud platform)
- Midjourney: ~50 detections (image generation)

### **DSPM Only (2-3 expected)**
- Doubao: 1 detection (CRITICAL - Chinese AI)
- Canva AI: 2 detections (design tool)
- Lovable: 2 detections (code generation)

### **Total Unique Assets: 15-20**

---

## 🔧 Customization

### **Add New AI Asset**
Edit `AI_ASSET_CATALOG` in `combined_ai_asset_detector.py`:

```python
'Your AI Tool': {
    'vendor': 'Vendor Name',
    'category': 'Generative AI',
    'zscaler_patterns': ['yourai.com'],
    'dspm_names': ['Your AI Tool'],
    'risk_level': 'CRITICAL',
    'asset_type': 'generative_ai_service'
}
```

### **Modify Risk Levels**
Change risk assessment for your organization:

```python
'ChatGPT': {
    'risk_level': 'MEDIUM',  # If you have enterprise license
    'approved': True,        # Mark as approved
}
```

---

## 📞 Next Steps

1. ✅ **Run the script** on your test data
2. ✅ **Review the Excel report** (focus on Confirmed Assets)
3. ✅ **Validate 2-3 findings** with actual users
4. ✅ **Take action** on CRITICAL shadow AI
5. ✅ **Integrate** into AIKovrr database (next phase)

---

## 🎁 Bonus: Database Integration

Once validated, this data can auto-populate your AIKovrr Assets Visibility:

```python
# Pseudo-code for DB integration
for asset in confirmed_assets:
    Asset.objects.create(
        name=asset['asset_name'],
        vendor=asset['vendor'],
        asset_type=asset['asset_type'],
        approval_status='unapproved' if not asset['approved'] else 'approved',
        risk_level=asset['risk_level'],
        usage_count=asset['total_detections'],
        first_detected=asset['first_seen'],
        last_seen=asset['last_seen'],
        auto_discovered=True
    )
```

---

**Ready to run?** Execute `./run_combined_analysis.sh` and review the results!
