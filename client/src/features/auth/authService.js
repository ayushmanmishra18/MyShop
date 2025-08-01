import axios from 'axios';
import { API_URL } from '../../config/config';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/api/v1/auth/register`, userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/api/v1/auth/login`, userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get user profile
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/api/v1/auth/me`, config);
  return response.data;
};

// Verify email
const verifyEmail = async (verificationData) => {
  const response = await axios.post(
    `${API_URL}/api/v1/auth/verify-email`, 
    verificationData
  );
  
  if (response.data) {
    // Update user in localStorage if needed
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      user.isVerified = true;
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
  
  return response.data;
};

// Resend verification email
const resendVerificationEmail = async (emailData) => {
  const response = await axios.post(
    `${API_URL}/api/v1/auth/resend-verification`,
    emailData
  );
  
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getMe,
  verifyEmail,
  resendVerificationEmail,
};

export default authService;
