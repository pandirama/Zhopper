import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {REFERRAL_URLS} from './URLConstants';

export const REFERRAL_API_REDUCER_KEY = 'referralAPI';

export const referralAPI = createApi({
  reducerPath: REFERRAL_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    referral: builder.mutation<any, any>({
      query: walletParams => ({
        url: REFERRAL_URLS.REFERRAL,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {useReferralMutation} = referralAPI;
