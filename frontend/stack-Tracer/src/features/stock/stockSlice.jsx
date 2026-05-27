import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    selectedStock: null,
    stocks: [],
  },
  reducers: {
    // הפעולה ש-StockCard מנסה לייבא בשורה 5 בתמונה
    selectStock: (state, action) => {
      state.selectedStock = action.payload;
    },
    setStocks: (state, action) => {
      state.stocks = action.payload;
    },
  },
});

export const { selectStock, setStocks } = stockSlice.actions;
export default stockSlice.reducer;