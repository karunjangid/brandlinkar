import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './SubmissionSuccess.css';

const SubmissionSuccess = () => {
  const location = useLocation();
  const isBrand = location.state?.type === 'brand';
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Trigger confetti animation after component mounts
    setTimeout(() => setShowConfetti(true), 500);
    // Show modal for brand after a delay
    if (isBrand) {
      setTimeout(() => setShowModal(true), 2000);
    }
  }, [isBrand]);

  return (
    <div className="submission-success">
      <div className="success-container">
        {/* Firecracker/Explosion Animation */}
        <div className="fireworks">
          <div className="firework red"></div>
          <div className="firework blue"></div>
          <div className="firework yellow"></div>
          <div className="firework green"></div>
          <div className="firework purple"></div>
        </div>

        {/* Confetti */}
        {showConfetti && (
          <div className="confetti-container">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'][Math.floor(Math.random() * 5)]
                }}
              ></div>
            ))}
          </div>
        )}

        {/* Success Content */}
        <div className="success-content">
          <div className="success-icon">
            <span className="checkmark">✓</span>
          </div>

          <h1 className="success-title">Boom! 🎉</h1>

          <div className="success-message">
            <p className="main-message">
              Thanks for showing interest in <span className="brand-name">BrandLinkar</span>! 🚀
            </p>
            <p className="sub-message">
              {isBrand ? 'Your brand packaging inquiry has been submitted successfully! 💫' : 'Your influencer registration has been submitted successfully! 💫'}
            </p>
            <p className="timeline">
              We'll get back to you within <span className="highlight">24-48 hours</span> ⏰
            </p>
          </div>

          <div className="social-proof">
            <p>{isBrand ? 'Join thousands of brands already on our platform! 🌟' : 'Join thousands of influencers already on our platform! 🌟'}</p>
          </div>

          <div className="action-buttons">
            <button
              className="home-button"
              onClick={() => window.location.href = '/'}
            >
              Back to Home 🏠
            </button>
            <button
              className="share-button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'BrandLinkar - Connect with Brands!',
                    text: 'Just joined BrandLinkar as an influencer! Check it out!',
                    url: window.location.origin
                  });
                } else {
                  navigator.clipboard.writeText(window.location.origin);
                  alert('Link copied to clipboard!');
                }
              }}
            >
              Share with Friends 👥
            </button>
          </div>
        </div>

        {/* Floating Emojis */}
        <div className="floating-emojis">
          <span className="emoji rocket">🚀</span>
          <span className="emoji star">⭐</span>
          <span className="emoji fire">🔥</span>
          <span className="emoji sparkles">✨</span>
        </div>
      </div>

      {/* Brand Success Modal */}
      {showModal && (
        <div className="brand-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="brand-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🎉</div>
            <h2>Success!</h2>
            <p>Your details captured successfully! One of our team members will connect with you within 24-48 hours.</p>
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>Got it!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionSuccess;
