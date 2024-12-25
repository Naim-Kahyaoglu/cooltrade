import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './reducers/productReducer';
import categoryReducer from './categorySlice';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import addressReducer from './addressSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    shoppingCart: shoppingCartReducer,
    address: addressReducer,
  },
});

export default store;
