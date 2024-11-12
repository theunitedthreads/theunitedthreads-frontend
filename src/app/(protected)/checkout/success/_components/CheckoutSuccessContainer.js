"use client";

import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import SuccessLottie from "@/components/SuccessLottie/SuccessLottie";
import ConfettiLottie from "@/components/ConfettiLottie/ConfettiLottie";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { ErrorModal } from "@/utils/customModal";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import * as NProgress from "nprogress";

export default function CheckoutSuccessContainer() {
  const orderId = useSearchParams().get("orderId");
  const router = useRouter();

  // ================= Get Order details =================
  const { data: order, isLoading } = useGetSingleOrderQuery(orderId, {
    skip: !orderId,
  });

  if (!orderId) {
    ErrorModal("Order Id not found");
    return redirect("/");
  }

  if (isLoading) {
    return (
      <div className="flex-center h-[80vh]">
        <Loader size={30} className="animate-spin" />
      </div>
    );
  }

  if (order?.success === false) {
    ErrorModal("Not authorized to access this page");
    return redirect("/");
  }

  return (
    <div className="z-10">
      <SuccessLottie />

      <div className="absolute inset-0 -z-10 h-full w-full">
        <ConfettiLottie />
      </div>

      <div className="flex-center mt-10 text-center">
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1.3,
            type: "spring",
            stiffness: 250,
            damping: 30,
            mass: 0.2,
          }}
          className="max-h-fit overflow-hidden"
        >
          <h2 className="text-primary-orange text-5xl font-bold">
            Congratulations!
          </h2>

          <p className="mb-8 mt-4 text-xl">
            Payment for <Badge variant="success">Order #{orderId}</Badge> is
            successful
          </p>

          <div className="mx-auto flex w-max items-center gap-x-5">
            <Button
              size="lg"
              className="primary-button group rounded-full border border-primary-black bg-primary-white text-primary-black hover:bg-primary-white"
              onClick={() => router.push("/shop")}
            >
              Shop More <AnimatedArrow />
            </Button>

            <Button
              size="lg"
              className="primary-button group rounded-full"
              onClick={() => {
                NProgress.start();
                router.push(`/user/shop-history/${orderId}`);
              }}
            >
              See Order Details <AnimatedArrow />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
