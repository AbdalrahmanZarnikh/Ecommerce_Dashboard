import {  createSlice } from "@reduxjs/toolkit";


// Thunks 
import deleteBrand from "./act/deleteBrand"; 
import getAllBrands from "./act/getAllBrands"
import  updateBrand from "./act/updateBrand"
import  addBrand from "./act/addBrand"

// Types
 interface TRecord {
  _id?: string;
  name: string;
  image?: {url:string,public_id:string};
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
const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBrands.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllBrands.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getAllBrands.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addBrand.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addBrand.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records.push(action.payload);
    });
    builder.addCase(addBrand.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateBrand.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.map((record) =>
        record._id === action.payload._id ? action.payload : record
      );
    });
    builder.addCase(updateBrand.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteBrand.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records=state.records.filter((item)=>item._id!==action.payload);
    });
    builder.addCase(deleteBrand.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  }
});

export default brandSlice.reducer;

export { getAllBrands,addBrand,updateBrand,deleteBrand };
