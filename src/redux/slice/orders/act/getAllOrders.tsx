import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllOrders = createAsyncThunk(
  "orders/all",
  async (filter: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const token = localStorage.getItem("token");
      if (filter !== "all") {
        const res = await axios.get(`/api/orders?isPaid=${filter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data.data;
      } else {
        const res = await axios.get(`/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data.data;
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export default getAllOrders;
