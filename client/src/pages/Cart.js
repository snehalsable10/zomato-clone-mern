import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = ({ cart, updateQuantity, removeFromCart, clearCart, user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to place order');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    try {
      setLoading(true);
      
      // Get user's default address or use a placeholder
      const userData = JSON.parse(localStorage.getItem('user'));
      const deliveryAddress = userData.address?.[0] || {
        street: '123 Main St',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        country: 'India'
      };

      const orderData = {
        restaurant: cart[0].restaurantId,
        items: cart.map(item => ({
          menuItem: {
            name: item.name,
            price: item.price,
            image: item.image
          },
          quantity: item.quantity,
          price: item.price
        })),
        deliveryAddress,
        paymentMethod: 'cash',
        specialInstructions: ''
      };

      const token = localStorage.getItem('token');
      const { data } = await axios.post('/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page page-container">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to get started!</p>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-container">
      <div className="container">
        <h1>Your Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item card">
                {item.image && (
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                )}
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="restaurant-name">{item.restaurantName}</p>
                  <p className="price">₹{item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="remove-btn"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹40</span>
            </div>
            <div className="summary-row">
              <span>Taxes</span>
              <span>₹{(calculateTotal() * 0.05).toFixed(2)}</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(calculateTotal() + 40 + (calculateTotal() * 0.05)).toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="btn btn-primary btn-block"
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;