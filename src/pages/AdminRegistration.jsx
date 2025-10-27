import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminRegistration.css';

const AdminRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (formData.adminCode !== 'ADMIN123') {
      alert("Invalid admin code!");
      setLoading(false);
      return;
    }

    try {
      const { signup } = useAuth();
      await signup(formData.email, formData.password, 'admin', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        createdAt: new Date()
      });

      navigate('/admin-panel');
    } catch (error) {
      console.error("Error submitting form: ", error);
      let errorMessage = "Error submitting form: " + error.message;

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists. Please use a different email.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address. Please enter a valid email.";
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-registration">
      <div className="registration-container">
        <div className="registration-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <h1>Admin Registration</h1>
          <p>Register as an administrator to manage the platform.</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="adminCode">Admin Code *</label>
              <input
                type="password"
                id="adminCode"
                name="adminCode"
                value={formData.adminCode}
                onChange={handleChange}
                placeholder="Enter admin code"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Registering...' : 'Register as Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegistration;
