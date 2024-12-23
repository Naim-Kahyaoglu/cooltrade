import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

// Initial state
const initialState = {
  categories: [],
  topCategories: [], // Top 5 categories by rating
  isLoading: false,
  error: null
};

// Slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        // Sort categories by rating and get top 5
        state.topCategories = [...action.payload]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer; 