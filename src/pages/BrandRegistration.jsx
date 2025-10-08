import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BrandRegistration.css';

const BrandRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    website: '',
    industry: '',
    companySize: '',
    description: '',
    goals: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Brand Registration:', formData);
    // For now, just navigate back to home
    navigate('/');
  };

  return (
    <div className="brand-registration">
      <div className="registration-container">
        <div className="registration-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <h1>Join as a Brand Owner or Event Organizer</h1>
          <p>Connect with authentic influencers, launch impactful campaigns, and drive real results for your brand or event.</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Company Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyName">Company/Brand Name *</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactName">Contact Person Name *</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
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
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="industry">Industry *</label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Industry</option>
                  <option value="fashion">Fashion & Apparel</option>
                  <option value="beauty">Beauty & Cosmetics</option>
                  <option value="food">Food & Beverage</option>
                  <option value="tech">Technology</option>
                  <option value="health">Health & Wellness</option>
                  <option value="fitness">Fitness & Sports</option>
                  <option value="travel">Travel & Tourism</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="automotive">Automotive</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="education">Education</option>
                  <option value="events">Events & Entertainment</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="companySize">Company Size *</label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                required
              >
                <option value="">Select Company Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
                <option value="startup">Startup</option>
                <option value="freelancer">Freelancer/Individual</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h2>About Your Brand/Event</h2>
            <div className="form-group">
              <label htmlFor="description">Company/Brand Description *</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell influencers about your company, brand values, products/services..."
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="goals">Campaign Goals & Target Audience</label>
              <textarea
                id="goals"
                name="goals"
                rows="3"
                value={formData.goals}
                onChange={handleChange}
                placeholder="What are your marketing goals? Who is your target audience?"
              ></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandRegistration;
