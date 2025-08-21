import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    toggleTheme: (state) => {
      return state === "dark" ? "light" : "dark";
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
