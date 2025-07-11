import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const addCoupon = createAsyncThunk(
  "coupons/add",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/coupons", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("coupon add successfully")
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export default addCoupon;
