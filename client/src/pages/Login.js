import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800">
      <div className="bg-dark-800 bg-opacity-90 p-8 rounded-4xl shadow-large w-full max-w-md">
        <h2 className="text-3xl font-bold font-display text-primary-400 mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
          <button type="submit" className="w-full py-2 rounded-4xl bg-primary-500 hover:bg-primary-600 text-dark-50 font-semibold transition shadow-soft" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <p className="mt-4 text-center text-dark-300">Don't have an account? <a href="/register" className="text-primary-400 hover:underline">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;