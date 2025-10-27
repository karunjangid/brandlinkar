import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './InfluencerDashboard.css';

const InfluencerDashboard = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New campaign available: Summer Fashion Collection', time: '2 hours ago' },
    { id: 2, message: 'Your deal with TechCorp has been approved!', time: '1 day ago' },
    { id: 3, message: 'Update your profile to get more opportunities', time: '3 days ago' },
  ]);
  const [userProfile, setUserProfile] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    bio: '',
    hobbies: '',
    interests: '',
    bannerImage: '',
    profilePicture: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserProfile(userDocSnap.data());
        } else {
          setUserProfile({
            username: '',
            email: currentUser.email,
            contactNumber: '',
            bio: '',
            hobbies: '',
            interests: '',
            bannerImage: '',
            profilePicture: ''
          });
        }

        // Fetch available campaigns
        const campaignsQuery = query(collection(db, 'campaigns'), where('status', '==', 'active'));
        const campaignsSnapshot = await getDocs(campaignsQuery);
        const campaignsData = campaignsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCampaigns(campaignsData);

        // Fetch deals for this influencer
        const dealsQuery = query(collection(db, 'deals'), where('influencerId', '==', currentUser.uid));
        const dealsSnapshot = await getDocs(dealsQuery);
        const dealsData = dealsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDeals(dealsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleViewProfile = () => {
    setIsEditing(false);
    setShowProfileModal(true);
    setShowProfileOptions(false);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditForm({
      bio: userProfile?.bio || '',
      hobbies: userProfile?.hobbies || '',
      interests: userProfile?.interests || '',
      bannerImage: userProfile?.bannerImage || '',
      profilePicture: userProfile?.profilePicture || ''
    });
    setShowProfileModal(true);
    setShowProfileOptions(false);
  };

  const handleSaveProfile = async () => {
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        bio: editForm.bio,
        hobbies: editForm.hobbies,
        interests: editForm.interests,
        bannerImage: editForm.bannerImage,
        profilePicture: editForm.profilePicture
      });
      setUserProfile(prev => ({
        ...prev,
        bio: editForm.bio,
        hobbies: editForm.hobbies,
        interests: editForm.interests,
        bannerImage: editForm.bannerImage,
        profilePicture: editForm.profilePicture
      }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="influencer-dashboard">
      {/* Custom Nav Bar */}
      <nav className="influencer-nav">
        <div className="nav-left">
          <div className="brand-logo">
            <span>BrandLinkar</span>
          </div>
        </div>
        <div className="nav-right">
          <div className="profile-container">
            <div className="profile-avatar" onClick={handleProfileClick}>
              {userProfile?.profilePicture ? (
                <img src={userProfile.profilePicture} alt="Profile" />
              ) : (
                <div className="default-avatar">👤</div>
              )}
            </div>
            {showProfileOptions && (
              <div className="profile-options">
                <button onClick={handleViewProfile}>View Profile</button>
                <button onClick={handleEditProfile}>Edit Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="dashboard-main">
        {/* Scrollable Sidebar */}
        <aside className="sidebar">
          <h3>Recent Events</h3>
          <div className="notifications-list">
            {notifications.map(notification => (
              <div key={notification.id} className="notification-item">
                <p>{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="content-area">
          {/* Interaction Cards */}
          <section className="interaction-section">
            <h2>Brand Interactions</h2>
            <div className="interaction-cards">
              <div className="interaction-card">
                <div className="card-icon">💬</div>
                <h3>Messages</h3>
                <p>Check your messages from brands</p>
                <button className="card-btn">View Messages</button>
              </div>
              <div className="interaction-card">
                <div className="card-icon">🤝</div>
                <h3>Pending Deals</h3>
                <p>Review and accept pending offers</p>
                <button className="card-btn">View Deals</button>
              </div>
              <div className="interaction-card">
                <div className="card-icon">📊</div>
                <h3>Analytics</h3>
                <p>Track your campaign performance</p>
                <button className="card-btn">View Analytics</button>
              </div>
            </div>
          </section>

          {/* Available Campaigns */}
          <section className="campaigns-section">
            <h2>Available Campaigns</h2>
            <div className="campaigns-grid">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="campaign-card">
                  <div className="campaign-header">
                    <h3>{campaign.title}</h3>
                    <span className="campaign-price">${campaign.budget || 'TBD'}</span>
                  </div>
                  <p className="campaign-desc">{campaign.description}</p>
                  <div className="campaign-benefits">
                    <span className="benefit-tag">High Reach</span>
                    <span className="benefit-tag">Creative Freedom</span>
                    <span className="benefit-tag">Brand Exposure</span>
                  </div>
                  <button className="apply-btn">Apply Now</button>
                </div>
              ))}
            </div>
          </section>

          {/* Your Deals */}
          <section className="deals-section">
            <h2>Your Deals</h2>
            <div className="deals-grid">
              {deals.map(deal => (
                <div key={deal.id} className="deal-card">
                  <h3>{deal.campaignTitle}</h3>
                  <p className="deal-status">Status: <span className={`status-${deal.status.toLowerCase()}`}>{deal.status}</span></p>
                  <p className="deal-compensation">Compensation: {deal.compensation}</p>
                  <button className="view-details-btn">View Details</button>
                </div>
              ))}
            </div>
          </section>

          {/* Profile Management */}
          <section className="profile-section">
            <h2>Profile Management</h2>
            <div className="profile-card">
              <p>Update your profile information, social media links, and preferences to get more opportunities.</p>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
          </section>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && userProfile && (
        <div className="profile-modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isEditing ? 'Edit Profile' : 'Profile Details'}</h2>
              <button className="close-modal" onClick={() => { setShowProfileModal(false); setIsEditing(false); }}>×</button>
            </div>
            <div className="modal-content">
              {isEditing ? (
                <>
                  <div className="profile-banner">
                    {editForm.bannerImage ? (
                      <img src={editForm.bannerImage} alt="Banner" />
                    ) : (
                      <div className="default-banner">Add Banner Image</div>
                    )}
                  </div>
                  <div className="profile-picture-large">
                    {editForm.profilePicture ? (
                      <img src={editForm.profilePicture} alt="Profile" />
                    ) : (
                      <div className="default-avatar-large">👤</div>
                    )}
                  </div>
                  <div className="profile-info">
                    <div className="info-item">
                      <label>Username:</label>
                      <span>{userProfile.username || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <span>{userProfile.email || currentUser.email}</span>
                    </div>
                    <div className="info-item">
                      <label>Contact Number:</label>
                      <span>{userProfile.contactNumber || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Banner Image URL:</label>
                      <input
                        type="text"
                        value={editForm.bannerImage}
                        onChange={(e) => handleEditFormChange('bannerImage', e.target.value)}
                        placeholder="Enter banner image URL"
                      />
                    </div>
                    <div className="info-item">
                      <label>Profile Picture URL:</label>
                      <input
                        type="text"
                        value={editForm.profilePicture}
                        onChange={(e) => handleEditFormChange('profilePicture', e.target.value)}
                        placeholder="Enter profile picture URL"
                      />
                    </div>
                    <div className="info-item">
                      <label>Bio:</label>
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => handleEditFormChange('bio', e.target.value)}
                        placeholder="Enter your bio"
                      />
                    </div>
                    <div className="info-item">
                      <label>Hobbies:</label>
                      <input
                        type="text"
                        value={editForm.hobbies}
                        onChange={(e) => handleEditFormChange('hobbies', e.target.value)}
                        placeholder="Enter your hobbies"
                      />
                    </div>
                    <div className="info-item">
                      <label>Interests:</label>
                      <input
                        type="text"
                        value={editForm.interests}
                        onChange={(e) => handleEditFormChange('interests', e.target.value)}
                        placeholder="Enter your interests"
                      />
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button onClick={handleSaveProfile} className="save-btn">Save Changes</button>
                    <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="profile-banner">
                    {userProfile.bannerImage ? (
                      <img src={userProfile.bannerImage} alt="Banner" />
                    ) : (
                      <div className="default-banner">No Banner</div>
                    )}
                  </div>
                  <div className="profile-picture-large">
                    {userProfile.profilePicture ? (
                      <img src={userProfile.profilePicture} alt="Profile" />
                    ) : (
                      <div className="default-avatar-large">👤</div>
                    )}
                  </div>
                  <div className="profile-info">
                    <div className="info-item">
                      <label>Username:</label>
                      <span>{userProfile.username || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <span>{userProfile.email || currentUser.email}</span>
                    </div>
                    <div className="info-item">
                      <label>Contact Number:</label>
                      <span>{userProfile.contactNumber || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Bio:</label>
                      <span>{userProfile.bio || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Hobbies:</label>
                      <span>{userProfile.hobbies || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Interests:</label>
                      <span>{userProfile.interests || 'N/A'}</span>
                    </div>
                    {userProfile.socialMedia && (
                      <div className="info-item">
                        <label>Social Media:</label>
                        <div className="social-links">
                          {userProfile.socialMedia.instagram && <span>Instagram: {userProfile.socialMedia.instagram}</span>}
                          {userProfile.socialMedia.youtube && <span>YouTube: {userProfile.socialMedia.youtube}</span>}
                          {userProfile.socialMedia.twitter && <span>Twitter: {userProfile.socialMedia.twitter}</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfluencerDashboard;
