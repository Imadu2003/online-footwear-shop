export default function CartItem({ item, onRemove }) {
  return (
    <div style={cartItemStyle}>
      <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
      
      <div style={{ flex: 1, paddingLeft: '1.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{item.name}</h3>
        <p style={{ margin: '0', color: '#777' }}>Qty: {item.quantity}</p>
      </div>
      
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff6b6b', margin: '0 0 1rem 0' }}>
          Rs. {(item.price * item.quantity).toLocaleString()}
        </p>
        {/* onClick එකට onRemove function එක දෙනවා */}
        <button style={removeBtnStyle} onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

// Styles
const cartItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};

const removeBtnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#ff4d4f',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};