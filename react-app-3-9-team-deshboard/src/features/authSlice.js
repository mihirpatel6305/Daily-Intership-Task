import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", user: {} },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setToken, clearToken, setUser } = authSlice.actions;
export default authSlice.reducer;
