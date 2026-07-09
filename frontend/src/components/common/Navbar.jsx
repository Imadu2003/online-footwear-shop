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
        <div className="nav-actions">
          <Link to="/cart" style={{ textDecoration: 'none', marginRight: '1rem', color: 'var(--color-text-main)' }}>
            🛒 Cart (0)
          </Link>
          <button className="btn-primary">Login</button>
        </div>

      </div>
    </nav>
  );
}