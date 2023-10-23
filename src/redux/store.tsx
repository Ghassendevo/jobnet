// src/app/store.ts

import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";
import sessionReducer from "./slices/sessionSlice";
import postReducer from "./slices/jobsSlice";
const store = configureStore({
  reducer: {
    register: registerReducer,
    session: sessionReducer, // Add your "register" slice reducer here
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
