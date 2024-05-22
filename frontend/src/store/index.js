// src/store/index.js
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './authReducer.jsx';
import cartReducer from './cartReducer.jsx';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer, // Add cart reducer to the root reducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;