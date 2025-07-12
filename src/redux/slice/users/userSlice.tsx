import { createSlice } from "@reduxjs/toolkit";

// Thunks
import addUser from "./act/addUser";
import deleteUser from "./act/deleteUser";
import getAllUsers from "./act/getAllUsers";
import updateUser from "./act/updateUser";
import getUsersSearch from "./act/getUsersSearch";

// Types
export interface TRecord {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  addresses: [
    {
      phone: string;
      details: string;
      city: string;
    }
  ];
}

type TState = {
  records: TRecord[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

// State
const initialState: TState = {
  records: [],
  isLoading: "Idle",
  error: null,
};

// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(getUsersSearch.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getUsersSearch.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getUsersSearch.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.map((record) =>
        record._id === action.payload._id ? action.payload : record
      );
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.filter(
        (item) => item._id !== action.payload
      );
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  },
});

export default userSlice.reducer;

export { getAllUsers, addUser, updateUser, deleteUser ,getUsersSearch };
