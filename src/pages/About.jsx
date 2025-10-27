import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './About.css';

const About = () => {
  return (
    <>
      <NavBar />
      <section className="about-section">
        <div className="about-container">
          <h2>About BrandLinkar</h2>
          <p>
            BrandLinkar bridges the gap between brands and influencers, creating authentic partnerships that drive results.
            Our platform is designed to foster collaboration, transparency, and growth for both parties.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
