import storage from "redux-persist/lib/storage";
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";

import {tabSlice} from "./slices/tabSlice";
import {userSlice} from "./slices/userSlice";
import {filterSlice} from "./slices/filterSlice";
import {paymentSlice} from "./slices/paymentSlice";
import {firstLaunchSlice} from "./slices/firstLaunchSlice";
import {verificationSlice} from "./slices/verificationSlice";
import {alertSlice} from "./slices/alertSlice";
import {leadSlice} from "./slices/leadSlice";
import {selectedLeadSlice} from "./slices/selectedLeadSlic";
import {policyDetailSlice} from "./slices/policyDetailSlice";

const rootReducer = combineReducers({
  tabSlice: tabSlice.reducer,
  userSlice: userSlice.reducer,
  filterSlice: filterSlice.reducer,
  paymentSlice: paymentSlice.reducer,
  firstLaunchSlice: firstLaunchSlice.reducer,
  verificationSlice: verificationSlice.reducer,
  alertSlice: alertSlice.reducer,
  leadSlice: leadSlice.reducer,
  selectedLeadSlice: selectedLeadSlice.reducer,
  policyDetailSlice: policyDetailSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "tabSlice",
    "userSlice",
    "cartSlice",
    "wishlistSlice",
    "promocodeSlice",
    "firstLaunchSlice",
    "verificationSlice",
    "alertSlice",
    "leadSlice",
    "selectedLeadSlice",
    "policyDetailSlice",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
