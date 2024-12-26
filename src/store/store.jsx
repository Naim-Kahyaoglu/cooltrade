import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import categoryReducer from './categorySlice';
import orderReducer from './orderSlice';
import addressReducer from './addressSlice';
import productReducer from './productSlice';
import shoppingCartReducer from './reducers/shoppingCartReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    order: orderReducer,
    address: addressReducer,
    products: productReducer,
    shoppingCart: shoppingCartReducer,
  },
});

export default store;
