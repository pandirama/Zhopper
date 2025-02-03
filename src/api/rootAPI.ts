import {authAPI} from './auth/authAPI';
import {productsAPI} from './productsAPI';
import {profileAPI} from './profileAPI';
import { referralAPI } from './referralAPI';
import {walletAPI} from './walletAPI';

const rootAPIMiddleware = [
  authAPI.middleware,
  profileAPI.middleware,
  walletAPI.middleware,
  productsAPI.middleware,
  referralAPI.middleware
];

export default rootAPIMiddleware;
