# 🚀 Deployment Guide

## Prerequisites
- MongoDB Atlas account (free tier available)
- Railway/Vercel/Heroku account
- GitHub account

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for development
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/zomato`)

## Step 2: Deploy Backend to Railway

### Option A: Using Railway CLI

1. Install Railway CLI:
```bash
npm i -g @railway/cli
```

2. Login to Railway:
```bash
railway login
```

3. Initialize project:
```bash
railway init
```

4. Add environment variables:
```bash
railway variables set MONGODB_URI="your_mongodb_connection_string"
railway variables set JWT_SECRET="your_secret_key_here"
railway variables set NODE_ENV="production"
railway variables set PORT="5000"
```

5. Deploy:
```bash
railway up
```

### Option B: Using Railway Dashboard

1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `snehalsable10/zomato-clone-mern`
4. Add environment variables in Settings:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Any random secret key
   - `NODE_ENV`: production
   - `PORT`: 5000
5. Railway will automatically deploy

## Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Navigate to client folder:
```bash
cd client
```

3. Deploy:
```bash
vercel
```

4. Follow prompts and add environment variables when asked

### Option B: Using Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import `snehalsable10/zomato-clone-mern`
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: client
   - **Build Command**: `npm run build`
   - **Output Directory**: build
5. Add environment variable:
   - `REACT_APP_API_URL`: Your Railway backend URL
6. Deploy

## Step 4: Update API URL in Frontend

If deploying separately, update the API URL in `client/package.json`:

```json
{
  "proxy": "https://your-railway-backend-url.railway.app"
}
```

Or create a `.env` file in the client folder:
```env
REACT_APP_API_URL=https://your-railway-backend-url.railway.app
```

## Step 5: Alternative - Deploy Full Stack to Single Platform

### Deploy to Railway (Full Stack)

1. Go to Railway dashboard
2. Create new project from GitHub
3. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Railway will build both frontend and backend
5. Access your app at the generated Railway URL

### Deploy to Render

1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - **Build Command**: `npm install && npm install --prefix client && npm run build --prefix client`
   - **Start Command**: `npm start`
5. Add environment variables
6. Deploy

## Step 6: Test Your Deployment

1. Visit your deployed URL
2. Register a new account
3. Create a restaurant (if you're a restaurant owner)
4. Browse restaurants
5. Add items to cart
6. Place an order
7. Check order status

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zomato
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
NODE_ENV=production
```

### Frontend (client/.env)
```env
REACT_APP_API_URL=https://your-backend-url.com
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure IP whitelist includes 0.0.0.0/0
- Check username/password in connection string
- Verify database name in connection string

### Build Failures
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (should be 14+)
- Verify all dependencies are in package.json

### CORS Errors
- Ensure backend CORS is configured for your frontend domain
- Check API URL in frontend configuration

### 404 Errors on Refresh
- For Vercel: Add `vercel.json` with proper routing
- For Railway: Ensure server.js serves static files in production

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] API endpoints working
- [ ] Authentication working
- [ ] File uploads working (if using Cloudinary)
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)

## Monitoring

- Railway: Built-in logs and metrics
- Vercel: Analytics dashboard
- MongoDB Atlas: Database monitoring

## Scaling

- Railway: Upgrade plan for more resources
- MongoDB Atlas: Upgrade cluster tier
- Consider CDN for static assets
- Implement caching (Redis)
- Add load balancing for high traffic

---

🎉 Your Zomato Clone is now live!