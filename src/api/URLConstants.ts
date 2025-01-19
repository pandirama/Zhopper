import {BASE_URL} from '../axios/config';

export const AUTH_URLS = {
  LOGIN: `${BASE_URL}/api/login`,
  REGISTER: `${BASE_URL}/api/register`,
  CHANGE_PASSWORD: `${BASE_URL}/api/change-password`,
};

export const WALLET_URLS = {
  WALLET_BALANCE: `${BASE_URL}/api/balance`,
};

export const QR_URLS = {
  QR_CODE: `${BASE_URL}/api/qr`,
};

export const PROFILE_URLS = {
  PROFILE: `${BASE_URL}/api/profile`,
};
