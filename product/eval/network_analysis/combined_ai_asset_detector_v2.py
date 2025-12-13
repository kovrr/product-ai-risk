#!/usr/bin/env python3
"""
Combined DSPM + Zscaler AI Asset Detection v2
Enhanced with name normalization and unified asset list generation

Usage:
    python combined_ai_asset_detector_v2.py zscaler.csv dspm.csv output_report.xlsx
"""

import pandas as pd
import sys
from datetime import datetime
from collections import defaultdict
import re

# ============================================================================
# ASSET NAME NORMALIZATION
# ============================================================================

def normalize_asset_name(name):
    """Normalize asset names for matching across sources"""
    if not name or name == '0':
        return None
    
    # Convert to lowercase
    name_lower = str(name).lower().strip()
    
    # Normalization rules
    normalizations = {
        # OpenAI variations
        'chatgpt': 'ChatGPT',
        'chat gpt': 'ChatGPT',
        'openai': 'ChatGPT',
        'chat.openai.com': 'ChatGPT',
        'api.openai.com': 'ChatGPT',
        
        # Claude variations
        'claude': 'Anthropic Claude',
        'anthropic': 'Anthropic Claude',
        'claude.ai': 'Anthropic Claude',
        'anthropic.com': 'Anthropic Claude',
        
        # Microsoft Copilot variations
        'microsoft 365 copilot': 'Microsoft 365 Copilot',
        'microsoft copilot': 'Microsoft 365 Copilot',
        'copilot': 'Microsoft 365 Copilot',
        'm365 copilot': 'Microsoft 365 Copilot',
        
        # Perplexity
        'perplexity': 'Perplexity AI',
        'perplexity ai': 'Perplexity AI',
        
        # Doubao
        'doubao': 'Doubao',
        
        # Canva
        'canva': 'Canva AI',
        
        # Lovable
        'lovable': 'Lovable',
        'lovable.dev': 'Lovable',
        
        # Grammarly
        'grammarly': 'Grammarly',
        
        # Notion
        'notion': 'Notion AI',
        'notion ai': 'Notion AI',
    }
    
    # Check for exact matches first
    if name_lower in normalizations:
        return normalizations[name_lower]
    
    # Check for partial matches
    for pattern, normalized_name in normalizations.items():
        if pattern in name_lower:
            return normalized_name
    
    # Return original if no match (for unknown AI tools)
    return name.strip()

# ============================================================================
# AI ASSET CATALOG
# ============================================================================

AI_ASSET_CATALOG = {
    'ChatGPT': {
        'vendor': 'OpenAI',
        'category': 'Generative AI',
        'risk_level': 'CRITICAL',
        'asset_type': 'generative_ai_service',
        'approved': False
    },
    'Anthropic Claude': {
        'vendor': 'Anthropic',
        'category': 'Generative AI',
        'risk_level': 'CRITICAL',
        'asset_type': 'generative_ai_service',
        'approved': False
    },
    'Microsoft 365 Copilot': {
        'vendor': 'Microsoft',
        'category': 'Enterprise AI',
        'risk_level': 'MEDIUM',
        'asset_type': 'enterprise_ai',
        'approved': True
    },
    'Perplexity AI': {
        'vendor': 'Perplexity',
        'category': 'Search AI',
        'risk_level': 'HIGH',
        'asset_type': 'search_ai',
        'approved': False
    },
    'Doubao': {
        'vendor': 'ByteDance',
        'category': 'Generative AI',
        'risk_level': 'CRITICAL',
        'asset_type': 'generative_ai_service',
        'approved': False,
        'data_sovereignty_risk': True
    },
    'Canva AI': {
        'vendor': 'Canva',
        'category': 'Design AI',
        'risk_level': 'MEDIUM',
        'asset_type': 'design_ai',
        'approved': False
    },
    'Lovable': {
        'vendor': 'Lovable',
        'category': 'Code Generation AI',
        'risk_level': 'HIGH',
        'asset_type': 'code_generation_ai',
        'approved': False
    },
    'Grammarly': {
        'vendor': 'Grammarly',
        'category': 'Productivity AI',
        'risk_level': 'MEDIUM',
        'asset_type': 'productivity_ai',
        'approved': False
    },
    'Notion AI': {
        'vendor': 'Notion',
        'category': 'Productivity AI',
        'risk_level': 'MEDIUM',
        'asset_type': 'productivity_ai',
        'approved': False
    },
    'GitHub Copilot': {
        'vendor': 'GitHub/Microsoft',
        'category': 'Code Generation AI',
        'risk_level': 'HIGH',
        'asset_type': 'code_generation_ai',
        'approved': True  # Enterprise version
    },
    'Azure OpenAI': {
        'vendor': 'Microsoft',
        'category': 'Cloud AI Platform',
        'risk_level': 'CRITICAL',
        'asset_type': 'cloud_ai_platform',
        'approved': False
    },
    'Google Vertex AI': {
        'vendor': 'Google',
        'category': 'Cloud AI Platform',
        'risk_level': 'CRITICAL',
        'asset_type': 'cloud_ai_platform',
        'approved': False
    },
    'Midjourney': {
        'vendor': 'Midjourney',
        'category': 'Image Generation AI',
        'risk_level': 'HIGH',
        'asset_type': 'image_generation_ai',
        'approved': False
    },
    'Hugging Face': {
        'vendor': 'Hugging Face',
        'category': 'ML Platform',
        'risk_level': 'HIGH',
        'asset_type': 'ml_platform',
        'approved': False
    }
}

# ============================================================================
# SHADOW AI DETECTION RULES
# ============================================================================

SHADOW_AI_RULES = {
    'RULE_1_UNAPPROVED_APP': {
        'name': 'Unapproved AI Application',
        'description': 'AI application not in approved list',
        'severity': 'CRITICAL',
        'criteria': 'Asset detected AND NOT in approved list'
    },
    'RULE_2_HIGH_USAGE': {
        'name': 'High Usage Shadow AI',
        'description': 'Unapproved AI with >10 detections',
        'severity': 'CRITICAL',
        'criteria': 'Shadow AI AND detections > 10'
    },
    'RULE_3_MULTIPLE_USERS': {
        'name': 'Multi-User Shadow AI',
        'description': 'Unapproved AI used by >3 users',
        'severity': 'HIGH',
        'criteria': 'Shadow AI AND unique users > 3'
    },
    'RULE_4_SENSITIVE_DATA': {
        'name': 'Shadow AI with Data Exposure',
        'description': 'Unapproved AI processing sensitive data',
        'severity': 'CRITICAL',
        'criteria': 'Shadow AI AND sensitive data types > 0'
    },
    'RULE_5_FOREIGN_AI': {
        'name': 'Foreign AI Service',
        'description': 'AI service from foreign jurisdiction (data sovereignty risk)',
        'severity': 'CRITICAL',
        'criteria': 'Shadow AI AND data_sovereignty_risk = True'
    },
    'RULE_6_CROSS_VALIDATED': {
        'name': 'Cross-Validated Shadow AI',
        'description': 'Shadow AI detected in both Zscaler and DSPM',
        'severity': 'CRITICAL',
        'criteria': 'Shadow AI AND detected in both sources'
    }
}

# ============================================================================
# DATA PROCESSING
# ============================================================================

def process_zscaler_data(zscaler_file):
    """Process Zscaler logs and detect AI assets"""
    print(f"📂 Reading Zscaler logs: {zscaler_file}")
    
    try:
        df = pd.read_csv(zscaler_file, low_memory=False)
        print(f"✅ Loaded {len(df):,} Zscaler log entries")
    except Exception as e:
        print(f"❌ Error reading Zscaler file: {e}")
        return {}, []
    
    detections = defaultdict(list)
    raw_records = []
    
    for idx, row in df.iterrows():
        url = str(row.get('URL', '')).lower()
        policy_action = str(row.get('Policy Action', '')).strip()
        
        # Only process allowed traffic
        if policy_action != 'Allowed':
            continue
        
        # Try to identify AI service from URL
        normalized_name = None
        
        # Check URL patterns (comprehensive)
        if 'openai.com' in url or 'chatgpt' in url:
            normalized_name = 'ChatGPT'
        elif 'anthropic.com' in url or 'claude.ai' in url:
            normalized_name = 'Anthropic Claude'
        elif 'copilot.microsoft.com' in url or 'microsoft.com/copilot' in url:
            normalized_name = 'Microsoft 365 Copilot'
        elif 'githubcopilot.com' in url or 'copilot.github.com' in url:
            normalized_name = 'GitHub Copilot'
        elif 'perplexity.ai' in url:
            normalized_name = 'Perplexity AI'
        elif 'doubao.com' in url:
            normalized_name = 'Doubao'
        elif 'canva.com' in url:
            normalized_name = 'Canva AI'
        elif 'lovable.dev' in url:
            normalized_name = 'Lovable'
        elif 'grammarly.com' in url:
            normalized_name = 'Grammarly'
        elif 'notion.ai' in url or 'notion.so' in url:
            normalized_name = 'Notion AI'
        elif 'openai.azure.com' in url or 'azureml.net' in url:
            normalized_name = 'Azure OpenAI'
        elif 'aiplatform.googleapis.com' in url or 'ml.googleapis.com' in url:
            normalized_name = 'Google Vertex AI'
        elif 'midjourney.com' in url:
            normalized_name = 'Midjourney'
        elif 'huggingface.co' in url:
            normalized_name = 'Hugging Face'
        
        if normalized_name:
            record = {
                'source': 'Zscaler',
                'url': url,
                'timestamp': row.get('Event Time', ''),
                'user': row.get('Unique_ID', ''),
                'department': row.get('Department', ''),
                'location': row.get('Location', ''),
                'policy_action': policy_action
            }
            detections[normalized_name].append(record)
            raw_records.append({**record, 'asset_name': normalized_name})
    
    # Aggregate detections
    aggregated = {}
    for asset_name, records in detections.items():
        asset_info = AI_ASSET_CATALOG.get(asset_name, {
            'vendor': 'Unknown',
            'category': 'Unknown',
            'risk_level': 'HIGH',
            'asset_type': 'unknown',
            'approved': False
        })
        
        aggregated[asset_name] = {
            'asset_name': asset_name,
            'source': 'Zscaler',
            'zscaler_count': len(records),
            'zscaler_users': len(set(r['user'] for r in records if r['user'])),
            'zscaler_departments': len(set(r['department'] for r in records if r['department'])),
            'zscaler_records': records,
            **asset_info
        }
    
    print(f"🔍 Zscaler: Detected {len(aggregated)} unique AI assets")
    return aggregated, raw_records

def process_dspm_data(dspm_file):
    """Process DSPM logs and detect AI assets"""
    print(f"📂 Reading DSPM logs: {dspm_file}")
    
    try:
        df = pd.read_csv(dspm_file, encoding='utf-8-sig')
        print(f"✅ Loaded {len(df):,} DSPM log entries")
    except Exception as e:
        print(f"❌ Error reading DSPM file: {e}")
        return {}, []
    
    detections = defaultdict(list)
    raw_records = []
    
    for idx, row in df.iterrows():
        app_name = str(row.get('App accessed in', ''))
        
        # Skip empty or '0' values
        if not app_name or app_name == '0':
            continue
        
        # Normalize the app name
        normalized_name = normalize_asset_name(app_name)
        
        if normalized_name:
            sensitive_types = row.get('Sensitive info type', '0')
            if sensitive_types and sensitive_types != '0':
                sensitive_list = [s.strip() for s in str(sensitive_types).split(',')]
            else:
                sensitive_list = []
            
            record = {
                'source': 'DSPM',
                'app_name': app_name,
                'normalized_name': normalized_name,
                'timestamp': row.get('Timestamp (UTC)', ''),
                'user': row.get('UniqueID', ''),
                'activity_type': row.get('Activity type', ''),
                'ai_app_category': row.get('AI app category', ''),
                'sensitive_data': sensitive_list
            }
            detections[normalized_name].append(record)
            raw_records.append({**record, 'asset_name': normalized_name})
    
    # Aggregate detections
    aggregated = {}
    for asset_name, records in detections.items():
        asset_info = AI_ASSET_CATALOG.get(asset_name, {
            'vendor': 'Unknown',
            'category': 'Unknown',
            'risk_level': 'HIGH',
            'asset_type': 'unknown',
            'approved': False
        })
        
        # Collect all sensitive data types
        all_sensitive = set()
        for r in records:
            all_sensitive.update(r['sensitive_data'])
        
        aggregated[asset_name] = {
            'asset_name': asset_name,
            'source': 'DSPM',
            'dspm_count': len(records),
            'dspm_users': len(set(r['user'] for r in records if r['user'])),
            'sensitive_data_types': list(all_sensitive),
            'sensitive_data_count': len(all_sensitive),
            'dspm_records': records,
            **asset_info
        }
    
    print(f"🔍 DSPM: Detected {len(aggregated)} unique AI assets")
    return aggregated, raw_records

# ============================================================================
# ASSET CONSOLIDATION
# ============================================================================

def consolidate_assets(zscaler_assets, dspm_assets):
    """Consolidate assets from both sources into unified list"""
    
    print("\n🔬 Consolidating AI assets from both sources...")
    
    all_asset_names = set(zscaler_assets.keys()) | set(dspm_assets.keys())
    consolidated = []
    
    for asset_name in all_asset_names:
        z_data = zscaler_assets.get(asset_name, {})
        d_data = dspm_assets.get(asset_name, {})
        
        # Get asset info from catalog or use detected info
        asset_info = AI_ASSET_CATALOG.get(asset_name, {
            'vendor': 'Unknown',
            'category': 'Unknown',
            'risk_level': 'HIGH',
            'asset_type': 'unknown',
            'approved': False
        })
        
        # Build consolidated asset record
        asset_record = {
            'asset_name': asset_name,
            'vendor': asset_info['vendor'],
            'category': asset_info['category'],
            'asset_type': asset_info['asset_type'],
            'risk_level': asset_info['risk_level'],
            'approved': asset_info.get('approved', False),
            'data_sovereignty_risk': asset_info.get('data_sovereignty_risk', False),
            
            # Detection sources
            'detected_in_zscaler': bool(z_data),
            'detected_in_dspm': bool(d_data),
            'detection_confidence': 'CONFIRMED' if (z_data and d_data) else 'VERY HIGH' if d_data else 'HIGH',
            
            # Zscaler data
            'zscaler_detections': z_data.get('zscaler_count', 0),
            'zscaler_users': z_data.get('zscaler_users', 0),
            'zscaler_departments': z_data.get('zscaler_departments', 0),
            
            # DSPM data
            'dspm_detections': d_data.get('dspm_count', 0),
            'dspm_users': d_data.get('dspm_users', 0),
            'sensitive_data_types': d_data.get('sensitive_data_types', []),
            'sensitive_data_count': d_data.get('sensitive_data_count', 0),
            
            # Totals
            'total_detections': z_data.get('zscaler_count', 0) + d_data.get('dspm_count', 0),
            'total_unique_users': max(z_data.get('zscaler_users', 0), d_data.get('dspm_users', 0)),
        }
        
        consolidated.append(asset_record)
    
    print(f"✅ Consolidated {len(consolidated)} unique AI assets")
    return consolidated

# ============================================================================
# SHADOW AI DETECTION
# ============================================================================

def detect_shadow_ai(consolidated_assets):
    """Detect shadow AI and apply detection rules"""
    
    print("\n🚨 Detecting Shadow AI assets...")
    
    shadow_ai_list = []
    
    for asset in consolidated_assets:
        if asset['approved']:
            continue  # Skip approved assets
        
        # This is shadow AI - apply detection rules
        matched_rules = []
        
        # Rule 1: Unapproved AI Application
        matched_rules.append({
            'rule_id': 'RULE_1_UNAPPROVED_APP',
            'rule_name': SHADOW_AI_RULES['RULE_1_UNAPPROVED_APP']['name'],
            'severity': SHADOW_AI_RULES['RULE_1_UNAPPROVED_APP']['severity'],
            'description': SHADOW_AI_RULES['RULE_1_UNAPPROVED_APP']['description']
        })
        
        # Rule 2: High Usage
        if asset['total_detections'] > 10:
            matched_rules.append({
                'rule_id': 'RULE_2_HIGH_USAGE',
                'rule_name': SHADOW_AI_RULES['RULE_2_HIGH_USAGE']['name'],
                'severity': SHADOW_AI_RULES['RULE_2_HIGH_USAGE']['severity'],
                'description': f"High usage detected: {asset['total_detections']} detections"
            })
        
        # Rule 3: Multiple Users
        if asset['total_unique_users'] > 3:
            matched_rules.append({
                'rule_id': 'RULE_3_MULTIPLE_USERS',
                'rule_name': SHADOW_AI_RULES['RULE_3_MULTIPLE_USERS']['name'],
                'severity': SHADOW_AI_RULES['RULE_3_MULTIPLE_USERS']['severity'],
                'description': f"Multiple users detected: {asset['total_unique_users']} users"
            })
        
        # Rule 4: Sensitive Data Exposure
        if asset['sensitive_data_count'] > 0:
            matched_rules.append({
                'rule_id': 'RULE_4_SENSITIVE_DATA',
                'rule_name': SHADOW_AI_RULES['RULE_4_SENSITIVE_DATA']['name'],
                'severity': SHADOW_AI_RULES['RULE_4_SENSITIVE_DATA']['severity'],
                'description': f"Sensitive data exposure: {asset['sensitive_data_count']} data types"
            })
        
        # Rule 5: Foreign AI
        if asset.get('data_sovereignty_risk'):
            matched_rules.append({
                'rule_id': 'RULE_5_FOREIGN_AI',
                'rule_name': SHADOW_AI_RULES['RULE_5_FOREIGN_AI']['name'],
                'severity': SHADOW_AI_RULES['RULE_5_FOREIGN_AI']['severity'],
                'description': 'Foreign AI service - data sovereignty risk'
            })
        
        # Rule 6: Cross-Validated
        if asset['detected_in_zscaler'] and asset['detected_in_dspm']:
            matched_rules.append({
                'rule_id': 'RULE_6_CROSS_VALIDATED',
                'rule_name': SHADOW_AI_RULES['RULE_6_CROSS_VALIDATED']['name'],
                'severity': SHADOW_AI_RULES['RULE_6_CROSS_VALIDATED']['severity'],
                'description': 'Cross-validated in both Zscaler and DSPM'
            })
        
        # Add to shadow AI list
        shadow_ai_record = {
            **asset,
            'matched_rules': matched_rules,
            'matched_rules_count': len(matched_rules),
            'highest_severity': 'CRITICAL' if any(r['severity'] == 'CRITICAL' for r in matched_rules) else 'HIGH'
        }
        
        shadow_ai_list.append(shadow_ai_record)
    
    print(f"🚨 Detected {len(shadow_ai_list)} Shadow AI assets")
    return shadow_ai_list

# ============================================================================
# REPORTING
# ============================================================================

def generate_report(consolidated_assets, shadow_ai_list, zscaler_raw, dspm_raw, output_file):
    """Generate comprehensive Excel report"""
    
    print(f"\n📊 Generating report: {output_file}")
    
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        
        # Sheet 1: Executive Summary
        summary_data = {
            'Metric': [
                'Total AI Assets Detected',
                'Approved AI Assets',
                'Shadow AI Assets',
                'Cross-Validated Assets (Both Sources)',
                'Zscaler-Only Detections',
                'DSPM-Only Detections',
                'CRITICAL Risk Shadow AI',
                'HIGH Risk Shadow AI',
                'MEDIUM Risk Shadow AI',
                'Assets with Sensitive Data Exposure',
                'Assets with Data Sovereignty Risk',
                'Total Detections (All Sources)',
                'Analysis Date'
            ],
            'Value': [
                len(consolidated_assets),
                len([a for a in consolidated_assets if a['approved']]),
                len(shadow_ai_list),
                len([a for a in consolidated_assets if a['detected_in_zscaler'] and a['detected_in_dspm']]),
                len([a for a in consolidated_assets if a['detected_in_zscaler'] and not a['detected_in_dspm']]),
                len([a for a in consolidated_assets if a['detected_in_dspm'] and not a['detected_in_zscaler']]),
                len([a for a in shadow_ai_list if a['risk_level'] == 'CRITICAL']),
                len([a for a in shadow_ai_list if a['risk_level'] == 'HIGH']),
                len([a for a in shadow_ai_list if a['risk_level'] == 'MEDIUM']),
                len([a for a in consolidated_assets if a['sensitive_data_count'] > 0]),
                len([a for a in consolidated_assets if a.get('data_sovereignty_risk')]),
                sum(a['total_detections'] for a in consolidated_assets),
                datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            ]
        }
        pd.DataFrame(summary_data).to_excel(writer, sheet_name='Executive Summary', index=False)
        
        # Sheet 2: All AI Assets (Unified List)
        assets_df = pd.DataFrame(consolidated_assets)
        # Reorder columns for clarity
        column_order = [
            'asset_name', 'vendor', 'category', 'asset_type', 'risk_level', 'approved',
            'detection_confidence', 'detected_in_zscaler', 'detected_in_dspm',
            'total_detections', 'total_unique_users',
            'zscaler_detections', 'zscaler_users', 'zscaler_departments',
            'dspm_detections', 'dspm_users', 'sensitive_data_count',
            'data_sovereignty_risk'
        ]
        assets_df = assets_df[[col for col in column_order if col in assets_df.columns]]
        assets_df = assets_df.sort_values('total_detections', ascending=False)
        assets_df.to_excel(writer, sheet_name='All AI Assets', index=False)
        
        # Sheet 3: Shadow AI Assets with Rules
        if shadow_ai_list:
            # Flatten matched rules for Excel
            shadow_records = []
            for asset in shadow_ai_list:
                base_record = {k: v for k, v in asset.items() if k not in ['matched_rules', 'sensitive_data_types']}
                base_record['sensitive_data_types'] = ', '.join(asset.get('sensitive_data_types', []))
                base_record['matched_rules_list'] = ' | '.join([r['rule_name'] for r in asset['matched_rules']])
                shadow_records.append(base_record)
            
            shadow_df = pd.DataFrame(shadow_records)
            column_order = [
                'asset_name', 'vendor', 'category', 'risk_level', 'highest_severity',
                'matched_rules_count', 'matched_rules_list',
                'total_detections', 'total_unique_users',
                'zscaler_detections', 'dspm_detections',
                'sensitive_data_count', 'sensitive_data_types',
                'detection_confidence', 'data_sovereignty_risk'
            ]
            shadow_df = shadow_df[[col for col in column_order if col in shadow_df.columns]]
            shadow_df = shadow_df.sort_values(['highest_severity', 'total_detections'], ascending=[True, False])
            shadow_df.to_excel(writer, sheet_name='Shadow AI with Rules', index=False)
        
        # Sheet 4: Shadow AI Rules Reference
        rules_data = []
        for rule_id, rule_info in SHADOW_AI_RULES.items():
            rules_data.append({
                'Rule ID': rule_id,
                'Rule Name': rule_info['name'],
                'Severity': rule_info['severity'],
                'Description': rule_info['description'],
                'Criteria': rule_info['criteria']
            })
        pd.DataFrame(rules_data).to_excel(writer, sheet_name='Shadow AI Rules', index=False)
        
        # Sheet 5: Zscaler Raw Data
        if zscaler_raw:
            zscaler_df = pd.DataFrame(zscaler_raw)
            zscaler_df.to_excel(writer, sheet_name='Zscaler Raw Data', index=False)
        
        # Sheet 6: DSPM Raw Data
        if dspm_raw:
            dspm_df = pd.DataFrame(dspm_raw)
            # Flatten sensitive_data list
            dspm_df['sensitive_data'] = dspm_df['sensitive_data'].apply(lambda x: ', '.join(x) if x else '')
            dspm_df.to_excel(writer, sheet_name='DSPM Raw Data', index=False)
        
        # Sheet 7: Sensitive Data Exposure Details
        sensitive_assets = [a for a in consolidated_assets if a['sensitive_data_count'] > 0]
        if sensitive_assets:
            sensitive_records = []
            for asset in sensitive_assets:
                for data_type in asset['sensitive_data_types']:
                    sensitive_records.append({
                        'Asset Name': asset['asset_name'],
                        'Vendor': asset['vendor'],
                        'Risk Level': asset['risk_level'],
                        'Approved': asset['approved'],
                        'Sensitive Data Type': data_type,
                        'Total Detections': asset['total_detections']
                    })
            pd.DataFrame(sensitive_records).to_excel(writer, sheet_name='Sensitive Data Exposure', index=False)
    
    print(f"✅ Report generated successfully!")

def print_summary(consolidated_assets, shadow_ai_list):
    """Print summary to console"""
    
    print("\n" + "=" * 80)
    print("📊 COMBINED AI ASSET DETECTION SUMMARY")
    print("=" * 80)
    print()
    
    print(f"Total AI Assets Detected: {len(consolidated_assets)}")
    print(f"  ✅ Approved: {len([a for a in consolidated_assets if a['approved']])}")
    print(f"  ❌ Shadow AI: {len(shadow_ai_list)}")
    print()
    
    cross_validated = [a for a in consolidated_assets if a['detected_in_zscaler'] and a['detected_in_dspm']]
    print(f"Detection Sources:")
    print(f"  🎯 Cross-Validated (Both): {len(cross_validated)}")
    print(f"  📡 Zscaler Only: {len([a for a in consolidated_assets if a['detected_in_zscaler'] and not a['detected_in_dspm']])}")
    print(f"  🔍 DSPM Only: {len([a for a in consolidated_assets if a['detected_in_dspm'] and not a['detected_in_zscaler']])}")
    print()
    
    if shadow_ai_list:
        critical = [a for a in shadow_ai_list if a['risk_level'] == 'CRITICAL']
        if critical:
            print(f"🚨 CRITICAL SHADOW AI ASSETS ({len(critical)}):")
            print("─" * 80)
            for asset in sorted(critical, key=lambda x: x['total_detections'], reverse=True):
                print(f"  {asset['asset_name']:<30} Detections: {asset['total_detections']:>5}  Rules Matched: {asset['matched_rules_count']}")
    
    print()
    print("=" * 80)

# ============================================================================
# MAIN
# ============================================================================

def main():
    if len(sys.argv) != 4:
        print("Usage: python combined_ai_asset_detector_v2.py <zscaler.csv> <dspm.csv> <output.xlsx>")
        sys.exit(1)
    
    zscaler_file = sys.argv[1]
    dspm_file = sys.argv[2]
    output_file = sys.argv[3]
    
    print("=" * 80)
    print("🔍 Combined AI Asset Detection v2 (Enhanced)")
    print("=" * 80)
    print()
    
    # Process both data sources
    zscaler_assets, zscaler_raw = process_zscaler_data(zscaler_file)
    dspm_assets, dspm_raw = process_dspm_data(dspm_file)
    
    # Consolidate into unified asset list
    consolidated_assets = consolidate_assets(zscaler_assets, dspm_assets)
    
    # Detect shadow AI and apply rules
    shadow_ai_list = detect_shadow_ai(consolidated_assets)
    
    # Generate report
    generate_report(consolidated_assets, shadow_ai_list, zscaler_raw, dspm_raw, output_file)
    
    # Print summary
    print_summary(consolidated_assets, shadow_ai_list)
    
    print()
    print("=" * 80)
    print("✅ Analysis Complete!")
    print("=" * 80)
    print(f"\n📄 Report saved to: {output_file}")
    print()

if __name__ == "__main__":
    main()
