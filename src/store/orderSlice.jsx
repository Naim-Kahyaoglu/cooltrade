import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios';
import { clearCart } from './reducers/shoppingCartReducer';
import { toast } from 'react-hot-toast';

// Create order thunk
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/order', orderData);
      
      // Show success message
      toast.success('Order created successfully! Thank you for your purchase.');
      
      // Clear the cart
      dispatch(clearCart());
      
      return response.data;
    } catch (error) {
      console.error('Order creation error:', error);
      
      if (error.response?.status === 401) {
        toast.error('Oturum açmanız gerekiyor.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to create order');
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
  }
);

// Fetch orders thunk
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentOrder, clearOrderError } = orderSlice.actions;
export default orderSlice.reducer; 