# Zscaler Shadow AI Detection Tool

## Overview

This tool analyzes Zscaler proxy logs to automatically detect shadow AI usage in your organization. It identifies unapproved AI services, cloud AI platforms, and risky usage patterns.

## Features

- ✅ **7 Detection Rules** covering CRITICAL, HIGH, and MEDIUM risk scenarios
- ✅ **Excel Report** with 5 sheets: Executive Summary, Findings, Rules, Raw Data
- ✅ **Clear Explanations** for each finding with specific actions required
- ✅ **Risk Prioritization** (CRITICAL/HIGH/MEDIUM)
- ✅ **Audit Trail** linking findings back to original log entries

## Requirements

```bash
pip install pandas openpyxl
```

## Usage

### 1. Export Zscaler Logs

From your Zscaler admin console, export web proxy logs with these fields:
- Event Time
- Unique_ID
- URL
- Policy Action ⭐ (CRITICAL - must include this)
- Cloud Application Class
- Cloud Application
- Department
- Location
- Protocol

**Time Range**: 30 days recommended

**Format**: CSV

### 2. Run the Script

```bash
python zscaler_shadow_ai_detector.py zscaler_logs.csv shadow_ai_report.xlsx
```

### 3. Review the Report

Open `shadow_ai_report.xlsx` in Excel and review:
1. **Executive Summary** - High-level metrics
2. **Shadow AI Findings** - Detailed findings with risk levels
3. **Detection Rules** - Reference guide
4. **Raw Data (Findings)** - Original log entries for flagged items

## Detection Rules

### CRITICAL Risk

**Rule 1: Direct AI Service Domains**
- Detects: ChatGPT, Claude, Midjourney, Jasper, Copy.ai, etc.
- Why: Unapproved AI actively processing company data

**Rule 2: Cloud AI Platform APIs**
- Detects: Azure OpenAI, Vertex AI, AWS Bedrock
- Why: Enterprise AI running without governance

**Rule 3: Unauthenticated AI Access**
- Detects: Service accounts/scripts using AI
- Why: No user accountability, potential rogue automation

### HIGH Risk

**Rule 4: Non-IT Cloud Platform Usage**
- Detects: Marketing/Sales using Azure/GCP/AWS AI
- Why: Business units bypassing IT

**Rule 5: Road Warrior AI Access**
- Detects: Remote workers using AI on personal devices
- Why: Personal AI accounts, data leakage risk

**Rule 6: API Endpoint Patterns**
- Detects: AI API calls (/api/v1/chat, /completions, etc.)
- Why: AI embedded in business processes

### MEDIUM Risk

**Rule 7: AI Productivity Tools**
- Detects: Grammarly, Notion AI, Zoom AI
- Why: May need DPA review, usage tracking

## Important: Policy Action Field

**The script ONLY flags "Allowed" traffic as Shadow AI.**

- ✅ **"Allowed"** = Shadow AI (unknown, unapproved, actively used)
- ❌ **"Blocked"** = NOT Shadow AI (organization already blocking)
- ❌ **"Not allowed to browse"** = NOT Shadow AI (policy enforced)

**Why?** Blocked traffic means your organization is already aware and preventing access. Shadow AI is about discovering the unknown.

## Example Output

```
🔍 Zscaler Shadow AI Detection Script
======================================================================

📂 Reading Zscaler logs from: zscaler_logs.csv
✅ Loaded 1,247 log entries
🔍 Running shadow AI detection rules...
🚨 Found 23 shadow AI instances

📊 Generating report: shadow_ai_report.xlsx
✅ Report generated successfully!

======================================================================
✅ Analysis Complete!
======================================================================

📊 Summary:
   - Total entries analyzed: 1,247
   - Shadow AI instances found: 23
   - CRITICAL: 12
   - HIGH: 8
   - MEDIUM: 3

📄 Report saved to: shadow_ai_report.xlsx
```

## Report Structure

### Sheet 1: Executive Summary
- Total entries analyzed
- Shadow AI instances found
- Risk level breakdown
- Unique AI services detected
- Departments affected
- Analysis timestamp

### Sheet 2: Shadow AI Findings
Each finding includes:
- **Risk Level** (CRITICAL/HIGH/MEDIUM)
- **Category** (e.g., "Shadow AI - Generative AI Service")
- **Rule** matched
- **Matched Pattern** (e.g., "openai.com")
- **Explanation** (why it's risky)
- **Action Required** (what to do)
- **Event Details** (Time, URL, Department, Location, User ID)
- **Row Index** (links to raw data)

### Sheet 3: Detection Rules
Complete reference guide for all 7 rules with:
- Rule ID and name
- Risk level
- Description
- Conditions
- Examples
- Why it's critical

### Sheet 4: Raw Data (Findings)
Original Zscaler log entries for ONLY the flagged items. Use this to:
- Verify findings
- Investigate users
- Review context

### Sheet 5: Full Raw Data
Complete dataset (if <10K rows) for reference.

## Customization

### Add Custom AI Domains

Edit the `AI_DOMAINS` list in the script:

```python
AI_DOMAINS = [
    'openai.com',
    'claude.ai',
    'your-custom-ai-tool.com',  # Add your domain here
]
```

### Modify IT Departments

Edit the `IT_DEPARTMENTS` list:

```python
IT_DEPARTMENTS = [
    'IT Infrastructure',
    'Your Custom IT Dept Name',  # Add your dept here
]
```

### Adjust Risk Levels

Modify the risk level in each rule function (e.g., change 'HIGH' to 'CRITICAL').

## Troubleshooting

### "Error reading file"
- Ensure CSV is properly formatted
- Check file path is correct
- Verify CSV has required columns

### "No shadow AI detected"
- Verify "Policy Action" field is included in export
- Check if logs contain "Allowed" traffic
- Ensure time range includes user activity (not just overnight)

### Large Dataset (>10K rows)
- Script will skip "Full Raw Data" sheet
- Findings and raw findings data still included
- Refer to original CSV for complete dataset

## Use Cases

### 1. Initial Discovery
Run on 30-90 days of logs to discover baseline shadow AI usage.

### 2. Monthly Monitoring
Run monthly to track new shadow AI adoption.

### 3. Department Audit
Filter logs by department before running script.

### 4. Post-Policy Enforcement
Run after implementing AI policy to verify compliance.

### 5. Risk Assessment
Use findings to populate AIKovrr platform risk register.

## Integration with AIKovrr

The output of this script can be used to:
1. **Populate Assets Visibility** - Import discovered AI tools
2. **Create Risk Register entries** - Flag high-risk AI for assessment
3. **Generate Compliance Reports** - Document shadow AI for audits
4. **Prioritize Governance** - Focus on CRITICAL findings first

## Support

For questions or issues:
- Email: liran@kovrr.com
- Documentation: See ZSCALER_SHADOW_AI_ANALYSIS.md in /product folder

## Version

- **Version**: 1.0
- **Last Updated**: November 30, 2025
- **Author**: AIKovrr Product Team
