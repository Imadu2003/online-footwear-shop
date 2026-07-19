import { Link } from "react-router-dom";

export default function Footer() {
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
                        <li><Link to="/orders" style={linkStyle}>Orders</Link></li>
                        <li><Link to="/addresses" style={linkStyle}>Addresses</Link></li>
                        <li><Link to="/account" style={linkStyle}>Account Details</Link></li>
                        <li><Link to="/wishlist" style={linkStyle}>Wishlist</Link></li>
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
            {/* Social Icons (දැනට අකුරු වලින් දාමු, පස්සේ නියම Icons දාන්න පුළුවන්) */}
            <div style={socialIcon}>f</div>
            <div style={socialIcon}>ig</div>
            <div style={socialIcon}>yt</div>
            <div style={socialIcon}>tk</div>
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
const linkStyle = { color: '#aaa', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' };
const infoItem = { color: '#aaa', fontSize: '0.95rem', display: 'flex', gap: '0.5rem' };
const socialIcon = { width: '40px', height: '40px', backgroundColor: '#222', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', cursor: 'pointer', fontWeight: 'bold' };
const fbPluginStyle = { backgroundColor: '#fff', color: '#000', padding: '2rem 1rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' };
const bottomBarStyle = { borderTop: '1px solid #222', marginTop: '3rem', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', maxWidth: '1200px', margin: '3rem auto 0 auto' };
const whatsappFloat = { position: 'fixed', bottom: '20px', left: '20px', backgroundColor: '#25D366', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', textDecoration: 'none', zIndex: 1000 };
const scrollTopFloat = { position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#eee', color: '#000', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', zIndex: 1000 };