import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// ייבוא שמי מדויק עם סוגריים מסולסלים לכל ה-APIs
import { authApi } from '../features/user/authApi';
import { userApi } from '../features/user/userApi';
import { stockApi } from '../features/stock/stockApi';
import { transactionApi } from '../features/transaction/transactionApi';
import { stockOwnershipApi } from '../features/stockOwnership/stockOwnershipApi';

// 🔥 ייבוא ה-authReducer ששכחנו! (תוודאי שהנתיב מדויק לקובץ ה-authSlice שלך)
import authReducer from '../features/user/authSlice'; 

import transactionReducer from '../features/transaction/transactionSlice';
import stockownershipReducer from '../features/stockOwnership/stockOwnershipSlice';
import userReducer from '../features/user/userSlice';
import stockReducer from '../features/stock/stockSlice';

export const store = configureStore({
  reducer: {
    // API Reducers
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [stockOwnershipApi.reducerPath]: stockOwnershipApi.reducer,
    
    // Slice Reducers
    auth: authReducer, // 🔥 הנה הוא! עכשיו Redux מנהל אותו ריאקטיבית תחת השם auth!
    user: userReducer,
    stock: stockReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      stockApi.middleware,
      transactionApi.middleware,
      stockOwnershipApi.middleware
    ),
});

setupListeners(store.dispatch);