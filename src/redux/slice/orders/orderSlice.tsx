import { createSlice } from "@reduxjs/toolkit";

// Thunks
import getAllOrders from "./act/getAllOrders";
import updateOrderToPay from "./act/updateOrderToPay";
import getOrdersSearch from "./act/getOrdersSearch";
// Types
export interface TRecord {
  _id?: string;
  cartItems: {
    product: {
      _id: string;
      title: string;
    };
    quantity: number;
    color?: string;
    price: number;
  }[];
  shippingAddress: { phone: string; city: string; details: string };
  taxPrice?: number;
  totalOrderPrice: number;
  user: { _id: string; name: string };
  paymentMethod: string;
  isPaid: boolean;
  paidAt: Date;
  hawalaCompany: string;
  hawalaCode: { url: string; public_id: string };
}

type TState = {
  orders: TRecord[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

// State
const initialState: TState = {
  orders: [],
  isLoading: "Idle",
  error: null,
};

// Slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.orders = action.payload;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(getOrdersSearch.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getOrdersSearch.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.orders = action.payload;
    });
    builder.addCase(getOrdersSearch.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });

    builder.addCase(updateOrderToPay.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateOrderToPay.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.orders = state.orders.map((record) =>
        record._id === action.payload._id ? action.payload : record
      );
    });
    builder.addCase(updateOrderToPay.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  },
});

export default orderSlice.reducer;

export { getAllOrders, updateOrderToPay ,getOrdersSearch};
