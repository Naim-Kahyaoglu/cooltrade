import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';
import { fetchProducts, fetchCategories } from './thunks/productThunks';

// Async thunk to fetch product details
export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      console.log('Fetching product details for ID:', productId);  // Debug log
      const response = await axios.get(`/products/${productId}`);
      console.log('Product details response:', response.data);  // Debug log
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);  // Debug log
      return rejectWithValue(error.response?.data || 'Ürün detayları alınamadı');
    }
  }
);

const initialState = {
  products: [],
  categories: [],
  totalProducts: 0,
  totalPages: 0,
  status: 'idle',
  error: null,
  currentProduct: null,
  loading: false,
  errorDetails: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.totalProducts = 0;
      state.totalPages = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        // Sayfa 1 ise ürünleri sıfırla, değilse mevcut ürünlere ekle
        state.products = action.payload.products || [];
        state.totalProducts = action.payload.total || 0;
        state.totalPages = action.payload.totalPages || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ürünler yüklenemedi';
        state.products = [];
        state.totalProducts = 0;
        state.totalPages = 0;
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Kategoriler yüklenemedi';
        state.categories = [];
      })

      // Fetch Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.errorDetails = null;
        state.currentProduct = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
        state.errorDetails = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.errorDetails = action.payload;
        state.currentProduct = null;
      });
  }
});

export const { clearProducts } = productSlice.actions;

// Selectors
export const selectProducts = (state) => state.products?.products || [];
export const selectCategories = (state) => state.products?.categories || [];
export const selectTotalProducts = (state) => state.products?.totalProducts || 0;
export const selectTotalPages = (state) => state.products?.totalPages || 0;
export const selectProductStatus = (state) => state.products?.status || 'idle';
export const selectProductError = (state) => state.products?.error || null;
export const selectCurrentProduct = (state) => state.products?.currentProduct || null;
export const selectLoading = (state) => state.products?.loading || false;
export const selectErrorDetails = (state) => state.products?.errorDetails || null;

export default productSlice.reducer;
