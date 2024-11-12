"use client";

import CustomFormError from "@/components/CustomFormError/CustomFormError";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import EyeIconInverse from "@/components/EyeIconInverse/EyeIconInverse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useSignInMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
import { SuccessModal } from "@/utils/customModal";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();

  // Login api handler
  const [signIn, { isLoading }] = useSignInMutation();

  const onLoginSubmit = async (data) => {
    try {
      const res = await signIn(data).unwrap();

      if (res?.success) {
        SuccessModal("Login Successful!");

        // Send to specific `Dashboard` if user role not `Customer`
        if (res?.data?.role === "CSR") {
          return router.push(process.env.NEXT_PUBLIC_CSR_DASHBOARD_URL);
        } else if (res?.data?.role === "ADMIN") {
          return router.push(process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL);
        }

        // Set user info into store
        dispatch(
          setUser({
            user: jwtDecode(res?.data?.accessToken),
            token: res?.data?.accessToken,
          }),
        );

        router.push("/");
        router.refresh();
        setFormError(null);
      }
    } catch (error) {
      setFormError(error?.data?.message || error?.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className="text-primary-black lg:mx-auto lg:w-[75%]"
    >
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="name" className="font-semibold">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="rounded-xl border-primary-black/50 bg-transparent px-4 py-5"
          {...register("email", {
            required: "Email is required",
            validate: (value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                return "Must be a valid email";
              }
              return true;
            },
          })}
        />
        {errors.email && (
          <span className="shake-hr text-danger">{errors.email.message}</span>
        )}
      </div>

      <div className="mt-8 grid w-full items-center gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="font-semibold">
            Password
          </Label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary-black hover:text-primary-black/75"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            className="rounded-xl border-primary-black/50 bg-transparent px-4 py-5"
            {...register("password", { required: true })}
          />
          <EyeIconInverse
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>

        {errors.password && (
          <span className={"shake-hr text-danger"}>Password is required</span>
        )}
      </div>

      <Button
        loading={isLoading}
        disabled={isLoading}
        type="submit"
        className={cn(
          "mt-10 h-[2.8rem] w-full rounded-xl border bg-primary-black font-medium capitalize",
          isLoading && "cursor-not-allowed",
        )}
      >
        {isLoading ? <CustomLoader /> : "SIGN IN"}
      </Button>

      <div className="mt-3 flex items-center justify-center gap-2">
        <p>Don&apos;t have an account?</p>

        <div className="hover-underline">
          <Link href="/sign-up" className="font-medium">
            Register
          </Link>
        </div>
      </div>

      {/* Show form error message */}
      {formError && <CustomFormError formError={formError} extraClass="mt-4" />}
    </form>
  );
}
