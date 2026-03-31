# Property Maintenance Tracker - Full Stack

A **mobile-optimized** full-stack property maintenance tracking application with **Neon PostgreSQL database**, **React 18**, **Express.js**, and **MUI Base UI**.

## 🚀 Features

### Frontend
- **Deep Blue Design** - Professional blue (#1E40AF) with white background
- **MUI Base UI** - Accessible, unstyled React components
- **Glass Morphism** - Modern frosted glass effects
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion transitions
- **Real-time Updates** - Live data from PostgreSQL

### Backend
- **Neon PostgreSQL** - Serverless Postgres database
- **RESTful API** - Clean, documented endpoints
- **Real-time Persistence** - All data saved to database
- **No Demo Data** - Starts completely fresh

## 📦 Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- MUI Base UI (@base-ui/react)
- Framer Motion
- Lucide React Icons
- date-fns

**Backend:**
- Node.js + Express
- PostgreSQL (via Neon)
- pg (PostgreSQL client)
- CORS enabled

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Neon PostgreSQL account (or any PostgreSQL database)

### 1. Clone and Install

```bash
cd "ASSESMENT 2A"
npm install --legacy-peer-deps
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://neondb_owner:npg_7QVW6hNvIbmK@ep-royal-night-a4ipu8xq-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
PORT=3001
NODE_ENV=development
```

### 3. Initialize Database

```bash
npm run init-db
```

You should see:
```
✅ Connected to Neon PostgreSQL database
✅ Database tables created successfully!
✅ Properties inserted
📊 Ready to accept ticket submissions
🎉 Database initialization complete!
```

### 4. Run the Application

**Option A: Run Frontend and Backend Together**
```bash
npm run dev
```

**Option B: Run Separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev:client
```

### 5. Access the App

- **Frontend**: http://localhost:5173 (or 5176)
- **Backend API**: http://localhost:3001/api
- **API Health**: http://localhost:3001/api/health

## 📱 Mobile Optimization

The app is fully optimized for mobile:

### Meta Tags
- Proper viewport configuration
- Theme color for mobile browsers
- Apple mobile web app support
- PWA-ready meta tags

### Responsive Design
- **Navigation**: Icon-only on mobile, text + icons on desktop
- **Tables**: Card layout on mobile (< 768px), table layout on desktop
- **Forms**: Full-width inputs, optimized touch targets
- **Spacing**: Reduced padding on mobile (py-4 → py-8)
- **Font Sizes**: Responsive typography (text-xs sm:text-sm)

### Touch-Friendly
- Minimum 44x44px touch targets
- Large, tappable buttons
- Smooth scroll behavior
- No hover-dependent interactions

## 🗄️ Database Schema

### Properties Table
```sql
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tickets Table
```sql
CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  ticket_number VARCHAR(20) UNIQUE NOT NULL,
  property_id INTEGER REFERENCES properties(id),
  category VARCHAR(50) NOT NULL,
  urgency VARCHAR(20) CHECK (urgency IN ('Low', 'Medium', 'High')),
  description TEXT NOT NULL,
  photo_url TEXT,
  status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### Properties
- `GET /api/properties` - Get all properties

### Tickets
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:ticketNumber` - Get single ticket
- `POST /api/tickets` - Create new ticket
- `PATCH /api/tickets/:ticketNumber/status` - Update ticket status
- `DELETE /api/tickets/:ticketNumber` - Delete ticket

### Statistics
- `GET /api/stats` - Get ticket statistics

### Example Request
```javascript
// Create Ticket
POST /api/tickets
Content-Type: application/json

{
  "property": "Marina Towers — Unit 4B",
  "category": "Plumbing",
  "urgency": "High",
  "description": "Leak in kitchen sink",
  "photoUrl": "data:image/png;base64,..." // Optional
}
```

## 📂 Project Structure

```
ASSESMENT 2A/
├── server/
│   ├── db.js              # Database connection
│   ├── index.js           # Express server
│   ├── init-db.js         # Database initialization
│   └── package.json       # Server dependencies
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── GlassIcons.jsx
│   │   ├── MuiButton.jsx
│   │   ├── MuiSelect.jsx
│   │   ├── StatusDropdown.jsx
│   │   ├── SubmitForm.jsx
│   │   ├── TicketRow.jsx
│   │   └── UrgencyPill.jsx
│   ├── services/
│   │   └── api.js         # API client
│   ├── App.jsx            # Main app (with API integration)
│   ├── main.jsx
│   └── index.css
├── .env                   # Environment variables (git-ignored)
├── .env.example           # Example environment variables
├── package.json
├── tailwind.config.js
└── vite.config.js         # Includes API proxy config
```

## 🎨 Color Scheme

```javascript
{
  primary: '#1E40AF',      // Deep Blue-800
  secondary: '#2563EB',    // Blue-600
  background: '#F8F9FA',   // Light gray
  text: '#1A1A24',        // Dark gray
  accent: '#3B82F6',      // Blue-500
}
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Run both frontend and backend
npm run dev:client   # Run frontend only
npm run dev:server   # Run backend only
npm run build        # Build for production
npm run preview      # Preview production build
npm run init-db      # Initialize database
npm run server       # Run backend server
```

### Environment Variables

All environment variables should be in the root `.env` file:
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Backend server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

## 🚢 Production Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `/dist` folder
3. Set environment variable: `VITE_API_URL=your-backend-url`

### Backend (Render/Railway/Heroku)
1. Deploy `/server` directory
2. Set `DATABASE_URL` environment variable
3. Run `node init-db.js` once to initialize tables

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Check that `.env` file exists and `DATABASE_URL` is correct.

### API 404 Errors
```
Failed to load tickets
```
**Solution**: Make sure backend server is running on port 3001.

### Build Errors
```
Module not found
```
**Solution**: Run `npm install --legacy-peer-deps` again.

## 📝 License

MIT

## 🙏 Credits

Built with React, Express, Tailwind CSS, MUI Base UI, and Neon PostgreSQL.
