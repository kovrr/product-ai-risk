#!/bin/bash

# AIKovrr Deployment Script for Debian 12 (GCloud VM)
# Run this script on the target VM after copying files

set -e  # Exit on error

echo "🚀 AIKovrr Deployment Script"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
DB_NAME="aikovrr"
DB_USER="postgres"
DB_PASSWORD="Khri2025"
APP_DIR="/opt/aikovrr"
BACKEND_PORT=8001
FRONTEND_PORT=8000

echo -e "${BLUE}Step 1: Verify prerequisites${NC}"
echo "Checking Node.js: $(node --version 2>/dev/null || echo 'NOT FOUND')"
echo "Checking Python: $(python3 --version 2>/dev/null || echo 'NOT FOUND')"
echo "Checking PostgreSQL: $(psql --version 2>/dev/null || echo 'NOT FOUND')"
echo "Prerequisites check complete - skipping installation"

echo ""
echo -e "${BLUE}Step 2: Configure PostgreSQL${NC}"
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Set postgres user password
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '$DB_PASSWORD';"

# Create database
sudo -u postgres psql -c "DROP DATABASE IF EXISTS $DB_NAME;"
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"

echo ""
echo -e "${BLUE}Step 5: Import database schema and data${NC}"
sudo -u postgres psql -d $DB_NAME -f $APP_DIR/database/aikovrr_schema_v2.sql
sudo -u postgres psql -d $DB_NAME -f $APP_DIR/database/aikovrr_data_v2_minimal.sql

echo ""
echo -e "${BLUE}Step 6: Set up Python virtual environment${NC}"
cd $APP_DIR/backend
# Use existing venv if it exists, otherwise create new one
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

echo ""
echo -e "${BLUE}Step 7: Install Python dependencies${NC}"
echo "Skipping pip packages - using existing packages"
# pip install --upgrade pip
# pip install -r requirements.txt

echo ""
echo -e "${BLUE}Step 8: Configure Django settings${NC}"
# Django will use the settings.py we copied (already configured for postgres user)

echo ""
echo -e "${BLUE}Step 9: Run Django migrations${NC}"
python manage.py migrate

echo ""
echo -e "${BLUE}Step 10: Set user passwords${NC}"
python manage.py shell <<EOF
from core.models import AppUser
from django.contrib.auth.hashers import make_password

# All authorized users from USER_CREDENTIALS.md
users_passwords = [
    ('admin', 'admin123'),
    ('or', 'bTerAOX4xB'),
    ('shai', 'ZxItIMACEI'),
    ('yakir', 'qANLqq5fGZ'),
    ('naomi', 'AYAhgbGart'),
    ('huw', 'Sw4JTYmdZS'),
    ('alona', 'CSLVroXeJZ'),
    ('hannah', 'S2OeiSR0eX'),
    ('shalom', 'KCigje4XUE'),
]

for username, password in users_passwords:
    try:
        user = AppUser.objects.get(username=username)
        user.password = make_password(password)
        user.save()
        print(f'✅ Set password for {username}')
    except AppUser.DoesNotExist:
        print(f'⚠️  User {username} not found in database - skipping')
EOF

echo ""
echo -e "${BLUE}Step 10.5: News articles${NC}"
echo "✅ News articles are managed manually - no automatic fetching"

echo ""
echo -e "${BLUE}Step 11: Collect static files${NC}"
python manage.py collectstatic --noinput

echo ""
echo -e "${BLUE}Step 12: Install frontend dependencies${NC}"
cd $APP_DIR/frontend
echo "Skipping npm install - using existing node_modules"
# npm install --legacy-peer-deps

echo ""
echo -e "${BLUE}Step 13: Build frontend${NC}"
echo "Building frontend with latest changes..."
npm run build

echo ""
echo -e "${BLUE}Step 14: Configure Nginx${NC}"
sudo tee /etc/nginx/sites-available/aikovrr > /dev/null <<EOF
server {
    listen 8000;
    server_name 136.113.138.156;
    client_max_body_size 100M;

    # Frontend (React build)
    location / {
        root $APP_DIR/frontend/dist;
        try_files \$uri \$uri/ /index.html;
        
        # Cache busting for development
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Django admin
    location /admin/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Static files
    location /static/ {
        alias $APP_DIR/backend/staticfiles/;
    }

    # Media files
    location /media/ {
        alias $APP_DIR/backend/media/;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/aikovrr /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t

echo ""
echo -e "${BLUE}Step 16: Create systemd service for Django${NC}"
sudo tee /etc/systemd/system/aikovrr-backend.service > /dev/null <<EOF
[Unit]
Description=AIKovrr Django Backend
After=network.target postgresql.service

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR/backend
Environment="PATH=$APP_DIR/backend/venv/bin"
ExecStart=$APP_DIR/backend/venv/bin/gunicorn aikovrr.wsgi:application --bind 127.0.0.1:$BACKEND_PORT --workers 4 --timeout 120
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

echo ""
echo -e "${BLUE}Step 17: Install Gunicorn${NC}"
cd $APP_DIR/backend
source venv/bin/activate
pip install gunicorn

echo ""
echo -e "${BLUE}Step 18: Restart services with new configuration${NC}"
sudo systemctl daemon-reload
sudo systemctl enable aikovrr-backend
sudo systemctl restart aikovrr-backend
sudo systemctl enable nginx
sudo systemctl restart nginx
echo "Services restarted successfully"

echo ""
echo -e "${BLUE}Step 19: Firewall managed by GCP, skipping ufw configuration${NC}"

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo ""
echo "================================"
echo "🎉 AIKovrr is now running!"
echo "================================"
echo ""
echo "Access your application at:"
echo "  http://136.113.138.156:8000"
echo ""
echo "Django Admin:"
echo "  http://136.113.138.156:8000/admin/"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
echo "Service Status:"
echo "  Backend: sudo systemctl status aikovrr-backend"
echo "  Nginx: sudo systemctl status nginx"
echo "  PostgreSQL: sudo systemctl status postgresql"
echo ""
echo "Logs:"
echo "  Backend: sudo journalctl -u aikovrr-backend -f"
echo "  Nginx: sudo tail -f /var/log/nginx/error.log"
echo ""
