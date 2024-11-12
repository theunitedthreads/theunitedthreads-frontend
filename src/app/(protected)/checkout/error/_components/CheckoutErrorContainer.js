import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import SuccessLottie from "@/components/SuccessLottie/SuccessLottie";
import ConfettiLottie from "@/components/ConfettiLottie/ConfettiLottie";

export default function CheckoutErrorContainer() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-danger">
        Checkout Failed
      </h1>
    </div>
  );
}
