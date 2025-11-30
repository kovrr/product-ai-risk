#!/bin/bash
# Upload Playwright files directly to server

echo "📦 Preparing Playwright for upload..."

# Create temp directory
TEMP_DIR="/tmp/playwright-upload"
mkdir -p $TEMP_DIR

# Download Playwright wheels locally
echo "⬇️  Downloading Playwright packages locally..."
cd $TEMP_DIR
pip download playwright beautifulsoup4 greenlet pyee

# Download Chromium browser
echo "⬇️  Downloading Chromium browser..."
playwright install chromium

# Get Chromium path
CHROMIUM_PATH=$(python3 -c "from playwright.sync_api import sync_playwright; p = sync_playwright().start(); print(p.chromium.executable_path); p.stop()")
CHROMIUM_DIR=$(dirname $(dirname $CHROMIUM_PATH))

echo "📁 Chromium location: $CHROMIUM_DIR"

# Create archive
echo "📦 Creating archive..."
cd /tmp
tar -czf playwright-bundle.tar.gz playwright-upload/

# Upload to server
echo "⬆️  Uploading to server..."
gcloud compute scp playwright-bundle.tar.gz platform:/tmp/ --zone us-central1-f --tunnel-through-iap

# Install on server
echo "🔧 Installing on server..."
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap --command "
cd /opt/aikovrr/backend
source venv/bin/activate

# Extract and install wheels
cd /tmp
tar -xzf playwright-bundle.tar.gz
cd playwright-upload
pip install --no-index --find-links . playwright beautifulsoup4

# Copy Chromium browser
mkdir -p ~/.cache/ms-playwright
cp -r $CHROMIUM_DIR ~/.cache/ms-playwright/

echo '✅ Playwright installed!'
python -c 'from playwright.sync_api import sync_playwright; print(\"Playwright version:\", sync_playwright().start().chromium.version)'
"

echo "✅ Upload complete!"
