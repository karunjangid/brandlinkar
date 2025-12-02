import React, { useEffect, useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './Home.css';
import beautyglow from "../assets/beautyglow.png";
import fashionhub from "../assets/fashionhub.png";
import techcorp from "../assets/techcorp.png";
import travekworld from "../assets/travekworld.png";
import foodiedelight from "../assets/foodiedelight.png";
import healthplus from "../assets/healthplus.png";
import Teammm from "../assets/Team.png";
import Team2 from "../assets/team2.jpg";

function ContactForm() {
  const [state, handleSubmit] = useForm("xqarbbod");
  if (state.succeeded) {
    return <p>Thanks for your message! We'll get back to you soon.</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          required
        />
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          name="subject"
          placeholder="Enter subject"
          required
        />
        <ValidationError
          prefix="Subject"
          field="subject"
          errors={state.errors}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Enter your message"
          required
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <button type="submit" className="submit-btn" disabled={state.submitting}>
        Send Message
      </button>
      {state.errors && state.errors.length > 0 && (
        <p style={{ color: 'red' }}>There was an error submitting the form. Please try again.</p>
      )}
    </form>
  );
}

function ScheduleForm() {
  const [state, handleSubmit] = useForm("xqarbbod"); // Replace with new Formspree form ID for scheduling
  if (state.succeeded) {
    return <p>Meeting scheduled successfully! We'll send a confirmation to your email.</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="schedule-form">
      <div className="form-group">
        <label htmlFor="date">Select Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
        />
        <ValidationError
          prefix="Date"
          field="date"
          errors={state.errors}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          required
        />
        <ValidationError
          prefix="Phone"
          field="phone"
          errors={state.errors}
        />
      </div>
      <div className="form-group">
        <label htmlFor="schedule-message">Message</label>
        <textarea
          id="schedule-message"
          name="message"
          rows="3"
          placeholder="Enter your message"
          required
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <button type="submit" className="submit-btn" disabled={state.submitting}>
        Schedule Meeting
      </button>
      {state.errors && state.errors.length > 0 && (
        <p style={{ color: 'red' }}>There was an error scheduling the meeting. Please try again.</p>
      )}
    </form>
  );
}

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminSection, setAdminSection] = useState('');
  const [showMeetingOptions, setShowMeetingOptions] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach((counter) => {
              const target = +counter.getAttribute('data-target');
              const increment = target / 200;
              let current = 0;

              const updateCounter = () => {
                current += increment;
                if (current < target) {
                  counter.innerText = Math.ceil(current);
                  setTimeout(updateCounter, 10);
                } else {
                  counter.innerText = target;
                }
              };
              updateCounter();
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount === 7) {
      setShowLoginModal(true);
      setLogoClickCount(0);
    }
  };

  const handleLogin = (username, password) => {
    if (username === 'jangidkind' && password === 'Karun@8619') {
      setIsAdminLoggedIn(true);
      setShowLoginModal(false);
      setShowAdminPanel(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleAdminAction = (section) => {
    setAdminSection(section);
  };

  const handleAddCard = (section) => {
    // Logic to add new card to the section
    alert(`Add new card to ${section}`);
  };

  const handleDeleteCard = (section) => {
    // Logic to delete previous card from the section
    alert(`Delete previous card from ${section}`);
  };

  const handleSave = () => {
    // Logic to save changes
    alert('Changes saved');
  };

  return (
    <>
      <NavBar onLogoClick={handleLogoClick} />
      {showLoginModal && (
        <div className="login-modal">
          <div className="login-modal-content">
            <h2>Admin Login</h2>
            <input type="text" placeholder="Username" id="username" />
            <input type="password" placeholder="Password" id="password" />
            <button onClick={() => handleLogin(document.getElementById('username').value, document.getElementById('password').value)}>Login</button>
            <button onClick={() => setShowLoginModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      {showAdminPanel && (
        <div className="admin-panel">
          <h2>Admin Panel</h2>
          <button onClick={() => handleAdminAction('services')}>Our Services</button>
          <button onClick={() => handleAdminAction('team')}>Team</button>
          <button onClick={() => handleAdminAction('tools')}>Tools</button>
          <button onClick={() => handleAdminAction('reviews')}>Reviews</button>
          <button onClick={() => handleAdminAction('events')}>Upcoming Events</button>
          {adminSection && (
            <div className="admin-section">
              <h3>Edit {adminSection}</h3>
              <button onClick={() => handleAddCard(adminSection)}>Add New Card</button>
              <button onClick={() => handleDeleteCard(adminSection)}>Delete Previous Card</button>
              <button onClick={handleSave}>Save</button>
            </div>
          )}
          <button onClick={() => { setShowAdminPanel(false); setIsAdminLoggedIn(false); }}>Logout</button>
        </div>
      )}
      <main id="home" className="home-hero">
        <div className="hero-background">
          <div className="bg-element airplane">
            <i className="fas fa-plane"></i>
          </div>
          <div className="bg-element chart">
            <i className="fas fa-chart-bar"></i>
          </div>
          <div className="bg-element megaphone">
            <i className="fas fa-bullhorn"></i>
          </div>
          <div className="bg-element users">
            <i className="fas fa-users"></i>
          </div>
          <div className="bg-element rocket">
            <i className="fas fa-rocket"></i>
          </div>
          <div className="bg-element lightbulb">
            <i className="fas fa-lightbulb"></i>
          </div>
          <div className="bg-element graph">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="bg-element target">
            <i className="fas fa-bullseye"></i>
          </div>
        </div>
        <div className="home-content">
          <h1>Welcome to Markizza</h1>
          <p>Transforming Businesses Through Digital Marketing Excellence</p>
          {!showMeetingOptions && <button className="schedule-btn" onClick={() => setShowMeetingOptions(true)}>Schedule Meeting</button>}
          {showMeetingOptions && (
            <div className="meeting-options">
              <a href="tel:8619448841" className="option-btn call-btn">
                <i className="fas fa-phone"></i> Call Now
              </a>
              <button className="option-btn schedule-btn" onClick={() => { setShowScheduleForm(true); setShowMeetingOptions(false); }}>
                <i className="fas fa-calendar-alt"></i> Schedule Meeting
              </button>
            </div>
          )}
          {showScheduleForm && (
            <div className="schedule-modal">
              <div className="schedule-modal-content">
                <h3>Schedule a Meeting</h3>
                <ScheduleForm />
                <button onClick={() => setShowScheduleForm(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </main>

      <section id="services" className="services-section">
        <div className="services-container">
          <h2>Our Services</h2>
          <p>Comprehensive digital marketing solutions tailored to elevate your brand.</p>
          <div className="services-grid">
            <div className="service-card">
              <i className="fas fa-users"></i>
              <h3>Influencer Marketing & Reels</h3>
              <p>Connect with authentic influencers to create engaging reels and content that drives real results.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-bullhorn"></i>
              <h3>Performance Ads (Meta & Google)</h3>
              <p>Optimize campaigns on Meta and Google platforms for maximum ROI and targeted reach.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-book-open"></i>
              <h3>Brand Storytelling & Premium Campaigns</h3>
              <p>Craft compelling narratives and execute high-impact campaigns that resonate with your audience.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-store"></i>
              <h3>Local Business Growth</h3>
              <p>Boost visibility and sales for restaurants, cafes, salons, events, boutiques, new startups, and malls.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-search"></i>
              <h3>SEO & Content Marketing</h3>
              <p>Optimize your online presence with strategic SEO and compelling content that drives organic traffic and engagement.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-chart-bar"></i>
              <h3>Analytics & Reporting</h3>
              <p>Track performance with detailed analytics and custom reports to measure ROI and refine your marketing strategies.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="promo-video" className="promo-video-section">
        <div className="promo-video-container">
          <h2>Watch Our Success Stories</h2>
          <p>See how we've helped brands transform their digital presence with our expert marketing strategies.</p>
          <div className="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Hin8-nEFIuI?si=DU5Z9UFzg4q1pMCn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </section>

      <section id="partners" className="partners-section">
        <div className="partners-container">
          <h2>Our Trusted Partners</h2>
          <p>
            We collaborate with leading brands and influencers to create authentic partnerships that drive results and foster growth.
          </p>
          <div className="partners-grid">
            <div className="partner-card">
              <div className="partner-logo">
                <img src={techcorp} alt="TechCorp" />
              </div>
              <h3>TechCorp</h3>
              <p>Leading technology company specializing in innovative solutions.</p>
              <div className="partner-stats">
                <span>500K+ Users</span>
                <span>Global Reach</span>
              </div>
            </div>
            <div className="partner-card">
              <div className="partner-logo">
                <img src={fashionhub} alt="FashionHub" />
              </div>
              <h3>FashionHub</h3>
              <p>Premium fashion brand connecting style with sustainability.</p>
              <div className="partner-stats">
                <span>2M+ Followers</span>
                <span>Eco-Friendly</span>
              </div>
            </div>
            <div className="partner-card">
              <div className="partner-logo">
                <img src={foodiedelight} alt="FoodieDelight" />
              </div>
              <h3>FoodieDelight</h3>
              <p>Gourmet food delivery service with authentic flavors.</p>
              <div className="partner-stats">
                <span>1M+ Orders</span>
                <span>5-Star Rated</span>
              </div>
            </div>
            <div className="partner-card">
              <div className="partner-logo">
                <img src={healthplus} alt="HealthPlus" />
              </div>
              <h3>HealthPlus</h3>
              <p>Wellness and fitness brand promoting healthy lifestyles.</p>
              <div className="partner-stats">
                <span>10K+ Members</span>
                <span>Certified</span>
              </div>
            </div>
            <div className="partner-card">
              <div className="partner-logo">
                <img src={travekworld} alt="TravelWorld" />
              </div>
              <h3>TravelWorld</h3>
              <p>Adventure travel company offering unique experiences.</p>
              <div className="partner-stats">
                <span>50+ Countries</span>
                <span>Award-Winning</span>
              </div>
            </div>
            <div className="partner-card">
              <div className="partner-logo">
                <img src={beautyglow} alt="BeautyGlow" />
              </div>
              <h3>BeautyGlow</h3>
              <p>Luxury beauty products with natural ingredients.</p>
              <div className="partner-stats">
                <span>3M+ Customers</span>
                <span>Organic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="team-section">
        <div className="team-container">
          <h2>Meet Our Team</h2>
          <p>Passionate professionals dedicated to connecting brands and influencers for mutual success.</p>
          <div className="team-grid">
            <div className="team-member">
              <img src={Teammm} alt="Karun Kumar Jangid" className="member-image" />
              <h3>Karun Kumar Jangid</h3>
              <p className="member-role">CEO & Founder</p>
              <p className="member-bio">Visionary leader with expertise in digital marketing and influencer partnerships, driving innovation in the industry.</p>
            </div>
            <div className="team-member">
              <img src={Team2} className="member-image" />
              <h3>Nitin Kumar Sharma</h3>
              <p className="member-role">Co - Founder & Digital marketing expert</p>
              <p className="member-bio">Visionary leader with expertise in digital marketing and influencer partnerships, driving innovation in the industry.</p>
            </div>
            <div className="team-member">
              <img src="https://media.istockphoto.com/id/1359499268/photo/young-woman-working-at-home-stock-photo.jpg?b=1&s=170667a&w=0&k=20&c=a7eR4vmPkFqidzvCwp6wfjowEb9e5s8fl8F38ACtWzQ=" alt="Meera Shah" className="member-image" />
              <h3>Meera Shah</h3>
              <p className="member-role">HR Manager</p>
              <p className="member-bio">Experienced HR professional fostering a positive work culture and talent development.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="tools-section">
        <div className="tools-container">
          <h2>Our Tools & Technologies</h2>
          <p>We leverage cutting-edge tools to deliver exceptional results.</p>
          <div className="tools-grid">
            <div className="tool-card">
              <i className="fas fa-palette"></i>
              <h3>Canva Pro</h3>
              <p>Advanced design tools for creating stunning visuals and graphics.</p>
            </div>
            <div className="tool-card">
              <i className="fas fa-photo-video"></i>
              <h3>Adobe Suite</h3>
              <p>Professional editing and design software for premium content creation.</p>
            </div>
            <div className="tool-card">
              <i className="fab fa-facebook-f"></i>
              <h3>Meta Ads Manager</h3>
              <p>Powerful platform for running targeted ad campaigns on Facebook and Instagram.</p>
            </div>
            <div className="tool-card">
              <i className="fab fa-google"></i>
              <h3>Google Ads</h3>
              <p>Comprehensive advertising solutions for search, display, and video campaigns.</p>
            </div>
            <div className="tool-card">
              <i className="fas fa-brain"></i>
              <h3>Notion</h3>
              <p>All-in-one workspace for project management and team collaboration.</p>
            </div>
            <div className="tool-card">
              <i className="fas fa-users-cog"></i>
              <h3>CRM</h3>
              <p>Customer relationship management system for streamlined client interactions.</p>
            </div>
            <div className="tool-card">
              <i className="fas fa-share-square"></i>
              <h3>Hootsuite</h3>
              <p>Social media management platform for scheduling posts and analyzing performance.</p>
            </div>
            <div className="tool-card">
              <i className="fab fa-mailchimp"></i>
              <h3>Mailchimp</h3>
              <p>Email marketing automation and campaign management for targeted outreach.</p>
            </div>
          </div>
        </div>
      </section>


      <section id="trust" className="trust-section">
        <div className="trust-container">
          <h2>Why Choose Markizza</h2>
          <p>Experience the difference with our commitment to excellence, security, and authentic partnerships.</p>
          <div className="trust-grid">
            <div className="trust-item">
              <i className="fas fa-shield-alt"></i>
              <h3>Secure Platform</h3>
              <p>Advanced security measures protect your data and ensure safe, confidential transactions.</p>
            </div>
            <div className="trust-item">
              <i className="fas fa-handshake"></i>
              <h3>Authentic Partnerships</h3>
              <p>We facilitate genuine connections between brands and influencers for meaningful collaborations.</p>
            </div>
            <div className="trust-item">
              <i className="fas fa-chart-line"></i>
              <h3>Proven Results</h3>
              <p>Track campaign performance with detailed analytics and measurable ROI insights.</p>
            </div>
            <div className="trust-item">
              <i className="fas fa-headset"></i>
              <h3>24/7 Support</h3>
              <p>Our dedicated support team is always ready to assist you with any questions or concerns.</p>
            </div>
            <div className="trust-item">
              <i className="fas fa-award"></i>
              <h3>Award-Winning</h3>
              <p>Recognized industry leader with multiple awards for innovation in influencer marketing.</p>
            </div>
            <div className="trust-item">
              <i className="fas fa-users"></i>
              <h3>Community Driven</h3>
              <p>Join a thriving community of brands and influencers committed to mutual growth and success.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-container">
          <h2>Contact Us</h2>
          <p>Get in touch with our team to learn more about how Markizza can help your business grow.</p>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <strong>Email:</strong> jangidkind@amazon.com
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <div>
                  <strong>Phone:</strong> +918619448841
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Address:</strong> Malviya Nagar, Jaipur, Rajasthan, India 302017
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
