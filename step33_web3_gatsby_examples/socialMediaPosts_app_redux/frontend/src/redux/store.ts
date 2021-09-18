import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import SocialMediaReducer from './slice';
import { web3Reducer } from './web3slice';

const parentReducer = combineReducers({
    SocialMediaReducer: SocialMediaReducer,
    web3Reducer: web3Reducer,    
})

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
    reducer : parentReducer,
    middleware: customizedMiddleware,
})

export type RootStateType = ReturnType<typeof parentReducer>;
export default store;


