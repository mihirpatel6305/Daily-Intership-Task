import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  filteredProducts: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.products = action.payload;
    },
    applyFilter: (state, action) => {
      const filterObj = action.payload;

      const maxPrice = filterObj?.price?.max ?? Infinity;
      const minPrice = filterObj?.price?.min ?? 0;

      const filteredPro = state.products.filter((product) => {
        const priceFilter =
          product.price >= minPrice && product.price <= maxPrice;

        const categoryFilter = filterObj?.category?.length
          ? filterObj.category.includes(product.category)
          : true;

        const reviewFilter = filterObj?.review
          ? product.rating.rate >= filterObj.review
          : true;

        return priceFilter && categoryFilter && reviewFilter;
      });
      if (filteredPro.length > 0) {
        state.filteredProducts = filteredPro;
      } else {
        alert("There is No item with this Filter");
      }
    },

    removeFilter: (state) => {
      state.filteredProducts = [];
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
