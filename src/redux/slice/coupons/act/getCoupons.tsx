import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllCoupons = createAsyncThunk(
    "coupons/all",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const token=localStorage.getItem("token")
        const res = await axios.get(
          "/api/coupons",{
            headers:{
                Authorization:`Bearer ${token}`
            }
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

  export default getAllCoupons