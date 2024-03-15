import { createSlice } from '@reduxjs/toolkit';

export const transferSlice = createSlice({
  name: 'transfer',
  initialState: {
    transferDetails: {},
    loading: false,
    error: null,
  },
  reducers: {
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

export const { setTransferDetails, setLoading, setError } = transferSlice.actions;

export const selectTransferDetails = (state) => state.transfer.transferDetails;
export const selectLoading = (state) => state.transfer.loading;
export const selectError = (state) => state.transfer.error;

export default transferSlice.reducer;
