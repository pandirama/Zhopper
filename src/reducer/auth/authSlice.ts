import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  userInfo: null,
  isRemembered: false,
  user: null,
};

const slice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setInitialize: (state, action) => {
      const {isAuthenticated, user} = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.userInfo = user;
      state.isInitialized = true;
    },
    setIsRemembered: (state, action) => {
      const {isRemembered, user} = action.payload;
      state.isRemembered = isRemembered;
      state.user = user;
    },
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logout: state => {
      state.isInitialized = true;
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const authAction = slice.actions;
export default slice.reducer;
