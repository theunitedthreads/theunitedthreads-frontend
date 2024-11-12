"use client";

import { createContext, useState } from "react";

export const QuoteProductsPageContext = createContext(null);

export default function QuoteProductsPageProvider({ children }) {
  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [searchText, setSearchText] = useState("");

  return (
    <QuoteProductsPageContext.Provider
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
    </QuoteProductsPageContext.Provider>
  );
}
