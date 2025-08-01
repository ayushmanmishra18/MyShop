import axios from 'axios';
import { getAuthHeader } from './authService';

const API_URL = '/api/v1/addresses';

// Get all addresses for the logged-in user
export const getAddresses = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch addresses';
  }
};

// Get a single address by ID
export const getAddress = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch address';
  }
};

// Create a new address
export const createAddress = async (addressData) => {
  try {
    const response = await axios.post(API_URL, addressData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create address';
  }
};

// Update an existing address
export const updateAddress = async (id, addressData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, addressData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update address';
  }
};

// Delete an address
export const deleteAddress = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete address';
  }
};

// Set an address as default
export const setDefaultAddress = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/set-default`, {}, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to set default address';
  }
};
