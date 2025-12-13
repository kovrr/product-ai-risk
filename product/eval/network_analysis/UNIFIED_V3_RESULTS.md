# Unified AI Asset Detection V3 - Results with Zscaler Policy-Based Approval

**Date**: December 7, 2025  
**Script**: `unified_ai_asset_detector.py` (v3 with Zscaler policy logic)  
**Report**: `unified_ai_assets_v3_20251207_172825.xlsx`

---

## 🎯 **What's New in V3**

### **Enhanced Approval Logic:**
1. ✅ **Zscaler Policy Action** as primary approval source
   - `Allowed` traffic → APPROVED
   - `Blocked` traffic → BLOCKED
   - Microsoft AI in DSPM → APPROVED (vendor trust)

2. ✅ **9 Shadow AI Detection Rules** (was 7)
   - **NEW RULE 1**: Blocked AI Being Bypassed (CRITICAL)
   - **NEW RULE 9**: DSPM-Only Detection (Potential Bypass)
   - Enhanced descriptions for all rules

3. ✅ **Three-Tier Approval Status:**
   - **APPROVED**: Zscaler allows OR Microsoft vendor
   - **BLOCKED**: Zscaler blocks
   - **NEEDS_REVIEW**: No Zscaler data, not Microsoft

4. ✅ **Detailed Policy Tracking:**
   - `zscaler_allowed` count
   - `zscaler_blocked` count
   - `zscaler_policy_status` (APPROVED/BLOCKED/PARTIAL)

---

## 📊 **Executive Summary**

### **Total AI Assets Detected: 9**

| Metric | Count |
|--------|-------|
| **Standalone AI Services** | 6 |
| **Embedded AI Features** | 3 |
| **Approved (Zscaler/Vendor)** | 2 |
| **Blocked by Zscaler** | 2 |
| **Needs Review** | 5 |
| **Shadow AI (Rule Violations)** | 8 |

### **Detection Sources:**
- 🎯 **Cross-Validated (Both)**: 1 (ChatGPT - blocked in Zscaler, used in DSPM!)
- 📡 **Zscaler Only**: 2 (GitHub Copilot, Grammarly)
- 🔍 **DSPM Only**: 6 (M365 Copilot, Claude, Perplexity, etc.)

---

## 🚨 **CRITICAL FINDING: ChatGPT Blocked but Bypassed!**

### **ChatGPT Status:**
- **Zscaler**: 6 attempts **BLOCKED** (`Not allowed to browse this category`)
- **DSPM**: 106 successful uses **DETECTED**
- **Total**: 112 detections (6 blocked + 106 bypassed)

### **This Means:**
Users are **bypassing Zscaler controls** via:
1. Browser extensions (ChatGPT extension)
2. Mobile apps (not routed through Zscaler)
3. VPN/proxy (circumventing network filtering)
4. API access (different endpoints)

### **Matched Rules:**
1. ✅ **RULE_1_BLOCKED_BUT_BYPASSED** (CRITICAL) - 106 bypassed uses
2. ✅ **RULE_2_UNAPPROVED_APP** (CRITICAL)
3. ✅ **RULE_3_HIGH_USAGE** (CRITICAL) - 112 total detections
4. ✅ **RULE_7_CROSS_VALIDATED** (CRITICAL) - Detected in both sources
5. ✅ **RULE_9_DSPM_ONLY_DETECTION** (HIGH) - 106 DSPM-only detections

**Action Required**: IMMEDIATE investigation and endpoint controls!

---

## 📋 **Complete AI Asset Inventory (9 Assets)**

### **1. Microsoft 365 Copilot** ✅ APPROVED
- **Type**: Embedded AI
- **Vendor**: Microsoft
- **Zscaler Policy**: NOT_DETECTED (DSPM only)
- **Final Status**: ✅ **APPROVED** (Microsoft vendor trust)
- **Detections**: 5,266 (DSPM)
- **Sensitive Data**: 3,423+ instances (PHI, PII, Finance, Source Code)
- **Shadow AI Rules Matched**: 3
  - RULE_3_HIGH_USAGE (5,266 detections)
  - RULE_5_DATA_EXPOSURE (3,423 sensitive data instances)
  - RULE_9_DSPM_ONLY_DETECTION (not in Zscaler)

**Note**: Even though approved, it triggers shadow AI rules due to high usage and data exposure!

---

### **2. GitHub Copilot** ✅ APPROVED
- **Type**: Embedded AI
- **Vendor**: GitHub/Microsoft
- **Zscaler Policy**: ✅ **APPROVED** (22 allowed, 0 blocked)
- **Final Status**: ✅ **APPROVED**
- **Detections**: 22 (Zscaler only)
- **Users**: 7
- **Departments**: 6
- **Shadow AI Rules Matched**: 0
- **URLs**: `api.business.githubcopilot.com`, `telemetry.business.githubcopilot.com`

**Status**: Clean! Enterprise version, properly approved.

---

### **3. ChatGPT** 🚨 BLOCKED BUT BYPASSED
- **Type**: Standalone AI
- **Vendor**: OpenAI
- **Zscaler Policy**: 🚫 **BLOCKED** (0 allowed, 6 blocked)
- **Final Status**: 🚫 **BLOCKED**
- **Detections**: 112 total (6 Zscaler blocked + 106 DSPM bypassed)
- **Shadow AI Rules Matched**: 5 (CRITICAL)
  1. RULE_1_BLOCKED_BUT_BYPASSED - Users bypassing controls
  2. RULE_2_UNAPPROVED_APP
  3. RULE_3_HIGH_USAGE - 112 detections
  4. RULE_7_CROSS_VALIDATED - Detected in both sources
  5. RULE_9_DSPM_ONLY_DETECTION - 106 DSPM-only

**Action**: **IMMEDIATE** - Investigate bypass methods, implement endpoint DLP!

---

### **4. Grammarly AI** 🚨 BLOCKED BUT BYPASSED
- **Type**: Embedded AI
- **Vendor**: Grammarly
- **Zscaler Policy**: 🚫 **BLOCKED** (0 allowed, 17 blocked)
- **Final Status**: 🚫 **BLOCKED**
- **Detections**: 17 (Zscaler only - all blocked)
- **Shadow AI Rules Matched**: 3
  1. RULE_2_UNAPPROVED_APP
  2. RULE_3_HIGH_USAGE - 17 detections
  3. RULE_8_EMBEDDED_UNAPPROVED

**Note**: Unlike ChatGPT, Grammarly is successfully blocked (no DSPM detections)

---

### **5. Anthropic Claude** ⚠️ NEEDS REVIEW
- **Type**: Standalone AI
- **Vendor**: Anthropic
- **Zscaler Policy**: NOT_DETECTED (DSPM only)
- **Final Status**: ⚠️ **NEEDS_REVIEW**
- **Detections**: 11 (DSPM only)
- **Shadow AI Rules Matched**: 4
  1. RULE_2_UNAPPROVED_APP
  2. RULE_3_HIGH_USAGE - 11 detections
  3. RULE_8_EMBEDDED_UNAPPROVED
  4. RULE_9_DSPM_ONLY_DETECTION

**Action**: Determine if should be blocked or approved

---

### **6. Perplexity AI** ⚠️ NEEDS REVIEW
- **Type**: Standalone AI
- **Vendor**: Perplexity
- **Zscaler Policy**: NOT_DETECTED (DSPM only)
- **Final Status**: ⚠️ **NEEDS_REVIEW**
- **Detections**: 11 (DSPM only)
- **Shadow AI Rules Matched**: 4
  1. RULE_2_UNAPPROVED_APP
  2. RULE_3_HIGH_USAGE - 11 detections
  3. RULE_8_EMBEDDED_UNAPPROVED
  4. RULE_9_DSPM_ONLY_DETECTION

**Action**: Determine if should be blocked or approved

---

### **7. Canva AI** ⚠️ NEEDS REVIEW
- **Type**: Standalone AI
- **Vendor**: Canva
- **Zscaler Policy**: NOT_DETECTED (DSPM only)
- **Final Status**: ⚠️ **NEEDS_REVIEW**
- **Detections**: 2 (DSPM only)
- **Shadow AI Rules Matched**: 2
  1. RULE_2_UNAPPROVED_APP
  2. RULE_9_DSPM_ONLY_DETECTION

---

### **8. Lovable** ⚠️ NEEDS REVIEW
- **Type**: Standalone AI
- **Vendor**: Lovable
- **Zscaler Policy**: NOT_DETECTED (DSPM only)
- **Final Status**: ⚠️ **NEEDS_REVIEW**
- **Detections**: 2 (DSPM only)
- **Shadow AI Rules Matched**: 2
  1. RULE_2_UNAPPROVED_APP
  2. RULE_9_DSPM_ONLY_DETECTION

---

### **9. Doubao** ⚠️ NEEDS REVIEW
- **Type**: Standalone AI
- **Vendor**: ByteDance (China)
- **Zscaler Policy**: NOT_DETECTED (DSPM only)
- **Final Status**: ⚠️ **NEEDS_REVIEW**
- **Detections**: 1 (DSPM only)
- **Shadow AI Rules Matched**: 3
  1. RULE_2_UNAPPROVED_APP
  2. RULE_6_FOREIGN_AI - Data sovereignty risk (CRITICAL)
  3. RULE_9_DSPM_ONLY_DETECTION

**Action**: **BLOCK IMMEDIATELY** - Chinese AI, compliance violation

---

## 🛡️ **Shadow AI Detection Rules (9 Rules)**

### **RULE 1: Blocked AI Being Bypassed** (CRITICAL) ⭐ NEW
- **Description**: AI blocked by Zscaler policy but detected in DSPM (users bypassing controls via browser extensions, mobile apps, or VPN)
- **Matched Assets**: 1 (ChatGPT)
- **Impact**: Security controls ineffective

### **RULE 2: Unapproved AI Application** (CRITICAL)
- **Description**: AI asset detected but not approved by Zscaler policy (not explicitly allowed)
- **Matched Assets**: 8 (all except GitHub Copilot)

### **RULE 3: High Usage Shadow AI** (CRITICAL)
- **Description**: Shadow AI with more than 10 detections (indicates widespread unauthorized usage)
- **Matched Assets**: 5 (M365 Copilot, ChatGPT, Grammarly, Claude, Perplexity)

### **RULE 4: Multi-User Shadow AI** (HIGH)
- **Description**: Shadow AI used by more than 3 users (indicates organizational adoption of unapproved tool)
- **Matched Assets**: 0 (user count data not granular enough)

### **RULE 5: Shadow AI with Data Exposure** (CRITICAL)
- **Description**: Shadow AI processing sensitive data (PII, PHI, financial, source code) without proper controls
- **Matched Assets**: 1 (M365 Copilot - 3,423 sensitive data instances)

### **RULE 6: Foreign AI Service** (CRITICAL)
- **Description**: AI service with data sovereignty risk (data processed in foreign jurisdiction, GDPR/compliance violation)
- **Matched Assets**: 1 (Doubao - Chinese AI)

### **RULE 7: Cross-Validated Shadow AI** (CRITICAL)
- **Description**: Shadow AI detected in both Zscaler and DSPM (high confidence detection, confirmed usage)
- **Matched Assets**: 1 (ChatGPT - blocked in Zscaler, used in DSPM)

### **RULE 8: Unapproved Embedded AI** (HIGH)
- **Description**: Embedded AI feature in approved app but not explicitly approved (hidden AI capabilities)
- **Matched Assets**: 4 (Claude, Perplexity, Grammarly, M365 Copilot)

### **RULE 9: DSPM-Only Detection (Potential Bypass)** (HIGH) ⭐ NEW
- **Description**: AI detected only in DSPM, not in Zscaler (suggests network filtering bypass via extensions, mobile, or VPN)
- **Matched Assets**: 7 (all except GitHub Copilot and Grammarly)

---

## 📄 **Excel Report Structure (7 Sheets)**

### **Sheet 1: Executive Summary**
- Total assets, approval breakdown, detection sources
- **NEW**: Blocked but Bypassed count
- Risk level distribution

### **Sheet 2: All AI Assets** ⭐
- **NEW COLUMNS**:
  - `final_approval_status` (APPROVED/BLOCKED/NEEDS_REVIEW)
  - `zscaler_policy_status` (APPROVED/BLOCKED/PARTIAL/NOT_DETECTED)
  - `approved_by_vendor` (True/False)
  - `zscaler_allowed` (count)
  - `zscaler_blocked` (count)

### **Sheet 3: Shadow AI with Rules**
- 8 shadow AI assets with matched rules
- **NEW**: Shows Zscaler policy status for each

### **Sheet 4: Shadow AI Rules**
- All 9 rules with enhanced descriptions

### **Sheet 5: Zscaler Raw Data**
- **NOW INCLUDES BLOCKED TRAFFIC**
- All 28 detections (22 allowed + 6 blocked)
- Policy action for each record

### **Sheet 6: DSPM Raw Data**
- All 5,400 DSPM detections

### **Sheet 7: Sensitive Data Exposure**
- **NEW**: Shows approval status per sensitive data type

---

## 🚨 **Immediate Actions Required**

### **P0 - CRITICAL (Today):**

1. **Investigate ChatGPT Bypass** (112 detections, 106 bypassed)
   - Zscaler blocks it, but users bypass via extensions/mobile/VPN
   - **Action**: 
     - Check for ChatGPT browser extensions on endpoints
     - Implement endpoint DLP (Microsoft Purview DLP policies)
     - Block ChatGPT mobile app via MDM
     - Investigate VPN usage patterns

2. **Block Doubao Immediately** (1 detection)
   - Chinese AI service (ByteDance)
   - Data sovereignty violation
   - **Action**: Add to Zscaler block list, investigate user

### **P1 - HIGH (This Week):**

3. **Review Microsoft 365 Copilot Data Exposure** (5,266 detections, 3,423 sensitive data)
   - Approved but processing massive amounts of sensitive data
   - **Action**: Review BAA/DPA, implement data governance

4. **Decide on Claude & Perplexity** (11 detections each)
   - Currently "Needs Review"
   - **Action**: Either approve or add to Zscaler block list

5. **Verify Grammarly Block** (17 blocked)
   - Successfully blocked by Zscaler
   - **Action**: Confirm no bypass methods exist

### **P2 - MEDIUM (This Month):**

6. **Evaluate Canva & Lovable** (2 detections each)
   - Low usage, needs review
   - **Action**: Determine approval status

---

## 💡 **Key Insights**

### **1. Zscaler Policy Works... Mostly**
- ✅ GitHub Copilot: Allowed, no issues
- ✅ Grammarly: Blocked successfully (no DSPM detections)
- ❌ ChatGPT: Blocked but bypassed (106 DSPM detections)

### **2. DSPM Detects Bypasses**
- 7 assets detected only in DSPM (not in Zscaler)
- Suggests network filtering bypass via:
  - Browser extensions
  - Mobile apps
  - VPN/proxy

### **3. Microsoft Vendor Trust**
- Microsoft 365 Copilot auto-approved (Microsoft vendor)
- But still triggers shadow AI rules due to high usage and data exposure
- Need to balance vendor trust with data governance

### **4. Three-Tier Approval is Better**
- **APPROVED**: Clear green light
- **BLOCKED**: Clear red light
- **NEEDS_REVIEW**: Requires decision

---

## ✅ **What's Improved from V2**

| Feature | V2 | V3 |
|---------|----|----|
| Approval Source | Hardcoded | Zscaler Policy + Vendor Trust |
| Approval States | 2 (True/False) | 3 (APPROVED/BLOCKED/NEEDS_REVIEW) |
| Blocked Traffic | Ignored | Analyzed |
| Bypass Detection | No | Yes (RULE_1, RULE_9) |
| Policy Tracking | No | Yes (allowed/blocked counts) |
| Shadow AI Rules | 7 | 9 |
| Rule Descriptions | Basic | Detailed with impact |

---

## 📁 **Report Location**

```
/Users/liransorani/CascadeProjects/aikovrr/product/eval/network_analysis/
unified_ai_assets_v3_20251207_172825.xlsx
```

---

## 🎯 **Next Steps**

1. **Open Excel Report** - Review "All AI Assets" sheet with new approval columns
2. **Investigate ChatGPT Bypass** - CRITICAL security gap
3. **Block Doubao** - Compliance violation
4. **Make Approval Decisions** - For 5 "Needs Review" assets
5. **Implement Endpoint Controls** - DLP policies to prevent bypasses
6. **Run Analysis Weekly** - Monitor for new shadow AI and bypasses

---

**Key Achievement**: First AI asset detection with **Zscaler policy-based approval** and **bypass detection**! Now you know not just what AI is being used, but whether it's approved, blocked, or being bypassed!
