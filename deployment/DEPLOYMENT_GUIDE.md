# 🚀 AIKovrr GCloud Deployment Guide

**Target VM**: Debian GNU/Linux 12 (bookworm)  
**External IP**: 35.202.143.181  
**Zone**: us-central1-f  
**Date**: November 9, 2025

---

## 📋 Prerequisites

- ✅ GCloud VM running Debian 12
- ✅ SSH access via IAP tunnel
- ✅ Local AIKovrr project ready

---

## 🎯 Quick Deployment (3 Steps)

### Step 1: Prepare Deployment Package (Local Machine)

```bash
cd /Users/liransorani/CascadeProjects/aikovrr

# Create deployment package
tar -czf aikovrr-deploy.tar.gz \
  backend/ \
  frontend/ \
  database/ \
  deployment/ \
  --exclude='backend/venv' \
  --exclude='backend/__pycache__' \
  --exclude='backend/*/__pycache__' \
  --exclude='backend/*/*/__pycache__' \
  --exclude='backend/staticfiles' \
  --exclude='backend/media' \
  --exclude='frontend/node_modules' \
  --exclude='frontend/dist' \
  --exclude='frontend/.vite'
```

**Package size**: ~5-10 MB (without node_modules and venv)

---

### Step 2: Copy Files to VM

```bash
# Copy deployment package
gcloud compute scp aikovrr-deploy.tar.gz platform:/tmp/ \
  --zone us-central1-f \
  --tunnel-through-iap

# Connect to VM
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap
```

---

### Step 3: Run Deployment Script (On VM)

```bash
# Extract files
sudo mkdir -p /opt/aikovrr
sudo tar -xzf /tmp/aikovrr-deploy.tar.gz -C /opt/aikovrr
sudo chown -R $USER:$USER /opt/aikovrr

# Make script executable
chmod +x /opt/aikovrr/deployment/deploy_to_gcloud.sh

# Run deployment
cd /opt/aikovrr
./deployment/deploy_to_gcloud.sh
```

**Deployment time**: ~10-15 minutes

---

## 🔧 What the Script Does

1. ✅ Updates system packages
2. ✅ Installs Python 3, PostgreSQL, Nginx, Node.js 20
3. ✅ Configures PostgreSQL (creates database, sets password)
4. ✅ Imports database schema and data
5. ✅ Sets up Python virtual environment
6. ✅ Installs Python dependencies
7. ✅ Runs Django migrations
8. ✅ Creates Django superuser (admin/admin123)
9. ✅ Collects static files
10. ✅ Installs frontend dependencies
11. ✅ Builds frontend (production)
12. ✅ Configures Nginx reverse proxy
13. ✅ Creates systemd service for Django
14. ✅ Installs Gunicorn
15. ✅ Starts all services
16. ✅ Configures firewall

---

## 🌐 Access Your Application

**Frontend**: http://35.202.143.181  
**Django Admin**: http://35.202.143.181/admin/  
**API**: http://35.202.143.181/api/

**Admin Credentials**:
- Username: `admin`
- Password: `admin123`

---

## 📊 Service Management

### Check Service Status
```bash
# Backend
sudo systemctl status aikovrr-backend

# Nginx
sudo systemctl status nginx

# PostgreSQL
sudo systemctl status postgresql
```

### Restart Services
```bash
# Backend
sudo systemctl restart aikovrr-backend

# Nginx
sudo systemctl restart nginx
```

### View Logs
```bash
# Backend logs (live)
sudo journalctl -u aikovrr-backend -f

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Nginx access logs
sudo tail -f /var/log/nginx/access.log
```

---

## 🔄 Update Application

When you make changes locally:

```bash
# On local machine
cd /Users/liransorani/CascadeProjects/aikovrr
tar -czf aikovrr-update.tar.gz backend/ frontend/ --exclude='backend/venv' --exclude='frontend/node_modules'
gcloud compute scp aikovrr-update.tar.gz platform:/tmp/ --zone us-central1-f --tunnel-through-iap

# On VM
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap
sudo tar -xzf /tmp/aikovrr-update.tar.gz -C /opt/aikovrr
cd /opt/aikovrr/backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
cd /opt/aikovrr/frontend
npm install
npm run build
sudo systemctl restart aikovrr-backend
sudo systemctl restart nginx
```

---

## 🗄️ Database Management

### Backup Database
```bash
sudo -u postgres pg_dump aikovrr > /tmp/aikovrr_backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore Database
```bash
sudo -u postgres psql -d aikovrr -f /path/to/backup.sql
```

### Access Database
```bash
sudo -u postgres psql -d aikovrr
```

---

## 🔒 Security Recommendations

### 1. Change Default Passwords
```bash
# Django admin
python manage.py changepassword admin

# PostgreSQL
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'NEW_STRONG_PASSWORD';"
```

### 2. Update Django Settings
Edit `/opt/aikovrr/backend/aikovrr/settings.py`:
```python
DEBUG = False
ALLOWED_HOSTS = ['35.202.143.181', 'your-domain.com']
SECRET_KEY = 'generate-new-secret-key'
```

### 3. Enable HTTPS (Optional)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate (requires domain name)
sudo certbot --nginx -d your-domain.com
```

---

## 🧪 Testing Checklist

After deployment, verify:

- [ ] Frontend loads at http://35.202.143.181
- [ ] Can login to Django admin
- [ ] API endpoints respond (check /api/risk/scenarios/)
- [ ] Database contains sample data
- [ ] All pages navigate correctly
- [ ] Charts and visualizations load
- [ ] Backend service is running
- [ ] Nginx is serving requests
- [ ] PostgreSQL is accessible

---

## 🚨 Troubleshooting

### Issue: Frontend shows blank page
```bash
# Check Nginx config
sudo nginx -t

# Check frontend build
cd /opt/aikovrr/frontend
npm run build

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Issue: API returns 502 Bad Gateway
```bash
# Check backend service
sudo systemctl status aikovrr-backend
sudo journalctl -u aikovrr-backend -n 50

# Restart backend
sudo systemctl restart aikovrr-backend
```

### Issue: Database connection error
```bash
# Check PostgreSQL
sudo systemctl status postgresql

# Check database exists
sudo -u postgres psql -l | grep aikovrr

# Check Django settings
cat /opt/aikovrr/backend/aikovrr/settings.py | grep DATABASES -A 10
```

---

## 📁 File Structure on VM

```
/opt/aikovrr/
├── backend/
│   ├── venv/              # Python virtual environment
│   ├── aikovrr/           # Django project
│   ├── core/              # Core app
│   ├── visibility/        # Visibility app
│   ├── risk/              # Risk app
│   ├── governance/        # Governance app
│   ├── manage.py
│   ├── requirements.txt
│   └── staticfiles/       # Collected static files
├── frontend/
│   ├── dist/              # Production build
│   ├── src/
│   ├── package.json
│   └── node_modules/
├── database/
│   ├── aikovrr_schema_v2.sql
│   └── aikovrr_data_v2_minimal.sql
└── deployment/
    ├── deploy_to_gcloud.sh
    └── DEPLOYMENT_GUIDE.md
```

---

## 📞 Support Commands

```bash
# System info
cat /etc/os-release
uname -a

# Disk usage
df -h

# Memory usage
free -h

# Running processes
ps aux | grep python
ps aux | grep nginx

# Network connections
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :8000
```

---

## ✅ Post-Deployment Checklist

- [ ] Application accessible via browser
- [ ] Django admin login works
- [ ] Database populated with sample data
- [ ] All services running and enabled
- [ ] Firewall configured
- [ ] Logs accessible
- [ ] Backup strategy in place
- [ ] Passwords changed from defaults
- [ ] DEBUG mode disabled in production

---

**Deployment Ready!** 🚀

For questions or issues, check the logs first:
```bash
sudo journalctl -u aikovrr-backend -f
sudo tail -f /var/log/nginx/error.log
```
