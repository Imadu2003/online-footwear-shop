import StatCard from '../../components/admin/StatCard';

export default function Dashboard() {
  // Stat data
  const stats = [
    {
      title: 'Total Sales',
      value: 'Rs. 2,450,000.00',
      trend: '12% from last month',
      trendType: 'up',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
    {
      title: 'Total Orders',
      value: '145',
      trend: '8% from last week',
      trendType: 'up',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      ),
    },
    {
      title: 'Active Products',
      value: '32',
      trend: '4 new shoes added',
      trendType: 'up',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
    },
    {
      title: 'Total Customers',
      value: '1,240',
      trend: '15% growth rate',
      trendType: 'up',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  // Dummy recent orders data
  const recentOrders = [
    { id: 'ORD-1082', customer: 'Ruwan Kumara', date: '2026-07-10', amount: 'Rs. 32,500.00', status: 'Pending', statusClass: 'badge-warning' },
    { id: 'ORD-1081', customer: 'Sanduni Perera', date: '2026-07-09', amount: 'Rs. 18,000.00', status: 'Shipped', statusClass: 'badge-info' },
    { id: 'ORD-1080', customer: 'Nimal Silva', date: '2026-07-08', amount: 'Rs. 45,500.00', status: 'Delivered', statusClass: 'badge-success' },
    { id: 'ORD-1079', customer: 'Dilini Jayawardena', date: '2026-07-08', amount: 'Rs. 12,000.00', status: 'Delivered', statusClass: 'badge-success' },
    { id: 'ORD-1078', customer: 'Kasun Fernando', date: '2026-07-07', amount: 'Rs. 24,000.00', status: 'Cancelled', statusClass: 'badge-danger' },
  ];

  // Dummy top selling shoes
  const topSellingShoes = [
    { name: 'Nike Air Max 270', sales: '48 sales', revenue: 'Rs. 864,000.00', type: 'Sport' },
    { name: 'Adidas Ultraboost', sales: '36 sales', revenue: 'Rs. 792,000.00', type: 'Running' },
    { name: 'Puma Suede Classic', sales: '30 sales', revenue: 'Rs. 360,000.00', type: 'Casual' },
    { name: 'Vans Old Skool', sales: '25 sales', revenue: 'Rs. 225,000.00', type: 'Casual' },
  ];

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
          <div className="panel-header">
            <h3>Recent Orders</h3>
          </div>
          <div className="table-container">
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
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: '600' }}>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td style={{ fontWeight: '500' }}>{order.amount}</td>
                    <td>
                      <span className={`badge ${order.statusClass}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Top Selling Footwear */}
        <div className="admin-panel">
          <div className="panel-header">
            <h3>Top Selling Footwear</h3>
          </div>
          <div className="list-group">
            {topSellingShoes.map((shoe, idx) => (
              <div className="list-item" key={idx}>
                <div className="list-item-left">
                  {/* Simple Shoe Icon / Emoji instead of raw images for now */}
                  <div className="product-img-placeholder" style={{ width: '40px', height: '40px', fontSize: '20px' }}>
                    👟
                  </div>
                  <div className="list-item-info">
                    <span className="list-item-title">{shoe.name}</span>
                    <span className="list-item-subtitle">{shoe.sales} • {shoe.type}</span>
                  </div>
                </div>
                <div className="list-item-right">
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