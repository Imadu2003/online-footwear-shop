import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div style={cardStyle}>
      {/* සපත්තුවේ රූපය */}
      <div style={{ height: '250px', overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
        />
      </div>

      {/* විස්තර ටික */}
      <div style={{ padding: '1.5rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', fontWeight: 'bold' }}>
          {product.category}
        </span>
        <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem', color: '#333' }}>
          {product.name}
        </h3>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff6b6b', marginBottom: '1rem' }}>
          Rs. {product.price.toLocaleString()}
        </p>

        <Link to={`/shop/${product._id}`} style={{
          textDecoration: 'none'

        }}>          <button style={btnStyle}>

            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

// Styles
const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer'
};

const btnStyle = {
  width: '100%',
  padding: '0.8rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  backgroundColor: '#ff6b6b',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};