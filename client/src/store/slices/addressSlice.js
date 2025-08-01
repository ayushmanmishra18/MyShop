import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchUserAddresses,
  fetchAddressById,
  addNewAddress,
  updateExistingAddress,
  removeAddress,
  setDefaultUserAddress,
} from '../thunks/addressThunks';

const initialState = {
  addresses: [],
  currentAddress: null,
  loading: false,
  error: null,
  success: false,
  operation: null, // 'add', 'edit', 'delete', 'fetch', 'set_default'
};

const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },
    resetAddressState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.operation = null;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Common pending state for all address operations
    builder
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operation = 'fetch';
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
        state.operation = null;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      })

      // Fetch single address by ID
      .addCase(fetchAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentAddress = null;
        state.operation = 'fetch';
      })
      .addCase(fetchAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAddress = action.payload;
        state.operation = null;
      })
      .addCase(fetchAddressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      })

      // Add new address
      .addCase(addNewAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.operation = 'add';
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.addresses.push(action.payload);
        // If this is the first address, set it as default
        if (state.addresses.length === 1) {
          state.addresses[0].isDefault = true;
        }
        state.operation = null;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      })

      // Update existing address
      .addCase(updateExistingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.operation = 'edit';
      })
      .addCase(updateExistingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.addresses.findIndex(
          (addr) => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
        // Update current address if it's the one being edited
        if (state.currentAddress && state.currentAddress._id === action.payload._id) {
          state.currentAddress = action.payload;
        }
        state.operation = null;
      })
      .addCase(updateExistingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      })

      // Delete address
      .addCase(removeAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.operation = 'delete';
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload
        );
        // Clear current address if it's the one being deleted
        if (state.currentAddress && state.currentAddress._id === action.payload) {
          state.currentAddress = null;
        }
        state.operation = null;
      })
      .addCase(removeAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      })

      // Set default address
      .addCase(setDefaultUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operation = 'set_default';
      })
      .addCase(setDefaultUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        // Update all addresses to set isDefault to false except the one being set as default
        state.addresses = state.addresses.map((addr) => ({
          ...addr,
          isDefault: addr._id === action.payload._id,
        }));
        // Update current address if it exists
        if (state.currentAddress) {
          state.currentAddress.isDefault = state.currentAddress._id === action.payload._id;
        }
        state.operation = null;
      })
      .addCase(setDefaultUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operation = null;
      });
  },
});

export const { clearAddressError, resetAddressState, setCurrentAddress } = addressSlice.actions;

export default addressSlice.reducer;
