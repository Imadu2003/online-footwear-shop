import { useState, useEffect } from 'react';
import OrderRow from '../../components/admin/OrderRow';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders (නමින් හරි ID එකෙන් හරි හොයන්න)
  const filteredOrders = orders.filter((order) => {
    const customerName = order.user?.name || '';
    const matchesSearch = customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order._id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div style={{ padding: '2rem' }}>Loading orders...</div>;

  return (
    <div className="admin-panel">
      <div className="panel-header" style={{ marginBottom: '10px' }}>
        <h3>Customer Orders ({orders.length} orders)</h3>
      </div>

      {/* Controls: Filter Tabs and Search */}
      <div className="page-controls" style={{ marginBottom: '24px', justifyContent: 'flex-start' }}>
        <div className="filter-tabs">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              className={`filter-tab ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
        
        <div className="filter-group" style={{ marginLeft: 'auto' }}>
          {/* Search Box */}
          <div className="header-search" style={{ position: 'relative', width: '260px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', stroke: '#94a3b8' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search by ID or Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '38px' }}
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderRow key={order._id} order={order} fetchOrders={fetchOrders} />
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}