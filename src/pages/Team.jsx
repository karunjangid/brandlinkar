import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      name: 'Karun Kumar Jangid',
      role: 'CEO & Founder',
      image: 'https://via.placeholder.com/150',
      bio: 'Visionary leader with expertise in digital marketing and influencer partnerships, driving innovation in the industry.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Digital Marketing Strategist',
      image: 'https://via.placeholder.com/150',
      bio: 'Data-driven strategist specializing in performance marketing and campaign optimization across multiple platforms.'
    },
    {
      name: 'Priya Singh',
      role: 'Creative Designer',
      image: 'https://via.placeholder.com/150',
      bio: 'Award-winning designer creating visually stunning brand identities and marketing materials that captivate audiences.'
    },
    {
      name: 'Amit Patel',
      role: 'Video Editor',
      image: 'https://via.placeholder.com/150',
      bio: 'Expert video editor producing high-engagement reels and multimedia content for social platforms.'
    },
    {
      name: 'Sneha Gupta',
      role: 'Videographer',
      image: 'https://via.placeholder.com/150',
      bio: 'Professional videographer capturing compelling visuals and stories that bring brands to life.'
    },
    {
      name: 'Vikram Rao',
      role: 'Content Creator',
      image: 'https://via.placeholder.com/150',
      bio: 'Creative content creator developing engaging narratives and multimedia content for brand campaigns.'
    },
    {
      name: 'Anjali Mehta',
      role: 'Business Development Associate',
      image: 'https://via.placeholder.com/150',
      bio: 'Strategic business development professional building partnerships and driving growth opportunities.'
    },
    {
      name: 'Karan Jain',
      role: 'Customer Support Head',
      image: 'https://via.placeholder.com/150',
      bio: 'Dedicated customer support leader ensuring exceptional client experiences and satisfaction.'
    },
    {
      name: 'Meera Shah',
      role: 'HR Manager',
      image: 'https://via.placeholder.com/150',
      bio: 'Experienced HR professional fostering a positive work culture and talent development.'
    }
  ];

  return (
    <>
      <NavBar />
      <section className="team-section">
        <div className="team-container">
          <h2>Our Team</h2>
          <p>Meet the passionate professionals behind BrandLinkar Digital Agency.</p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.image} alt={member.name} className="member-image" />
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Team;
