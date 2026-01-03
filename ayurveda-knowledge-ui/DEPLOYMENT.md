# Deploying to Render

## Quick Deploy Steps

### 1. Prepare Your Repository
```bash
# Make sure everything is committed
git add .
git commit -m "Ready for deployment"

# Push to GitHub (create a repo if you haven't)
git remote add origin https://github.com/YOUR_USERNAME/ayurveda-knowledge-ui.git
git push -u origin main
```

### 2. Deploy on Render

1. **Go to [Render.com](https://render.com)**
2. **Sign up/Login** with GitHub
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure the service:**

   - **Name:** `ayurveda-knowledge-ui` (or your choice)
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free (or upgrade later)

6. **Environment Variables (click "Advanced"):**
   ```
   NODE_VERSION=20.x
   ```

7. **Click "Create Web Service"**

### 3. Wait for Deployment
- Render will install dependencies and build your app
- First deployment takes 5-10 minutes
- You'll get a URL like: `https://ayurveda-knowledge-ui.onrender.com`

### 4. Custom Domain (Optional)
1. Go to your service settings
2. Add custom domain
3. Update your DNS records as instructed

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Make sure `package.json` has correct scripts
- Verify Node version compatibility

### App Doesn't Start
- Check that start command is correct: `npm start`
- Verify all environment variables are set
- Check runtime logs

### Slow Loading
- Free tier "spins down" after inactivity
- Upgrade to paid tier for always-on service
- First load after spin-down takes ~30 seconds

## Auto-Deploy Setup
Render automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Update features"
git push
# Render will automatically rebuild and deploy
```

## Performance Tips
1. **Enable CDN** in Render settings for faster static assets
2. **Use environment variables** for API keys (never commit them!)
3. **Monitor usage** in Render dashboard
4. **Upgrade plan** if you get traffic

## Costs
- **Free Tier:**
  - 750 hours/month
  - Spins down after 15 min inactivity
  - Good for testing/personal use

- **Starter ($7/month):**
  - Always on
  - Custom domain
  - Better for production

## Need Help?
- [Render Docs](https://render.com/docs)
- [Render Community](https://community.render.com)
