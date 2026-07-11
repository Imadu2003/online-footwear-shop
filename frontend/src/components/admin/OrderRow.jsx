export default function OrderRow({ order }) {
  // Helper to format date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  // Helper to get badge class based on status
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

  return (
    <tr>
      <td style={{ fontWeight: '600' }}>{order._id}</td>
      <td>{order.customerInfo.name}</td>
      <td>{formatDate(order.createdAt)}</td>
      <td>{order.orderItems.reduce((acc, item) => acc + item.quantity, 0)} Items</td>
      <td style={{ fontWeight: '600' }}>Rs. {order.totalAmount.toFixed(2)}</td>
      <td>
        <span className={`badge ${getStatusClass(order.status)}`}>
          {order.status}
        </span>
      </td>
      <td style={{ textAlign: 'right' }}>
        <button className="btn-icon-action" style={{ color: '#0f172a', fontWeight: '500' }} title="View Details">
          View
        </button>
      </td>
    </tr>
  );
}
