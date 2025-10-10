import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './BrandRegistrationForm.css';

const BrandRegistrationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedService = location.state?.selectedService;

  const [formData, setFormData] = useState({
    brandName: '',
    ownerName: '',
    contactNumber: '',
    email: '',
    budget: '',
    targetAudience: '',
    targetedVideo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collectionName = selectedService === 'environmental' ? 'environmentalInquiries' : 'packagingInquiries';
      await addDoc(collection(db, collectionName), { ...formData, service: selectedService });
      navigate('/submission-success', { state: { type: 'brand' } });
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error submitting form. Please try again.');
    }
  };

  if (!['product', 'environmental'].includes(selectedService)) {
    return (
      <div className="brand-form-container">
        <h1>Service Not Available</h1>
        <p>The selected service form is not yet implemented.</p>
        <button onClick={() => navigate('/brand-registration')}>Back to Services</button>
      </div>
    );
  }

  const isEnvironmental = selectedService === 'environmental';

  return (
    <div className={`brand-form-container ${isEnvironmental ? 'environmental-theme' : 'product-theme'}`}>
      {/* Product Theme Elements */}
      {!isEnvironmental && (
        <>
          <div className="branded-bottle"></div>
          <div className="branded-box"></div>
          <div className="branded-jar"></div>
          <div className="packaging-animation"></div>
        </>
      )}
      {/* Environmental Theme Elements */}
      {isEnvironmental && (
        <>
          <div className="clouds-bg"></div>
          <div className="hanging-board"></div>
          <div className="promotion-video-placeholder"></div>
          <div className="animated-poster"></div>
          <div className="branded-car"></div>
          <div className="sky-billboard"></div>
        </>
      )}

      <div className="form-header">
        <button className="back-button" onClick={() => navigate('/brand-registration')}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <h1>{isEnvironmental ? '🌤️ Environmental Branding Inquiry' : '🌟 Product-Based Packaging Inquiry'}</h1>
        <p>{isEnvironmental ? 'Create impactful outdoor presence with billboards, posters, and vehicle branding. Share your vision!' : 'Fill out the details below and our team will connect with you soon!'}</p>
      </div>

      <form onSubmit={handleSubmit} className={`packaging-brief-form ${isEnvironmental ? 'environmental-form' : 'product-form'}`}>
        <div className="form-group">
          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            value={formData.brandName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ownerName">Owner Name:</label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="budget">Budget:</label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            required
          />
        </div>
        {isEnvironmental && (
          <>
            <div className="form-group">
              <label htmlFor="targetAudience">Target Audience:</label>
              <input
                type="text"
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="e.g., Urban youth, professionals aged 25-35"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="targetedVideo">Targeted Video Requirements:</label>
              <textarea
                id="targetedVideo"
                name="targetedVideo"
                value={formData.targetedVideo}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe the promotion video: length, style, key messages, locations for posters/wall art, vehicle branding ideas, etc."
                required
              ></textarea>
            </div>
          </>
        )}

        <div className="form-actions">
          <button type="submit" className="submit-btn">{isEnvironmental ? 'Submit Environmental Brief' : 'Submit Brief'}</button>
        </div>
      </form>
    </div>
  );
};

export default BrandRegistrationForm;
