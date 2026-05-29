import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modal: {
      isOpen: false,
      type: 'error', 
      message: '',
      title: ''
    }
  },
  reducers: {
    showNotification: (state, action) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type || 'error',
        message: action.payload.message,
        title: action.payload.title || (action.payload.type === 'success' ? 'הצלחה!' : 'שגיאת מערכת')
      };
    },
    hideModal: (state) => {
      state.modal.isOpen = false;
    }
  }
});

export const { showNotification, hideModal } = uiSlice.actions;
export default uiSlice.reducer;