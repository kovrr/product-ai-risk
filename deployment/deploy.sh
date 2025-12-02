#!/bin/bash

# One-command deployment to GCloud VM
# Run this from your local machine

set -e

echo "🚀 AIKovrr GCloud Deployment"
echo "============================"
echo ""

# Configuration
VM_NAME="platform"
ZONE="us-central1-f"
PROJECT_DIR="/Users/liransorani/CascadeProjects/aikovrr"

cd $PROJECT_DIR

echo "📰 Step 0/4: Exporting latest news articles from local database..."
cd database
python3.9 export_latest_news.py
if [ $? -ne 0 ]; then
    echo "⚠️  Warning: Failed to export news articles, using existing file"
fi
cd $PROJECT_DIR
echo ""

echo "📦 Step 1/4: Creating deployment package..."
tar -czf aikovrr-deploy.tar.gz \
  --exclude='venv' \
  --exclude='__pycache__' \
  --exclude='*.pyc' \
  --exclude='staticfiles' \
  --exclude='media' \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.vite' \
  --exclude='.git' \
  backend/ frontend/ database/ deployment/

echo "✅ Package created: aikovrr-deploy.tar.gz"
echo ""

echo "📤 Step 2/4: Uploading to VM..."
gcloud compute scp aikovrr-deploy.tar.gz $VM_NAME:/tmp/ \
  --zone $ZONE \
  --tunnel-through-iap

echo "✅ Upload complete"
echo ""

echo "🚀 Step 3/4: Running deployment script on VM..."
gcloud compute ssh $VM_NAME --zone $ZONE --tunnel-through-iap --command "
  sudo mkdir -p /opt/aikovrr && \
  sudo tar -xzf /tmp/aikovrr-deploy.tar.gz -C /opt/aikovrr && \
  sudo chown -R \$USER:\$USER /opt/aikovrr && \
  chmod +x /opt/aikovrr/deployment/deploy_to_gcloud.sh && \
  cd /opt/aikovrr && \
  ./deployment/deploy_to_gcloud.sh
"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Access your application:"
echo "   http://136.113.138.156:8000"
echo ""
echo "🔑 Admin login:"
echo "   http://136.113.138.156:8000/admin/"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
