import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getAddresses as fetchAddresses, 
  getAddress, 
  createAddress as createAddressApi,
  updateAddress as updateAddressApi,
  deleteAddress as deleteAddressApi,
  setDefaultAddress as setDefaultAddressApi
} from '../../services/addressService';
import { toast } from 'react-toastify';

// Fetch all addresses for the logged-in user
export const fetchUserAddresses = createAsyncThunk(
  'addresses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAddresses();
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to fetch addresses');
      return rejectWithValue(error.message);
    }
  }
);

// Fetch a single address by ID
export const fetchAddressById = createAsyncThunk(
  'addresses/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAddress(id);
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to fetch address');
      return rejectWithValue(error.message);
    }
  }
);

// Create a new address
export const addNewAddress = createAsyncThunk(
  'addresses/addNew',
  async (addressData, { rejectWithValue, dispatch }) => {
    try {
      const response = await createAddressApi(addressData);
      toast.success('Address added successfully');
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to add address');
      return rejectWithValue(error.message);
    }
  }
);

// Update an existing address
export const updateExistingAddress = createAsyncThunk(
  'addresses/update',
  async ({ id, ...addressData }, { rejectWithValue }) => {
    try {
      const response = await updateAddressApi(id, addressData);
      toast.success('Address updated successfully');
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to update address');
      return rejectWithValue(error.message);
    }
  }
);

// Delete an address
export const removeAddress = createAsyncThunk(
  'addresses/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteAddressApi(id);
      toast.success('Address deleted successfully');
      return id;
    } catch (error) {
      toast.error(error.message || 'Failed to delete address');
      return rejectWithValue(error.message);
    }
  }
);

// Set an address as default
export const setDefaultUserAddress = createAsyncThunk(
  'addresses/setDefault',
  async (id, { rejectWithValue }) => {
    try {
      const response = await setDefaultAddressApi(id);
      toast.success('Default address updated');
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to set default address');
      return rejectWithValue(error.message);
    }
  }
);
