#!/bin/bash
# Prepare Playwright for Linux server (download Linux wheels)

echo "📦 Preparing Playwright for Linux server..."

# Create temp directory
BUNDLE_DIR="/tmp/playwright-linux-bundle"
rm -rf $BUNDLE_DIR
mkdir -p $BUNDLE_DIR/wheels

cd $BUNDLE_DIR

# Download Linux-specific wheels
echo "⬇️  Downloading Linux-compatible Python packages..."
pip download \
  --platform manylinux2014_x86_64 \
  --python-version 311 \
  --only-binary=:all: \
  --dest wheels/ \
  playwright beautifulsoup4 soupsieve

# Also download pure Python packages
pip download \
  --dest wheels/ \
  greenlet pyee typing-extensions

# Create installation script for server
cat > install.sh << 'INSTALL_SCRIPT'
#!/bin/bash
# Install Playwright on Linux server

cd /opt/aikovrr/backend
source venv/bin/activate

echo "📦 Installing Python packages from wheels..."
pip install --no-index --find-links /tmp/playwright-linux-bundle/wheels playwright beautifulsoup4

echo "🌐 Installing Chromium browser..."
playwright install chromium

echo "🔧 Installing system dependencies for Chromium..."
playwright install-deps chromium

echo "✅ Testing installation..."
python -c "from playwright.sync_api import sync_playwright; p = sync_playwright().start(); print('✅ Playwright version:', p.chromium.version); p.stop()"

echo ""
echo "✅ Playwright installed successfully!"
echo ""
echo "🧪 Test extraction:"
echo "python manage.py fetch_all_news --max-articles 5"
INSTALL_SCRIPT

chmod +x install.sh

# Create archive
cd /tmp
echo "📦 Creating archive..."
tar -czf playwright-linux-bundle.tar.gz playwright-linux-bundle/

echo ""
echo "✅ Bundle created: /tmp/playwright-linux-bundle.tar.gz"
echo "📊 Size: $(du -h /tmp/playwright-linux-bundle.tar.gz | cut -f1)"
echo ""
echo "📤 Upload to server:"
echo "gcloud compute scp /tmp/playwright-linux-bundle.tar.gz platform:/tmp/ --zone us-central1-f --tunnel-through-iap"
echo ""
echo "📥 Install on server:"
echo "gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap --command 'cd /tmp && tar -xzf playwright-linux-bundle.tar.gz && cd playwright-linux-bundle && bash install.sh'"
echo ""
