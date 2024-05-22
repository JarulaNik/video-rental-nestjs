import { combineReducers } from 'redux';
import authReducer from './authReducer.jsx';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;