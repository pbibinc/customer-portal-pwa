import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type LeadState = {
  lead: any | null;
};

const initialState: LeadState = {lead: null};

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    setLead: (state, action: PayloadAction<any>) => {
      state.lead = action.payload;
    },
    resetLead: (state) => {
      state.lead = null;
    },
  },
});

export const {setLead, resetLead} = leadSlice.actions;

export {leadSlice};
