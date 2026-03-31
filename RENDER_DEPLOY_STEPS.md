# Quick Deploy to Render - 5 Steps

## Prerequisites
- GitHub account
- Render account (free)
- Code pushed to GitHub

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub

### 3. Deploy Using Blueprint
1. Click **"New +"** → **"Blueprint"**
2. Connect your GitHub repository
3. Render detects `render.yaml` automatically
4. Click **"Apply"**
5. Wait 5-10 minutes for deployment

### 4. Initialize Database
After deployment completes:
1. Go to your web service
2. Click **"Shell"** tab
3. Run command:
   ```bash
   npm run init-db
   ```

### 5. Access Your App
- Your app URL: `https://your-app-name.onrender.com`
- Click it to open your deployed app!

## What Gets Created

- **PostgreSQL Database** (Free tier, 1GB)
- **Web Service** (Serves both frontend and API)

## Environment Variables (Auto-Configured)

These are set automatically:
- `DATABASE_URL` - From PostgreSQL service
- `NODE_ENV=production`
- `PORT` - Set by Render

## Default Properties

After running `init-db`, these properties are available:
- Marina Towers — Unit 4B
- Palm Residences — Villa 12
- Downtown Loft — Suite 7
- JBR Waterfront — Apt 22A
- Business Bay Studio — 301

You can add more properties through the Dashboard!

## Important Notes

### Free Tier Limitations
- App sleeps after 15 min of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month runtime

### Updating Your App
Just push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```
Render auto-rebuilds and redeploys!

## Troubleshooting

**Build fails?**
- Check Render logs in Dashboard

**No data showing?**
- Make sure you ran `npm run init-db`

**App not loading?**
- Wait 30 seconds (cold start)
- Check service is running in Dashboard

## Full Documentation
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.
