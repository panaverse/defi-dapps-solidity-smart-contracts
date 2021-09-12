import { configureStore } from '@reduxjs/toolkit';
import SocialMediaReducer from './slice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
    reducer : SocialMediaReducer,
})

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof SocialMediaReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export default store;