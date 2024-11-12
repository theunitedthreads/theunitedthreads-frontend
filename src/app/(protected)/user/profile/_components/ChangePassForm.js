"use client";

import EyeIconInverse from "@/components/EyeIconInverse/EyeIconInverse";
import { PhoneInput } from "@/components/PhoneInput/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "@/redux/api/userApi";
import { logout } from "@/redux/features/authSlice";
import { ConfirmModal } from "@/utils/customModal";
import { errorToast, successToast } from "@/utils/customToast";
import { Edit } from "lucide-react";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function ChangePassForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // Change password api handler
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data) => {
    delete data["confirmPassword"];

    try {
      await changePassword(data).unwrap();

      // Prompt user to logout
      ConfirmModal(
        "Password changed successfully",
        "Do you want to logout and login with new password?",
        "Logout",
        "Not right now",
      ).then((res) => {
        if (res?.isConfirmed) {
          // Logout
          dispatch(logout());
          router.refresh();
          router.push("/login");
        } else {
          // do nothing
        }
      });
    } catch (error) {
      errorToast(error?.data?.message || error?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="space-y-8">
        {/* Old password */}
        <div className="mt-6 grid w-full items-center gap-2">
          <Label
            htmlFor="oldPassword"
            className="font-semibold text-primary-black"
          >
            Old Password
          </Label>

          <div className="relative">
            <Input
              type={showOldPass ? "text" : "password"}
              id="oldPassword"
              placeholder="Old Password"
              {...register("oldPassword", {
                required: "Old Password is required",
              })}
              className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
            />

            <EyeIconInverse
              showPassword={showOldPass}
              setShowPassword={setShowOldPass}
            />
          </div>

          {errors.oldPassword && (
            <p className="mt-1 text-danger">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New password */}
        <div className="mt-6 grid w-full items-center gap-2">
          <Label
            htmlFor="newPassword"
            className="font-semibold text-primary-black"
          >
            New Password
          </Label>

          <div className="relative">
            <Input
              type={showNewPass ? "text" : "password"}
              id="newPassword"
              placeholder="New Password"
              {...register("newPassword", {
                required: "NewPassword is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "New Password must have at least one uppercase, one lowercase letter, one number, one special character and 8 characters long",
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

        {/* Confirm password */}
        <div className="mt-6 grid w-full items-center gap-2">
          <Label
            htmlFor="confirmPassword"
            className="font-semibold text-primary-black"
          >
            Confirm Password
          </Label>

          <div className="relative">
            <Input
              type={showConfirmPass ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className="rounded-xl border-primary-black/50 bg-transparent text-primary-black outline-none"
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
      </div>

      <Button
        loading={isLoading}
        disabled={isLoading}
        type="submit"
        className="mt-10 h-[2.8rem] w-full rounded-xl bg-primary-black font-semibold"
      >
        <Edit size={20} className="mr-2" /> Save Changes
        {isLoading && <Loader className="ml-3 animate-spin" size={20} />}
      </Button>
    </form>
  );
}
