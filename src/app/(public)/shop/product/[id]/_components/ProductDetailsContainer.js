"use client";

import React, { useEffect, useState } from "react";
import ProductImgSlider from "./ProductImgSlider";
import CustomStarRating from "@/components/CustomStarRating/CustomStarRating";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RatingsReviews from "./RatingsReviews";
import { fadeUpVariants } from "@/utils/motion-variants";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ContinueToLoginModal from "@/components/ContinueToLoginModal/ContinueToLoginModal";
import ProductDescription from "./ProductDescription";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetSingleShopProductQuery } from "@/redux/api/Shop Page Api/shopApi";
import { ShoppingBag } from "lucide-react";
import { ErrorModal } from "@/utils/customModal";
import {
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/sessionStorage";
import { errorToast } from "@/utils/customToast";
import { sizeSorter } from "@/utils/sizeSorter";
import pantoneToHex from "@/utils/pantoneToHex";

export default function ProductDetailsContainer({ id }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedClr, setSelectedClr] = useState("");

  // ================= Get Product Details ================= //
  const { data: productRes, isLoading: isProductLoading } =
    useGetSingleShopProductQuery(id, { skip: !id });
  const product = productRes?.data || {};

  // ================= Buy Now Handler ================= //
  const handleBuyNow = () => {
    if (!selectedClr) {
      return ErrorModal("Please select a color");
    }

    if (!selectedSize) {
      return ErrorModal("Please select a size");
    }

    // Set order info to Session Storage
    setToSessionStorage("united-threads-order", {
      color: selectedClr,
      size: selectedSize,
      quantity: quantity,
      price: product?.price,
      productId: id,
    });

    router.push("/checkout");
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="my-16">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex min-h-screen flex-col gap-y-10 lg:min-h-[75vh] lg:flex-row lg:items-start lg:justify-between lg:gap-x-20 lg:gap-y-0">
        {/* Left - Product Image Slider */}
        <div className="lg:w-1/2">
          {isProductLoading ? (
            <div className="h-[600px] animate-pulse rounded bg-gray-300"></div>
          ) : (
            <ProductImgSlider
              images={product?.images}
              primaryImage={product?.primaryImage}
            />
          )}
        </div>

        {/* Right - Product Details */}
        {isProductLoading ? (
          // ------------ Skeleton loader -------------- //
          <div className="space-y-5 py-10 lg:w-1/2">
            <div className="h-3 w-full animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-3 w-1/4 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-3 w-3/4 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-[250px] w-full animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-3 w-3/4 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-3 w-3/4 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200"></div>
          </div>
        ) : (
          <motion.div
            variants={fadeUpVariants}
            initial="initial"
            animate="animate"
            className="lg:w-1/2"
          >
            <h3 className="mb-2 text-3xl font-semibold">{product?.name}</h3>
            <Link
              href={`/shop/${product?.shop?._id}`}
              className="text-foundation-orange-normal text-xl font-semibold"
            >
              {product?.shop?.shopName}
            </Link>

            <div className="my-4 flex items-center gap-x-6">
              <div className="flex items-stretch gap-x-2">
                <CustomStarRating rating={product?.averageRating} />
                <Link
                  href={`/shop/product/${id}/#ratings-reviews`}
                  className="text-muted-foreground border-2 border-transparent font-medium hover:text-black"
                >
                  ({product?.totalReviews} reviews)
                </Link>
              </div>
              <Separator
                orientation="vertical"
                className="h-5 bg-primary-black"
              />

              {/* stock status */}
              {product?.stock > 0 ? (
                <p className="font-medium text-success">
                  In Stock ({product?.stock})
                </p>
              ) : (
                <p className="font-medium text-danger">Out of Stock</p>
              )}
            </div>

            <div className="flex items-baseline gap-x-3">
              <h3 className="text-3xl font-medium">${product?.price}</h3>
            </div>

            <p className="mb-6 mt-3">{product?.shortDescription}</p>

            <Separator className="mb-8 mt-4 bg-primary-black" />

            {/* Show below element for no-user or buyer type user */}
            <div className="flex flex-col gap-y-8">
              {/* sizes */}
              {product?.size?.length > 0 && (
                <div className="flex flex-col gap-x-6 gap-y-2">
                  <h4 className="mr-5 text-xl md:text-2xl">Size</h4>
                  <div className="flex items-center gap-x-5">
                    {sizeSorter(product?.size)?.map((size) => (
                      <Button
                        key={size}
                        className={cn(
                          "hover:bg-foundation-orange-normal h-8 w-8 rounded-full text-[10px] font-semibold shadow md:h-9 md:w-9 md:text-[13px] lg:h-10 lg:w-10",
                          selectedSize === size
                            ? "border-none bg-primary-black text-primary-white"
                            : "border border-black/50 bg-transparent text-black",
                        )}
                        onClick={() => {
                          setSelectedSize(size);
                        }}
                      >
                        {!isNaN(size) ? `${size}”` : size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* colors */}
              {product?.colorsPreferences?.length > 0 && (
                <div className="flex flex-col gap-x-8 gap-y-2">
                  <h4 className="text-xl md:text-2xl">Color</h4>
                  <div className="flex items-center gap-x-5">
                    {product?.colorsPreferences?.map((clr) => (
                      <Button
                        key={clr}
                        style={{ backgroundColor: `${pantoneToHex(clr)}` }} // convert pantone to hex for bg color
                        className={cn(
                          `h-8 w-8 rounded-full md:h-10 md:w-10`,
                          selectedClr === clr
                            ? "border-4 border-yellow-600 p-2"
                            : "border-none p-0",
                        )}
                        onClick={() => {
                          setSelectedClr(clr);
                        }}
                        title={clr}
                      ></Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* cart quantity & buttons - Desktop */}
            <div className="mt-10 hidden items-stretch gap-x-5 lg:flex">
              <div className="flex w-max items-center rounded border border-black/50">
                <button
                  className="px-4 py-2 transition-all duration-300 ease-in-out hover:bg-primary-black hover:text-white"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  <Minus />
                </button>

                <Separator
                  orientation="vertical"
                  className="h-10 bg-black/50"
                />
                <h3 className="px-5 text-2xl">{quantity}</h3>

                <Separator
                  orientation="vertical"
                  className="h-10 bg-black/50 p-0"
                />

                <button
                  className="bg-primary-black px-4 py-2 text-white transition-all duration-300 ease-in-out hover:bg-primary-black hover:text-white"
                  onClick={() => {
                    if (quantity === product?.quantity) {
                      return errorToast("Quantity can't be more than stock");
                    }
                    setQuantity(quantity + 1);
                  }}
                >
                  <Plus />
                </button>
              </div>

              <Button
                className="primary-button w-full rounded py-5 text-center"
                onClick={handleBuyNow}
              >
                <ShoppingBag size={18} /> Buy Now
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* ----------- Product Description ---------------- */}
      <div className="my-16">
        <ProductDescription description={product?.description} />
      </div>

      {/* ------------- Ratings & Reviews ----------------- */}
      <div id="ratings-reviews">
        <RatingsReviews
          productId={product?._id}
          isProductLoading={isProductLoading}
        />
      </div>

      {/* -------------- Show continue login if user not found -------------------- */}
      <ContinueToLoginModal open={showLoginModal} setOpen={setShowLoginModal} />
    </div>
  );
}
