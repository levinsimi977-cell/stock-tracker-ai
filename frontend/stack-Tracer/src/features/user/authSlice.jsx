import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    username: localStorage.getItem('username') || null,
  },
  reducers: {
    // פעולה לעדכון נתוני המשתמש לאחר התחברות
    setCredentials: (state, action) => {
      const { token, role, username } = action.payload;
      state.token = token;
      state.role = role;
      state.username = username;
      
      // שמירה גם ב-localStorage לגיבוי
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);
    },
    // פעולת התנתקות
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.username = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;