import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './Home.css';
import AboutUs from "../assets/aboutus.png";
import beautyglow from "../assets/beautyglow.png";
import fashionhub from "../assets/fashionhub.png";
import techcorp from "../assets/techcorp.png";
import travekworld from "../assets/travekworld.png";
import foodiedelight from "../assets/foodiedelight.png";
import healthplus from "../assets/healthplus.png";
import Teammm from "../assets/Team.png";

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminSection, setAdminSection] = useState('');
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
        <div className="home-content">
          <h1>Welcome to BrandLinkar</h1>
          <p>Transforming Businesses Through Digital Marketing Excellence</p>
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
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="Rajesh Kumar" className="member-image" />
              <h3>Rajesh Kumar</h3>
              <p className="member-role">Digital Marketing Strategist</p>
              <p className="member-bio">Data-driven strategist specializing in performance marketing and campaign optimization across multiple platforms.</p>
            </div>
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="Priya Singh" className="member-image" />
              <h3>Priya Singh</h3>
              <p className="member-role">Creative Designer</p>
              <p className="member-bio">Award-winning designer creating visually stunning brand identities and marketing materials that captivate audiences.</p>
            </div>
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="Amit Patel" className="member-image" />
              <h3>Amit Patel</h3>
              <p className="member-role">Video Editor</p>
              <p className="member-bio">Expert video editor producing high-engagement reels and multimedia content for social platforms.</p>
            </div>
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="Sneha Gupta" className="member-image" />
              <h3>Sneha Gupta</h3>
              <p className="member-role">Videographer</p>
              <p className="member-bio">Professional videographer capturing compelling visuals and stories that bring brands to life.</p>
            </div>
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="Vikram Rao" className="member-image" />
              <h3>Vikram Rao</h3>
              <p className="member-role">Content Creator</p>
              <p className="member-bio">Creative content creator developing engaging narratives and multimedia content for brand campaigns.</p>
            </div>
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="Anjali Mehta" className="member-image" />
              <h3>Anjali Mehta</h3>
              <p className="member-role">Business Development Associate</p>
              <p className="member-bio">Strategic business development professional building partnerships and driving growth opportunities.</p>
            </div>
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="Karan Jain" className="member-image" />
              <h3>Karan Jain</h3>
              <p className="member-role">Customer Support Head</p>
              <p className="member-bio">Dedicated customer support leader ensuring exceptional client experiences and satisfaction.</p>
            </div>
            <div className="team-member">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="Meera Shah" className="member-image" />
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

      <section id="testimonials" className="testimonials-section">
        <div className="testimonials-container">
          <h2>What Our Users Say</h2>
          <p>Hear from brands and influencers who have transformed their success through our platform.</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"BrandLinkar helped us connect with the perfect influencers for our campaign. The results exceeded our expectations with a 300% increase in engagement."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://sayjglobalpartners.com/wp-content/uploads/2022/12/Depositphotos_24349949_l-2015.jpg" alt="Sarah Johnson" />
                <div>
                  <h4>Sarah Johnson</h4>
                  <p>Marketing Director, FashionHub</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"As an influencer, BrandLinkar opened doors to amazing brand partnerships. The platform is intuitive and the matches are spot-on."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://img.freepik.com/free-photo/group-business-people_53419-5550.jpg" alt="Michael Chen" />
                <div>
                  <h4>Michael Chen</h4>
                  <p>Lifestyle Influencer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The quality of partnerships on BrandLinkar is unmatched. We've seen significant growth in our brand awareness and sales."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://ocdn.eu/pulscms-transforms/1/zsrk9kuTURBXy9jMDFkNWFlOS05NTRhLTRhNmUtYTZiOC0xNTk4NTRlMjJkMTIuanBlZ5GVAs0EsADDw94AAaEwAQ" alt="Emma Rodriguez" />
                <div>
                  <h4>Emma Rodriguez</h4>
                  <p>CEO, BeautyGlow</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"BrandLinkar made it easy to find brands that align with my values. The collaborations have been authentic and profitable."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://www.pngkey.com/png/detail/982-9820724_corporate-solutions.png" alt="David Park" />
                <div>
                  <h4>David Park</h4>
                  <p>Fitness Influencer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Working with BrandLinkar has been a game-changer for our startup. Their influencer connections helped us reach our target audience effectively and affordably."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="Arjun Sharma" />
                <div>
                  <h4>Arjun Sharma</h4>
                  <p>Startup Founder, TechStart</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The analytics and reporting from BrandLinkar gave us clear insights into our campaign performance. We've seen a 250% ROI increase since partnering with them."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="Priya Verma" />
                <div>
                  <h4>Priya Verma</h4>
                  <p>Marketing Manager, EcoFashion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="success-stories" className="success-stories-section">
        <div className="success-stories-container">
          <h2>Success Stories</h2>
          <p>Real results from partnerships that transformed businesses and careers.</p>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-content">
                <h3>FashionHub Campaign Success</h3>
                <p>Partnered with top fashion influencers to launch a sustainable clothing line, resulting in massive brand awareness and customer engagement.</p>
                <div className="story-stats">
                  <span>300% Traffic Increase</span>
                  <span>50K New Followers</span>
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-content">
                <h3>TechCorp App Launch</h3>
                <p>Collaborated with tech influencers to promote a new productivity app, driving downloads and establishing market presence.</p>
                <div className="story-stats">
                  <span>10K App Downloads</span>
                  <span>$50K Revenue Generated</span>
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-content">
                <h3>FoodieDelight Viral Campaign</h3>
                <p>Worked with food bloggers to create authentic content that went viral, boosting orders and establishing brand authority.</p>
                <div className="story-stats">
                  <span>200% Order Increase</span>
                  <span>Viral Social Media Reach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="event-highlights" className="event-highlights-section">
        <div className="event-highlights-container">
          <h2>Upcoming Events</h2>
          <p>Join us for exciting events designed to connect, educate, and inspire the influencer marketing community.</p>
          <div className="events-grid">
            <div className="event-card">
              <h3>Influencer Marketing Summit</h3>
              <div className="event-date">March 15, 2026</div>
              <p>A comprehensive summit featuring industry leaders, networking opportunities, and the latest trends in influencer marketing.</p>
            </div>
            <div className="event-card">
              <h3>Brand-Influencer Mixer</h3>
              <div className="event-date">April 22, 2026</div>
              <p>An exclusive networking event where brands and influencers can connect, collaborate, and build lasting partnerships.</p>
            </div>
            <div className="event-card">
              <h3>Content Creation Workshop</h3>
              <div className="event-date">May 10, 2027</div>
              <p>Learn from top content creators about crafting authentic, engaging content that drives results for brands and audiences.</p>
            </div>
            <div className="event-card">
              <h3>Digital Marketing Webinar</h3>
              <div className="event-date">June 5, 2027</div>
              <p>Explore the future of digital marketing with expert insights on emerging platforms, AI tools, and measurement strategies.</p>
            </div>
            <div className="event-card">
              <h3>Influencer Collaboration Conference</h3>
              <div className="event-date">July 12, 2026</div>
              <p>Join leading influencers and brands for an intensive conference on building successful long-term partnerships and maximizing campaign impact.</p>
            </div>
            <div className="event-card">
              <h3>Digital Strategy Masterclass</h3>
              <div className="event-date">August 20, 2027</div>
              <p>A hands-on masterclass covering advanced digital marketing strategies, data analytics, and emerging technologies for business growth.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="trust" className="trust-section">
        <div className="trust-container">
          <h2>Why Choose BrandLinkar</h2>
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
          <p>Get in touch with our team to learn more about how BrandLinkar can help your business grow.</p>
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
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Enter subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Enter your message" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
