import { useState } from 'react';
import ProductCard from '../../components/customer/ProductCard';
import FilterBar from '../../components/customer/FilterBar';

// Dummy data
const dummyProducts = [
  { id: 1, name: "Nike Air Max 270", price: 25000, category: "Men", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Adidas Ultraboost", price: 28500, category: "Women", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Puma RS-X", price: 22000, category: "Men", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Nike Air Force 1", price: 30000, category: "Kids", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop" }
];

const allCategories = ['All', ...new Set(dummyProducts.map(item => item.category))];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // වැරැද්ද 1 හැදුවා:
  const filteredProducts = selectedCategory === 'All' 
    ? dummyProducts 
    : dummyProducts.filter(product => product.category === selectedCategory);

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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {/* වැරැද්ද 2 හැදුවා: (dummyProducts වෙනුවට filteredProducts දැම්මා) */}
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}