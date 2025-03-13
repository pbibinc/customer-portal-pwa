import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {setLead} from "./leadSlice";

interface User {
  id: number;
  name: string;
  email: string;
}

interface FetchUserAndLeadParams {
  token: string;
  user: User;
}

export const fetchUserAndLead = createAsyncThunk<
  {lead: any}, // Return type
  FetchUserAndLeadParams, // Thunk argument type
  {rejectValue: string} // Rejected value type
>(
  "user/fetchUserAndLead",
  async ({token, user}, {dispatch, rejectWithValue}) => {
    try {
      // Fetch lead data using the user ID and token
      const leadResponse = await axios.get(`/api/lead-data/${user.id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      const lead = leadResponse.data;
      dispatch(setLead(lead));

      return {lead};
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);
