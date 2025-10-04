import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      step: '1',
      title: 'Sign Up',
      description: 'Create your account as a brand or influencer and complete your profile.'
    },
    {
      step: '2',
      title: 'Find Matches',
      description: 'Browse through our curated list of partners that match your goals and values.'
    },
    {
      step: '3',
      title: 'Connect & Collaborate',
      description: 'Reach out to potential partners and start building meaningful relationships.'
    },
    {
      step: '4',
      title: 'Launch Campaigns',
      description: 'Execute successful campaigns and track your results in real-time.'
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        <h2>How It Works</h2>
        <p>Simple steps to connect brands and influencers for mutual success.</p>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
