import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import userReducer from './userSlice';
import categoryReducer from './categorySlice';

const rootReducer = combineReducers({
  user: userReducer,
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  categories: categoryReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

export default store;
