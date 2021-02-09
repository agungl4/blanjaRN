import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from "./Reducers";
import {persistReducer} from 'redux-persist';

// const logger = createLogger();
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cart', 'auth'],
  };
  const persistedReducer = persistReducer(persistConfig, reducers);
// const enhancers = applyMiddleware(promiseMiddleware, logger);

// rpm mengubah 1 async action menjadi 2 bagian
// action pending
// action fulfilled/rejected

// const reduxStore = createStore(reducers, composeWithDevTools(enhancers));
const reduxStore = createStore(persistedReducer)
export default reduxStore;