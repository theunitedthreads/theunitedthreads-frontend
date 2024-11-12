"use client";

import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSendMailMutation } from "@/redux/api/contactApi";
import { errorToast, successToastWithDesc } from "@/utils/customToast";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ContactForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [sendMail, { isLoading }] = useSendMailMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Sending...");

    try {
      await sendMail(data).unwrap();
      successToastWithDesc(
        "Message sent successfully",
        "Thank you for your message. We will get back to you shortly.",
        toastId,
      );

      reset();
    } catch (error) {
      errorToast(error?.data?.message || error?.error, toastId);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto md:w-[500px] 2xl:w-[800px]"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-2 lg:gap-y-0">
          {/* first name */}
          <div className="grid w-full items-center gap-2">
            <Label
              htmlFor="firstName"
              className="mb-1 block font-semibold text-primary-black"
            >
              First Name *
            </Label>
            <div>
              <Input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                {...register("firstName", { required: true })}
                className="rounded-xl border border-primary-black bg-transparent text-primary-black outline-none focus:outline-none"
              />
              {errors.firstName && (
                <p className="mt-1 text-danger">First Name is required</p>
              )}
            </div>
          </div>

          {/* last name */}
          <div className="grid w-full items-center gap-2">
            <Label
              htmlFor="lastName"
              className="mb-1 block font-semibold text-primary-black"
            >
              Last Name *
            </Label>

            <div>
              <Input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                {...register("lastName", { required: true })}
                className="rounded-xl border border-primary-black bg-transparent text-primary-black outline-none"
              />
              {errors.lastName && (
                <p className="mt-1 text-danger">Last Name is required</p>
              )}
            </div>
          </div>
        </div>

        {/* email */}
        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="email"
            className="mb-1 block font-semibold text-primary-black"
          >
            Email *
          </Label>

          <div>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
              })}
              className="rounded-xl border border-primary-black bg-transparent text-primary-black outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-danger">Email is required</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="subject"
            className="mb-1 block font-semibold text-primary-black"
          >
            Subject *
          </Label>

          <div>
            <Input
              type="subject"
              id="subject"
              placeholder="Enter your subject of discussion"
              {...register("subject", {
                required: true,
              })}
              className="rounded-xl border border-primary-black bg-transparent text-primary-black outline-none"
            />
            {errors.subject && (
              <p className="mt-1 text-danger">Subject is required</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="description"
            className="mb-1 block font-semibold text-primary-black"
          >
            Description *
          </Label>

          <div>
            <Textarea
              id="description"
              placeholder="Tell us about your queries"
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is required",
                },
                minLength: {
                  value: 100,
                  message:
                    "Description must be at least 100 characters long so that we can understand about your queries better!",
                },
              })}
              className="min-h-28 rounded-xl border border-primary-black bg-transparent text-primary-black outline-none"
            />
            {errors.description && (
              <p className="mt-1 text-danger">{errors.description.message}</p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="primary-button group my-10 h-[2.7rem] w-full rounded-xl"
      >
        Submit
        <AnimatedArrow />
      </Button>
    </form>
  );
}
