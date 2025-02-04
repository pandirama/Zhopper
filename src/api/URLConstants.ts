import {BASE_URL} from '../axios/config';

export const AUTH_URLS = {
  LOGIN: `${BASE_URL}/api/login`,
  REGISTER: `${BASE_URL}/api/register`,
  FORGOTPASSWORD: `${BASE_URL}/api/forgot-password`,
};

export const WALLET_URLS = {
  WALLET_BALANCE_ALL: `${BASE_URL}/api/balance-all`,
  QR_PAYMENT: `${BASE_URL}/api/payment`,
  MERCHANT_INFO: `${BASE_URL}/api/merchant-info-new`,
  TRANSACTION: `${BASE_URL}/api/transaction`,
};

export const PROFILE_URLS = {
  PROFILE: `${BASE_URL}/api/profile`,
  REFERRAL_QR: `${BASE_URL}/api/qr`,
  CHANGE_PASSWORD: `${BASE_URL}/api/change-password`,
};

export const PRODUCTS_URLS = {
  CATEGORIES: `${BASE_URL}/api/category-all-new`,
  SUB_CATEGORIES: `${BASE_URL}/api/merchant-list-category`,
  MERCHANT_INFO: `${BASE_URL}/api/merchant-info-new`,
};

export const REFERRAL_URLS = {
  REFERRAL: `${BASE_URL}/api/referral`,
};
