import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      if (action?.payload) {
        return action.payload;
      }
      return;
    },
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
