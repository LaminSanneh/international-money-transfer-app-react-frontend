import { configureStore } from '@reduxjs/toolkit';
import transferReducer from './reducers/transferSlice';

export default configureStore({
  reducer: {
    transfer: transferReducer,
  },
});
