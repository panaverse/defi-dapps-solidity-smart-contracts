import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from './todoListSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
    reducer : todoListReducer,
})

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof todoListReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export default store;