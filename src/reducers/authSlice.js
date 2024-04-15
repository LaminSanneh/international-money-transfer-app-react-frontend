import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../constants';

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("userAuthDataObject"));
  if (user) {
    // return {};
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}

const user = JSON.parse(localStorage.getItem("userAuthDataObject"));

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    // TODO: Consider moving the axios api call to a service?
    const response = await axios.post(`${API_URL}/api/auth/login`, userData);
    localStorage.setItem("userAuthDataObject", JSON.stringify(response.data));
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userAuthDataObject");
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = 'loading';
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [loginUser.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
