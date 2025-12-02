"""
Utility functions for news management
"""

import requests
from time import sleep


def verify_url(url, timeout=10):
    """
    Verify if a URL is accessible and returns valid content.
    
    Args:
        url: URL to verify
        timeout: Request timeout in seconds
        
    Returns:
        tuple: (is_valid, status_code, message)
    """
    try:
        response = requests.get(
            url,
            timeout=timeout,
            allow_redirects=True,
            headers={'User-Agent': 'Mozilla/5.0 (compatible; AIKovrr/1.0)'}
        )
        
        # Check status code
        if response.status_code == 404:
            return False, 404, "404 Not Found"
        
        if response.status_code >= 400:
            return False, response.status_code, f"HTTP {response.status_code}"
        
        # Check for "page not found" in content
        if response.status_code == 200:
            content_lower = response.text.lower()
            if 'page not found' in content_lower[:1000] or '404' in content_lower[:500]:
                return False, 200, "Page not found in content"
        
        return True, response.status_code, "OK"
        
    except requests.exceptions.Timeout:
        return False, 0, "Timeout"
    except requests.exceptions.ConnectionError:
        return False, 0, "Connection error"
    except Exception as e:
        return False, 0, f"Error: {str(e)[:50]}"


def verify_and_create_article(article_data, model_class, stdout=None, verify_urls=True):
    """
    Verify URL and create article if valid.
    
    Args:
        article_data: Dictionary with article data
        model_class: NewsArticle model class
        stdout: Output stream for logging
        verify_urls: Whether to verify URLs before creating
        
    Returns:
        tuple: (created, message)
    """
    url = article_data.get('url')
    
    # Check if already exists
    if model_class.objects.filter(url=url).exists():
        return False, "duplicate"
    
    # Verify URL if enabled
    if verify_urls:
        is_valid, status_code, message = verify_url(url)
        if not is_valid:
            if stdout:
                stdout.write(f"  ⚠️  Skipping (invalid URL): {message}")
            return False, f"invalid_url: {message}"
        
        # Small delay to be nice to servers
        sleep(0.3)
    
    # Create article
    try:
        model_class.objects.create(**article_data)
        return True, "created"
    except Exception as e:
        if stdout:
            stdout.write(f"  ❌ Error creating article: {str(e)[:50]}")
        return False, f"error: {str(e)[:50]}"
