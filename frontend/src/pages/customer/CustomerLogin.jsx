import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import bgImage from '../../assets/admin-bg.png'; //background image for the login page
import { Link } from 'react-router-dom';

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(email, password);
    if (result.success) {
      navigate('/');  //if login is successful, navigate to the home page
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={pageStyle}>
      {/* වම් පැත්ත: පින්තූරය */}
      <div style={imageSideStyle}>
        <div style={overlayStyle}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>ShoeStore Customer</h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc' }}>Secure access to your store dashboard.</p>
        </div>
      </div>

      {/* දකුණු පැත්ත: Login Form එක */}
      <div style={formSideStyle}>
        <div style={formContainerStyle}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#fff' }}>Welcome Back</h2>

          {error && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid #ef4444' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="isuru@test.com"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                placeholder="123"
                required
              />
            </div>

 
            <button type="submit" style={loginBtnStyle}>
              Sign In to Dashboard
            </button>
            <p style={{ textAlign: 'center', color: '#9ca3af', marginTop: '1rem', fontSize: '0.95rem' }}>
              Don't have an account? <Link to="/register" style={{ color: '#ff6b6b', textDecoration: 'none', fontWeight: '600' }}>Register Here</Link>
            </p>


          </form>
        </div>
      </div>
    </div>
  );
}

// ---- Styles ටික ----
const pageStyle = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#111827', // අඳුරු Premium පසුබිමක්
  color: 'white'
};

const imageSideStyle = {
  flex: 1.2,
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative'
};

const overlayStyle = {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  textAlign: 'center'
};

const formSideStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem'
};

const formContainerStyle = {
  width: '100%',
  maxWidth: '420px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)', // Glassmorphism Effect එක
  padding: '3rem',
  borderRadius: '20px',
  backdropFilter: 'blur(15px)', // පිටිපස්සේ තියෙන දේවල් බොඳ කරලා පෙන්නනවා
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  color: '#9ca3af',
  fontSize: '0.9rem'
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  fontSize: '1rem',
  color: 'white',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.2s'
};

const loginBtnStyle = {
  width: '100%',
  padding: '1rem',
  backgroundColor: '#ff6b6b',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '1rem',
  boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
};