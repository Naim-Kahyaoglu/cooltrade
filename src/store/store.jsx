import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Changed this line
import logger from 'redux-logger';
import userReducer from './userSlice';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),
});

export default store;

