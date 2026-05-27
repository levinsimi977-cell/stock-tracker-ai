import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/apiConfig';

export const stockOwnershipApi = createApi({
    reducerPath: 'stockOwnershipApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Ownership'],
   endpoints: (builder) => ({
        getMyPortfolio: builder.query({
            query: () => '/portfolio/my-portfolio',
            providesTags: ['Ownership'],
        }),
       getAIAdvice: builder.query({
    query: (stockId) => `/portfolio/advice/${stockId}`,
}),
    }),
});

export const { useGetMyPortfolioQuery, useLazyGetAIAdviceQuery } = stockOwnershipApi;