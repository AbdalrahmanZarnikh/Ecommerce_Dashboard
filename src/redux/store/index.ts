import { configureStore } from "@reduxjs/toolkit";

// Slices

import categorySlice from "../slice/categories/categorySlice";
import authSlice from "../slice/auth/authSlice"
import brandSlice from "../slice/brands/brandSlice"
import userSlice from "../slice/users/userSlice"
import productSlice from "../slice/product/productSlice"
import orderSlice from "../slice/orders/orderSlice"
import couponSlice from "../slice/coupons/couponSlice"

export const store = configureStore({
  reducer: {
    categorySlice,
    authSlice,
    brandSlice,
    userSlice,
    productSlice,
    orderSlice,
    couponSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
