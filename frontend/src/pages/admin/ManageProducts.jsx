import React, { useState, useEffect } from 'react';
import ProductRow from '../../components/admin/ProductRow';
import AddProductModal from '../../components/admin/AddProductModal';



export default function ManageProducts() {
  //the product will be initiated as an empty array and will be populated with the data fetched from the backend
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Sport', price: '', stock: '', image: '', description: ''
  });

  //when page is loading, fetch the products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data); //all the products fetched from the backend will be stored in the products state

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  //if new shoes comes from the form, it will be added to the products state and will be displayed in the table
  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.image) return;


    // Send the new product data to the backend
    const productData = {
      name: newProduct.name,
       category: newProduct.category,
      price: String(newProduct.price),
      image: newProduct.image,
      description: newProduct.description || "Premium quality footwear from Shoe Store."
    };

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData) // Send the product data as JSON
      });

      if (response.ok) {
        const savedProduct = await response.json();
        setProducts((prev) => [savedProduct, ...prev]); // Add the new product to the top of the list


        // Reset the form and close the modal

        setNewProduct({ name: '', category: 'Sport', price: '', stock: '', image: '', description: '' });
        setShowAddModal(false);
        alert("Product added successfully!");
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Server Error");
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  }
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
                        <option value="Men">Men</option>
            <option value="Ladies">Ladies</option>
            <option value="Kids">Kids</option>

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
