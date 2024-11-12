"use client";

import CustomFormError from "@/components/CustomFormError/CustomFormError";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/api/authApi";
import { SuccessModal } from "@/utils/customModal";
import { successToast } from "@/utils/customToast";
import {
  getFromSessionStorage,
  removeFromSessionStorage,
  setToSessionStorage,
} from "@/utils/sessionStorage";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function VerifyOtpForm() {
  const [value, setValue] = useState("");
  const [showRequired, setShowRequired] = useState(false);
  const [formError, setFormError] = useState(null);
  const router = useRouter();

  // Verify otp api handler
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resendOtpLoading }] = useResendOtpMutation();

  // Verify otp handler
  const handleVerifyOtp = async () => {
    if (value.length < 6) {
      setShowRequired(true);
      return;
    }

    try {
      const res = await verifyOtp({ otp: Number(value) }).unwrap();
      console.log(res);

      if (res?.success) {
        SuccessModal("OTP Verified", "Please login to your account.");

        if (getFromSessionStorage("forgotPassToken")) {
          // Send to update password page
          router.push("/update-password");

          // Remove token from session storage
          removeFromSessionStorage("forgotPassToken");

          // Set change password token in session storage
          setToSessionStorage("changePassToken", res.data.accessToken);

          // Send to change password page
          return router.push("/update-password");
        }

        // Remove token from session storage
        removeFromSessionStorage("signUpToken");

        // Send to login page
        router.push("/login");
        setFormError(null);
      }
    } catch (error) {
      setFormError(error?.message || error?.data?.message || error?.error);
    }
  };

  // Resend otp handler
  const handleResendOtp = async () => {
    const toastId = toast.loading("Sending...");

    try {
      const res = await resendOtp().unwrap();

      if (res?.success) {
        successToast("OTP re-sent successfully", toastId);

        // Reset signUpToken in session-storage
        setToSessionStorage("signUpToken", res?.data?.token);
      }
    } catch (error) {
      setFormError(error?.data?.message || error?.error);
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="relative">
      <div className="mx-auto w-max">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup className="flex items-center gap-x-5">
            <InputOTPSlot
              index={0}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
            <InputOTPSlot
              index={1}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
            <InputOTPSlot
              index={2}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
            <InputOTPSlot
              index={3}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
            <InputOTPSlot
              index={4}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
            <InputOTPSlot
              index={5}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
          </InputOTPGroup>
        </InputOTP>

        {showRequired && (
          <p className="mt-3 text-center text-danger">
            Please enter your one-time password correctly
          </p>
        )}
      </div>

      {/* Resend otp button */}
      <Button
        variant="outline"
        className="absolute -top-9 right-0 h-6 rounded-full border border-primary-black text-xs font-medium"
        disabled={resendOtpLoading}
        onClick={handleResendOtp}
      >
        Resend Otp <RotateCw size={14} className="ml-2" />
      </Button>

      <Button
        disabled={isLoading || value?.length < 6}
        type="submit"
        className="bg-primary-orange mt-8 h-[2.7rem] w-full bg-primary-black font-medium capitalize text-primary-white"
        onClick={handleVerifyOtp}
      >
        {isLoading ? <CustomLoader /> : "Verify OTP"}
      </Button>

      {formError && <CustomFormError formError={formError} />}
    </div>
  );
}
