import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories } from './thunks/productThunks';

const initialState = {
  products: [],
  categories: [],
  totalPages: 0,
  isLoading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchProducts
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

// Selectors
export const selectProducts = (state) => state.products.products;
export const selectCategories = (state) => state.products.categories;
export const selectTotalPages = (state) => state.products.totalPages;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectError = (state) => state.products.error;

export default productSlice.reducer; 