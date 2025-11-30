#!/bin/bash
# Simple approach: Try different pip install methods

echo "🔍 Testing network connectivity..."

# Test 1: Can we reach PyPI?
echo "Testing PyPI connectivity..."
curl -I https://pypi.org/ || echo "❌ Cannot reach PyPI"

# Test 2: Try with different pip options
echo ""
echo "📦 Attempting installation with retries..."

# Method 1: Standard install with retries
pip install --retries 5 --timeout 30 playwright beautifulsoup4

# If that fails, try with different index
if [ $? -ne 0 ]; then
    echo "Trying with different mirror..."
    pip install --index-url https://mirrors.aliyun.com/pypi/simple/ playwright beautifulsoup4
fi

# Install Chromium
echo ""
echo "🌐 Installing Chromium browser..."
playwright install chromium

# Test
echo ""
echo "✅ Testing installation..."
python -c "from playwright.sync_api import sync_playwright; print('Playwright installed successfully!')"
