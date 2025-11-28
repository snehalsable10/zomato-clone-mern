import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Auth.css';

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user'
  });

  const { name, email, password, phone, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/register', formData);
      
      localStorage.setItem('user', JSON.stringify(data.data));
      localStorage.setItem('token', data.data.token);
      
      setUser(data.data);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-page page-container">
      <div className="auth-container card">
        <h2>Create Account</h2>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={onChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
              placeholder="Enter password (min 6 characters)"
            />
          </div>

          <div className="input-group">
            <label>Register as</label>
            <select name="role" value={role} onChange={onChange}>
              <option value="user">Customer</option>
              <option value="restaurant">Restaurant Owner</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;