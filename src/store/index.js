import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import orderReducer from './orderSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
