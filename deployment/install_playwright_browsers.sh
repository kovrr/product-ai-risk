#!/bin/bash

# Install Playwright browsers on GCloud VM
# Run this from your local machine

set -e

echo "📦 Installing Playwright Browsers on GCloud VM"
echo "==============================================="
echo ""

# Configuration
VM_NAME="platform"
ZONE="us-central1-f"

echo "🚀 Installing Playwright browsers..."
echo ""

gcloud compute ssh $VM_NAME --zone $ZONE --tunnel-through-iap --command "
  echo '📦 Installing Playwright browsers...'
  echo ''
  
  cd /opt/aikovrr/backend
  source venv/bin/activate
  
  # Install Playwright browsers
  playwright install chromium
  
  # Install system dependencies for Playwright
  echo ''
  echo '📦 Installing system dependencies...'
  playwright install-deps chromium
  
  echo ''
  echo '✅ Playwright browsers installed successfully!'
  echo ''
  echo '🧪 Testing browser launch...'
  python -c \"
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    print('✅ Chromium browser launched successfully!')
    browser.close()
\"
"

echo ""
echo "==============================================="
echo "✅ Installation Complete!"
echo ""
echo "📋 Next step: Run the crawlers"
echo "   ./run_crawlers_on_server.sh"
echo ""
