/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import CountryStateCitySelector from "@/components/CountryStateCitySelector/CountryStateCitySelector";
import { redirect, useRouter } from "next/navigation";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { toast } from "sonner";
import { errorToast, successToast } from "@/utils/customToast";
import { ErrorModal } from "@/utils/customModal";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import {
  getFromSessionStorage,
  removeFromSessionStorage,
} from "@/utils/sessionStorage";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";

export default function BillingForm({ goToNextStep }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [userAddress, setUserAddress] = useState({});
  const router = useRouter();
  const [updateProfile] = useUpdateProfileMutation();
  const [createOrder] = useCreateOrderMutation();
  const [createPayment] = useCreatePaymentMutation();

  // Get user information
  const { data: userRes } = useGetProfileQuery();
  const user = userRes?.data || {};

  // Set default values
  useEffect(() => {
    if (user?._id) {
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
      setValue("contact", user?.contact);
      setValue("email", user?.email);
      setValue("houseNo", user?.houseNo);
      setValue("area", user?.area);
      setValue("city", user?.city);

      setUserAddress({
        country: user?.country,
        state: user?.state,
        city: user?.city,
      });
    }
  }, [user]);

  // ==================== Submit handler =================
  const onSubmit = async (data) => {
    const toastId = toast.loading("Saving...");

    if (data?.country === "" || data?.state === "" || data?.city === "") {
      if (user?.country === "" || user?.state === "" || user?.city === "") {
        return errorToast(
          "Please select your country, state and city",
          toastId,
        );
      }
    }

    // ========= If `Save info` checked, then update profile info =========
    if (data?.saveInfo) {
      try {
        await updateProfile({
          contact: data?.contact,
          country: data?.country,
          state: data?.state,
          city: data?.city || user?.city || "",
          area: data?.area,
          houseNo: data?.houseNo,
        }).unwrap();
      } catch (error) {
        errorToast(error?.data?.message || error?.error, toastId);
        return;
      }
    }

    // Get order info from session storage
    const shop = getFromSessionStorage("united-threads-order");

    const orderPayload = {
      product: shop?.productId,
      quantity: shop?.quantity,
      amount: shop?.price,
      color: shop?.color,
      size: shop?.size,
      orderType: "SHOP",
      country: data?.country || user?.country,
      state: data?.state || user?.state,
      city: data?.city || user?.city,
      houseNo: data?.houseNo || user?.houseNo,
    };

    try {
      const orderRes = await createOrder(orderPayload).unwrap();

      // If order created successfully, create payment link and redirect
      if (orderRes?.success) {
        const res = await createPayment(orderRes?.data[0]?._id).unwrap();

        if (res?.success) {
          console.log(res);
          successToast("Saved. Proceed to payment", toastId);

          window.location.href = res?.data?.paymentLink;

          // Remove order from session storage
          removeFromSessionStorage("united-threads-order");
        }
      }
    } catch (error) {
      return errorToast(error?.data?.message || error?.error, toastId);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="space-y-8">
        {/* First Name */}
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="firstName"
            className="mb-1 block font-semibold text-primary-black"
          >
            First Name
            <span className="text-foundation-orange-normal/80">*</span>
          </Label>
          <Input
            type="text"
            id="firstName"
            {...register("firstName", { required: true })}
            className="border-none bg-[#F5F5F5] text-primary-black outline-none focus:outline-none"
          />
          {errors.firstName && (
            <p className="mt-1 text-danger">First name is required</p>
          )}
        </div>

        {/* Last Name */}
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="lastName"
            className="mb-1 block font-semibold text-primary-black"
          >
            Last Name<span className="text-foundation-orange-normal/80">*</span>
          </Label>
          <Input
            type="text"
            id="lastName"
            {...register("lastName", { required: true })}
            className="border-none bg-[#F5F5F5] text-primary-black outline-none focus:outline-none"
          />
          {errors.lastName && (
            <p className="mt-1 text-danger">Last is required</p>
          )}
        </div>

        {/* Email */}
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="email"
            className="mb-1 block font-semibold text-primary-black"
          >
            Email Address
            <span className="text-foundation-orange-normal/80">*</span>
          </Label>
          <Input
            type="email"
            id="email"
            className="border-none bg-[#F5F5F5] outline-none"
            disabled={true}
            {...register("email", { required: true })}
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="contact"
            className="mb-1 block font-semibold text-primary-black"
          >
            Contact
            <span className="text-foundation-orange-normal/80">*</span>
          </Label>

          <Input
            type="tel"
            id="contact"
            {...register("contact", { required: true })}
            className="border-none bg-[#F5F5F5] text-primary-black outline-none"
            placeholder="Enter contact (with country code)"
          />

          {errors.contact && (
            <p className="mt-1 text-danger">Contact is required</p>
          )}
        </div>

        {/* address */}
        <div className="relative col-span-2 grid w-full items-center gap-1.5">
          <Label
            htmlFor="address"
            className="mb-1 block font-semibold text-primary-black"
          >
            Address :
          </Label>

          <CountryStateCitySelector
            control={control}
            register={register}
            setValue={setValue}
            userAddress={userAddress}
          />
        </div>

        <div className="">
          <Controller
            name="saveInfo"
            control={control}
            render={({ field }) => (
              <label className="font-medium text-black">
                <Checkbox
                  id="saveInfo"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className={`mr-2`}
                />
                Save my information for faster check-out next time
              </label>
            )}
          />
        </div>
      </div>

      <Button
        htmlType="submit"
        className="primary-button mt-10 block h-[2.7rem] w-full font-medium"
      >
        Save & Proceed to Payment
      </Button>
    </form>
  );
}
