import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {PROFILE_URLS} from './URLConstants';

export const PROFILE_API_REDUCER_KEY = 'profileAPI';

export const profileAPI = createApi({
  reducerPath: PROFILE_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getProfile: builder.query<any, any>({
      query: params => ({
        url: PROFILE_URLS.PROFILE,
        method: 'GET',
        params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    getReferralQR: builder.query<any, any>({
      query: params => ({
        url: PROFILE_URLS.REFERRAL_QR,
        method: 'GET',
        params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    getEditProfile: builder.query<any, any>({
      query: params => ({
        url: PROFILE_URLS.EDIT_PROFILE,
        method: 'GET',
        params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    changePwd: builder.mutation({
      query: passParams => ({
        url: PROFILE_URLS.CHANGE_PASSWORD,
        method: 'POST',
        body: passParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {
  useLazyGetProfileQuery,
  useGetReferralQRQuery,
  useChangePwdMutation,
  useGetEditProfileQuery,
} = profileAPI;
