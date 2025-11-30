#!/bin/bash
# Prepare Playwright for offline installation on server

echo "📦 Preparing Playwright for offline installation..."

# Create temp directory
BUNDLE_DIR="/tmp/playwright-offline-bundle"
rm -rf $BUNDLE_DIR
mkdir -p $BUNDLE_DIR/wheels
mkdir -p $BUNDLE_DIR/chromium

cd $BUNDLE_DIR

# Download all Python packages as wheels
echo "⬇️  Downloading Python packages..."
pip download playwright beautifulsoup4 greenlet pyee typing-extensions -d wheels/

# Download Chromium browser locally
echo "⬇️  Downloading Chromium browser..."
python3 -m playwright install chromium

# Find Chromium installation
PLAYWRIGHT_BROWSERS="$HOME/Library/Caches/ms-playwright"
if [ -d "$PLAYWRIGHT_BROWSERS" ]; then
    echo "📁 Copying Chromium from: $PLAYWRIGHT_BROWSERS"
    cp -r "$PLAYWRIGHT_BROWSERS"/* chromium/
else
    echo "⚠️  Chromium not found in expected location"
    echo "Trying alternate location..."
    PLAYWRIGHT_BROWSERS="$HOME/.cache/ms-playwright"
    if [ -d "$PLAYWRIGHT_BROWSERS" ]; then
        cp -r "$PLAYWRIGHT_BROWSERS"/* chromium/
    fi
fi

# Create installation script
cat > install.sh << 'INSTALL_SCRIPT'
#!/bin/bash
# Install Playwright offline on server

cd /opt/aikovrr/backend
source venv/bin/activate

echo "📦 Installing Python packages from wheels..."
pip install --no-index --find-links /tmp/playwright-offline-bundle/wheels playwright beautifulsoup4

echo "🌐 Installing Chromium browser..."
mkdir -p ~/.cache/ms-playwright
cp -r /tmp/playwright-offline-bundle/chromium/* ~/.cache/ms-playwright/

echo "✅ Testing installation..."
python -c "from playwright.sync_api import sync_playwright; p = sync_playwright().start(); print('Playwright version:', p.chromium.version); p.stop()"

echo "✅ Playwright installed successfully!"
INSTALL_SCRIPT

chmod +x install.sh

# Create archive
cd /tmp
echo "📦 Creating archive..."
tar -czf playwright-offline-bundle.tar.gz playwright-offline-bundle/

echo ""
echo "✅ Bundle created: /tmp/playwright-offline-bundle.tar.gz"
echo "📊 Size: $(du -h /tmp/playwright-offline-bundle.tar.gz | cut -f1)"
echo ""
echo "📤 Next steps:"
echo "1. Upload to server:"
echo "   gcloud compute scp /tmp/playwright-offline-bundle.tar.gz platform:/tmp/ --zone us-central1-f --tunnel-through-iap"
echo ""
echo "2. SSH to server and install:"
echo "   gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap"
echo "   cd /tmp"
echo "   tar -xzf playwright-offline-bundle.tar.gz"
echo "   cd playwright-offline-bundle"
echo "   ./install.sh"
echo ""
