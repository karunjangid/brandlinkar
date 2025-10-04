import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#home" className="navbar-logo">
          BRANDLINKAR
        </a>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <a href="#about" className="navbar-link" onClick={() => setIsOpen(false)}>About Us</a>
          <a href="#partners" className="navbar-link" onClick={() => setIsOpen(false)}>Partners</a>
          <a href="#contact" className="navbar-link" onClick={() => setIsOpen(false)}>Contact</a>
          <a href="#trust" className="navbar-link" onClick={() => setIsOpen(false)}>Why Choose Us</a>
          <button className="navbar-button" onClick={() => setIsOpen(false)}>Login/Signup</button>
        </div>
        <div className={`navbar-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
