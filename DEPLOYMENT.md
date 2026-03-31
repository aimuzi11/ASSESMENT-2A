# Deployment Guide - Property Maintenance Tracker

This guide walks you through deploying the Property Maintenance Tracker to Render.

## Prerequisites

1. A [GitHub](https://github.com) account
2. A [Render](https://render.com) account
3. Your code pushed to a GitHub repository

## Quick Deploy to Render

### Option 1: Using render.yaml (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Create a New Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file
   - Click "Apply" to create both the database and web service

3. **Initialize the Database**
   - Once deployed, go to your web service's Shell tab
   - Run: `npm run init-db`

4. **Access Your App**
   - Your app will be available at: `https://your-app-name.onrender.com`

### Option 2: Manual Setup

#### Step 1: Create PostgreSQL Database

1. Go to Render Dashboard → "New +" → "PostgreSQL"
2. Configure:
   - **Name**: `property-maintenance-db`
   - **Database**: `property_maintenance`
   - **User**: (auto-generated)
   - **Region**: Choose closest to you
   - **Plan**: Free
3. Click "Create Database"
4. Copy the **Internal Database URL** (starts with `postgresql://`)

#### Step 2: Create Web Service

1. Go to Render Dashboard → "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `property-maintenance-tracker`
   - **Environment**: Node
   - **Region**: Same as database
   - **Branch**: `main`
   - **Build Command**: `npm run build:production`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### Step 3: Add Environment Variables

In your web service settings, add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Paste the Internal Database URL from Step 1 |
| `PORT` | Leave empty (Render sets this automatically) |

#### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for the build to complete (~5 minutes)
3. Once deployed, go to the Shell tab
4. Run: `npm run init-db` (this creates tables and adds default properties)

## Environment Variables Explained

### Required Variables

- **DATABASE_URL**: PostgreSQL connection string
  - Format: `postgresql://user:password@host:port/database?sslmode=require`
  - Provided automatically by Render PostgreSQL

- **NODE_ENV**: Application environment
  - Set to `production` for Render deployment
  - In production, the server serves the built React app

### Optional Variables

- **PORT**: Server port (default: 3001)
  - Render sets this automatically
  - Don't override unless necessary

## Deployment Scripts

The following npm scripts are configured for deployment:

```json
{
  "build:production": "npm install && vite build",
  "start": "node server/index.js",
  "init-db": "cd server && node init-db.js"
}
```

## Post-Deployment Checklist

- [ ] Database is created and running
- [ ] Web service is deployed successfully
- [ ] `init-db` script has been run
- [ ] Environment variables are set correctly
- [ ] Health check is passing (`/api/health`)
- [ ] Can access the app at the Render URL
- [ ] Can create a new property
- [ ] Can submit a ticket
- [ ] Can update ticket status

## Database Management

### Initialize Database
```bash
npm run init-db
```

This creates:
- `properties` table with default properties
- `tickets` table with all necessary fields
- Indexes for performance
- Triggers for auto-updating timestamps

### Reset Database (Caution!)
If you need to reset the database:
1. Go to Render Shell
2. Run: `npm run init-db`
3. This will **drop all existing data** and recreate tables

## Troubleshooting

### Build Fails

**Error**: `Module not found` or dependency issues
- **Solution**: Ensure all dependencies are in `dependencies`, not `devDependencies`
- Check that `package.json` is committed to Git

### Database Connection Fails

**Error**: `Connection refused` or `Authentication failed`
- **Solution**:
  - Verify `DATABASE_URL` is set correctly
  - Use the **Internal Database URL** from Render PostgreSQL
  - Ensure database and web service are in the same region

### App Loads But No Data

**Error**: Tables don't exist
- **Solution**: Run `npm run init-db` in the Shell

### API Calls Fail

**Error**: 404 on API routes
- **Solution**: Check that API routes come before the catch-all route in `server/index.js`

### CORS Errors (Should not happen)

- The app serves the frontend from the same domain, so CORS shouldn't be an issue
- If you see CORS errors, ensure `NODE_ENV=production` is set

## Architecture in Production

```
User Request
     ↓
Render Load Balancer
     ↓
Express Server (Port from Render)
     ├─→ /api/* → API Handlers → PostgreSQL
     └─→ /* → Serves static files from /dist
```

In production:
1. Vite builds the React app into the `dist/` folder
2. Express serves static files from `dist/`
3. API routes are handled by Express
4. Client-side routing is handled by serving `index.html` for all non-API routes

## Updating Your Deployment

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. Render automatically rebuilds and redeploys

## Free Tier Limitations

Render's free tier includes:
- Web services spin down after 15 minutes of inactivity
- First request after inactivity takes ~30 seconds (cold start)
- 750 hours/month of runtime
- PostgreSQL database with 1GB storage

To avoid cold starts, consider:
- Upgrading to a paid plan ($7/month)
- Using a uptime monitoring service to ping your app

## Custom Domain (Optional)

1. Go to your web service → Settings → Custom Domain
2. Add your domain
3. Update your domain's DNS with the provided CNAME record

## Support

For issues:
- Check Render logs: Dashboard → Your Service → Logs
- Review [Render Documentation](https://render.com/docs)
- Check [Render Community](https://community.render.com)

## Security Notes

- Never commit `.env` file to Git
- Use environment variables for sensitive data
- Render encrypts environment variables at rest
- Database connections use SSL/TLS
