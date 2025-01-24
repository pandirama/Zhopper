import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../axios/axiosBaseQuery';
import {AUTH_URLS} from '../URLConstants';

export const AUTH_API_REDUCER_KEY = 'authAPI';

export const authAPI = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    login: builder.mutation({
      query: loginParams => ({
        url: AUTH_URLS.LOGIN,
        method: 'POST',
        body: loginParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    register: builder.mutation({
      query: registerParams => ({
        url: AUTH_URLS.REGISTER,
        method: 'POST',
        body: registerParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    forgotPassword: builder.mutation({
      query: params => ({
        url: AUTH_URLS.FORGOTPASSWORD,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation, useForgotPasswordMutation} =
  authAPI;
