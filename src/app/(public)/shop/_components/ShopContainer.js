"use client";

import { useContext, useState } from "react";
import ShopProductsCard from "./ShopProductsCard";
import { ShopPageContext } from "@/context/ShopPageContext";
import { useGetShopProductsQuery } from "@/redux/api/Shop Page Api/shopApi";
import ProductCardSkeleton from "@/components/ProductCardSkeleton/ProductCardSkeleton";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
import { motion } from "framer-motion";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownNarrowWide } from "lucide-react";
import { Check } from "lucide-react";

// Motion Variants
const fadeUpVariants = {
  initial: {
    y: 10,
    opacity: 0,
    filter: "blur(2px)",
  },

  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      stiffness: 190,
      damping: 35,
      mass: 0.3,
      staggerChildren: 0.09,
      when: "beforeChildren",
    },
  },
};

export default function ShopContainer() {
  const { selectedCategory, selectedSize, searchText } =
    useContext(ShopPageContext);
  const [selectedSortMethod, setSelectedSortMethod] = useState("");

  // ============ Query ===============
  const query = {};
  query["category"] = selectedCategory || "";
  query["size"] = selectedSize || "";
  query["searchTerm"] = searchText || "";
  query["sort"] = selectedSortMethod || "";

  // ================= Pagination ===============
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  query["page"] = currentPage;
  query["limit"] = pageSize;

  // =========== Shop product api handler ============
  const { data: productsRes, isLoading } = useGetShopProductsQuery(query);
  const products = productsRes?.data || [];
  const meta = productsRes?.meta || {};

  // =============== Function to sort products =============
  const handleSort = (sortMethod) => {
    if (selectedSortMethod === sortMethod) {
      return setSelectedSortMethod("");
    }

    setSelectedSortMethod(sortMethod);
  };

  // Show skeleton for product loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex-center-between">
        {/* Search found */}
        <div>
          <p className="font-medium">
            {products?.length} product(s) found{" "}
            {searchText && <span>for &quot;{searchText}&quot;</span>}
          </p>
        </div>

        {/* Sort by button */}
        <DropdownMenu>
          {/* <div className="flex justify-end"> */}
          <DropdownMenuTrigger className="rounded-full border border-primary-black/75 p-2.5">
            <ArrowDownNarrowWide size={20} />
          </DropdownMenuTrigger>
          {/* </div> */}
          <DropdownMenuContent
            className="rounded-lg border border-primary-black lg:w-[180px]"
            align="end"
          >
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSort("price")}>
              Price{" "}
              {selectedSortMethod === "price" && (
                <Check size={16} className="ml-2" />
              )}
            </DropdownMenuItem>

            {/* <DropdownMenuItem onClick={() => handleSort("createdAt")}>
              Newly Added
              {selectedSortMethod === "createdAt" && (
                <Check size={16} className="ml-2" />
              )}
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Products */}
      {products?.length > 0 ? (
        <motion.div
          variants={fadeUpVariants}
          initial="initial"
          animate="animate"
          className="mt-6 grid grid-cols-1 gap-y-7 md:grid-cols-2 md:gap-7 2xl:grid-cols-3"
        >
          {products?.map((product) => (
            <motion.div variants={fadeUpVariants} key={product?._id}>
              <ShopProductsCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyContainer className="flex-center h-[65vh]" />
      )}

      <div className="ml-auto mt-20 w-max">
        <CustomPagination
          total={meta?.total}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}
