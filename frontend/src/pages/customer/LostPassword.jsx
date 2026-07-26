import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LostPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (newPassword.length < 3) {
      setErrorMessage('Password must be at least 3 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please check again.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(data.message || 'Password reset successfully! You can now log in with your new password.');
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setErrorMessage(data.message || 'Failed to reset password. Please check your email.');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setErrorMessage('Server connection error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lost-password-page">
      <style>{`
        .lost-password-page {
          font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background-color: #f8f9fa;
          min-height: 80vh;
          width: 100%;
        }

        .lost-password-hero-premium {
          position: relative;
          width: 100%;
          padding: 80px 20px;
          background: linear-gradient(135deg, #111 0%, #1e1e2d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
          border-bottom: 3px solid #ff6b00;
          overflow: hidden;
        }

        .lost-password-hero-premium::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0) 70%);
          top: -100px;
          left: -100px;
          z-index: 1;
        }

        .lost-password-hero-premium::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 0, 0) 70%);
          bottom: -150px;
          right: -100px;
          z-index: 1;
        }

        .hero-premium-content {
          max-width: 800px;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        .hero-tag-badge {
          display: inline-block;
          padding: 6px 14px;
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid rgba(255, 107, 0, 0.2);
          color: #ff6b00;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          border-radius: 30px;
          margin-bottom: 20px;
        }

        .hero-premium-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin: 0 0 15px 0;
          letter-spacing: -1.5px;
          text-transform: uppercase;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
        }

        .hero-premium-content p {
          font-size: 1.25rem;
          font-weight: 400;
          margin: 0 0 25px 0;
          letter-spacing: 0.5px;
          color: #b0b0c0;
          line-height: 1.5;
        }

        .premium-breadcrumb {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #6b7280;
        }

        .premium-breadcrumb a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.2s;
        }

        .premium-breadcrumb a:hover {
          color: #ff6b00;
        }

        .premium-breadcrumb span {
          color: #ff6b00;
        }

        .content-container {
          max-width: 520px;
          margin: 60px auto;
          padding: 0 20px;
        }

        .form-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }

        .form-card-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #111;
          margin-bottom: 10px;
          text-align: center;
        }

        .form-card-subtitle {
          font-size: 0.95rem;
          color: #6b7280;
          text-align: center;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 0.95rem;
          outline: none;
          background-color: #f9fafb;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          color: #111;
        }

        .form-input:focus {
          border-color: #ff6b00;
          background-color: #fff;
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
        }

        .alert-error {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 14px;
          border-radius: 10px;
          font-size: 0.9rem;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 500;
        }

        .alert-success {
          background-color: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
          padding: 16px;
          border-radius: 10px;
          font-size: 0.95rem;
          margin-bottom: 25px;
          text-align: center;
          font-weight: 600;
          line-height: 1.5;
        }

        .btn-submit {
          width: 100%;
          background: #ff6b00;
          color: #ffffff;
          border: none;
          padding: 14px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
          margin-top: 10px;
        }

        .btn-submit:hover {
          background: #e56000;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(255, 107, 0, 0.4);
        }

        .btn-submit:disabled {
          background: #f97316;
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .form-footer {
          margin-top: 25px;
          text-align: center;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .form-footer a {
          color: #ff6b00;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .form-footer a:hover {
          color: #e56000;
          text-decoration: underline;
        }
      `}</style>

      {/* Hero Header */}
      <div className="lost-password-hero-premium">
        <div className="hero-premium-content">
          <span className="hero-tag-badge">Account Recovery</span>
          <h1>Reset Password</h1>
          <p>Enter your account email and new password details to recover your account access.</p>
          <div className="premium-breadcrumb">
            <Link to="/">Home</Link> &nbsp;/&nbsp; <span>Reset Password</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <div className="form-card">
          <h2 className="form-card-title">Forgot Password?</h2>
          <p className="form-card-subtitle">
            Enter your details below to request a password reset for your account.
          </p>

          {successMessage && (
            <div className="alert-success">
              ✓ {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="alert-error">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter new password (min. 3 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Processing...' : 'Reset Password'}
            </button>
          </form>

          <div className="form-footer">
            Remembered your password? <Link to="/customer-login">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostPassword;
