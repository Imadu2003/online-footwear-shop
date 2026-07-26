import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MyAddresses = () => {
  const { user, loading, updateUserDetails } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/customer-login');
    }
  }, [user, loading, navigate]);

  // Sync user address state
  useEffect(() => {
    if (user?.address) {
      setAddressInput(user.address);
    }
  }, [user]);

  if (loading || (!user && !isEditing)) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '1.2rem', color: '#ff6b00', fontWeight: '600' }}>Loading user info...</div>
      </div>
    );
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!addressInput.trim()) {
      setErrorMsg('Please enter a valid shipping address.');
      return;
    }

    setSaving(true);
    try {
      const userId = user._id || user.id;
      const res = await updateUserDetails(userId, { address: addressInput.trim() });
      if (res.success) {
        setSuccessMsg('Shipping address saved successfully!');
        setIsEditing(false);
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(res.message || 'Failed to update address.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Server connection error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="my-addresses-container">
      <style>{`
        .my-addresses-container {
          font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
          background-color: #f8f9fa;
          min-height: 80vh;
          width: 100%;
        }

        /* Hero Header */
        .addresses-hero-premium {
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

        .addresses-hero-premium::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0) 70%);
          top: -100px;
          left: -100px;
          z-index: 1;
        }

        .addresses-hero-premium::after {
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
        .addresses-content-section {
          max-width: 800px;
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

        /* Card Container */
        .address-card {
          background: #fff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          border: 1px solid #e2e8f0;
        }

        .card-header-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.5rem;
          font-weight: 700;
          color: #111;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f1f5f9;
        }

        .icon-badge {
          width: 42px;
          height: 42px;
          background: rgba(255, 107, 0, 0.1);
          color: #ff6b00;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }

        /* View Mode */
        .address-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
          position: relative;
        }

        .address-box p {
          font-size: 1.1rem;
          color: #334155;
          margin: 0;
          white-space: pre-line;
          line-height: 1.7;
        }

        .empty-address-box {
          text-align: center;
          padding: 35px 20px;
          background: #fefce8;
          border: 1px dashed #fef08a;
          border-radius: 12px;
          color: #854d0e;
          margin-bottom: 30px;
        }

        .empty-address-box p {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
        }

        /* Form / Edit Mode */
        .address-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-weight: 700;
          font-size: 0.95rem;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-textarea {
          width: 100%;
          min-height: 140px;
          padding: 15px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 1rem;
          font-family: inherit;
          outline: none;
          background-color: #fafafa;
          color: #333 !important;
          transition: border-color 0.2s, box-shadow 0.2s;
          resize: vertical;
        }

        .form-textarea:focus {
          border-color: #ff6b00;
          background-color: #fff;
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
        }

        .button-group {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
          margin-top: 10px;
        }

        .btn-primary {
          background-color: var(--color-primary-orange, #ff6b00);
          color: #fff;
          border: none;
          padding: 14px 28px;
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
      <div className="addresses-hero-premium">
        <div className="hero-premium-content">
          <span className="hero-tag-badge">Shipping Info</span>
          <h1>My Addresses</h1>
          <div className="premium-breadcrumb">
            <Link to="/">Home</Link> &nbsp;/&nbsp; <span>My Addresses</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="addresses-content-section">
        {successMsg && <div className="alert-success">{successMsg}</div>}
        {errorMsg && <div className="alert-error">{errorMsg}</div>}

        <div className="address-card">
          <div className="card-header-title">
            <div className="icon-badge">📍</div>
            <span>Shipping Address</span>
          </div>

          {!isEditing ? (
            <div>
              {user?.address && user.address.trim() !== '' ? (
                <div className="address-box">
                  <p>{user.address}</p>
                </div>
              ) : (
                <div className="empty-address-box">
                  <p>No address saved yet</p>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setAddressInput(user?.address || '');
                    setIsEditing(true);
                  }}
                >
                  {user?.address ? 'Edit Address' : 'Add Address'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="address-form">
              <div className="form-group">
                <label className="form-label">Shipping Address</label>
                <textarea
                  className="form-textarea"
                  placeholder="Enter your complete street address, city, and postal code..."
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  required
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
                  {saving ? 'Saving...' : 'Save Address'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAddresses;
