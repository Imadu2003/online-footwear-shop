import { useState, useEffect } from 'react';
import OrderRow from '../../components/admin/OrderRow';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Fetch real orders from database API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/orders');
      const data = await res.json();
      if (res.ok && data.success && data.data) {
        setOrders(data.data);
      } else {
        // Fallback default dummy orders if DB has no orders yet
        setOrders([
          { 
            _id: 'ORD-1082', 
            customerInfo: { name: 'Ruwan Kumara', email: 'ruwan@example.com', phone: '0771234567', address: 'Colombo' },
            orderItems: [
              { product: '1', name: 'Nike Air Max 270', quantity: 1, price: 18000.00 },
              { product: '3', name: 'Puma Suede Classic', quantity: 1, price: 12000.00 }
            ],
            totalPrice: 30000.00, 
            status: 'Processing',
            createdAt: '2026-07-10T08:30:00Z'
          },
          { 
            _id: 'ORD-1081', 
            customerInfo: { name: 'Sanduni Perera', email: 'sanduni@example.com', phone: '0719876543', address: 'Kandy' },
            orderItems: [
              { product: '2', name: 'Adidas Ultraboost', quantity: 1, price: 22000.00 }
            ],
            totalPrice: 22000.00, 
            status: 'Shipped',
            createdAt: '2026-07-09T14:15:00Z'
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update status handler for admin
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Refresh orders list
        fetchOrders();
      } else {
        // Fallback update local state if ID is local mock
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const custName = order.customerInfo?.name || order.user?.name || '';
    const orderIdStr = order._id || '';
    const matchesSearch = custName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          orderIdStr.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-panel">
      <div className="panel-header" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Customer Orders ({orders.length} orders)</h3>
        <button 
          onClick={fetchOrders} 
          style={{ background: '#ff6b00', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          🔄 Refresh Orders
        </button>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', stroke: '#94a3b8' }}
            >
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
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading orders from database...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderRow key={order._id} order={order} onStatusChange={handleStatusChange} />
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
        )}
      </div>
    </div>
  );
}