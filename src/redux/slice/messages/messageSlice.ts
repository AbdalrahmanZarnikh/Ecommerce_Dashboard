import { createSlice } from "@reduxjs/toolkit";

// Thunks
import getAllMessages from "./act/getAllMessages";
import deleteMessage from "./act/deleteMessage";
import getMessagesSearch from "./act/getMessagesSearch";

// Types
export interface TRecord {
  _id?: string;
  user: {
    name: string;
  };
  message: string;
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
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMessages.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllMessages.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
      localStorage.setItem("countMessage", state.records.length.toString());
    });
    builder.addCase(getAllMessages.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });

    builder.addCase(getMessagesSearch.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getMessagesSearch.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getMessagesSearch.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteMessage.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem("countMessage", state.records.length.toString());
    });
    builder.addCase(deleteMessage.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  },
});

export default messageSlice.reducer;

export { getAllMessages, deleteMessage, getMessagesSearch };
