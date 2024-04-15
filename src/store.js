import { configureStore } from '@reduxjs/toolkit';
import transferReducer from './reducers/transferSlice';
import transactionReducer from './reducers/transactionSlice';

export default configureStore({
  reducer: {
    transactions: transactionReducer,
    transfer: transferReducer,
  },
});
