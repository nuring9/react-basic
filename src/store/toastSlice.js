import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

const toastsSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toasts.push(action.payload);
    },
    removeToasts: (state, action) => {
      state.toasts = state.toasts.filter((toast) => {
        return toast.id !== action.payload; // payload으로 받아오기 때문
      });
    },
  },
});

export const { addToast, removeToasts } = toastsSlice.actions;

export default toastsSlice.reducer;
