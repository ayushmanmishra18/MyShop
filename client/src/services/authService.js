import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../config';

// Create axios instance with base URL and headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions
export const register = async (userData) => {
  try {
    const response = await api.post('/api/v1/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/api/v1/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get('/api/v1/auth/me');
    return response.data;
  } catch (error) {
    // If 401 Unauthorized, clear the token and user data
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('user');
    }
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    await api.post('/api/v1/auth/logout');
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
    throw error.response?.data || error.message;
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/api/v1/auth/update-profile', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updatePassword = async (passwords) => {
  try {
    const response = await api.put('/api/v1/auth/update-password', passwords);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/api/v1/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const resetPassword = async (token, passwords) => {
  try {
    const response = await api.put(`/api/v1/auth/reset-password/${token}`, passwords);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`/api/v1/auth/verify-email/${token}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    const response = await api.post('/api/v1/auth/resend-verification-email', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
};

// Helper function to get auth header
export const getAuthHeader = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  };
};
