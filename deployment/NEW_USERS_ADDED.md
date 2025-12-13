# New Users Added - December 8, 2025

## 👥 New User Accounts Created

### User 1: Tomer S
- **Username**: `tomers`
- **Email**: `tomers@kovrr.com`
- **Password**: `0ThElsqISU`
- **Role**: Analyst
- **First Name**: Tomer
- **Last Name**: S

### User 2: Ohad H
- **Username**: `ohad`
- **Email**: `ohadh@kovrr.com`
- **Password**: `MbpeoVGoFg`
- **Role**: Analyst
- **First Name**: Ohad
- **Last Name**: H

---

## 📝 Files Updated

### 1. LOGIN_INFO.md
**Location**: `/Users/liransorani/CascadeProjects/aikovrr/LOGIN_INFO.md`

Added both users to the Test Users table with their credentials.

### 2. deploy_to_gcloud.sh
**Location**: `/Users/liransorani/CascadeProjects/aikovrr/deployment/deploy_to_gcloud.sh`

Updated the `users_data` array in Step 10 to include:
```python
('tomers', 'tomers@kovrr.com', '0ThElsqISU', 'Tomer', 'S', 'analyst'),
('ohad', 'ohadh@kovrr.com', 'MbpeoVGoFg', 'Ohad', 'H', 'analyst'),
```

---

## 🚀 Deployment Behavior

When you run the deployment script (`./deployment/deploy.sh`), it will:

1. **Package and upload** the application to the GCloud VM
2. **Run deploy_to_gcloud.sh** on the server
3. **Step 10** will execute and:
   - Create/update all users from the `users_data` array
   - Set the correct passwords for `tomers` and `ohad`
   - Mark them as active analysts
   - Print confirmation messages

### Expected Output:
```
Step 10: Ensure all users from USER_CREDENTIALS.md exist
Creating/updating users with correct credentials...
✅ Created user: tomers (tomers@kovrr.com)
✅ Created user: ohad (ohadh@kovrr.com)

📊 Total users in system: 11
```

---

## 🔐 Security Notes

- **Random Passwords**: Both passwords were generated using Python's `random` module with 10-character alphanumeric strings
- **Password Format**: Mix of uppercase, lowercase, and digits (e.g., `0ThElsqISU`, `MbpeoVGoFg`)
- **Password Storage**: Passwords are hashed using Django's `make_password()` function before storage
- **Development Only**: These credentials are for development/testing purposes

---

## ✅ Verification Steps

After deployment, verify the users were created:

### 1. Check via Django Admin
```
http://136.113.138.156:8000/admin/
Login as admin (admin123)
Navigate to: Core > App Users
Look for: tomers and ohad
```

### 2. Check via SSH
```bash
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap

# On the VM:
cd /opt/aikovrr/backend
source venv/bin/activate
python manage.py shell

# In Python shell:
from core.models import AppUser
tomers = AppUser.objects.get(username='tomers')
ohad = AppUser.objects.get(username='ohad')
print(f"Tomers: {tomers.email}, Active: {tomers.is_active}")
print(f"Ohad: {ohad.email}, Active: {ohad.is_active}")
```

### 3. Test Login
```
http://136.113.138.156:8000/login

Username: tomers
Password: 0ThElsqISU

Username: ohad
Password: MbpeoVGoFg
```

---

## 📊 Current User List (11 Total)

| # | Username | Email | Password | Role | Status |
|---|----------|-------|----------|------|--------|
| 1 | admin | admin@aikovrr.com | admin123 | Admin | Active |
| 2 | or | or@kovrr.com | bTerAOX4xB | Analyst | Active |
| 3 | shai | shai@kovrr.com | ZxItIMACEI | Analyst | Active |
| 4 | yakir | yakir@kovrr.com | qANLqq5fGZ | Analyst | Active |
| 5 | naomi | naomi@kovrr.com | AYAhgbGart | Analyst | Active |
| 6 | huw | huw@kovrr.com | Sw4JTYmdZS | Analyst | Active |
| 7 | alona | alona@kovrr.com | CSLVroXeJZ | Analyst | Active |
| 8 | hannah | hannah@kovrr.com | S2OeiSR0eX | Analyst | Active |
| 9 | shalom | shalom@kovrr.com | KCigje4XUE | Analyst | Active |
| 10 | **tomers** | **tomers@kovrr.com** | **0ThElsqISU** | **Analyst** | **Active** ⭐ NEW |
| 11 | **ohad** | **ohadh@kovrr.com** | **MbpeoVGoFg** | **Analyst** | **Active** ⭐ NEW |

---

## 🔄 Next Deployment

When you run the next deployment:

```bash
cd /Users/liransorani/CascadeProjects/aikovrr
./deployment/deploy.sh
```

The script will automatically:
1. ✅ Create `tomers` and `ohad` accounts if they don't exist
2. ✅ Update their passwords if they already exist
3. ✅ Ensure they have the correct email addresses
4. ✅ Set them as active analysts

---

## 📧 User Notification Template

You can send this to the new users:

```
Subject: AIKovrr Platform Access

Hi [Tomer/Ohad],

Your AIKovrr platform account has been created:

Login URL: http://136.113.138.156:8000/login
Username: [tomers/ohad]
Password: [0ThElsqISU/MbpeoVGoFg]
Role: Analyst

Please change your password after first login.

Best regards,
AIKovrr Team
```

---

**✅ Users created and deployment script updated successfully!**
