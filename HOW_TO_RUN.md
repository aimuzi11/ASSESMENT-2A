# 🚀 How to Run the App

## ✅ Your Servers Are Running!

Both servers are now active:
- **Backend API**: http://localhost:3001
- **Frontend App**: http://localhost:5173

## 📱 Open the App

### Option 1: Click This Link
👉 **[Open App](http://localhost:5173)** 👈

### Option 2: Manual
1. Open your browser
2. Go to: `http://localhost:5173`
3. Press `Ctrl + Shift + R` (hard refresh) if you see any errors

## 🐛 If You See Errors

### "Unsafe attempt to load URL" or Chrome Error
**Solution**: Just refresh the page (Ctrl + R)
- This happens when the page loads before the server is ready
- A simple refresh fixes it

### "Failed to load tickets"
**Solution**: Make sure both servers are running
```bash
# Check backend
curl http://localhost:3001/api/health

# If not working, restart:
npm run dev
```

### Page Won't Load
1. **Check servers are running:**
   ```bash
   netstat -ano | findstr ":3001"
   netstat -ano | findstr ":5173"
   ```

2. **Restart everything:**
   - Press `Ctrl + C` in the terminal
   - Run `npm run dev` again

## 📱 Mobile Testing

### Chrome DevTools
1. Press `F12`
2. Click the device toolbar icon (or `Ctrl + Shift + M`)
3. Select "iPhone 12 Pro" from dropdown
4. Refresh the page

### On Your Phone
1. Find your computer's IP address:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Start with host flag:
   ```bash
   npm run dev:client -- --host
   ```

3. On phone, visit: `http://YOUR_IP:5173`

## 🎯 Quick Commands

```bash
# Start everything
npm run dev

# Start separately
npm run dev:server  # Backend only
npm run dev:client  # Frontend only

# Initialize database (first time)
npm run init-db

# Build for production
npm run build
```

## ✅ What You Should See

### First Load
- Clean white background
- Deep blue navigation bar
- Empty dashboard (no demo data)
- "Submit" button in top right

### After Submitting a Ticket
1. Click "Submit" button
2. Fill out the form
3. Click "Submit Issue"
4. See success modal with ticket number (e.g., MNT-0001)
5. Click "View Dashboard"
6. Your ticket appears in the table!

## 🎨 Features to Try

- ✅ Submit a maintenance issue
- ✅ Change ticket status (Open → In Progress → Resolved)
- ✅ Filter by property, urgency, or status
- ✅ View on mobile (responsive design)
- ✅ Upload a photo (optional)

## 🛑 Stopping the Servers

Press `Ctrl + C` in the terminal running `npm run dev`

---

**Need Help?** Check [QUICKSTART.md](QUICKSTART.md) or [README_FULLSTACK.md](README_FULLSTACK.md)
