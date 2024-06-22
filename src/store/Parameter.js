import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  q: "world",
  pageSize: 100,
  page: 1,
};

const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    setQ(state, action) {
      state.q = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const paramsActions = paramsSlice.actions;

export default paramsSlice.reducer;
