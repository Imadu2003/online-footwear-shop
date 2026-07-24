import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams(); // get the id by url
  const navigate = useNavigate();
  const { addToCart } = useCart(); 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState(40);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  // actual shoe get by the dtabase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
          setMainImage(data.image); 
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if(!product) return;
    const itemToAdd = {
      id: product._id, // actual database id
      name: product.name,
      price: product.price,
      image: mainImage,
      size: selectedSize,
      quantity: quantity
    };
    addToCart(itemToAdd);
    alert("Item Added! 🛒");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout'); 
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'5rem', color:'#ff6b00', fontSize:'1.5rem'}}>Loading Product...</div>;
  if (!product) return <div style={{textAlign:'center', marginTop:'5rem', color:'red', fontSize:'1.5rem'}}>Product Not Found!</div>;

  return (
    <div style={containerStyle}>
      <div style={breadcrumbStyle}>
        Home / {product.category} / <b>{product.name}</b>
      </div>

      <div style={contentLayout}>
        <div style={leftColumnStyle}>
          <div style={thumbnailListStyle}>
            <img 
              src={product.image} 
              alt="thumbnail" 
              style={activeThumbStyle}
            />
          </div>
          
          <div style={mainImageContainer}>
            <img src={mainImage} alt="Main Product" style={mainImageStyle} />
          </div>
        </div>

        <div style={rightColumnStyle}>
          <h1 style={titleStyle}>{product.name}</h1>
          <p style={skuStyle}>CATEGORY: {product.category}</p>

          <p style={{ color: '#555', marginBottom: '2rem', lineHeight: '1.6' }}>
            {product.description}
          </p>

          <div style={priceStyle}>
            Rs {product.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
          </div>
          <div style={installmentStyle}>
            3 X Rs. {(product.price / 3).toFixed(2)} with <b>Koko</b>
          </div>

          <div style={sizeSectionStyle}>
            <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>Sizes:</span>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(Number(e.target.value))}
              style={selectStyle}
            >
              {[39, 40, 41, 42, 43, 44].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div style={actionRowStyle}>
            <div style={qtyBoxStyle}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={qtyBtn}>-</button>
              <span style={{ padding: '0 1rem' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={qtyBtn}>+</button>
            </div>

            <button onClick={handleAddToCart} style={addBtnStyle}>Add to cart</button>
            <button onClick={handleBuyNow} style={buyBtnStyle}>Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----- CSS Styles -----
const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' };
const breadcrumbStyle = { color: '#666', marginBottom: '2rem', fontSize: '0.9rem' };
const contentLayout = { display: 'flex', gap: '4rem', flexWrap: 'wrap' };
const leftColumnStyle = { flex: '1 1 500px', display: 'flex', gap: '1rem' };
const thumbnailListStyle = { display: 'flex', flexDirection: 'column', gap: '1rem' };
const thumbStyle = { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', border: '2px solid transparent' };
const activeThumbStyle = { ...thumbStyle, border: '2px solid #ff6b00' };
const mainImageContainer = { flex: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '500px', backgroundColor: '#f9f9f9', display:'flex', alignItems:'center', justifyContent:'center' };
const mainImageStyle = { width: '100%', height: '100%', objectFit: 'contain' };
const rightColumnStyle = { flex: '1 1 400px', display: 'flex', flexDirection: 'column' };
const titleStyle = { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111' };
const skuStyle = { color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase' };
const priceStyle = { fontSize: '2.5rem', color: '#ff6b00', fontWeight: 'bold', marginBottom: '0.5rem' };
const installmentStyle = { color: '#666', fontSize: '0.9rem', marginBottom: '2rem' };
const sizeSectionStyle = { display: 'flex', alignItems: 'center', marginBottom: '2rem' };
const selectStyle = { padding: '0.5rem 2rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1rem', width: '200px' };
const actionRowStyle = { display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' };
const qtyBoxStyle = { display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' };
const qtyBtn = { padding: '0.8rem 1rem', border: 'none', backgroundColor: '#f9f9f9', cursor: 'pointer', fontSize: '1.2rem' };
const addBtnStyle = { flex: 1, backgroundColor: '#ff6b00', color: 'white', border: 'none', padding: '1rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', minWidth: '150px' };
const buyBtnStyle = { flex: 1, backgroundColor: '#222', color: 'white', border: 'none', padding: '1rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', minWidth: '150px' };