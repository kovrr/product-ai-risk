#!/usr/bin/env python3
"""
Embedded AI Detection Script
Detects hidden AI features within regular enterprise applications
"""

import pandas as pd
import sys
from datetime import datetime

# ============================================================================
# EMBEDDED AI CATALOG
# ============================================================================

EMBEDDED_AI_CATALOG = {
    'Microsoft 365 Copilot': {
        'parent_app': 'Microsoft 365',
        'category': 'Enterprise AI Assistant',
        'risk_level': 'HIGH',
        'url_patterns': [
            'copilot.microsoft.com',
            'api.copilot.microsoft.com',
            'copilot.cloud.microsoft',
            'substrate.office.com/copilot',
            'copilot.office.com'
        ],
        'cloud_app_matches': ['Common Office 365 Applications', 'Microsoft 365'],
        'description': 'AI assistant in Word, Excel, PowerPoint, Outlook'
    },
    'Microsoft Teams Copilot': {
        'parent_app': 'Microsoft Teams',
        'category': 'Meeting AI',
        'risk_level': 'HIGH',
        'url_patterns': [
            'teams.microsoft.com/api/copilot',
            'teams.microsoft.com/ai',
            'api.teams.microsoft.com/copilot'
        ],
        'cloud_app_matches': ['Microsoft Teams'],
        'description': 'Meeting summaries, chat suggestions, transcription'
    },
    'GitHub Copilot': {
        'parent_app': 'GitHub',
        'category': 'Code Generation AI',
        'risk_level': 'HIGH',
        'url_patterns': [
            'githubcopilot.com',
            'copilot.github.com',
            'api.githubcopilot.com',
            'telemetry.githubcopilot.com'
        ],
        'cloud_app_matches': ['GitHub'],
        'description': 'AI-powered code completion and generation'
    },
    'Google Duet AI': {
        'parent_app': 'Google Workspace',
        'category': 'Workspace AI Assistant',
        'risk_level': 'HIGH',
        'url_patterns': [
            'duet.google.com',
            'workspace.google.com/duet',
            'mail.google.com/mail/duet',
            'docs.google.com/duet'
        ],
        'cloud_app_matches': ['Google Workspace', 'Gmail', 'Google Docs'],
        'description': 'AI assistant in Gmail, Docs, Sheets'
    },
    'Google Gemini': {
        'parent_app': 'Google',
        'category': 'Generative AI',
        'risk_level': 'CRITICAL',
        'url_patterns': [
            'gemini.google.com',
            'bard.google.com',
            'ai.google.dev'
        ],
        'cloud_app_matches': ['Google Search', 'Google'],
        'description': 'Google\'s generative AI chatbot'
    },
    'Adobe Firefly': {
        'parent_app': 'Adobe Creative Cloud',
        'category': 'Image Generation AI',
        'risk_level': 'HIGH',
        'url_patterns': [
            'firefly.adobe.com',
            'firefly-api.adobe.io',
            'cc-api.adobe.io/firefly'
        ],
        'cloud_app_matches': ['Adobe Creative Cloud'],
        'description': 'Generative AI for images (text-to-image, generative fill)'
    },
    'Salesforce Einstein': {
        'parent_app': 'Salesforce',
        'category': 'CRM AI',
        'risk_level': 'HIGH',
        'url_patterns': [
            'einstein.salesforce.com',
            'api.salesforce.com/einstein',
            'einstein-ai.salesforce.com'
        ],
        'cloud_app_matches': ['Salesforce'],
        'description': 'Predictive analytics and AI insights for CRM'
    },
    'Zoom AI Companion': {
        'parent_app': 'Zoom',
        'category': 'Meeting AI',
        'risk_level': 'MEDIUM',
        'url_patterns': [
            'zoom.us/ai',
            'api.zoom.us/v2/ai',
            'zoom.us/companion'
        ],
        'cloud_app_matches': ['Zoom'],
        'description': 'Meeting summaries, action items, transcription'
    },
    'Slack AI': {
        'parent_app': 'Slack',
        'category': 'Collaboration AI',
        'risk_level': 'MEDIUM',
        'url_patterns': [
            'slack.com/api/ai',
            'edgeapi.slack.com/ai',
            'slack.com/ai'
        ],
        'cloud_app_matches': ['Slack'],
        'description': 'Search, summaries, thread recaps'
    },
    'Notion AI': {
        'parent_app': 'Notion',
        'category': 'Productivity AI',
        'risk_level': 'MEDIUM',
        'url_patterns': [
            'notion.so/api/ai',
            'api.notion.com/ai',
            'notion.ai'
        ],
        'cloud_app_matches': ['Notion'],
        'description': 'Writing assistance, summarization'
    },
    'Grammarly AI': {
        'parent_app': 'Grammarly',
        'category': 'Writing AI',
        'risk_level': 'MEDIUM',
        'url_patterns': [
            'grammarly.com',
            'api.grammarly.com'
        ],
        'cloud_app_matches': ['Grammarly'],
        'description': 'AI writing assistant (GrammarlyGO)'
    }
}

# ============================================================================
# DETECTION FUNCTIONS
# ============================================================================

def detect_embedded_ai(zscaler_file):
    """Detect embedded AI features in Zscaler logs"""
    
    print("=" * 80)
    print("🔍 EMBEDDED AI DETECTION")
    print("=" * 80)
    print()
    
    # Read Zscaler logs
    print(f"📂 Reading Zscaler logs: {zscaler_file}")
    df = pd.read_csv(zscaler_file, low_memory=False)
    print(f"✅ Loaded {len(df):,} log entries")
    print()
    
    # Filter only allowed traffic
    allowed_df = df[df['Policy Action'] == 'Allowed'].copy()
    print(f"📊 Analyzing {len(allowed_df):,} allowed traffic records")
    print()
    
    # Detect embedded AI
    detections = {}
    raw_records = []
    
    for idx, row in allowed_df.iterrows():
        url = str(row.get('URL', '')).lower()
        cloud_app = str(row.get('Cloud Application', ''))
        
        # Check each embedded AI pattern
        for ai_name, ai_info in EMBEDDED_AI_CATALOG.items():
            matched = False
            
            # Check URL patterns
            for pattern in ai_info['url_patterns']:
                if pattern.lower() in url:
                    matched = True
                    break
            
            # If matched, record detection
            if matched:
                if ai_name not in detections:
                    detections[ai_name] = {
                        'ai_name': ai_name,
                        'parent_app': ai_info['parent_app'],
                        'category': ai_info['category'],
                        'risk_level': ai_info['risk_level'],
                        'description': ai_info['description'],
                        'detections': 0,
                        'users': set(),
                        'departments': set(),
                        'urls': set()
                    }
                
                detections[ai_name]['detections'] += 1
                detections[ai_name]['users'].add(row.get('Unique_ID', ''))
                detections[ai_name]['departments'].add(row.get('Department', ''))
                detections[ai_name]['urls'].add(url[:100])
                
                # Store raw record
                raw_records.append({
                    'ai_name': ai_name,
                    'parent_app': ai_info['parent_app'],
                    'url': url,
                    'cloud_app': cloud_app,
                    'user': row.get('Unique_ID', ''),
                    'department': row.get('Department', ''),
                    'location': row.get('Location', '')
                })
    
    # Convert sets to counts
    for ai_name in detections:
        detections[ai_name]['unique_users'] = len([u for u in detections[ai_name]['users'] if u])
        detections[ai_name]['unique_departments'] = len([d for d in detections[ai_name]['departments'] if d])
        detections[ai_name]['unique_urls'] = len(detections[ai_name]['urls'])
        del detections[ai_name]['users']
        del detections[ai_name]['departments']
        del detections[ai_name]['urls']
    
    print(f"🎯 Detected {len(detections)} embedded AI features")
    print()
    
    return list(detections.values()), raw_records

def generate_report(detections, raw_records, output_file):
    """Generate Excel report"""
    
    print(f"📊 Generating report: {output_file}")
    
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        
        # Sheet 1: Summary
        summary_data = {
            'Metric': [
                'Total Embedded AI Detected',
                'HIGH Risk',
                'MEDIUM Risk',
                'CRITICAL Risk',
                'Total Detections',
                'Total Users'
            ],
            'Value': [
                len(detections),
                len([d for d in detections if d['risk_level'] == 'HIGH']),
                len([d for d in detections if d['risk_level'] == 'MEDIUM']),
                len([d for d in detections if d['risk_level'] == 'CRITICAL']),
                sum(d['detections'] for d in detections),
                sum(d['unique_users'] for d in detections)
            ]
        }
        summary_df = pd.DataFrame(summary_data)
        summary_df.to_excel(writer, sheet_name='Summary', index=False)
        
        # Sheet 2: Embedded AI Detections
        if detections:
            detections_df = pd.DataFrame(detections)
            detections_df = detections_df.sort_values('detections', ascending=False)
            detections_df.to_excel(writer, sheet_name='Embedded AI Detected', index=False)
        
        # Sheet 3: Raw Data
        if raw_records:
            raw_df = pd.DataFrame(raw_records)
            raw_df.to_excel(writer, sheet_name='Raw Detections', index=False)
    
    print(f"✅ Report generated successfully!")
    print()

def print_summary(detections):
    """Print console summary"""
    
    print("=" * 80)
    print("📊 EMBEDDED AI DETECTION SUMMARY")
    print("=" * 80)
    print()
    
    if not detections:
        print("❌ No embedded AI features detected in allowed traffic")
        print()
        print("Possible reasons:")
        print("  - No embedded AI usage during this time period")
        print("  - AI features accessed via different URLs")
        print("  - Need longer log sample for detection")
        return
    
    print(f"Total Embedded AI Features Detected: {len(detections)}")
    print()
    
    # Group by risk level
    critical = [d for d in detections if d['risk_level'] == 'CRITICAL']
    high = [d for d in detections if d['risk_level'] == 'HIGH']
    medium = [d for d in detections if d['risk_level'] == 'MEDIUM']
    
    if critical:
        print(f"🚨 CRITICAL RISK ({len(critical)}):")
        print("─" * 80)
        for d in critical:
            print(f"  {d['ai_name']:<30} {d['detections']:>6} detections, {d['unique_users']:>3} users")
        print()
    
    if high:
        print(f"⚠️  HIGH RISK ({len(high)}):")
        print("─" * 80)
        for d in high:
            print(f"  {d['ai_name']:<30} {d['detections']:>6} detections, {d['unique_users']:>3} users")
        print()
    
    if medium:
        print(f"ℹ️  MEDIUM RISK ({len(medium)}):")
        print("─" * 80)
        for d in medium:
            print(f"  {d['ai_name']:<30} {d['detections']:>6} detections, {d['unique_users']:>3} users")
        print()
    
    print("=" * 80)

# ============================================================================
# MAIN
# ============================================================================

def main():
    if len(sys.argv) != 3:
        print("Usage: python3 detect_embedded_ai.py <zscaler_csv> <output_xlsx>")
        sys.exit(1)
    
    zscaler_file = sys.argv[1]
    output_file = sys.argv[2]
    
    # Detect embedded AI
    detections, raw_records = detect_embedded_ai(zscaler_file)
    
    # Generate report
    generate_report(detections, raw_records, output_file)
    
    # Print summary
    print_summary(detections)
    
    print("=" * 80)
    print("✅ Analysis Complete!")
    print("=" * 80)
    print()
    print(f"📄 Report saved to: {output_file}")
    print()

if __name__ == '__main__':
    main()
