import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-background) 0%, var(--color-primary-orange-light) 100%)',
        padding: '6rem 2rem',
        textAlign: 'center',
        borderRadius: 'var(--border-radius-lg)',
        margin: '1rem',
        boxShadow: 'var(--box-shadow-subtle)'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '800', 
          color: 'var(--color-text-main)',
          marginBottom: '1rem' 
        }}>
          Step Into <span style={{ color: 'var(--color-primary-orange)' }}>Style.</span>
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'var(--color-text-muted)', 
          maxWidth: '600px', 
          margin: '0 auto 2rem auto' 
        }}>
          Discover the latest trends in premium footwear. Elevate your everyday look with our exclusive, comfortable, and stylish shoe collections.
        </p>
        <Link to="/shop">
          <button className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Shop Collection ➔
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '2rem',
        padding: '4rem 2rem'
      }}>
        
        {/* Feature Card 1 */}
        <div style={featureCardStyle}>
          <div style={iconStyle}>🚚</div>
          <h3 style={{ marginBottom: '0.5rem' }}>Free Shipping</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>On all orders over Rs. 5000</p>
        </div>

        {/* Feature Card 2 */}
        <div style={featureCardStyle}>
          <div style={iconStyle}>🛡️</div>
          <h3 style={{ marginBottom: '0.5rem' }}>Secure Payment</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>100% secure checkout</p>
        </div>

        {/* Feature Card 3 */}
        <div style={featureCardStyle}>
          <div style={iconStyle}>↩️</div>
          <h3 style={{ marginBottom: '0.5rem' }}>Easy Returns</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>30 days return policy</p>
        </div>

      </section>
      
    </div>
  );
}

// Me styles tika cards walata use karanna lesi wenna wenama damme
const featureCardStyle = {
  backgroundColor: 'var(--color-white)',
  padding: '2rem',
  borderRadius: 'var(--border-radius-md)',
  boxShadow: 'var(--box-shadow-subtle)',
  textAlign: 'center',
  flex: '1',
  minWidth: '250px'
};

const iconStyle = {
  fontSize: '2.5rem',
  marginBottom: '1rem'
};