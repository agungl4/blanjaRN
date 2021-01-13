import { combineReducers } from "redux";
import authReducer from './auth'
import cartReducer from './cart'

const reducers = combineReducers({
  auth : authReducer,
  cart : cartReducer
});

export default reducers;