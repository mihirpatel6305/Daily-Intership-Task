import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/ProductSlice";
import cartReducer from "../feature/CartSlice";

const store = configureStore({
  reducer: { products: productReducer, cart: cartReducer },
});

export default store;
