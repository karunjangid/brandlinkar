import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfluencerRegistration.css';

const announcementTexts = {
  english: (name, socialFamily) => `Welcome ${name} with ${socialFamily} followers to our platform BrandLinkar! We hope you enjoy your experience.`,
  hindi: (name, socialFamily) => `नमस्ते ${name} जी, आपके ${socialFamily} फॉलोअर्स के साथ हमारे प्लेटफॉर्म BrandLinkar पर आपका बहुत-बहुत स्वागत है! हम चाहते हैं कि आप हमारे प्लेटफॉर्म का आनंद लें।`,
  spanish: (name, socialFamily) => `¡Bienvenido ${name} con ${socialFamily} seguidores a nuestra plataforma BrandLinkar! Esperamos que disfrutes tu experiencia.`,
  // Add more languages as needed
};

const InfluencerRegistration = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [greetingData, setGreetingData] = useState({
    name: '',
    socialFamily: '',
    language: 'english',
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    socialMedia: '',
    followers: '',
    niche: '',
    bio: '',
    bestPicture: null,
    additionalSocialMedia: []
  });

  // Handle greeting input change
  const handleGreetingChange = (e) => {
    setGreetingData({
      ...greetingData,
      [e.target.name]: e.target.value
    });
  };

  // Submit greeting form
  const handleGreetingSubmit = (e) => {
    e.preventDefault();
    if (greetingData.name && greetingData.socialFamily && greetingData.language) {
      setStep(2);
    }
  };

  // Typewriter effect for announcement with continuous speech
  useEffect(() => {
    if (step === 2) {
      const fullText = announcementTexts[greetingData.language]
        ? announcementTexts[greetingData.language](greetingData.name, greetingData.socialFamily)
        : announcementTexts['english'](greetingData.name, greetingData.socialFamily);
      
      setDisplayedText('');
      setIsTyping(true);
      
      // Start speech synthesis for the entire text at once
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.lang = greetingData.language === 'hindi' ? 'hi-IN' : greetingData.language === 'spanish' ? 'es-ES' : 'en-US';
        utterance.rate = 1.0; // Normal speed for continuous speech
        window.speechSynthesis.speak(utterance);
      }
      
      let charIndex = 0;
      
      const typeWriter = () => {
        if (charIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, charIndex + 1));
          charIndex++;
          setTimeout(typeWriter, 30); // Very fast typing
        } else {
          setIsTyping(false);
        }
      };
      
      setTimeout(typeWriter, 200); // Start after a short delay
    }
  }, [step, greetingData]);

  // After announcement animation ends, move to form step
  useEffect(() => {
    if (step === 2 && !isTyping) {
      const timer = setTimeout(() => {
        setStep(3);
      }, 3000); // Wait 3 seconds after typing completes
      return () => clearTimeout(timer);
    }
  }, [step, isTyping]);

  // Handle detailed form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      bestPicture: e.target.files[0]
    });
  };

  // Add additional social media account
  const addSocialMediaAccount = () => {
    setFormData({
      ...formData,
      additionalSocialMedia: [...formData.additionalSocialMedia, { platform: '', handle: '' }]
    });
  };

  // Handle additional social media change
  const handleAdditionalSocialMediaChange = (index, field, value) => {
    const updatedAccounts = [...formData.additionalSocialMedia];
    updatedAccounts[index][field] = value;
    setFormData({
      ...formData,
      additionalSocialMedia: updatedAccounts
    });
  };

  // Remove additional social media account
  const removeSocialMediaAccount = (index) => {
    const updatedAccounts = formData.additionalSocialMedia.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      additionalSocialMedia: updatedAccounts
    });
  };

  // Submit detailed form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Influencer Registration:', formData);
    // For now, just navigate back to home
    navigate('/');
  };

  return (
    <div className="influencer-registration">
      <div className="registration-container">
        {step === 1 && (
          <form className="greeting-form" onSubmit={handleGreetingSubmit}>
            <h1>Welcome Influencer!</h1>
            <p>Please tell us a bit about yourself to get started.</p>
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={greetingData.name}
                onChange={handleGreetingChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="socialFamily">Your Social Family (followers count) *</label>
              <input
                type="text"
                id="socialFamily"
                name="socialFamily"
                value={greetingData.socialFamily}
                onChange={handleGreetingChange}
                placeholder="e.g. 400K"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="language">Preferred Language *</label>
              <select
                id="language"
                name="language"
                value={greetingData.language}
                onChange={handleGreetingChange}
                required
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="spanish">Spanish</option>
                {/* Add more languages as needed */}
              </select>
            </div>
            <button type="submit" className="submit-button">Continue</button>
          </form>
        )}

        {step === 2 && (
          <div className="announcement-container">
            <h2 className="announcement-text">
              {displayedText}
            </h2>
            <div className="announcement-animation">
              {/* Typewriter effect handled in useEffect */}
            </div>
          </div>
        )}

        {step === 3 && (
          <>
            <div className="registration-header">
              <button className="back-button" onClick={() => setStep(1)}>
                <i className="fas fa-arrow-left"></i> Back
              </button>
              <h1>Join as an Influencer</h1>
              <p>Amplify your voice, monetize your passion, and build authentic connections with brands that align with your values.</p>
            </div>

            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>Personal Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Influencer Profile</h2>
                <div className="form-group">
                  <label htmlFor="bestPicture">Best Picture *</label>
                  <input
                    type="file"
                    id="bestPicture"
                    name="bestPicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="socialMedia">Primary Social Media Platform *</label>
                    <select
                      id="socialMedia"
                      name="socialMedia"
                      value={formData.socialMedia}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Platform</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="youtube">YouTube</option>
                      <option value="twitter">Twitter/X</option>
                      <option value="facebook">Facebook</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="followers">Follower Count *</label>
                    <select
                      id="followers"
                      name="followers"
                      value={formData.followers}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Range</option>
                      <option value="1k-10k">1K - 10K</option>
                      <option value="10k-50k">10K - 50K</option>
                      <option value="50k-100k">50K - 100K</option>
                      <option value="100k-500k">100K - 500K</option>
                      <option value="500k-1m">500K - 1M</option>
                      <option value="1m+">1M+</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Additional Social Media Accounts</label>
                  <button type="button" className="add-social-media-btn" onClick={addSocialMediaAccount}>
                    <i className="fas fa-plus"></i> Add Another Social Media Account
                  </button>
                  {formData.additionalSocialMedia.map((account, index) => (
                    <div key={index} className="additional-social-media">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Platform</label>
                          <select
                            value={account.platform}
                            onChange={(e) => handleAdditionalSocialMediaChange(index, 'platform', e.target.value)}
                          >
                            <option value="">Select Platform</option>
                            <option value="instagram">Instagram</option>
                            <option value="tiktok">TikTok</option>
                            <option value="youtube">YouTube</option>
                            <option value="twitter">Twitter/X</option>
                            <option value="facebook">Facebook</option>
                            <option value="linkedin">LinkedIn</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Handle/Username</label>
                          <input
                            type="text"
                            value={account.handle}
                            onChange={(e) => handleAdditionalSocialMediaChange(index, 'handle', e.target.value)}
                            placeholder="@username"
                          />
                        </div>
                        <button type="button" className="remove-social-media-btn" onClick={() => removeSocialMediaAccount(index)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label htmlFor="niche">Niche/Category *</label>
                  <select
                    id="niche"
                    name="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Your Niche</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="fashion">Fashion & Beauty</option>
                    <option value="fitness">Fitness & Health</option>
                    <option value="food">Food & Cooking</option>
                    <option value="travel">Travel</option>
                    <option value="tech">Technology</option>
                    <option value="gaming">Gaming</option>
                    <option value="music">Music</option>
                    <option value="art">Art & Design</option>
                    <option value="business">Business & Finance</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="bio">Bio/About You *</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell brands about yourself, your style, and what makes you unique..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">Create Account</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InfluencerRegistration;
