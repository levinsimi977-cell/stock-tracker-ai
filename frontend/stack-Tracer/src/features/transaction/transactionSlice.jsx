// transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [
        {
          id: 1,
          userId: 1,
          stockId: 1,
          quantity: 50,
          priceAtTransaction: 120.5,
          transactionDate: '2023-01-15',
          isPurchase: true,
        },
        {
          id: 2,
          userId: 2,
          stockId: 2,
          quantity: 30,
          priceAtTransaction: 85.3,
          transactionDate: '2023-02-15',
          isPurchase: false,
        },
      ],  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(transaction => transaction.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
    },
  },
});

export const { setTransactions, addTransaction, updateTransaction, deleteTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
