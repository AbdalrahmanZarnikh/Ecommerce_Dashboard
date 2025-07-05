import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllProducts = createAsyncThunk(
    "categories/all",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          "/api/products"
        );
  

        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default getAllProducts