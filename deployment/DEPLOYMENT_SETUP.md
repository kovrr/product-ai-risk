# Deployment Setup Guide

This guide helps you configure the deployment script for your local environment.

## 🚀 Quick Start

### 1. Create Your `.env` File

Copy the example environment file to create your own:

```bash
cd /path/to/aikovrr
cp .env.example .env
```

### 2. Configure Deployment Variables

Edit `.env` and update the following variables for your setup:

```bash
# =============================================================================
# GCloud Deployment Configuration
# =============================================================================

# Your GCloud VM name
GCLOUD_VM_NAME=platform

# Your GCloud zone
GCLOUD_ZONE=us-central1-f

# Your GCloud VM IP address
GCLOUD_VM_IP=136.113.138.156

# Your local project directory (absolute path)
LOCAL_PROJECT_DIR=/Users/yourname/CascadeProjects/aikovrr

# =============================================================================
# Database Configuration (for local dump)
# =============================================================================

# PostgreSQL database name
DB_NAME=aikovrr

# PostgreSQL user
DB_USER=postgres

# PostgreSQL password (leave empty if no password)
DB_PASSWORD=

# PostgreSQL host
DB_HOST=localhost

# PostgreSQL port
DB_PORT=5432
```

### 3. Run Deployment

```bash
cd deployment
./deploy.sh
```

## 📋 Configuration Details

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GCLOUD_VM_NAME` | Name of your GCloud VM instance | `platform` |
| `GCLOUD_ZONE` | GCloud zone where VM is located | `us-central1-f` |
| `GCLOUD_VM_IP` | Public IP address of your VM | `136.113.138.156` |
| `LOCAL_PROJECT_DIR` | Absolute path to your project | `/Users/yourname/CascadeProjects/aikovrr` |

### Database Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_NAME` | PostgreSQL database name | `aikovrr` |
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password (optional) | _(empty)_ |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |

## 👥 Multi-Developer Setup

### Developer 1 (Liran)

```bash
# .env
GCLOUD_VM_NAME=platform
GCLOUD_ZONE=us-central1-f
GCLOUD_VM_IP=136.113.138.156
LOCAL_PROJECT_DIR=/Users/liransorani/CascadeProjects/aikovrr

DB_NAME=aikovrr
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
```

### Developer 2 (Example)

```bash
# .env
GCLOUD_VM_NAME=my-vm-instance
GCLOUD_ZONE=europe-west1-b
GCLOUD_VM_IP=34.77.123.456
LOCAL_PROJECT_DIR=/Users/otherdeveloper/projects/aikovrr

DB_NAME=aikovrr
DB_USER=postgres
DB_PASSWORD=mypassword
DB_HOST=localhost
```

## 🔍 What the Script Does

The `deploy.sh` script now:

1. ✅ **Loads `.env` file** - Reads your configuration
2. ✅ **Validates configuration** - Checks if `.env` exists
3. ✅ **Shows configuration** - Displays what it will use
4. ✅ **Dumps database** - Uses your DB credentials
5. ✅ **Creates package** - Bundles your code
6. ✅ **Uploads to VM** - Uses your VM name and zone
7. ✅ **Deploys** - Runs deployment on your VM
8. ✅ **Shows URLs** - Uses your VM IP address

## ⚠️ Important Notes

### Security

- **Never commit `.env` to git** - It's already in `.gitignore`
- Keep your database passwords secure
- Use strong passwords in production

### Database Password

If your PostgreSQL requires a password:

```bash
DB_PASSWORD=yourpassword
```

If no password is required (local development):

```bash
DB_PASSWORD=
```

### Path Configuration

Make sure `LOCAL_PROJECT_DIR` is the **absolute path** to your project:

```bash
# ✅ Correct
LOCAL_PROJECT_DIR=/Users/yourname/CascadeProjects/aikovrr

# ❌ Wrong (relative path)
LOCAL_PROJECT_DIR=~/CascadeProjects/aikovrr

# ❌ Wrong (missing trailing directory)
LOCAL_PROJECT_DIR=/Users/yourname/CascadeProjects
```

## 🐛 Troubleshooting

### Error: `.env file not found`

**Solution**: Create your `.env` file:

```bash
cp .env.example .env
```

### Error: `pg_dump: connection failed`

**Solution**: Check your database configuration in `.env`:

```bash
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword  # if required
DB_NAME=aikovrr
```

### Error: `gcloud compute scp failed`

**Solution**: Check your GCloud configuration:

```bash
GCLOUD_VM_NAME=platform
GCLOUD_ZONE=us-central1-f
```

Verify VM exists:

```bash
gcloud compute instances list
```

## 📝 Example Workflow

### First Time Setup

```bash
# 1. Copy example file
cp .env.example .env

# 2. Edit with your values
nano .env  # or use your preferred editor

# 3. Verify configuration
cat .env | grep GCLOUD

# 4. Run deployment
cd deployment
./deploy.sh
```

### Daily Deployment

```bash
# Just run the script - it uses your .env
cd deployment
./deploy.sh
```

## 🔄 Switching Between Environments

If you have multiple VMs (dev, staging, prod), you can:

### Option 1: Multiple `.env` files

```bash
.env.dev
.env.staging
.env.prod
```

Then copy the one you need:

```bash
cp .env.staging .env
./deployment/deploy.sh
```

### Option 2: Environment-specific scripts

```bash
# deploy-dev.sh
export GCLOUD_VM_NAME=dev-vm
export GCLOUD_ZONE=us-central1-f
./deploy.sh

# deploy-prod.sh
export GCLOUD_VM_NAME=prod-vm
export GCLOUD_ZONE=europe-west1-b
./deploy.sh
```

## ✅ Verification

After deployment, verify it worked:

```bash
# Check the output shows your VM IP
# You should see:
# 🌐 Access your application:
#    http://YOUR_VM_IP:8000
```

Visit the URL to confirm the application is running.

---

**Last Updated**: December 3, 2025  
**Maintainer**: Liran Sorani
