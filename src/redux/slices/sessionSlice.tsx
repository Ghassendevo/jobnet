import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sessionData {
  data: {
    city?: string;
    description?:string;
    skill?:string;
    fullname: string;
    email: string;
    password: string;
    phone: string;
    username: string;
    _id: string;
  };
  loggedin: boolean;
}

const initialState: sessionData = {
  data: {
    fullname: "",
    city:"",
    description:"",
    skill:"",
    email: "",
    password: "",
    phone: "",
    username: "",
    _id: "",
  },
  loggedin: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        data: {
          fullname: string;
          email: string;
          password: string;
          phone: string;
          username: string;
          _id: string;
        };
        loggedin: boolean;
      }>
    ) => {
      state.data = action.payload.data;
      state.loggedin = action.payload.loggedin;
    },
    logout: (state, action: PayloadAction<sessionData>) => {
      state = initialState;
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
