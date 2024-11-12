"use client";

import EyeIconInverse from "@/components/EyeIconInverse/EyeIconInverse";
import { PhoneInput } from "@/components/PhoneInput/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import { errorToast, successToast } from "@/utils/customToast";
import { Edit } from "lucide-react";
import { Loader } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function PersonalInfoForm({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // =========== Set default values ================
  useEffect(() => {
    if (user) {
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
      setValue("email", user?.email);
      setValue("contact", user?.contact);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = async (data) => {
    delete data["email"];
    delete data["contact"];

    try {
      const res = await updateProfile(data).unwrap();
      if (res?.success) {
        successToast("Profile updated successfully");
      }
    } catch (error) {
      errorToast(error?.data?.message || error?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
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
            disabled={true}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
            {...register("email", { required: true })}
          />
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
      </div>
    </form>
  );
}
