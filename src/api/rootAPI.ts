import {authAPI} from './auth/authAPI';
import {productsAPI} from './productsAPI';
import {profileAPI} from './profileAPI';
import {walletAPI} from './walletAPI';

const rootAPIMiddleware = [
  authAPI.middleware,
  profileAPI.middleware,
  walletAPI.middleware,
  productsAPI.middleware,
];

export default rootAPIMiddleware;
