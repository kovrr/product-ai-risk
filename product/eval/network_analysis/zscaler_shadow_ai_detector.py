#!/usr/bin/env python3
"""
Zscaler Shadow AI Detection Script
Analyzes Zscaler proxy logs to identify shadow AI usage

Input: Zscaler CSV export
Output: Excel report with Shadow AI findings, rules, and raw data

Usage:
    python zscaler_shadow_ai_detector.py input.csv output.xlsx
"""

import pandas as pd
import sys
from datetime import datetime
import re

# ============================================================================
# DETECTION RULES CONFIGURATION
# ============================================================================

# Rule 1: Direct AI Service Domains
AI_DOMAINS = [
    'openai.com', 'api.openai.com', 'chat.openai.com',
    'anthropic.com', 'claude.ai',
    'cohere.ai', 'cohere.com',
    'ai21.com',
    'huggingface.co',
    'replicate.com',
    'midjourney.com',
    'stability.ai',
    'character.ai',
    'jasper.ai',
    'copy.ai',
    'writesonic.com',
    'notion.ai',
    'perplexity.ai',
    'you.com',
    'phind.com',
    'poe.com',
    'quora.com/poe',
]

# Rule 2: Cloud AI Platform Patterns
CLOUD_AI_PATTERNS = [
    'azureml.net',
    'openai.azure.com',
    'ml.azure.com',
    'aiplatform.googleapis.com',
    'ml.googleapis.com',
    'sagemaker.aws.amazon.com',
    'bedrock.aws.amazon.com',
]

# Rule 6: API Endpoint Patterns
API_PATTERNS = [
    '/api/v1/chat',
    '/api/v1/completions',
    '/completions',
    '/v1/engines/',
    '/generate',
    '/inference',
    '/predict',
    '/models/',
]

API_QUERY_PARAMS = [
    'prompt=',
    'model=gpt',
    'model=claude',
    'temperature=',
    'max_tokens=',
]

# Rule 7: Productivity Tools with AI
AI_PRODUCTIVITY_TOOLS = [
    'Grammarly',
    'Notion',
    'Zoom',
    'Webex',
]

# Rule 4: IT Departments (exclude from non-IT cloud usage rule)
IT_DEPARTMENTS = [
    'IT Infrastructure',
    'Application Development',
    'Information Security',
    'IT',
    'Information Technology',
    'Engineering',
]

# Cloud Providers
CLOUD_PROVIDERS = [
    'Microsoft Azure',
    'Google Cloud Platform',
    'AWS',
    'Amazon Web Services',
]

# ============================================================================
# DETECTION FUNCTIONS
# ============================================================================

def normalize_url(url):
    """Normalize URL for pattern matching"""
    if pd.isna(url):
        return ''
    return str(url).lower()

def normalize_field(field):
    """Normalize field for matching"""
    if pd.isna(field):
        return ''
    return str(field).strip()

def check_rule_1_direct_ai_domains(row):
    """Rule 1: Direct AI Service Domains (Allowed only)"""
    url = normalize_url(row.get('URL', ''))
    policy_action = normalize_field(row.get('Policy Action', ''))
    
    if policy_action != 'Allowed':
        return None
    
    for domain in AI_DOMAINS:
        if domain in url:
            return {
                'Rule': 'Rule 1: Direct AI Service Domain',
                'Risk Level': 'CRITICAL',
                'Category': 'Shadow AI - Generative AI Service',
                'Matched Pattern': domain,
                'Explanation': f'Unapproved AI service ({domain}) actively used. Data may be sent to external AI provider without governance.',
                'Action Required': 'IMMEDIATE REVIEW - Assess data exposure, implement controls or block'
            }
    return None

def check_rule_2_cloud_ai_platforms(row):
    """Rule 2: Cloud AI Platform APIs (Allowed only)"""
    url = normalize_url(row.get('URL', ''))
    policy_action = normalize_field(row.get('Policy Action', ''))
    
    if policy_action != 'Allowed':
        return None
    
    for pattern in CLOUD_AI_PATTERNS:
        if pattern in url:
            return {
                'Rule': 'Rule 2: Cloud AI Platform',
                'Risk Level': 'CRITICAL',
                'Category': 'Shadow AI - Cloud AI Platform',
                'Matched Pattern': pattern,
                'Explanation': f'Enterprise AI platform ({pattern}) running without governance. Likely Azure OpenAI, Vertex AI, or AWS Bedrock.',
                'Action Required': 'IMMEDIATE REVIEW - Identify workload, assess compliance, establish governance'
            }
    return None

def check_rule_3_unauthenticated_ai(row):
    """Rule 3: Unauthenticated AI Access (Allowed only)"""
    dept = normalize_field(row.get('Department', ''))
    app_class = normalize_field(row.get('Cloud Application Class', ''))
    policy_action = normalize_field(row.get('Policy Action', ''))
    
    if policy_action != 'Allowed':
        return None
    
    if 'unauthenticated' in dept.lower() and 'hosting' in app_class.lower():
        return {
            'Rule': 'Rule 3: Unauthenticated AI Access',
            'Risk Level': 'CRITICAL',
            'Category': 'Shadow AI - Unattributed Usage',
            'Matched Pattern': f'Unauthenticated + {app_class}',
            'Explanation': 'AI usage without user attribution. Likely service account or automated script running AI workloads.',
            'Action Required': 'INVESTIGATE - Identify service account, assess workload, implement attribution'
            }
    return None

def check_rule_4_non_it_cloud_usage(row):
    """Rule 4: Non-IT Departments Using Cloud Platforms (Allowed only)"""
    dept = normalize_field(row.get('Department', ''))
    app_class = normalize_field(row.get('Cloud Application Class', ''))
    cloud_app = normalize_field(row.get('Cloud Application', ''))
    policy_action = normalize_field(row.get('Policy Action', ''))
    
    if policy_action != 'Allowed':
        return None
    
    # Check if department is NOT IT
    is_it_dept = any(it_dept.lower() in dept.lower() for it_dept in IT_DEPARTMENTS)
    if is_it_dept:
        return None
    
    # Check if using cloud platforms
    is_cloud = any(cloud.lower() in app_class.lower() or cloud.lower() in cloud_app.lower() 
                   for cloud in CLOUD_PROVIDERS)
    
    if is_cloud and dept:  # Exclude empty departments
        return {
            'Rule': 'Rule 4: Non-IT Cloud Platform Usage',
            'Risk Level': 'HIGH',
            'Category': 'Shadow AI - Business Unit Cloud Usage',
            'Matched Pattern': f'{dept} → {cloud_app or app_class}',
            'Explanation': f'Non-IT department ({dept}) using cloud AI platforms. Likely using Azure OpenAI, Vertex AI, or similar without IT approval.',
            'Action Required': 'INVESTIGATE - Contact department, assess AI usage, establish governance'
        }
    return None

def check_rule_5_road_warrior_ai(row):
    """Rule 5: Road Warrior AI Access (Allowed only)"""
    location = normalize_field(row.get('Location', ''))
    url = normalize_url(row.get('URL', ''))
    policy_action = normalize_field(row.get('Policy Action', ''))
    
    if policy_action != 'Allowed':
        return None
    
    if 'road warrior' in location.lower():
        # Check if accessing AI domains or cloud platforms
        is_ai = any(domain in url for domain in AI_DOMAINS)
        is_cloud_ai = any(pattern in url for pattern in CLOUD_AI_PATTERNS)
        
        if is_ai or is_cloud_ai:
            matched = next((d for d in AI_DOMAINS if d in url), 
                          next((p for p in CLOUD_AI_PATTERNS if p in url), 'AI service'))
            return {
                'Rule': 'Rule 5: Road Warrior AI Access',
                'Risk Level': 'HIGH',
                'Category': 'Shadow AI - Remote/Personal Device',
                'Matched Pattern': f'Road Warrior → {matched}',
                'Explanation': 'Remote worker accessing AI from personal/mobile device. Risk of personal AI accounts, data leakage.',
                'Action Required': 'INVESTIGATE - Verify user, assess device security, consider MDM/VPN requirements'
            }
    return None

def check_rule_6_api_patterns(row):
    """Rule 6: API Endpoint Patterns (Allowed only)"""
    url = normalize_url(row.get('URL', ''))
    policy_action = normalize_field(row.get('Policy Action', ''))
    
    if policy_action != 'Allowed':
        return None
    
    # Check API path patterns
    for pattern in API_PATTERNS:
        if pattern in url:
            return {
                'Rule': 'Rule 6: API Endpoint Pattern',
                'Risk Level': 'HIGH',
                'Category': 'Shadow AI - API Integration',
                'Matched Pattern': pattern,
                'Explanation': f'AI API endpoint detected ({pattern}). Likely automated AI integration in business process.',
                'Action Required': 'INVESTIGATE - Identify application, assess integration, establish API governance'
            }
    
    # Check query parameters
    for param in API_QUERY_PARAMS:
        if param in url:
            return {
                'Rule': 'Rule 6: API Query Parameter',
                'Risk Level': 'HIGH',
                'Category': 'Shadow AI - API Integration',
                'Matched Pattern': param,
                'Explanation': f'AI API query parameter detected ({param}). Indicates programmatic AI usage.',
                'Action Required': 'INVESTIGATE - Identify application, assess integration, establish API governance'
            }
    
    return None

def check_rule_7_productivity_tools(row):
    """Rule 7: Productivity Tools with AI (Allowed only)"""
    cloud_app = normalize_field(row.get('Cloud Application', ''))
    dept = normalize_field(row.get('Department', ''))
    policy_action = normalize_field(row.get('Policy Action', ''))
    
    if policy_action != 'Allowed':
        return None
    
    for tool in AI_PRODUCTIVITY_TOOLS:
        if tool.lower() in cloud_app.lower():
            return {
                'Rule': 'Rule 7: AI Productivity Tool',
                'Risk Level': 'MEDIUM',
                'Category': 'Shadow AI - Productivity Tool',
                'Matched Pattern': tool,
                'Explanation': f'AI-enabled productivity tool ({tool}) detected. May need usage tracking and DPA review.',
                'Action Required': 'MONITOR - Review vendor DPA, assess data exposure, consider sanctioning'
            }
    return None

# ============================================================================
# MAIN DETECTION LOGIC
# ============================================================================

def detect_shadow_ai(row):
    """Run all detection rules on a single row"""
    # Run rules in priority order
    rules = [
        check_rule_1_direct_ai_domains,
        check_rule_2_cloud_ai_platforms,
        check_rule_3_unauthenticated_ai,
        check_rule_4_non_it_cloud_usage,
        check_rule_5_road_warrior_ai,
        check_rule_6_api_patterns,
        check_rule_7_productivity_tools,
    ]
    
    for rule_func in rules:
        result = rule_func(row)
        if result:
            return result
    
    return None

def analyze_zscaler_logs(input_file):
    """Analyze Zscaler logs and return findings"""
    print(f"📂 Reading Zscaler logs from: {input_file}")
    
    try:
        df = pd.read_csv(input_file)
        print(f"✅ Loaded {len(df)} log entries")
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        sys.exit(1)
    
    # Detect shadow AI
    print("🔍 Running shadow AI detection rules...")
    findings = []
    
    for idx, row in df.iterrows():
        result = detect_shadow_ai(row)
        if result:
            # Add row data to finding
            finding = result.copy()
            finding['Event Time'] = row.get('Event Time', '')
            finding['URL'] = row.get('URL', '')
            finding['User ID'] = row.get('Unique_ID', '')
            finding['Department'] = row.get('Department', '')
            finding['Location'] = row.get('Location', '')
            finding['Cloud Application'] = row.get('Cloud Application', '')
            finding['Policy Action'] = row.get('Policy Action', '')
            finding['Row Index'] = idx
            findings.append(finding)
    
    print(f"🚨 Found {len(findings)} shadow AI instances")
    
    return df, findings

def create_rules_reference():
    """Create rules reference sheet"""
    rules_data = [
        {
            'Rule ID': 'Rule 1',
            'Rule Name': 'Direct AI Service Domains',
            'Risk Level': 'CRITICAL',
            'Description': 'Detects direct access to AI service domains (ChatGPT, Claude, Midjourney, etc.)',
            'Condition': 'URL contains AI domain AND Policy Action = Allowed',
            'Examples': 'openai.com, claude.ai, midjourney.com, jasper.ai',
            'Why Critical': 'Unapproved AI actively processing company data, potential data exfiltration'
        },
        {
            'Rule ID': 'Rule 2',
            'Rule Name': 'Cloud AI Platform APIs',
            'Risk Level': 'CRITICAL',
            'Description': 'Detects usage of cloud AI platforms (Azure OpenAI, Vertex AI, AWS Bedrock)',
            'Condition': 'URL contains cloud AI pattern AND Policy Action = Allowed',
            'Examples': 'azureml.net, openai.azure.com, aiplatform.googleapis.com',
            'Why Critical': 'Enterprise AI running without governance, compliance risk'
        },
        {
            'Rule ID': 'Rule 3',
            'Rule Name': 'Unauthenticated AI Access',
            'Risk Level': 'CRITICAL',
            'Description': 'Detects AI usage without user attribution (service accounts, scripts)',
            'Condition': 'Department = Unauthenticated AND Cloud = Hosting Providers AND Policy Action = Allowed',
            'Examples': 'Service accounts accessing Azure AI, automated scripts',
            'Why Critical': 'No user accountability, potential rogue automation'
        },
        {
            'Rule ID': 'Rule 4',
            'Rule Name': 'Non-IT Cloud Platform Usage',
            'Risk Level': 'HIGH',
            'Description': 'Detects non-technical departments using cloud AI platforms',
            'Condition': 'Department NOT IT AND Cloud Application = Azure/GCP/AWS AND Policy Action = Allowed',
            'Examples': 'Marketing using Azure OpenAI, Sales using Vertex AI',
            'Why Critical': 'Business units bypassing IT, no governance'
        },
        {
            'Rule ID': 'Rule 5',
            'Rule Name': 'Road Warrior AI Access',
            'Risk Level': 'HIGH',
            'Description': 'Detects remote workers accessing AI from personal/mobile devices',
            'Condition': 'Location = Road Warrior AND URL = AI service AND Policy Action = Allowed',
            'Examples': 'Remote worker using ChatGPT on personal laptop',
            'Why Critical': 'Personal AI accounts, data leakage risk, BYOD concerns'
        },
        {
            'Rule ID': 'Rule 6',
            'Rule Name': 'API Endpoint Patterns',
            'Risk Level': 'HIGH',
            'Description': 'Detects AI API calls indicating automated integration',
            'Condition': 'URL contains API patterns (/api/v1/chat, /completions, etc.) AND Policy Action = Allowed',
            'Examples': '/api/v1/chat/completions, ?model=gpt-4, ?prompt=',
            'Why Critical': 'AI embedded in business processes, automated data processing'
        },
        {
            'Rule ID': 'Rule 7',
            'Rule Name': 'AI Productivity Tools',
            'Risk Level': 'MEDIUM',
            'Description': 'Detects AI-enabled productivity tools (Grammarly, Notion, etc.)',
            'Condition': 'Cloud Application = AI productivity tool AND Policy Action = Allowed',
            'Examples': 'Grammarly, Notion AI, Zoom AI',
            'Why Critical': 'May need DPA review, usage tracking, data residency checks'
        }
    ]
    
    return pd.DataFrame(rules_data)

def generate_report(df, findings, output_file):
    """Generate Excel report with multiple sheets"""
    print(f"📊 Generating report: {output_file}")
    
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        # Sheet 1: Executive Summary
        summary_data = {
            'Metric': [
                'Total Log Entries Analyzed',
                'Shadow AI Instances Found',
                'CRITICAL Risk Findings',
                'HIGH Risk Findings',
                'MEDIUM Risk Findings',
                'Unique AI Services Detected',
                'Departments Affected',
                'Analysis Date'
            ],
            'Value': [
                len(df),
                len(findings),
                len([f for f in findings if f['Risk Level'] == 'CRITICAL']),
                len([f for f in findings if f['Risk Level'] == 'HIGH']),
                len([f for f in findings if f['Risk Level'] == 'MEDIUM']),
                len(set(f['Matched Pattern'] for f in findings)),
                len(set(f['Department'] for f in findings if f['Department'])),
                datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            ]
        }
        summary_df = pd.DataFrame(summary_data)
        summary_df.to_excel(writer, sheet_name='Executive Summary', index=False)
        
        # Sheet 2: Shadow AI Findings
        if findings:
            findings_df = pd.DataFrame(findings)
            # Reorder columns for clarity
            column_order = [
                'Risk Level', 'Category', 'Rule', 'Matched Pattern',
                'Explanation', 'Action Required',
                'Event Time', 'URL', 'Department', 'Location',
                'Cloud Application', 'Policy Action', 'User ID', 'Row Index'
            ]
            findings_df = findings_df[[col for col in column_order if col in findings_df.columns]]
            findings_df.to_excel(writer, sheet_name='Shadow AI Findings', index=False)
        else:
            # Empty findings
            pd.DataFrame({'Message': ['No shadow AI detected']}).to_excel(
                writer, sheet_name='Shadow AI Findings', index=False
            )
        
        # Sheet 3: Detection Rules Reference
        rules_df = create_rules_reference()
        rules_df.to_excel(writer, sheet_name='Detection Rules', index=False)
        
        # Sheet 4: Raw Data (filtered to findings only)
        if findings:
            row_indices = [f['Row Index'] for f in findings]
            raw_findings_df = df.iloc[row_indices].copy()
            raw_findings_df.to_excel(writer, sheet_name='Raw Data (Findings)', index=False)
        
        # Sheet 5: Full Raw Data (optional, for reference)
        # Only include if dataset is not too large
        if len(df) <= 10000:
            df.to_excel(writer, sheet_name='Full Raw Data', index=False)
        else:
            pd.DataFrame({
                'Message': [f'Full raw data ({len(df)} rows) too large for Excel. Refer to original CSV.']
            }).to_excel(writer, sheet_name='Full Raw Data', index=False)
    
    print(f"✅ Report generated successfully!")
    print(f"\n📋 Report Structure:")
    print(f"   - Executive Summary: High-level metrics")
    print(f"   - Shadow AI Findings: Detailed findings with explanations")
    print(f"   - Detection Rules: Reference guide for all rules")
    print(f"   - Raw Data (Findings): Original log entries for flagged items")
    print(f"   - Full Raw Data: Complete dataset (if <10K rows)")

# ============================================================================
# MAIN
# ============================================================================

def main():
    if len(sys.argv) != 3:
        print("Usage: python zscaler_shadow_ai_detector.py <input.csv> <output.xlsx>")
        print("\nExample:")
        print("  python zscaler_shadow_ai_detector.py zscaler_logs.csv shadow_ai_report.xlsx")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    print("=" * 70)
    print("🔍 Zscaler Shadow AI Detection Script")
    print("=" * 70)
    print()
    
    # Analyze logs
    df, findings = analyze_zscaler_logs(input_file)
    
    # Generate report
    generate_report(df, findings, output_file)
    
    print()
    print("=" * 70)
    print("✅ Analysis Complete!")
    print("=" * 70)
    print(f"\n📊 Summary:")
    print(f"   - Total entries analyzed: {len(df)}")
    print(f"   - Shadow AI instances found: {len(findings)}")
    print(f"   - CRITICAL: {len([f for f in findings if f['Risk Level'] == 'CRITICAL'])}")
    print(f"   - HIGH: {len([f for f in findings if f['Risk Level'] == 'HIGH'])}")
    print(f"   - MEDIUM: {len([f for f in findings if f['Risk Level'] == 'MEDIUM'])}")
    print(f"\n📄 Report saved to: {output_file}")
    print()

if __name__ == "__main__":
    main()
