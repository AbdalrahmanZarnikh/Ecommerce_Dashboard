import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCouponsSearch = createAsyncThunk(
    "coupons/getBrandsSearch",
    async (term:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const token=localStorage.getItem("token")
        const res = await axios.get(
          `/api/coupons?keyword=${term}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
        );
  
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default getCouponsSearch