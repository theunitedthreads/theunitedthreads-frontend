"use client";
import Image from "next/image";
import userImg from "/public/images/home/testimonials/user.png";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomStarRating from "@/components/CustomStarRating/CustomStarRating";
import Autoplay from "embla-carousel-autoplay";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import {
  firstLetterUppercase,
  transformNameInitials,
} from "@/utils/transformNameInitials";

const data = {
  key: 1,
  user: userImg,
  name: "Christina L.",
  occupation: "Manager",
  rating: 4.5,
  review:
    "Great quality products - Flags, programs for exceptional capacities, birthday, and occasion welcome are largely still mainstream on paper.",
};

export default function TestimonialsSlider() {
  const { data: reviewsRes, isLoading } = useGetAllReviewsQuery({
    sort: "-rating",
  });
  const reviews = reviewsRes?.data || [];

  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{
          align: "start",
          duration: 55,
        }}
      >
        <CarouselContent className="-ml-6 py-5 lg:px-1">
          {reviews?.map((review) => (
            <CarouselItem
              key={review._id}
              className="basis-1/1 h-max pl-6 md:basis-1/2 lg:basis-1/3"
            >
              <div className="min-h-[200px] space-y-6 rounded-xl border border-gray-200 p-6 shadow-md">
                <div className="flex-center-start gap-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={review?.user?.profilePicture} />
                    <AvatarFallback className="font-medium">
                      {transformNameInitials(
                        review.user?.firstName + " " + review.user?.lastName,
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h5 className="text-lg font-semibold">
                      {firstLetterUppercase(review.user?.firstName)}{" "}
                      {firstLetterUppercase(review.user?.lastName)}
                    </h5>
                    <CustomStarRating rating={review.rating} />
                  </div>
                </div>

                <p>
                  {review.comment.length > 4000
                    ? `${review.comment?.slice(0, 4000)}...`
                    : review.comment}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDots
          className="mt-1"
          btnClass="h-2 w-2"
          activeClass="bg-black"
          nonActiveClass="bg-transparent border border-primary-black rounded-full"
        />
      </Carousel>
    </div>
  );
}
