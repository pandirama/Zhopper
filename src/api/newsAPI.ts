import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import { NEWS_URLS } from './URLConstants';

export const NEWS_API_REDUCER_KEY = 'newsAPI';

export const newsAPI = createApi({
  reducerPath: NEWS_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getNews: builder.query<any, void>({
      query: () => ({
        url: NEWS_URLS.NEWS,
        method: 'GET',
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {useGetNewsQuery} = newsAPI;
