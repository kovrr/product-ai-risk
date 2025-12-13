# DSPM AI Governance Analysis - Insights Report

**Date**: December 3, 2025  
**Data Source**: `DSPM_list_of_apps_governance_2025-11-26.csv`  
**Dataset Period**: November 26, 2025  
**Analysis Type**: AI App Usage & Data Governance

---

## 📊 Executive Summary

### Dataset Overview
- **Total Activity Records**: 5,400
- **Time Period**: Single day snapshot (Nov 26, 2025)
- **Data Size**: 1.17 MB
- **Organization Type**: Healthcare/Medical (based on sensitive data types)

### Key Findings
- **97.5% Microsoft 365 Copilot usage** (5,265 records)
- **2.5% Shadow AI usage** (135 records across 10 different AI tools)
- **63% of activities involve sensitive data** (3,423 records with PII)
- **10 DLP rule violations** detected

---

## 🎯 AI Application Inventory

### **Approved AI Apps**

#### **1. Microsoft 365 Copilot Chat** ✅
- **Status**: APPROVED (Enterprise deployment)
- **Activity Records**: 5,266 (97.5%)
- **Category**: Copilot experiences & agents
- **Access Method**: Integrated within Microsoft 365
- **Governance**: Managed by Microsoft Purview DSPM

**Sensitive Data Exposure**:
- All Full Names: 3,423 instances
- Medical Terms & Conditions: 1,821 instances
- Diseases: 1,490 instances
- Finance: 1,372 instances
- Source code: 387 instances
- Types of Medication: 385 instances
- HR data: 201 instances
- Legal Affairs: 175 instances

**Risk Assessment**: 
- ✅ **APPROVED** - Enterprise-managed
- ⚠️ **HIGH DATA EXPOSURE** - Processing PHI, PII, financial data
- 📋 **ACTION REQUIRED**: Review DPA, ensure BAA compliance (HIPAA)

---

### **Shadow AI Apps (Unapproved)** ❌

#### **2. ChatGPT** ❌
- **Status**: UNAPPROVED
- **Activity Records**: 87 website visits
- **Category**: Other AI apps
- **Risk Level**: CRITICAL
- **Data Exposure**: Unknown (no sensitive info tracking on external visits)

**Risk Assessment**:
- 🚨 **CRITICAL** - Most popular shadow AI tool
- ⚠️ **Data Exfiltration Risk** - No DLP coverage
- 📋 **ACTION**: Block or require enterprise ChatGPT license

---

#### **3. Perplexity AI** ❌
- **Status**: UNAPPROVED
- **Activity Records**: 11 website visits
- **Category**: Other AI apps
- **Risk Level**: HIGH

**Risk Assessment**:
- ⚠️ **HIGH** - Search AI with data retention concerns
- 📋 **ACTION**: Block or evaluate enterprise plan

---

#### **4. Anthropic Claude** ❌
- **Status**: UNAPPROVED
- **Activity Records**: 10 website visits
- **Category**: Other AI apps
- **Risk Level**: CRITICAL

**Risk Assessment**:
- 🚨 **CRITICAL** - Direct competitor to approved Copilot
- ⚠️ **Redundant tooling** - Users bypassing approved AI
- 📋 **ACTION**: Block and educate users on Copilot

---

#### **5. OpenAI (API)** ❌
- **Status**: UNAPPROVED
- **Activity Records**: 9 website visits
- **Category**: Other AI apps
- **Risk Level**: CRITICAL

**Risk Assessment**:
- 🚨 **CRITICAL** - Direct API access, potential automation
- ⚠️ **No governance** - Bypassing enterprise controls
- 📋 **ACTION**: Block API access, require Azure OpenAI

---

#### **6. Canva AI** ❌
- **Status**: UNAPPROVED
- **Activity Records**: 2 website visits
- **Category**: Design AI
- **Risk Level**: MEDIUM

**Risk Assessment**:
- ⚠️ **MEDIUM** - Design tool with AI features
- 📋 **ACTION**: Evaluate enterprise Canva license

---

#### **7. Lovable.dev** ❌
- **Status**: UNAPPROVED
- **Activity Records**: 2 website visits
- **Category**: Code generation AI
- **Risk Level**: HIGH

**Risk Assessment**:
- ⚠️ **HIGH** - Code generation tool
- 🔒 **Source code exposure risk**
- 📋 **ACTION**: Block and provide approved dev tools

---

#### **8. Doubao (ByteDance AI)** ❌
- **Status**: UNAPPROVED
- **Activity Records**: 1 website visit
- **Category**: Chinese AI app
- **Risk Level**: CRITICAL

**Risk Assessment**:
- 🚨 **CRITICAL** - Foreign AI service (China)
- 🔒 **Data sovereignty concerns**
- 📋 **ACTION**: IMMEDIATE BLOCK - Compliance violation

---

#### **9. Anthropic.com** ❌
- **Status**: UNAPPROVED
- **Activity Records**: 1 website visit
- **Category**: Other AI apps
- **Risk Level**: HIGH

---

#### **10. Microsoft Copilot (Consumer)** ⚠️
- **Status**: UNCLEAR (vs Enterprise Copilot)
- **Activity Records**: 1 website visit
- **Category**: Potential personal account usage
- **Risk Level**: MEDIUM

**Risk Assessment**:
- ⚠️ **MEDIUM** - May be personal vs enterprise account
- 📋 **ACTION**: Verify enterprise vs consumer usage

---

## 📈 Usage Statistics

### Activity Type Breakdown
| Activity Type | Count | % of Total |
|--------------|-------|------------|
| **Sensitive info types** | 5,265 | 97.5% |
| **AI website visit** | 125 | 2.3% |
| **DLP rule match** | 10 | 0.2% |

### AI App Category Distribution
| Category | Count | % of Total |
|----------|-------|------------|
| **Copilot experiences & agents** | 5,265 | 97.5% |
| **Other AI apps** | 135 | 2.5% |

### Shadow AI Adoption Rate
- **Shadow AI Usage**: 135 records (2.5% of total activity)
- **Unique Shadow AI Tools**: 9 different services
- **Most Popular Shadow AI**: ChatGPT (87 visits, 64% of shadow AI)

---

## 🔒 Sensitive Data Exposure Analysis

### Top Sensitive Information Types Detected

| Sensitive Info Type | Count | Risk Level |
|---------------------|-------|------------|
| **All Full Names (PII)** | 3,423 | HIGH |
| **All Medical Terms & Conditions (PHI)** | 1,821 | CRITICAL |
| **Diseases (PHI)** | 1,490 | CRITICAL |
| **Finance** | 1,372 | HIGH |
| **Source code** | 387 | HIGH |
| **Types Of Medication (PHI)** | 385 | CRITICAL |
| **HR** | 201 | HIGH |
| **Legal Affairs** | 175 | MEDIUM |
| **Agreements** | 169 | MEDIUM |
| **IT** | 130 | MEDIUM |
| **Tax** | 106 | HIGH |
| **Lab Test Terms (PHI)** | 104 | CRITICAL |
| **All Physical Addresses (PII)** | 97 | HIGH |
| **Customer Complaints** | 89 | MEDIUM |
| **Indonesia Passport Number** | 46 | CRITICAL |
| **Philippines Passport Number** | 45 | CRITICAL |
| **IP Address** | 41 | MEDIUM |
| **Australia Physical Addresses** | 36 | HIGH |
| **EU Tax Identification Number (TIN)** | 28 | HIGH |
| **Healthcare** | 28 | CRITICAL |
| **U.S. Physical Addresses** | 23 | HIGH |
| **Spain Physical Addresses** | 22 | HIGH |
| **Unauthorized disclosure** | 21 | CRITICAL |
| **IP Address v4** | 21 | MEDIUM |
| **EU National Identification Number** | 20 | CRITICAL |

### Data Classification Summary
- **PHI (Protected Health Information)**: 4,180 instances
  - Medical terms, diseases, medications, lab tests, healthcare
- **PII (Personally Identifiable Information)**: 3,642 instances
  - Full names, addresses, passport numbers, national IDs
- **Financial Data**: 1,372 instances
- **Intellectual Property**: 387 instances (source code)
- **Compliance-Sensitive**: 169 instances (agreements, legal)

---

## 🚨 DLP Rule Violations

### Summary
- **Total DLP Matches**: 10 violations
- **Violation Rate**: 0.2% of all activities
- **All violations**: "Other AI apps" category (shadow AI)

### Sample Violation
- **Sensitive Data**: Japanese My Number Personal, Spain DNI, Spain Tax ID, Spain Driver's License
- **Context**: Shadow AI usage with foreign national IDs
- **Risk**: GDPR/data sovereignty violation

---

## 📊 Risk Assessment Matrix

### By Application

| App | Status | Records | Risk Level | Data Exposure | Action Priority |
|-----|--------|---------|------------|---------------|-----------------|
| **Microsoft 365 Copilot** | ✅ Approved | 5,266 | MEDIUM | HIGH (PHI/PII) | P2 - Review DPA |
| **ChatGPT** | ❌ Shadow AI | 87 | CRITICAL | Unknown | P1 - Block/License |
| **Perplexity AI** | ❌ Shadow AI | 11 | HIGH | Unknown | P1 - Block |
| **Anthropic Claude** | ❌ Shadow AI | 10 | CRITICAL | Unknown | P1 - Block |
| **OpenAI API** | ❌ Shadow AI | 9 | CRITICAL | Unknown | P1 - Block |
| **Canva AI** | ❌ Shadow AI | 2 | MEDIUM | Unknown | P3 - Evaluate |
| **Lovable.dev** | ❌ Shadow AI | 2 | HIGH | Source Code | P1 - Block |
| **Doubao (ByteDance)** | ❌ Shadow AI | 1 | CRITICAL | Unknown | P1 - IMMEDIATE BLOCK |

### Overall Risk Score
- **Approved AI Governance**: 7/10 (Good - Single approved tool)
- **Shadow AI Risk**: 8/10 (High - 9 unapproved tools detected)
- **Data Exposure Risk**: 9/10 (Critical - PHI/PII in AI)
- **Compliance Risk**: 8/10 (High - HIPAA/GDPR concerns)

---

## 🎯 Key Insights

### ✅ **Strengths**
1. **Strong Copilot Adoption**: 97.5% of AI usage is through approved Microsoft 365 Copilot
2. **DSPM Visibility**: Microsoft Purview tracking sensitive data in AI interactions
3. **Low Shadow AI Rate**: Only 2.5% of activity is unapproved AI
4. **DLP Coverage**: 10 violations detected and blocked

### ⚠️ **Concerns**
1. **PHI Exposure**: 4,180 instances of protected health information processed by AI
2. **ChatGPT Usage**: 87 visits to unapproved consumer ChatGPT
3. **Foreign AI**: Doubao (Chinese AI) detected - data sovereignty risk
4. **Code Exposure**: 387 instances of source code processed by Copilot
5. **No Attribution**: Shadow AI visits have no sensitive data tracking (blind spot)

### 🚨 **Critical Risks**
1. **HIPAA Compliance**: PHI processed by AI without clear BAA
2. **Data Exfiltration**: Shadow AI tools have no DLP coverage
3. **Redundant Tooling**: Users bypassing approved Copilot for ChatGPT/Claude
4. **Foreign Data Transfer**: Doubao usage violates data sovereignty policies

---

## 📋 Recommended Actions

### **Immediate (Week 1)**

#### **P1 - Block Critical Shadow AI**
- ✅ Block ChatGPT consumer version (87 visits)
- ✅ Block Anthropic Claude (10 visits)
- ✅ Block OpenAI API direct access (9 visits)
- ✅ **IMMEDIATE**: Block Doubao (Chinese AI) - compliance violation
- ✅ Block Lovable.dev (code generation risk)

#### **P1 - HIPAA/PHI Review**
- ✅ Review Microsoft 365 Copilot BAA (Business Associate Agreement)
- ✅ Assess PHI processing compliance (4,180 instances)
- ✅ Implement medical data classification labels
- ✅ Restrict Copilot access for PHI-handling roles

### **Short-term (Month 1)**

#### **P2 - Governance & Policy**
- ✅ Create AI Acceptable Use Policy
- ✅ Communicate approved AI tools (Copilot only)
- ✅ User training on shadow AI risks
- ✅ Establish AI tool request process

#### **P2 - Technical Controls**
- ✅ Deploy web filtering for shadow AI domains
- ✅ Extend DLP rules to cover all AI interactions
- ✅ Implement Copilot usage guardrails
- ✅ Enable Copilot audit logging

#### **P3 - Evaluate Enterprise Alternatives**
- ✅ Evaluate ChatGPT Enterprise (if business need exists)
- ✅ Evaluate Canva Enterprise (for design teams)
- ✅ Assess GitHub Copilot for developers (approved code AI)

### **Long-term (Quarter 1)**

#### **Continuous Monitoring**
- ✅ Weekly DSPM reports on AI usage
- ✅ Monthly shadow AI detection audits
- ✅ Quarterly AI risk assessments
- ✅ Track Copilot ROI and adoption

#### **Advanced Governance**
- ✅ Implement AI usage quotas per department
- ✅ Deploy Copilot prompt injection detection
- ✅ Establish AI incident response playbook
- ✅ Create AI governance committee

---

## 🔍 Comparison with Zscaler Analysis

### **Zscaler Shadow AI Detection** (100K logs)
- **Shadow AI Rate**: 2.1% (2,100 instances)
- **Detection Method**: Network traffic analysis
- **Coverage**: All web traffic

### **DSPM Analysis** (5.4K logs)
- **Shadow AI Rate**: 2.5% (135 instances)
- **Detection Method**: Microsoft Purview DSPM
- **Coverage**: Microsoft 365 + monitored AI apps

### **Key Differences**
1. **Zscaler**: Broader coverage, detects all AI domains
2. **DSPM**: Deeper visibility into data exposure within approved apps
3. **Complementary**: Zscaler finds shadow AI, DSPM tracks data in approved AI

### **Recommendation**
- Use **Zscaler** for shadow AI discovery
- Use **DSPM** for approved AI governance and data tracking
- Integrate both for comprehensive AI risk management

---

## 📊 Integration with AIKovrr Platform

### **Asset Visibility Module**
Import discovered AI apps:
- ✅ Microsoft 365 Copilot (approved, 5,266 uses)
- ❌ ChatGPT (shadow AI, 87 uses)
- ❌ Anthropic Claude (shadow AI, 10 uses)
- ❌ OpenAI API (shadow AI, 9 uses)
- ❌ Perplexity AI (shadow AI, 11 uses)
- ❌ Doubao (shadow AI, 1 use - CRITICAL)

### **Risk Register**
Create risk entries:
1. **PHI Exposure via Copilot** - CRITICAL
2. **Shadow AI Data Exfiltration** - CRITICAL
3. **Foreign AI Usage (Doubao)** - CRITICAL
4. **Source Code Exposure** - HIGH
5. **Redundant AI Tooling** - MEDIUM

### **Compliance Readiness**
Map to frameworks:
- **HIPAA**: PHI in AI, BAA requirements
- **GDPR**: EU citizen data in AI (TIN, national IDs)
- **NIST AI RMF**: AI governance, transparency
- **ISO 42001**: AI management system

---

## 📞 Next Steps

1. **Share this report** with CISO and Privacy Officer
2. **Schedule emergency review** for Doubao usage (foreign AI)
3. **Request Microsoft 365 Copilot BAA** from Microsoft
4. **Deploy web filtering** to block shadow AI tools
5. **Launch user awareness campaign** on approved AI tools
6. **Integrate DSPM data** into AIKovrr platform

---

**Report Generated**: December 3, 2025  
**Analyst**: AIKovrr DSPM Analysis Tool  
**Status**: ✅ Analysis Complete  
**Confidence Level**: HIGH (5,400 records analyzed)
