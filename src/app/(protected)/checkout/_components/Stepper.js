"use client";

import { useStep } from "usehooks-ts";
import BillingForm from "./BillingForm";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function Stepper() {
  const [currentStep, helpers] = useStep(2);

  const { goToNextStep } = helpers;

  return (
    <div>
      {/* Step Dots */}
      <div className="mx-auto flex w-full items-center gap-x-5 px-4 md:px-10 lg:w-1/2">
        {/* Step 1 */}
        <div className="flex flex-grow items-center gap-x-2 transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-x-2">
            <div
              className={cn(
                "flex aspect-square h-10 w-10 items-center justify-center rounded-full",
                currentStep === 1
                  ? "bg-primary-black text-white"
                  : "bg-green-600 text-white",
              )}
            >
              {currentStep === 1 ? <p>1</p> : <Check />}
            </div>

            <p
              className={cn(
                "font-medium",
                currentStep === 1 ? "text-black" : "text-green-600",
              )}
            >
              Shipping Information
            </p>
          </div>

          <div
            className={cn(
              "h-[1px] flex-grow",
              currentStep === 1 ? "bg-gray-600" : "bg-green-600",
            )}
          />
        </div>

        {/* Step 2 */}
        <div className="flex w-max items-center gap-x-2">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              currentStep < 2
                ? "bg-lightGray text-white"
                : currentStep === 2
                  ? "bg-primary-black text-white"
                  : "bg-green-600 text-white",
            )}
          >
            {currentStep <= 2 ? <p>2</p> : <Check />}
          </div>

          <p
            className={cn(
              "font-medium",
              currentStep <= 2 ? "text-gray-500" : "text-green-600",
            )}
          >
            Payment
          </p>
        </div>
      </div>

      {/* Step Forms */}
      <div className="flex items-center justify-center">
        {currentStep === 1 && (
          <div className="mt-16 lg:w-1/2">
            <BillingForm goToNextStep={goToNextStep} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex-center h-[50vh]">
            <h1 className="text-3xl font-extrabold">(Payment Gateway Form)</h1>
          </div>
        )}
      </div>
    </div>
  );
}
