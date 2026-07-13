import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import bg1 from '../../assets/sneaker-red.png';
import bg2 from '../../assets/sneaker-blue.png';
import bg3 from '../../assets/sneaker-yellow.png';

const bgImages = [
  bg1,
  bg2,
  bg3
];

export default function Register() {
  const { registerUser } = useAuth(); // get the API function from the AuthContext
  const [currentImage, setCurrentImage] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bgImages.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // directy call the registerUser function from the AuthContext
    const result = await registerUser(name, email, password); 
    
    if (result.success) {
      alert("Registration Successful! Welcome to ShoeStore.");
      navigate('/login'); 
    } else {
      setError(result.message || 'Registration failed'); 
    }
  };

  return (
    <div style={pageStyle}>
      <div style={{ ...imageSideStyle, backgroundImage: `url(${bgImages[currentImage]})` }}>
        <div style={overlayStyle}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: '800', letterSpacing: '2px' }}>ShoeStore</h1>
          <p style={{ fontSize: '1.2rem', color: '#e2e8f0', maxWidth: '400px', lineHeight: '1.6' }}>
            Step into the future of footwear. Join our exclusive community today.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '3rem' }}>
            {bgImages.map((_, index) => (
              <div 
                key={index} 
                style={{
                  width: '12px', height: '12px', borderRadius: '50%',
                  backgroundColor: currentImage === index ? '#fff' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.5s ease',
                  transform: currentImage === index ? 'scale(1.2)' : 'scale(1)'
                }} 
              />
            ))}
          </div>
        </div>
      </div>

        

        <div style={formContainerStyle}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', color: '#fff', fontWeight: '700' }}>Create Account</h2>
          
          {error && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ff4d4f', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="Isuru Kumara" required />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="isuru@example.com" required />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} placeholder="••••••••" required />
            </div>

            <button type="submit" style={registerBtnStyle}>
              Create My Account
            </button>
            <p style={{ textAlign: 'center', color: '#9ca3af', marginTop: '1rem', fontSize: '0.95rem' }}>
              Already have an account? <Link to="/login" style={{ color: '#ff6b6b', textDecoration: 'none', fontWeight: '600' }}>Log In</Link>
            </p>
          </form>
        </div>
      </div>
    
  );
}

// ---- Styles ----
const pageStyle = { display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', position: 'relative' };
const imageSideStyle = { flex: 1.2, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', transition: 'background-image 1s ease-in-out' }; 
const overlayStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', textAlign: 'center', backdropFilter: 'blur(2px)' };
const formSideStyle = { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', backgroundColor: '#0f172a' };
const formContainerStyle = { width: '100%', maxWidth: '420px', backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '3rem', borderRadius: '24px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' };
const labelStyle = { display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500' };
const inputStyle = { width: '100%', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '1rem', color: 'white', boxSizing: 'border-box', outline: 'none', transition: 'all 0.3s ease' };
const registerBtnStyle = { width: '100%', padding: '1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', marginTop: '1rem', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)' };
const pillButtonStyle = { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50px', color: '#fff', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', transition: 'background-color 0.3s' };