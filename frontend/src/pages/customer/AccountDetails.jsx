import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AccountDetails = () => {
  const { user, loading, updateUserDetails } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    profileImage: ''
  });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  // 1. Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/customer-login');
    }
  }, [user, loading, navigate]);

  // Sync form state with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || user.phoneNumber || '',
        address: user.address || '',
        profileImage: user.profileImage || user.image || user.avatar || ''
      });
    }
  }, [user]);

  if (loading || (!user && !isEditing)) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '1.2rem', color: '#ff6b00', fontWeight: '600' }}>Loading profile...</div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    setSaving(true);
    try {
      const userId = user._id || user.id;
      const res = await updateUserDetails(userId, {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        profileImage: formData.profileImage.trim()
      });

      if (res.success) {
        setSuccessMsg('Account details updated successfully!');
        setIsEditing(false);
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(res.message || 'Failed to update account details.');
      }
    } catch (err) {
      console.error('Error updating details:', err);
      setErrorMsg('Server connection error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const currentAvatar = user?.profileImage || user?.image || user?.avatar || defaultAvatar;

  return (
    <div className="account-details-container">
      <style>{`
        .account-details-container {
          font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
          background-color: #f8f9fa;
          min-height: 80vh;
          width: 100%;
        }

        /* Hero Header */
        .account-hero-premium {
          position: relative;
          width: 100%;
          padding: 70px 20px;
          background: linear-gradient(135deg, #111 0%, #1e1e2d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
          border-bottom: 3px solid var(--color-primary-orange, #ff6b00);
          overflow: hidden;
        }

        .account-hero-premium::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0) 70%);
          top: -100px;
          left: -100px;
          z-index: 1;
        }

        .account-hero-premium::after {
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
          color: var(--color-primary-orange, #ff6b00);
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
          color: #ff6b00 !important;
          -webkit-text-fill-color: #ff6b00 !important;
        }

        .premium-breadcrumb {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #6b7280;
        }

        .premium-breadcrumb a {
          color: #6b7280;
          text-decoration: none;
          transition: color 0.2s;
        }

        .premium-breadcrumb a:hover {
          color: #ff6b00;
        }

        .premium-breadcrumb span {
          color: #9ca3af;
        }

        /* Content Area */
        .account-content-section {
          max-width: 900px;
          margin: 50px auto;
          padding: 0 20px;
        }

        /* Alerts */
        .alert-success {
          background-color: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 25px;
          text-align: center;
          font-weight: 600;
        }

        .alert-error {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 25px;
          text-align: center;
          font-weight: 600;
        }

        /* Main Card */
        .profile-card {
          background: #fff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          border: 1px solid #e2e8f0;
        }

        /* Top User Profile Header */
        .profile-header-banner {
          display: flex;
          align-items: center;
          gap: 25px;
          padding-bottom: 30px;
          border-bottom: 2px solid #f1f5f9;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .avatar-wrapper {
          position: relative;
          width: 110px;
          height: 110px;
        }

        .avatar-img {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #fff;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          background-color: #f1f5f9;
        }

        .profile-title-area {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .user-display-name {
          font-size: 1.8rem;
          font-weight: 800;
          color: #111;
          margin: 0;
        }

        .user-display-email {
          font-size: 1rem;
          color: #64748b;
        }

        .role-badge {
          display: inline-block;
          align-self: flex-start;
          margin-top: 4px;
          padding: 4px 12px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 20px;
        }

        /* Information Grid View */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 35px;
        }

        @media (max-width: 650px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
        }

        .info-item {
          background: #f8fafc;
          padding: 20px;
          border-radius: 14px;
          border: 1px solid #f1f5f9;
        }

        .info-item-full {
          grid-column: 1 / -1;
        }

        .info-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .info-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          word-break: break-word;
        }

        .info-value.empty {
          color: #94a3b8;
          font-style: italic;
          font-weight: 400;
        }

        /* Form Controls */
        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 650px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-weight: 700;
          font-size: 0.85rem;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 13px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 1rem;
          outline: none;
          background-color: #fafafa;
          color: #333 !important;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: #ff6b00;
          background-color: #fff;
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
        }

        .form-input:disabled {
          background-color: #f1f5f9;
          color: #94a3b8 !important;
          cursor: not-allowed;
        }

        .form-textarea {
          min-height: 110px;
          resize: vertical;
          font-family: inherit;
        }

        /* Image Preview Box */
        .image-preview-container {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #f8fafc;
          padding: 15px 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          margin-bottom: 5px;
        }

        .preview-img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ff6b00;
        }

        /* Action Buttons */
        .button-group {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
          margin-top: 15px;
        }

        .btn-primary {
          background-color: var(--color-primary-orange, #ff6b00);
          color: #fff;
          border: none;
          padding: 14px 30px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
          box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
        }

        .btn-primary:hover {
          background-color: #e56000;
        }

        .btn-primary:active {
          transform: scale(0.98);
        }

        .btn-secondary {
          background-color: #f1f5f9;
          color: #475569;
          border: none;
          padding: 14px 28px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-secondary:hover {
          background-color: #e2e8f0;
        }
      `}</style>

      {/* Hero Header */}
      <div className="account-hero-premium">
        <div className="hero-premium-content">
          <span className="hero-tag-badge">Your Profile</span>
          <h1>Account Details</h1>
          <div className="premium-breadcrumb">
            <Link to="/">Home</Link> &nbsp;/&nbsp; <span>Account Details</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="account-content-section">
        {successMsg && <div className="alert-success">{successMsg}</div>}
        {errorMsg && <div className="alert-error">{errorMsg}</div>}

        <div className="profile-card">
          {/* Header Banner */}
          <div className="profile-header-banner">
            <div className="avatar-wrapper">
              <img
                src={currentAvatar}
                alt={user?.name || 'User'}
                className="avatar-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultAvatar;
                }}
              />
            </div>
            <div className="profile-title-area">
              <h2 className="user-display-name">{user?.name || 'Customer'}</h2>
              <span className="user-display-email">{user?.email}</span>
              <span className="role-badge">Verified Customer</span>
            </div>
          </div>

          {!isEditing ? (
            <div>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">Full Name</div>
                  <div className="info-value">{user?.name || 'N/A'}</div>
                </div>

                <div className="info-item">
                  <div className="info-label">Email Address</div>
                  <div className="info-value">{user?.email || 'N/A'}</div>
                </div>

                <div className="info-item">
                  <div className="info-label">Phone Number</div>
                  <div className={`info-value ${!user?.phone && !user?.phoneNumber ? 'empty' : ''}`}>
                    {user?.phone || user?.phoneNumber || 'Not provided'}
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">Profile Image</div>
                  <div className={`info-value ${!user?.profileImage && !user?.image && !user?.avatar ? 'empty' : ''}`}>
                    {user?.profileImage || user?.image || user?.avatar ? 'Custom Avatar Set' : 'Default Avatar'}
                  </div>
                </div>

                <div className="info-item info-item-full">
                  <div className="info-label">Shipping Address</div>
                  <div className={`info-value ${!user?.address ? 'empty' : ''}`}>
                    {user?.address || 'Not provided'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="edit-form">
              {/* Profile Image URL & Live Preview */}
              <div className="form-group">
                <label className="form-label">Profile Image URL</label>
                {formData.profileImage && (
                  <div className="image-preview-container">
                    <img
                      src={formData.profileImage}
                      alt="Preview"
                      className="preview-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultAvatar;
                      }}
                    />
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Image Preview</span>
                  </div>
                )}
                <input
                  type="url"
                  name="profileImage"
                  className="form-input"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address (Read Only)</label>
                  <input
                    type="email"
                    className="form-input"
                    value={user?.email || ''}
                    disabled
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="Enter phone number (e.g. +94 77 123 4567)"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Shipping Address</label>
                <textarea
                  name="address"
                  className="form-textarea"
                  placeholder="Enter street address, city, postal code..."
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="button-group">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setErrorMsg('');
                  }}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
