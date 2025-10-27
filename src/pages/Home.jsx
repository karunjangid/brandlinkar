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

  return (
    <>
      <NavBar showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
      <main id="home" className="home-hero">
        <div className="home-content">
          <h1>Welcome to BrandLinkar</h1>
          <p>Connecting Brands & Influencers for Mutual Growth</p>
          <button className="home-button" onClick={() => setShowLoginModal(true)}>Register Now</button>
        </div>
      </main>

      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h2>About BrandLinkar</h2>
              <p>
                BrandLinkar bridges the gap between brands and influencers, creating authentic partnerships that drive results. Our platform is designed to foster collaboration, transparency, and growth for both parties.
              </p>
              <p>
                We connect brands with the perfect influencers to amplify their reach and drive meaningful engagement. Join thousands of successful partnerships that have transformed businesses and careers.
              </p>
            </div>
            <div className="about-image">
              <img src={AboutUs} alt="BrandLinkar Team" />
            </div>
          </div>
          <div className="stats-container" ref={statsRef}>
            <div className="stat-item">
              <div className="stat-number" data-target="5000">0</div>
              <p> + Businesses Helped</p>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="25000">0</div>
              <p> + Influencers Onboarded</p>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="1000000">0</div>
              <p> $ + Earned by Influencers</p>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="98">0</div>
              <p>% + Trust Score</p>
            </div>
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
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section">
        <div className="how-it-works-container">
          <h2>How It Works</h2>
          <p>Simple steps to connect brands and influencers for successful partnerships.</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Register & Create Profile</h3>
              <p>Sign up as a brand or influencer and create your detailed profile showcasing your expertise and requirements.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Find Perfect Matches</h3>
              <p>Use our advanced matching algorithm to discover compatible partners based on niche, audience, and goals.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Collaborate & Create</h3>
              <p>Connect directly with your matches, discuss campaign details, and create authentic content together.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Track Success & Grow</h3>
              <p>Monitor campaign performance, measure ROI, and build long-term relationships for continued growth.</p>
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
              <div className="event-date">March 15, 2024</div>
              <p>A comprehensive summit featuring industry leaders, networking opportunities, and the latest trends in influencer marketing.</p>
            </div>
            <div className="event-card">
              <h3>Brand-Influencer Mixer</h3>
              <div className="event-date">April 22, 2024</div>
              <p>An exclusive networking event where brands and influencers can connect, collaborate, and build lasting partnerships.</p>
            </div>
            <div className="event-card">
              <h3>Content Creation Workshop</h3>
              <div className="event-date">May 10, 2024</div>
              <p>Learn from top content creators about crafting authentic, engaging content that drives results for brands and audiences.</p>
            </div>
            <div className="event-card">
              <h3>Digital Marketing Webinar</h3>
              <div className="event-date">June 5, 2024</div>
              <p>Explore the future of digital marketing with expert insights on emerging platforms, AI tools, and measurement strategies.</p>
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
                  <strong>Email:</strong> jangidkind@gmail.com
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
