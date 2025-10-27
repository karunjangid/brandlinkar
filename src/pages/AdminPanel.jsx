import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './AdminPanel.css';

const AdminPanel = () => {
  const { currentUser, logout, userRole, signup } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [inquirySubTab, setInquirySubTab] = useState('brands');
  const [users, setUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (!currentUser || (currentUser.email !== 'jangidkind@gmail.com' && userRole !== 'admin')) {
      navigate('/');
      return;
    }

    fetchData();
  }, [currentUser, userRole, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);

      // Fetch inquiries
      const [packagingSnapshot, environmentalSnapshot, influencerSnapshot] = await Promise.all([
        getDocs(collection(db, 'packagingInquiries')),
        getDocs(collection(db, 'environmentalInquiries')),
        getDocs(collection(db, 'influencerRequests'))
      ]);

      const packagingData = packagingSnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'packaging',
        ...doc.data()
      }));

      const environmentalData = environmentalSnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'environmental',
        ...doc.data()
      }));

      const influencerData = influencerSnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'influencer',
        ...doc.data()
      }));

      setInquiries([...packagingData, ...environmentalData, ...influencerData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const approveBrand = async (inquiryId, collectionName) => {
    try {
      // Get inquiry data
      const inquiryDoc = await getDoc(doc(db, collectionName, inquiryId));
      if (inquiryDoc.exists()) {
        const inquiryData = inquiryDoc.data();
        try {
          // Try to create user account
          await signup(inquiryData.email, inquiryData.password, 'brand', {
            brandName: inquiryData.brandName,
            ownerName: inquiryData.ownerName,
            contactNumber: inquiryData.contactNumber,
            budget: inquiryData.budget,
            targetAudience: inquiryData.targetAudience,
            targetedVideo: inquiryData.targetedVideo,
            service: inquiryData.service,
            approved: true,
            createdAt: new Date()
          });
        } catch (signupError) {
          if (signupError.code === 'auth/email-already-in-use') {
            // Email already exists, find the user and update their role
            const usersSnapshot = await getDocs(collection(db, 'users'));
            const existingUser = usersSnapshot.docs.find(doc => doc.data().email === inquiryData.email);
            if (existingUser) {
              await updateDoc(doc(db, 'users', existingUser.id), {
                role: 'brand',
                brandName: inquiryData.brandName,
                ownerName: inquiryData.ownerName,
                contactNumber: inquiryData.contactNumber,
                budget: inquiryData.budget,
                targetAudience: inquiryData.targetAudience,
                targetedVideo: inquiryData.targetedVideo,
                service: inquiryData.service,
                approved: true
              });
            } else {
              // User exists in Auth but not in Firestore - alert admin to handle manually
              alert('Email already in use but user profile not found in database. Please check and update the user manually.');
              return; // Don't approve the inquiry
            }
          } else {
            throw signupError;
          }
        }
        // Update inquiry as approved
        await updateDoc(doc(db, collectionName, inquiryId), { approved: true });
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error('Error approving brand:', error);
      alert('Error approving brand: ' + error.message);
    }
  };

  const approveInfluencer = async (inquiryId) => {
    try {
      // Get inquiry data
      const inquiryDoc = await getDoc(doc(db, 'influencerRequests', inquiryId));
      if (inquiryDoc.exists()) {
        const inquiryData = inquiryDoc.data();
        try {
          // Try to create user account
          await signup(inquiryData.email, inquiryData.password, 'influencer', {
            firstName: inquiryData.firstName,
            lastName: inquiryData.lastName,
            phone: inquiryData.phone,
            socialMedia: inquiryData.socialMedia,
            followers: inquiryData.followers,
            niche: inquiryData.niche,
            bio: inquiryData.bio,
            bestPicture: inquiryData.bestPicture,
            additionalSocialMedia: inquiryData.additionalSocialMedia,
            approved: true,
            createdAt: new Date()
          });
        } catch (signupError) {
          if (signupError.code === 'auth/email-already-in-use') {
            // Email already exists, find the user and update their role
            const usersSnapshot = await getDocs(collection(db, 'users'));
            const existingUser = usersSnapshot.docs.find(doc => doc.data().email === inquiryData.email);
            if (existingUser) {
              await updateDoc(doc(db, 'users', existingUser.id), {
                role: 'influencer',
                firstName: inquiryData.firstName,
                lastName: inquiryData.lastName,
                phone: inquiryData.phone,
                socialMedia: inquiryData.socialMedia,
                followers: inquiryData.followers,
                niche: inquiryData.niche,
                bio: inquiryData.bio,
                bestPicture: inquiryData.bestPicture,
                additionalSocialMedia: inquiryData.additionalSocialMedia,
                approved: true
              });
            } else {
              // User exists in Auth but not in Firestore - alert admin to handle manually
              alert('Email already in use but user profile not found in database. Please check and update the user manually.');
              return; // Don't approve the inquiry
            }
          } else {
            throw signupError;
          }
        }
        // Update inquiry as approved
        await updateDoc(doc(db, 'influencerRequests', inquiryId), { approved: true });
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error('Error approving influencer:', error);
      alert('Error approving influencer: ' + error.message);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        fetchData(); // Refresh data
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const deleteInquiry = async (inquiryId, type) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        let collectionName;
        if (type === 'packaging') {
          collectionName = 'packagingInquiries';
        } else if (type === 'environmental') {
          collectionName = 'environmentalInquiries';
        } else if (type === 'influencer') {
          collectionName = 'influencerRequests';
        }
        await deleteDoc(doc(db, collectionName, inquiryId));
        fetchData(); // Refresh data
      } catch (error) {
        console.error('Error deleting inquiry:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="loading">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>BrandLinkar Admin Panel</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <nav className="admin-nav">
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users ({users.length})
        </button>
        <button
          className={activeTab === 'inquiries' ? 'active' : ''}
          onClick={() => setActiveTab('inquiries')}
        >
          Inquiries ({inquiries.length})
        </button>
        <button
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === 'users' && (
          <div className="users-section">
            <h2>User Management</h2>
            <div className="users-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h3>{user.email}</h3>
                    <p>Role: {user.role}</p>
                    <p>Joined: {user.createdAt?.toDate()?.toLocaleDateString()}</p>
                  </div>
                  <div className="user-actions">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                    >
                      <option value="influencer">Influencer</option>
                      <option value="brand">Brand</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="inquiries-section">
            <h2>Inquiry Management</h2>
            <nav className="inquiry-sub-nav">
              <button
                className={inquirySubTab === 'brands' ? 'active' : ''}
                onClick={() => setInquirySubTab('brands')}
              >
                Brands ({inquiries.filter(i => i.type === 'packaging' || i.type === 'environmental').length})
              </button>
              <button
                className={inquirySubTab === 'influencers' ? 'active' : ''}
                onClick={() => setInquirySubTab('influencers')}
              >
                Influencers ({inquiries.filter(i => i.type === 'influencer').length})
              </button>
            </nav>
            <div className="inquiries-list">
              {inquiries
                .filter(inquiry => {
                  if (inquirySubTab === 'brands') {
                    return inquiry.type === 'packaging' || inquiry.type === 'environmental';
                  } else if (inquirySubTab === 'influencers') {
                    return inquiry.type === 'influencer';
                  }
                  return false;
                })
                .map(inquiry => (
                  <div key={inquiry.id} className="inquiry-card">
                    <div className="inquiry-header">
                      <h3>{inquiry.brandName || `${inquiry.firstName} ${inquiry.lastName}`}</h3>
                      <span className={`inquiry-type ${inquiry.type}`}>
                        {inquiry.type}
                      </span>
                    </div>
                    <div className="inquiry-details">
                      <p><strong>Email:</strong> {inquiry.email}</p>
                      {inquiry.type === 'influencer' ? (
                        <>
                          <p><strong>Name:</strong> {inquiry.firstName} {inquiry.lastName}</p>
                          <p><strong>Phone:</strong> {inquiry.phone}</p>
                          <p><strong>Social Media:</strong> {inquiry.socialMedia}</p>
                          <p><strong>Followers:</strong> {inquiry.followers}</p>
                          <p><strong>Niche:</strong> {inquiry.niche}</p>
                        </>
                      ) : (
                        <>
                          <p><strong>Service:</strong> {inquiry.service}</p>
                          {inquiry.budget && <p><strong>Budget:</strong> {inquiry.budget}</p>}
                          {inquiry.ownerName && <p><strong>Owner:</strong> {inquiry.ownerName}</p>}
                          {inquiry.contactNumber && <p><strong>Contact:</strong> {inquiry.contactNumber}</p>}
                        </>
                      )}
                      <p><strong>Submitted:</strong> {inquiry.createdAt?.toDate()?.toLocaleDateString()}</p>
                    </div>
                    <div className="inquiry-actions">
                      {inquiry.approved ? (
                        <button className="approved-btn" disabled>
                          Approved
                        </button>
                      ) : (
                        <>
                          {inquiry.type !== 'influencer' && (
                            <button
                              onClick={() => approveBrand(inquiry.id, inquiry.type === 'packaging' ? 'packagingInquiries' : 'environmentalInquiries')}
                              className="approve-btn"
                            >
                              Approve
                            </button>
                          )}
                          {inquiry.type === 'influencer' && (
                            <button
                              onClick={() => approveInfluencer(inquiry.id)}
                              className="approve-btn"
                            >
                              Approve
                            </button>
                          )}
                        </>
                      )}
                      <button
                        onClick={() => deleteInquiry(inquiry.id, inquiry.type)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-section">
            <h2>Platform Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-number">{users.length}</p>
              </div>
              <div className="stat-card">
                <h3>Influencers</h3>
                <p className="stat-number">{users.filter(u => u.role === 'influencer').length}</p>
              </div>
              <div className="stat-card">
                <h3>Brands</h3>
                <p className="stat-number">{users.filter(u => u.role === 'brand').length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Inquiries</h3>
                <p className="stat-number">{inquiries.length}</p>
              </div>
              <div className="stat-card">
                <h3>Packaging Inquiries</h3>
                <p className="stat-number">{inquiries.filter(i => i.type === 'packaging').length}</p>
              </div>
              <div className="stat-card">
                <h3>Environmental Inquiries</h3>
                <p className="stat-number">{inquiries.filter(i => i.type === 'environmental').length}</p>
              </div>
              <div className="stat-card">
                <h3>Influencer Requests</h3>
                <p className="stat-number">{inquiries.filter(i => i.type === 'influencer').length}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
