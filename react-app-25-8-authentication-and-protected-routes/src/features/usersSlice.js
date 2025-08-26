import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      console.log("state>>", state);
      console.log("action>>", action);
    },
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
