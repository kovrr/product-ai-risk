#!/usr/bin/env python
"""
Test IAPP extraction in HEADLESS mode (for server deployment).
This simulates exactly how it will run on the production server.
"""

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import json

def test_iapp_headless():
    """Test IAPP extraction in headless mode (server-ready)"""
    
    print("=" * 80)
    print("IAPP HEADLESS EXTRACTION TEST (Server Mode)")
    print("=" * 80)
    
    with sync_playwright() as p:
        print("\n🌐 Launching headless browser...")
        
        # HEADLESS MODE - This is how it will run on server
        browser = p.chromium.launch(
            headless=True,  # ← HEADLESS for server
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
            ]
        )
        
        # Create context with realistic browser fingerprint
        context = browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            locale='en-US',
        )
        
        page = context.new_page()
        
        try:
            # Navigate to IAPP news page
            print("📍 Navigating to https://iapp.org/news/")
            page.goto('https://iapp.org/news/', timeout=30000)
            
            # Wait for network to be idle (all AJAX requests complete)
            print("⏳ Waiting for dynamic content to load...")
            page.wait_for_load_state('networkidle', timeout=30000)
            
            # Additional wait for JavaScript rendering
            page.wait_for_timeout(3000)
            
            # Try to find article list container
            print("🔍 Looking for article containers...")
            
            # Get page content
            html = page.content()
            
            # Save for debugging
            with open('/tmp/iapp_headless.html', 'w', encoding='utf-8') as f:
                f.write(html)
            print("💾 HTML saved to /tmp/iapp_headless.html")
            
            # Parse with BeautifulSoup
            soup = BeautifulSoup(html, 'html.parser')
            
            # Try multiple selector strategies
            print("\n📊 Testing different selectors:")
            
            # Strategy 1: Look for links to /news/a/ (IAPP article pattern)
            news_links = soup.find_all('a', href=lambda x: x and '/news/a/' in x)
            print(f"   Strategy 1 - Links with /news/a/: {len(news_links)} found")
            
            # Strategy 2: Look for common article containers
            containers = soup.select('div[class*="card"], div[class*="item"], div[class*="post"]')
            print(f"   Strategy 2 - Card/Item containers: {len(containers)} found")
            
            # Strategy 3: Look for list items
            list_items = soup.select('li, .list-item, [role="listitem"]')
            print(f"   Strategy 3 - List items: {len(list_items)} found")
            
            # Strategy 4: Look for any divs with links
            divs_with_links = soup.find_all('div', class_=True)
            divs_with_news_links = [d for d in divs_with_links if d.find('a', href=lambda x: x and '/news/a/' in x)]
            print(f"   Strategy 4 - Divs containing news links: {len(divs_with_news_links)} found")
            
            # Use best strategy
            if news_links:
                print(f"\n✅ Best strategy: Direct news links ({len(news_links)} articles)")
                print("\n📰 Sample Articles (from links):")
                
                for i, link in enumerate(news_links[:5], 1):
                    url = link.get('href', '')
                    if not url.startswith('http'):
                        url = 'https://iapp.org' + url
                    
                    title = link.get_text(strip=True)
                    
                    # Try to find parent container for more info
                    parent = link.find_parent(['div', 'li', 'article'])
                    date_text = ''
                    summary_text = ''
                    
                    if parent:
                        # Look for date
                        date_elem = parent.find(['time', 'span'], class_=lambda x: x and 'date' in str(x).lower())
                        if date_elem:
                            date_text = date_elem.get_text(strip=True)
                        
                        # Look for summary
                        summary_elem = parent.find('p')
                        if summary_elem:
                            summary_text = summary_elem.get_text(strip=True)
                    
                    print(f"\n   Article {i}:")
                    print(f"      Title: {title[:80]}...")
                    print(f"      URL: {url}")
                    if date_text:
                        print(f"      Date: {date_text}")
                    if summary_text:
                        print(f"      Summary: {summary_text[:100]}...")
                
                # Check for AI governance keywords
                ai_keywords = ['ai', 'artificial intelligence', 'machine learning', 'algorithm']
                ai_articles = [link for link in news_links if any(kw in link.get_text().lower() for kw in ai_keywords)]
                print(f"\n🤖 AI-related articles: {len(ai_articles)} out of {len(news_links)}")
                
            else:
                print("\n⚠️  No articles found with standard selectors")
                print("   The page might be using heavy JavaScript or require interaction")
                
                # Try to find any text that looks like article titles
                all_text = soup.get_text()
                if 'news' in all_text.lower():
                    print("   ✓ Page contains 'news' text")
                if 'article' in all_text.lower():
                    print("   ✓ Page contains 'article' text")
                
                # Check if we need to click/scroll to load content
                print("\n   Possible issues:")
                print("   - Content requires scrolling to load (infinite scroll)")
                print("   - Content requires clicking filters/buttons")
                print("   - Content is behind authentication")
                print("   - Page structure has changed")
            
            # Test if page loaded correctly
            title = page.title()
            print(f"\n📄 Page title: {title}")
            
            if 'error' in title.lower() or '404' in title:
                print("   ⚠️  Page might have errors")
            
        except Exception as e:
            print(f"\n❌ Error: {str(e)}")
            import traceback
            traceback.print_exc()
        
        finally:
            browser.close()
    
    print("\n" + "=" * 80)
    print("NEXT STEPS:")
    print("=" * 80)
    print("1. Review /tmp/iapp_headless.html to see actual page structure")
    print("2. If articles found: Build extractor with working selectors")
    print("3. If no articles: Try alternative approach (API, different page, etc.)")
    print("\n✅ Headless test complete!")

if __name__ == '__main__':
    test_iapp_headless()
