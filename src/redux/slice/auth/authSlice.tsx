import {  createSlice } from "@reduxjs/toolkit";


// Thunks 

import Auth from "./act/Auth";
import toast from "react-hot-toast";


// Types

type TState = {
  info:any
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;

};

// State
const initialState: TState = {
  info:null,
  isLoading: "Idle",
  error: null,
  
};





// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(Auth.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(Auth.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      localStorage.setItem("token",action.payload.token)
      state.info=action.payload.data;
      localStorage.setItem("name",action.payload.data.name)
    });
    builder.addCase(Auth.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
      toast.error(state.error || "Network Error")
    });
  }
});

export default authSlice.reducer;

export { Auth };
