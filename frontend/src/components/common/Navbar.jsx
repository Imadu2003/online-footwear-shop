import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../assets/global.css'; 
import {useCart} from '../../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth(); // සිකියුරිටි ගාඩ්ගෙන් විස්තර ගන්නවා
   const { cartItems } = useCart(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ලොග් අවුට් කරනවා
    navigate('/'); // Home එකට යවනවා
  };

  return (
    <nav style={{ backgroundColor: 'var(--color-white)', boxShadow: 'var(--box-shadow-subtle)', padding: '1rem 2rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo එක */}
        <div className="logo">
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary-orange)', textDecoration: 'none' }}>
            Shoe<span style={{ color: 'var(--color-text-main)' }}>Store</span>
          </Link>
        </div>

        {/* Links ටික */}
        <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: '500' }}>Home</Link>
          <Link to="/shop" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: '500' }}>Shop</Link>
          <Link to="/about" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: '500' }}>About</Link>
        </div>

        {/* Cart සහ Login/Logout Icons */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          
           <Link to="/cart" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontSize: '1.1rem', fontWeight: '500' }}>
            {/* Array එකේ දිග (length) අරන් අයිටම් ගාණ සජීවීව පෙන්නනවා */}
            🛒 Cart ({cartItems.length})
          </Link>
          
          {/* මෙතන තමයි අර Conditional Rendering එක */}
          {user ? (
             <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', border: 'none', backgroundColor: '#ef4444' }}>
               Logout
             </button>
          ) : (
             <Link to="/customer-login">
               <button className="btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', border: 'none' }}>
                 Login
               </button>
             </Link>
          )}

        </div>

      </div>
    </nav>
  );
}