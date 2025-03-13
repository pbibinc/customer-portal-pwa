import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "../../types/UserType";
import {useEffect} from "react";

type UserState = {
  user: UserType | null;
  rememberMe: boolean;
  token: string | null;
};

const initialState: UserState = {user: null, rememberMe: false, token: null};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.rememberMe = false;
      state.token = null;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
  },
});

export const {setUser, setToken, logOut, setRememberMe} = userSlice.actions;

export {userSlice};
