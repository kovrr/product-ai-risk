#!/bin/bash

# Deploy Frontend to KovrrAI Server
# This script uploads the built frontend and deploys it to the server

set -e  # Exit on error

echo "🚀 Starting frontend deployment..."

# Configuration
ZONE="us-central1-f"
PROJECT="aikovrr-platform"
VM_NAME="platform"
FRONTEND_DIR="/Users/liransorani/CascadeProjects/aikovrr/frontend"

# Step 1: Build frontend
echo "📦 Building frontend..."
cd "$FRONTEND_DIR"
npm run build

# Step 2: Upload to server temp directory
echo "📤 Uploading files to server..."
gcloud compute scp --recurse dist/* ${VM_NAME}:/tmp/frontend-dist/ --zone=${ZONE} --project=${PROJECT}

# Step 3: SSH and deploy
echo "🔧 Deploying on server..."
gcloud compute ssh ${VM_NAME} --zone=${ZONE} --project=${PROJECT} --command="
  echo '🗑️  Backing up current frontend...'
  sudo cp -r /var/www/html /var/www/html.backup.\$(date +%Y%m%d_%H%M%S)
  
  echo '📋 Copying new files...'
  sudo rm -rf /var/www/html/*
  sudo cp -r /tmp/frontend-dist/* /var/www/html/
  
  echo '🔐 Setting permissions...'
  sudo chown -R www-data:www-data /var/www/html
  sudo chmod -R 755 /var/www/html
  
  echo '♻️  Restarting nginx...'
  sudo systemctl restart nginx
  
  echo '🧹 Cleaning up temp files...'
  rm -rf /tmp/frontend-dist
  
  echo '✅ Deployment complete!'
"

echo ""
echo "✅ Frontend deployed successfully!"
echo "🌐 Access at: http://136.113.138.156:8000"
echo ""
