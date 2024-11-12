"use client";

import CustomFormError from "@/components/CustomFormError/CustomFormError";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { SuccessModal } from "@/utils/customModal";
import { setToSessionStorage } from "@/utils/sessionStorage";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [formError, setFormError] = useState(null);
  const router = useRouter();

  const onForgotPassSubmit = async (data) => {
    try {
      const res = await forgotPassword(data).unwrap();

      if (res?.success) {
        SuccessModal(
          "OTP sent to email",
          "Please check your email for otp verification",
        );

        // Set forgotPassToken in session-storage
        setToSessionStorage("forgotPassToken", res.data.token);

        // Sent to update password page
        router.push("/verify-otp");
      }
    } catch (error) {
      setFormError(error?.message || error?.data?.message || error?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onForgotPassSubmit)}>
      <div className="grid w-full items-center gap-2">
        <Label
          htmlFor="email"
          className="mb-1 block font-semibold text-primary-black"
        >
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
          className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
        />
        {errors.email && <p className="text-danger">Email is required</p>}
      </div>

      <Button
        disabled={isLoading}
        className="mt-6 h-[2.6rem] w-full rounded-xl bg-primary-black py-1 text-center text-primary-white"
      >
        {isLoading ? <CustomLoader /> : "Submit"}
      </Button>

      {formError && <CustomFormError formError={formError} />}
    </form>
  );
}
