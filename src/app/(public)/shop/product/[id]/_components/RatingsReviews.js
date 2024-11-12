"use client";

import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import StarRatings from "react-star-ratings";
import ReviewCard from "./ReviewCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Controller, useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import {
  useCreateShopProductReviewMutation,
  useGetShopProductReviewsQuery,
} from "@/redux/api/Shop Page Api/shopApi";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";
import { errorToast, successToast } from "@/utils/customToast";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import UpdateReviewModal from "./UpdateReviewModal";

export default function RatingsReviews({ productId, isProductLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const isOrderComplete = useSearchParams().get("review");
  const [rating, setRating] = useState(0);
  const userId = useSelector(selectUser)?._id;

  console.log(isOrderComplete);

  // ================= Get product reviews =================
  const { data: reviewsRes, isLoading: isReviewsLoading } =
    useGetShopProductReviewsQuery({ product: productId }, { skip: !productId });
  const reviews = reviewsRes?.data || [];
  const reviewsMeta = reviewsRes?.meta || {};

  // ================ Check if user already reviewed ============
  const { data: userReviewsRes, isLoading: isUserReviewsLoading } =
    useGetShopProductReviewsQuery(
      { product: productId, user: userId },
      { skip: !userId || !productId },
    );
  const userReviews = userReviewsRes?.data || [];

  console.log(isOrderComplete);

  // =========== Create review handler =============
  const [createReview, { isLoading: isReviewing }] =
    useCreateShopProductReviewMutation();
  const onSubmit = async (data) => {
    try {
      await createReview({ ...data, product: productId }).unwrap();

      setRating(0);
      successToast("Review created successfully");
    } catch (error) {
      errorToast(error?.data?.message || error?.error);
    }
  };

  if (isUserReviewsLoading) {
    return;
  }

  return (
    <>
      <div id="ratings-reviews" className="py-4">
        <h4 className="max-w-max rounded bg-primary-black px-5 py-2 text-2xl font-medium text-white">
          Ratings & Reviews
        </h4>
        <Separator className="mb-10 mt-2 bg-primary-black" />

        {/* Share review if order is completed */}
        {isOrderComplete && userReviews?.length < 1 && (
          <form className="mb-20" onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-2xl font-bold">What do you rate?</h4>

            <div className="my-5 space-y-2">
              <Controller
                name="rating"
                control={control}
                rules={{ required: "Rating is required" }}
                render={({ field }) => (
                  <>
                    <StarRatings
                      rating={field.value || rating}
                      numberOfStars={5}
                      starRatedColor="#FFAD33"
                      starEmptyColor="#bfbfbf"
                      starHoverColor="#FFAD33"
                      svgIconViewBox="0 0 16 15"
                      svgIconPath="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z"
                      starDimension={"35px"}
                      starSpacing={"3px"}
                      changeRating={(val) => {
                        setRating(val);
                        field.onChange(val);
                      }}
                    />

                    {errors.rating && (
                      <p className="text-sm text-danger">
                        {errors.rating.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <p className="mb-4 text-lg">
                Please share your experience with this product
              </p>

              <Controller
                name="comment"
                control={control}
                rules={{
                  required:
                    "Please share your review to help know others about the product",
                }}
                render={({ field }) => (
                  <>
                    <textarea
                      {...field}
                      placeholder="Your review"
                      className="min-h-[200px] w-full rounded-lg border border-primary-black bg-primary-white p-4 text-[17px] text-primary-black"
                      minLength={70}
                    />

                    {errors.review && (
                      <p className="text-sm text-danger">
                        {errors.review.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <button
              type="submit"
              disabled={isReviewing}
              className="primary-button mt-10 flex h-10 w-full items-center justify-center gap-x-3 rounded"
            >
              {isReviewing && <CustomLoader />}
              Submit
            </button>
          </form>
        )}

        {/* reviews */}
        <div>
          {isProductLoading ? (
            <div className="mb-10">
              <div className="flex items-center gap-x-5">
                <Skeleton className="h-[60px] w-[60px] rounded-full" />
                <div>
                  <Skeleton className="mb-4 h-2 w-[200px] rounded-lg" />
                  <Skeleton className="h-2 w-[150px] rounded-lg" />
                </div>
              </div>

              <Skeleton className="mt-8 h-2 w-full rounded-lg" />
              <Skeleton className="mt-4 h-2 w-full rounded-lg" />
              <Skeleton className="mt-4 h-2 w-full rounded-lg" />
            </div>
          ) : (
            <div className="space-y-10">
              {reviews?.map((review, idx) => (
                <>
                  <ReviewCard key={review._id} review={review} />
                  {reviews?.length - 1 !== idx && <Separator />}
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
