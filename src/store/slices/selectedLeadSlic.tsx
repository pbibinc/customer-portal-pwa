import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "..";

type selectedLead = {
  lead: any | null;
};

const initialState: selectedLead = {
  lead: null,
};

const selectedLeadSlice = createSlice({
  name: "selectedLead",
  initialState,
  reducers: {
    setSelectedLead: (state, action: PayloadAction<any>) => {
      state.lead = action.payload;
    },
  },
});

export const {setSelectedLead} = selectedLeadSlice.actions;

export {selectedLeadSlice};
