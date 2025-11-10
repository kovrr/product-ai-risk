# Fix CORS Issue for Public IP Access

**Issue**: Frontend was hardcoded to call `http://localhost:8000/api`, causing CORS errors when accessing via public IP `136.113.138.156:8000`

**Error Message**:
```
Access to XMLHttpRequest at 'http://localhost:8000/api/auth/login/' 
from origin 'http://136.113.138.156:8000' has been blocked by CORS policy
```

---

## ✅ Solution Applied

### Changed File: `/frontend/src/services/api.js`

**Before**:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

**After**:
```javascript
// Use the current window origin for API calls (works for both localhost and public IP)
const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:8000/api`;
```

This makes the API URL dynamic:
- When accessed via `http://localhost:8000` → API calls go to `http://localhost:8000/api`
- When accessed via `http://136.113.138.156:8000` → API calls go to `http://136.113.138.156:8000/api`

---

## 🚀 Deployment Steps

### Option 1: Rebuild Frontend Locally and Upload

1. **Build the frontend**:
```bash
cd /Users/liransorani/CascadeProjects/aikovrr/frontend
npm run build
```

2. **Upload to server**:
```bash
# Copy dist folder to server
gcloud compute scp --recurse dist/* platform:/path/to/nginx/html --zone=us-central1-f
```

---

### Option 2: Build on Server (Recommended)

SSH into the server and rebuild:

```bash
# SSH to server
gcloud compute ssh platform --zone=us-central1-f

# Navigate to frontend directory
cd /path/to/aikovrr/frontend

# Pull latest changes
git pull

# Install dependencies (if needed)
npm install

# Build
npm run build

# Restart nginx (if needed)
sudo systemctl restart nginx
```

---

### Option 3: Ask DevOps (Akivaa)

Send this message to Akivaa:

```
Hi Akivaa,

I fixed a CORS issue in the frontend code. Can you please rebuild and deploy the frontend?

Steps:
1. SSH to platform VM
2. cd to frontend directory
3. git pull
4. npm run build
5. Restart nginx if needed

The fix changes the API URL from hardcoded localhost to dynamic window.location, 
so it works with both localhost and the public IP (136.113.138.156).

Thanks!
```

---

## 🧪 Testing After Deployment

1. Clear browser cache or open incognito window
2. Go to http://136.113.138.156:8000
3. Try to login with admin/admin123
4. Should work without CORS errors

---

## 📝 Technical Details

### Why This Happened:
- Frontend was built with hardcoded `localhost:8000` API URL
- When accessing via public IP, browser sees:
  - Origin: `http://136.113.138.156:8000`
  - API request: `http://localhost:8000/api`
- Browser blocks this as a security risk (CORS + private network access)

### Why This Fix Works:
- Uses `window.location` to dynamically determine the API URL
- Always calls API on the same origin as the frontend
- No CORS issues because origin matches

### Alternative Solutions (Not Recommended):
1. ❌ Add CORS headers on backend (security risk)
2. ❌ Use proxy configuration (adds complexity)
3. ✅ Dynamic API URL (clean, secure, simple)

---

**Status**: Code fixed, awaiting deployment to server
