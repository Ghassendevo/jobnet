// src/features/counter/counterSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface job {
  fullname: string;
  title: string;
  budgetFrom: string;
  budgetTo: string;
  bids: number;
  description: string;
  bid: [];
  star: string;
  categorie: string;
  _id: string;
  date: Date;
  __v: number;
}

const initialState: job[] = [];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    post: (state, action: PayloadAction<job>) => {
      state.push(action.payload);
    },
  },
});

export const { post } = postSlice.actions;
export default postSlice.reducer;
