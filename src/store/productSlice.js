import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories } from './thunks/productThunks';

const initialState = {
  products: [],
  categories: [],
  totalProducts: 0,
  totalPages: 0,
  status: 'idle',
  error: null
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

export default productSlice.reducer;
