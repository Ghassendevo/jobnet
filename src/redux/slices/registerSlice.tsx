// src/features/counter/counterSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  data: {
    fullname: string;
    email: string;
    password: string;
    phonenumber: string;
  };
}

const initialState: CounterState = {
  data: { fullname: "", email: "", password: "", phonenumber: "" },
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    register: (
      state,
      action: PayloadAction<{
        fullname: string;
        email: string;
        password: string;
        phonenumber: string;
      }>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { register } = registerSlice.actions;
export default registerSlice.reducer;
