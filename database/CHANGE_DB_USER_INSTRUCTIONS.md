# 🔄 Change Database User from `liransorani` to `postgres`

**Date**: November 9, 2025  
**Status**: Ready to Execute

---

## ✅ What Was Changed

### 1. Django Settings Updated
- **File**: `/backend/aikovrr/settings.py`
- **Line 95**: Changed default DB_USER from `'liransorani'` to `'postgres'`
- **Status**: ✅ Complete

---

## 📋 Database Migration Steps

### Option A: Transfer Ownership (Recommended)
**Best for**: Keeping existing data and connections

Run this command to transfer all database objects to postgres user:

```bash
psql -d aikovrr -f database/transfer_to_postgres_user.sql
```

**What it does:**
- Transfers database ownership to `postgres`
- Transfers schema ownership to `postgres`
- Transfers all tables, sequences, and views to `postgres`
- Grants all necessary privileges
- Verifies the transfer with a summary report

**Time**: ~10 seconds

---

### Option B: Recreate Database (Clean Slate)
**Best for**: Fresh start or if you want to reimport data

```bash
# 1. Drop and recreate database as postgres user
psql -U postgres -c "DROP DATABASE IF EXISTS aikovrr;"
psql -U postgres -c "CREATE DATABASE aikovrr;"

# 2. Import schema
psql -U postgres -d aikovrr -f database/aikovrr_schema_v2.sql

# 3. Import data
psql -U postgres -d aikovrr -f database/aikovrr_data_v2_minimal.sql
```

**Time**: ~30 seconds

---

## 🧪 Verification

After running either option, verify the change:

```bash
# Check database owner
psql -d aikovrr -c "SELECT pg_catalog.pg_get_userbyid(datdba) as owner FROM pg_database WHERE datname = 'aikovrr';"

# Check schema owner
psql -d aikovrr -c "SELECT schema_name, schema_owner FROM information_schema.schemata WHERE schema_name = 'aikovrr';"

# Check table owners
psql -d aikovrr -c "SELECT tablename, tableowner FROM pg_tables WHERE schemaname = 'aikovrr' LIMIT 5;"
```

**Expected output**: All should show `postgres` as owner

---

## 🔌 Test Django Connection

After database migration, test the Django connection:

```bash
cd backend
python manage.py check --database default
```

**Expected output**: `System check identified no issues (0 silenced).`

---

## 📝 Updated Connection String

**Django settings.py** (already updated):
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'aikovrr',
        'USER': 'postgres',  # ✅ Changed from 'liransorani'
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'options': '-c search_path=aikovrr,public'
        },
    }
}
```

**Direct psql access**:
```bash
psql -U postgres -d aikovrr
```

---

## 🚨 Troubleshooting

### Issue: "permission denied for database aikovrr"
**Solution**: Run Option A (transfer_to_postgres_user.sql) as a superuser:
```bash
psql -U postgres -d aikovrr -f database/transfer_to_postgres_user.sql
```

### Issue: "role 'postgres' does not exist"
**Solution**: Create postgres user:
```bash
psql -c "CREATE USER postgres WITH SUPERUSER PASSWORD '';"
```

### Issue: Django can't connect after change
**Solution**: 
1. Verify postgres user has permissions
2. Check Django settings.py was updated
3. Restart Django server

---

## ✅ Checklist

- [x] Django settings.py updated (DB_USER = 'postgres')
- [ ] Run database ownership transfer (Option A) OR recreate database (Option B)
- [ ] Verify database owner is 'postgres'
- [ ] Test Django connection
- [ ] Restart Django server
- [ ] Test API endpoints

---

## 📦 Files

1. **`transfer_to_postgres_user.sql`** - SQL script to transfer ownership
2. **`CHANGE_DB_USER_INSTRUCTIONS.md`** - This file
3. **`settings.py`** - Updated Django configuration

---

## 🎯 Recommendation

**Use Option A (Transfer Ownership)** - It's faster, preserves all data, and doesn't require reimporting. Only use Option B if you want a completely fresh database.

**Ready to execute!** 🚀
