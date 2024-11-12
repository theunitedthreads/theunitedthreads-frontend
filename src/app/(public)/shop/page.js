import CommonPageHeader from "@/components/CommonPageHeader/CommonPageHeader";
import ShopContainer from "./_components/ShopContainer";
import ShopProductsFilter from "./_components/ShopProductsFilter";
import ShopPageProvider from "@/context/ShopPageContext";

export const metadata = {
  title: "Shop Now",
  description: "Shop now page",
};

export default function ShopPage() {
  return (
    <ShopPageProvider>
      <div className="">
        <CommonPageHeader
          pageTitle="Shop Now"
          previousPage={{
            pageTitle: "Home",
          }}
        />

        <div className="flex-start-between mx-auto my-16 flex-col px-5 md:px-10 lg:mx-auto lg:w-[85%] lg:flex-row lg:gap-x-16 lg:px-0 2xl:w-3/4">
          <ShopProductsFilter />

          <div className="w-full lg:flex-grow">
            <ShopContainer />
          </div>
        </div>
      </div>
    </ShopPageProvider>
  );
}
