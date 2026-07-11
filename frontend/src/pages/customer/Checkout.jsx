import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';


export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
