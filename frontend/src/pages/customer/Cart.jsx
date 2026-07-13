import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import bgImage from '../../assets/cart-bg.png'; 

export default function Cart() {
  // අපේ අලුත් ගබඩාවෙන් ඇත්තම සපත්තු ටිකයි, මකන function එකයි ගන්නවා
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  // මුළු ගාණ (Total) එකතු කරන විදිහ
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        
        {/* left side have the image*/}
        <div style={imageSideStyle}>
          <div style={overlayStyle}>
            <h1 style={{ fontSize: '3rem', margin: 0, color: '#fff' }}>Your Cart</h1>
            <p style={{ color: '#ccc', marginTop: '1rem' }}>Review your items before checkout.</p>
          </div>
        </div>

        {/* right side have item list */}
        <div style={contentSideStyle}>
          
          {cartItems.length === 0 ? (
            // if cart is empty
            <div style={emptyCartStyle}>
              <h2 style={{ color: '#888', marginBottom: '2rem' }}>Your cart is empty 😢</h2>
              <Link to="/shop">
                <button style={checkoutBtnStyle}>Go to Shop</button>
              </Link>
            </div>
          ) : (
            // if cart have item show the below
            <>
              <div style={itemListStyle}>
                {cartItems.map((item) => (
                  <div key={item.id} style={cartItemStyle}>
                    <img src={item.image} alt={item.name} style={itemImageStyle} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>{item.name}</h3>
                      <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>Size: {item.size} | Qty: {item.quantity}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#ff6b00', fontWeight: 'bold' }}>
                        Rs. {(item.price * item.quantity).toLocaleString('en-LK')}
                      </p>
                      <button onClick={() => removeFromCart(item.id)} style={removeBtnStyle}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total and checkout button */}
              <div style={summaryStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', color: '#fff' }}>
                  <span>Subtotal:</span>
                  <span style={{ fontWeight: 'bold', color: '#ff6b00' }}>Rs. {subtotal.toLocaleString('en-LK')}</span>
                </div>
                <button onClick={() => navigate('/checkout')} style={checkoutBtnStyle}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

// ----- Styles -----
const pageStyle = { minHeight: '80vh', backgroundColor: '#111827', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const containerStyle = { display: 'flex', width: '100%', maxWidth: '1100px', backgroundColor: '#1f2937', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', minHeight: '600px' };

// image side
const imageSideStyle = { flex: 1, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'none', '@media (min-width: 768px)': { display: 'block' } };
const overlayStyle = { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' };

// item side
const contentSideStyle = { flex: 1.5, padding: '3rem', display: 'flex', flexDirection: 'column' };
const emptyCartStyle = { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' };
const itemListStyle = { flex: 1, overflowY: 'auto', paddingRight: '1rem', marginBottom: '2rem' };

// appearance of single iteam
const cartItemStyle = { display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.1)' };
const itemImageStyle = { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' };
const removeBtnStyle = { backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', transition: '0.2s' };

// part of the bill
const summaryStyle = { backgroundColor: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' };
const checkoutBtnStyle = { width: '100%', backgroundColor: '#ff6b00', color: 'white', border: 'none', padding: '1rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' };