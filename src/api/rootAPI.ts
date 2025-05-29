import {authAPI} from './auth/authAPI';
import {newsAPI} from './newsAPI';
import {productsAPI} from './productsAPI';
import {profileAPI} from './profileAPI';
import {referralAPI} from './referralAPI';
import {walletAPI} from './walletAPI';

const rootAPIMiddleware = [
  authAPI.middleware,
  profileAPI.middleware,
  walletAPI.middleware,
  productsAPI.middleware,
  referralAPI.middleware,
  newsAPI.middleware,
];

export default rootAPIMiddleware;
