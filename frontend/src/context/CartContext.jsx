import { createContext, useState, useEffect, useContext } from 'react';

// 1. Context (ගබඩාව) හදනවා
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 2. Cart එකේ තියෙන අයිටම් ටික මතක තියාගන්න State එකක් හදනවා
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 3. Cart එකට අලුත් සපත්තුවක් දාද්දි වෙන දේ
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // 4. Cart එකෙන් සපත්තුවක් අයින් කරන එක
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // 5. මුළු Cart එකම හිස් කරන Function එක
  const clearCart = () => {
    setCartItems([]);
  };

  // 6. LocalStorage එකට සේව් කරනවා
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook එක
export const useCart = () => {
  return useContext(CartContext);
};