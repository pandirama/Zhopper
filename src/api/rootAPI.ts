import {authAPI} from './auth/authAPI';
import {profileAPI} from './profileAPI';

const rootAPIMiddleware = [authAPI.middleware, profileAPI.middleware];

export default rootAPIMiddleware;
