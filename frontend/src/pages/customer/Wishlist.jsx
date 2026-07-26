import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Wishlist = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/customer-login');
      return;
    }

    if (user) {
      const storageKey = `wishlist_${user._id || user.id}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          setWishlistItems(JSON.parse(stored));
        } catch (err) {
          console.error('Error parsing wishlist from localStorage:', err);
          setWishlistItems([]);
        }
      }
    }
  }, [user, loading, navigate]);

  const handleRemove = (idToRemove) => {
    if (!user) return;
    const updated = wishlistItems.filter(item => (item._id || item.id) !== idToRemove);
    setWishlistItems(updated);
    const storageKey = `wishlist_${user._id || user.id}`;
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: "'Outfit', 'Segoe UI', sans-serif", color: '#555' }}>
        Loading wishlist...
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <style>{`
        .wishlist-page {
          font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background-color: #f8f9fa;
          min-height: 80vh;
          width: 100%;
        }

        .wishlist-hero-premium {
          position: relative;
          width: 100%;
          padding: 80px 20px;
          background: linear-gradient(135deg, #111 0%, #1e1e2d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
          border-bottom: 3px solid #ff6b00;
          overflow: hidden;
        }

        .wishlist-hero-premium::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0) 70%);
          top: -100px;
          left: -100px;
          z-index: 1;
        }

        .wishlist-hero-premium::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 0, 0) 70%);
          bottom: -150px;
          right: -100px;
          z-index: 1;
        }

        .hero-premium-content {
          max-width: 800px;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        .hero-tag-badge {
          display: inline-block;
          padding: 6px 14px;
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid rgba(255, 107, 0, 0.2);
          color: #ff6b00;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          border-radius: 30px;
          margin-bottom: 20px;
        }

        .hero-premium-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin: 0 0 15px 0;
          letter-spacing: -1.5px;
          text-transform: uppercase;
          color: #ff6b00 !important;
          -webkit-text-fill-color: #ff6b00 !important;
        }

        .hero-premium-content p {
          font-size: 1.25rem;
          font-weight: 400;
          margin: 0 0 25px 0;
          letter-spacing: 0.5px;
          color: #b0b0c0;
          line-height: 1.5;
        }

        .premium-breadcrumb {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #6b7280;
        }

        .premium-breadcrumb a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.2s;
        }

        .premium-breadcrumb a:hover {
          color: #ff6b00;
        }

        .premium-breadcrumb span {
          color: #ff6b00;
        }

        .wishlist-container {
          max-width: 1200px;
          margin: 60px auto;
          padding: 0 20px;
        }

        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 30px;
        }

        .wishlist-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          border: 1px solid #e5e7eb;
        }

        .wishlist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 220px;
          background: #f3f4f6;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .wishlist-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #111;
          margin: 0 0 10px 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-price {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ff6b00;
          margin-bottom: 20px;
        }

        .card-actions {
          margin-top: auto;
          display: flex;
          gap: 10px;
        }

        .btn-remove {
          flex: 1;
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-remove:hover {
          background: #dc2626;
          color: #fff;
          border-color: #dc2626;
        }

        .btn-view {
          background: #111827;
          color: #fff;
          text-decoration: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-view:hover {
          background: #ff6b00;
        }

        .empty-wishlist-card {
          background: #fff;
          border-radius: 20px;
          padding: 60px 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid #e5e7eb;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 107, 0, 0.1);
          color: #ff6b00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 2.5rem;
        }

        .empty-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #111;
          margin-bottom: 12px;
        }

        .empty-desc {
          font-size: 1.05rem;
          color: #6b7280;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .btn-browse {
          display: inline-block;
          background: #ff6b00;
          color: #fff;
          padding: 14px 32px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
          transition: all 0.2s ease;
        }

        .btn-browse:hover {
          background: #e56000;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 107, 0, 0.4);
        }
      `}</style>

      {/* Hero Header */}
      <div className="wishlist-hero-premium">
        <div className="hero-premium-content">
          <span className="hero-tag-badge">Your Favorites</span>
          <h1>My Wishlist</h1>
          <p>Keep track of the footwear items you love and buy them whenever you are ready.</p>
          <div className="premium-breadcrumb">
            <Link to="/">Home</Link> &nbsp;/&nbsp; <span>Wishlist</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="wishlist-container">
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist-card">
            <div className="empty-icon">♡</div>
            <h2 className="empty-title">Your wishlist is empty</h2>
            <p className="empty-desc">
              You haven't added any shoes to your wishlist yet. Explore our latest footwear collection and save your favorite styles!
            </p>
            <Link to="/shop" className="btn-browse">
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div key={itemId} className="wishlist-card">
                  <div className="card-image-wrapper">
                    <img 
                      src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                      alt={item.name} 
                      className="card-image"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{item.name}</h3>
                    <div className="card-price">
                      Rs. {typeof item.price === 'number' ? item.price.toLocaleString('en-LK') : item.price}
                    </div>
                    <div className="card-actions">
                      <button className="btn-remove" onClick={() => handleRemove(itemId)}>
                        🗑 Remove
                      </button>
                      <Link to={`/shop/${itemId}`} className="btn-view">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
