import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/apiConfig';
import { stockOwnershipApi } from '../stockOwnership/stockOwnershipApi'; // תוודאי שהנתיב לקובץ מדויק אצלך
import { userApi } from '../user/userApi'; // תוודאי שהנתיב לקובץ מדויק אצלך

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Transaction'], 
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => '/transactions',
      providesTags: ['Transaction'],
    }),
    getTodayTransactions: builder.query({
      query: () => '/transactions/today',
      providesTags: ['Transaction'],
    }),
    executeTransaction: builder.mutation({ 
      query: ({ type, symbol, amount }) => ({
        url: `/transactions/${type.toLowerCase()}`,
        method: 'POST',
        params: { symbol, amount },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Transaction'],
      // 🔥 התיקון המנצח: מזריקים פקודת רענון ישירות ל-Cache של התיק והארנק!
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // ברגע שהעסקה מצליחה בשרת, אנחנו מכריחים את שני ה-APIs האחרים להתרענן מיד
          dispatch(stockOwnershipApi.util.invalidateTags(['Ownership']));
          dispatch(userApi.util.invalidateTags(['User']));
        } catch (err) {
          // שגיאה תטופל ישירות בקומפוננטה
        }
      }
    }),
  }),
});

export const { 
  useGetTransactionsQuery, 
  useExecuteTransactionMutation ,
  useGetTodayTransactionsQuery
} = transactionApi;