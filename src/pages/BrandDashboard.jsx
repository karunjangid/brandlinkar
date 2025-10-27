import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './BrandDashboard.css';

const BrandDashboard = () => {
  const { currentUser, userRole, logout } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch brand inquiries
        const inquiriesQuery = query(collection(db, 'packagingInquiries'), where('email', '==', currentUser.email));
        const inquiriesSnapshot = await getDocs(inquiriesQuery);
        const inquiriesData = inquiriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInquiries(inquiriesData);

        // Fetch environmental inquiries
        const envInquiriesQuery = query(collection(db, 'environmentalInquiries'), where('email', '==', currentUser.email));
        const envInquiriesSnapshot = await getDocs(envInquiriesQuery);
        const envInquiriesData = envInquiriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInquiries(prev => [...prev, ...envInquiriesData]);

        // Fetch campaigns created by this brand
        const campaignsQuery = query(collection(db, 'campaigns'), where('brandId', '==', currentUser.uid));
        const campaignsSnapshot = await getDocs(campaignsQuery);
        const campaignsData = campaignsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCampaigns(campaignsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="brand-dashboard">
      <header className="dashboard-header">
        <h1>Brand Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="dashboard-content">
        <section className="dashboard-section">
          <h2>Your Inquiries</h2>
          <div className="inquiries-grid">
            {inquiries.map(inquiry => (
              <div key={inquiry.id} className="inquiry-card">
                <h3>{inquiry.brandName}</h3>
                <p>Service: {inquiry.service}</p>
                <p>Budget: {inquiry.budget}</p>
                <p>Status: Pending</p>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Your Campaigns</h2>
          <div className="campaigns-grid">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="campaign-card">
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                <p>Status: {campaign.status}</p>
                <button className="view-applications-btn">View Applications</button>
              </div>
            ))}
          </div>
          <button className="create-campaign-btn">Create New Campaign</button>
        </section>

        <section className="dashboard-section">
          <h2>Analytics</h2>
          <div className="analytics-section">
            <p>View campaign performance, influencer engagement, and ROI metrics.</p>
            <button className="view-analytics-btn">View Analytics</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BrandDashboard;
