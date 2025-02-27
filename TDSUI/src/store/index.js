import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import apiReducer from './apiSlice';
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
    user: userReducer
  },
});