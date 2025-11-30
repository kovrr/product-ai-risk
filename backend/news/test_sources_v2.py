#!/usr/bin/env python
"""
Test specific article/news pages for each source.
"""

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

SOURCES = {
    'CISO Series': [
        'https://cisoseries.com/category/podcast/cyber-security-headlines/',
        'https://cisoseries.com/cybersecurity-news/',
    ],
    'GRC World Forums': [
        'https://www.grcworldforums.com/latest/',
        'https://www.grcworldforums.com/risk-europe/',
    ],
    'Compliance Week': [
        'https://www.complianceweek.com/news',
        'https://www.complianceweek.com/opinion',
    ],
}

def test_url(source_name, url):
    """Test specific URL"""
    print(f"\n{'='*80}")
    print(f"Source: {source_name}")
    print(f"URL: {url}")
    print(f"{'='*80}")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        )
        page = context.new_page()
        
        try:
            print("🌐 Loading...")
            response = page.goto(url, timeout=45000, wait_until='domcontentloaded')
            print(f"📡 Status: {response.status}")
            
            page.wait_for_timeout(3000)
            
            title = page.title()
            html = page.content()
            soup = BeautifulSoup(html, 'html.parser')
            
            print(f"📄 Title: {title}")
            
            # Check for CAPTCHA/blocks
            text = soup.get_text().lower()
            if any(word in text for word in ['captcha', 'cloudflare', 'just a moment', 'checking your browser']):
                print("❌ CAPTCHA/BLOCK detected")
                return False
            
            # Look for article links
            links = soup.find_all('a', href=True)
            article_links = [
                l for l in links 
                if any(pattern in l.get('href', '') for pattern in ['/article', '/news/', 'podcast', '/opinion/'])
            ]
            
            print(f"✅ Accessible - Found {len(article_links)} article links")
            
            # Show samples
            for i, link in enumerate(article_links[:3], 1):
                print(f"   {i}. {link.get_text(strip=True)[:60]}...")
                print(f"      {link.get('href')}")
            
            return True
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            return False
        
        finally:
            browser.close()

if __name__ == '__main__':
    print("="*80)
    print("TESTING SPECIFIC NEWS PAGES")
    print("="*80)
    
    accessible = {}
    
    for source, urls in SOURCES.items():
        accessible[source] = []
        for url in urls:
            if test_url(source, url):
                accessible[source].append(url)
    
    print("\n" + "="*80)
    print("RESULTS SUMMARY")
    print("="*80)
    
    for source, urls in accessible.items():
        if urls:
            print(f"\n✅ {source}: {len(urls)} accessible URL(s)")
            for url in urls:
                print(f"   - {url}")
        else:
            print(f"\n❌ {source}: No accessible URLs")
    
    print("\n✅ Test complete!")
