import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {PROFILE_URLS} from './URLConstants';

export const PROFILE_API_REDUCER_KEY = 'profileAPI';

export const profileAPI = createApi({
  reducerPath: PROFILE_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getProfile: builder.query<any, void>({
      query: () => ({
        url: PROFILE_URLS.PROFILE,
        method: 'GET',
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {useGetProfileQuery} = profileAPI;
