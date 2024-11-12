"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import {
  useGetAllCategoriesQuery,
  useGetShopCategoriesQuery,
} from "@/redux/api/Shop Page Api/shopApi";
import { motion } from "framer-motion";

// Motion Variants
const fadeIn = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 220,
      damping: 20,
      mass: 1,
    },
  },
};

export default function Categories() {
  const { data: categories, isLoading } = useGetShopCategoriesQuery();

  console.log(categories);

  return (
    <section className="text-primary-black">
      <h2 className="py-1 text-center text-5xl font-extrabold lg:px-10 lg:text-6xl">
        Shop By Categories
      </h2>

      {/* Categories */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-16"
      >
        {isLoading ? (
          <div className="max-w-3/4 hide-scroll mx-auto flex items-center gap-x-4 overflow-auto">
            {Array?.from({ length: 5 })?.map((_, idx) => (
              <div key={idx} className="w-full">
                <div
                  key={idx}
                  className="mx-auto h-40 w-40 animate-pulse rounded-full bg-slate-200"
                />
                <div className="mx-auto mt-3 h-4 w-3/4 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              loop: false,
              duration: 30,
              align: "start",
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent>
              {categories?.map((category) => (
                <CarouselItem
                  key={category?._id}
                  className="w-full basis-1/2 md:basis-1/3 lg:basis-1/6"
                >
                  <Link
                    href={
                      category?.type === "QUOTE"
                        ? `/products?category=${category?._id}`
                        : `/shop?category=${category?._id}`
                    }
                    className="group"
                  >
                    <div className="flex-center aspect-square w-full rounded-full bg-[#f4f4f4] p-2">
                      <Image
                        src={category?.image}
                        alt={`${category?.name} category`}
                        height={1200}
                        width={1200}
                        className="aspect-square h-auto w-3/4 rounded-full transition-all duration-300 ease-in-out group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 text-center font-medium">
                      {category?.name}
                    </p>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselNext className="hidden lg:-right-16 lg:flex" />
            <CarouselPrevious className="hidden lg:-left-16 lg:flex" />
          </Carousel>
        )}
      </motion.div>
    </section>
  );
}
