import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../components/customer/CartItem';

export default function Cart() {
  // useState පාවිච්චි කරලා items ටික හදාගන්නවා
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Nike Air Max 270", price: 25000, quantity: 1, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop" },
    { id: 2, name: "Vans Old Skool", price: 15000, quantity: 2, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=200&auto=format&fit=crop" }
  ]);

  // Remove කරන function එක
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Your Cart</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem 
              key={item.id} 
              item={item} 
              onRemove={handleRemoveItem} 
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#777' }}>Your cart is empty.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '10px', textAlign: 'right' }}>
          <h2 style={{ margin: '0 0 1.5rem 0' }}>Total: <span style={{ color: '#ff6b6b' }}>Rs. {totalAmount.toLocaleString()}</span></h2>
          
          <Link to="/checkout">
            <button style={checkoutBtnStyle}>Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
}

const checkoutBtnStyle = {
  padding: '1rem 2.5rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};