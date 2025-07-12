import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProductsSearch = createAsyncThunk(
    "products/getProductsSearch",
    async (term:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          `/api/products?keyword=${term}`
        );
  
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default getProductsSearch