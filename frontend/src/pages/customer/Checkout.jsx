import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = 500;
  const total = subtotal + shippingFee;

  const handlePlaceOrder = async (e) => {
    e.preventDefault(); 
    
    if (!user) {
      alert("Please login to place an order!");
      navigate('/login');
      return;
    }

    // පරණ 'p1', 'p2' වගේ තියෙන Dummy දත්ත අයින් කරනවා
    const hasDummyItems = cartItems.some(item => {
      const id = item._id || item.id;
      return id && id.length < 24; 
    });

    if (hasDummyItems) {
      alert("⚠️ Your cart contains old test data! The system will clear your cart now. Please go to the Shop and add real shoes from the database.");
      clearCart();
      navigate('/shop');
      return;
    }

    const orderData = {
      user: user._id, 
      orderItems: cartItems.map(item => ({
        name: item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        product: item._id || item.id 
      })),
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: "Sri Lanka"
      },
      paymentMethod: paymentMethod,
      totalPrice: total
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      
      if (data.success) {
        setIsSuccess(true);
        clearCart();
        setTimeout(() => navigate('/'), 4000);
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div style={pageStyle}>
        <div style={emptyStyle}>
          <svg style={{width:'80px', height:'80px', color:'#555', marginBottom:'1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          <h2 style={{ marginBottom: '1rem', color:'#fff' }}>Your cart is empty!</h2>
          <p style={{ color:'#888', marginBottom:'2rem' }}>Looks like you haven't made your choice yet.</p>
          <button onClick={() => navigate('/shop')} style={btnPrimary}>Explore Collection</button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div style={pageStyle}>
        <div style={successCard}>
          <div>
            <svg style={checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h1 style={{ color: '#fff', marginBottom: '1rem', fontSize:'2.5rem' }}>Order Confirmed!</h1>
          <p style={{ color: '#aaa', marginBottom: '2rem', fontSize:'1.1rem' }}>Thank you for choosing StepUp. Your premium footwear is on its way.</p>
          <div style={pulseLine}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={containerLayout}>
        
        {/* Banner Section */}
        <div style={{ width: '100%' }}>
          <img 
            src="/checkout-banner.png" 
            alt="Checkout Premium" 
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,107,0,0.2)' }} 
          />
        </div>

        <div style={formSide}>
          <div style={{ display: 'flex', alignItems: 'center', gap:'1rem', marginBottom: '2rem' }}>
            <span style={{ backgroundColor:'#ff6b00', color:'#000', padding:'0.3rem 1rem', borderRadius:'20px', fontWeight:'bold', fontSize:'0.9rem' }}>STEP 1</span>
            <h2 style={{ color: '#fff', fontSize: '1.8rem', margin:0 }}>Shipping Details</h2>
          </div>
          
          <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={inputGroup}>
              <label style={labelStyle}>Full Name</label>
              <input type="text" value={user?.name || ''} readOnly style={{...inputStyle, opacity: 0.6, cursor:'not-allowed'}} />
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Email Address</label>
              <input type="email" value={user?.email || ''} readOnly style={{...inputStyle, opacity: 0.6, cursor:'not-allowed'}} />
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Delivery Address</label>
              <textarea 
                required style={{...inputStyle, height: '80px'}} placeholder="No 123, Main Street, Area"
                value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
              ></textarea>
            </div>

            <div style={inputRow}>
              <div style={{...inputGroup, flex: 1}}>
                <label style={labelStyle}>City</label>
                <input 
                  type="text" required style={inputStyle} placeholder="Colombo" 
                  value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div style={{...inputGroup, flex: 1}}>
                <label style={labelStyle}>Postal Code</label>
                <input 
                  type="text" required style={inputStyle} placeholder="00100"
                  value={formData.postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                />
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap:'1rem', marginBottom: '1.5rem' }}>
                <span style={{ backgroundColor:'#ff6b00', color:'#000', padding:'0.3rem 1rem', borderRadius:'20px', fontWeight:'bold', fontSize:'0.9rem' }}>STEP 2</span>
                <h2 style={{ color: '#fff', fontSize: '1.5rem', margin:0 }}>Payment Method</h2>
              </div>
              
              <div style={paymentOptionsGrid}>
                <div 
                  style={paymentMethod === 'Cash on Delivery' ? paymentActive : paymentInactive}
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                >
                  <span style={{ fontSize: '1.5rem', marginBottom:'0.5rem' }}>🚚</span>
                  <span style={{ fontWeight:'bold' }}>Cash on Delivery</span>
                </div>
                
                <div 
                  style={paymentMethod === 'Card Payment' ? paymentActive : paymentInactive}
                  onClick={() => setPaymentMethod('Card Payment')}
                >
                  <span style={{ fontSize: '1.5rem', marginBottom:'0.5rem' }}>💳</span>
                  <span style={{ fontWeight:'bold' }}>Credit/Debit Card</span>
                </div>
                
                <div 
                  style={paymentMethod === 'Koko Pay' ? paymentActive : paymentInactive}
                  onClick={() => setPaymentMethod('Koko Pay')}
                >
                  <span style={{ fontSize: '1.5rem', marginBottom:'0.5rem' }}>🛍️</span>
                  <span style={{ fontWeight:'bold' }}>Koko Pay</span>
                </div>
              </div>
            </div>

            <button type="submit" style={btnPrimary}>
              Confirm & Pay - Rs. {total.toLocaleString('en-LK')}
            </button>
          </form>
        </div>

        <div style={summarySide}>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom:'1px solid #333', paddingBottom:'1rem' }}>Order Summary</h3>
          
          <div style={summaryItemList}>
            {cartItems.map((item) => (
              <div key={item.id || item._id} style={summaryItem}>
                <img src={item.image} alt={item.name} style={summaryImg} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize:'0.95rem' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#ff6b00', fontSize: '0.8rem', fontWeight:'bold' }}>Rs. {(item.price * item.quantity).toLocaleString('en-LK')}</p>
                </div>
                <div style={{ color: '#888', fontSize:'0.85rem', backgroundColor:'#2a3441', padding:'0.2rem 0.6rem', borderRadius:'6px' }}>
                  x{item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div style={divider}></div>

          <div style={billRow}>
            <span>Subtotal</span>
            <span style={{color:'#fff'}}>Rs. {subtotal.toLocaleString('en-LK')}</span>
          </div>
          <div style={billRow}>
            <span>Express Shipping</span>
            <span style={{color:'#fff'}}>Rs. {shippingFee.toLocaleString('en-LK')}</span>
          </div>
          
          <div style={divider}></div>
          
          <div style={{...billRow, fontSize: '1.4rem', color: '#fff', fontWeight: 'bold'}}>
            <span>Total</span>
            <span style={{ color: '#ff6b00' }}>Rs. {total.toLocaleString('en-LK')}</span>
          </div>
          
          <div style={{ marginTop:'2rem', backgroundColor:'#111827', padding:'1rem', borderRadius:'8px', fontSize:'0.8rem', color:'#777', display:'flex', gap:'0.5rem', alignItems:'center' }}>
            <svg style={{width:'20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            SSL Secure Checkout. Your information is protected by industry-standard 256-bit encryption.
          </div>
        </div>

      </div>
    </div>
  );
}

// ----- CSS Styles -----
const pageStyle = { minHeight: '100vh', backgroundColor: '#0f172a', padding: '3rem 1rem', display: 'flex', justifyContent: 'center' };
const containerLayout = { display: 'flex', flexWrap: 'wrap', gap: '2rem', width: '100%', maxWidth: '1100px' };

const formSide = { flex: '1 1 500px', backgroundColor: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' };
const summarySide = { flex: '1 1 350px', backgroundColor: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)', padding: '2.5rem', borderRadius: '20px', height: 'fit-content', border: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: '2rem' };

const inputGroup = { display: 'flex', flexDirection: 'column', gap: '0.5rem' };
const inputRow = { display: 'flex', gap: '1rem', flexWrap: 'wrap' };
const labelStyle = { color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' };
const inputStyle = { padding: '1rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' };

const paymentOptionsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' };
const paymentInactive = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.2rem', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#94a3b8', cursor: 'pointer', transition: 'all 0.3s' };
const paymentActive = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.2rem', borderRadius: '12px', border: '2px solid #ff6b00', backgroundColor: 'rgba(255,107,0,0.1)', color: '#ff6b00', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 15px rgba(255,107,0,0.2)' };

const btnPrimary = { backgroundColor: '#ff6b00', color: 'white', border: 'none', padding: '1.2rem', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1.5rem', transition: 'all 0.3s', width: '100%', boxShadow: '0 4px 15px rgba(255,107,0,0.4)', textTransform: 'uppercase', letterSpacing: '1px' };

const summaryItemList = { display: 'flex', flexDirection: 'column', gap: '1.2rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '0.5rem' };
const summaryItem = { display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#0f172a', padding: '0.8rem', borderRadius: '12px', border: '1px solid #334155' };
const summaryImg = { width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' };

const divider = { height: '1px', backgroundColor: '#334155', margin: '1.5rem 0' };
const billRow = { display: 'flex', justifyContent: 'space-between', color: '#94a3b8', marginBottom: '1rem', fontSize: '1rem' };

const emptyStyle = { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor: '#1e293b', padding: '4rem', borderRadius: '20px', border: '1px solid #334155' };
const successCard = { backgroundColor: '#1e293b', padding: '4rem', borderRadius: '24px', textAlign: 'center', maxWidth: '600px', border: '1px solid rgba(37,211,102,0.3)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', marginTop: '3rem' };
const checkIcon = { width: '80px', height: '80px', color: '#25D366', margin: '0 auto' };
const pulseLine = { height:'4px', width:'100%', background: 'linear-gradient(90deg, transparent, #25D366, transparent)', marginTop:'2rem' };