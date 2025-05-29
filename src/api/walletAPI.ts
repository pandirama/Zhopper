import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {WALLET_URLS} from './URLConstants';

export const WALLET_API_REDUCER_KEY = 'walletAPI';

export const walletAPI = createApi({
  reducerPath: WALLET_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    walletBalance: builder.mutation<any, any>({
      query: walletParams => ({
        url: WALLET_URLS.WALLET_BALANCE_ALL,
        method: 'GET',
        params: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    QRPayment: builder.mutation<any, any>({
      query: walletParams => ({
        url: WALLET_URLS.QR_PAYMENT,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    merchantInfo: builder.mutation<any, any>({
      query: walletParams => ({
        url: WALLET_URLS.MERCHANT_INFO,
        method: 'GET',
        params: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    walletTransaction: builder.mutation<any, any>({
      query: walletParams => ({
        url: WALLET_URLS.TRANSACTION,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    CBWalletTransaction: builder.mutation<any, any>({
      query: walletParams => ({
        url: WALLET_URLS.CBWALLET_TRANSACTION,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    claimCashBack: builder.mutation<any, any>({
      query: walletParams => ({
        url: WALLET_URLS.CLAIM_CASH_BACK,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {
  useWalletBalanceMutation,
  useQRPaymentMutation,
  useMerchantInfoMutation,
  useWalletTransactionMutation,
  useCBWalletTransactionMutation,
  useClaimCashBackMutation,
} = walletAPI;
