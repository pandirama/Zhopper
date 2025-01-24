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
  }),
});

export const {useGetCategoriesQuery} = productsAPI;
