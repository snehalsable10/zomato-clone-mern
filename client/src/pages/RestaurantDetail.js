import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './RestaurantDetail.css';

const RestaurantDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurant();
    fetchReviews();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const { data } = await axios.get(`/api/restaurants/${id}`);
      setRestaurant(data.data);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      toast.error('Failed to load restaurant');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/restaurant/${id}`);
      setReviews(data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, restaurantId: id, restaurantName: restaurant.name });
    toast.success(`${item.name} added to cart!`);
  };

  if (loading) {
    return <div className="loading">Loading restaurant...</div>;
  }

  if (!restaurant) {
    return <div className="error">Restaurant not found</div>;
  }

  return (
    <div className="restaurant-detail page-container">
      <div className="restaurant-header">
        <div className="restaurant-header-image">
          <img 
            src={restaurant.images?.[0] || 'https://via.placeholder.com/1200x400'} 
            alt={restaurant.name}
          />
        </div>
        <div className="container">
          <div className="restaurant-header-info">
            <h1>{restaurant.name}</h1>
            <p className="description">{restaurant.description}</p>
            <div className="restaurant-meta">
              <span className="rating">⭐ {restaurant.rating.average.toFixed(1)} ({restaurant.rating.count} reviews)</span>
              <span className="cuisine">{restaurant.cuisine.join(', ')}</span>
              <span className="price">{restaurant.priceRange}</span>
              <span className="delivery-time">🕐 {restaurant.deliveryTime}</span>
            </div>
            <p className="address">📍 {restaurant.address.street}, {restaurant.address.city}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="menu-section">
          <h2>Menu</h2>
          <div className="menu-grid">
            {restaurant.menu && restaurant.menu.length > 0 ? (
              restaurant.menu.map((item, index) => (
                <div key={index} className="menu-item card">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="menu-item-image" />
                  )}
                  <div className="menu-item-info">
                    <div className="menu-item-header">
                      <h3>{item.name}</h3>
                      {item.isVeg && <span className="veg-badge">🟢 Veg</span>}
                    </div>
                    <p className="menu-item-description">{item.description}</p>
                    <div className="menu-item-footer">
                      <span className="price">₹{item.price}</span>
                      {item.isAvailable ? (
                        <button 
                          onClick={() => handleAddToCart(item)} 
                          className="btn btn-primary"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <span className="unavailable">Unavailable</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No menu items available</p>
            )}
          </div>
        </div>

        <div className="reviews-section">
          <h2>Reviews ({reviews.length})</h2>
          {reviews.length > 0 ? (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review._id} className="review-card card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <img 
                        src={review.user.avatar || 'https://via.placeholder.com/50'} 
                        alt={review.user.name}
                        className="reviewer-avatar"
                      />
                      <div>
                        <h4>{review.user.name}</h4>
                        <span className="review-rating">⭐ {review.rating}</span>
                      </div>
                    </div>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;