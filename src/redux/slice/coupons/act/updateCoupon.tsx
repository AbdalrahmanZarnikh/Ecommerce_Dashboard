import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const updateCoupon = createAsyncThunk(
    "coupons/update",
    async (info:{id:string,data:any}, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
       const token = localStorage.getItem("token");
      const res = await axios.put(`/api/coupons/${info.id}`, info.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

        toast.success("coupon updated successfully")
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default updateCoupon