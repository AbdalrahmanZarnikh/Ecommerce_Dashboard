import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteBrand = createAsyncThunk(
    "brands/delete",
    async (id:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const token=localStorage.getItem("token");
        const res = await axios.delete(
          `/api/brands/${id}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        console.log(res.data)
  
        return id;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default deleteBrand