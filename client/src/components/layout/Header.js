import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, Settings } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-primary-700 shadow-large font-display">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">ModernShop</Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-primary-200 transition">Home</Link>
          <Link to="/products" className="text-white hover:text-primary-200 transition">Products</Link>
          <Link to="/cart" className="relative text-white hover:text-primary-200 transition flex items-center">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="ml-1 bg-white text-primary-700 rounded-full px-2 py-0.5 text-xs font-bold">{cartItemCount}</span>
            )}
          </Link>
          {isAuthenticated && user?.role === 'admin' && (
            <>
              <Link to="/dashboard" className="text-white hover:text-primary-200 transition">Admin Dashboard</Link>
              <Link to="/admin" className="text-primary-200 hover:text-white transition flex items-center"><Settings size={18} className="mr-1" />Admin Panel</Link>
              <div className="relative">
                <button onClick={() => setUserMenuOpen(v => !v)} className="flex items-center text-white hover:text-primary-200 transition focus:outline-none">
                  <User size={20} className="mr-1" />
                  {user?.name}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-primary-50">Logout</button>
                  </div>
                )}
              </div>
            </>
          )}
          {isAuthenticated && user?.role === 'user' && (
            <>
              <Link to="/dashboard" className="text-white hover:text-primary-200 transition">Dashboard</Link>
              <div className="relative">
                <button onClick={() => setUserMenuOpen(v => !v)} className="flex items-center text-white hover:text-primary-200 transition focus:outline-none">
                  <User size={20} className="mr-1" />
                  {user?.name}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-primary-700 hover:bg-primary-50">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-primary-700 hover:bg-primary-50">Orders</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-primary-50">Logout</button>
                  </div>
                )}
              </div>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-white hover:text-primary-200 transition">Login</Link>
              <Link to="/register" className="bg-white text-primary-700 px-4 py-1 rounded-full font-semibold hover:bg-primary-100 transition">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 