import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/apiConfig';

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Stock'],
  endpoints: (build) => ({
    getAllStock: build.query({
      query: () => '/stocks',
      providesTags: ['Stock'],
    }),
    getStockBySymbol: build.query({
      query: (symbol) => `/stocks/${symbol}`,
    }),
    getFullAnalysis: build.query({
      query: (id) => `/stocks/ai/analysis/${id}`,
    }),
    getExpertAdvice: build.query({
      query: (id) => `/stocks/ai/expert-advice/${id}`,
    }),
    predictFuture: build.query({
      query: (id) => `/stocks/ai/predict/${id}`,
    }),
    updateStock: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/stocks/update/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Stock'],
    }),
   addStock: build.mutation({
  query: (newStock) => ({
    url: '/stocks/add',
    method: 'POST',
    body: newStock,
  }),
  transformResponse: (response) => response,
  invalidatesTags: ['Stock'],
  
}),
    addAmountStock: build.mutation({
      query: ({ id, amount }) => ({
        url: '/stocks/addAmountStock',
        method: 'POST',
        body: { id, amount }, 
      }),
      invalidatesTags: ['Stock'],
    }),
    deleteStock: build.mutation({
      query: (id) => ({
        url: `/stocks/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Stock'],
    }),
  }),
});

export const {
  useGetAllStockQuery,
  useGetStockBySymbolQuery,
  useGetFullAnalysisQuery,
  useGetExpertAdviceQuery,
  usePredictFutureQuery,
  useUpdateStockMutation,
  useAddStockMutation,
  useAddAmountStockMutation,
  useDeleteStockMutation
} = stockApi;