import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateCategory = createAsyncThunk(
    "categories/update",
    async (info:{id:string,data:any}, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
       const token = localStorage.getItem("token");
      const res = await axios.put(`/api/categories/${info.id}`, info.data, {
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

  export default updateCategory