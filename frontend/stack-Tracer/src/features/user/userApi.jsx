import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8080/api/users', 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => '',
      providesTags: ['User'],
    }),
    upDateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `upDate/${id}`, 
        method: 'PUT',
        body: user
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`, 
        method: 'DELETE'
      }),
      invalidatesTags: ['User'],
    }),
    getBalance: builder.query({
      query: () => '/balance',
      providesTags: ['User'],
    }),
    depositMoney: builder.mutation({
      query: (amount) => ({
        url: `/deposit?amount=${amount}`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    withdrawMoney: builder.mutation({
      query: (amount) => ({
        url: `/withdraw?amount=${amount}`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
    useGetAllUserQuery, 
    useUpDateUserMutation, 
    useDeleteUserMutation, 
    useGetBalanceQuery, 
    useDepositMoneyMutation,
    useWithdrawMoneyMutation 
} = userApi;