import CustomStarRating from "@/components/CustomStarRating/CustomStarRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import UpdateReviewModal from "./UpdateReviewModal";
import { format, formatDistanceToNow } from "date-fns";
import { transformNameInitials } from "@/utils/transformNameInitials";
import { Edit } from "lucide-react";
import { Trash } from "lucide-react";
import { useDeleteShopProductReviewMutation } from "@/redux/api/Shop Page Api/shopApi";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { errorToast, successToast } from "@/utils/customToast";
import { toast } from "sonner";

// const review = {
//   user: {
//     name: "Cristiano Ronaldo",
//     image: userImg,
//   },
//   rating: 5,
//   comment: "This product is really good!",
// };

export default function ReviewCard({ review }) {
  console.log("review:", review);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const userId = null;

  // ================ Delete review handler =================
  const [deleteReview] = useDeleteShopProductReviewMutation();
  const handleDeleteReview = async () => {
    const toastId = toast.loading("Deleting review...");

    try {
      await deleteReview(review?._id).unwrap();
      successToast("Review deleted successfully", toastId);
    } catch (error) {
      errorToast(error?.data?.message || error?.error, toastId);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-start gap-x-3">
          <Avatar className="h-[60px] w-[60px]">
            <AvatarImage
              src={review?.user?.profilePicture}
              className="rounded-full"
            />
            <AvatarFallback className="font-medium uppercase">
              {transformNameInitials(
                "",
                review?.user?.firstName,
                review?.user?.lastName,
              )}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-x-3">
              <p className="text-xl font-medium text-primary-black">
                {`${review?.user?.firstName} ${review?.user?.lastName}`}
              </p>
              <div className="h-1 w-1 rounded-full bg-primary-black"></div>

              <p>
                {review?.createdAt &&
                  formatDistanceToNow(new Date(review?.createdAt))}
              </p>
            </div>

            <div className="flex items-center gap-x-2">
              <CustomStarRating rating={review?.rating} />
              <p className="pt-1 font-medium text-yellow-500">
                ({review?.rating})
              </p>
            </div>
          </div>

          {/* Update and delete button */}
          <div className="ml-5 flex items-center gap-x-3">
            <div
              className="flex-center aspect-square h-7 w-7 rounded-full bg-blue-400 text-white"
              role="button"
              onClick={() => setShowUpdateModal(true)}
            >
              <Edit size={16} />
            </div>

            <CustomConfirm
              title="Delete Review"
              description="Are you sure you want to delete your review?"
              handleOk={handleDeleteReview}
            >
              <div
                className="flex-center aspect-square h-7 w-7 rounded-full bg-red-400 text-white"
                role="button"
              >
                <Trash size={16} />
              </div>
            </CustomConfirm>
          </div>
        </div>
        <p className="mt-5 text-lg text-primary-black">{review?.comment}</p>
      </div>

      {/* Update review modal */}
      <UpdateReviewModal
        review={review}
        userId={userId}
        open={showUpdateModal}
        setOpen={setShowUpdateModal}
      />
    </>
  );
}
