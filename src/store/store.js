import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import regionReducer from './regionSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    region: regionReducer
  },
  devTools: true
});

export default store;

export const AppDispatch = store.dispatch;
export const RootState = store.getState;

