import { configureStore } from '@reduxjs/toolkit';
import transferReducer from './reducers/transferSlice';
import transactionReducer from './reducers/transactionSlice';
import authReducer from './reducers/authSlice';

export default configureStore({
  reducer: {
    transactions: transactionReducer,
    transfer: transferReducer,
    auth: authReducer,
  },
});
