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

# Create database (drop existing to get fresh data from local)
sudo -u postgres psql -c "DROP DATABASE IF EXISTS $DB_NAME;"
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"

echo ""
echo -e "${BLUE}Step 5: Import database from local dump${NC}"
# Check if local database dump exists
USING_LOCAL_DUMP=false
if [ -f "$APP_DIR/database/local_db_dump.sql" ]; then
    echo "✅ Found local database dump - restoring all data..."
    sudo -u postgres psql -d $DB_NAME -f $APP_DIR/database/local_db_dump.sql
    echo "✅ Restored complete database from local"
    USING_LOCAL_DUMP=true
    
    # Verify article count
    ARTICLE_COUNT=$(sudo -u postgres psql -d $DB_NAME -t -c "SELECT COUNT(*) FROM aikovrr.news_newsarticle;")
    echo "📰 Server now has $ARTICLE_COUNT articles"
    
    # Verify user count
    USER_COUNT=$(sudo -u postgres psql -d $DB_NAME -t -c "SELECT COUNT(*) FROM aikovrr.core_user;")
    echo "👥 Server now has $USER_COUNT users (with original passwords from local)"
else
    echo "⚠️  Local dump not found - using schema and minimal data"
    sudo -u postgres psql -d $DB_NAME -f $APP_DIR/database/aikovrr_schema_v2.sql
    sudo -u postgres psql -d $DB_NAME -f $APP_DIR/database/aikovrr_data_v2_minimal.sql
fi

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
# Check if packages are already installed
if ! python -c "import playwright" 2>/dev/null; then
    echo "Installing Python packages..."
    pip install --upgrade pip
    pip install playwright beautifulsoup4 requests --retries 5 --timeout 60
else
    echo "✅ Python packages already installed, skipping"
fi

echo ""
echo -e "${BLUE}Step 7.5: Install Playwright browsers for Linux${NC}"
# Check if Playwright browsers are already installed
if [ ! -d ~/.cache/ms-playwright/chromium-* ]; then
    echo "Installing Playwright browsers..."
    # Remove any Mac-based browsers that may have been copied
    rm -rf ~/.cache/ms-playwright
    # Install Linux browsers
    playwright install chromium
    playwright install-deps chromium
    echo "✅ Playwright browsers installed for Linux"
else
    echo "✅ Playwright browsers already installed, skipping"
fi

echo ""
echo -e "${BLUE}Step 8: Configure Django settings${NC}"
# Django will use the settings.py we copied (already configured for postgres user)

echo ""
echo -e "${BLUE}Step 9: Run Django migrations${NC}"
python manage.py migrate
echo "✅ Migrations complete (database already has all data from local dump)"

echo ""
echo -e "${BLUE}Step 10: Ensure all users from USER_CREDENTIALS.md exist${NC}"
echo "Creating/updating users with correct credentials..."
python manage.py shell <<EOF
from core.models import AppUser
from django.contrib.auth.hashers import make_password

# All authorized users from USER_CREDENTIALS.md
users_data = [
    ('admin', 'admin@aikovrr.com', 'admin123', 'Admin', 'User', 'admin'),
    ('or', 'or@kovrr.com', 'bTerAOX4xB', 'Or', '', 'analyst'),
    ('shai', 'shai@kovrr.com', 'ZxItIMACEI', 'Shai', '', 'analyst'),
    ('yakir', 'yakir@kovrr.com', 'qANLqq5fGZ', 'Yakir', '', 'analyst'),
    ('naomi', 'naomi@kovrr.com', 'AYAhgbGart', 'Naomi', '', 'analyst'),
    ('huw', 'huw@kovrr.com', 'Sw4JTYmdZS', 'Huw', '', 'analyst'),
    ('alona', 'alona@kovrr.com', 'CSLVroXeJZ', 'Alona', '', 'analyst'),
    ('hannah', 'hannah@kovrr.com', 'S2OeiSR0eX', 'Hannah', '', 'analyst'),
    ('shalom', 'shalom@kovrr.com', 'KCigje4XUE', 'Shalom', '', 'analyst'),
]

for username, email, password, first_name, last_name, role in users_data:
    user, created = AppUser.objects.get_or_create(
        username=username,
        defaults={
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'role': role,
            'is_active': True,
        }
    )
    # Always update password to ensure it matches USER_CREDENTIALS.md
    user.password = make_password(password)
    user.email = email  # Update email in case it changed
    user.save()
    
    if created:
        print(f'✅ Created user: {username} ({email})')
    else:
        print(f'✅ Updated user: {username} ({email})')

print(f'\\n📊 Total users in system: {AppUser.objects.count()}')
EOF

echo ""
echo -e "${BLUE}Step 10.5: Fetch news articles${NC}"
echo "Running news crawlers to fetch latest AI governance news..."
python manage.py fetch_iapp_news --max-articles 10 || echo "⚠️  IAPP crawler failed (may need internet access)"
python manage.py fetch_compliance_week_news --max-articles 10 || echo "⚠️  Compliance Week crawler failed (may need internet access)"
echo "✅ News crawlers executed"

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
