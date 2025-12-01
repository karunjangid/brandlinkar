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
          <h2>About Markizza Digital Agency</h2>
          <p>
            Markizza Digital Agency is a full-service digital marketing powerhouse specializing in influencer marketing, performance advertising, and brand storytelling. We transform businesses through innovative digital strategies that drive measurable results and sustainable growth.
          </p>
          <p>
            Our mission is to bridge the gap between brands and their audiences through authentic, data-driven marketing solutions. We specialize in influencer partnerships, high-performance ad campaigns, and compelling brand narratives that resonate in today's digital landscape.
          </p>
          <div className="about-services">
            <h3>Our Expertise</h3>
            <ul>
              <li><strong>Influencer Marketing & Reels:</strong> Authentic partnerships with creators to produce engaging content that drives real engagement and conversions.</li>
              <li><strong>Performance Ads:</strong> Optimized campaigns on Meta and Google platforms delivering maximum ROI through targeted advertising.</li>
              <li><strong>Brand Storytelling:</strong> Crafting compelling narratives and premium campaigns that build emotional connections with audiences.</li>
              <li><strong>Local Business Growth:</strong> Tailored strategies for restaurants, cafes, salons, events, boutiques, startups, and malls to boost local visibility and sales.</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
