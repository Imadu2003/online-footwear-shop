import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. අලුතින් ගෙනාපු දේවල් ටික Import කරගන්නවා
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/admin/Login';
import CustomerLogin from './pages/customer/CustomerLogin';
import { CartProvider } from './context/CartContext';
import Register from './pages/customer/Register';
import ManageContacts from './pages/admin/ManageContacts';
import ManageUsers from './pages/admin/ManageUsers';
import ScrollToTop from './components/common/ScrollToTop';

// Layouts 
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Customer Pages
import Home from './pages/customer/Home';
import Shop from './pages/customer/Shop';
import ProductDetails from './pages/customer/ProductDetails';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import About from './pages/customer/About';
import Contact from './pages/customer/Contact';
import Review from './pages/customer/Review';

// Footer Link Pages
import TermsAndConditions from './pages/customer/TermsAndConditions';
import PrivacyPolicy from './pages/customer/PrivacyPolicy';
import MyOrders from './pages/customer/MyOrders';
import MyAddresses from './pages/customer/MyAddresses';
import AccountDetails from './pages/customer/AccountDetails';
import Wishlist from './pages/customer/Wishlist';
import LostPassword from './pages/customer/LostPassword';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Customer Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reviews" element={<Review />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/customer-login" element={<CustomerLogin />} />
              <Route path="/register" element={<Register />} />

              {/* Footer - Useful Links */}
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />

              {/* Footer - Customer Care (login-gated in components) */}
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/addresses" element={<MyAddresses />} />
              <Route path="/account" element={<AccountDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/lost-password" element={<LostPassword />} />
            </Route>

            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ManageProducts />} />
                <Route path="orders" element={<ManageOrders />} />
                <Route path="contacts" element={<ManageContacts />} />
                <Route path="users" element={<ManageUsers />} />
              </Route>
            </Route>

          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;