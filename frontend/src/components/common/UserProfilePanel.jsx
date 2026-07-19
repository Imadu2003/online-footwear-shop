import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfilePanel({ isOpen, onClose }) {
  const { user, updateUserDetails, logout } = useAuth();
  const navigate = useNavigate();


  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setProfileImage(user.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png');
    }
  }, [user, isOpen]);
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('Saving...');

    const result = await updateUserDetails(user._id, { name, phone, address, profileImage });
    
    if (result.success) {
      setMessage('Profile updated successfully!');
      setTimeout(() => {
        setIsEditing(false);
        setMessage('');
      }, 2000);
    } else {
      setMessage('Error updating profile.');
    }
  };
  const handleLogout = () => {
    onClose();
    logout();
    navigate('/');
  };
  if (!user) return null;
  return (
    <>

     {isOpen && (
        <div style={overlayStyle} onClick={onClose}></div>
      )}
      {/* පැත්තෙන් එන Slide Panel එක */}
      <div style={{...panelStyle, right: isOpen ? '0' : '-450px'}}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1f2937' }}>My Profile</h2>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>
        <div style={contentStyle}>
          {/* Profile Picture පෙන්නන තැන */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img 
              src={profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
              alt="Profile" 
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
            />
            {!isEditing && (
              <h3 style={{ marginTop: '1rem', marginBottom: '0.2rem', color: '#111827' }}>{user.name}</h3>
            )}
            {!isEditing && (
              <p style={{ color: '#6b7280', margin: 0 }}>{user.email}</p>
            )}
          </div>
          {message && <div style={messageStyle}>{message}</div>}
          {isEditing ? (
            <form onSubmit={handleSave} style={formStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Phone Number</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="e.g. 0771234567" />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Address</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} style={{...inputStyle, minHeight: '80px'}} placeholder="Your shipping address" />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Profile Photo URL</label>
                <input type="text" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} style={inputStyle} placeholder="https://..." />
                <small style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '4px' }}>Google එකෙන් ෆොටෝ එකක් හොයාගෙන ඒකේ Image Link එක මෙතනට Paste කරන්න.</small>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" style={saveBtnStyle}>Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)} style={cancelBtnStyle}>Cancel</button>
              </div>
            </form>
          ) : (
            <div style={detailsStyle}>
              <div style={detailItemStyle}><strong>Phone:</strong> {user.phone || 'Not provided'}</div>
              <div style={detailItemStyle}><strong>Address:</strong> {user.address || 'Not provided'}</div>
              
              <button onClick={() => setIsEditing(true)} style={editBtnStyle}>Edit Profile</button>
            </div>
          )}
        </div>
        <div style={footerStyle}>
          <button onClick={handleLogout} style={logoutBtnStyle}>Sign Out</button>
        </div>
      </div>
    </>
  );
}


const overlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999, transition: 'opacity 0.3s' };
const panelStyle = { position: 'fixed', top: 0, bottom: 0, width: '400px', maxWidth: '100vw', backgroundColor: '#f9fafb', zIndex: 1000, transition: 'right 0.3s ease-in-out', display: 'flex', flexDirection: 'column', boxShadow: '-5px 0 25px rgba(0,0,0,0.1)' };
const headerStyle = { padding: '1.5rem', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const closeBtnStyle = { background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6b7280' };
const contentStyle = { padding: '2rem 1.5rem', flex: 1, overflowY: 'auto' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '1rem' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column' };
const labelStyle = { fontSize: '0.9rem', color: '#4b5563', marginBottom: '0.5rem', fontWeight: '500' };
const inputStyle = { padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' };
const saveBtnStyle = { flex: 1, padding: '0.75rem', backgroundColor: '#ff6b6b', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' };
const cancelBtnStyle = { flex: 1, padding: '0.75rem', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' };
const detailsStyle = { display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb' };
const detailItemStyle = { color: '#4b5563', fontSize: '0.95rem' };
const editBtnStyle = { padding: '0.75rem', backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '1rem' };
const footerStyle = { padding: '1.5rem', backgroundColor: '#fff', borderTop: '1px solid #e5e7eb' };
const logoutBtnStyle = { width: '100%', padding: '0.75rem', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' };
const messageStyle = { backgroundColor: '#d1fae5', color: '#065f46', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' };