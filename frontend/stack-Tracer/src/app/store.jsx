import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import uiReducer from './uiSlice'; // ייבוא המגירה החדשה
import { errorMiddleware } from './errorMiddleware'; // ייבוא שומר הסף

// ייבוא ה-APIs הקיימים שלך
import { authApi } from '../features/user/authApi';
import { userApi } from '../features/user/userApi';
import { stockApi } from '../features/stock/stockApi';
import { transactionApi } from '../features/transaction/transactionApi';
import { stockOwnershipApi } from '../features/stockOwnership/stockOwnershipApi';
import authReducer from '../features/user/authSlice';

export const store = configureStore({
  reducer: {
    // ה-Reducers של ה-APIs
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [stockOwnershipApi.reducerPath]: stockOwnershipApi.reducer,
    
    auth: authReducer,
    ui: uiReducer, 
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      stockApi.middleware,
      transactionApi.middleware,
      stockOwnershipApi.middleware,
      errorMiddleware 
    ),
});

setupListeners(store.dispatch);