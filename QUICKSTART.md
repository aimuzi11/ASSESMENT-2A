# Quick Start Guide

## 🚀 Get Running in 3 Steps

### Step 1: Initialize Database
```bash
npm run init-db
```

**Expected Output:**
```
✅ Connected to Neon PostgreSQL database
✅ Database tables created successfully!
✅ Properties inserted
📊 Ready to accept ticket submissions
🎉 Database initialization complete!
```

### Step 2: Start Backend Server
Open a terminal and run:
```bash
npm run server
```

**Expected Output:**
```
🚀 Server running on http://localhost:3001
📊 API endpoints available at http://localhost:3001/api
```

Keep this terminal open!

### Step 3: Start Frontend
Open a **NEW terminal** and run:
```bash
npm run dev:client
```

**Expected Output:**
```
VITE v5.4.21  ready in 492 ms
➜  Local:   http://localhost:5173/
```

### Step 4: Open in Browser
Visit **http://localhost:5173** (or the port shown in your terminal)

---

## ✅ What to Expect

### First Load
- Empty dashboard (no demo data!)
- Clean white background
- Deep blue buttons and accents
- Mobile-optimized layout

### Submit Your First Issue
1. Click "Submit" button
2. Fill in the form:
   - Select a property
   - Choose category (Plumbing, Electrical, etc.)
   - Set urgency level
   - Describe the issue
   - Optionally upload a photo
3. Click "Submit Issue"
4. See the success modal with ticket number
5. View your ticket in the dashboard!

### Mobile Testing
- Open on your phone
- View in Chrome DevTools mobile view
- Try different screen sizes
- Test touch interactions

---

## 🔥 One-Command Start (Alternative)

If you prefer to run both frontend and backend together:

```bash
npm run dev
```

This will start both servers in parallel using `concurrently`.

---

## 🐛 Common Issues

### "ECONNREFUSED"
**Problem:** Can't connect to database
**Solution:** Check your `.env` file has the correct `DATABASE_URL`

### "Port already in use"
**Problem:** Server port is occupied
**Solution:** Kill the process or change PORT in `.env`

### "Failed to load tickets"
**Problem:** Frontend can't reach backend
**Solution:** Make sure backend is running on port 3001

---

## 📱 Mobile Features

- **Responsive Design**: Adapts to any screen size
- **Touch-Friendly**: Large buttons, easy tapping
- **Card Layout**: On mobile (< 768px), table becomes cards
- **Icon Navigation**: Space-efficient on small screens
- **Fast**: Optimized for mobile networks

---

## 🎯 Test Checklist

- [ ] Database initialized
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Can access app in browser
- [ ] Can submit a new issue
- [ ] Can view tickets in dashboard
- [ ] Can change ticket status
- [ ] Can filter tickets
- [ ] Works on mobile viewport

---

## 🎨 Design Features

- **Deep Blue (#1E40AF)**: All primary buttons and accents
- **White Background (#F8F9FA)**: Clean, professional
- **Glass Effects**: Subtle blur and transparency
- **Smooth Animations**: Framer Motion transitions
- **MUI Base UI**: Accessible components

---

## 📊 API Testing

Test the API directly:

```bash
# Health check
curl http://localhost:3001/api/health

# Get all tickets
curl http://localhost:3001/api/tickets

# Get stats
curl http://localhost:3001/api/stats
```

---

## 🎉 You're All Set!

Your full-stack Property Maintenance Tracker is now running with:
- ✅ Real PostgreSQL database (Neon)
- ✅ Express backend with REST API
- ✅ React frontend with MUI Base UI
- ✅ Deep blue design theme
- ✅ Mobile-optimized interface
- ✅ NO demo data - completely fresh!

Happy tracking! 🏠
