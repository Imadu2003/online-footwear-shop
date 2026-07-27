import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Footer() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Customer Care link click handler - login check
    const handleCustomerCareClick = (e, path) => {
        e.preventDefault();
        if (!user) {
            navigate('/customer-login');
        } else {
            navigate(path);
        }
    };

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>

                {/* Useful Links & Info */}
                <div style={colStyle}>
                    <h3 style={headingStyle}>Useful Links</h3>
                    <ul style={listStyle}>
                        <li><Link to="/about" style={linkStyle}>About Us</Link></li>
                        <li><Link to="/contact" style={linkStyle}>Contact Us</Link></li>
                        <li><Link to="/reviews" style={linkStyle}>Customer Reviews</Link></li>
                        <li><Link to="/terms" style={linkStyle}>Terms & Conditions</Link></li>


                        <li><Link to="/privacy" style={linkStyle}>Privacy Policy</Link></li>
                    </ul>
                    <h3 style={{ ...headingStyle, marginTop: '2rem' }}>For More Info</h3>
                    <ul style={listStyle}>
                        <li style={infoItem}>📞 0789888877 / 076892345</li>
                        <li style={infoItem}>✉️ support@shoestore.lk</li>
                        <li style={infoItem}>📍 Isuru Plaza matara</li>
                        <li style={infoItem}>📍 161, D.S. Senanayake Veediya, Kandy</li>
                    </ul>
                </div>

                {/* Customer care and Open hours */}
                <div style={colStyle}>
                    <h3 style={headingStyle}>Customer Care</h3>
                    <ul style={listStyle}>
                        <li><a href="/orders" onClick={(e) => handleCustomerCareClick(e, '/orders')} style={linkStyle}>Orders</a></li>
                        <li><a href="/addresses" onClick={(e) => handleCustomerCareClick(e, '/addresses')} style={linkStyle}>Addresses</a></li>
                        <li><a href="/account" onClick={(e) => handleCustomerCareClick(e, '/account')} style={linkStyle}>Account Details</a></li>
                        <li><a href="/wishlist" onClick={(e) => handleCustomerCareClick(e, '/wishlist')} style={linkStyle}>Wishlist</a></li>
                        <li><Link to="/lost-password" style={linkStyle}>Lost Password</Link></li>
                    </ul>
                    <h3 style={{ ...headingStyle, marginTop: '2rem' }}>We Are Open From</h3>

                    <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Mon-Sat - 9.00AM - 7.00PM</p>

                </div>

                {/* Social Media */}
                <div style={colStyle}>
          <h2 style={{ color: '#fff', fontSize: '2rem', fontStyle: 'italic', marginBottom: '1.5rem', fontWeight: '900' }}>
            SHOES HUB ONLINE
          </h2>
          
          <h3 style={headingStyle}>Follow Us</h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ ...socialIcon, backgroundColor: '#1877F2', textDecoration: 'none' }} title="Facebook">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ ...socialIcon, background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)', textDecoration: 'none' }} title="Instagram">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ ...socialIcon, backgroundColor: '#FF0000', textDecoration: 'none' }} title="YouTube">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" style={{ ...socialIcon, backgroundColor: '#000000', border: '1px solid #333', textDecoration: 'none' }} title="TikTok">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.42c0 1.57-.42 3.12-1.25 4.45-1.57 2.5-4.4 3.98-7.34 3.73-2.94-.25-5.5-2.07-6.52-4.81-1.02-2.74-.26-5.87 1.9-7.85 2.17-1.99 5.37-2.45 8.02-1.17.01.76.01 1.51.01 2.27-1.99-.95-4.38-.41-5.75 1.25-1.37 1.66-1.25 4.09.27 5.61 1.52 1.52 3.96 1.64 5.62.27 1.24-1.02 1.83-2.65 1.83-4.27V.02z"/>
              </svg>
            </a>
          </div>
          
          <div style={fbPluginStyle}>
            <p>Facebook Page Plugin Preview</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
       <div style={bottomBarStyle}>
        <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>
          shoeshubonline.lk copyright 2024 Enhanced by White Systemz
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <span style={{color:'#fff', fontWeight: 'bold'}}>💳 Visa / Master / KOKO</span>
        </div>
      </div>
      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/xxxxxxxxxx" target="_blank" rel="noreferrer" style={whatsappFloat}>
        💬
      </a>
      
      {/* Scroll to Top බට්න් එක */}
      <button onClick={() => window.scrollTo(0, 0)} style={scrollTopFloat}>
        ↑
      </button>
    </footer>
  );
}
// ----- CSS Styles -----
const footerStyle = { backgroundColor: '#000', color: '#fff', paddingTop: '4rem', position: 'relative', marginTop: 'auto' };
const containerStyle = { display: 'flex', flexWrap: 'wrap', gap: '3rem', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' };
const colStyle = { flex: '1 1 250px', display: 'flex', flexDirection: 'column' };
const headingStyle = { fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 'bold' };
const listStyle = { listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' };
const linkStyle = { color: '#aaa', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s', cursor: 'pointer' };
const infoItem = { color: '#aaa', fontSize: '0.95rem', display: 'flex', gap: '0.5rem' };
const socialIcon = { width: '40px', height: '40px', backgroundColor: '#222', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', cursor: 'pointer', fontWeight: 'bold' };
const fbPluginStyle = { backgroundColor: '#fff', color: '#000', padding: '2rem 1rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' };
const bottomBarStyle = { borderTop: '1px solid #222', marginTop: '3rem', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', maxWidth: '1200px', margin: '3rem auto 0 auto' };
const whatsappFloat = { position: 'fixed', bottom: '20px', left: '20px', backgroundColor: '#25D366', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', textDecoration: 'none', zIndex: 1000 };
const scrollTopFloat = { position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#eee', color: '#000', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', zIndex: 1000 };