import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'badge-warning',
      confirmed: 'badge-info',
      preparing: 'badge-info',
      'out-for-delivery': 'badge-info',
      delivered: 'badge-success',
      cancelled: 'badge-danger'
    };

    return (
      <span className={`badge ${statusClasses[status]}`}>
        {status.replace('-', ' ').toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page page-container">
        <div className="container">
          <div className="empty-orders">
            <h2>No orders yet</h2>
            <p>Start ordering delicious food!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page page-container">
      <div className="container">
        <h1>My Orders</h1>
        
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card card">
              <div className="order-header">
                <div>
                  <h3>{order.restaurant.name}</h3>
                  <p className="order-date">
                    {new Date(order.orderDate).toLocaleDateString()} at{' '}
                    {new Date(order.orderDate).toLocaleTimeString()}
                  </p>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span className="item-name">
                      {item.menuItem.name} x {item.quantity}
                    </span>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="delivery-address">
                  <strong>Delivery Address:</strong>
                  <p>
                    {order.deliveryAddress.street}, {order.deliveryAddress.city},{' '}
                    {order.deliveryAddress.state} - {order.deliveryAddress.zipCode}
                  </p>
                </div>
                <div className="order-total">
                  <strong>Total Amount:</strong>
                  <span className="total-amount">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;