import { configureStore } from '@reduxjs/toolkit';
import fieldsReducer from './slices/fieldsSlice';
export const store = configureStore({
  reducer: {
    fields: fieldsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
