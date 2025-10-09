import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BrandRegistration.css';

const BrandRegistration = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const brandingServices = [
    {
      id: 'product',
      title: 'Product-Based Branding',
      description: 'Transform everyday products into brand ambassadors',
      icon: 'fas fa-box-open',
      items: ['Bottle Box Jar Branding', 'Reusable Bags & Containers', 'Branded Tape & Wrapping', 'Custom Packaging Solutions'],
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      bgColor: 'rgba(102, 126, 234, 0.1)'
    },
    {
      id: 'environmental',
      title: 'Environmental Branding',
      description: 'Make your presence felt across the cityscape',
      icon: 'fas fa-building',
      items: ['Billboards & Hoardings', 'Posters & Wall Art', 'Vehicle Branding', 'Outdoor Advertising Solutions'],
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      bgColor: 'rgba(240, 147, 251, 0.1)'
    },
    {
      id: 'event',
      title: 'Event-Based Branding',
      description: 'Create memorable experiences at every touchpoint',
      icon: 'fas fa-calendar-alt',
      items: ['Pop-up Stalls & Kiosks', 'Festival Sponsorship', 'Branded Merchandise', 'Event Activation'],
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      bgColor: 'rgba(79, 172, 254, 0.1)'
    },
    {
      id: 'social',
      title: 'Social Media Branding',
      description: 'Leverage influencer power for authentic reach',
      icon: 'fas fa-users',
      items: ['Influencer Collaborations', 'Social Media Campaigns', 'Content Creation', 'Digital Marketing'],
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      bgColor: 'rgba(67, 233, 123, 0.1)'
    },
    {
      id: 'digital',
      title: 'Digital Branding',
      description: 'Dominate the online space with innovative solutions',
      icon: 'fas fa-globe',
      items: ['Website Development', 'Mobile Apps', 'Digital Marketing', 'SEO Optimization'],
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      bgColor: 'rgba(250, 112, 154, 0.1)'
    },
    {
      id: 'content',
      title: 'Content Creation',
      description: 'Tell your story through compelling visual narratives',
      icon: 'fas fa-video',
      items: ['Video Production', 'Photography', 'Blog Content', 'Brand Storytelling'],
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      bgColor: 'rgba(168, 237, 234, 0.1)'
    }
  ];

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    // Navigate to the actual registration form with the selected service
    navigate('/brand-registration-form', { state: { selectedService: serviceId } });
  };

  return (
    <div className="brand-registration">
      <div className="services-container">
        <div className="services-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <h1>Choose Your Branding Service</h1>
          <p>Select the type of branding solution that best fits your business needs. Our expert team will help you create impactful campaigns.</p>
        </div>

        <div className="services-grid">
          {brandingServices.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => handleServiceSelect(service.id)}
              style={{ '--card-bg': service.bgColor, '--card-gradient': service.color }}
            >
              <div className="card-header">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
              </div>

              <p className="service-description">{service.description}</p>

              <ul className="service-items">
                {service.items.map((item, index) => (
                  <li key={index}>
                    <i className="fas fa-check-circle"></i>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="card-footer">
                <button className="select-service-btn">
                  Choose This Service
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>

              {/* 3D Effect Elements */}
              <div className="card-3d-elements">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
              </div>
            </div>
          ))}
        </div>  
      </div>
    </div>
  );
};

export default BrandRegistration;
