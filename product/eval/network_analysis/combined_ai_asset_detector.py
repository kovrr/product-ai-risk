#!/usr/bin/env python3
"""
Combined DSPM + Zscaler AI Asset Detection
Identifies and validates AI assets using cross-validation from multiple sources

Usage:
    python combined_ai_asset_detector.py zscaler.csv dspm.csv output_report.xlsx
"""

import pandas as pd
import sys
from datetime import datetime
from collections import defaultdict
import re

# ============================================================================
# AI ASSET CATALOG (Ground Truth)
# ============================================================================

AI_ASSET_CATALOG = {
    'ChatGPT': {
        'vendor': 'OpenAI',
        'category': 'Generative AI',
        'zscaler_patterns': ['openai.com', 'chat.openai.com', 'api.openai.com'],
        'dspm_names': ['ChatGPT', 'OpenAI'],
        'risk_level': 'CRITICAL',
        'asset_type': 'generative_ai_service'
    },
    'Anthropic Claude': {
        'vendor': 'Anthropic',
        'category': 'Generative AI',
        'zscaler_patterns': ['anthropic.com', 'claude.ai'],
        'dspm_names': ['Anthropic Claude', 'Anthropic.com'],
        'risk_level': 'CRITICAL',
        'asset_type': 'generative_ai_service'
    },
    'Microsoft 365 Copilot': {
        'vendor': 'Microsoft',
        'category': 'Enterprise AI',
        'zscaler_patterns': ['copilot.microsoft.com', 'microsoft.com/copilot'],
        'dspm_names': ['Microsoft 365 Copilot Chat', 'Microsoft Copilot'],
        'risk_level': 'MEDIUM',
        'asset_type': 'enterprise_ai',
        'approved': True
    },
    'Perplexity AI': {
        'vendor': 'Perplexity',
        'category': 'Search AI',
        'zscaler_patterns': ['perplexity.ai'],
        'dspm_names': ['Perplexity AI'],
        'risk_level': 'HIGH',
        'asset_type': 'search_ai'
    },
    'Azure OpenAI': {
        'vendor': 'Microsoft',
        'category': 'Cloud AI Platform',
        'zscaler_patterns': ['openai.azure.com', 'azureml.net'],
        'dspm_names': [],  # Not typically in DSPM
        'risk_level': 'CRITICAL',
        'asset_type': 'cloud_ai_platform'
    },
    'Google Vertex AI': {
        'vendor': 'Google',
        'category': 'Cloud AI Platform',
        'zscaler_patterns': ['aiplatform.googleapis.com', 'ml.googleapis.com'],
        'dspm_names': [],
        'risk_level': 'CRITICAL',
        'asset_type': 'cloud_ai_platform'
    },
    'Midjourney': {
        'vendor': 'Midjourney',
        'category': 'Image Generation AI',
        'zscaler_patterns': ['midjourney.com'],
        'dspm_names': ['Midjourney'],
        'risk_level': 'HIGH',
        'asset_type': 'image_generation_ai'
    },
    'Grammarly': {
        'vendor': 'Grammarly',
        'category': 'Productivity AI',
        'zscaler_patterns': ['grammarly.com'],
        'dspm_names': ['Grammarly'],
        'risk_level': 'MEDIUM',
        'asset_type': 'productivity_ai'
    },
    'Notion AI': {
        'vendor': 'Notion',
        'category': 'Productivity AI',
        'zscaler_patterns': ['notion.ai', 'notion.so'],
        'dspm_names': ['Notion'],
        'risk_level': 'MEDIUM',
        'asset_type': 'productivity_ai'
    },
    'GitHub Copilot': {
        'vendor': 'GitHub/Microsoft',
        'category': 'Code Generation AI',
        'zscaler_patterns': ['copilot.github.com', 'github.com/copilot'],
        'dspm_names': ['GitHub Copilot'],
        'risk_level': 'HIGH',
        'asset_type': 'code_generation_ai'
    },
    'Doubao': {
        'vendor': 'ByteDance',
        'category': 'Generative AI',
        'zscaler_patterns': ['doubao.com'],
        'dspm_names': ['Doubao'],
        'risk_level': 'CRITICAL',
        'asset_type': 'generative_ai_service',
        'data_sovereignty_risk': True
    },
    'Canva AI': {
        'vendor': 'Canva',
        'category': 'Design AI',
        'zscaler_patterns': ['canva.com'],
        'dspm_names': ['canva.com'],
        'risk_level': 'MEDIUM',
        'asset_type': 'design_ai'
    },
    'Lovable': {
        'vendor': 'Lovable',
        'category': 'Code Generation AI',
        'zscaler_patterns': ['lovable.dev'],
        'dspm_names': ['Lovable', 'Lovable.dev'],
        'risk_level': 'HIGH',
        'asset_type': 'code_generation_ai'
    }
}

# ============================================================================
# MATCHING RULES
# ============================================================================

class MatchingRules:
    """Rules for identifying and validating AI assets"""
    
    @staticmethod
    def match_zscaler_to_asset(url):
        """Match Zscaler URL to known AI asset"""
        url_lower = url.lower()
        matches = []
        
        for asset_name, asset_info in AI_ASSET_CATALOG.items():
            for pattern in asset_info['zscaler_patterns']:
                if pattern in url_lower:
                    matches.append({
                        'asset_name': asset_name,
                        'confidence': 'HIGH',
                        'source': 'Zscaler',
                        'matched_pattern': pattern,
                        **asset_info
                    })
        
        return matches
    
    @staticmethod
    def match_dspm_to_asset(app_name):
        """Match DSPM app name to known AI asset"""
        matches = []
        
        for asset_name, asset_info in AI_ASSET_CATALOG.items():
            for dspm_name in asset_info['dspm_names']:
                if dspm_name.lower() in app_name.lower():
                    matches.append({
                        'asset_name': asset_name,
                        'confidence': 'VERY HIGH',
                        'source': 'DSPM',
                        'matched_pattern': dspm_name,
                        **asset_info
                    })
        
        return matches
    
    @staticmethod
    def cross_validate(zscaler_matches, dspm_matches):
        """Cross-validate detections from both sources"""
        validated = []
        
        # Find assets detected in BOTH sources
        zscaler_assets = {m['asset_name'] for m in zscaler_matches}
        dspm_assets = {m['asset_name'] for m in dspm_matches}
        
        confirmed = zscaler_assets & dspm_assets
        
        for asset_name in confirmed:
            z_match = next(m for m in zscaler_matches if m['asset_name'] == asset_name)
            d_match = next(m for m in dspm_matches if m['asset_name'] == asset_name)
            
            validated.append({
                'asset_name': asset_name,
                'confidence': 'CONFIRMED',
                'validation': 'Cross-validated (Zscaler + DSPM)',
                'zscaler_detections': z_match.get('count', 0),
                'dspm_detections': d_match.get('count', 0),
                **z_match
            })
        
        return validated

# ============================================================================
# DATA PROCESSING
# ============================================================================

def process_zscaler_data(zscaler_file):
    """Process Zscaler logs and detect AI assets"""
    print(f"📂 Reading Zscaler logs: {zscaler_file}")
    
    try:
        df = pd.read_csv(zscaler_file)
        print(f"✅ Loaded {len(df)} Zscaler log entries")
    except Exception as e:
        print(f"❌ Error reading Zscaler file: {e}")
        return {}
    
    detections = defaultdict(list)
    
    for idx, row in df.iterrows():
        url = str(row.get('URL', '')).lower()
        policy_action = str(row.get('Policy Action', '')).strip()
        
        # Only process allowed traffic
        if policy_action != 'Allowed':
            continue
        
        matches = MatchingRules.match_zscaler_to_asset(url)
        
        for match in matches:
            detections[match['asset_name']].append({
                'url': url,
                'timestamp': row.get('Event Time', ''),
                'user': row.get('Unique_ID', ''),
                'department': row.get('Department', ''),
                'location': row.get('Location', ''),
                'matched_pattern': match['matched_pattern']
            })
    
    # Aggregate detections
    aggregated = {}
    for asset_name, records in detections.items():
        asset_info = AI_ASSET_CATALOG[asset_name]
        aggregated[asset_name] = {
            'asset_name': asset_name,
            'source': 'Zscaler',
            'count': len(records),
            'unique_users': len(set(r['user'] for r in records)),
            'unique_departments': len(set(r['department'] for r in records if r['department'])),
            'first_seen': min(r['timestamp'] for r in records),
            'last_seen': max(r['timestamp'] for r in records),
            'records': records,
            **asset_info
        }
    
    print(f"🔍 Zscaler: Detected {len(aggregated)} unique AI assets")
    return aggregated

def process_dspm_data(dspm_file):
    """Process DSPM logs and detect AI assets"""
    print(f"📂 Reading DSPM logs: {dspm_file}")
    
    try:
        df = pd.read_csv(dspm_file, encoding='utf-8-sig')
        print(f"✅ Loaded {len(df)} DSPM log entries")
    except Exception as e:
        print(f"❌ Error reading DSPM file: {e}")
        return {}
    
    detections = defaultdict(list)
    
    for idx, row in df.iterrows():
        app_name = str(row.get('App accessed in', ''))
        
        # Skip empty or '0' values
        if not app_name or app_name == '0':
            continue
        
        matches = MatchingRules.match_dspm_to_asset(app_name)
        
        for match in matches:
            sensitive_types = row.get('Sensitive info type', '0')
            if sensitive_types and sensitive_types != '0':
                sensitive_list = [s.strip() for s in str(sensitive_types).split(',')]
            else:
                sensitive_list = []
            
            detections[match['asset_name']].append({
                'app_name': app_name,
                'timestamp': row.get('Timestamp (UTC)', ''),
                'user': row.get('UniqueID', ''),
                'activity_type': row.get('Activity type', ''),
                'sensitive_data': sensitive_list,
                'matched_pattern': match['matched_pattern']
            })
    
    # Aggregate detections
    aggregated = {}
    for asset_name, records in detections.items():
        asset_info = AI_ASSET_CATALOG[asset_name]
        
        # Collect all sensitive data types
        all_sensitive = set()
        for r in records:
            all_sensitive.update(r['sensitive_data'])
        
        aggregated[asset_name] = {
            'asset_name': asset_name,
            'source': 'DSPM',
            'count': len(records),
            'unique_users': len(set(r['user'] for r in records)),
            'first_seen': min(r['timestamp'] for r in records),
            'last_seen': max(r['timestamp'] for r in records),
            'sensitive_data_types': list(all_sensitive),
            'sensitive_data_count': len(all_sensitive),
            'records': records,
            **asset_info
        }
    
    print(f"🔍 DSPM: Detected {len(aggregated)} unique AI assets")
    return aggregated

# ============================================================================
# VALIDATION & CLASSIFICATION
# ============================================================================

def validate_and_classify_assets(zscaler_assets, dspm_assets):
    """Validate and classify AI assets with confidence levels"""
    
    print("\n🔬 Cross-validating detections...")
    
    results = {
        'confirmed': [],      # Detected in BOTH sources
        'zscaler_only': [],   # Only in Zscaler (high confidence)
        'dspm_only': [],      # Only in DSPM (very high confidence)
        'approved': [],       # Approved AI assets
        'shadow_ai': []       # Unapproved AI assets
    }
    
    all_assets = set(zscaler_assets.keys()) | set(dspm_assets.keys())
    
    for asset_name in all_assets:
        z_data = zscaler_assets.get(asset_name)
        d_data = dspm_assets.get(asset_name)
        
        asset_info = AI_ASSET_CATALOG[asset_name]
        
        # Build consolidated asset record
        asset_record = {
            'asset_name': asset_name,
            'vendor': asset_info['vendor'],
            'category': asset_info['category'],
            'asset_type': asset_info['asset_type'],
            'risk_level': asset_info['risk_level'],
            'approved': asset_info.get('approved', False),
            'data_sovereignty_risk': asset_info.get('data_sovereignty_risk', False)
        }
        
        # Cross-validation
        if z_data and d_data:
            # CONFIRMED: Detected in both sources
            asset_record.update({
                'confidence': 'CONFIRMED',
                'validation': 'Cross-validated (Zscaler + DSPM)',
                'zscaler_count': z_data['count'],
                'zscaler_users': z_data['unique_users'],
                'dspm_count': d_data['count'],
                'dspm_users': d_data['unique_users'],
                'sensitive_data_types': d_data.get('sensitive_data_types', []),
                'total_detections': z_data['count'] + d_data['count'],
                'first_seen': min(z_data['first_seen'], d_data['first_seen']),
                'last_seen': max(z_data['last_seen'], d_data['last_seen'])
            })
            results['confirmed'].append(asset_record)
            
        elif z_data:
            # Zscaler only (still high confidence)
            asset_record.update({
                'confidence': 'HIGH',
                'validation': 'Zscaler network traffic',
                'zscaler_count': z_data['count'],
                'zscaler_users': z_data['unique_users'],
                'zscaler_departments': z_data['unique_departments'],
                'dspm_count': 0,
                'sensitive_data_types': ['Unknown - No DSPM tracking'],
                'total_detections': z_data['count'],
                'first_seen': z_data['first_seen'],
                'last_seen': z_data['last_seen']
            })
            results['zscaler_only'].append(asset_record)
            
        elif d_data:
            # DSPM only (very high confidence - app-level detection)
            asset_record.update({
                'confidence': 'VERY HIGH',
                'validation': 'DSPM application-level detection',
                'zscaler_count': 0,
                'dspm_count': d_data['count'],
                'dspm_users': d_data['unique_users'],
                'sensitive_data_types': d_data.get('sensitive_data_types', []),
                'total_detections': d_data['count'],
                'first_seen': d_data['first_seen'],
                'last_seen': d_data['last_seen']
            })
            results['dspm_only'].append(asset_record)
        
        # Classify as approved or shadow AI
        if asset_record['approved']:
            results['approved'].append(asset_record)
        else:
            results['shadow_ai'].append(asset_record)
    
    return results

# ============================================================================
# REPORTING
# ============================================================================

def generate_combined_report(results, output_file):
    """Generate comprehensive Excel report"""
    
    print(f"\n📊 Generating combined report: {output_file}")
    
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        
        # Sheet 1: Executive Summary
        summary_data = {
            'Metric': [
                'Total AI Assets Detected',
                'Confirmed Assets (Both Sources)',
                'Zscaler Only Detections',
                'DSPM Only Detections',
                'Approved AI Assets',
                'Shadow AI Assets',
                'CRITICAL Risk Assets',
                'HIGH Risk Assets',
                'MEDIUM Risk Assets',
                'Assets with Data Sovereignty Risk',
                'Analysis Date'
            ],
            'Value': [
                len(results['confirmed']) + len(results['zscaler_only']) + len(results['dspm_only']),
                len(results['confirmed']),
                len(results['zscaler_only']),
                len(results['dspm_only']),
                len(results['approved']),
                len(results['shadow_ai']),
                len([a for a in results['shadow_ai'] if a['risk_level'] == 'CRITICAL']),
                len([a for a in results['shadow_ai'] if a['risk_level'] == 'HIGH']),
                len([a for a in results['shadow_ai'] if a['risk_level'] == 'MEDIUM']),
                len([a for a in results['shadow_ai'] if a.get('data_sovereignty_risk')]),
                datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            ]
        }
        pd.DataFrame(summary_data).to_excel(writer, sheet_name='Executive Summary', index=False)
        
        # Sheet 2: Confirmed Assets (Highest Confidence)
        if results['confirmed']:
            confirmed_df = pd.DataFrame(results['confirmed'])
            confirmed_df = confirmed_df.sort_values('total_detections', ascending=False)
            confirmed_df.to_excel(writer, sheet_name='Confirmed Assets', index=False)
        
        # Sheet 3: All Shadow AI Assets
        if results['shadow_ai']:
            shadow_df = pd.DataFrame(results['shadow_ai'])
            shadow_df = shadow_df.sort_values(['risk_level', 'total_detections'], ascending=[True, False])
            shadow_df.to_excel(writer, sheet_name='Shadow AI Assets', index=False)
        
        # Sheet 4: Approved AI Assets
        if results['approved']:
            approved_df = pd.DataFrame(results['approved'])
            approved_df.to_excel(writer, sheet_name='Approved AI Assets', index=False)
        
        # Sheet 5: Zscaler Only Detections
        if results['zscaler_only']:
            z_only_df = pd.DataFrame(results['zscaler_only'])
            z_only_df.to_excel(writer, sheet_name='Zscaler Only', index=False)
        
        # Sheet 6: DSPM Only Detections
        if results['dspm_only']:
            d_only_df = pd.DataFrame(results['dspm_only'])
            d_only_df.to_excel(writer, sheet_name='DSPM Only', index=False)
        
        # Sheet 7: Asset Catalog Reference
        catalog_df = pd.DataFrame([
            {
                'Asset Name': name,
                'Vendor': info['vendor'],
                'Category': info['category'],
                'Risk Level': info['risk_level'],
                'Approved': info.get('approved', False),
                'Zscaler Patterns': ', '.join(info['zscaler_patterns']),
                'DSPM Names': ', '.join(info['dspm_names'])
            }
            for name, info in AI_ASSET_CATALOG.items()
        ])
        catalog_df.to_excel(writer, sheet_name='Asset Catalog', index=False)
    
    print(f"✅ Report generated successfully!")

def print_summary(results):
    """Print summary to console"""
    
    print("\n" + "=" * 80)
    print("📊 COMBINED AI ASSET DETECTION SUMMARY")
    print("=" * 80)
    print()
    
    total_assets = len(results['confirmed']) + len(results['zscaler_only']) + len(results['dspm_only'])
    
    print(f"Total AI Assets Detected: {total_assets}")
    print(f"  ✅ Confirmed (Both Sources): {len(results['confirmed'])}")
    print(f"  📡 Zscaler Only: {len(results['zscaler_only'])}")
    print(f"  🔍 DSPM Only: {len(results['dspm_only'])}")
    print()
    
    print(f"Approved AI: {len(results['approved'])}")
    print(f"Shadow AI: {len(results['shadow_ai'])}")
    print()
    
    if results['confirmed']:
        print("🎯 TOP CONFIRMED ASSETS (Cross-Validated):")
        print("─" * 80)
        for asset in sorted(results['confirmed'], key=lambda x: x['total_detections'], reverse=True)[:10]:
            print(f"  {asset['asset_name']:<30} {asset['risk_level']:<10} "
                  f"Detections: {asset['total_detections']:>5} "
                  f"(Z:{asset['zscaler_count']}, D:{asset['dspm_count']})")
    
    print()
    if results['shadow_ai']:
        critical = [a for a in results['shadow_ai'] if a['risk_level'] == 'CRITICAL']
        if critical:
            print(f"🚨 CRITICAL SHADOW AI ASSETS ({len(critical)}):")
            print("─" * 80)
            for asset in critical:
                print(f"  {asset['asset_name']:<30} Detections: {asset['total_detections']:>5}")
    
    print()
    print("=" * 80)

# ============================================================================
# MAIN
# ============================================================================

def main():
    if len(sys.argv) != 4:
        print("Usage: python combined_ai_asset_detector.py <zscaler.csv> <dspm.csv> <output.xlsx>")
        print("\nExample:")
        print("  python combined_ai_asset_detector.py zscaler_logs.csv dspm_logs.csv ai_assets_report.xlsx")
        sys.exit(1)
    
    zscaler_file = sys.argv[1]
    dspm_file = sys.argv[2]
    output_file = sys.argv[3]
    
    print("=" * 80)
    print("🔍 Combined AI Asset Detection (Zscaler + DSPM)")
    print("=" * 80)
    print()
    
    # Process both data sources
    zscaler_assets = process_zscaler_data(zscaler_file)
    dspm_assets = process_dspm_data(dspm_file)
    
    # Validate and classify
    results = validate_and_classify_assets(zscaler_assets, dspm_assets)
    
    # Generate report
    generate_combined_report(results, output_file)
    
    # Print summary
    print_summary(results)
    
    print()
    print("=" * 80)
    print("✅ Analysis Complete!")
    print("=" * 80)
    print(f"\n📄 Report saved to: {output_file}")
    print()

if __name__ == "__main__":
    main()
