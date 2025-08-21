import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../features/citySlice";
import themeReducer from "../features/themeSlice";

const store = configureStore({
  reducer: { city: cityReducer, theme: themeReducer },
});

export default store;
