import { Link } from 'react-router-dom';
import '../../assets/global.css'; // Api hadapu colors tika ganna

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: 'var(--color-white)', boxShadow: 'var(--box-shadow-subtle)', padding: '1rem 2rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo Eka */}
        <div className="logo">
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary-orange)', textDecoration: 'none' }}>
            Shoe<span style={{ color: 'var(--color-text-main)' }}>Store</span>
          </Link>
        </div>

        {/* Links Tika */}
        <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: '500' }}>Home</Link>
          <Link to="/shop" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: '500' }}>Shop</Link>
          <Link to="/about" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: '500' }}>About</Link>
        </div>

               {/* Cart & Login Icons */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/cart" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontSize: '1.1rem', fontWeight: '500' }}>
            🛒 Cart (0)
          </Link>
          
          {/* Customer Login එකට යන්න ලින්ක් එක හැදුවා */}
          <Link to="/customer-login">
            <button className="btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', border: 'none' }}>
              Login
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
}