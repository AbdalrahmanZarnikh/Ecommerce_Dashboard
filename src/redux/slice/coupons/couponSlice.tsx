import { createSlice } from "@reduxjs/toolkit";

// Thunks
import addCoupon from "./act/addCoupon";
import getAllCoupons from "./act/getCoupons";
import updateCoupon from "./act/updateCoupon";
import deleteCoupon from "./act/deleteCoupon";
import getCouponsSearch from "./act/getCouponsSearch";

// Types
export interface TRecord {
  _id?: string;
  name: string;
  expire: string;
  discount: number;
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
const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCoupons.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllCoupons.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getAllCoupons.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(getCouponsSearch.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getCouponsSearch.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getCouponsSearch.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addCoupon.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addCoupon.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records.push(action.payload);
    });
    builder.addCase(addCoupon.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateCoupon.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateCoupon.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.map((record) =>
        record._id === action.payload._id ? action.payload : record
      );
    });
    builder.addCase(updateCoupon.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteCoupon.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteCoupon.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.filter(
        (item) => item._id !== action.payload
      );
    });
    builder.addCase(deleteCoupon.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  },
});

export default couponSlice.reducer;

export { getAllCoupons, addCoupon, deleteCoupon, updateCoupon ,getCouponsSearch};
