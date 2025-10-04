import React from 'react';
import './Partners.css';

const Partners = () => {
  return (
    <section className="partners-section">
      <div className="partners-container">
        <h2>Our Partners</h2>
        <p>
          We collaborate with a diverse range of brands and influencers to create impactful campaigns and partnerships.
        </p>
        {/* Placeholder for partner logos or details */}
        <div className="partners-logos">
          <div className="partner-logo">Brand A</div>
          <div className="partner-logo">Brand B</div>
          <div className="partner-logo">Brand C</div>
          <div className="partner-logo">Brand D</div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
