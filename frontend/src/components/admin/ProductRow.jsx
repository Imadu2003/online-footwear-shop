export default function ProductRow({ product, onDelete }) {
  return (
    <tr>
      <td>
        <div className="product-cell">
          <div className="product-img-placeholder" style={{ overflow: 'hidden', padding: 0 }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span className="product-name">{product.name}</span>
        </div>
      </td>
      <td>{product.category}</td>
      <td style={{ fontWeight: '600' }}>Rs. {product.price.toFixed(2)}</td>
      <td>
        {product.stock === 0 ? (
          <span className="badge badge-danger">Out of Stock</span>
        ) : product.stock < 10 ? (
          <span className="badge badge-warning">{product.stock} Left (Low)</span>
        ) : (
          <span className="badge badge-success">{product.stock} In Stock</span>
        )}
      </td>
      <td style={{ textAlign: 'right' }}>
        <button
          className="btn-icon-action"
          style={{ color: '#ef4444', fontWeight: '500' }}
          onClick={() => onDelete(product._id)}
          title="Delete Product"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
