import {combineReducers, Reducer} from '@reduxjs/toolkit';
import {createAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import authReducer from './auth/authSlice';
import profileReducer from './profile/profileSlice';
import {authAPI} from '../api/auth/authAPI';
import {profileAPI} from '../api/profileAPI';
import {walletAPI} from '../api/walletAPI';
import {productsAPI} from '../api/productsAPI';
import {referralAPI} from '../api/referralAPI';
import { newsAPI } from '../api/newsAPI';

export const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const authReducerPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whiteList: ['finishGetStarted', 'isShowCongratsScreen'],
};

export const combinedReducer = combineReducers({
  authReducer: persistReducer(authReducerPersistConfig, authReducer),
  [authAPI.reducerPath]: authAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
  profileReducer: persistReducer(authReducerPersistConfig, profileReducer),
  [walletAPI.reducerPath]: walletAPI.reducer,
  [productsAPI.reducerPath]: productsAPI.reducer,
  [referralAPI.reducerPath]: referralAPI.reducer,
  [newsAPI.reducerPath]: newsAPI.reducer,
});

export const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState;
  }

  return combinedReducer(state, action);
};

export const RESET_STATE_ACTION_TYPE = 'resetState';
export const resetStateAction = createAction(RESET_STATE_ACTION_TYPE, () => {
  return {payload: null};
});

export type RootState = ReturnType<typeof combinedReducer>;
