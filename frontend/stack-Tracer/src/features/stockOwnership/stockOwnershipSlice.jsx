import { createSlice } from '@reduxjs/toolkit';

const stockOwnershipSlice = createSlice({
  name: 'stockOwnership',
  initialState: {
    ownerships: [
        {
          id: 1,
          userId: 1,
          stockId: 1,
          quantity: 100,
          purchaseDate: '2023-01-01',
        },
        {
          id: 2,
          userId: 2,
          stockId: 2,
          quantity: 200,
          purchaseDate: '2023-02-01',
        },
      ],
  },
  reducers: {
    setOwnerships: (state, action) => {
      state.ownerships = action.payload;
    },
    addOwnership: (state, action) => {
      state.ownerships.push(action.payload);
    },
    updateOwnership: (state, action) => {
      const index = state.ownerships.findIndex(ownership => ownership.id === action.payload.id);
      if (index !== -1) {
        state.ownerships[index] = action.payload;
      }
    },
    deleteOwnership: (state, action) => {
      state.ownerships = state.ownerships.filter(ownership => ownership.id !== action.payload);
    },
  },
});

export const { setOwnerships, addOwnership, updateOwnership, deleteOwnership } = stockOwnershipSlice.actions;

export default stockOwnershipSlice.reducer;
