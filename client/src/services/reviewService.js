import axios from 'axios';
import { getAuthHeader } from './authService';

const API_URL = '/api/v1/reviews';

// Get all reviews (public)
export const getReviews = async (productId = null) => {
  try {
    const url = productId 
      ? `${API_URL}?product=${productId}`
      : API_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch reviews';
  }
};

// Get a single review by ID (public)
export const getReview = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch review';
  }
};

// Get logged-in user's reviews
export const getMyReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch your reviews';
  }
};

// Add a new review for a product
export const addReview = async (productId, reviewData) => {
  try {
    const response = await axios.post(`${API_URL}/${productId}`, reviewData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to add review';
  }
};

// Update an existing review
export const updateReview = async (id, reviewData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, reviewData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update review';
  }
};

// Delete a review
export const deleteReview = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete review';
  }
};

// Upload review images
export const uploadReviewImages = async (images) => {
  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    const response = await axios.post(`${API_URL}/upload-images`, formData, {
      ...getAuthHeader(),
      headers: {
        ...getAuthHeader().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to upload review images';
  }
};
