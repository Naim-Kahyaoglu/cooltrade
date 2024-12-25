import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios';

// Async thunks
export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/user/address');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch addresses');
    }
  }
);

export const addAddress = createAsyncThunk(
  'address/addAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/address', addressData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add address');
    }
  }
);

export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({ id, ...addressData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/user/address/${id}`, addressData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update address');
    }
  }
);

export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (addressId, { rejectWithValue }) => {
    try {
      await api.delete(`/user/address/${addressId}`);
      return addressId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete address');
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    selectedShippingAddress: null,
    selectedReceiptAddress: null,
    isLoading: false,
    error: null,
    isAddressFormOpen: false,
    editingAddress: null
  },
  reducers: {
    setSelectedShippingAddress: (state, action) => {
      state.selectedShippingAddress = action.payload;
    },
    setSelectedReceiptAddress: (state, action) => {
      state.selectedReceiptAddress = action.payload;
    },
    toggleAddressForm: (state) => {
      state.isAddressFormOpen = !state.isAddressFormOpen;
      if (!state.isAddressFormOpen) {
        state.editingAddress = null;
      }
    },
    setEditingAddress: (state, action) => {
      state.editingAddress = action.payload;
      state.isAddressFormOpen = true;
    },
    clearAddressError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
        
        // Set default addresses if none selected
        const shippingAddresses = action.payload.filter(addr => addr.addressType === 'shipping');
        const receiptAddresses = action.payload.filter(addr => addr.addressType === 'receipt');
        
        if (!state.selectedShippingAddress && shippingAddresses.length > 0) {
          state.selectedShippingAddress = shippingAddresses[0];
        }
        if (!state.selectedReceiptAddress && receiptAddresses.length > 0) {
          state.selectedReceiptAddress = receiptAddresses[0];
        }
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add address
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses.push(action.payload);
        state.isAddressFormOpen = false;
        
        // Set as selected if it's the first of its type
        if (action.payload.addressType === 'shipping' && !state.selectedShippingAddress) {
          state.selectedShippingAddress = action.payload;
        }
        if (action.payload.addressType === 'receipt' && !state.selectedReceiptAddress) {
          state.selectedReceiptAddress = action.payload;
        }
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update address
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
          
          // Update selected addresses if needed
          if (state.selectedShippingAddress?.id === action.payload.id) {
            state.selectedShippingAddress = action.payload;
          }
          if (state.selectedReceiptAddress?.id === action.payload.id) {
            state.selectedReceiptAddress = action.payload;
          }
        }
        state.isAddressFormOpen = false;
        state.editingAddress = null;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete address
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
        
        // Clear selected addresses if deleted
        if (state.selectedShippingAddress?.id === action.payload) {
          const remainingShippingAddresses = state.addresses.filter(addr => addr.addressType === 'shipping');
          state.selectedShippingAddress = remainingShippingAddresses[0] || null;
        }
        if (state.selectedReceiptAddress?.id === action.payload) {
          const remainingReceiptAddresses = state.addresses.filter(addr => addr.addressType === 'receipt');
          state.selectedReceiptAddress = remainingReceiptAddresses[0] || null;
        }
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  setSelectedShippingAddress,
  setSelectedReceiptAddress,
  toggleAddressForm, 
  setEditingAddress, 
  clearAddressError 
} = addressSlice.actions;

export default addressSlice.reducer; 