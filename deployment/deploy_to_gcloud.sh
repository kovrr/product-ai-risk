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
BACKEND_PORT=8000
FRONTEND_PORT=3000

echo -e "${BLUE}Step 1: Update system packages${NC}"
sudo apt-get update
sudo apt-get upgrade -y

echo ""
echo -e "${BLUE}Step 2: Install required packages${NC}"
sudo apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    postgresql \
    postgresql-contrib \
    nginx \
    git \
    curl \
    build-essential

echo ""
echo -e "${BLUE}Step 3: Install Node.js 20.x${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo ""
echo -e "${BLUE}Step 4: Configure PostgreSQL${NC}"
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
python3 -m venv venv
source venv/bin/activate

echo ""
echo -e "${BLUE}Step 7: Install Python dependencies${NC}"
pip install --upgrade pip
pip install -r requirements.txt

echo ""
echo -e "${BLUE}Step 8: Configure Django settings${NC}"
# Django will use the settings.py we copied (already configured for postgres user)

echo ""
echo -e "${BLUE}Step 9: Run Django migrations${NC}"
python manage.py migrate

echo ""
echo -e "${BLUE}Step 10: Create Django superuser${NC}"
echo "from core.models import AppUser; AppUser.objects.create_superuser('admin', 'admin@aikovrr.com', 'admin123') if not AppUser.objects.filter(username='admin').exists() else None" | python manage.py shell

echo ""
echo -e "${BLUE}Step 11: Collect static files${NC}"
python manage.py collectstatic --noinput

echo ""
echo -e "${BLUE}Step 12: Install frontend dependencies${NC}"
cd $APP_DIR/frontend
npm install

echo ""
echo -e "${BLUE}Step 13: Build frontend${NC}"
npm run build

echo ""
echo -e "${BLUE}Step 14: Configure Nginx${NC}"
sudo tee /etc/nginx/sites-available/aikovrr > /dev/null <<EOF
server {
    listen 80;
    server_name 35.202.143.181;
    client_max_body_size 100M;

    # Frontend (React build)
    location / {
        root $APP_DIR/frontend/dist;
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:$BACKEND_PORT;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Django admin
    location /admin/ {
        proxy_pass http://127.0.0.1:$BACKEND_PORT;
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
sudo systemctl restart nginx

echo ""
echo -e "${BLUE}Step 15: Create systemd service for Django${NC}"
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
echo -e "${BLUE}Step 16: Install Gunicorn${NC}"
cd $APP_DIR/backend
source venv/bin/activate
pip install gunicorn

echo ""
echo -e "${BLUE}Step 17: Start services${NC}"
sudo systemctl daemon-reload
sudo systemctl enable aikovrr-backend
sudo systemctl start aikovrr-backend
sudo systemctl enable nginx
sudo systemctl restart nginx

echo ""
echo -e "${BLUE}Step 18: Configure firewall${NC}"
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
echo "y" | sudo ufw enable || true

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo ""
echo "================================"
echo "🎉 AIKovrr is now running!"
echo "================================"
echo ""
echo "Access your application at:"
echo "  http://35.202.143.181"
echo ""
echo "Django Admin:"
echo "  http://35.202.143.181/admin/"
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
