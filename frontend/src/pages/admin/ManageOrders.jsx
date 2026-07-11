import { useState } from 'react';
import OrderRow from '../../components/admin/OrderRow';

export default function ManageOrders() {
  // Dummy orders data matching the Order Model fields
  const [orders, setOrders] = useState([
    { 
      _id: 'ORD-1082', 
      customerInfo: { name: 'Ruwan Kumara', email: 'ruwan@example.com', phone: '0771234567', address: 'Colombo' },
      orderItems: [
        { product: '1', name: 'Nike Air Max 270', quantity: 1, price: 18000.00 },
        { product: '3', name: 'Puma Suede Classic', quantity: 1, price: 12000.00 }
      ],
      totalAmount: 30000.00, 
      status: 'Pending',
      createdAt: '2026-07-10T08:30:00Z'
    },
    { 
      _id: 'ORD-1081', 
      customerInfo: { name: 'Sanduni Perera', email: 'sanduni@example.com', phone: '0719876543', address: 'Kandy' },
      orderItems: [
        { product: '2', name: 'Adidas Ultraboost', quantity: 1, price: 22000.00 }
      ],
      totalAmount: 22000.00, 
      status: 'Shipped',
      createdAt: '2026-07-09T14:15:00Z'
    },
    { 
      _id: 'ORD-1080', 
      customerInfo: { name: 'Nimal Silva', email: 'nimal@example.com', phone: '0754567890', address: 'Galle' },
      orderItems: [
        { product: '4', name: 'Clarks Derby Leather', quantity: 2, price: 16500.00 }
      ],
      totalAmount: 33000.00, 
      status: 'Delivered',
      createdAt: '2026-07-08T11:20:00Z'
    },
    { 
      _id: 'ORD-1079', 
      customerInfo: { name: 'Dilini Jayawardena', email: 'dilini@example.com', phone: '0723344556', address: 'Kurunegala' },
      orderItems: [
        { product: '5', name: 'Vans Old Skool', quantity: 1, price: 9000.00 }
      ],
      totalAmount: 9000.00, 
      status: 'Delivered',
      createdAt: '2026-07-07T09:45:00Z'
    },
    { 
      _id: 'ORD-1078', 
      customerInfo: { name: 'Kasun Fernando', email: 'kasun@example.com', phone: '0781122334', address: 'Negombo' },
      orderItems: [
        { product: '1', name: 'Nike Air Max 270', quantity: 1, price: 18000.00 }
      ],
      totalAmount: 18000.00, 
      status: 'Cancelled',
      createdAt: '2026-07-06T16:10:00Z'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order._id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-panel">
      <div className="panel-header" style={{ marginBottom: '10px' }}>
        <h3>Customer Orders ({orders.length} orders)</h3>
      </div>

      {/* Controls: Filter Tabs and Search */}
      <div className="page-controls" style={{ marginBottom: '24px', justifyContent: 'flex-start' }}>
        <div className="filter-tabs">
          {['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
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
                <OrderRow key={order._id} order={order} />
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