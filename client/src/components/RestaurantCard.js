import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className="restaurant-card card">
      <div className="restaurant-image">
        <img 
          src={restaurant.images?.[0] || 'https://via.placeholder.com/400x250'} 
          alt={restaurant.name}
        />
        {restaurant.rating.average > 0 && (
          <div className="rating-badge">
            ⭐ {restaurant.rating.average.toFixed(1)}
          </div>
        )}
      </div>
      
      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <p className="cuisine">{restaurant.cuisine.join(', ')}</p>
        <div className="restaurant-meta">
          <span className="price-range">{restaurant.priceRange}</span>
          <span className="delivery-time">🕐 {restaurant.deliveryTime}</span>
        </div>
        <p className="address">📍 {restaurant.address.city}</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;