"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import EyeIconInverse from "@/components/EyeIconInverse/EyeIconInverse";
import { useState } from "react";
import { Loader } from "lucide-react";
import { SuccessModal } from "@/utils/customModal";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import CustomFormError from "@/components/CustomFormError/CustomFormError";
import { useRouter } from "next/navigation";
import { removeFromSessionStorage } from "@/utils/sessionStorage";

export default function UpdatePassForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [updatePassword, { isLoading }] = useResetPasswordMutation();
  const [formError, setFormError] = useState(null);
  const router = useRouter();

  const onUpdatePassSubmit = async (data) => {
    const payload = { password: data.newPassword };
    console.log(payload);

    try {
      const res = await updatePassword(payload).unwrap();

      if (res?.success) {
        SuccessModal(
          "Password Updated Successfully",
          "Please login with new password",
        );

        // Remove forget password token
        removeFromSessionStorage("changePassToken");

        // Send to login page
        router.push("/login");
        setFormError(null);
      }
    } catch (error) {
      setFormError(error?.data?.message || error?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onUpdatePassSubmit)}>
      <div className="grid w-full items-center gap-2">
        <Label
          htmlFor="newPassword"
          className="mb-1 font-semibold text-primary-black"
        >
          Enter New Password
        </Label>

        <div className="relative">
          <Input
            type={showNewPass ? "text" : "password"}
            id="newPassword"
            placeholder="New Password"
            {...register("newPassword", {
              required: "New Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must have at least one uppercase, one lowercase letter, one number, one special character and 8 characters long",
              },
            })}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
          />

          <EyeIconInverse
            showPassword={showNewPass}
            setShowPassword={setShowNewPass}
          />
        </div>

        {errors.newPassword && (
          <p className="mt-1 text-danger">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="mt-10 grid w-full items-center gap-2">
        <Label
          htmlFor="confirmPassword"
          className="mb-1 font-semibold text-primary-black"
        >
          Confirm Password
        </Label>

        <div className="relative">
          <Input
            type={showConfirmPass ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
          />
          <EyeIconInverse
            showPassword={showConfirmPass}
            setShowPassword={setShowConfirmPass}
          />
        </div>

        {errors.confirmPassword && (
          <p className="mt-1 text-danger">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-10 h-[2.7rem] w-full rounded-xl bg-primary-black text-center text-primary-white"
      >
        {isLoading ? <CustomLoader /> : "Submit"}
      </Button>

      {formError && <CustomFormError formError={formError} />}
    </form>
  );
}
