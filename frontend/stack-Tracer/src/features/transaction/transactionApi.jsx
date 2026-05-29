import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/apiConfig';
import { stockOwnershipApi } from '../stockOwnership/stockOwnershipApi'; 
import { userApi } from '../user/userApi'; 

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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(stockOwnershipApi.util.invalidateTags(['Ownership']));
          dispatch(userApi.util.invalidateTags(['User']));
        } catch (err) {
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