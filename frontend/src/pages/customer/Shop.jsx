 import { useState, useEffect } from 'react';
import ProductCard from '../../components/customer/ProductCard';
import FilterBar from '../../components/customer/FilterBar';



export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
      //get the shoes from the database
  const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


   const allCategories = ['All', ...new Set(products.map(item => item.category))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '5rem', fontSize: '1.2rem' }}>Loading products... ⏳</div>;
  }
  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem', color: '#333' }}>
        Our Collection
      </h1>
      <FilterBar 
        categories={allCategories} 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          No products found in this category.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>

                  {filteredProducts.map((product) => (
  <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}