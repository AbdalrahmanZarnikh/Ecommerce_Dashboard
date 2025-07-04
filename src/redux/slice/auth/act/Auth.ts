import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Auth = createAsyncThunk(
    "auth",
    async (data:any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.post(
          "/api/auth/login",data
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data.message);
        }
      }
    }
  );

  export default Auth