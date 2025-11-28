import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import './Home.css';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, [cuisine, sort]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const params = {};
      if (cuisine) params.cuisine = cuisine;
      if (sort) params.sort = sort;
      
      const { data } = await axios.get('/api/restaurants', { params });
      setRestaurants(data.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.get('/api/restaurants', {
        params: { search, cuisine, sort }
      });
      setRestaurants(data.data);
    } catch (error) {
      console.error('Error searching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
    restaurant.cuisine.some(c => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="home page-container">
      <div className="hero-section">
        <div className="container">
          <h1>Discover the best food & drinks</h1>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </div>

      <div className="container">
        <div className="filters">
          <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="filter-select">
            <option value="">All Cuisines</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Thai">Thai</option>
            <option value="American">American</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="filter-select">
            <option value="">Sort By</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading restaurants...</div>
        ) : (
          <>
            <h2 className="section-title">
              {filteredRestaurants.length} Restaurants Found
            </h2>
            <div className="restaurants-grid">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;