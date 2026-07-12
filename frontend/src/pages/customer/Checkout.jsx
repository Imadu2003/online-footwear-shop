import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  // ගණන් හදන විදිහ
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = 500;
  const total = subtotal + shippingFee;

  // බට්න් එක එබුවම වෙන දේ
  const handlePlaceOrder = (e) => {
    e.preventDefault(); // ෆෝම් එක රීලෝඩ් වෙන එක නවත්තනවා
    setIsSuccess(true); // Success මැසේජ් එක පෙන්නනවා
    clearCart(); // ගබඩාවේ තියෙන Cart එක හිස් කරනවා
    
    // තත්පර 3කින් ඉබේම Home එකට යවනවා
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  // Cart එක හිස් නම් මේක පේනවා
  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div style={pageStyle}>
        <div style={emptyStyle}>
          <h2 style={{ marginBottom: '2rem' }}>Your cart is empty!</h2>
          <button onClick={() => navigate('/shop')} style={btnPrimary}>Go back to Shop</button>
        </div>
      </div>
    );
  }

  // සල්ලි ගෙවලා ඉවර වුණාම මේක පේනවා
  if (isSuccess) {
    return (
      <div style={pageStyle}>
        <div style={successCard}>
          <div style={checkIcon}>✓</div>
          <h1 style={{ color: '#fff', marginBottom: '1rem' }}>Order Placed Successfully!</h1>
          <p style={{ color: '#aaa', marginBottom: '2rem' }}>Thank you for your purchase. We are redirecting you to the home page...</p>
        </div>
      </div>
    );
  }

  // සාමාන්‍ය Checkout ෆෝම් එක සහ බිල් එක
  return (
    <div style={pageStyle}>
      <div style={containerLayout}>
        
        {/* වම් පැත්ත: බිල් එකේ විස්තර ගහන ෆෝම් එක */}
        <div style={formSide}>
          <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '2rem' }}>Checkout</h2>
          
          <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={inputGroup}>
              <label style={labelStyle}>Full Name</label>
              <input type="text" required style={inputStyle} placeholder="John Doe" />
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Email Address</label>
              <input type="email" required style={inputStyle} placeholder="john@example.com" />
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Shipping Address</label>
              <textarea required style={{...inputStyle, height: '100px'}} placeholder="123 Main St, City, Country"></textarea>
            </div>

            <div style={inputRow}>
              <div style={{...inputGroup, flex: 1}}>
                <label style={labelStyle}>City</label>
                <input type="text" required style={inputStyle} placeholder="Colombo" />
              </div>
              <div style={{...inputGroup, flex: 1}}>
                <label style={labelStyle}>Postal Code</label>
                <input type="text" required style={inputStyle} placeholder="00100" />
              </div>
            </div>

            <button type="submit" style={btnPrimary}>Place Order - Rs. {total.toLocaleString('en-LK')}</button>
          </form>
        </div>

        {/* දකුණු පැත්ත: Order Summary (බිල් එක) */}
        <div style={summarySide}>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h3>
          
          <div style={summaryItemList}>
            {cartItems.map((item) => (
              <div key={item.id} style={summaryItem}>
                <img src={item.image} alt={item.name} style={summaryImg} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#aaa', fontSize: '0.8rem' }}>Qty: {item.quantity}</p>
                </div>
                <div style={{ color: '#ff6b00', fontWeight: 'bold' }}>
                  Rs. {(item.price * item.quantity).toLocaleString('en-LK')}
                </div>
              </div>
            ))}
          </div>

          <div style={divider}></div>

          <div style={billRow}>
            <span>Subtotal</span>
            <span>Rs. {subtotal.toLocaleString('en-LK')}</span>
          </div>
          <div style={billRow}>
            <span>Shipping</span>
            <span>Rs. {shippingFee.toLocaleString('en-LK')}</span>
          </div>
          
          <div style={divider}></div>
          
          <div style={{...billRow, fontSize: '1.3rem', color: '#fff', fontWeight: 'bold'}}>
            <span>Total</span>
            <span style={{ color: '#ff6b00' }}>Rs. {total.toLocaleString('en-LK')}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ----- CSS Styles (Dark Premium Look) -----
const pageStyle = { minHeight: '100vh', backgroundColor: '#111827', padding: '3rem 1rem', display: 'flex', justifyContent: 'center' };
const containerLayout = { display: 'flex', flexWrap: 'wrap', gap: '2rem', width: '100%', maxWidth: '1100px' };

const formSide = { flex: '1 1 500px', backgroundColor: '#1f2937', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' };
const summarySide = { flex: '1 1 350px', backgroundColor: '#1f2937', padding: '2.5rem', borderRadius: '16px', height: 'fit-content', border: '1px solid rgba(255,255,255,0.05)' };

const inputGroup = { display: 'flex', flexDirection: 'column', gap: '0.5rem' };
const inputRow = { display: 'flex', gap: '1rem', flexWrap: 'wrap' };
const labelStyle = { color: '#bbb', fontSize: '0.9rem' };
const inputStyle = { padding: '1rem', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#111827', color: '#fff', fontSize: '1rem', outline: 'none' };

const btnPrimary = { backgroundColor: '#ff6b00', color: 'white', border: 'none', padding: '1.2rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem', transition: '0.2s', width: '100%' };

const summaryItemList = { display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' };
const summaryItem = { display: 'flex', alignItems: 'center', gap: '1rem' };
const summaryImg = { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' };

const divider = { height: '1px', backgroundColor: '#374151', margin: '1.5rem 0' };
const billRow = { display: 'flex', justifyContent: 'space-between', color: '#aaa', marginBottom: '0.8rem', fontSize: '1rem' };

const emptyStyle = { textAlign: 'center', color: '#fff', marginTop: '5rem' };
const successCard = { backgroundColor: '#1f2937', padding: '4rem', borderRadius: '20px', textAlign: 'center', maxWidth: '500px', border: '2px solid #25D366', marginTop: '5rem' };
const checkIcon = { fontSize: '4rem', color: '#25D366', marginBottom: '1rem' };