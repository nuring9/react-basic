import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

const toastsSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {},
});

export default toastsSlice.reducer;
