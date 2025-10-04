import React, { useEffect, useRef } from 'react';
import './Home.css';
import AboutUs from "../assets/aboutus.png";
import beautyglow from "../assets/beautyglow.png";
import fashionhub from "../assets/fashionhub.png";
import techcorp from "../assets/techcorp.png";
import travekworld from "../assets/travekworld.png";
import foodiedelight from "../assets/foodiedelight.png";
import healthplus from "../assets/healthplus.png";



const Home = () => {
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
      <main id="home" className="home-hero">
        <div className="home-content">
          <h1>Welcome to BrandLinkar</h1>
          <p>Connecting Brands & Influencers for Mutual Growth</p>
          <button className="home-button">Register Now</button>
        </div>
      </main>

      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h2>About BrandLinkar</h2>
              <p>
                BrandLinkar bridges the gap between brands and influencers, creating authentic partnerships that drive results.
                Our platform is designed to foster collaboration, transparency, and growth for both parties.
              </p>
              <p>
                We connect brands with the perfect influencers to amplify their reach and drive meaningful engagement.
                Join thousands of successful partnerships that have transformed businesses and careers.
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
          <h2>Our Team</h2>
          <p>Meet the passionate professionals behind BrandLinkar.</p>
          <div className="team-grid">
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="John Doe" className="member-image" />
              <h3>John Doe</h3>
              <p className="member-role">CEO & Founder</p>
              <p className="member-bio">Experienced entrepreneur with a passion for connecting brands and influencers.</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="Jane Smith" className="member-image" />
              <h3>Jane Smith</h3>
              <p className="member-role">Head of Partnerships</p>
              <p className="member-bio">Expert in building strategic partnerships and driving collaborative growth.</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="Mike Johnson" className="member-image" />
              <h3>Mike Johnson</h3>
              <p className="member-role">Lead Developer</p>
              <p className="member-bio">Full-stack developer focused on creating innovative solutions for the platform.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section">
        <div className="how-it-works-container">
          <h2>How It Works</h2>
          <p>Simple steps to connect brands and influencers for mutual success.</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Sign Up</h3>
              <p>Create your account as a brand or influencer and complete your profile.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Find Matches</h3>
              <p>Browse through our curated list of partners that match your goals and values.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Connect & Collaborate</h3>
              <p>Reach out to potential partners and start building meaningful relationships.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Launch Campaigns</h3>
              <p>Execute successful campaigns and track your results in real-time.</p>
            </div>
          </div>
        </div>
      </section>


      <section id="testimonials" className="testimonials-section">
        <div className="testimonials-container">
          <h2>What Our Partners Say</h2>
          <p>Hear from the influencers and brand owners who have transformed their careers and businesses with BrandLinkar.</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"BrandLinkar helped me connect with amazing brands that aligned with my values. My engagement rates skyrocketed, and I've never felt more authentic in my partnerships."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://via.placeholder.com/60" alt="Sarah Johnson" />
                <div>
                  <h4>Sarah Johnson</h4>
                  <p>Lifestyle Influencer | 500K+ Followers</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"As a brand owner, finding genuine influencers was always a challenge. BrandLinkar made it effortless. Our campaigns now reach the right audience with incredible ROI."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://via.placeholder.com/60" alt="Michael Chen" />
                <div>
                  <h4>Michael Chen</h4>
                  <p>CEO, TechCorp | 500K+ Users</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The platform's transparency and support team are outstanding. I've built lasting relationships that have boosted my career and income significantly."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://via.placeholder.com/60" alt="Emma Rodriguez" />
                <div>
                  <h4>Emma Rodriguez</h4>
                  <p>Fashion Influencer | 1M+ Followers</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"BrandLinkar's matching algorithm is spot-on. We've partnered with influencers who truly understand our brand, leading to authentic campaigns and real growth."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://via.placeholder.com/60" alt="David Park" />
                <div>
                  <h4>David Park</h4>
                  <p>Marketing Director, BeautyGlow | 3M+ Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="success-stories" className="success-stories-section">
        <div className="success-stories-container">
          <h2>Success Stories</h2>
          <p>Real partnerships, real results. See how BrandLinkar has transformed businesses and careers.</p>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-image">
                <img src="https://via.placeholder.com/300x200" alt="Fashion Campaign" />
              </div>
              <div className="story-content">
                <h3>FashionHub x Emma Rodriguez</h3>
                <p>A sustainable fashion brand partnered with a lifestyle influencer, resulting in 300% increase in website traffic and 50K new followers.</p>
                <div className="story-stats">
                  <span>300% Traffic Increase</span>
                  <span>50K New Followers</span>
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-image">
                <img src="https://via.placeholder.com/300x200" alt="Tech Campaign" />
              </div>
              <div className="story-content">
                <h3>TechCorp x Sarah Johnson</h3>
                <p>A tech startup collaborated with a tech influencer, leading to 10K app downloads and $50K in revenue within the first month.</p>
                <div className="story-stats">
                  <span>10K Downloads</span>
                  <span>$50K Revenue</span>
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-image">
                <img src="https://via.placeholder.com/300x200" alt="Food Campaign" />
              </div>
              <div className="story-content">
                <h3>FoodieDelight x Alex Kim</h3>
                <p>A food delivery service partnered with a food blogger, achieving 200% increase in orders and viral social media buzz.</p>
                <div className="story-stats">
                  <span>200% Order Increase</span>
                  <span>Viral Success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trust" className="trust-section">
        <div className="trust-container">
          <h2>Why Choose BrandLinkar?</h2>
          <p>Built on trust, transparency, and results. Join thousands who have found success with us.</p>
          <div className="trust-grid">
            <div className="trust-item">
              <i className="fas fa-shield-alt"></i>
              <h3>Secure & Verified</h3>
              <p>All partnerships are verified and secure. Your data and collaborations are protected.</p>
            </div>
            <div className="trust-item">
              <i className="fas fa-handshake"></i>
              <h3>Authentic Partnerships</h3>
              <p>We match brands and influencers based on shared values and genuine connections.</p>
            </div>
            <div className="trust-item">
              <i className="fas fa-chart-line"></i>
              <h3>Proven Results</h3>
              <p>Our platform has delivered measurable growth for businesses and influencers alike.</p>
            </div>
            <div className="trust-item">
              <i className="fas fa-headset"></i>
              <h3>24/7 Support</h3>
              <p>Our dedicated support team is here to help you succeed every step of the way.</p>
            </div>
            <div className="trust-item">
              <i className="fas fa-award"></i>
              <h3>Award-Winning Platform</h3>
              <p>Recognized for innovation and excellence in influencer-brand partnerships.</p>
            </div>
            <div className="trust-item">
              <i className="fas fa-users"></i>
              <h3>Community Driven</h3>
              <p>Join a thriving community of successful brands and influencers.</p>
            </div>
          </div>
        </div>
      </section>
            <section id="contact" className="contact-section">
        <div className="contact-container">
          <h2>Contact Us</h2>
          <p>Get in touch with us for partnerships, inquiries, or support.</p>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <strong>Email:</strong> info@brandlinkar.com
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <div>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Address:</strong> 123 Innovation Street, Tech City, TC 12345
                </div>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email address" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="What's this about?" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell us how we can help you..." required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
