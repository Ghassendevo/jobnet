// src/app/store.ts

import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";
const store = configureStore({
  reducer: {
    register: registerReducer, // Add your "register" slice reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
