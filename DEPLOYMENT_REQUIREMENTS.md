# AIKovrr - Linux Server Deployment Requirements

**Document Version**: 1.0  
**Date**: November 5, 2025  
**Project**: AIKovrr Platform

---

## 📋 Executive Summary

AIKovrr is a full-stack web application consisting of:
- **Frontend**: React + Vite (SPA)
- **Backend**: Django REST Framework
- **Database**: PostgreSQL
- **Architecture**: Separate frontend/backend services

---

## 🖥️ Server Specifications

### Minimum Requirements (Development/Staging)

| Component | Specification |
|-----------|--------------|
| **CPU** | 2 vCPUs (x86_64) |
| **RAM** | 4 GB |
| **Storage** | 20 GB SSD |
| **OS** | Ubuntu 22.04 LTS or RHEL 8+ |
| **Network** | 1 Gbps network interface |

### Recommended Requirements (Production)

| Component | Specification |
|-----------|--------------|
| **CPU** | 4 vCPUs (x86_64) |
| **RAM** | 8 GB |
| **Storage** | 50 GB SSD (with auto-scaling) |
| **OS** | Ubuntu 22.04 LTS or RHEL 8+ |
| **Network** | 1 Gbps network interface |
| **Backup** | Daily automated backups |

### High-Availability Production (Recommended)

| Component | Specification |
|-----------|--------------|
| **Application Servers** | 2+ instances (load balanced) |
| **CPU per instance** | 4 vCPUs |
| **RAM per instance** | 8 GB |
| **Database Server** | Separate dedicated instance |
| **DB CPU** | 4 vCPUs |
| **DB RAM** | 16 GB |
| **DB Storage** | 100 GB SSD (with auto-scaling) |
| **Load Balancer** | Nginx or HAProxy |
| **Reverse Proxy** | Nginx |

---

## 🐧 Operating System Requirements

### Supported Linux Distributions

1. **Ubuntu 22.04 LTS** (Recommended)
   - Long-term support until 2027
   - Best package availability
   - Proven stability

2. **Ubuntu 20.04 LTS**
   - Supported until 2025

3. **Red Hat Enterprise Linux (RHEL) 8+**
   - Enterprise support available

4. **CentOS Stream 9**
   - Community alternative to RHEL

5. **Debian 11 (Bullseye)**
   - Stable and lightweight

### Kernel Requirements
- **Minimum Kernel Version**: 5.4+
- **Recommended**: Latest stable kernel for your distribution

---

## 📦 Software Dependencies

### System Packages (Ubuntu/Debian)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Essential build tools
sudo apt install -y build-essential curl wget git

# Python 3.9+ (Backend)
sudo apt install -y python3.9 python3.9-dev python3-pip python3-venv

# Node.js 18+ (Frontend)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# PostgreSQL 14+
sudo apt install -y postgresql postgresql-contrib libpq-dev

# Nginx (Reverse Proxy)
sudo apt install -y nginx

# SSL/TLS
sudo apt install -y certbot python3-certbot-nginx

# Process Manager
sudo apt install -y supervisor

# Monitoring tools (optional)
sudo apt install -y htop iotop nethogs
```

### System Packages (RHEL/CentOS)

```bash
# Update system
sudo dnf update -y

# Essential build tools
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y curl wget git

# Python 3.9+
sudo dnf install -y python39 python39-devel python39-pip

# Node.js 18+
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs

# PostgreSQL 14+
sudo dnf install -y postgresql-server postgresql-contrib postgresql-devel

# Nginx
sudo dnf install -y nginx

# SSL/TLS
sudo dnf install -y certbot python3-certbot-nginx

# Process Manager
sudo dnf install -y supervisor
```

---

## 🗄️ Database Requirements

### PostgreSQL Configuration

**Version**: PostgreSQL 14 or higher

**Database Specifications**:
- **Database Name**: `aikovrr_db`
- **Character Set**: UTF-8
- **Collation**: en_US.UTF-8
- **Timezone**: UTC

**Minimum PostgreSQL Settings** (`postgresql.conf`):
```ini
max_connections = 100
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
work_mem = 2621kB
min_wal_size = 1GB
max_wal_size = 4GB
```

**Recommended Production Settings**:
```ini
max_connections = 200
shared_buffers = 2GB
effective_cache_size = 6GB
maintenance_work_mem = 512MB
work_mem = 10MB
```

---

## 🌐 Network & Port Requirements

### Required Open Ports

| Port | Protocol | Service | Access |
|------|----------|---------|--------|
| **80** | TCP | HTTP (Nginx) | Public |
| **443** | TCP | HTTPS (Nginx) | Public |
| **22** | TCP | SSH | Admin only |
| **5432** | TCP | PostgreSQL | Internal only |
| **8000** | TCP | Django (internal) | Internal only |
| **5173** | TCP | Vite Dev (dev only) | Internal only |

### Firewall Configuration (UFW - Ubuntu)

```bash
# Enable firewall
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# PostgreSQL (internal only - adjust IP range)
sudo ufw allow from 10.0.0.0/8 to any port 5432

# Check status
sudo ufw status
```

### Firewall Configuration (firewalld - RHEL/CentOS)

```bash
# Enable firewall
sudo systemctl enable --now firewalld

# Allow HTTP/HTTPS
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https

# Allow SSH
sudo firewall-cmd --permanent --add-service=ssh

# Reload
sudo firewall-cmd --reload
```

---

## 🔐 Security Requirements

### SSL/TLS Certificate
- **Required**: Valid SSL certificate for HTTPS
- **Recommended**: Let's Encrypt (free, auto-renewal)
- **Alternative**: Commercial SSL certificate

### User Permissions
```bash
# Create application user (non-root)
sudo useradd -m -s /bin/bash aikovrr
sudo usermod -aG sudo aikovrr  # Optional: sudo access

# Create application directory
sudo mkdir -p /opt/aikovrr
sudo chown -R aikovrr:aikovrr /opt/aikovrr
```

### Security Hardening
- **SSH**: Disable root login, use key-based authentication
- **Firewall**: Enable and configure (UFW or firewalld)
- **SELinux**: Enable (RHEL/CentOS) or AppArmor (Ubuntu)
- **Fail2ban**: Install for brute-force protection
- **Automatic Updates**: Enable security updates

---

## 📁 Directory Structure

```
/opt/aikovrr/
├── frontend/              # React application
│   ├── dist/             # Production build
│   └── node_modules/
├── backend/              # Django application
│   ├── venv/            # Python virtual environment
│   ├── static/          # Static files
│   ├── media/           # User uploads
│   └── logs/            # Application logs
├── nginx/               # Nginx configuration
├── supervisor/          # Process management
└── backups/            # Database backups
```

---

## 🔧 Runtime Dependencies

### Python Dependencies (Backend)
```
Django==4.2.7
djangorestframework==3.14.0
psycopg2-binary==2.9.9
django-cors-headers==4.3.1
python-dotenv==1.0.0
gunicorn==21.2.0
whitenoise==6.6.0
```

### Node.js Dependencies (Frontend)
```
react==18.2.0
react-dom==18.2.0
react-router-dom==6.20.0
vite==5.0.0
typescript==5.3.3
```

---

## 🚀 Deployment Architecture

### Recommended Production Setup

```
Internet
    ↓
[Load Balancer / Nginx]
    ↓
[Reverse Proxy - Nginx]
    ↓
┌─────────────────┬──────────────────┐
│  Frontend       │   Backend        │
│  (Static Files) │   (Django/Gunicorn)│
│  Port: 80/443   │   Port: 8000     │
└─────────────────┴──────────────────┘
                    ↓
            [PostgreSQL Database]
                Port: 5432
```

### Process Management
- **Backend**: Gunicorn (4 workers) managed by Supervisor
- **Frontend**: Static files served by Nginx
- **Database**: PostgreSQL service

---

## 📊 Monitoring & Logging

### Required Monitoring
- **System Metrics**: CPU, RAM, Disk, Network
- **Application Logs**: Django logs, Nginx access/error logs
- **Database Metrics**: Connection count, query performance
- **Uptime Monitoring**: Health check endpoints

### Log Locations
```
/var/log/nginx/access.log
/var/log/nginx/error.log
/opt/aikovrr/backend/logs/django.log
/var/log/postgresql/postgresql-14-main.log
/var/log/supervisor/
```

### Recommended Monitoring Tools
- **System**: Prometheus + Grafana
- **Logs**: ELK Stack or Loki
- **Uptime**: UptimeRobot or Pingdom
- **APM**: New Relic or DataDog (optional)

---

## 🔄 Backup Requirements

### Database Backups
- **Frequency**: Daily automated backups
- **Retention**: 30 days minimum
- **Method**: `pg_dump` with compression
- **Storage**: Off-site backup storage (S3, Azure Blob, etc.)

### Application Backups
- **Code**: Git repository (already backed up)
- **Media Files**: Daily sync to object storage
- **Configuration**: Version controlled

### Backup Script Example
```bash
#!/bin/bash
# /opt/aikovrr/scripts/backup.sh

BACKUP_DIR="/opt/aikovrr/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="aikovrr_db"

# Create backup
pg_dump -U postgres $DB_NAME | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Upload to S3 (optional)
# aws s3 cp $BACKUP_DIR/db_backup_$DATE.sql.gz s3://your-bucket/backups/

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +30 -delete
```

---

## 🌍 Environment Variables

### Required Environment Variables

**Backend (.env)**:
```bash
# Django Settings
SECRET_KEY=<generate-secure-key>
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database
DATABASE_NAME=aikovrr_db
DATABASE_USER=aikovrr_user
DATABASE_PASSWORD=<secure-password>
DATABASE_HOST=localhost
DATABASE_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=https://yourdomain.com

# Static/Media Files
STATIC_ROOT=/opt/aikovrr/backend/static
MEDIA_ROOT=/opt/aikovrr/backend/media
```

**Frontend (.env.production)**:
```bash
VITE_API_URL=https://yourdomain.com/api
VITE_APP_ENV=production
```

---

## 📞 Support & Contact

### Technical Contacts
- **Project Lead**: [Your Name]
- **DevOps Lead**: [DevOps Contact]
- **Emergency Contact**: [Emergency Number]

### Documentation
- **GitHub Repository**: [Repository URL]
- **API Documentation**: [API Docs URL]
- **Deployment Guide**: See `DEPLOYMENT_GUIDE.md`

---

## ✅ Pre-Deployment Checklist

- [ ] Linux server provisioned with required specs
- [ ] All system packages installed
- [ ] PostgreSQL installed and configured
- [ ] Nginx installed and configured
- [ ] SSL certificate obtained and installed
- [ ] Firewall configured and enabled
- [ ] Application user created
- [ ] Directory structure created
- [ ] Environment variables configured
- [ ] Backup scripts configured
- [ ] Monitoring tools installed
- [ ] Log rotation configured
- [ ] Health check endpoints tested
- [ ] Security hardening completed

---

## 📝 Notes

1. **Scaling**: For high traffic, consider horizontal scaling with multiple application servers behind a load balancer.

2. **Database**: For production, consider managed PostgreSQL (AWS RDS, Azure Database, Google Cloud SQL) for easier maintenance.

3. **CDN**: Consider using a CDN (CloudFlare, AWS CloudFront) for static assets.

4. **Container Option**: This application can also be containerized with Docker/Kubernetes if preferred.

5. **Cost Estimate**: 
   - **Minimum Setup**: $20-40/month (single VPS)
   - **Recommended Setup**: $100-200/month (separate app/db servers)
   - **HA Production**: $300-500/month (load balanced, managed DB)

---

**Document Prepared By**: Cascade AI  
**Last Updated**: November 5, 2025
