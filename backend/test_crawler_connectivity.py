#!/usr/bin/env python3
"""
Test script to verify:
1. Server has internet connectivity
2. Playwright headless browser can access external sites
3. IAPP and Compliance Week crawlers work correctly
"""

import sys
import os

# Add backend to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aikovrr.settings')
django.setup()

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
import requests
from datetime import datetime

print("=" * 80)
print("🔍 AIKovrr News Crawler Connectivity Test")
print("=" * 80)
print()

# Test 1: Basic HTTP connectivity
print("=" * 80)
print("TEST 1: Basic HTTP Connectivity")
print("=" * 80)

test_urls = [
    ("Google", "https://www.google.com"),
    ("IAPP", "https://iapp.org"),
    ("Compliance Week", "https://www.complianceweek.com"),
]

for name, url in test_urls:
    try:
        print(f"\n📡 Testing {name}: {url}")
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            print(f"   ✅ SUCCESS - HTTP {response.status_code}")
            print(f"   Response time: {response.elapsed.total_seconds():.2f}s")
        else:
            print(f"   ⚠️  HTTP {response.status_code}")
    except requests.exceptions.Timeout:
        print(f"   ❌ TIMEOUT - No response within 10 seconds")
        print(f"   → Check: Firewall blocking outbound HTTPS?")
    except requests.exceptions.ConnectionError as e:
        print(f"   ❌ CONNECTION ERROR")
        print(f"   → Check: DNS resolution, network connectivity")
    except Exception as e:
        print(f"   ❌ ERROR: {str(e)}")

# Test 2: Playwright Browser Connectivity
print("\n\n" + "=" * 80)
print("TEST 2: Playwright Headless Browser")
print("=" * 80)

try:
    print("\n🌐 Launching Playwright headless browser...")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
            ]
        )
        
        context = browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        )
        
        page = context.new_page()
        print("   ✅ Browser launched successfully")
        
        # Test IAPP
        print("\n📰 Testing IAPP News Page...")
        try:
            page.goto('https://iapp.org/news/', timeout=30000)
            page.wait_for_load_state('networkidle', timeout=30000)
            print("   ✅ IAPP page loaded successfully")
            
            # Check for article links
            html = page.content()
            article_count = html.count('/news/a/')
            print(f"   ✅ Found ~{article_count} article links")
            
        except PlaywrightTimeout:
            print("   ❌ TIMEOUT loading IAPP")
            print("   → Check: Firewall blocking browser traffic?")
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")
        
        # Test Compliance Week
        print("\n📰 Testing Compliance Week AI Page...")
        try:
            page.goto('https://www.complianceweek.com/news/ai', timeout=30000)
            page.wait_for_load_state('domcontentloaded', timeout=30000)
            print("   ✅ Compliance Week page loaded successfully")
            
            # Check for article links
            html = page.content()
            article_count = html.count('.article')
            print(f"   ✅ Found ~{article_count} article links")
            
        except PlaywrightTimeout:
            print("   ❌ TIMEOUT loading Compliance Week")
            print("   → Check: Firewall blocking browser traffic?")
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")
        
        browser.close()
        print("\n   ✅ Browser closed successfully")

except Exception as e:
    print(f"\n   ❌ FATAL ERROR: {str(e)}")
    print("\n   → Possible issues:")
    print("      1. Playwright not installed: pip install playwright")
    print("      2. Chromium not installed: playwright install chromium")
    print("      3. Missing system dependencies")

# Test 3: Run actual crawlers (dry run)
print("\n\n" + "=" * 80)
print("TEST 3: Crawler Commands (Dry Run)")
print("=" * 80)

print("\n📋 To run the actual crawlers, use these commands:")
print("\n1. IAPP Crawler:")
print("   cd /path/to/backend")
print("   python manage.py fetch_iapp_news --max-articles 5")

print("\n2. Compliance Week Crawler:")
print("   cd /path/to/backend")
print("   python manage.py fetch_compliance_week_news --max-articles 5")

print("\n3. Both Crawlers:")
print("   python manage.py fetch_iapp_news --max-articles 5 && python manage.py fetch_compliance_week_news --max-articles 5")

# Summary
print("\n\n" + "=" * 80)
print("📊 SUMMARY")
print("=" * 80)
print()
print("If all tests passed:")
print("   ✅ Server has internet connectivity")
print("   ✅ Playwright can access external sites")
print("   ✅ Crawlers should work correctly")
print()
print("If tests failed:")
print("   ❌ Check firewall rules (allow outbound HTTPS)")
print("   ❌ Check DNS resolution")
print("   ❌ Check Playwright installation")
print("   ❌ Check system dependencies (chromium, fonts, etc.)")
print()
print("Next step: Run the actual crawlers to fetch news articles")
print()
