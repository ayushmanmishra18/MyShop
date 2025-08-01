import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchProductReviews,
  fetchReviewById,
  fetchMyReviews,
  createReview,
  updateExistingReview,
  removeReview,
  uploadImages as uploadReviewImages,
} from '../thunks/reviewThunks';

const initialState = {
  // All reviews for the current product
  productReviews: [],
  // Current review being viewed/edited
  currentReview: null,
  // Current user's reviews
  myReviews: [],
  loading: false,
  error: null,
  success: false,
  operation: null, // 'add', 'edit', 'delete', 'fetch', 'upload_images'
  // For image uploads
  uploadLoading: false,
  uploadError: null,
  uploadedImages: [],
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },
    resetReviewState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.operation = null;
      state.uploadLoading = false;
      state.uploadError = null;
    },
    setCurrentReview: (state, action) => {
      state.currentReview = action.payload;
    },
    clearUploadedImages: (state) => {
      state.uploadedImages = [];
    },
  },
  extraReducers: (builder) => {
    // Common pending state for all review operations
    builder
      // Fetch reviews for a product
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operation = 'fetch';
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.productReviews = action.payload.data;
        state.operation = null;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      })

      // Fetch single review by ID
      .addCase(fetchReviewById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentReview = null;
        state.operation = 'fetch';
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReview = action.payload;
        state.operation = null;
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      })

      // Fetch current user's reviews
      .addCase(fetchMyReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operation = 'fetch';
      })
      .addCase(fetchMyReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.myReviews = action.payload;
        state.operation = null;
      })
      .addCase(fetchMyReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      })

      // Create a new review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.operation = 'add';
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.productReviews.push(action.payload);
        state.myReviews.push(action.payload);
        state.operation = null;
        state.uploadedImages = []; // Clear uploaded images after successful submission
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      })

      // Update an existing review
      .addCase(updateExistingReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.operation = 'edit';
      })
      .addCase(updateExistingReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        // Update in product reviews
        const productReviewIndex = state.productReviews.findIndex(
          (r) => r._id === action.payload._id
        );
        if (productReviewIndex !== -1) {
          state.productReviews[productReviewIndex] = action.payload;
        }
        
        // Update in my reviews
        const myReviewIndex = state.myReviews.findIndex(
          (r) => r._id === action.payload._id
        );
        if (myReviewIndex !== -1) {
          state.myReviews[myReviewIndex] = action.payload;
        }
        
        // Update current review if it's the one being edited
        if (state.currentReview && state.currentReview._id === action.payload._id) {
          state.currentReview = action.payload;
        }
        
        state.operation = null;
        state.uploadedImages = []; // Clear uploaded images after successful update
      })
      .addCase(updateExistingReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      })

      // Delete a review
      .addCase(removeReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.operation = 'delete';
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.productReviews = state.productReviews.filter(
          (r) => r._id !== action.payload
        );
        state.myReviews = state.myReviews.filter(
          (r) => r._id !== action.payload
        );
        // Clear current review if it's the one being deleted
        if (state.currentReview && state.currentReview._id === action.payload) {
          state.currentReview = null;
        }
        state.operation = null;
      })
      .addCase(removeReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      })

      // Upload review images
      .addCase(uploadReviewImages.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
      })
      .addCase(uploadReviewImages.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.uploadedImages = [...state.uploadedImages, ...action.payload];
      })
      .addCase(uploadReviewImages.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload;
      });
  },
});

export const {
  clearReviewError,
  resetReviewState,
  setCurrentReview,
  clearUploadedImages,
} = reviewSlice.actions;

export default reviewSlice.reducer;
