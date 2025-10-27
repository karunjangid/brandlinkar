import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RegistrationSelection from './RegistrationSelection';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegistrationSelection, setShowRegistrationSelection] = useState(false);
  const { login, adminLogin, currentUser, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && userRole) {
      if (userRole === 'influencer') {
        navigate('/influencer-dashboard');
      } else if (userRole === 'brand') {
        navigate('/brand-dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin-panel');
      }
    }
  }, [currentUser, userRole, navigate]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Special admin login check
    if (email === 'jangidkind@gmail.com' && password === 'kjkjkjkj') {
      adminLogin();
      onClose();
      navigate('/admin-panel');
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      // Redirect will happen in useEffect when userRole is set
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRegisterNow = () => {
    setShowRegistrationSelection(true);
  };

  const closeRegistrationSelection = () => {
    setShowRegistrationSelection(false);
  };

  return (
    <>
      <div className="login-modal-overlay" onClick={onClose}>
        <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>&times;</button>

          <h2>Login to Your Account</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" disabled={loading} className="login-button">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="signup-links">
            <p>Don't have an account? <button onClick={handleRegisterNow} className="register-link">Register now</button></p>
          </div>
        </div>
      </div>
      <RegistrationSelection isOpen={showRegistrationSelection} onClose={closeRegistrationSelection} />
    </>
  );
};

export default LoginModal;
