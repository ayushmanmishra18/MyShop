import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getReviews as fetchReviews,
  getReview as fetchReview,
  getMyReviews as fetchUserReviews,
  addReview as addReviewApi,
  updateReview as updateReviewApi,
  deleteReview as deleteReviewApi,
  uploadReviewImages as uploadReviewImagesApi,
} from '../../services/reviewService';
import { toast } from 'react-toastify';

// Fetch all reviews (optionally filtered by productId)
export const fetchProductReviews = createAsyncThunk(
  'reviews/fetchByProduct',
  async (productId = null, { rejectWithValue }) => {
    try {
      const response = await fetchReviews(productId);
      return { data: response.data, productId };
    } catch (error) {
      toast.error(error.message || 'Failed to fetch reviews');
      return rejectWithValue(error.message);
    }
  }
);

// Fetch a single review by ID
export const fetchReviewById = createAsyncThunk(
  'reviews/fetchById',
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await fetchReview(reviewId);
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to fetch review');
      return rejectWithValue(error.message);
    }
  }
);

// Fetch logged-in user's reviews
export const fetchMyReviews = createAsyncThunk(
  'reviews/fetchMyReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserReviews();
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to fetch your reviews');
      return rejectWithValue(error.message);
    }
  }
);

// Add a new review
// Add a new review
export const createReview = createAsyncThunk(
  'reviews/create',
  async ({ productId, reviewData, images = [] }, { rejectWithValue }) => {
    try {
      // If there are images to upload, do that first
      let uploadedImages = [];
      if (images && images.length > 0) {
        const uploadResponse = await uploadReviewImagesApi(images);
        uploadedImages = uploadResponse;
      }

      // Add image URLs to review data
      const reviewWithImages = {
        ...reviewData,
        images: uploadedImages,
      };

      const response = await addReviewApi(productId, reviewWithImages);
      toast.success('Review submitted successfully');
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to submit review');
      return rejectWithValue(error.message);
    }
  }
);

// Update an existing review
export const updateExistingReview = createAsyncThunk(
  'reviews/update',
  async ({ reviewId, reviewData, newImages = [] }, { rejectWithValue }) => {
    try {
      // If there are new images to upload
      let uploadedImages = [];
      if (newImages && newImages.length > 0) {
        const uploadResponse = await uploadReviewImagesApi(newImages);
        uploadedImages = uploadResponse;
      }

      // Combine existing images with new ones
      const allImages = [
        ...(reviewData.images || []).filter(img => !img.startsWith('blob:')),
        ...uploadedImages
      ];

      const updatedReview = {
        ...reviewData,
        images: allImages,
      };

      const response = await updateReviewApi(reviewId, updatedReview);
      toast.success('Review updated successfully');
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to update review');
      return rejectWithValue(error.message);
    }
  }
);

// Delete a review
export const removeReview = createAsyncThunk(
  'reviews/delete',
  async (reviewId, { rejectWithValue }) => {
    try {
      await deleteReviewApi(reviewId);
      toast.success('Review deleted successfully');
      return reviewId;
    } catch (error) {
      toast.error(error.message || 'Failed to delete review');
      return rejectWithValue(error.message);
    }
  }
);

// Upload review images
export const uploadImages = createAsyncThunk(
  'reviews/uploadImages',
  async (images, { rejectWithValue }) => {
    try {
      const response = await uploadReviewImagesApi(images);
      return response;
    } catch (error) {
      toast.error(error.message || 'Failed to upload images');
      return rejectWithValue(error.message);
    }
  }
);
