"use client";
import { useGetQuoteProductsQuery } from "@/redux/api/Products Page Api/quoteProductsApi";
import QuoteProductCard from "./QuoteProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton/ProductCardSkeleton";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
import { QuoteProductsPageContext } from "@/context/QuoteProductsPageContext";
import { useContext, useState } from "react";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

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

export default function ProductsContainer() {
  const { selectedCategory, selectedSize, searchText } = useContext(
    QuoteProductsPageContext,
  );

  // ============ Query ===============
  const query = {};
  query["category"] = selectedCategory || "";
  query["size"] = selectedSize || "";
  query["searchTerm"] = searchText || "";

  // ================= Pagination ===============
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  query["page"] = currentPage;
  query["limit"] = pageSize;

  // =========== Get Products api handler ============
  const { data: quoteProductsRes, isLoading } = useGetQuoteProductsQuery(query);
  const quoteProducts = quoteProductsRes?.data || [];
  const meta = quoteProductsRes?.meta || {};

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

  // Show empty if no product found
  if (!quoteProducts?.length) {
    return <EmptyContainer className="flex-center h-[65vh]" />;
  }

  return (
    <>
      <motion.div
        variants={fadeUpVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 gap-y-7 md:grid-cols-2 md:gap-7 2xl:grid-cols-3"
      >
        {quoteProducts?.map((product) => (
          <motion.div
            key={product?._id}
            variants={fadeUpVariants}
            className="h-full"
          >
            <QuoteProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

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
