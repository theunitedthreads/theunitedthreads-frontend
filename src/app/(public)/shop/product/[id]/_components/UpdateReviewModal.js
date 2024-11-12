import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useUpdateShopProductReviewMutation } from "@/redux/api/Shop Page Api/shopApi";
import { errorToast, successToast } from "@/utils/customToast";
import { Controller, useForm } from "react-hook-form";
import StarRatings from "react-star-ratings";
import { toast } from "sonner";

export default function UpdateReviewModal({ open, setOpen, review }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [updateReview] = useUpdateShopProductReviewMutation();
  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating review...");

    try {
      await updateReview({ id: review?._id, data }).unwrap();
      setOpen(false);
      successToast("Review updated successfully", toastId);
    } catch (error) {
      errorToast(error?.data?.message || error?.error, toastId);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen} className="relative">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <h4 className="text-2xl font-bold">What do you rate?</h4>

              <Controller
                name="rating"
                control={control}
                rules={{ required: "Rating is required / Data hasn't changed" }}
                render={({ field }) => (
                  <>
                    <StarRatings
                      rating={field.value || review?.rating}
                      numberOfStars={5}
                      starRatedColor="#FFAD33"
                      starEmptyColor="#bfbfbf"
                      starHoverColor="#FFAD33"
                      svgIconViewBox="0 0 16 15"
                      svgIconPath="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z"
                      starDimension={"35px"}
                      starSpacing={"3px"}
                      changeRating={(val) => {
                        field.onChange(val);
                      }}
                    />

                    {errors.rating && (
                      <p className="text-sm text-red-500">
                        {errors.rating.message}
                      </p>
                    )}
                  </>
                )}
              />

              <p className="text-lg">
                Please share your experience with this product
              </p>

              <Controller
                name="comment"
                control={control}
                rules={{
                  required:
                    "Please share your review to help know others about the product / Data hasn't changed",
                }}
                render={({ field }) => (
                  <>
                    <textarea
                      {...field}
                      placeholder="Your review"
                      className="min-h-[200px] w-full rounded border border-primary-black bg-primary-white p-4 text-[17px] text-primary-black"
                      minLength={70}
                      defaultValue={review?.comment}
                    />

                    {errors.review && (
                      <p className="text-sm text-red-500">
                        {errors.review.message}
                      </p>
                    )}
                  </>
                )}
              />

              <div>
                <AlertDialogCancel
                  htmlType="button"
                  className="absolute right-0 top-0 border-none shadow-none"
                >
                  X
                </AlertDialogCancel>
                <button
                  type="submit"
                  className="primary-button flex h-10 w-full items-center justify-center gap-x-3 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
