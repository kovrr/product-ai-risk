# Expanded AI Asset Catalog - 118+ AI Tools

**Date**: December 7, 2025  
**Script**: `unified_ai_asset_detector.py` (v4 with expanded catalog)  
**Report**: `unified_ai_assets_expanded_20251207_175241.xlsx`

---

## 🎯 **What's New: Comprehensive AI Detection**

### **Catalog Expansion:**
- **Previous**: 20 AI tools
- **Current**: 118+ AI tools
- **Increase**: 6x more comprehensive coverage!

---

## 📊 **AI Tools by Category**

### **1. Major LLM Providers & Chatbots (16 tools)**
- ChatGPT, Claude, Gemini, Perplexity
- Cohere, AI21 Labs, Mistral AI
- Inflection Pi, Character.AI, Poe
- You.com, Phind, Andi
- **Chinese AI**: Doubao, Baidu Ernie, Alibaba Tongyi

### **2. AI Coding Assistants (13 tools)**
- GitHub Copilot, Tabnine, Codeium
- Amazon CodeWhisperer, Replit AI
- Cursor, Sourcegraph Cody, Mutable AI
- Codex, Lovable, v0.dev, Bolt.new, Windsurf

### **3. AI Writing & Content Tools (10 tools)**
- Jasper AI, Copy.ai, Writesonic
- Rytr, QuillBot, Wordtune
- Sudowrite, Shortly AI, Anyword
- Hypotenuse AI

### **4. AI Image & Video Generation (14 tools)**
- DALL-E, Midjourney, Stable Diffusion
- Leonardo.ai, Runway, Synthesia
- D-ID, Pictory, Descript
- Canva AI, Craiyon, Artbreeder
- Playground AI, Pika Labs

### **5. AI Voice & Audio (7 tools)**
- ElevenLabs, Murf AI, Resemble AI
- Play.ht, Otter.ai, Assembly AI
- Speechify

### **6. AI Productivity & Collaboration (12 tools)**
- Notion AI, Mem, Reflect
- Taskade, Motion, Reclaim AI
- Fireflies.ai, Fathom, Krisp
- Beautiful.ai, Gamma, Tome

### **7. Enterprise & Embedded AI (10 tools)**
- Microsoft 365 Copilot, Teams Copilot
- Google Duet AI, Adobe Firefly
- Salesforce Einstein, Zoom AI Companion
- Slack AI, ServiceNow AI, SAP Joule
- Oracle AI, Workday AI

### **8. Open Source & Developer Platforms (8 tools)**
- Hugging Face, Replicate, Together.ai
- Fireworks.ai, Anyscale, Modal
- Banana, Baseten

### **9. Specialized AI Tools (28 tools)**
- **Design**: Uizard, Galileo AI, Framer AI, Figma AI, Miro AI
- **Automation**: Zapier AI, Make AI
- **Database**: Airtable AI
- **Customer Support**: Intercom Fin, Zendesk AI
- **Marketing**: HubSpot AI, Mailchimp AI
- **E-commerce**: Shopify AI
- **Web Design**: Webflow AI, Wix AI, Squarespace AI
- **And more...**

---

## 🔍 **Detection Results (Same Data, More Coverage)**

### **Current Run Results:**
- **Total AI Assets Detected**: 9 (same as before)
- **Zscaler Detections**: 3 (GitHub Copilot, ChatGPT, Grammarly)
- **DSPM Detections**: 7 (M365 Copilot, Claude, Perplexity, etc.)

### **Why Same Results?**
The expanded catalog didn't find new AI tools in **this specific dataset** because:
1. **Zscaler logs**: Only 6 minutes of data (100K entries)
2. **DSPM logs**: Limited to Microsoft Purview tracked apps
3. **Organization usage**: This org primarily uses Microsoft AI + a few others

### **Value of Expanded Catalog:**
When you run this on **full production data** (weeks/months of logs), you'll detect:
- **Coding AI**: Tabnine, Codeium, Cursor, etc.
- **Writing AI**: Jasper, Copy.ai, QuillBot, etc.
- **Image AI**: Midjourney, DALL-E, Stable Diffusion, etc.
- **Productivity AI**: Notion AI, Fireflies, Otter.ai, etc.
- **Enterprise AI**: Salesforce Einstein, HubSpot AI, etc.

---

## 📋 **Catalog Structure**

Each AI tool includes:
```python
'Tool Name': {
    'vendor': 'Vendor Name',
    'category': 'AI Category',
    'asset_type': 'standalone' or 'embedded',
    'parent_app': 'Parent App' (if embedded),
    'risk_level': 'CRITICAL', 'HIGH', 'MEDIUM', or 'LOW',
    'approved': True/False,
    'url_patterns': ['domain1.com', 'domain2.com'],
    'dspm_patterns': ['app name pattern'],
    'data_sovereignty_risk': True/False (for Chinese AI)
}
```

---

## 🚨 **Risk Levels Explained**

### **CRITICAL (30+ tools)**
- Major LLMs (ChatGPT, Claude, Gemini)
- Code generation AI (high IP risk)
- Chinese AI services (data sovereignty)
- High data exposure potential

### **HIGH (40+ tools)**
- Coding assistants
- Enterprise AI (CRM, HR, Support)
- Image/Video generation
- ML platforms

### **MEDIUM (35+ tools)**
- Writing assistants
- Productivity tools
- Design tools
- Marketing AI

### **LOW (13+ tools)**
- Basic tools
- Limited data exposure
- Consumer-focused AI

---

## 🌍 **Data Sovereignty Tracking**

**Chinese AI Services (CRITICAL risk):**
- Doubao (ByteDance)
- Baidu Ernie
- Alibaba Tongyi

These are automatically flagged with `data_sovereignty_risk: True` and trigger **RULE_6_FOREIGN_AI**.

---

## 📊 **Coverage by Use Case**

| Use Case | Tools | Examples |
|----------|-------|----------|
| **Generative Chat** | 16 | ChatGPT, Claude, Gemini, Perplexity |
| **Code Generation** | 13 | Copilot, Cursor, Tabnine, Codeium |
| **Content Writing** | 10 | Jasper, Copy.ai, Writesonic |
| **Image/Video** | 14 | DALL-E, Midjourney, Runway |
| **Voice/Audio** | 7 | ElevenLabs, Otter.ai, Descript |
| **Productivity** | 12 | Notion AI, Fireflies, Motion |
| **Enterprise** | 10 | M365 Copilot, Salesforce Einstein |
| **Developer Platforms** | 8 | Hugging Face, Replicate |
| **Specialized** | 28 | Design, Automation, CRM, Marketing |

---

## 🎯 **Next Steps for Production Use**

### **1. Run on Full Production Data**
```bash
# Use weeks/months of Zscaler logs
python3 unified_ai_asset_detector.py \
    /path/to/zscaler_full_logs.csv \
    /path/to/dspm_full_logs.csv \
    production_ai_assets_$(date +%Y%m%d).xlsx
```

### **2. Expected Results with Full Data**
With comprehensive logs, you'll likely detect:
- **20-50 AI tools** (vs current 9)
- **Coding AI**: Developers using Cursor, Tabnine, Codeium
- **Writing AI**: Marketing using Jasper, Copy.ai
- **Image AI**: Design team using Midjourney, DALL-E
- **Productivity AI**: Teams using Notion AI, Fireflies
- **Hidden Enterprise AI**: Salesforce Einstein, HubSpot AI

### **3. Customize the Catalog**
Add organization-specific AI tools:
```python
'Custom Internal AI': {
    'vendor': 'Internal',
    'category': 'Custom AI',
    'asset_type': 'standalone',
    'risk_level': 'HIGH',
    'approved': True,
    'url_patterns': ['internal-ai.company.com'],
    'dspm_patterns': ['internal ai'],
    'data_sovereignty_risk': False
}
```

### **4. Adjust Risk Levels**
Customize risk levels based on your organization's policies:
```python
# Example: Lower risk for approved enterprise AI
'Salesforce Einstein': {
    'risk_level': 'MEDIUM',  # Changed from HIGH
    'approved': True,        # Mark as approved
    ...
}
```

---

## 💡 **Key Insights**

### **1. Comprehensive Coverage**
- **118+ AI tools** across all major categories
- **16 LLM providers** (including Chinese AI)
- **13 coding assistants** (critical for IP protection)
- **28 specialized tools** (design, automation, CRM, etc.)

### **2. Data Sovereignty Protection**
- **3 Chinese AI services** automatically flagged
- Triggers **RULE_6_FOREIGN_AI** (CRITICAL)
- Helps with GDPR/compliance

### **3. Enterprise AI Visibility**
- **10 enterprise AI tools** (Salesforce, SAP, Oracle, etc.)
- Often embedded in approved apps
- May require separate governance

### **4. Shadow AI Detection**
- Expanded catalog increases shadow AI detection
- More URL patterns = better Zscaler matching
- More DSPM patterns = better Microsoft Purview matching

---

## 📁 **Files**

### **Updated Script:**
```
/Users/liransorani/CascadeProjects/aikovrr/product/eval/network_analysis/
unified_ai_asset_detector.py
```

### **Latest Report:**
```
unified_ai_assets_expanded_20251207_175241.xlsx
```

### **Catalog Stats:**
- **Total Tools**: 118+
- **Standalone**: 78
- **Embedded**: 40
- **Critical Risk**: 30+
- **High Risk**: 40+
- **Medium Risk**: 35+
- **Low Risk**: 13+

---

## ✅ **Success Metrics**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **AI Tools Covered** | 20 | 118+ | **6x** |
| **LLM Providers** | 6 | 16 | **2.7x** |
| **Coding AI** | 3 | 13 | **4.3x** |
| **Enterprise AI** | 4 | 10 | **2.5x** |
| **URL Patterns** | ~50 | ~200+ | **4x** |
| **Categories** | 8 | 9 | **+1** |

---

## 🚀 **Ready for Production!**

The expanded catalog provides:
- ✅ **Comprehensive AI detection** across all major categories
- ✅ **Data sovereignty protection** (Chinese AI flagged)
- ✅ **Enterprise AI visibility** (Salesforce, SAP, Oracle, etc.)
- ✅ **Shadow AI detection** (118+ tools vs 20)
- ✅ **Zscaler policy-based approval** (maintained)
- ✅ **9 shadow AI rules** (maintained)
- ✅ **Bypass detection** (maintained)

**Next**: Run on full production data to see the real impact!
