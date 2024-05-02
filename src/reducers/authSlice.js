import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constants";

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("userAuthDataObject"));
  if (user) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    // TODO: Consider moving the axios api call to a service?
    const response = await axios.post(`${API_URL}/api/auth/login`, userData);
    localStorage.setItem("userAuthDataObject", JSON.stringify(response.data));
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, {dispatch}) => {
    // TODO: Consider moving the axios api call to a service?
      const response = await axios.get(`${API_URL}/api/auth/logout`, {
        headers: authHeader(),
      });
      dispatch(clearUserData());

      return response.data
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUserData(state) {
      localStorage.removeItem("userAuthDataObject");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addDefaultCase((state, action) => {})
  },
  // extraReducers: {
  //   [registerUser.pending]: (state) => {
  //     state.status = "loading";
  //   },
  //   [registerUser.fulfilled]: (state, action) => {
  //     state.status = "succeeded";
  //     state.user = action.payload;
  //     state.isAuthenticated = true;
  //   },
  //   [registerUser.rejected]: (state, action) => {
  //     state.status = "failed";
  //     state.error = action.error.message;
  //   },
  //   [loginUser.pending]: (state) => {
  //     state.status = "loading";
  //   },
  //   [loginUser.fulfilled]: (state, action) => {
  //     state.status = "succeeded";
  //     state.user = action.payload;
  //     state.isAuthenticated = true;
  //   },
  //   [loginUser.rejected]: (state, action) => {
  //     state.status = "failed";
  //     state.error = action.error.message;
  //   },
  //   [logoutUser.pending]: (state) => {
  //     state.status = "loading";
  //   },
  //   [logoutUser.fulfilled]: (state) => {
  //     state.status = "succeeded";
  //     state.user = null;
  //     state.isAuthenticated = false;
  //   },
  //   [logoutUser.rejected]: (state, action) => {
  //     state.status = "failed";
  //     state.error = action.error.message;
  //   },
  // },
});

export const { setUser, clearUserData } = authSlice.actions;
export default authSlice.reducer;
