# Firewall Request - KovrrAI

**Status**: ✅ COMPLETED - November 10, 2025

Hi Akivva,

~~I need your help to make the KovrrAI application accessible from the internet.~~

## ✅ Completed Configuration

The KovrrAI app is running on our GCloud VM called **"platform"** in zone **us-central1-f**. 

**Current Status**:
- ✅ Port 8000 is now open
- ✅ External IP: **136.113.138.156**
- ✅ Application accessible at: **http://136.113.138.156:8000**

## What Was Done

Firewall rule created that:
- ✅ Allows TCP traffic on port 8000
- ✅ From authorized source IPs
- ✅ To the "platform" VM

## Security

The application has login authentication, so even though the port is open, users need credentials to access anything.

---

## For Future Reference

If additional IP addresses need access, contact Akivaa with:
- Source IP address
- Reason for access
- Duration needed

Thanks,
