import { createStore } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from "./Reducers";
import { persistReducer } from 'redux-persist';

// const logger = createLogger();
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const reduxStore = createStore(persistedReducer)
export default reduxStore;