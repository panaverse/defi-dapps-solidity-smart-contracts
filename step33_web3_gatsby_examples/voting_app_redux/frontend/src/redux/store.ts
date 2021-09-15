import { configureStore } from '@reduxjs/toolkit';
import VotingReducer from './slice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
    reducer : VotingReducer,
})

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof VotingReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector