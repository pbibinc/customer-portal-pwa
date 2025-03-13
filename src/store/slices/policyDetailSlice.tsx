import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ActivePolicy {
  id: number;
  policy_number: string;
  expiration_date: string;
  effective_date: string;
  QuotationProduct?: {
    product: string;
  };
  carrier: string;
  market: string;
  status: string;
  GeneralLiabilty?: {
    damage_to_rented: string;
    each_occurence: string;
    gen_aggregate: string;
    medical_expenses: string;
    per_adv_injury: string;
    product_comp: string;
  };
}

type policyDetailState = {
  policyDetail: ActivePolicy | null;
};

const initialState: policyDetailState = {policyDetail: null};

const policyDetailSlice = createSlice({
  name: "policyDetail",
  initialState,
  reducers: {
    setPolicyDetail: (state, action: PayloadAction<any>) => {
      state.policyDetail = action.payload;
    },
    resetPolicyDetail: (state) => {
      state.policyDetail = null;
    },
  },
});

export const {setPolicyDetail, resetPolicyDetail} = policyDetailSlice.actions;
export {policyDetailSlice};
