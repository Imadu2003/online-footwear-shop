import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../assets/global.css'; 
import { useCart } from '../../context/CartContext';
import UserProfilePanel from './UserProfilePanel'; // අපි හදපු අලුත් Component එක ගේනවා

export default function Navbar() {
  const { user } = useAuth(); // දැන් මෙතනට logout ඕනෙ නෑ, ඒක තියෙන්නේ Panel එක ඇතුළේ
  const { cartItems } = useCart(); 
  
  // Panel එක ඕපන් ද නැද්ද කියලා මතක තියාගන්න State එක
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
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
            <Link to="/contact" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: '500' }}>Contact Us</Link>
            <Link to="/reviews" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: '500' }}>Reviews</Link>
          </div>

          {/* Cart සහ Profile Icons */}
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            
             <Link to="/cart" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontSize: '1.1rem', fontWeight: '500' }}>
              🛒 Cart ({cartItems.length})
            </Link>
            
            {/* මෙතන තමයි Conditional Rendering එක වෙනස් කරේ */}
            {user ? (
               // Logout බට්න් එක වෙනුවට දැන් පෙන්නන්නේ Userගේ පින්තූරය සහ නම
               <div 
                 onClick={() => setIsProfileOpen(true)} 
                 style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px 12px', borderRadius: '50px', backgroundColor: '#f3f4f6', transition: 'background 0.2s' }}
               >
                 {/* නමේ පළවෙනි කෑල්ල විතරක් පෙන්නනවා (උදා: Isuru Kumara නම් Isuru විතරයි) */}
                 <span style={{ fontWeight: '600', color: '#374151', fontSize: '0.95rem' }}>{user.name.split(' ')[0]}</span>
                 <img 
                   src={user.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                   alt="Profile" 
                   style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff6b6b' }} 
                 />
               </div>
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

      {/* හැංගිලා තියෙන Slide Panel එක (අර උඩින් තියෙන පින්තූරෙ එබුවම ඕපන් වෙනවා) */}
      <UserProfilePanel 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </>
  );
}