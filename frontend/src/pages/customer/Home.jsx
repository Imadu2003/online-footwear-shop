import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero-shoe.png'; // අර Save කරපු පින්තූරය මෙතනින් ගන්නවා
import shippingIcon from '../../assets/icon-shipping.png';
import paymentIcon from '../../assets/icon-payment.png';
import returnsIcon from '../../assets/icon-returns.png';

export default function Home() {
  return (
    <div className="home-page">
      
      {/* අලුත් Premium Hero Section එක */}
      <section style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #1a1a24 0%, #2a2a35 100%)', // Premium dark background
        padding: '4rem 6rem',
        borderRadius: '20px',
        margin: '2rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        color: 'white',
        flexWrap: 'wrap',
        gap: '2rem'
      }}>
        
        {/* වම් පැත්ත: වචන ටික */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: '800', 
            lineHeight: '1.2',
            marginBottom: '1.5rem',
            background: 'linear-gradient(to right, #ff6b6b, #ffb88c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Step Into <br/>The Future of Style.
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#b0b0c0', 
            maxWidth: '500px', 
            marginBottom: '2.5rem',
            lineHeight: '1.6'
          }}>
            Discover the latest trends in premium footwear. Elevate your everyday look with our exclusive, comfortable, and stylish shoe collections.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/shop">
              <button style={primaryBtnStyle}>
                Shop Collection ➔
              </button>
            </Link>
            <button style={secondaryBtnStyle}>
              View Offers
            </button>
          </div>
        </div>

        {/* දකුණු පැත්ත: අලුත් පින්තූරය */}
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={heroImage} 
            alt="Premium Shoe" 
            style={{ 
              maxWidth: '100%', 
              height: 'auto', 
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
              transform: 'rotate(-15deg) scale(1.1)', // පින්තූරය පොඩ්ඩක් ඇල කරලා ලොකු කරලා තියෙන්නේ
            }} 
          />
        </div>
      </section>

      {/* Features Section එක (කලින් එකම තමා, පොඩි වෙනස්කම් එක්ක) */}
           {/* Features Section එක */}
      <section style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '2rem',
        padding: '2rem 2rem 4rem 2rem'
      }}>
        
        <div style={featureCardStyle}>
          <div style={iconStyle}>
             <img src={shippingIcon} alt="Free Shipping" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          </div>
          <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>Free Shipping</h3>
          <p style={{ color: '#777', fontSize: '0.9rem' }}>On all orders over Rs. 5000</p>
        </div>

        <div style={featureCardStyle}>
          <div style={iconStyle}>
             <img src={paymentIcon} alt="Secure Payment" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          </div>
          <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>Secure Payment</h3>
          <p style={{ color: '#777', fontSize: '0.9rem' }}>100% secure checkout</p>
        </div>

        <div style={featureCardStyle}>
          <div style={iconStyle}>
             <img src={returnsIcon} alt="Easy Returns" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          </div>
          <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>Easy Returns</h3>
          <p style={{ color: '#777', fontSize: '0.9rem' }}>30 days return policy</p>
        </div>

      </section>
      
    </div>
  );
}

// අලුත් Styles ටික
const primaryBtnStyle = {
  padding: '1rem 2.5rem', 
  fontSize: '1.1rem',
  fontWeight: 'bold',
  backgroundColor: '#ff6b6b',
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
  transition: 'transform 0.2s'
};

const secondaryBtnStyle = {
  padding: '1rem 2.5rem', 
  fontSize: '1.1rem',
  fontWeight: 'bold',
  backgroundColor: 'transparent',
  color: 'white',
  border: '2px solid rgba(255,255,255,0.2)',
  borderRadius: '30px',
  cursor: 'pointer',
  transition: 'background 0.2s'
};

const featureCardStyle = {
  backgroundColor: 'white',
  padding: '2.5rem 2rem',
  borderRadius: '15px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  textAlign: 'center',
  flex: '1',
  minWidth: '250px'
};

const iconStyle = {
  fontSize: '3rem',
  marginBottom: '1rem'
};