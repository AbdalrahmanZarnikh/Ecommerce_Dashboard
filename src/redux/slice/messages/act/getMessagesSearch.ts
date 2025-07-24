import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getMessagesSearch = createAsyncThunk(
    "messages/getMessagesSearch",
    async (term:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const token=localStorage.getItem("token")
        const res = await axios.get(
          `/api/messages?keyword=${term}`,{
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

  export default getMessagesSearch