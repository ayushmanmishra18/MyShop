import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isVerificationSent: false,
};

// Verify email
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verificationData, thunkAPI) => {
    try {
      return await authService.verifyEmail(verificationData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Resend verification email
export const resendVerificationEmail = createAsyncThunk(
  'auth/resendVerification',
  async (emailData, thunkAPI) => {
    try {
      return await authService.resendVerificationEmail(emailData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    // Resend verification email
    builder.addCase(resendVerificationEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resendVerificationEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isVerificationSent = true;
      state.message = action.payload?.message || 'Verification email sent successfully';
    });
    builder.addCase(resendVerificationEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload || 'Failed to send verification email';
      state.user = null;
    });
    
    // Verify email
    builder.addCase(verifyEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload?.message || 'Email verified successfully';
      if (state.user) {
        state.user.isVerified = true;
      }
    });
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload || 'Email verification failed';
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
