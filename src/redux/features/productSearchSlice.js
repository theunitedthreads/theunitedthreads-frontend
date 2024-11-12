import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

const productSearchSlice = createSlice({
  name: "product-search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchTerm = action.payload;
    },

    clearSearch: (state) => {
      state.searchTerm = "";
    },
  },
});

export const { setSearch, clearSearch } = productSearchSlice.actions;

export default productSearchSlice.reducer;
