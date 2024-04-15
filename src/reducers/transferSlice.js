import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const transferSlice = createSlice({
  name: 'transfer',
  initialState: {
    transferDetails: {},
    loading: false,
    error: null,
  },
  reducers: {
    initiateTransferSuccess: (state, action) => {
      // Handle success action
    },
    setTransferDetails: (state, action) => {
      state.transferDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { initiateTransferSuccess, setTransferDetails, setLoading, setError } = transferSlice.actions;

export const initiateTransfer = ({ recipient, amount, currency }) => async (dispatch) => {
  try {
    const response = await axios.post('/api/transfer', { recipient, amount, currency });
    dispatch(initiateTransferSuccess(response.data));
  } catch (error) {
    // Handle error
  }
};

export const selectTransferDetails = (state) => state.transfer.transferDetails;
export const selectLoading = (state) => state.transfer.loading;
export const selectError = (state) => state.transfer.error;

export default transferSlice.reducer;
