#!/usr/bin/env python
"""
Test script to extract articles from IAPP using browser automation.
This will help us understand the HTML structure before building the full extractor.
"""

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import json

def test_iapp_extraction():
    """Test IAPP article extraction and show HTML structure"""
    
    print("=" * 80)
    print("IAPP NEWS EXTRACTION TEST")
    print("=" * 80)
    
    with sync_playwright() as p:
        print("\n🌐 Launching browser...")
        browser = p.chromium.launch(headless=False)  # Set to False to see what's happening
        page = browser.new_page()
        
        try:
            # Navigate to IAPP news page
            print("📍 Navigating to https://iapp.org/news/")
            page.goto('https://iapp.org/news/', timeout=30000)
            
            # Wait for page to load
            print("⏳ Waiting for content to load...")
            page.wait_for_timeout(5000)  # Wait 5 seconds for dynamic content
            
            # Get page content
            html = page.content()
            
            # Save HTML for inspection
            with open('/tmp/iapp_page.html', 'w', encoding='utf-8') as f:
                f.write(html)
            print("💾 HTML saved to /tmp/iapp_page.html")
            
            # Parse with BeautifulSoup
            soup = BeautifulSoup(html, 'html.parser')
            
            # Try to find article containers - common patterns
            print("\n🔍 Searching for article containers...")
            
            selectors_to_try = [
                'article',
                '.article',
                '.news-item',
                '.article-card',
                '.post',
                '[class*="article"]',
                '[class*="news"]',
                '[class*="post"]',
            ]
            
            articles_found = []
            for selector in selectors_to_try:
                elements = soup.select(selector)
                if elements:
                    print(f"   ✅ Found {len(elements)} elements with selector: {selector}")
                    articles_found.append({
                        'selector': selector,
                        'count': len(elements),
                        'elements': elements[:3]  # Keep first 3 for inspection
                    })
                else:
                    print(f"   ❌ No elements found for: {selector}")
            
            if not articles_found:
                print("\n⚠️  No article containers found with common selectors!")
                print("   Opening browser for manual inspection...")
                print("   Press Enter when ready to continue...")
                input()
            else:
                print(f"\n✅ Found articles using {len(articles_found)} different selectors")
                
                # Analyze first successful selector
                best_match = articles_found[0]
                print(f"\n📊 Analyzing selector: {best_match['selector']}")
                print(f"   Found {best_match['count']} elements")
                
                # Extract data from first 3 articles
                print("\n📰 Sample Articles:")
                for i, article in enumerate(best_match['elements'][:3], 1):
                    print(f"\n   Article {i}:")
                    
                    # Try to find title
                    title_selectors = ['h1', 'h2', 'h3', '.title', '.headline', 'a']
                    title = None
                    for ts in title_selectors:
                        title_elem = article.select_one(ts)
                        if title_elem:
                            title = title_elem.get_text(strip=True)
                            if title and len(title) > 10:  # Valid title
                                print(f"      Title: {title[:80]}...")
                                break
                    
                    # Try to find link
                    link_elem = article.select_one('a')
                    if link_elem:
                        url = link_elem.get('href', '')
                        if url:
                            if not url.startswith('http'):
                                url = 'https://iapp.org' + url
                            print(f"      URL: {url}")
                    
                    # Try to find date
                    date_selectors = ['.date', 'time', '.published', '[class*="date"]']
                    for ds in date_selectors:
                        date_elem = article.select_one(ds)
                        if date_elem:
                            date_text = date_elem.get_text(strip=True)
                            if date_text:
                                print(f"      Date: {date_text}")
                                break
                    
                    # Try to find summary
                    summary_selectors = ['p', '.summary', '.excerpt', '.description']
                    for ss in summary_selectors:
                        summary_elem = article.select_one(ss)
                        if summary_elem:
                            summary_text = summary_elem.get_text(strip=True)
                            if summary_text and len(summary_text) > 20:
                                print(f"      Summary: {summary_text[:100]}...")
                                break
                
                # Save selector recommendations
                print("\n" + "=" * 80)
                print("RECOMMENDED SELECTORS FOR EXTRACTOR:")
                print("=" * 80)
                print(f"Article container: '{best_match['selector']}'")
                print("\nNext steps:")
                print("1. Review /tmp/iapp_page.html to verify selectors")
                print("2. Update the extractor with correct selectors")
                print("3. Test extraction with real data")
            
        except Exception as e:
            print(f"\n❌ Error: {str(e)}")
            import traceback
            traceback.print_exc()
        
        finally:
            print("\n⏸️  Browser will close in 5 seconds...")
            page.wait_for_timeout(5000)
            browser.close()
    
    print("\n✅ Test complete!")

if __name__ == '__main__':
    test_iapp_extraction()
