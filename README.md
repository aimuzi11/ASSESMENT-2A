# Property Maintenance Tracker

<div align="center">

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

**A modern, full-stack property maintenance tracking system with beautiful UI and real-time updates**

[Features](#features) • [Demo](#demo) • [Quick Start](#quick-start) • [Documentation](#documentation) • [API](#api-documentation)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Component Documentation](#component-documentation)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Property Maintenance Tracker is a comprehensive full-stack application designed to streamline property maintenance management. Built with modern web technologies, it offers an intuitive interface for submitting, tracking, and managing maintenance issues across multiple properties.

### Key Highlights

- **Beautiful Glassmorphic UI** - Modern design with smooth animations and transitions
- **Real-time Updates** - Instant status changes with visual feedback
- **Multi-Property Support** - Manage maintenance across multiple properties
- **Photo Attachments** - Upload photos to document issues (up to 5MB)
- **Smart Filtering** - Filter by property, urgency, and status
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **RESTful API** - Clean, documented API for easy integration
- **PostgreSQL Database** - Robust data persistence with Neon DB

---

## Features

### 🎫 Issue Management

- **Submit Issues** - Create maintenance tickets with detailed information
  - Property selection from dynamic list
  - Category selection (Plumbing, Electrical, AC/HVAC, Furniture, Cleaning, Other)
  - Urgency levels (Low, Medium, High)
  - Detailed descriptions (10-500 characters)
  - Optional photo attachments (PNG, JPG, up to 5MB)

- **Track Status** - Monitor issue lifecycle
  - **Open** - Newly submitted issues
  - **In Progress** - Issues being worked on
  - **Resolved** - Completed issues

- **View Dashboard** - Comprehensive overview
  - Statistics cards (Total, Open, In Progress, Resolved)
  - Sortable, filterable table view
  - Mobile-optimized card view
  - Real-time updates with animations

### 🏢 Property Management

- **Add Properties** - Dynamically add new properties
- **Delete Properties** - Remove properties (with cascade handling)
- **Filter by Property** - View issues for specific properties

### 🎨 User Interface

- **Glassmorphic Design** - Modern, frosted-glass aesthetic
- **Smooth Animations** - Framer Motion powered transitions
- **Custom Icons** - Beautiful category-specific glass icons
- **Interactive Elements** - Hover effects, focus states, micro-interactions
- **Status Indicators** - Color-coded urgency and status pills
- **Form Validation** - Real-time validation with helpful error messages

### 📱 Responsive Features

- **Desktop Table View** - Full-featured data table with inline actions
- **Mobile Card View** - Touch-optimized card layout
- **Photo Modal** - Full-screen photo viewer
- **Dropdown Menus** - Properly positioned with overflow handling

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI framework |
| **Vite** | 5.4.0 | Build tool & dev server |
| **Tailwind CSS** | 3.4.3 | Utility-first styling |
| **Framer Motion** | 11.0.0 | Animation library |
| **Lucide React** | 0.400.0 | Icon library |
| **date-fns** | 3.6.0 | Date formatting |
| **clsx** | 2.1.0 | Conditional classNames |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express** | 5.2.1 | Web framework |
| **PostgreSQL** | 16+ | Database |
| **pg** | 8.20.0 | PostgreSQL client |
| **cors** | 2.8.6 | CORS middleware |
| **dotenv** | 17.3.1 | Environment variables |

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **Concurrently** - Run multiple commands

---

## Architecture

```
property-maintenance-tracker/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Main dashboard with filters & stats
│   │   ├── SubmitForm.jsx         # Issue submission form
│   │   ├── TicketRow.jsx          # Table row & card components
│   │   ├── StatusDropdown.jsx     # Status change dropdown
│   │   ├── UrgencyPill.jsx        # Urgency level selector
│   │   ├── PropertyManager.jsx    # Property CRUD interface
│   │   ├── GlassIcons.jsx         # Custom category icons
│   │   └── MuiButton.jsx          # Reusable button component
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles
├── server/
│   ├── index.js                   # Express server
│   ├── db.js                      # Database connection
│   └── init-db.js                 # Database initialization
├── public/                        # Static assets
└── dist/                          # Production build
```

### Component Hierarchy

```
App
├── Dashboard
│   ├── StatCard (x4)
│   ├── PropertyManager
│   ├── FilterPill (multiple)
│   └── TicketRow / TicketCard (multiple)
│       ├── StatusDropdown
│       ├── UrgencyPill
│       └── PhotoModal
└── SubmitForm
    ├── UrgencySelector
    └── SuccessModal
```

---

## Quick Start

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- **PostgreSQL** database (local or cloud-hosted)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd property-maintenance-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
   PORT=3001
   NODE_ENV=development
   ```

   Or copy from example:
   ```bash
   cp .env.example .env
   ```

4. **Initialize the database**
   ```bash
   npm run init-db
   ```

   This creates the required tables:
   - `properties` - Property information
   - `tickets` - Maintenance tickets

5. **Start development servers**
   ```bash
   npm run dev
   ```

   This starts:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3001`

---

## Database Setup

### Schema

#### Properties Table

```sql
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tickets Table

```sql
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    property VARCHAR(255) NOT NULL REFERENCES properties(name) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    urgency VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    photo_url TEXT,
    status VARCHAR(20) DEFAULT 'Open',
    date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Manual Database Setup

If you need to set up the database manually:

```bash
# Connect to your PostgreSQL database
psql $DATABASE_URL

# Run the schema
\i server/schema.sql

# Or use the init script
npm run init-db
```

### Using Neon DB (Recommended)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to `.env` as `DATABASE_URL`
5. Run `npm run init-db`

---

## API Documentation

### Base URL

```
http://localhost:3001/api
```

### Endpoints

#### Properties

**Get all properties**
```http
GET /api/properties
```

**Response**
```json
[
  {
    "id": 1,
    "name": "Palm Residences — Villa 12",
    "created_at": "2026-03-31T10:00:00.000Z"
  }
]
```

**Create property**
```http
POST /api/properties
Content-Type: application/json

{
  "name": "Downtown Loft — Suite 7"
}
```

**Delete property**
```http
DELETE /api/properties/:id
```

#### Tickets

**Get all tickets**
```http
GET /api/tickets
```

**Response**
```json
[
  {
    "id": 1,
    "ticket_number": "MNT-0001",
    "property": "Palm Residences — Villa 12",
    "category": "Plumbing",
    "urgency": "High",
    "description": "Leaking pipe in bathroom",
    "photo_url": "data:image/jpeg;base64,...",
    "status": "Open",
    "date_submitted": "2026-03-31T10:00:00.000Z",
    "updated_at": "2026-03-31T10:00:00.000Z"
  }
]
```

**Get single ticket**
```http
GET /api/tickets/:ticketNumber
```

**Create ticket**
```http
POST /api/tickets
Content-Type: application/json

{
  "property": "Palm Residences — Villa 12",
  "category": "Plumbing",
  "urgency": "High",
  "description": "Leaking pipe in bathroom",
  "photoUrl": "data:image/jpeg;base64,..."
}
```

**Update ticket status**
```http
PATCH /api/tickets/:ticketNumber/status
Content-Type: application/json

{
  "status": "In Progress"
}
```

**Delete ticket**
```http
DELETE /api/tickets/:ticketNumber
```

**Get statistics**
```http
GET /api/stats
```

**Response**
```json
{
  "total": 10,
  "open": 3,
  "inProgress": 5,
  "resolved": 2
}
```

### Error Responses

```json
{
  "error": "Error message description"
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

---

## Component Documentation

### Dashboard Component

Main dashboard view with filters, statistics, and ticket list.

**Props**
- `tickets` - Array of ticket objects
- `onStatusChange` - Function to handle status updates
- `onNavigateToSubmit` - Function to navigate to submit form
- `properties` - Array of property objects
- `onAddProperty` - Function to add new property
- `onDeleteProperty` - Function to delete property
- `isLoadingProperties` - Boolean loading state

**Features**
- Statistics cards (Total, Open, In Progress, Resolved)
- Property filter dropdown
- Urgency and status filter pills
- Desktop table view with sortable columns
- Mobile card view with touch-optimized layout
- Empty state with call-to-action

### SubmitForm Component

Form for submitting new maintenance issues.

**Props**
- `onSubmit` - Function to handle form submission
- `onSuccess` - Function called after successful submission
- `properties` - Array of property objects for dropdown

**Features**
- Property selection dropdown
- Category selection with icons
- Urgency level selector
- Description textarea with character counter
- Photo upload with preview
- Form validation with error messages
- Success modal with ticket number

**Validation Rules**
- Property: Required
- Category: Required
- Urgency: Required
- Description: 10-500 characters
- Photo: Optional, max 5MB, PNG/JPG only

### StatusDropdown Component

Dropdown for changing ticket status.

**Props**
- `value` - Current status
- `onChange` - Function to handle status change
- `disabled` - Boolean to disable dropdown

**Features**
- Three status options (Open, In Progress, Resolved)
- Color-coded status indicators
- Smooth animations
- Click-outside-to-close
- Keyboard navigation support

### UrgencyPill Component

Display and select urgency levels.

**Props**
- `urgency` - Urgency level (Low, Medium, High)
- `size` - Size variant (sm, md, lg)
- `showIcon` - Boolean to show dot indicator

**Variants**
- **Low** - Green color scheme
- **Medium** - Orange/yellow color scheme
- **High** - Red color scheme with pulse animation

---

## Available Scripts

### Development

```bash
# Start both frontend and backend concurrently
npm run dev

# Start only frontend (Vite dev server)
npm run dev:client

# Start only backend (Express server)
npm run dev:server
```

### Production

```bash
# Build frontend for production
npm run build

# Start production server
npm start

# Preview production build locally
npm preview
```

### Database

```bash
# Initialize database tables
npm run init-db

# Start server only
npm run server
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

---

## Deployment

### Deploy to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: property-maintenance-tracker
     - **Environment**: Node
     - **Build Command**: `npm run build:production`
     - **Start Command**: `npm start`

3. **Set Environment Variables**
   - `DATABASE_URL` - Your Neon DB connection string
   - `PORT` - 3001 (or leave default)
   - `NODE_ENV` - production

4. **Initialize Database**
   - After deployment, go to Shell tab
   - Run: `npm run init-db`

5. **Access Your App**
   - Your app will be live at: `https://your-app-name.onrender.com`

### Deploy to Vercel (Frontend Only)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Note: You'll need to deploy the backend separately (Render, Railway, etc.)

### Deploy to Railway

1. Install Railway CLI
   ```bash
   npm i -g @railway/cli
   ```

2. Login and initialize
   ```bash
   railway login
   railway init
   ```

3. Add PostgreSQL database
   ```bash
   railway add
   # Select PostgreSQL
   ```

4. Deploy
   ```bash
   railway up
   ```

---

## Troubleshooting

### Common Issues

#### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3001`

**Solution**:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

Or change port in `.env`:
```env
PORT=3002
```

#### Database Connection Failed

**Error**: `Error connecting to database`

**Solutions**:
1. Check `DATABASE_URL` in `.env`
2. Ensure database is running
3. Verify network connection
4. Check SSL mode: `?sslmode=require`

#### Build Fails

**Error**: Build errors during `npm run build`

**Solutions**:
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Clear build directory
rm -rf dist
npm run build
```

#### Images Not Uploading

**Error**: "Image must be less than 5MB"

**Solutions**:
1. Compress image before upload
2. Check file format (PNG/JPG only)
3. Ensure file size < 5MB

#### Dropdown Not Visible

**Issue**: Dropdowns getting clipped

**Solution**: This has been fixed in the latest version with `overflow-visible` CSS properties. Update to latest version:
```bash
git pull origin main
npm install
```

### Debug Mode

Enable detailed logging:

```env
# In .env
NODE_ENV=development
DEBUG=true
```

Then check console for detailed API logs.

---

## Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm run dev
   # Test thoroughly in browser
   ```

5. **Commit with descriptive message**
   ```bash
   git commit -m "Add amazing feature: detailed description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create Pull Request**
   - Describe your changes
   - Reference any related issues
   - Add screenshots if UI changes

### Code Style

- **JavaScript**: Follow ESLint configuration
- **React**: Use functional components and hooks
- **CSS**: Use Tailwind utility classes
- **Naming**: Use descriptive, camelCase names
- **Comments**: Add JSDoc comments for complex functions

### Commit Messages

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Example: `feat: add photo upload validation`

---

## Project Structure

```
property-maintenance-tracker/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.jsx
│   │   ├── SubmitForm.jsx
│   │   ├── TicketRow.jsx
│   │   ├── StatusDropdown.jsx
│   │   ├── UrgencyPill.jsx
│   │   ├── PropertyManager.jsx
│   │   ├── GlassIcons.jsx
│   │   └── MuiButton.jsx
│   ├── services/            # API services
│   │   └── api.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── server/
│   ├── index.js             # Express server
│   ├── db.js                # Database config
│   └── init-db.js           # DB initialization
├── public/                  # Static files
├── dist/                    # Production build
├── .env                     # Environment variables
├── .env.example             # Example env file
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── README.md                # This file
```

---

## Performance Optimization

### Frontend Optimizations

- **Code Splitting**: Automatic with Vite
- **Lazy Loading**: Images and modals
- **Memoization**: React hooks for expensive computations
- **Virtual Scrolling**: Consider for large ticket lists
- **Animation Performance**: GPU-accelerated with Framer Motion

### Backend Optimizations

- **Database Indexing**: On ticket_number, status, property
- **Connection Pooling**: Configured in `db.js`
- **Query Optimization**: Use prepared statements
- **Caching**: Consider Redis for high-traffic deployments

### Bundle Size

Current production bundle:
- **JS**: ~150KB gzipped
- **CSS**: ~10KB gzipped
- **Total**: ~160KB initial load

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |

Mobile:
- iOS Safari 14+
- Chrome Android Latest

---

## Security

### Best Practices Implemented

- **Environment Variables**: Sensitive data in `.env`
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Restricted origins
- **Input Validation**: Frontend and backend validation
- **File Upload Limits**: 5MB max, type restrictions

### Recommendations

- Use HTTPS in production
- Implement authentication (JWT, OAuth)
- Add rate limiting for API endpoints
- Regular dependency updates
- Enable CSP headers

---

## Future Enhancements

### Planned Features

- [ ] User authentication and authorization
- [ ] Email notifications for status changes
- [ ] Commenting system on tickets
- [ ] File attachments (PDFs, documents)
- [ ] Export to CSV/PDF
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native)
- [ ] Bulk operations
- [ ] Scheduled maintenance
- [ ] Contractor management
- [ ] Cost tracking

### Community Requests

See [Issues](https://github.com/yourusername/property-maintenance-tracker/issues) for feature requests and bug reports.

---

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2026 Property Maintenance Tracker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgments

### Built With

- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Express](https://expressjs.com/) - Backend framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Neon](https://neon.tech/) - Serverless Postgres

### Inspiration

Design inspired by modern glassmorphic UI trends and property management workflows.

---

## Support & Contact

### Get Help

- **Documentation**: You're reading it!
- **Issues**: [GitHub Issues](https://github.com/yourusername/property-maintenance-tracker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/property-maintenance-tracker/discussions)

### Stay Updated

- Star this repo to get updates
- Watch for new releases
- Follow development progress

---

## Changelog

### v1.0.0 (2026-03-31)

**Initial Release**

- ✨ Full-stack property maintenance tracking system
- 🎨 Beautiful glassmorphic UI design
- 📱 Responsive mobile and desktop layouts
- 🗄️ PostgreSQL database integration
- 🔄 Real-time status updates
- 📸 Photo upload support
- 🏢 Multi-property management
- 🔍 Advanced filtering and search
- 🎭 Smooth animations with Framer Motion
- 🚀 Production-ready deployment

---

<div align="center">

**Made with ❤️ by the Property Maintenance Tracker Team**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/yourusername/property-maintenance-tracker/issues) • [Request Feature](https://github.com/yourusername/property-maintenance-tracker/issues)

</div>
