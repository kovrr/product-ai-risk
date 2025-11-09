# Firewall Request - KovrrAI

Hi Akivva,

I need your help to make the KovrrAI application accessible from the internet.

## What's Needed

The KovrrAI app is running on our GCloud VM called **"platform"** in zone **us-central1-f**. 

Right now, the app works perfectly on port **8000**, but it's only accessible through an IAP tunnel. I need you to open port 8000 to public traffic so users can access it directly without the tunnel.

## What to Do

Create a new firewall rule that:
- Allows TCP traffic on port 8000
- From any source IP (0.0.0.0/0)
- To the "platform" VM

This will let people access the app at: **http://35.202.143.181:8000**

## Why It's Safe

The application has login authentication, so even though the port is open, users need credentials to access anything.

Let me know if you need any other details!

Thanks,
