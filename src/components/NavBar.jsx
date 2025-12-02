import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import './NavBar.css';

const NavBar = ({ onLogoClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (onLogoClick) onLogoClick();
    handleLinkClick();
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={handleLogoClick}>
          <img src={logo} alt="" className='logo1'/>ARKIZZA
          </Link>
          <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            {isHomePage ? (
              <>
                <a href="#team" className="navbar-link" onClick={handleLinkClick}>Team</a>
                <a href="#partners" className="navbar-link" onClick={handleLinkClick}>Partners</a>
                <a href="#contact" className="navbar-link" onClick={handleLinkClick}>Contact</a>
                <a href="#trust" className="navbar-link" onClick={handleLinkClick}>Why Choose Us</a>
              </>
            ) : (
              <>
                <Link to="/#team" className="navbar-link" onClick={handleLinkClick}>Team</Link>
                <Link to="/#partners" className="navbar-link" onClick={handleLinkClick}>Partners</Link>
                <Link to="/#contact" className="navbar-link" onClick={handleLinkClick}>Contact</Link>
                <Link to="/#trust" className="navbar-link" onClick={handleLinkClick}>Why Choose Us</Link>
              </>
            )}
          </div>
          <div className={`navbar-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
