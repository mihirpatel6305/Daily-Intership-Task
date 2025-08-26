import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "../features/usersSlice";

const store = configureStore({
  reducer: { users: usersReducers },
});
export default store;
