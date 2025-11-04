# AIKovrr Docker Setup Guide

This guide explains how to run AIKovrr using Docker containers for a consistent development and production environment.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Development Workflow](#development-workflow)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)
- [Commands Reference](#commands-reference)

## Overview

AIKovrr uses Docker Compose to orchestrate three services:

1. **Database (PostgreSQL)**: Stores application data with automatic schema initialization
2. **Backend (Django)**: REST API server with automatic migrations and demo data setup
3. **Frontend (React)**: User interface served by Vite (dev) or nginx (prod)

## Prerequisites

- **Docker Desktop**: Install from [docker.com](https://www.docker.com/products/docker-desktop)
- **Docker Compose**: Included with Docker Desktop
- **Git**: For cloning the repository

Verify installation:
```bash
docker --version          # Should be 20.10+
docker-compose --version  # Should be 2.0+
```

## Quick Start

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd product-ai-risk
```

### 2. Create Environment File
```bash
cp .env.example .env
```

Edit `.env` and set Docker-specific values:
```bash
# Use 'db' as the host (Docker service name)
DB_HOST=db
DB_PASSWORD=postgres
```

### 3. Start All Services
```bash
docker-compose up
```

This command will:
- Download PostgreSQL image
- Build backend and frontend images
- Create and initialize database with demo data
- Start all three services
- Show logs from all containers

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Database**: localhost:5432 (from host machine)

### 5. Login

Use demo credentials:
- **Admin**: admin / Khri2025
- **Analyst**: or / password123

## Architecture

### Container Structure

```
┌─────────────────────────────────────────────────────────┐
│                  Docker Network (aikovrr-network)        │
│                                                           │
│  ┌──────────────┐      ┌──────────────┐      ┌────────┐│
│  │   Frontend   │─────▶│   Backend    │─────▶│  DB    ││
│  │  (React 19)  │      │  (Django 4.2)│      │(Postgres││
│  │  Port: 5173  │      │  Port: 8000  │      │ 14)    ││
│  │  Vite Dev    │      │  Runserver   │      │Port:   ││
│  │  Server      │      │  Hot-reload  │      │5432    ││
│  └──────────────┘      └──────────────┘      └────────┘│
│                                                           │
│  Volumes:                                                 │
│  - postgres_data (persistent database)                   │
│  - ./backend:/app (hot-reload)                          │
│  - ./frontend:/app (hot-reload)                         │
└─────────────────────────────────────────────────────────┘
```

### Services

#### 1. Database Service (`db`)
- **Image**: postgres:14-alpine
- **Purpose**: PostgreSQL database
- **Initialization**: Automatic via `/docker-entrypoint-initdb.d/`
  - `01-init.sh`: Creates aikovrr schema
  - `02-schema.sql`: Creates all tables
  - `03-data.sql`: Inserts demo data
- **Volume**: `postgres_data` for persistence
- **Health Check**: pg_isready every 5 seconds

#### 2. Backend Service (`backend`)
- **Base Image**: python:3.9-slim
- **Purpose**: Django REST API
- **Entrypoint**: `entrypoint.sh`
  - Waits for database
  - Runs migrations
  - Sets demo passwords
  - Starts Django server
- **Hot Reload**: Enabled via volume mount
- **Environment**: Configured via .env file

#### 3. Frontend Service (`frontend`)
- **Base Image**: node:20-alpine (dev) / nginx:alpine (prod)
- **Purpose**: React UI
- **Hot Reload**: Enabled via volume mount
- **Development**: Vite dev server with HMR
- **Production**: Static files served by nginx

## Configuration

### Environment Variables

The `.env` file controls all configuration. Key variables:

#### Database Configuration
```bash
DB_HOST=db              # Docker service name
DB_NAME=aikovrr
DB_USER=postgres
DB_PASSWORD=postgres    # Set a password for Docker
DB_PORT=5432
```

#### Django Configuration
```bash
SECRET_KEY=<your-secret-key>
DEBUG=True              # False in production
ALLOWED_HOSTS=*         # Specify domains in production
```

#### Frontend Configuration
```bash
VITE_API_URL=http://localhost:8000/api
```

#### Docker Configuration
```bash
COMPOSE_PROJECT_NAME=aikovrr  # Prefix for containers/volumes
```

### Configuration Modes

#### Local Development (Docker)
```bash
DB_HOST=db
DB_PASSWORD=postgres
DEBUG=True
VITE_API_URL=http://localhost:8000/api
```

#### Production
```bash
DB_HOST=db
DB_PASSWORD=<strong-password>
SECRET_KEY=<new-secret-key>
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
VITE_API_URL=https://yourdomain.com/api
```

## Development Workflow

### Starting Services

**Start all services (foreground with logs):**
```bash
docker-compose up
```

**Start all services (background):**
```bash
docker-compose up -d
```

**Start specific service:**
```bash
docker-compose up backend
```

### Viewing Logs

**All services:**
```bash
docker-compose logs -f
```

**Specific service:**
```bash
docker-compose logs -f backend
```

**Last 100 lines:**
```bash
docker-compose logs --tail=100 backend
```

### Stopping Services

**Stop all services:**
```bash
docker-compose down
```

**Stop and remove volumes (deletes database):**
```bash
docker-compose down -v
```

### Rebuilding Images

**Rebuild after code/dependency changes:**
```bash
docker-compose build
```

**Rebuild without cache:**
```bash
docker-compose build --no-cache
```

**Rebuild and restart:**
```bash
docker-compose up --build
```

### Executing Commands in Containers

**Run Django management commands:**
```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
docker-compose exec backend python manage.py shell
```

**Access PostgreSQL:**
```bash
docker-compose exec db psql -U postgres -d aikovrr
```

**Access container shell:**
```bash
docker-compose exec backend bash
docker-compose exec frontend sh
```

**Run npm commands:**
```bash
docker-compose exec frontend npm install
docker-compose exec frontend npm run build
```

### Hot Reload

Both backend and frontend support hot reload in development:

- **Backend**: Django's runserver auto-reloads on Python file changes
- **Frontend**: Vite's HMR updates browser on React file changes

No container restart needed!

### Resetting the Environment

**Full reset (database + containers):**
```bash
docker-compose down -v
docker-compose up --build
```

**Reset database only:**
```bash
docker-compose down -v db
docker-compose up db
```

## Production Deployment

### Using docker-compose.prod.yml

Production configuration uses:
- Gunicorn instead of runserver
- nginx instead of Vite dev server
- No volume mounts (code baked into images)
- Enhanced security and health checks

### Production Setup

1. **Create production .env:**
```bash
SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DB_HOST=db
DB_PASSWORD=<strong-random-password>
VITE_API_URL=https://yourdomain.com/api
```

2. **Build production images:**
```bash
docker-compose -f docker-compose.prod.yml build
```

3. **Start production services:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

4. **Verify services:**
```bash
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs
```

### Production Notes

- Frontend runs on port 80 (nginx)
- Backend uses Gunicorn with 4 workers
- Database port NOT exposed externally
- Static files served by nginx
- HTTPS setup requires reverse proxy (nginx/traefik)

## Troubleshooting

### Common Issues

#### 1. "Port already in use"

**Problem**: Port 5432, 8000, or 5173 already in use

**Solution**:
```bash
# Find process using port
lsof -i :5432
lsof -i :8000
lsof -i :5173

# Kill process or stop existing services
docker-compose down

# Or change ports in docker-compose.yml
```

#### 2. "Database connection failed"

**Problem**: Backend can't connect to database

**Solution**:
```bash
# Check DB_HOST in .env
DB_HOST=db  # Must be 'db', not 'localhost'

# Check database container status
docker-compose ps db
docker-compose logs db

# Restart services
docker-compose restart backend
```

#### 3. "Permission denied"

**Problem**: Entrypoint scripts not executable

**Solution**:
```bash
chmod +x backend/entrypoint.sh
chmod +x database/init-db.sh
docker-compose build --no-cache
```

#### 4. "Module not found" in backend

**Problem**: Python dependencies not installed

**Solution**:
```bash
# Rebuild backend image
docker-compose build --no-cache backend
docker-compose up backend
```

#### 5. "npm install errors" in frontend

**Problem**: Node modules not installed or corrupted

**Solution**:
```bash
# Remove node_modules volume
docker-compose down
docker volume rm aikovrr_node_modules

# Rebuild frontend
docker-compose build --no-cache frontend
docker-compose up frontend
```

#### 6. Database not initializing

**Problem**: SQL files not running

**Solution**:
```bash
# Remove database volume to trigger re-initialization
docker-compose down -v
docker volume rm aikovrr_postgres_data

# Start fresh
docker-compose up db
```

### Debugging Tips

**Check container status:**
```bash
docker-compose ps
```

**View real-time logs:**
```bash
docker-compose logs -f
```

**Inspect container:**
```bash
docker-compose exec backend env  # View environment variables
docker inspect aikovrr-backend   # Full container details
```

**Check network connectivity:**
```bash
docker-compose exec backend ping db
docker-compose exec backend curl http://db:5432
```

**Access database directly:**
```bash
docker-compose exec db psql -U postgres -d aikovrr -c "SELECT COUNT(*) FROM aikovrr.core_tenant;"
```

## Commands Reference

### Docker Compose Commands

| Command | Description |
|---------|-------------|
| `docker-compose up` | Start all services (foreground) |
| `docker-compose up -d` | Start all services (background) |
| `docker-compose down` | Stop all services |
| `docker-compose down -v` | Stop and remove volumes |
| `docker-compose ps` | List containers |
| `docker-compose logs -f` | View logs |
| `docker-compose build` | Build images |
| `docker-compose build --no-cache` | Rebuild from scratch |
| `docker-compose restart <service>` | Restart service |
| `docker-compose exec <service> <cmd>` | Run command in container |

### Service-Specific Commands

#### Backend (Django)
```bash
# Migrations
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py makemigrations

# User management
docker-compose exec backend python manage.py createsuperuser
docker-compose exec backend python manage.py changepassword admin

# Django shell
docker-compose exec backend python manage.py shell

# Collect static files (production)
docker-compose exec backend python manage.py collectstatic
```

#### Database (PostgreSQL)
```bash
# Access psql
docker-compose exec db psql -U postgres -d aikovrr

# Backup database
docker-compose exec db pg_dump -U postgres aikovrr > backup.sql

# Restore database
cat backup.sql | docker-compose exec -T db psql -U postgres -d aikovrr

# Check table count
docker-compose exec db psql -U postgres -d aikovrr -c "\dt aikovrr.*"
```

#### Frontend (React)
```bash
# Install dependencies
docker-compose exec frontend npm install

# Build for production
docker-compose exec frontend npm run build

# Run linter
docker-compose exec frontend npm run lint
```

### Docker Image Management

```bash
# List images
docker images

# Remove specific image
docker rmi product-ai-risk-backend

# Remove all unused images
docker image prune -a

# Check image size
docker images product-ai-risk-backend
```

### Volume Management

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect aikovrr_postgres_data

# Remove volume
docker volume rm aikovrr_postgres_data

# Remove all unused volumes
docker volume prune
```

## Comparison: Docker vs Local Setup

| Aspect | Docker | Local (setup.sh) |
|--------|--------|------------------|
| **Setup Time** | 5 minutes | 5-10 minutes |
| **Dependencies** | Docker only | PostgreSQL, Python 3.9, Node 20+ |
| **Consistency** | ✅ Identical across machines | ⚠️ Depends on local setup |
| **Isolation** | ✅ Fully isolated | ⚠️ Shares system resources |
| **Reset** | `docker-compose down -v` | Manual teardown |
| **Hot Reload** | ✅ Supported | ✅ Supported |
| **Performance** | ⚠️ Slight overhead | ✅ Native speed |
| **Production** | ✅ Same as dev | ⚠️ Requires different setup |

## Next Steps

After setting up Docker:

1. **Explore the Application**: Login and test features
2. **Read Architecture Docs**: Check `CLAUDE.md` for system design
3. **Make Changes**: Edit code and see hot-reload in action
4. **Run Tests**: `docker-compose exec backend python manage.py test`
5. **Plan Deployment**: Review production configuration

## Support

- **Documentation**: Check `README.md` and `CLAUDE.md`
- **Issues**: Report at [GitHub Issues](https://github.com/your-repo/issues)
- **Docker Docs**: https://docs.docker.com/compose/

---

**Happy Dockerizing! 🐳**
