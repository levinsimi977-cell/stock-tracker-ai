// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [
        {
          id: 1,
          firstName: 'יוסי',
          lastName: 'כהן',
          email: 'yossi@example.com',
          birthDate: '1990-05-10',
        },
        {
          id: 2,
          firstName: 'רוני',
          lastName: 'לוי',
          email: 'roni@example.com',
          birthDate: '1985-07-20',
        },
        {
          id: 3,
          firstName: 'מאיה',
          lastName: 'רוזן',
          email: 'maya@example.com',
          birthDate: '1992-03-15',
        },
      ],  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
