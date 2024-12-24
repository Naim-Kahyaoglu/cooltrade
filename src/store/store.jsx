import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './reducers/productReducer';
import categoryReducer from './categorySlice';
import shoppingCartReducer from './reducers/shoppingCartReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    shoppingCart: shoppingCartReducer,
  },
});

export default store;
