const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  cuisine: [{
    type: String,
    required: true
  }],
  images: [{
    type: String
  }],
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  phone: {
    type: String,
    required: true
  },
  email: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  menu: [{
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    isVeg: Boolean,
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    default: '$$'
  },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  features: [{
    type: String,
    enum: ['Delivery', 'Takeout', 'Dine-in', 'Outdoor Seating', 'Parking', 'WiFi', 'Alcohol']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  deliveryTime: {
    type: String,
    default: '30-40 mins'
  },
  minimumOrder: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for location-based queries
restaurantSchema.index({ 'address.coordinates': '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema);