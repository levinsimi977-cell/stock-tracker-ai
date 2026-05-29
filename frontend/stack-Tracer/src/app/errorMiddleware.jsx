import { isRejectedWithValue } from '@reduxjs/toolkit';
import { showNotification } from './uiSlice';

export const errorMiddleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const serverError = action.payload?.data?.message || action.payload?.data;
    const status = action.payload?.status;

    let customMessage = "נרשמה תקלה בתקשורת מול השרת. אנא נסה שנית.";
    let title = "שגיאת תקשורת";

    if (status === 403) {
      customMessage = "אין לך הרשאות מתאימות לביצוע פעולה זו.";
      title = "גישה נדחתה";
    } else if (status === 401) {
      customMessage = "הסשן פג, אנא התחבר מחדש.";
      title = "התחברות נדרשת";
    } else if (serverError && typeof serverError === 'string') {
      customMessage = serverError;
      title = "פעולה נכשלה";
    }

    // הפעלת המודאל הניאוני הגלובלי
    store.dispatch(showNotification({
      type: 'error',
      message: customMessage,
      title: title
    }));
  }
  return next(action);
};