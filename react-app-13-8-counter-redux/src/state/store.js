import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../feature/counterSlice";
import themeReducer from "../feature/themeSlice";

export const store = configureStore({
  reducer: { count: counterReducer, theme: themeReducer },
});
