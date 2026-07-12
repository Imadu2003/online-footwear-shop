import {Link} from "react-router-dom";

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
            <li><Link to="/terms" style={linkStyle}>Terms & Conditions</Link></li>


            <li><Link to="/privacy" style={linkStyle}>Privacy Policy</Link></li>
          </ul>
          <h3 style={{...headingStyle, marginTop: '2rem'}}>For More Info</h3>
          <ul style={listStyle}>
            <li style={infoItem}>📞 0789888877 / 076892345</li>
            <li style={infoItem}>✉️ support@shoestore.lk</li>
            <li style={infoItem}>📍 Isuru Plaza matara</li>
            <li style={infoItem}>📍 161, D.S. Senanayake Veediya, Kandy</li>
          </ul>
        </div>

        {/* Customer care and Open hours */}