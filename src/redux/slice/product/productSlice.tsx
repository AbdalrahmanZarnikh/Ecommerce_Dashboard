import { createSlice } from "@reduxjs/toolkit";

// Thunks
import addProduct from "./act/addProduct";
import deleteProduct from "./act/deleteProduct";
import getAllProducts from "./act/getAllProducts";
import updateProduct from "./act/updateProduct";
import getProductsSearch from "./act/getProductsSearch";

// Types
export interface TRecord {
  _id?: string;
  title: string;
  image?: { url: string; public_id: string };
  images?: { url: string; public_id: string }[] | undefined;
  description?: string;
  price: number;
  category: { _id: string; name: string } | undefined;
  brand: { _id: string; name: string } | undefined;
  quantity: number;
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
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(getProductsSearch.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getProductsSearch.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getProductsSearch.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records.push(action.payload);
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.map((record) =>
        record._id === action.payload._id ? action.payload : record
      );
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.filter(
        (item) => item._id !== action.payload
      );
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;

export { getAllProducts, addProduct, updateProduct, deleteProduct ,getProductsSearch};
