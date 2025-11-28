# ⚡ Quick Start Guide

Get your Zomato Clone running in 5 minutes!

## 🚀 Fastest Way to Deploy

### 1. Fork & Clone
```bash
git clone https://github.com/snehalsable10/zomato-clone-mern.git
cd zomato-clone-mern
```

### 2. Setup MongoDB (Free)
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create free cluster (takes 3-5 minutes)
- Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/zomato`

### 3. Deploy to Railway (1-Click)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/snehalsable10/zomato-clone-mern)

**Or manually:**
1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select this repository
4. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=any_random_secret_key_here
   NODE_ENV=production
   ```
5. Deploy! 🎉

### 4. Access Your App
- Railway will give you a URL like: `https://zomato-clone-production.up.railway.app`
- Open it and start using!

## 💻 Local Development

### Prerequisites
- Node.js 14+ installed
- MongoDB installed locally OR MongoDB Atlas account

### Setup (3 commands)
```bash
# 1. Install dependencies
npm install && cd client && npm install && cd ..

# 2. Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/zomato
JWT_SECRET=your_secret_key_here
NODE_ENV=development" > .env

# 3. Run the app
npm run dev
```

Open:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🎯 First Steps After Deployment

1. **Register an Account**
   - Go to Sign Up
   - Choose "Customer" or "Restaurant Owner"

2. **As Restaurant Owner:**
   - Create your restaurant
   - Add menu items
   - Set opening hours

3. **As Customer:**
   - Browse restaurants
   - Add items to cart
   - Place an order

## 📝 Sample Data

Want to test quickly? Use these sample credentials:

**Restaurant Owner:**
```
Email: owner@restaurant.com
Password: password123
```

**Customer:**
```
Email: customer@test.com
Password: password123
```

*(Note: You'll need to create these accounts first)*

## 🔧 Common Issues

### MongoDB Connection Failed
```bash
# Check your connection string format:
mongodb+srv://username:password@cluster.mongodb.net/zomato
# Make sure to replace username, password, and cluster
```

### Port Already in Use
```bash
# Change port in .env file
PORT=5001
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules client/node_modules
npm install && cd client && npm install
```

## 📚 Next Steps

- Read [FEATURES.md](FEATURES.md) for complete feature list
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide
- See [README.md](README.md) for full documentation

## 🆘 Need Help?

- Check existing [GitHub Issues](https://github.com/snehalsable10/zomato-clone-mern/issues)
- Create a new issue if you're stuck
- Star ⭐ the repo if you find it helpful!

---

**That's it! You're ready to go! 🎉**