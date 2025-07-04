import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addCategory = createAsyncThunk(
  "categories/add",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/categories", data, {
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

export default addCategory;
