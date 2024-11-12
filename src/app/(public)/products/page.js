import CommonPageHeader from "@/components/CommonPageHeader/CommonPageHeader";
import React from "react";
import ProductFilters from "./_components/ProductFilters";
import ProductsContainer from "./_components/ProductsContainer";
import QuoteProductsPageProvider from "@/context/QuoteProductsPageContext";

export const metadata = {
  title: "Custom Apparels",
  description: "Custom apparels page",
};

export default function ProductsPage() {
  return (
    <QuoteProductsPageProvider>
      <div>
        <CommonPageHeader
          pageTitle="Custom Apparels"
          previousPage={{
            pageTitle: "Home",
            pageRoute: "/",
          }}
        />

        <section className="flex-start-between my-16 flex-col px-5 md:px-10 lg:mx-auto lg:w-[85%] lg:flex-row lg:gap-x-16 lg:px-0 2xl:w-3/4">
          {/* Left -------> Filters */}
          <ProductFilters />

          <div className="w-full lg:flex-grow">
            <ProductsContainer />
          </div>
        </section>
      </div>
    </QuoteProductsPageProvider>
  );
}
