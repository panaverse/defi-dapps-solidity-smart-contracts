import { configureStore } from '@reduxjs/toolkit';
import MarketplaceReducer from './MarketplaceSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
    reducer : MarketplaceReducer,
})

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof MarketplaceReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export default store;