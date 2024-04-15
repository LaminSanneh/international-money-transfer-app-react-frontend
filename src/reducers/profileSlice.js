import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  status: 'idle',
  error: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
