import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import userReducer from './userSlice';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

export default store;
