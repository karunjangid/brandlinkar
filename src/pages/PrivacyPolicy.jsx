import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <NavBar />
      <div className="privacy-policy-content">
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> December 2, 2025</p>

        <h2>Introduction</h2>
        <p>Welcome to Markizza Digital Agency ("we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at https://markizza.com/ (the "Site") or use our services. By accessing or using our Site, you agree to the terms of this Privacy Policy.</p>

        <h2>Information We Collect</h2>
        <p>We may collect personal information from you in various ways, including:</p>
        <ul>
          <li><strong>Personal Information:</strong> We collect information such as your name, email address, phone number, and any other details you provide when contacting us or subscribing to our services.</li>
          <li><strong>Usage Data:</strong> We use digital analytics tools like Google Analytics to collect information about how you interact with our Site, including IP addresses, browser types, and pages visited.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your experience, analyze site usage, and provide targeted advertising.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To provide and maintain our services.</li>
          <li>To send newsletters, promotional emails, and updates if you have subscribed.</li>
          <li>To analyze site usage and improve our Site.</li>
          <li>To display ads and use retargeting for advertising purposes, including through Facebook Pixel.</li>
          <li>To comply with legal obligations and protect our rights.</li>
        </ul>

        <h2>Sharing Your Information</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
        <ul>
          <li>With service providers who assist us in operating our Site and conducting our business.</li>
          <li>To comply with legal requirements or protect against fraud.</li>
          <li>In connection with a business transfer, such as a merger or sale of assets.</li>
        </ul>

        <h2>Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>

        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the following rights regarding your personal information:</p>
        <ul>
          <li><strong>Access:</strong> Request access to the personal information we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information.</li>
          <li><strong>Opt-Out:</strong> Opt-out of marketing communications or data processing.</li>
        </ul>
        <p>To exercise these rights, please contact us using the information provided below.</p>

        <h2>Children's Privacy</h2>
        <p>Our Site is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.</p>

        <h2>Compliance with Laws</h2>
        <p>We are committed to complying with applicable privacy laws, including:</p>
        <ul>
          <li><strong>GDPR:</strong> For users in the European Union, we adhere to the General Data Protection Regulation.</li>
          <li><strong>CCPA:</strong> For California residents, we comply with the California Consumer Privacy Act.</li>
          <li><strong>CalOPPA:</strong> We follow the California Online Privacy Protection Act requirements.</li>
        </ul>

        <h2>Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> jangidkind@gmail.com</li>
          <li><strong>Phone:</strong> 8619448841</li>
          <li><strong>Website:</strong> https://markizza.com/</li>
          <li><strong>Address:</strong> Malviya Nagar, Jaipur, Rajasthan, India 302017</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
