# AIKovrr Database Setup

This directory contains PostgreSQL database schema and demo data for the AIKovrr application.

## Files

- `aikovrr_schema.sql` - Complete database schema with all tables, indexes, and constraints
- `aikovrr_data.sql` - Demo data for testing (tenant, users, AI assets, risk scenarios, etc.)

## Import Instructions

### 1. Create the Database (if not already created)

```bash
# Using default postgres user
createdb -U postgres aikovrr

# Or using your system user (macOS with Homebrew)
createdb aikovrr
```

### 2. Import Schema

```bash
# Navigate to database directory
cd database

# Using default postgres user
psql -U postgres -d aikovrr -f aikovrr_schema.sql

# Or using your system user (macOS with Homebrew)
psql -d aikovrr -f aikovrr_schema.sql
```

### 3. Import Demo Data

```bash
# Using default postgres user
psql -U postgres -d aikovrr -f aikovrr_data.sql

# Or using your system user (macOS with Homebrew)
psql -d aikovrr -f aikovrr_data.sql
```

### 4. Verify Import

```bash
psql -U postgres -d aikovrr -c "SELECT COUNT(*) FROM aikovrr.core_tenant;"
psql -U postgres -d aikovrr -c "SELECT COUNT(*) FROM aikovrr.visibility_ai_asset;"
psql -U postgres -d aikovrr -c "SELECT COUNT(*) FROM aikovrr.core_user;"
```

## One-Line Import (All at Once)

```bash
# Using postgres user
psql -U postgres -d aikovrr -f aikovrr_schema.sql && psql -U postgres -d aikovrr -f aikovrr_data.sql

# Using system user
psql -d aikovrr -f aikovrr_schema.sql && psql -d aikovrr -f aikovrr_data.sql
```

## Database Connection Details

- **Database Name**: `aikovrr`
- **Schema Name**: `aikovrr`
- **Host**: `localhost` (default) or `db` (for Docker)
- **Port**: `5432` (default)
- **User**: `postgres` (recommended) or your system username
- **Password**: Empty for local development (configure via environment variables)

## Django Configuration

Django settings are now configured via environment variables. Copy `.env.example` to `.env` and update:

```bash
# Copy the example environment file
cp .env.example .env

# Edit with your database credentials
# For local development with postgres user:
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aikovrr

# For Docker:
DB_HOST=db
```

The Django `settings.py` automatically reads these environment variables with sensible defaults.

## Demo Data Overview

### Application Users (Login Credentials)
These users can log into the AIKovrr application:

| Username | Email | Role | Password | Superuser |
|----------|-------|------|----------|----------|
| admin | admin@aikovrr.com | admin | password123 | Yes |
| or | or@kovrr.com | analyst | password123 | No |
| shai | shai@kovrr.com | analyst | password123 | No |
| liran | liran@kovrr.com | analyst | password123 | No |
| yakir | yakir@kovrr.com | analyst | password123 | No |

**Note**: Passwords are placeholders and will need to be set properly via Django's user management.

### Tenant
- **Swift Tech** - Main organization

### Departments (5)
- Engineering
- Marketing
- Sales
- Finance
- HR

### Organization Users (8)
These are users within the monitored organization (Swift Tech employees):
- Albert Tross (Engineering)
- Owen Authora (Engineering)
- Capt. Trunk (Engineering)
- Theodore T.C. Calvin (Marketing)
- Hannibal Smith (Marketing)
- Sarah Connor (Sales)
- John McClane (Finance)
- Ellen Ripley (HR)

### AI Assets (5)
- ChatGPT (Shadow)
- GitHub Copilot (Sanctioned)
- Jasper AI (Shadow)
- Grammarly (Sanctioned)
- Notion AI (Shadow)

### Risk Scenarios (2)
- Sensitive data exposure via ChatGPT
- Code vulnerability from AI suggestions

### Frameworks (3)
- NIST AI RMF 1.0
- ISO/IEC 42001 2023
- EU AI Act Draft

## Troubleshooting

### Permission Denied
If you get permission errors, ensure your PostgreSQL user has CREATE privileges:
```bash
psql -d postgres -c "ALTER USER your_user CREATEDB;"
```

### Database Already Exists
To reset the database:
```bash
dropdb aikovrr
createdb aikovrr
psql -d aikovrr -f aikovrr_schema.sql
psql -d aikovrr -f aikovrr_data.sql
```

### Connection Refused
Ensure PostgreSQL is running:
```bash
# macOS with Homebrew
brew services start postgresql

# Check status
brew services list
```
