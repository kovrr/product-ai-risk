# AIKovrr Assets Visibility - Demo Video Script

**Duration**: 5-7 minutes  
**Objective**: Demonstrate AI Assets Visibility module and cross-module integration  
**Audience**: Stakeholders, potential customers, internal team

---

## 🎬 Pre-Recording Checklist

### Before You Start:
- [ ] Both servers running (backend + frontend)
- [ ] Browser at login page: http://localhost:5174/login
- [ ] Clear browser cache/cookies for clean demo
- [ ] Close unnecessary browser tabs
- [ ] Set browser zoom to 100%
- [ ] Prepare screen recording software (Loom, QuickTime, OBS)
- [ ] Test audio/microphone
- [ ] Have this script open on second monitor

### Recording Settings:
- **Resolution**: 1920x1080 (Full HD)
- **Frame Rate**: 30 fps
- **Audio**: Clear narration with no background noise
- **Browser**: Chrome or Firefox (latest version)

---

## 🎥 Video Structure

### Act 1: Introduction (30 seconds)
### Act 2: Dashboard Overview (1 minute)
### Act 3: Assets List View (1.5 minutes)
### Act 4: Asset Detail View (1.5 minutes)
### Act 5: Cross-Module Integration (2 minutes)
### Act 6: Conclusion (30 seconds)

**Total**: ~7 minutes

---

## 📝 Detailed Script

---

### 🎬 ACT 1: INTRODUCTION (30 seconds)

**[SCREEN: Login page]**

**NARRATION:**
> "Welcome to AIKovrr's AI Assets Visibility module. Today, I'll show you how organizations can discover, inventory, and govern all AI tools and models across their enterprise—from sanctioned applications to shadow AI."

**ACTIONS:**
1. Show login page briefly
2. Type username: `admin`
3. Type password: `password123`
4. Click "Login"

**[TRANSITION: Login → Dashboard]**

---

### 🎬 ACT 2: DASHBOARD OVERVIEW (1 minute)

**[SCREEN: Dashboard]**

**NARRATION:**
> "After logging in, we land on the dashboard, which gives us an immediate view of our AI asset landscape."

**ACTIONS:**
1. **Point to stat cards** (hover mouse over each):
   - "We have 40 total AI assets in our organization"
   - "10 are Shadow AI—unapproved tools employees are using"
   - "20 are under review for approval"
   - "And 10 are flagged as high risk"

**PAUSE 2 seconds**

2. **Scroll down to widgets**:
   - "Here we see our most recently added assets"
   - Hover over ChatGPT in Recent Assets
   - "And our highest-risk assets, like ChatGPT with an 85 risk score"

**NARRATION:**
> "Let's investigate that Shadow AI problem. I'll click on the Shadow AI card to see what tools employees are using without approval."

**ACTIONS:**
3. Click "Shadow AI" stat card (10 assets)

**[TRANSITION: Dashboard → Assets List filtered by shadow]**

---

### 🎬 ACT 3: ASSETS LIST VIEW (1.5 minutes)

**[SCREEN: Assets List - filtered by shadow]**

**NARRATION:**
> "Here's our Assets Visibility table, currently filtered to show only Shadow AI. We can see 10 unapproved tools including ChatGPT, Claude, Midjourney, and others."

**ACTIONS:**
1. **Point to table columns** (move mouse across):
   - "Each asset shows its name, vendor, status, owners"
   - "Risk tier and score"
   - "Regulatory applicability"
   - "And whether it processes personal data"

**PAUSE 2 seconds**

2. **Clear filter**:
   - Click "Clear Filters" button
   - "Now we see all 40 assets"

**NARRATION:**
> "The table is fully searchable and filterable. Let me search for a specific asset."

**ACTIONS:**
3. **Search demonstration**:
   - Click search box
   - Type "GitHub Copilot"
   - Show filtered result
   - "GitHub Copilot is sanctioned with a medium risk score"

4. **Clear search**:
   - Clear search box
   - "Let's filter by risk level"

5. **Filter demonstration**:
   - Click "Risk Filter" dropdown
   - Select "Critical"
   - Show ChatGPT (only critical asset)
   - "ChatGPT has a critical risk score of 85"

**NARRATION:**
> "Let's dive deeper into ChatGPT to see why it's so risky."

**ACTIONS:**
6. Click on ChatGPT row

**[TRANSITION: Assets List → Asset Detail View]**

---

### 🎬 ACT 4: ASSET DETAIL VIEW (1.5 minutes)

**[SCREEN: Asset Detail - ChatGPT]**

**NARRATION:**
> "This is the detailed view for ChatGPT. At the top, we see it's a Shadow AI asset with a critical risk tier."

**ACTIONS:**
1. **Point to header**:
   - Asset name, status badge, risk badge
   - Quick stats cards

**NARRATION:**
> "The detail page has five tabs. Let's explore each one."

**ACTIONS:**
2. **Overview Tab** (already open):
   - Scroll through sections
   - "We see core identity, ownership, vendor information, and deployment details"
   - Point to "Business Owner" and "Technical Owner"
   - "It's deployed on SaaS in production"

**PAUSE 1 second**

3. **Click "Risk & Compliance" tab**:
   - "Here's why it's critical"
   - Point to risk score: 85/100
   - Point to "Personal Data Used: Yes"
   - "It processes personal data but has no regulatory controls"
   - Show risk score progress bar

**PAUSE 1 second**

4. **Click "Technical Details" tab**:
   - "Technical information about the AI model"
   - Point to "Model Provider: OpenAI"
   - Point to "Model Version: GPT-4"

**PAUSE 1 second**

5. **Click "Controls" tab**:
   - "This shows applied controls—but ChatGPT has none"
   - "That's why it's high risk"

**PAUSE 1 second**

6. **Click "Risks" tab**:
   - "ChatGPT is linked to one risk scenario"
   - Point to "Sensitive data exposure via AI tools"
   - "This is a High priority risk"

**NARRATION:**
> "Let's see what other assets are affected by this same risk. I'll click on the risk."

**ACTIONS:**
7. Click on the risk card

**[TRANSITION: Asset Detail → Risk Register]**

---

### 🎬 ACT 5: CROSS-MODULE INTEGRATION (2 minutes)

**[SCREEN: Risk Register]**

**NARRATION:**
> "Now we're in the Risk Register. This shows all AI-related risk scenarios in our organization."

**ACTIONS:**
1. **Point to table**:
   - "Notice the new 'Affected Assets' column"
   - Hover over "Sensitive data exposure" row
   - "This risk affects 5 assets"

**PAUSE 1 second**

2. **Click "View" link** on data exposure risk:
   - **[TRANSITION: Risk Register → Assets List filtered]**
   - "Here are all 5 assets affected by this risk"
   - Point to ChatGPT, Claude, Bard, etc.
   - "All shadow AI tools that could leak sensitive data"

**NARRATION:**
> "Let's see how we're controlling these risks. I'll navigate to the AI Assurance Plan."

**ACTIONS:**
3. Click "AI Assurance Plan" in sidebar

**[TRANSITION: Assets List → AI Assurance Plan]**

**[SCREEN: AI Assurance Plan]**

**NARRATION:**
> "The AI Assurance Plan shows our control framework—10 NIST AI RMF controls."

**ACTIONS:**
4. **Point to table**:
   - "Each control shows its maturity level"
   - Point to "current → target" maturity
   - "And most importantly, the 'Applicable Assets' column"

**PAUSE 1 second**

5. **Scroll to Access Control row**:
   - "Access Control is applied to 15 assets"
   - Hover over the row
   - "It's implemented with maturity level 3 out of 4"

**ACTIONS:**
6. **Click "View" link** on Access Control:
   - **[TRANSITION: AI Assurance Plan → Assets List filtered]**
   - "Here are all 15 assets with access control"
   - Scroll through list
   - "Notice these are mostly sanctioned assets"
   - Point to GitHub Copilot, Salesforce Einstein, etc.

**NARRATION:**
> "This cross-module integration lets us trace relationships between assets, risks, and controls—giving us complete visibility and governance."

**ACTIONS:**
7. Click "Dashboard" in sidebar

**[TRANSITION: Back to Dashboard]**

---

### 🎬 ACT 6: CONCLUSION (30 seconds)

**[SCREEN: Dashboard]**

**NARRATION:**
> "Let me summarize what we've seen today:"

**ACTIONS:**
1. **Slowly scroll through dashboard** while narrating:

**NARRATION:**
> "AIKovrr's Assets Visibility module provides:
> 
> - **Complete inventory** of all AI assets—sanctioned and shadow
> - **Risk assessment** with scores and regulatory compliance tracking
> - **Control coverage** showing which assets are protected
> - **Cross-module integration** linking assets to risks and controls
> - **Actionable insights** to govern AI responsibly
> 
> With AIKovrr, organizations can discover shadow AI, assess risks, apply controls, and demonstrate compliance—all in one platform."

**ACTIONS:**
2. **Pause on dashboard** (2 seconds)

**NARRATION:**
> "Thank you for watching. To learn more about AIKovrr, visit our website or contact our team."

**[FADE OUT]**

---

## 🎨 Visual Tips

### Camera/Recording:
- **Smooth mouse movements** - No jerky cursor
- **Pause on important elements** - Let viewers read
- **Use cursor to point** - Circle or underline key info
- **Zoom in** on small text if needed (browser zoom or post-production)

### Pacing:
- **Speak clearly and slowly** - Not rushed
- **Pause between sections** - 1-2 seconds
- **Let data load** - Don't click too fast
- **Emphasize key numbers** - "85 risk score", "10 shadow AI"

### Highlighting:
- **Hover over elements** you're discussing
- **Click deliberately** - Show you're in control
- **Return to overview** - Don't get lost in details

---

## 🎬 Post-Production Checklist

### Editing:
- [ ] Add intro title card: "AIKovrr - AI Assets Visibility Demo"
- [ ] Add chapter markers for each act
- [ ] Add text overlays for key stats (optional)
- [ ] Add background music (subtle, professional)
- [ ] Add outro with contact info/CTA
- [ ] Check audio levels (consistent volume)
- [ ] Export in 1080p

### Annotations (Optional):
- [ ] Highlight "Shadow AI" stat with arrow/circle
- [ ] Zoom in on risk score: 85/100
- [ ] Callout box: "5 affected assets"
- [ ] Callout box: "15 assets with control"

### Branding:
- [ ] Add company logo (top-right corner)
- [ ] Use brand colors for overlays
- [ ] Add website URL in outro
- [ ] Add social media handles

---

## 📊 Alternative Demo Paths

### Short Version (3 minutes):
1. Login (10s)
2. Dashboard overview (30s)
3. Assets list with search (45s)
4. Asset detail - ChatGPT (60s)
5. Cross-module - Risk Register (30s)
6. Conclusion (15s)

### Feature-Focused Versions:

#### Shadow AI Discovery (2 minutes):
- Focus on shadow AI detection
- Show all 10 shadow assets
- Demonstrate risk assessment
- Show lack of controls

#### Control Coverage (2 minutes):
- Focus on AI Assurance Plan
- Show control maturity
- Demonstrate asset-control links
- Show coverage gaps

#### Risk Management (2 minutes):
- Focus on Risk Register
- Show risk-asset relationships
- Demonstrate risk scoring
- Show mitigation strategies

---

## 🎯 Key Messages to Emphasize

### Problem:
- "Organizations have no visibility into AI usage"
- "Shadow AI creates compliance and security risks"
- "Manual tracking is impossible at scale"

### Solution:
- "Automated discovery of all AI assets"
- "Risk-based prioritization"
- "Control framework integration"
- "Cross-module traceability"

### Value:
- "40 assets inventoried automatically"
- "10 shadow AI tools discovered"
- "Complete risk-to-asset mapping"
- "Compliance-ready documentation"

---

## 📝 Narration Script (Full Text)

**[Copy this for teleprompter or voice-over]**

```
Welcome to AIKovrr's AI Assets Visibility module. Today, I'll show you how 
organizations can discover, inventory, and govern all AI tools and models 
across their enterprise—from sanctioned applications to shadow AI.

After logging in, we land on the dashboard, which gives us an immediate view 
of our AI asset landscape. We have 40 total AI assets in our organization. 
10 are Shadow AI—unapproved tools employees are using. 20 are under review 
for approval. And 10 are flagged as high risk.

Here we see our most recently added assets, and our highest-risk assets, 
like ChatGPT with an 85 risk score.

Let's investigate that Shadow AI problem. I'll click on the Shadow AI card 
to see what tools employees are using without approval.

Here's our Assets Visibility table, currently filtered to show only Shadow AI. 
We can see 10 unapproved tools including ChatGPT, Claude, Midjourney, and others.

Each asset shows its name, vendor, status, owners, risk tier and score, 
regulatory applicability, and whether it processes personal data.

The table is fully searchable and filterable. Let me search for a specific asset.
GitHub Copilot is sanctioned with a medium risk score. Let's filter by risk level.
ChatGPT has a critical risk score of 85. Let's dive deeper into ChatGPT to see 
why it's so risky.

This is the detailed view for ChatGPT. At the top, we see it's a Shadow AI asset 
with a critical risk tier. The detail page has five tabs. Let's explore each one.

We see core identity, ownership, vendor information, and deployment details. 
It's deployed on SaaS in production.

Here's why it's critical. It processes personal data but has no regulatory controls.

Technical information shows the Model Provider is OpenAI, Model Version GPT-4.

This shows applied controls—but ChatGPT has none. That's why it's high risk.

ChatGPT is linked to one risk scenario: Sensitive data exposure via AI tools. 
This is a High priority risk. Let's see what other assets are affected by this 
same risk.

Now we're in the Risk Register. This shows all AI-related risk scenarios in our 
organization. Notice the new 'Affected Assets' column. This risk affects 5 assets.

Here are all 5 assets affected by this risk—all shadow AI tools that could leak 
sensitive data.

Let's see how we're controlling these risks. I'll navigate to the AI Assurance Plan.

The AI Assurance Plan shows our control framework—10 NIST AI RMF controls. 
Each control shows its maturity level and most importantly, the 'Applicable Assets' 
column. Access Control is applied to 15 assets. It's implemented with maturity 
level 3 out of 4.

Here are all 15 assets with access control. Notice these are mostly sanctioned assets.

This cross-module integration lets us trace relationships between assets, risks, 
and controls—giving us complete visibility and governance.

Let me summarize what we've seen today. AIKovrr's Assets Visibility module provides:
Complete inventory of all AI assets—sanctioned and shadow. Risk assessment with 
scores and regulatory compliance tracking. Control coverage showing which assets 
are protected. Cross-module integration linking assets to risks and controls. 
And actionable insights to govern AI responsibly.

With AIKovrr, organizations can discover shadow AI, assess risks, apply controls, 
and demonstrate compliance—all in one platform.

Thank you for watching. To learn more about AIKovrr, visit our website or contact 
our team.
```

---

## 🚀 Recording Workflow

### Day Before:
1. Review this script 3 times
2. Practice narration
3. Test recording setup
4. Prepare backup plan

### Recording Day:
1. **Setup** (15 min):
   - Start servers
   - Clear browser data
   - Open recording software
   - Test audio

2. **Practice Run** (10 min):
   - Do complete walkthrough
   - Time yourself
   - Note any issues

3. **Record** (30 min):
   - Take 1: Full run
   - Take 2: If needed
   - Take 3: Backup

4. **Review** (10 min):
   - Watch recording
   - Check audio quality
   - Verify all features shown

### Post-Production:
1. **Edit** (2 hours):
   - Trim mistakes
   - Add intro/outro
   - Add annotations
   - Add music

2. **Export** (30 min):
   - 1080p MP4
   - H.264 codec
   - 30fps
   - Stereo audio

3. **Upload**:
   - YouTube (unlisted)
   - Vimeo (password protected)
   - Company portal

---

## 📧 Video Description Template

**Title**: AIKovrr - AI Assets Visibility Demo

**Description**:
```
Discover how AIKovrr helps organizations gain complete visibility and control 
over their AI assets—from sanctioned applications to shadow AI.

In this demo, you'll see:
✅ Automated AI asset discovery and inventory
✅ Risk assessment and scoring
✅ Control framework integration
✅ Cross-module traceability
✅ Shadow AI detection and governance

Key Features Demonstrated:
• 40 AI assets across the organization
• 10 shadow AI tools discovered
• Risk-based prioritization
• NIST AI RMF control mapping
• Real-time dashboards and reporting

Perfect for:
• CISOs and security teams
• Compliance officers
• Risk managers
• IT governance teams

Learn more: [Your Website]
Contact us: [Your Email]

#AIGovernance #AIRisk #Compliance #ShadowAI #AIKovrr
```

---

**Good luck with your demo video! 🎬**
