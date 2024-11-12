"use client";

import CustomSkeleton from "@/components/CustomSkeleton/CustomSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { QuoteProductsPageContext } from "@/context/QuoteProductsPageContext";
import { cn } from "@/lib/utils";
import {
  useGetQuoteCategoriesQuery,
  useGetQuoteSizesQuery,
} from "@/redux/api/Products Page Api/quoteProductsApi";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import { X } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { Loader } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

// motion variants
const fadeVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
  },
};

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export default function ProductFilters() {
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [sizeExpanded, setSizeExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const mobileFiltersRef = useRef(null);
  const [categoryIdFromSearchUrl, setCategoryIdFromSearchUrl] = useState(
    useSearchParams().get("category"),
  );

  // ============ Get size & category selector from context ============
  const {
    setSearchText,
    setSelectedCategory,
    setSelectedSize,
    selectedCategory,
    selectedSize,
  } = useContext(QuoteProductsPageContext);

  // Products filter api handlers
  const { data: categoriesRes, isLoading: isCategoriesLoading } =
    useGetQuoteCategoriesQuery();
  const categories = categoriesRes?.data || [];

  const { data: sizeRes, isLoading: isSizeLoading } = useGetQuoteSizesQuery();
  const sizes = sizeRes?.data || {};

  // Set search text w/ debouncing
  const handleSearch = useMemo(
    () =>
      debounce(() => {
        setSearchText(searchTerm);
      }, 500), // Hit search api after 500ms of typing
    [searchTerm],
  );

  // Use the debounced handleSearch whenever searchTerm or filters change
  useEffect(() => {
    handleSearch();

    return () => {
      handleSearch.cancel();
    };
  }, [searchTerm, handleSearch]);

  useEffect(() => {
    setSelectedCategory(categoryIdFromSearchUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryIdFromSearchUrl]);

  // Toggle filters on mobile version
  useOnClickOutside(mobileFiltersRef, () => setShowMobileFilters(false));

  return (
    <div className="w-full pb-10 lg:w-[25%] 2xl:w-[30%]">
      {/* Product search bar */}
      <div className="flex-center-between gap-x-4 lg:mb-8">
        <div className="relative w-[85%] lg:w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2"
            size={20}
          />
          <Input
            className="w-full rounded-3xl border border-primary-black/75 px-10 py-5 text-lg shadow-sm"
            placeholder="Search products..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className={cn(
            "block rounded-3xl border border-primary-black px-4 py-2 transition-none duration-500 ease-in-out-circ lg:hidden",
            showMobileFilters && "bg-primary-black text-white",
          )}
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* --------------- Desktop Version --------------- */}
      <div className="hidden lg:block">
        {/* Category Filter */}
        <div className="mt-4">
          <motion.div
            className="flex items-center justify-between"
            role="button"
            onClick={() => setCategoryExpanded(!categoryExpanded)}
          >
            <h3 className="mt-2 text-lg font-semibold">Category</h3>
            {categoryExpanded ? (
              <ChevronUp size={20} color="#000000" />
            ) : (
              <ChevronDown size={20} color="#000000" />
            )}
          </motion.div>

          {categoryExpanded && (
            <>
              {isCategoriesLoading ? (
                <CustomSkeleton
                  className={"mt-5 space-y-3"}
                  skeletonClass="w-full h-4 rounded-lg"
                  length={8}
                />
              ) : (
                <motion.div
                  className="my-5 flex w-full flex-col items-start gap-y-3 px-2"
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {categories?.map((category) => (
                    <div key={category?._id} className="relative w-full">
                      {(selectedCategory === category?._id ||
                        categoryIdFromSearchUrl === category?._id) && (
                        <X
                          role="button"
                          size={18}
                          className="absolute -left-8 top-1/2 -translate-y-1/2"
                          onClick={() => {
                            setSelectedCategory("");
                            setCategoryIdFromSearchUrl("");
                          }}
                        />
                      )}
                      <motion.button
                        className={cn(
                          "flex-center-between w-full gap-x-2 transition-all duration-300 ease-in-out hover:scale-[0.99] hover:text-primary-black/70",
                          (selectedCategory === category?._id ||
                            categoryIdFromSearchUrl === category?._id) &&
                            "font-extrabold",
                        )}
                        onClick={() => setSelectedCategory(category?._id)}
                      >
                        <p>{category.name}</p>
                        <p>{category.productCount}</p>
                      </motion.button>
                    </div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>

        {/* Size Filter */}
        <motion.div className="mt-8" layout>
          <motion.div
            className="flex items-center justify-between"
            role="button"
            onClick={() => setSizeExpanded(!sizeExpanded)}
            layout="position"
          >
            <h3 className="mt-2 text-lg font-semibold">Size</h3>
            {sizeExpanded ? (
              <ChevronUp size={20} color="#000000" />
            ) : (
              <ChevronDown size={20} color="#000000" />
            )}
          </motion.div>

          {isSizeLoading ? (
            <CustomSkeleton
              className={"mt-5 space-y-3"}
              skeletonClass="w-full h-4 rounded-lg"
              length={8}
            />
          ) : (
            <>
              {sizeExpanded && (
                <motion.div
                  className="my-5 flex w-full flex-col items-start gap-y-3 px-2"
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {SIZES?.map((size) => (
                    <div key={size} className="relative w-full">
                      {selectedSize === size && (
                        <X
                          role="button"
                          size={18}
                          className="absolute -left-8 top-1/2 -translate-y-1/2"
                          onClick={() => setSelectedSize("")}
                        />
                      )}

                      <motion.button
                        key={size}
                        className={cn(
                          "flex-center-between w-full gap-x-2 transition-all duration-300 ease-in-out hover:scale-[0.99] hover:text-primary-black/70",
                          selectedSize === size && "font-extrabold",
                        )}
                        onClick={() => setSelectedSize(size)}
                      >
                        <p>{size}</p>
                        <p>{sizes[size]?.productCount || 0}</p>
                      </motion.button>
                    </div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* --------------- Mobile Version --------------- */}
      <div
        className={cn(
          "scroll-hide fixed bottom-0 left-0 z-[999] h-[40vh] w-full overflow-auto rounded-t-2xl border border-primary-black/20 bg-white p-3 shadow-lg transition-all duration-300 ease-in-out-circ",
          showMobileFilters
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-[100vh] opacity-0",
        )}
        ref={mobileFiltersRef}
      >
        <div className="flex-center-between">
          <h3 className="text-lg font-semibold">Filters</h3>

          <X
            size={20}
            role="button"
            onClick={() => setShowMobileFilters(false)}
          />
        </div>

        <Separator className="mb-5 mt-2 w-full bg-primary-black" />

        {/* Categories */}
        <div>
          <h4 className="mb-2 font-bold">Categories</h4>

          {isCategoriesLoading ? (
            <div className="flex-center h-full">
              <Loader size={25} className="animate-spin" />
            </div>
          ) : (
            <div className="flex-center-start flex-wrap gap-3">
              {categories?.map((category) => (
                <button
                  key={category?._id}
                  className={cn(
                    "flex-center-between w-max gap-x-5 rounded-lg bg-lightGray px-4 py-2 text-sm font-medium text-primary-black",
                    selectedCategory === category?._id &&
                      "bg-primary-black text-white",
                  )}
                  onClick={() => {
                    if (selectedCategory === category?._id) {
                      setSelectedCategory("");
                    } else {
                      setSelectedCategory(category?._id);
                    }
                  }}
                >
                  <p>{category?.name}</p>
                  <p>{category?.productCount}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sizes */}
        <div className="mt-8">
          <h4 className="mb-2 font-bold">Sizes</h4>

          {isSizeLoading ? (
            <div className="flex-center h-full">
              <Loader size={25} className="animate-spin" />
            </div>
          ) : (
            <div className="flex-center-start flex-wrap gap-3">
              {SIZES?.map((size) => (
                <button
                  key={size}
                  className={cn(
                    "flex-center-between w-max gap-x-5 rounded-lg bg-lightGray px-4 py-2 text-sm font-medium text-primary-black",
                    selectedSize === size && "bg-primary-black text-white",
                  )}
                  onClick={() => {
                    if (selectedSize === size) {
                      setSelectedSize("");
                    } else {
                      setSelectedSize(size);
                    }
                  }}
                >
                  <p>{size}</p>
                  <p>{sizes[size]?.productCount || 0}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
