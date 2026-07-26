import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MyOrders = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  // 1. Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/customer-login');
    }
  }, [user, loading, navigate]);

  // 2. Fetch orders and filter by logged-in user ID
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        setFetching(true);
        setError('');
        const res = await fetch('http://localhost:5000/api/orders');
        const data = await res.json();

        let allOrders = [];
        if (Array.isArray(data)) {
          allOrders = data;
        } else if (data && Array.isArray(data.data)) {
          allOrders = data.data;
        }

        const currentUserId = user._id || user.id;

        const filteredOrders = allOrders.filter((order) => {
          if (!order.user) return false;
          if (typeof order.user === 'object') {
            return (order.user._id || order.user.id) === currentUserId;
          }
          return order.user === currentUserId;
        });

        setOrders(filteredOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Unable to load orders. Please make sure the server is running.');
      } finally {
        setFetching(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading || (!user && fetching)) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '1.2rem', color: '#ff6b00', fontWeight: '600' }}>Loading account details...</div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusLower = (status || 'processing').toLowerCase();
    switch (statusLower) {
      case 'shipped':
        return <span className="status-badge badge-shipped">Shipped</span>;
      case 'delivered':
        return <span className="status-badge badge-delivered">Delivered</span>;
      case 'cancelled':
        return <span className="status-badge badge-cancelled">Cancelled</span>;
      case 'processing':
      default:
        return <span className="status-badge badge-processing">Processing</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'N/A'
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
  };

  return (
    <div className="my-orders-container">
      <style>{`
        .my-orders-container {
          font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
          background-color: #f8f9fa;
          min-height: 80vh;
          width: 100%;
        }

        /* Hero Header */
        .orders-hero-premium {
          position: relative;
          width: 100%;
          padding: 70px 20px;
          background: linear-gradient(135deg, #111 0%, #1e1e2d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
          border-bottom: 3px solid var(--color-primary-orange, #ff6b00);
          overflow: hidden;
        }

        .orders-hero-premium::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0) 70%);
          top: -100px;
          left: -100px;
          z-index: 1;
        }

        .orders-hero-premium::after {
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
          color: var(--color-primary-orange, #ff6b00);
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

        .premium-breadcrumb {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #6b7280;
        }

        .premium-breadcrumb a {
          color: #6b7280;
          text-decoration: none;
          transition: color 0.2s;
        }

        .premium-breadcrumb a:hover {
          color: #ff6b00;
        }

        .premium-breadcrumb span {
          color: #9ca3af;
        }

        /* Main Section */
        .orders-content-section {
          max-width: 1000px;
          margin: 50px auto;
          padding: 0 20px;
        }

        /* Loading Spinner */
        .loading-box {
          text-align: center;
          padding: 60px 20px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #ff6b00;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Empty State */
        .empty-orders-card {
          background: #fff;
          border-radius: 20px;
          padding: 60px 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          border: 1px solid #e2e8f0;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: rgba(255, 107, 0, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff6b00;
          font-size: 2.2rem;
        }

        .empty-orders-card h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #111;
          margin-bottom: 10px;
        }

        .empty-orders-card p {
          color: #666;
          margin-bottom: 25px;
          font-size: 1rem;
        }

        .btn-shop-now {
          display: inline-block;
          background-color: var(--color-primary-orange, #ff6b00);
          color: #fff;
          padding: 14px 32px;
          border-radius: 30px;
          font-weight: 700;
          text-decoration: none;
          font-size: 1rem;
          transition: background-color 0.2s, transform 0.1s;
          box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
        }

        .btn-shop-now:hover {
          background-color: #e56000;
          transform: translateY(-2px);
        }

        /* Error Banner */
        .error-banner {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 25px;
          text-align: center;
        }

        /* Order Cards List */
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .order-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .order-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
        }

        .order-card-header {
          background: #fafafa;
          padding: 20px 25px;
          border-bottom: 1px solid #edf2f7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .order-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .order-id {
          font-size: 1.1rem;
          font-weight: 800;
          color: #111;
          letter-spacing: 0.5px;
        }

        .order-date {
          font-size: 0.85rem;
          color: #718096;
        }

        /* Status Badges */
        .status-badge {
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge-processing {
          background-color: #fff7ed;
          color: #c2410c;
          border: 1px solid #ffedd5;
        }

        .badge-shipped {
          background-color: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #dbeafe;
        }

        .badge-delivered {
          background-color: #f0fdf4;
          color: #15803d;
          border: 1px solid #dcfce7;
        }

        .badge-cancelled {
          background-color: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fee2e2;
        }

        /* Order Items */
        .order-card-body {
          padding: 25px;
        }

        .order-items-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }

        .order-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding-bottom: 15px;
          border-bottom: 1px dashed #e2e8f0;
        }

        .order-item-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .order-item-details {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .order-item-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #edf2f7;
          background-color: #f7fafc;
        }

        .order-item-title {
          font-weight: 700;
          color: #2d3748;
          font-size: 1rem;
        }

        .order-item-qty {
          font-size: 0.85rem;
          color: #718096;
        }

        .order-item-price {
          font-weight: 700;
          color: #1a202c;
          font-size: 1rem;
        }

        /* Order Card Footer */
        .order-card-footer {
          background: #fafafa;
          padding: 18px 25px;
          border-top: 1px solid #edf2f7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .payment-method-info {
          font-size: 0.9rem;
          color: #4a5568;
        }

        .payment-method-info strong {
          color: #2d3748;
        }

        .order-total-price {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ff6b00;
        }
      `}</style>

      {/* Hero Header */}
      <div className="orders-hero-premium">
        <div className="hero-premium-content">
          <span className="hero-tag-badge">Order History</span>
          <h1>My Orders</h1>
          <div className="premium-breadcrumb">
            <Link to="/">Home</Link> &nbsp;/&nbsp; <span>My Orders</span>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="orders-content-section">
        {error && <div className="error-banner">{error}</div>}

        {fetching ? (
          <div className="loading-box">
            <div className="spinner"></div>
            <p style={{ color: '#666', fontWeight: '500' }}>Fetching your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-orders-card">
            <div className="empty-icon">🛍️</div>
            <h2>No orders yet</h2>
            <p>You haven't placed any orders with us. Explore our latest footwear collections today!</p>
            <Link to="/shop" className="btn-shop-now">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const displayId = order._id
                ? `#${order._id.slice(-8).toUpperCase()}`
                : 'N/A';
              const items = order.orderItems || order.items || [];

              return (
                <div className="order-card" key={order._id || Math.random()}>
                  <div className="order-card-header">
                    <div className="order-meta">
                      <span className="order-id">Order {displayId}</span>
                      <span className="order-date">Placed on {formatDate(order.createdAt)}</span>
                    </div>
                    <div>{getStatusBadge(order.status)}</div>
                  </div>

                  <div className="order-card-body">
                    <div className="order-items-list">
                      {items.map((item, idx) => (
                        <div className="order-item-row" key={idx}>
                          <div className="order-item-details">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name || 'Product'}
                                className="order-item-img"
                              />
                            )}
                            <div>
                              <div className="order-item-title">{item.name || 'Footwear Product'}</div>
                              <div className="order-item-qty">
                                Quantity: {item.qty || item.quantity || 1}
                              </div>
                            </div>
                          </div>
                          <div className="order-item-price">
                            Rs. {((item.price || 0) * (item.qty || item.quantity || 1)).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="order-card-footer">
                    <div className="payment-method-info">
                      Payment Method: <strong>{order.paymentMethod || 'Cash on Delivery'}</strong>
                    </div>
                    <div className="order-total-price">
                      Total: Rs. {Number(order.totalPrice || 0).toLocaleString()}
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

export default MyOrders;
