import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserType {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: UserType | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {setUser, setToken, logout} = authSlice.actions;

export default authSlice.reducer;
