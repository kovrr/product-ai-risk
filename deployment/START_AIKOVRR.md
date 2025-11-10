# 🚀 Start KovrrAI - Quick Guide

**Updated**: November 10, 2025 - New external IP and port configuration

## Prerequisites

Before you start, make sure you have:
1. **Google Cloud SDK** installed ([Install here](https://cloud.google.com/sdk/docs/install))
2. **Access to the aikovrr-platform project** in Google Cloud

---

## Connection Options

### Option 1: IAP Tunnel (Recommended for Development)

#### Step 1: Authenticate with Google Cloud

Open your terminal and run:

```bash
gcloud auth login
gcloud config set project aikovrr-platform
```

#### Step 2: Start IAP Tunnel

Copy and paste this command:

```bash
gcloud compute start-iap-tunnel platform 8000 --local-host-port=localhost:8000 --zone=us-central1-f --project=aikovrr-platform
```

**Keep this terminal window open** while using the app.

#### Step 3: Open KovrrAI

Open your browser and go to:

**http://localhost:8000**

---

### Option 2: Direct Access (External IP)

**VM External IP**: `136.113.138.156`  
**Port**: `8000` (now open)

Open your browser and go to:

**http://136.113.138.156:8000**

⚠️ **Note**: This requires firewall rules to be configured for your IP address. Contact DevOps (Akivaa) if you cannot access.

---

## Step 4: Login

- **Username**: `admin`
- **Password**: `admin123`

---

## ✅ Done!

You're now using KovrrAI!

---

## 🛑 To Stop

Press `Ctrl+C` in the terminal to close the tunnel.

---

**That's it!** 🎯
