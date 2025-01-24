import {BASE_URL} from '../axios/config';

export const AUTH_URLS = {
  LOGIN: `${BASE_URL}/api/login`,
  REGISTER: `${BASE_URL}/api/register`,
  FORGOTPASSWORD: `${BASE_URL}/api/forgot-password`,
};

export const WALLET_URLS = {
  WALLET_BALANCE: `${BASE_URL}/api/balance`,
};

export const PROFILE_URLS = {
  PROFILE: `${BASE_URL}/api/profile`,
  REFERRAL_QR: `${BASE_URL}/api/qr`,
  CHANGE_PASSWORD: `${BASE_URL}/api/change-password`,
};

export const PRODUCTS_URLS = {
  CATEGORIES: `${BASE_URL}/api/category`,
};
