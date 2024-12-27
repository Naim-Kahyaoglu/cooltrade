import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  total: 0
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        item => 
          item.product.id === action.payload.product.id && 
          item.product.color === action.payload.product.color && 
          item.product.size === action.payload.product.size
      );

      if (existingItem) {
        existingItem.count += action.payload.count;
      } else {
        state.cart.push(action.payload);
      }

      // Toplam fiyatı güncelle
      state.total = state.cart.reduce(
        (total, item) => total + (item.product.price * item.count), 
        0
      );
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(
        item => 
          item.product.id === action.payload.product.id && 
          item.product.color === action.payload.product.color && 
          item.product.size === action.payload.product.size
      );

      if (index !== -1) {
        state.cart.splice(index, 1);
        
        // Toplam fiyatı güncelle
        state.total = state.cart.reduce(
          (total, item) => total + (item.product.price * item.count), 
          0
        );
      }
    },
    updateCartItemCount: (state, action) => {
      const item = state.cart.find(
        item => 
          item.product.id === action.payload.product.id && 
          item.product.color === action.payload.product.color && 
          item.product.size === action.payload.product.size
      );

      if (item) {
        item.count = action.payload.count;
        
        // Toplam fiyatı güncelle
        state.total = state.cart.reduce(
          (total, item) => total + (item.product.price * item.count), 
          0
        );
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.total = 0;
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateCartItemCount, 
  clearCart 
} = shoppingCartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.shoppingCart.cart;
export const selectCartTotal = (state) => state.shoppingCart.total;

export default shoppingCartSlice.reducer;
