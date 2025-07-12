import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCategoriesSearch = createAsyncThunk(
    "categories/getCategoriesSearch",
    async (term:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          `/api/categories?keyword=${term}`
        );
  
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default getCategoriesSearch