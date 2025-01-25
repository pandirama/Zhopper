import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userProfile: null,
  referralLink: 'https://zhopper2u.com/',
};

const slice = createSlice({
  name: 'profileReducer',
  initialState,
  reducers: {
    setReferralLink: (state, action) => {
      state.referralLink = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const profileAction = slice.actions;
export default slice.reducer;
