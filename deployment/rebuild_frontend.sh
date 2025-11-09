#!/bin/bash

# Quick script to rebuild frontend after fixing imports
# Run this on the VM

set -e

echo "🔄 Rebuilding Frontend..."

# Extract updated files
sudo tar -xzf /tmp/aikovrr-deploy.tar.gz -C /opt/aikovrr
sudo chown -R $USER:$USER /opt/aikovrr

# Rebuild frontend
cd /opt/aikovrr/frontend
npm run build

# Restart nginx
sudo systemctl restart nginx

echo "✅ Frontend rebuilt and deployed!"
echo "🌐 Access: http://35.202.143.181"
