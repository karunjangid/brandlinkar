import React from 'react';
import './RegistrationSelection.css';

import { useNavigate } from 'react-router-dom';

const RegistrationSelection = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleInfluencerClick = () => {
    onClose();
    navigate('/influencer-registration');
  };

  const handleBrandClick = () => {
    onClose();
    navigate('/brand-registration');
  };

  return (
    <div className="registration-modal-overlay" onClick={onClose}>
      <div className="registration-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>

        <div className="registration-cards-container">
          <div className="registration-card influencer-card">
            <div className="card-content">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                  <path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M4 21v-2a4 4 0 0 1 3-3.87"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h2>I'm an Influencer</h2>
              <p className="tagline">Amplify your voice, monetize your passion, and build authentic connections with brands that align with your values</p>
              <br />

              <button className="card-button" onClick={handleInfluencerClick}>Join as Influencer</button>
            </div>
          </div>

          <div className="registration-card brand-card">
            <div className="card-content">
              <div className="card-icon">
                <i className="fas fa-building"></i>
              </div>
              <h2>I'm a Brand Owner or Event Organizer</h2>
              <p className="tagline">Connect with authentic influencers, launch impactful campaigns, and drive real results for your brand or event.</p>
              <button className="card-button" onClick={handleBrandClick}>Join as Brand/Event</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSelection;
