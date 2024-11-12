"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ContinueToLoginModal from "@/components/ContinueToLoginModal/ContinueToLoginModal";
import { Tag } from "antd";
import * as NProgress from "nprogress";
import truncatedText from "@/utils/textTruncate";

export default function QuoteProductCard({ product }) {
  const userId = useSelector(selectUser)?._id;
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleRequestQuote = () => {
    if (!userId) {
      setShowLoginModal(true);
    } else {
      // Shop top progress bar
      NProgress.start();
      router.push(`/products/${product._id}`);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col justify-between gap-y-4 rounded-3xl border border-primary-black/50 p-5 shadow transition-all duration-300 ease-in-out hover:shadow-lg">
        <div>
          <div className="flex-center relative h-[250px]">
            <Image
              src={product?.frontSide}
              alt="product image"
              height={500}
              width={500}
              className="mx-auto block h-full w-auto rounded"
            />

            {/* Category */}
            <div className="absolute right-0 top-0">
              <Tag color="lime" className="rounded-full font-medium">
                {product?.category?.name}
              </Tag>
            </div>
          </div>

          <div className="flex-center-between mt-5 text-xl font-bold">
            <h4>{truncatedText(product?.name, 50)}</h4>
          </div>
        </div>

        <Button
          className="primary-button group w-max rounded-full"
          onClick={handleRequestQuote}
        >
          Request Quote
          <AnimatedArrow arrowSize={16} />
        </Button>
      </div>

      {/* ---- Show continue login if user not found ---- */}
      <ContinueToLoginModal open={showLoginModal} setOpen={setShowLoginModal} />
    </>
  );
}
