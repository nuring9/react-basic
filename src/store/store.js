import { configureStore } from "@reduxjs/toolkit";
import toastsReducer from "./toastSlice";

export const store = configureStore({
  reducer: {
    toast: toastsReducer,
  },
});
