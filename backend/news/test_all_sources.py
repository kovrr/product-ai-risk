#!/usr/bin/env python
"""
Test all news sources to check accessibility and CAPTCHA status.
This will help determine which sources we can extract from.
"""

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import time

SOURCES = {
    'CISO Series': 'https://cisoseries.com/',
    'GRC World Forums': 'https://www.grcworldforums.com/',
    'Compliance Week': 'https://www.complianceweek.com/news',
}

def test_source(source_name, url):
    """Test if source is accessible in headless mode"""
    print(f"\n{'='*80}")
    print(f"Testing: {source_name}")
    print(f"URL: {url}")
    print(f"{'='*80}")
    
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
            locale='en-US',
        )
        
        page = context.new_page()
        
        try:
            print("🌐 Loading page...")
            page.goto(url, timeout=30000)
            page.wait_for_load_state('networkidle', timeout=30000)
            page.wait_for_timeout(3000)
            
            # Get page title and content
            title = page.title()
            html = page.content()
            soup = BeautifulSoup(html, 'html.parser')
            
            print(f"📄 Page title: {title}")
            
            # Check for CAPTCHA indicators
            captcha_indicators = [
                'captcha', 'challenge', 'cloudflare', 'security check',
                'verify you are human', 'just a moment', 'checking your browser'
            ]
            
            page_text = soup.get_text().lower()
            has_captcha = any(indicator in page_text for indicator in captcha_indicators)
            
            if has_captcha:
                print("❌ CAPTCHA DETECTED - Page is protected")
                print("   Indicators found:")
                for indicator in captcha_indicators:
                    if indicator in page_text:
                        print(f"   - '{indicator}'")
            else:
                print("✅ NO CAPTCHA - Page is accessible")
                
                # Try to find article links
                article_patterns = [
                    ('a', {'href': lambda x: x and '/news/' in x}),
                    ('a', {'href': lambda x: x and '/article' in x}),
                    ('a', {'href': lambda x: x and 'podcast' in x}),
                    ('article', {}),
                    ('.article', {}),
                    ('.post', {}),
                ]
                
                articles_found = 0
                for pattern in article_patterns:
                    if isinstance(pattern, tuple):
                        elements = soup.find_all(pattern[0], pattern[1])
                    else:
                        elements = soup.select(pattern)
                    
                    if elements:
                        articles_found = len(elements)
                        print(f"📰 Found {articles_found} potential articles")
                        
                        # Show first 3
                        for i, elem in enumerate(elements[:3], 1):
                            if elem.name == 'a':
                                title_text = elem.get_text(strip=True)[:60]
                                url_text = elem.get('href', '')
                            else:
                                link = elem.find('a')
                                title_text = link.get_text(strip=True)[:60] if link else 'No title'
                                url_text = link.get('href', '') if link else ''
                            
                            print(f"   {i}. {title_text}...")
                            print(f"      URL: {url_text}")
                        break
                
                if articles_found == 0:
                    print("⚠️  No articles found with standard selectors")
                    print("   May require custom extraction logic")
            
            # Save HTML for inspection
            filename = f"/tmp/{source_name.replace(' ', '_').lower()}.html"
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"💾 HTML saved to {filename}")
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")
        
        finally:
            browser.close()

if __name__ == '__main__':
    print("="*80)
    print("NEWS SOURCES ACCESSIBILITY TEST")
    print("Testing all sources in headless mode (server simulation)")
    print("="*80)
    
    results = {}
    
    for source_name, url in SOURCES.items():
        try:
            test_source(source_name, url)
            time.sleep(2)  # Pause between tests
        except Exception as e:
            print(f"\n❌ Fatal error testing {source_name}: {str(e)}")
    
    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80)
    print("\nNext steps:")
    print("1. Review HTML files in /tmp/ for sources without CAPTCHA")
    print("2. Build extractors for accessible sources")
    print("3. Skip or find alternatives for CAPTCHA-protected sources")
    print("\n✅ Test complete!")
