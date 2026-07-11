export default function AddProductModal({ 
  showModal, 
  setShowModal, 
  newProduct, 
  handleFormChange, 
  handleAddProductSubmit 
}) {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Footwear Product</h3>
          <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
        </div>
        <form onSubmit={handleAddProductSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Shoe Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Nike Jordan 1 Retro"
                value={newProduct.name}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleFormChange}
              >
                <option value="Sport">Sport</option>
                <option value="Casual">Casual</option>
                <option value="Running">Running</option>
                <option value="Formal">Formal</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price (LKR) *</label>
              <input
                type="number"
                step="0.01"
                min="1"
                name="price"
                required
                placeholder="e.g. 15000"
                value={newProduct.price}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label>Stock Quantity *</label>
              <input
                type="number"
                min="0"
                name="stock"
                required
                placeholder="e.g. 20"
                value={newProduct.stock}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label>Image URL *</label>
              <input
                type="text"
                name="image"
                required
                placeholder="e.g. https://example.com/shoe.jpg"
                value={newProduct.image}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Premium quality footwear..."
                value={newProduct.description}
                onChange={handleFormChange}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                rows="3"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
