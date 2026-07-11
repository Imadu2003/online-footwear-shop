import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// දැනට අපි Dummy Product එකක් ගමු (පස්සේ මේවා Database එකෙන් එන්නේ)
const productData = {
  id: 'p1',
  name: 'Nike Air Force 1 Ambush',
  sku: 'af1-ambush-white',
  price: 16000.00,
  description: [
    'Crisp all-white design with bold Ambush detailing',
    'Oversized Swoosh for a standout look',
    'Premium materials with durable build',
    'Cushioned interior for all-day comfort'
  ],
  images: [
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
  ],
  sizes: [39, 40, 41, 42, 43, 44],
  inStock: true
};

export default function ProductDetails() {
  const { id } = useParams(); // URL එකෙන් ID එක ගන්නවා (දැනට පාවිච්චි වෙන්නේ නෑ)
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ගබඩාවෙන් සපත්තු දාන Function එක ගන්නවා

  // Component State (තෝරපු සයිස් එක, පින්තූරය, සහ ගාණ)
  const [selectedSize, setSelectedSize] = useState(productData.sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(productData.images[0]);

  // Cart එකට දාන Function එක
  const handleAddToCart = () => {
    // ගබඩාවට යවන දත්ත ටික
    const itemToAdd = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: mainImage,
      size: selectedSize,
      quantity: quantity
    };
    
    // ගබඩාවට (Context) දානවා
    addToCart(itemToAdd);
    
  
    alert("Item Added! 🛒");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout'); // කෙලින්ම සල්ලි ගෙවන තැනට යවනවා
  };

  return (
    <div style={containerStyle}>
      {/* Breadcrumb පාර */}
      <div style={breadcrumbStyle}>
        Home / Nike / <b>{productData.name}</b>
      </div>

      <div style={contentLayout}>
        {/* වම් පැත්ත: පින්තූර */}
        <div style={leftColumnStyle}>
          {/* පොඩි පින්තූර (Thumbnails) */}
          <div style={thumbnailListStyle}>
            {productData.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt="thumbnail" 
                style={img === mainImage ? activeThumbStyle : thumbStyle}
                onMouseEnter={() => setMainImage(img)} // මවුස් එක ගෙනිච්චම ලොකු පින්තූරේ මාරු වෙනවා
              />
            ))}
          </div>
          
          {/* ලොකු පින්තූරය */}
          <div style={mainImageContainer}>
            <img src={mainImage} alt="Main Product" style={mainImageStyle} />
            {!productData.inStock && <div style={badgeStyle}>SOLD OUT</div>}
          </div>
        </div>

        {/* දකුණු පැත්ත: විස්තර */}
        <div style={rightColumnStyle}>
          <h1 style={titleStyle}>{productData.name}</h1>
          <p style={skuStyle}>SKU: {productData.sku}</p>

          <ul style={listStyle}>
            {productData.description.map((line, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{line}</li>
            ))}
          </ul>

          <div style={priceStyle}>
            Rs {productData.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
          </div>
          <div style={installmentStyle}>
            3 X Rs. {(productData.price / 3).toFixed(2)} with <b>Koko</b>
          </div>

          {/* සයිස් තෝරන කොටස */}
          <div style={sizeSectionStyle}>
            <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>Sizes:</span>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(Number(e.target.value))}
              style={selectStyle}
            >
              {productData.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div style={actionRowStyle}>
            {/* Quantity */}
            <div style={qtyBoxStyle}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={qtyBtn}>-</button>
              <span style={{ padding: '0 1rem' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={qtyBtn}>+</button>
            </div>

            <button onClick={handleAddToCart} style={addBtnStyle}>Add to cart</button>
            <button onClick={handleBuyNow} style={buyBtnStyle}>Buy now</button>
          </div>

          {/* WhatsApp Button */}
          <button style={whatsappBtnStyle}>
            💬 Check Availability Before Buying
          </button>

        </div>
      </div>
    </div>
  );
}

// ----- CSS Styles (ඔයා දුන්න පින්තූරේ විදිහටම) -----
const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' };
const breadcrumbStyle = { color: '#666', marginBottom: '2rem', fontSize: '0.9rem' };

const contentLayout = { display: 'flex', gap: '4rem', flexWrap: 'wrap' };

// Left Side
const leftColumnStyle = { flex: '1 1 500px', display: 'flex', gap: '1rem' };
const thumbnailListStyle = { display: 'flex', flexDirection: 'column', gap: '1rem' };
const thumbStyle = { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', border: '2px solid transparent' };
const activeThumbStyle = { ...thumbStyle, border: '2px solid #ff6b00' };
const mainImageContainer = { flex: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '500px' };
const mainImageStyle = { width: '100%', height: '100%', objectFit: 'cover' };
const badgeStyle = { position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'white', padding: '0.5rem 1rem', fontWeight: 'bold', borderRadius: '4px', fontSize: '0.8rem' };

// Right Side
const rightColumnStyle = { flex: '1 1 400px', display: 'flex', flexDirection: 'column' };
const titleStyle = { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111' };
const skuStyle = { color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase' };
const listStyle = { color: '#555', marginBottom: '2rem', paddingLeft: '1.2rem', lineHeight: '1.6' };
const priceStyle = { fontSize: '2.5rem', color: '#ff6b00', fontWeight: 'bold', marginBottom: '0.5rem' };
const installmentStyle = { color: '#666', fontSize: '0.9rem', marginBottom: '2rem' };

const sizeSectionStyle = { display: 'flex', alignItems: 'center', marginBottom: '2rem' };
const selectStyle = { padding: '0.5rem 2rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1rem', width: '200px' };

const actionRowStyle = { display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' };
const qtyBoxStyle = { display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' };
const qtyBtn = { padding: '0.8rem 1rem', border: 'none', backgroundColor: '#f9f9f9', cursor: 'pointer', fontSize: '1.2rem' };

const addBtnStyle = { flex: 1, backgroundColor: '#ff6b00', color: 'white', border: 'none', padding: '1rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', minWidth: '150px' };
const buyBtnStyle = { flex: 1, backgroundColor: '#222', color: 'white', border: 'none', padding: '1rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', minWidth: '150px' };

const whatsappBtnStyle = { width: '100%', backgroundColor: '#25D366', color: 'white', border: 'none', padding: '1rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: '1rem' };