import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
          BRANDLINKAR
        </Link>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {isHomePage ? (
            <>
              <a href="#about" className="navbar-link" onClick={handleLinkClick}>About Us</a>
              <a href="#how-it-works" className="navbar-link" onClick={handleLinkClick}>How It Works</a>
              <a href="#team" className="navbar-link" onClick={handleLinkClick}>Team</a>
              <a href="#partners" className="navbar-link" onClick={handleLinkClick}>Partners</a>
              <a href="#contact" className="navbar-link" onClick={handleLinkClick}>Contact</a>
              <a href="#trust" className="navbar-link" onClick={handleLinkClick}>Why Choose Us</a>
            </>
          ) : (
            <>
              <Link to="/#about" className="navbar-link" onClick={handleLinkClick}>About Us</Link>
              <Link to="/#how-it-works" className="navbar-link" onClick={handleLinkClick}>How It Works</Link>
              <Link to="/#team" className="navbar-link" onClick={handleLinkClick}>Team</Link>
              <Link to="/#partners" className="navbar-link" onClick={handleLinkClick}>Partners</Link>
              <Link to="/#contact" className="navbar-link" onClick={handleLinkClick}>Contact</Link>
              <Link to="/#trust" className="navbar-link" onClick={handleLinkClick}>Why Choose Us</Link>
            </>
          )}
          <button className="navbar-button" onClick={() => { handleLinkClick(); props.setShowRegistrationModal(true); }}>Login/Signup</button>
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
