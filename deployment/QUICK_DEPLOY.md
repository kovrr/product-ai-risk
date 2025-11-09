# ⚡ Quick Deploy - AIKovrr to GCloud VM

**3 Commands to Deploy Everything**

---

## 📦 Step 1: Package (Local Machine)

```bash
cd /Users/liransorani/CascadeProjects/aikovrr

tar -czf aikovrr-deploy.tar.gz \
  --exclude='venv' \
  --exclude='__pycache__' \
  --exclude='*.pyc' \
  --exclude='staticfiles' \
  --exclude='media' \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.vite' \
  --exclude='.git' \
  backend/ frontend/ database/ deployment/
```

---

## 📤 Step 2: Upload (Local Machine)

```bash
gcloud compute scp aikovrr-deploy.tar.gz platform:/tmp/ \
  --zone us-central1-f \
  --tunnel-through-iap
```

---

## 🚀 Step 3: Deploy (On VM)

```bash
# Connect to VM
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap

# Run these commands on the VM:
sudo mkdir -p /opt/aikovrr
sudo tar -xzf /tmp/aikovrr-deploy.tar.gz -C /opt/aikovrr
sudo chown -R $USER:$USER /opt/aikovrr
chmod +x /opt/aikovrr/deployment/deploy_to_gcloud.sh
cd /opt/aikovrr
./deployment/deploy_to_gcloud.sh
```

---

## ✅ Done!

**Access**: http://35.202.143.181  
**Admin**: http://35.202.143.181/admin/ (admin/admin123)

---

## 🔧 Useful Commands

```bash
# Check status
sudo systemctl status aikovrr-backend
sudo systemctl status nginx

# View logs
sudo journalctl -u aikovrr-backend -f

# Restart
sudo systemctl restart aikovrr-backend
sudo systemctl restart nginx
```

---

**Time**: ~15 minutes total
