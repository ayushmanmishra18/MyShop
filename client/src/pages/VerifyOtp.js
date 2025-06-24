import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, clearError } from '../store/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, otpVerified } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    email: location.state?.email || '',
    otp: ''
  });

  useEffect(() => {
    if (otpVerified) {
      navigate('/'); // or '/dashboard' if you want
    }
  }, [otpVerified, navigate]);

  useEffect(() => {
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(verifyOtp(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800">
      <div className="bg-dark-800 bg-opacity-90 p-8 rounded-4xl shadow-large w-full max-w-md">
        <h2 className="text-3xl font-bold font-display text-primary-400 mb-6 text-center">Verify OTP</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
          <input name="otp" type="text" placeholder="Enter OTP" value={form.otp} onChange={handleChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
          <button type="submit" className="w-full py-2 rounded-4xl bg-primary-500 hover:bg-primary-600 text-dark-50 font-semibold transition shadow-soft" disabled={loading}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyOtp; 