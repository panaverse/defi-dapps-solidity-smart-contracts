import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import VotingReducer from './slice';
import { web3Reducer } from './web3slice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const parentReducer = combineReducers({
    votingSlice: VotingReducer,
    web3Slice: web3Reducer,    
})

export const store = configureStore({    
    reducer : parentReducer,
    middleware: getDefaultMiddleware({ serializableCheck: false }),
})

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof parentReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

