# Property Maintenance Tracker

A modern, full-stack property maintenance tracking system built with React, Express, and PostgreSQL.

![Property Maintenance Tracker](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- **Submit Maintenance Issues**: Report maintenance problems with photos, categories, and urgency levels
- **Track Status**: Monitor issue status (Open, In Progress, Resolved)
- **Property Management**: Add and manage multiple properties dynamically
- **Filter & Search**: Filter issues by property, urgency, and status
- **Beautiful UI**: Modern glassmorphic design with smooth animations
- **Responsive**: Works seamlessly on desktop, tablet, and mobile

## Tech Stack

### Frontend
- React 18
- Vite (Build tool)
- Tailwind CSS
- Framer Motion (Animations)
- Lucide React (Icons)

### Backend
- Node.js + Express
- PostgreSQL (Neon DB)
- RESTful API

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon.tech account)

### Local Development

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
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your database URL

4. **Initialize the database**
   ```bash
   npm run init-db
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

## Deployment

### Deploy to Render (Recommended)

See [RENDER_DEPLOY_STEPS.md](./RENDER_DEPLOY_STEPS.md) for quick 5-step deployment guide.

**Quick Deploy:**
1. Push to GitHub
2. Go to Render.com
3. New → Blueprint → Connect repo
4. Click "Apply"
5. Run `npm run init-db` in Shell

## Available Scripts

- `npm run dev` - Start development (frontend + backend)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run init-db` - Initialize database tables

## Support

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment documentation.
