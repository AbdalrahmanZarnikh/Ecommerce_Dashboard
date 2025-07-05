import {  createSlice } from "@reduxjs/toolkit";


// Thunks 
import addCategory from "./act/addCategory"
import deleteCategory from "./act/deleteCategory"
import getAllCategories from "./act/getAllCategories"
import  updateCategory from "./act/updateCategory"

// Types
export interface TRecord {
  _id?: string;
  name: string;
  image?: {url:string,public_id:string};
}

type TState = {
  categories: TRecord[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

// State
const initialState: TState = {
  categories: [],
  isLoading: "Idle",
  error: null,
};




// Slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.categories = action.payload;
    });
    builder.addCase(getAllCategories.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.categories.push(action.payload);
    });
    builder.addCase(addCategory.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.categories = state.categories.map((record) =>
        record._id === action.payload._id ? action.payload : record
      );
    });
    builder.addCase(updateCategory.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.categories=state.categories.filter((item)=>item._id!==action.payload);
    });
    builder.addCase(deleteCategory.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  }
});

export default categorySlice.reducer;

export { getAllCategories,addCategory,updateCategory,deleteCategory };
