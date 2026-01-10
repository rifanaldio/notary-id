import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import regionReducer from './regionSlice';
import notaryReducer from './notarySlice';
import authReducer from './authSlice';
import consultationReducer from './consultationSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    region: regionReducer,
    notary: notaryReducer,
    auth: authReducer,
    consultation: consultationReducer
  },
  devTools: true
});

export default store;

export const AppDispatch = store.dispatch;
export const RootState = store.getState;

