import { configureStore } from "@reduxjs/toolkit";
import toastsReducer from "./toastSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    toast: toastsReducer,
    auth: authReducer,
  },
});
