import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (action.payload) {
        const existingProduct = state.products.find(
          (product) => product.id === action.payload.id
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          state.products.push({ ...action.payload, quantity: 1 });
        }
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find((p) => p.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find((p) => p.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const cartActions = CartSlice.actions;
export default CartSlice.reducer;
