import { combineReducers } from "redux";
import authReducer from './auth'
import cartReducer from './cart'
import addressReducer from './address'
import notifReducer from './notification'

const reducers = combineReducers({
  auth : authReducer,
  cart : cartReducer,
  address : addressReducer,
  notification:notifReducer
});

export default reducers;