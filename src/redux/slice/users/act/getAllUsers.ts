import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllUsers = createAsyncThunk(
    "users/all",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const token=localStorage.getItem("token")
        const res = await axios.get(
          "/api/users",{
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

  export default getAllUsers