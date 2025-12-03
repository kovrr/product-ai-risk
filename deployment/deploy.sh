#!/bin/bash

# One-command deployment to GCloud VM
# Run this from your local machine

set -e

echo "🚀 AIKovrr GCloud Deployment"
echo "============================"
echo ""

# Load environment variables from .env file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$PROJECT_ROOT/.env"

if [ -f "$ENV_FILE" ]; then
    echo "📋 Loading configuration from .env..."
    # Export variables from .env file
    export $(grep -v '^#' "$ENV_FILE" | grep -v '^$' | xargs)
    echo "✅ Configuration loaded"
else
    echo "❌ Error: .env file not found at $ENV_FILE"
    echo "   Please copy .env.example to .env and configure it:"
    echo "   cp .env.example .env"
    echo ""
    exit 1
fi
echo ""

# Configuration from environment variables
VM_NAME="${GCLOUD_VM_NAME:-platform}"
ZONE="${GCLOUD_ZONE:-us-central1-f}"
PROJECT_DIR="${LOCAL_PROJECT_DIR:-$PROJECT_ROOT}"
VM_IP="${GCLOUD_VM_IP:-136.113.138.156}"

# Database configuration
DB_USER="${DB_USER:-postgres}"
DB_HOST="${DB_HOST:-localhost}"
DB_NAME="${DB_NAME:-aikovrr}"

echo "📊 Deployment Configuration:"
echo "   VM Name: $VM_NAME"
echo "   Zone: $ZONE"
echo "   Project Dir: $PROJECT_DIR"
echo "   DB User: $DB_USER"
echo "   DB Host: $DB_HOST"
echo "   DB Name: $DB_NAME"
echo ""

cd $PROJECT_DIR

echo "📰 Step 0/4: Dumping local PostgreSQL database..."
echo "   Creating full database dump with all articles and data..."

# Build pg_dump command with optional password
if [ -n "$DB_PASSWORD" ]; then
    export PGPASSWORD="$DB_PASSWORD"
fi

pg_dump -U "$DB_USER" -h "$DB_HOST" "$DB_NAME" > database/local_db_dump.sql
if [ $? -eq 0 ]; then
    echo "   ✅ Database dump created: database/local_db_dump.sql"
    echo "   📊 Checking article count..."
    ARTICLE_COUNT=$(psql -U "$DB_USER" -h "$DB_HOST" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM aikovrr.news_newsarticle;")
    echo "   📰 Local database has $ARTICLE_COUNT articles"
else
    echo "   ⚠️  Warning: Failed to dump local database"
fi

# Clear password from environment
unset PGPASSWORD
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
echo "   http://$VM_IP:8000"
echo ""
echo "🔑 Admin login:"
echo "   http://$VM_IP:8000/admin/"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
