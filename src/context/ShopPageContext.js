"use client";

import { createContext, useState } from "react";

export const ShopPageContext = createContext(null);

export default function ShopPageProvider({ children }) {
  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [searchText, setSearchText] = useState("");

  console.log(searchText);

  return (
    <ShopPageContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedSize,
        setSelectedSize,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </ShopPageContext.Provider>
  );
}
