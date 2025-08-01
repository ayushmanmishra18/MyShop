import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Theme
import theme from './theme';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from './components/Loader';
import Navbar from './components/layout/Navbar';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ResendVerification from './pages/ResendVerification';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Payment from './pages/Payment';
import Review from './pages/Review';
import UserDashboard from './pages/UserDashboard';
import VerifyOtp from './pages/VerifyOtp';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';

// Protected Routes
import ProtectedRoute from './components/routes/ProtectedRoute';
import AdminRoute from './components/routes/AdminRoute';

// PersistGate wrapper
const PersistGateWrapper = ({ children }) => (
  <PersistGate loading={<Loader fullScreen />} persistor={persistor}>
    {children}
  </PersistGate>
);

// Main App wrapper component
function AppWrapper() {
  return (
    <Provider store={store}>
      <PersistGateWrapper>
        <App />
      </PersistGateWrapper>
    </Provider>
  );
}

// Main App component
function App() {
  const { isAuthenticated, isAdmin, loading, user } = useSelector(state => state.auth);

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <ToastContainer position="bottom-right" autoClose={3000} />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route 
                path="/login" 
                element={
                  user ? <Navigate to="/" replace /> : <Login />
                } 
              />
              <Route 
                path="/register" 
                element={
                  user ? <Navigate to="/" replace /> : <Register />
                } 
              />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              
              {/* Email Verification */}
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/resend-verification" element={<ResendVerification />} />
              
              {/* Protected User Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/review/:productId" element={<Review />} />
                <Route path="/dashboard" element={<UserDashboard />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default AppWrapper;