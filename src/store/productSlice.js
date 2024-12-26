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
        // Eğer sayfa 1 ise, ürünleri sıfırla
        if (action.meta.arg.page === 1) {
          state.products = action.payload.products;
        } else {
          // Değilse mevcut ürünlere ekle
          state.products = [...state.products, ...action.payload.products];
        }
        state.totalProducts = action.payload.total;
        state.totalPages = Math.ceil(action.payload.total / action.meta.arg.limit);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearProducts } = productSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.products;
export const selectCategories = (state) => state.products.categories;
export const selectTotalProducts = (state) => state.products.totalProducts;
export const selectTotalPages = (state) => state.products.totalPages;
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;

export default productSlice.reducer; 