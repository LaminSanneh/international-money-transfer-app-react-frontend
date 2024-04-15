import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../constants';
import { authHeader } from './authSlice';

const initialState = {
  transactions: [],
  status: 'idle',
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await axios.get(`${API_URL}/api/transactions`, {headers: authHeader()});
    return response.data;
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionData) => {
    const response = await axios.post(`${API_URL}/api/transactions`, transactionData);
    return response.data;
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    updateTransactionStatus(state, action) {
      const { id, status } = action.payload;
      const existingTransaction = state.transactions.find((transaction) => transaction.id === id);
      if (existingTransaction) {
        existingTransaction.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addDefaultCase((state, action) => {})
  }
});

export const { updateTransactionStatus } = transactionSlice.actions;
export default transactionSlice.reducer;
