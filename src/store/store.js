import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import shoppingCartReducer from './shoppingCartSlice';
import addressReducer from './addressSlice';
import orderReducer from './orderSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingCart: shoppingCartReducer,
    address: addressReducer,
    order: orderReducer,
    products: productReducer,
    categories: categoryReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
