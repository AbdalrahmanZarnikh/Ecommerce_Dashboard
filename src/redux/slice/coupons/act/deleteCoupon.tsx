import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const deleteCoupon = createAsyncThunk(
    "coupons/delete",
    async (id:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const token=localStorage.getItem("token");
        const res = await axios.delete(
          `/api/coupons/${id}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
         
        toast.success("coupon deleted successfully")
        return id;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default deleteCoupon