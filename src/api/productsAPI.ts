import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {PRODUCTS_URLS} from './URLConstants';

export const PRODUCTS_API_REDUCER_KEY = 'productsAPI';

export const productsAPI = createApi({
  reducerPath: PRODUCTS_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getCategories: builder.query<any, void>({
      query: () => ({
        url: PRODUCTS_URLS.CATEGORIES,
        method: 'GET',
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    getSubCategory: builder.mutation<any, any>({
      query: walletParams => ({
        url: PRODUCTS_URLS.SUB_CATEGORIES,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    getMerchantInfo: builder.mutation<any, any>({
      query: walletParams => ({
        url: PRODUCTS_URLS.MERCHANT_INFO,
        method: 'GET',
        params: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetSubCategoryMutation,
  useGetMerchantInfoMutation,
} = productsAPI;
