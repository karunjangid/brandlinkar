import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">BRANDLINKAR</h3>
            <p>Transforming Businesses Through Digital Marketing Excellence</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#partners">Partners</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Malviya Nagar, Jaipur, Rajasthan, India 302017</p>
            <p>Email: jangidkind@gmail.com</p>
            <p>Phone: +918619448841</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>karun kumar jangid non&copy; 2024 Markizza. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
