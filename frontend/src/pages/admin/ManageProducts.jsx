import { useState } from 'react';
import ProductRow from '../../components/admin/ProductRow';
import AddProductModal from '../../components/admin/AddProductModal';

export default function ManageProducts() {
  // Initial dummy products list matching the Product Model fields
  const [products, setProducts] = useState([
    { _id: '1', name: 'Nike Air Max 270', category: 'Sport', price: 18000.00, stock: 24, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150', description: 'Premium quality footwear from Shoe Store.' },
    { _id: '2', name: 'Adidas Ultraboost', category: 'Running', price: 22000.00, stock: 15, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=150', description: 'Premium quality footwear from Shoe Store.' },
    { _id: '3', name: 'Puma Suede Classic', category: 'Casual', price: 12000.00, stock: 8, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150', description: 'Premium quality footwear from Shoe Store.' },
    { _id: '4', name: 'Clarks Derby Leather', category: 'Formal', price: 16500.00, stock: 12, image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=150', description: 'Premium quality footwear from Shoe Store.' },
    { _id: '5', name: 'Vans Old Skool', category: 'Casual', price: 9000.00, stock: 0, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=150', description: 'Premium quality footwear from Shoe Store.' },
  ]);

  // Form & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Sport',
    price: '',
    stock: '',
    image: '',
    description: ''
  });

  // Handle inputs inside Add Product Modal Form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler to save new product
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.image) return;

    const addedItem = {
      _id: Date.now().toString(), // Mocking MongoDB _id
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      image: newProduct.image,
      description: newProduct.description || "Premium quality footwear from Shoe Store."
    };

    setProducts((prev) => [addedItem, ...prev]);

    // Reset Form
    setNewProduct({
      name: '',
      category: 'Sport',
      price: '',
      stock: '',
      image: '',
      description: ''
    });
    setShowAddModal(false);
  };

  // Handle Product Deletion
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  // Filtered Products List
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="admin-panel">
      <div className="panel-header">
        <h3>Shoes Inventory</h3>
      </div>

      {/* Search, Filter & Add Controls */}
      <div className="page-controls">
        <div className="filter-group">
          {/* Custom Search Box */}
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
              placeholder="Search shoe name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '38px' }}
            />
          </div>

          {/* Filter dropdown */}
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Sport">Sport</option>
            <option value="Casual">Casual</option>
            <option value="Running">Running</option>
            <option value="Formal">Formal</option>
          </select>
        </div>

        {/* Add Product Button */}
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: '16px', height: '16px' }}
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New Shoe
        </button>
      </div>

      {/* Inventory Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductRow 
                  key={product._id} 
                  product={product} 
                  onDelete={handleDeleteProduct} 
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                  No shoe products found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal Overlay Component */}
      <AddProductModal 
        showModal={showAddModal} 
        setShowModal={setShowAddModal} 
        newProduct={newProduct} 
        handleFormChange={handleFormChange} 
        handleAddProductSubmit={handleAddProductSubmit} 
      />
    </div>
  );
}