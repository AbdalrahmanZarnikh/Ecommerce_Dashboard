import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllCategories = createAsyncThunk(
    "categories/all",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          "/api/categories"
        );
  
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default getAllCategories