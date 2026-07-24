export default function OrderRow({ order, fetchOrders }) {
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
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

  // Status එක වෙනස් කරාම Database එකේ සේව් වෙනවා
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${order._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchOrders(); // ආයෙත් අලුත් වෙලා පේන්න Refresh කරනවා
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td style={{ fontWeight: '600', fontSize: '0.85rem', color:'#666' }}>...{order._id.slice(-6)}</td>
      <td style={{ fontWeight: 'bold' }}>{order.user?.name || 'Unknown User'}</td>
      <td>{formatDate(order.createdAt)}</td>
      <td>{order.orderItems.reduce((acc, item) => acc + item.qty, 0)} Items</td>
      <td style={{ fontWeight: '600', color: '#ff6b00' }}>Rs. {order.totalPrice.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
      <td>
        <span className={`badge ${getStatusClass(order.status)}`}>
          {order.status}
        </span>
      </td>
      <td style={{ textAlign: 'right' }}>
        <select 
          value={order.status} 
          onChange={handleStatusChange}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer', outline: 'none', fontWeight: 'bold' }}
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </td>
    </tr>
  );
}