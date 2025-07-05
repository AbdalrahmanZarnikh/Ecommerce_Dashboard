import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addProduct = createAsyncThunk(
  "products/add",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export default addProduct;
