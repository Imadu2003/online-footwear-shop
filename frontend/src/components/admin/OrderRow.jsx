import React from 'react';

export default function OrderRow({ order, onStatusChange }) {
  // Helper to format date
  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

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

  const customerName = order.customerInfo?.name || order.user?.name || 'Guest Customer';
  const orderIdDisplay = order._id ? (order._id.length >= 24 ? `ORD-${order._id.slice(-6).toUpperCase()}` : order._id) : 'ORD-NEW';
  const itemCount = order.orderItems ? order.orderItems.reduce((acc, item) => acc + (item.qty || item.quantity || 1), 0) : 0;
  const total = order.totalPrice !== undefined ? order.totalPrice : (order.totalAmount || 0);

  return (
    <tr>
      <td style={{ fontWeight: '600', color: '#ff6b00' }}>{orderIdDisplay}</td>
      <td style={{ fontWeight: '500' }}>{customerName}</td>
      <td>{formatDate(order.createdAt)}</td>
      <td>{itemCount} Items</td>
      <td style={{ fontWeight: '700' }}>Rs. {typeof total === 'number' ? total.toLocaleString('en-LK') : total}</td>
      <td>
        <select 
          value={order.status || 'Processing'} 
          onChange={(e) => onStatusChange && onStatusChange(order._id, e.target.value)}
          className={`badge ${getStatusClass(order.status)}`}
          style={{ cursor: 'pointer', border: '1px solid rgba(0,0,0,0.1)', padding: '6px 12px', borderRadius: '20px', fontWeight: '600', outline: 'none' }}
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </td>
      <td style={{ textAlign: 'right' }}>
        <button 
          className="btn-icon-action" 
          style={{ color: '#0f172a', fontWeight: '600', cursor: 'pointer', background: '#f1f5f9', border: 'none', padding: '6px 14px', borderRadius: '6px' }} 
          onClick={() => alert(`Order Details:\nID: ${order._id}\nCustomer: ${customerName}\nTotal: Rs. ${total}\nStatus: ${order.status}`)}
        >
          View
        </button>
      </td>
    </tr>
  );
}