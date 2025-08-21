import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: "city",
  initialState: "London",
  reducers: {
    changeCity: (state, action) => {
      return action.payload;
    },
  },
});

export const cityActions = citySlice.actions;
export default citySlice.reducer;
