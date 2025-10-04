import React from 'react';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: 'https://via.placeholder.com/150',
      bio: 'Experienced entrepreneur with a passion for connecting brands and influencers.'
    },
    {
      name: 'Jane Smith',
      role: 'Head of Partnerships',
      image: 'https://via.placeholder.com/150',
      bio: 'Expert in building strategic partnerships and driving collaborative growth.'
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      image: 'https://via.placeholder.com/150',
      bio: 'Full-stack developer focused on creating innovative solutions for the platform.'
    }
  ];

  return (
    <section className="team-section">
      <div className="team-container">
        <h2>Our Team</h2>
        <p>Meet the passionate professionals behind BrandLinkar.</p>
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
  );
};

export default Team;
