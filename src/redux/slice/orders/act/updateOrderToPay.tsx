import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateOrderToPay = createAsyncThunk(
    "categories/update",
    async (id:any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
       const token = localStorage.getItem("token");
      const res = await axios.put(`/api/orders/${id}/pay`,{}, {
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

  export default updateOrderToPay