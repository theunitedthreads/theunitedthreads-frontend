"use client";

import CustomFormError from "@/components/CustomFormError/CustomFormError";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import EyeIconInverse from "@/components/EyeIconInverse/EyeIconInverse";
import { PhoneInput } from "@/components/PhoneInput/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUpMutation } from "@/redux/api/authApi";
import { SuccessModal } from "@/utils/customModal";
import { setToSessionStorage } from "@/utils/sessionStorage";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();

  const [formError, setFormError] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const router = useRouter();

  // Sign up api handler
  const [signUp, { isLoading }] = useSignUpMutation();

  const onSignUpSubmit = async (data) => {
    // delete confirm password
    delete data["confirmPassword"];

    try {
      const res = await signUp(data).unwrap();

      if (res?.success) {
        SuccessModal("Sign Up Successful", "Please verify your email");

        // Set signUpToken in session storage
        setToSessionStorage("signUpToken", res?.data?.token);

        // Send to otp verification page
        router.push("/verify-otp");

        setFormError(null);
      }
    } catch (error) {
      setFormError(error?.data?.message || error?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSignUpSubmit)} className="">
      <div className="space-y-8">
        {/* first name */}
        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="firstName"
            className="mb-1 block font-semibold text-primary-black"
          >
            First Name
          </Label>
          <Input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            {...register("firstName", { required: true })}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none focus:outline-none"
          />
          {errors.firstName && (
            <p className="mt-1 text-danger">First Name is required</p>
          )}
        </div>

        {/* last name */}
        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="lastName"
            className="mb-1 block font-semibold text-primary-black"
          >
            Last Name
          </Label>
          <Input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            {...register("lastName", { required: true })}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
          />
          {errors.lastName && (
            <p className="mt-1 text-danger">Last Name is required</p>
          )}
        </div>

        {/* Contact */}
        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="contact"
            className="mb-1 block font-semibold text-primary-black"
          >
            Contact
          </Label>
          <Controller
            name="contact"
            rules={{ required: "Contact is required" }}
            control={control}
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                international
                defaultCountry="US"
              />
            )}
          />

          {errors.contact && (
            <p className="mt-1 text-danger">Contact is required</p>
          )}
        </div>

        {/* email */}
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
            placeholder="Enter your email"
            {...register("email", {
              required: true,
            })}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-danger">Email is required</p>
          )}
        </div>

        {/* new password */}
        <div className="mt-6 grid w-full items-center gap-2">
          <Label
            htmlFor="password"
            className="font-semibold text-primary-black"
          >
            Password
          </Label>

          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
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
              showPassword={showPass}
              setShowPassword={setShowPass}
            />
          </div>

          {errors.password && (
            <p className="mt-1 text-danger">{errors.password.message}</p>
          )}
        </div>

        {/* confirm password */}
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
                  value === watch("password") || "Passwords do not match",
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
        {isLoading ? <CustomLoader /> : "Create Account"}
      </Button>

      <div className="mt-5 flex items-center justify-center gap-2">
        <p>Already have an account?</p>
        <Link href="/login" className="hover-underline font-medium">
          Sign In
        </Link>
      </div>

      {formError && <CustomFormError formError={formError} />}
    </form>
  );
}
