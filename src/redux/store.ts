// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Disable if you're using non-serializable data
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools in development
});

// Define types for the App Dispatch and Root State
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Create typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
