import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchTopCategories } from './thunks/categoryThunks';

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
  name: 'category',
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
        
        // Top 5 kategorileri seç
        state.topCategories = action.payload
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5);
        
        // Tüm kategoriler yerine sadece top kategorileri kaydet
        state.categories = state.topCategories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTopCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTopCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topCategories = action.payload.topCategories;
        state.topCategoriesTotal = action.payload.total;
      })
      .addCase(fetchTopCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Kategoriler yüklenemedi';
        state.topCategories = [];
      });
  }
});

export const selectTopCategories = (state) => state.category?.topCategories || [];
export const selectTopCategoriesLoading = (state) => state.category?.isLoading || false;
export const selectTopCategoriesError = (state) => state.category?.error || null;

export default categorySlice.reducer;