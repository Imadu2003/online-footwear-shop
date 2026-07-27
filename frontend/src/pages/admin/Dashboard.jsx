import { useState, useEffect } from 'react';
import StatCard from '../../components/admin/StatCard';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch Orders
      const resOrders = await fetch('http://localhost:5000/api/orders');
      const dataOrders = await resOrders.json();
      if (resOrders.ok && dataOrders.success && dataOrders.data) {
        setOrders(dataOrders.data);
      }

      // Fetch Products count
      const resProducts = await fetch('http://localhost:5000/api/products');
      const dataProducts = await resProducts.json();
      if (resProducts.ok && dataProducts.data) {
        setProductCount(dataProducts.data.length);
      }

      // Fetch Users count
      const resUsers = await fetch('http://localhost:5000/api/auth/users');
      const dataUsers = await resUsers.json();
      if (resUsers.ok && dataUsers.data) {
        setUserCount(dataUsers.data.length);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Calculate dynamic stats
  const totalSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (o.totalPrice || o.totalAmount || 0), 0);

  const stats = [
    {
      title: 'Total Sales',
      value: `Rs. ${totalSales.toLocaleString('en-LK')}`,
      trend: `${orders.length} total orders`,
      trendType: 'up',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
    {
      title: 'Total Orders',
      value: `${orders.length}`,
      trend: `${orders.filter(o => o.status === 'Processing').length} pending processing`,
      trendType: 'up',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      ),
    },
    {
      title: 'Active Products',
      value: `${productCount > 0 ? productCount : '12'}`,
      trend: 'Live in store',
      trendType: 'up',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
    },
    {
      title: 'Total Customers',
      value: `${userCount > 0 ? userCount : '8'}`,
      trend: 'Registered users',
      trendType: 'up',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered': return 'badge-success';
      case 'Shipped': return 'badge-info';
      case 'Processing': return 'badge-info';
      case 'Pending': return 'badge-warning';
      case 'Cancelled': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  // Format date helper
  const formatDate = (isoString) => {
    if (!isoString) return 'Today';
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div>
      {/* Stats Cards Section */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            trendType={stat.trendType}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Main Grid: Recent Orders & Top Selling products */}
      <div className="dashboard-grid">
        {/* Left Side: Recent Orders */}
        <div className="admin-panel">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Recent Orders ({orders.length})</h3>
            <button 
              onClick={fetchDashboardData} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#ff6b00' }}
              title="Refresh Dashboard Data"
            >
              🔄
            </button>
          </div>
          <div className="table-container">
            {loading ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>Loading dashboard...</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.slice(0, 5).map((order) => {
                      const idStr = order._id ? (order._id.length >= 24 ? `ORD-${order._id.slice(-6).toUpperCase()}` : order._id) : 'ORD-NEW';
                      const custName = order.customerInfo?.name || order.user?.name || 'Customer';
                      const totalAmt = order.totalPrice !== undefined ? order.totalPrice : (order.totalAmount || 0);

                      return (
                        <tr key={order._id}>
                          <td style={{ fontWeight: '600', color: '#ff6b00' }}>{idStr}</td>
                          <td>{custName}</td>
                          <td>{formatDate(order.createdAt)}</td>
                          <td style={{ fontWeight: '600' }}>Rs. {typeof totalAmt === 'number' ? totalAmt.toLocaleString('en-LK') : totalAmt}</td>
                          <td>
                            <span className={`badge ${getStatusClass(order.status)}`}>
                              {order.status || 'Processing'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>
                        No orders recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Side: Top Selling Footwear */}
        <div className="admin-panel">
          <div className="panel-header">
            <h3>Top Selling Footwear</h3>
          </div>
          <div className="list-group">
            {[
              { name: 'Nike Air Max 270', sales: '48 sales', revenue: 'Rs. 864,000', type: 'Sport' },
              { name: 'Adidas Ultraboost', sales: '36 sales', revenue: 'Rs. 792,000', type: 'Running' },
              { name: 'Puma Suede Classic', sales: '30 sales', revenue: 'Rs. 360,000', type: 'Casual' },
              { name: 'Vans Old Skool', sales: '25 sales', revenue: 'Rs. 225,000', type: 'Casual' },
            ].map((shoe, idx) => (
              <div className="list-item" key={idx}>
                <div className="list-item-left">
                  <div className="product-img-placeholder" style={{ width: '40px', height: '40px', fontSize: '20px' }}>
                    👟
                  </div>
                  <div className="list-item-info">
                    <span className="list-item-title">{shoe.name}</span>
                    <span className="list-item-subtitle">{shoe.sales} • {shoe.type}</span>
                  </div>
                </div>
                <div className="list-item-right" style={{ fontWeight: '600' }}>
                  {shoe.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}