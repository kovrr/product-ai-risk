# Embedded AI Detection Strategy

## 🎯 Problem Statement

Many regular enterprise applications now have **embedded AI features** that users can access without explicitly visiting AI-specific websites. These "hidden AI" capabilities represent a significant blind spot in traditional shadow AI detection.

---

## 📊 Apps with Embedded AI Features

### **HIGH RISK - Detected in Zscaler Logs**

#### **1. Microsoft 365 (Office)** - 5,623 records
**Embedded AI Features:**
- **Copilot in Word/Excel/PowerPoint/Outlook** - AI writing, data analysis, email drafting
- **Designer** - AI-powered design suggestions
- **Editor AI** - Advanced grammar and style suggestions

**Detection Patterns:**
- URL contains: `copilot`, `designer.microsoft.com`, `editor`
- Cloud App: "Common Office 365 Applications"

**Risk:**
- Users can access generative AI without leaving Office
- Data processed by Microsoft AI models
- May bypass DLP controls

**Current Status:** ✅ Found 63 "copilot" matches (GitHub Copilot)
**Action Needed:** Distinguish between M365 Copilot and GitHub Copilot

---

#### **2. Microsoft Teams** - 1,776 records
**Embedded AI Features:**
- **Teams Copilot** - Meeting summaries, chat suggestions
- **AI-powered transcription** - Real-time meeting transcription
- **Intelligent recap** - Post-meeting summaries

**Detection Patterns:**
- URL contains: `copilot`, `teams.microsoft.com/ai`
- Cloud App: "Microsoft Teams"

**Risk:**
- Meeting content processed by AI
- Automatic summaries may expose sensitive discussions
- Users may not realize AI is active

**Current Status:** ⚠️ Teams traffic detected, but no AI-specific URLs found
**Action Needed:** Check for AI-specific API calls

---

#### **3. Google Workspace** - 601 records (Google Cloud Platform)
**Embedded AI Features:**
- **Duet AI** - AI assistant in Gmail, Docs, Sheets
- **Smart Compose/Reply** - AI-powered email suggestions
- **Gemini integration** - Generative AI in Workspace

**Detection Patterns:**
- URL contains: `duet`, `gemini`, `bard`, `ai.google.com`
- Cloud App: "Google Cloud Platform"

**Risk:**
- Generative AI in email and documents
- Data sent to Google AI models
- May conflict with Microsoft-only policy

**Current Status:** ⚠️ Found 1 "duet" match, 5 "bard" matches (likely false positives)
**Action Needed:** Verify if actual Duet AI usage

---

#### **4. Adobe Creative Cloud** - cc-api-data.adobe.io detected
**Embedded AI Features:**
- **Firefly** - Generative AI for images (text-to-image, generative fill)
- **Sensei AI** - AI-powered editing tools
- **Content-Aware Fill** - AI-powered image editing

**Detection Patterns:**
- URL contains: `firefly`, `sensei`, `adobe.io/ai`
- Cloud App: Adobe Creative Cloud

**Risk:**
- Generative AI for image creation
- Copyright and licensing concerns
- Data sent to Adobe AI models

**Current Status:** ✅ Found 8 "firefly" matches (fireflycloud.net - likely different service)
**Action Needed:** Verify if Adobe Firefly or different service

---

#### **5. LinkedIn** - 1,222 records
**Embedded AI Features:**
- **LinkedIn AI** - Job search recommendations
- **AI-powered content suggestions** - Post writing assistance
- **Learning recommendations** - AI-curated courses

**Detection Patterns:**
- URL contains: `linkedin.com/ai`, `learning-ai`
- Cloud App: "LinkedIn"

**Risk:**
- Professional data processed by AI
- Recruitment AI may introduce bias
- Content generation for professional posts

**Current Status:** ⚠️ LinkedIn traffic detected, no AI-specific patterns
**Action Needed:** Monitor for AI feature adoption

---

### **HIGH RISK - Not in Current Sample**

#### **6. Salesforce**
**Embedded AI Features:**
- **Einstein AI** - Predictive analytics, recommendations
- **Einstein GPT** - Generative AI for CRM
- **AI-powered insights** - Customer data analysis

**Detection Patterns:**
- URL contains: `einstein`, `salesforce.com/ai`
- Cloud App: "Salesforce"

**Risk:**
- Customer data processed by AI
- AI-generated customer communications
- Compliance concerns with AI decisions

**Current Status:** ✅ Found 31 "einstein" matches (Superdry e-commerce, not Salesforce)
**Action Needed:** Check if Salesforce is used

---

#### **7. Zoom**
**Embedded AI Features:**
- **AI Companion** - Meeting summaries, action items
- **Smart recording** - AI-powered highlights
- **Live transcription** - AI-powered captions

**Detection Patterns:**
- URL contains: `zoom.us/ai`, `companion`, `summary`
- Cloud App: "Zoom"

**Risk:**
- Meeting content processed by AI
- Automatic summaries may expose sensitive info
- Third-party AI processing

**Current Status:** ❌ No Zoom traffic in sample
**Action Needed:** Check if Zoom is used

---

### **MEDIUM RISK**

#### **8. Slack**
**Embedded AI Features:**
- **Slack AI** - Search, summaries, thread recaps
- **Workflow automation** - AI-powered workflows

**Detection Patterns:**
- URL contains: `slack.com/ai`, `slack-ai`

#### **9. Notion**
**Embedded AI Features:**
- **Notion AI** - Writing assistance, summarization

**Detection Patterns:**
- URL contains: `notion.ai`, `notion.so/ai`

#### **10. Grammarly**
**Embedded AI Features:**
- **GrammarlyGO** - AI writing assistant

**Detection Patterns:**
- URL contains: `grammarly.com`, `grammarly-ai`

---

## 🚨 Key Findings from Current Logs

### **Detected Embedded AI Patterns:**

1. **GitHub Copilot** - 63 matches ✅
   - `telemetry.business.githubcopilot.com`
   - `api.business.githubcopilot.com`
   - **Status:** Approved enterprise AI

2. **Firefly** - 8 matches ⚠️
   - `esms.fireflycloud.net`
   - **Status:** Likely NOT Adobe Firefly (different service)

3. **Einstein** - 31 matches ⚠️
   - `www.superdry.com/.../einsteincarousel`
   - **Status:** E-commerce recommendation engine, NOT Salesforce Einstein

4. **Duet** - 1 match ⚠️
   - Google image URL
   - **Status:** False positive, not Duet AI

5. **Bard** - 5 matches ⚠️
   - Facebook pixels, Google Maps
   - **Status:** False positives, not Google Bard

---

## 💡 Enhanced Detection Strategy

### **Problem with Current Approach:**
- Pattern matching on "ai", "copilot", etc. generates too many false positives
- Need more specific URL patterns for each embedded AI feature

### **Recommended Approach:**

#### **1. Specific URL Pattern Matching**
Instead of broad patterns, use specific endpoints:

```python
EMBEDDED_AI_PATTERNS = {
    'Microsoft 365 Copilot': [
        'copilot.microsoft.com',
        'api.copilot.microsoft.com',
        'copilot.cloud.microsoft',
        'substrate.office.com/copilot'  # Copilot API
    ],
    'Microsoft Teams Copilot': [
        'teams.microsoft.com/api/copilot',
        'teams.microsoft.com/ai',
        'api.teams.microsoft.com/copilot'
    ],
    'Google Duet AI': [
        'duet.google.com',
        'workspace.google.com/duet',
        'mail.google.com/mail/duet'
    ],
    'Adobe Firefly': [
        'firefly.adobe.com',
        'firefly-api.adobe.io',
        'cc-api.adobe.io/firefly'
    ],
    'Salesforce Einstein': [
        'einstein.salesforce.com',
        'api.salesforce.com/einstein',
        'einstein-ai.salesforce.com'
    ],
    'Zoom AI Companion': [
        'zoom.us/ai',
        'api.zoom.us/v2/ai',
        'zoom.us/companion'
    ],
    'Slack AI': [
        'slack.com/api/ai',
        'edgeapi.slack.com/ai'
    ],
    'Notion AI': [
        'notion.so/api/ai',
        'api.notion.com/ai'
    ]
}
```

#### **2. Cloud Application Field Analysis**
Use Zscaler's "Cloud Application" field to identify apps, then check for AI-specific API calls:

```python
# Example: Microsoft 365 with Copilot
if cloud_app == "Common Office 365 Applications":
    if "copilot" in url or "substrate.office.com" in url:
        detected_ai = "Microsoft 365 Copilot"
```

#### **3. URL Category + Pattern Combination**
Combine URL category with specific patterns:

```python
if url_category == "Professional Services" and "einstein" in url:
    if "salesforce.com" in url:
        detected_ai = "Salesforce Einstein"
```

#### **4. API Endpoint Detection**
Look for specific API endpoints that indicate AI usage:

```python
AI_API_ENDPOINTS = {
    '/api/copilot': 'Microsoft Copilot',
    '/api/ai': 'Generic AI API',
    '/v1/chat/completions': 'OpenAI-compatible API',
    '/api/generate': 'Generative AI API',
    '/api/summarize': 'AI Summarization'
}
```

---

## 🎯 Recommended Actions

### **Immediate (This Week):**

1. **Update Detection Script** to use specific URL patterns for embedded AI
2. **Distinguish GitHub Copilot from M365 Copilot** in current detections
3. **Verify false positives** (Firefly, Einstein, Duet matches)

### **Short-term (This Month):**

4. **Get longer Zscaler sample** (full day, not 6 minutes) to detect embedded AI usage
5. **Add Cloud Application field analysis** to improve detection accuracy
6. **Create embedded AI asset catalog** with specific detection rules

### **Long-term (Ongoing):**

7. **Monitor for new embedded AI features** as apps add AI capabilities
8. **Track embedded AI adoption** across the organization
9. **Establish governance** for embedded AI features in approved apps

---

## 📋 Enhanced Asset Catalog

### **Embedded AI Assets to Track:**

| Asset | Parent App | Risk Level | Approved? | Detection Pattern |
|-------|-----------|------------|-----------|-------------------|
| Microsoft 365 Copilot | Office 365 | HIGH | TBD | `copilot.microsoft.com`, `substrate.office.com/copilot` |
| Microsoft Teams Copilot | Teams | HIGH | TBD | `teams.microsoft.com/api/copilot` |
| GitHub Copilot | GitHub | HIGH | ✅ YES | `githubcopilot.com` |
| Google Duet AI | Workspace | HIGH | ❌ NO | `duet.google.com` |
| Adobe Firefly | Creative Cloud | HIGH | TBD | `firefly.adobe.com` |
| Salesforce Einstein | Salesforce | HIGH | TBD | `einstein.salesforce.com` |
| Zoom AI Companion | Zoom | MEDIUM | TBD | `zoom.us/ai` |
| Slack AI | Slack | MEDIUM | TBD | `slack.com/api/ai` |
| Notion AI | Notion | MEDIUM | ❌ NO | `notion.so/api/ai` |
| Grammarly GO | Grammarly | MEDIUM | TBD | `grammarly.com` |

---

## ✅ Next Steps

1. **Create enhanced detection script** with specific URL patterns
2. **Rerun analysis** on current Zscaler logs with new patterns
3. **Request full-day Zscaler logs** for better coverage
4. **Document embedded AI governance policy**
5. **Add embedded AI to AIKovrr Assets Visibility**

---

**Key Insight:** Traditional shadow AI detection misses embedded AI features in approved apps. Organizations need to track AI capabilities within existing tools, not just standalone AI services.
