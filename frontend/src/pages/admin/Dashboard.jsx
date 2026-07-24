import { useState, useEffect } from 'react';
import StatCard from '../../components/admin/StatCard';

export default function Dashboard() {
  const [statsData, setStatsData] = useState({
    totalSales: 0,
    totalOrders: 0,
    activeProducts: 0,
    totalCustomers: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topSellingShoes, setTopSellingShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Database එකෙන් දත්ත අරන් එන ෆන්ක්ෂන් එක
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          fetch('http://localhost:5000/api/orders'),
          fetch('http://localhost:5000/api/products'),
          fetch('http://localhost:5000/api/auth/users')
        ]);

        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();
        const usersData = await usersRes.json();

        const orders = ordersData.success ? ordersData.data : [];
        const products = Array.isArray(productsData) ? productsData : [];
        const users = usersData.success ? usersData.data : [];

        // සල්ලි ගණන් හදනවා (Delivered වුණු ඒවයේ විතරක්)
        const totalSales = orders
          .filter(o => o.status === 'Delivered')
          .reduce((sum, order) => sum + order.totalPrice, 0);

        setStatsData({
          totalSales: totalSales,
          totalOrders: orders.length,
          activeProducts: products.length,
          totalCustomers: users.length
        });

        // අලුත්ම Orders 5ක් ගන්නවා
        setRecentOrders(orders.slice(0, 5));

        // වැඩිපුරම විකිණෙන සපත්තු හොයනවා
        const productSales = {};
        orders.forEach(order => {
          if (order.status !== 'Cancelled') {
            order.orderItems.forEach(item => {
              if (productSales[item.name]) {
                productSales[item.name].qty += item.qty;
                productSales[item.name].revenue += (item.qty * item.price);
              } else {
                productSales[item.name] = {
                  qty: item.qty,
                  revenue: item.qty * item.price,
                  type: 'Footwear' 
                };
              }
            });
          }
        });

        // Top 4 හොයාගන්නවා
        const topShoes = Object.keys(productSales)
          .map(name => ({
            name,
            sales: productSales[name].qty,
            revenue: productSales[name].revenue,
            type: productSales[name].type
          }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 4);

        setTopSellingShoes(topShoes);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  if (loading) return <div style={{ padding: '2rem', color:'#fff' }}>Loading Dashboard Data...</div>;

  const statIcons = [
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  ];

  return (
    <div>
      <div className="stats-grid">
        <StatCard
          title="Total Sales (Delivered)"
          value={`Rs. ${statsData.totalSales.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`}
          trend="Live Data" trendType="up" icon={statIcons[0]}
        />
        <StatCard
          title="Total Orders"
          value={statsData.totalOrders.toString()}
          trend="Live Data" trendType="up" icon={statIcons[1]}
        />
        <StatCard
          title="Active Products"
          value={statsData.activeProducts.toString()}
          trend="Live Data" trendType="up" icon={statIcons[2]}
        />
        <StatCard
          title="Total Customers"
          value={statsData.totalCustomers.toString()}
          trend="Live Data" trendType="up" icon={statIcons[3]}
        />
      </div>

      <div className="dashboard-grid">
        {/* අලුත්ම Orders */}
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
                {recentOrders.length > 0 ? recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td style={{ fontWeight: '600', color: '#888' }}>...{order._id.slice(-6)}</td>
                    <td style={{ fontWeight: 'bold' }}>{order.user?.name || 'Unknown User'}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td style={{ fontWeight: '600', color: '#ff6b00' }}>Rs. {order.totalPrice.toLocaleString('en-LK')}</td>
                    <td>
                      <span className={`badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )) : <tr><td colSpan="5" style={{textAlign:'center', padding: '2rem'}}>No orders yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* වැඩිපුරම විකිණෙන සපත්තු */}
        <div className="admin-panel">
          <div className="panel-header">
            <h3>Top Selling Footwear</h3>
          </div>
          <div className="list-group">
            {topSellingShoes.length > 0 ? topSellingShoes.map((shoe, idx) => (
              <div className="list-item" key={idx}>
                <div className="list-item-left">
                  <div className="product-img-placeholder" style={{ width: '40px', height: '40px', fontSize: '20px' }}>
                    👟
                  </div>
                  <div className="list-item-info">
                    <span className="list-item-title">{shoe.name}</span>
                    <span className="list-item-subtitle">{shoe.sales} sales • {shoe.type}</span>
                  </div>
                </div>
                <div className="list-item-right" style={{ color: '#ff6b00', fontWeight: 'bold' }}>
                  Rs. {shoe.revenue.toLocaleString('en-LK')}
                </div>
              </div>
            )) : <div style={{padding:'2rem', textAlign:'center', color:'#888'}}>No sales data available yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}