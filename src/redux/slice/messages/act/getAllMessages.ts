import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllMessages = createAsyncThunk(
    "messages/all",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const token=localStorage.getItem("token")
        const res = await axios.get(
          "/api/messages",{
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

  export default getAllMessages