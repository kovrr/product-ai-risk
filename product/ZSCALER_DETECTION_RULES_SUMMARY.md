# Zscaler Shadow AI Detection: Quick Reference

## 🎯 Executive Summary

**Problem**: Zscaler logs show 80% of AI usage as "General Browsing" with NO AI-specific tags.

**Solution**: URL pattern matching + behavioral anomaly detection.

---

## 📊 Field Analysis

### Current AI Tagging (Zscaler Native):
- ✅ **Tagged**: Microsoft Teams, Google Chat, Office 365, Grammarly
- ❌ **NOT Tagged**: ChatGPT, Claude, Midjourney, Azure OpenAI, Vertex AI, 90% of AI tools

### Critical Fields for Detection:
1. **URL** - Direct domain/path analysis (PRIMARY)
2. **Department** - Risk context
3. **Location** - Road Warrior = personal device risk
4. **Cloud Application Class** - "Hosting Providers" often masks AI
5. **Policy Action** - "Blocked" = users trying to bypass

---

## 🚨 Shadow AI Detection Rules (Priority Order)

### **CRITICAL - Immediate Alert**

#### 1. Direct AI Service Domains
```
PATTERN: URL contains AI service domains
EXAMPLES:
- openai.com, chat.openai.com, api.openai.com
- anthropic.com, claude.ai
- cohere.ai, midjourney.com, stability.ai
- character.ai, jasper.ai, copy.ai, writesonic.com

ACTION: Flag as "Shadow AI - Generative AI Service"
RISK: CRITICAL - Unapproved AI, data exfiltration
```

#### 2. Cloud AI Platform APIs
```
PATTERN: URL contains cloud ML endpoints
EXAMPLES:
- *.azureml.net, *.openai.azure.com (Azure OpenAI)
- *.aiplatform.googleapis.com (Google Vertex AI)
- *.sagemaker.aws.amazon.com (AWS SageMaker)
- *.bedrock.aws.amazon.com (AWS Bedrock)

ACTION: Flag as "Shadow AI - Cloud AI Platform"
RISK: CRITICAL - Enterprise AI without governance
```

#### 3. Unauthenticated AI Access
```
PATTERN: Department = "Unauthenticated Transactions" 
         AND Cloud Application Class = "Hosting Providers"
EXAMPLES FROM DATA:
- Unauthenticated → Azure ODS (ec87ca92-6600-4778-8e7f-9b50b5f9d22d.ods.opinsights.azure.com)
- Unauthenticated → Microsoft Defender ATP

ACTION: Flag as "Shadow AI - Unattributed Usage"
RISK: CRITICAL - Service accounts running AI workloads, no user attribution
```

---

### **HIGH - Investigation Required**

#### 4. Non-IT Departments Using Cloud Platforms
```
PATTERN: Department NOT IN ("IT Infrastructure", "Application Development")
         AND Cloud Application IN ("Microsoft Azure", "Google Cloud Platform", "AWS")
EXAMPLES FROM DATA:
- "685 Marketing APAC" → Azure endpoints
- "240 Growth" → Azure monitoring
- "200 Equity Dealers" → Google APIs

ACTION: Flag as "Potential Shadow AI - Cloud Platform Usage"
RISK: HIGH - Business units using AI APIs directly
```

#### 5. Road Warrior AI Access
```
PATTERN: Location contains "Road Warrior" 
         AND (URL contains AI patterns OR Cloud Application = AI tools)
EXAMPLES FROM DATA:
- Road Warrior → Google Cloud Platform (clientservices.googleapis.com)
- Road Warrior → Office 365 (potential Copilot)

ACTION: Flag as "Shadow AI - Remote/Personal Device"
RISK: HIGH - Personal AI accounts, data leakage
```

#### 6. API Endpoint Patterns
```
PATTERN: URL contains API paths
EXAMPLES:
- /api/v1/chat/completions
- /api/v1/completions
- /v1/engines/
- /generate, /inference, /predict
- /models/

QUERY PARAMETERS:
- ?prompt=, ?model=gpt, ?model=claude
- ?temperature=, ?max_tokens=

ACTION: Flag as "Potential Shadow AI - API Usage"
RISK: HIGH - Automated AI integration
```

---

### **MEDIUM - Monitoring**

#### 7. Productivity Tools with AI
```
PATTERN: Cloud Application IN ("Grammarly", "Notion", "Zoom", "Webex")
         AND Department NOT IN approved list
FOUND IN DATA:
- Grammarly (Writing assistant) - CONFIRMED ✓

ACTION: Flag as "Shadow AI - Productivity Tool"
RISK: MEDIUM - Approved tool, but need usage tracking
```

#### 8. Blocked AI Attempts
```
PATTERN: Policy Action = "Blocked" OR "Not allowed to browse"
         AND URL contains AI patterns
FOUND IN DATA:
- Google Chat → "Blocked due to Bad SSL record"

ACTION: Flag as "Shadow AI - Blocked Attempt"
RISK: MEDIUM - User trying to bypass security
```

---

## 🔍 Anomaly Detection Patterns

### **Anomaly 1: Heavy Cloud Usage by Non-Technical Departments**
```
NORMAL: IT Infrastructure → 1000 Azure calls/day
ANOMALY: Marketing → 500 Azure calls/day

RED FLAG: Marketing likely using Azure OpenAI or Azure ML
```

### **Anomaly 2: After-Hours API Calls**
```
NORMAL: Business hours (9am-6pm) usage
ANOMALY: 2am-5am API calls to cloud platforms

RED FLAG: Automated AI scripts running overnight
```

### **Anomaly 3: High-Frequency API Calls**
```
NORMAL: 10-20 calls/day to same endpoint
ANOMALY: 100+ calls/day to same endpoint

RED FLAG: AI embedded in business process (e.g., automated content generation)
```

### **Anomaly 4: Department Behavior Change**
```
NORMAL: Sales → Salesforce, Outlook
ANOMALY: Sales → Suddenly heavy Azure/GCP usage

RED FLAG: New shadow AI tool adopted by department
```

---

## 🎯 Key Findings from Customer Data

### ✅ **Confirmed AI Usage:**
1. **Grammarly** - Writing assistant (sanctioned?)
2. **Microsoft Teams** - Has AI Copilot features
3. **Office 365** - Likely includes Copilot
4. **Google Chat** - Has Gemini integration

### ⚠️ **Suspicious Patterns:**
1. **Heavy Azure usage** by Marketing/Growth departments
   - Risk: Azure OpenAI or Azure ML without approval
   
2. **Unauthenticated Transactions** accessing cloud platforms
   - Risk: Service accounts running AI workloads
   
3. **Road Warrior** accessing Google Cloud Platform
   - Risk: Personal AI tools on corporate network
   
4. **Blocked SSL** on Google Chat
   - Risk: Users trying to bypass security

### ❌ **Critical Gaps:**
- **No explicit ChatGPT, Claude, or Midjourney** detected
- **But**: "General Browsing" category could hide these
- **Recommendation**: Need full URL analysis, not just Zscaler app tags

---

## 🛠️ Implementation Steps

### **Step 1: Data Collection (Day 1)**
```bash
# Export Zscaler logs
- Time range: Last 30-90 days
- Format: CSV
- Fields: All (especially URL, Department, Location, Cloud Application)
```

### **Step 2: Pattern Matching (Day 2-3)**
```python
# Run detection rules
for log_entry in zscaler_logs:
    # Rule 1: Direct AI domains
    if any(domain in log_entry['URL'] for domain in AI_DOMAINS):
        flag_as_shadow_ai(log_entry, risk='CRITICAL')
    
    # Rule 2: Cloud AI platforms
    if any(pattern in log_entry['URL'] for pattern in CLOUD_AI_PATTERNS):
        flag_as_shadow_ai(log_entry, risk='CRITICAL')
    
    # Rule 3: Unauthenticated + Cloud
    if (log_entry['Department'] == 'Unauthenticated' and 
        log_entry['Cloud Application Class'] == 'Hosting Providers'):
        flag_as_shadow_ai(log_entry, risk='CRITICAL')
```

### **Step 3: Anomaly Detection (Week 2)**
```python
# Behavioral analysis
- Baseline department cloud usage (30-day average)
- Flag deviations >200% from baseline
- Identify high-frequency API calls (>100/day)
- Detect after-hours usage (10pm-6am)
```

### **Step 4: AIKovrr Integration (Week 3-4)**
```
1. Deploy Zscaler connector
2. Automatic asset creation for detected AI
3. Risk scoring: Department + Usage Pattern + Data Sensitivity
4. Real-time alerts to CISO dashboard
```

---

## 📈 Expected Results

### **First 30 Days:**
- **10-20 shadow AI services** discovered
- **5-10 departments** using unapproved AI
- **2-3 critical risks** (data exfiltration, compliance)

### **ROI:**
- **Risk Mitigation**: Prevent GDPR fines ($4M average)
- **Cost Savings**: Eliminate redundant AI subscriptions ($50K-200K/year)
- **Compliance**: Audit-ready AI inventory

---

## 🚀 Quick Win: Top 5 URLs to Check NOW

1. **openai.com** - ChatGPT usage
2. **claude.ai** - Anthropic Claude usage
3. ***.azureml.net** - Azure ML usage
4. ***.aiplatform.googleapis.com** - Google Vertex AI
5. **midjourney.com** - Image generation AI

**Action**: Search Zscaler logs for these domains → Immediate shadow AI discovery

---

**Next Step**: Schedule 30-min call to review full Zscaler export and deploy detection rules.
