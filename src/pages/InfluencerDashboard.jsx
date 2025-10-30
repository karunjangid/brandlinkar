import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './InfluencerDashboard.css';

const InfluencerDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=300&fit=crop", // Cartoon-style collaboration
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=300&fit=crop", // Artistic cartoon
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=300&fit=crop", // Data visualization cartoon
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=300&fit=crop", // VIP/networking cartoon
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleViewProfile = () => {
    // Profile view functionality can be added later
    setShowProfileOptions(false);
  };

  const handleEditProfile = () => {
    // Profile edit functionality can be added later
    setShowProfileOptions(false);
  };

  return (
    <div className="influencer-dashboard">
      {/* Custom Nav Bar */}
      <nav className="influencer-nav">
        <div className="nav-left">
          <div className="brand-logo">
            <span>BrandLinkar</span>
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      <section className="hero-carousel">
        <div className="carousel-container">
          <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={slide.id} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                <div className="slide-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
                </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="carousel-arrow prev" onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}>
            ‹
          </button>
          <button className="carousel-arrow next" onClick={() => goToSlide((currentSlide + 1) % slides.length)}>
            ›
          </button>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-item">
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">🔔</span>
          <span className="nav-label">Notifications</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">💬</span>
          <span className="nav-label">Chats</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">🎥</span>
          <span className="nav-label">Reels</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </div>
      </nav>
    </div>
  );
};

export default InfluencerDashboard;
