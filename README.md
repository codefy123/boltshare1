# BoltShare ⚡

A high-speed, peer-to-peer file sharing application that works on Local Networks (WiFi/Hotspot) without internet. Built with WebRTC and Node.js.

## 🚀 Features
- **High Speed:** Uses WebRTC for direct device-to-device transfer.
- **No Internet Needed:** Works over LAN/WLAN.
- **Large File Support:** Chunking mechanism supports files 10GB+.
- **Secure:** Data never touches the server.
- **Cross-Platform:** Works on any device with a browser.

## 🛠 Tech Stack
- **Frontend:** HTML5, Tailwind CSS, Vanilla JS
- **Backend:** Node.js, Socket.io (Signaling only)
- **Transport:** WebRTC (Data Channels)

## 📦 Deployment (Render.com)

1. **Deploy Backend (Web Service):**
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node index.js`

2. **Deploy Frontend (Static Site):**
   - Root Directory: `client`
   - Publish Directory: `.`
   - **Important:** Update `SOCKET_URL` in `client/index.html` with your deployed Backend URL.

## 🏃‍♂️ Run Locally

1. **Start Server:**
   ```bash
   cd server
   npm install
   node index.js
