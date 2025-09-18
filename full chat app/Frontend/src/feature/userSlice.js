import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    onlineUsers: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    setOnlineUser: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setUser, clearUser, setOnlineUser } = userSlice.actions;
export default userSlice.reducer;
