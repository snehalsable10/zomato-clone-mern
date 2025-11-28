# 🍕 Zomato Clone - MERN Stack

A full-featured food delivery application built with MongoDB, Express.js, React, and Node.js.

## ✨ Features

### User Features
- 🔐 User authentication (Register/Login with JWT)
- 🍽️ Browse restaurants with filters (cuisine, rating, location)
- 🔍 Search functionality for restaurants and cuisines
- 📋 View restaurant details, menu, and reviews
- 🛒 Shopping cart functionality
- 📦 Place and track orders
- ⭐ Rate and review restaurants
- 👤 User profile management
- 📍 Multiple delivery addresses

### Restaurant Owner Features
- 🏪 Create and manage restaurant profiles
- 📝 Add/edit menu items with pricing
- 📊 View and manage orders
- ⏰ Set opening hours and delivery time
- 📸 Upload restaurant and food images

### Admin Features
- 👥 Manage users and restaurants
- 📈 View platform analytics
- 🔧 System configuration

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/snehalsable10/zomato-clone-mern.git
cd zomato-clone-mern
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

4. **Environment Variables**

Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

5. **Run the application**

Development mode (runs both frontend and backend):
```bash
# Run backend
npm run dev

# In another terminal, run frontend
cd client
npm start
```

Production mode:
```bash
npm run build
npm start
```

## 🚀 Deployment

### Backend Deployment (Railway)
1. Push code to GitHub
2. Connect Railway to your repository
3. Add environment variables
4. Deploy automatically

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Configure build settings
4. Deploy automatically

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get single restaurant
- `POST /api/restaurants` - Create restaurant (Auth required)
- `PUT /api/restaurants/:id` - Update restaurant (Auth required)
- `DELETE /api/restaurants/:id` - Delete restaurant (Auth required)

### Orders
- `POST /api/orders` - Create order (Auth required)
- `GET /api/orders` - Get user orders (Auth required)
- `GET /api/orders/:id` - Get single order (Auth required)
- `PUT /api/orders/:id/status` - Update order status (Auth required)

### Reviews
- `POST /api/reviews` - Create review (Auth required)
- `GET /api/reviews/restaurant/:restaurantId` - Get restaurant reviews
- `PUT /api/reviews/:id` - Update review (Auth required)
- `DELETE /api/reviews/:id` - Delete review (Auth required)

### Users
- `GET /api/users/profile` - Get user profile (Auth required)
- `PUT /api/users/profile` - Update profile (Auth required)
- `POST /api/users/address` - Add address (Auth required)
- `PUT /api/users/address/:addressId` - Update address (Auth required)
- `DELETE /api/users/address/:addressId` - Delete address (Auth required)
- `POST /api/users/favorites/:restaurantId` - Add to favorites (Auth required)
- `DELETE /api/users/favorites/:restaurantId` - Remove from favorites (Auth required)

## 🎨 Screenshots

### Home Page
Browse restaurants with search and filter options

### Restaurant Detail
View menu, ratings, and reviews

### Cart & Checkout
Manage cart items and place orders

### Order Tracking
Track your order status in real-time

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Snehal Sable**
- GitHub: [@snehalsable10](https://github.com/snehalsable10)

## 🙏 Acknowledgments

- Inspired by Zomato
- Built with MERN Stack
- Deployed on Railway & Vercel

---

Made with ❤️ by Snehal Sable