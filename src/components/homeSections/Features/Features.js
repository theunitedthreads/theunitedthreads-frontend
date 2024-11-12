import React from "react";
import droplet from "/public/images/home/features/doplet.png";
import customProductIcon from "/public/images/home/features/custom products.png";
import shippingIcon from "/public/images/home/features/delivery.png";
import customDesignIcon from "/public/images/home/features/custom design.png";
import clockIcon from "/public/images/home/features/clock (1).png";
import Image from "next/image";

export default function Features() {
  return (
    <section className="lg:mx-auto">
      <div className="flex-center gap-x-2">
        <Image src={droplet} alt="droplet" height={20} width={20} />
        <p className="text-center text-xl font-medium text-primary-black lg:text-2xl">
          All the features you need
        </p>
      </div>

      <h1 className="mb-16 mt-4 text-center text-5xl font-extrabold text-primary-black lg:text-5xl xl:text-6xl">
        Fast and Quality Service
      </h1>

      <div className="grid w-full grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4 lg:gap-y-0">
        {/* ------- Feature 1 ---------- */}
        <div className="flex w-full flex-col items-center gap-y-3 text-center md:items-start md:text-left">
          <div className="flex-center h-20 w-20 rounded-xl bg-slate-200 p-4">
            <Image
              src={customProductIcon}
              alt="custom product icon"
              className="h-full w-full"
            />
          </div>
          <h4 className="text-xl font-medium text-primary-black">
            Custom Product
          </h4>
          <p>
            We offer tailored product solutions like Custom Product Designer
            services to meet your specific needs.
          </p>
        </div>

        {/* ------- Feature 2 ---------- */}
        <div className="flex w-full flex-col items-center gap-y-3 text-center md:items-start md:text-left">
          <div className="flex-center h-20 w-20 rounded-xl bg-slate-200 p-4">
            <Image
              src={shippingIcon}
              alt="secure shipping icon"
              className="h-full w-full"
            />
          </div>

          <h4 className="text-xl font-medium text-primary-black">
            Safe & Secure Shipping
          </h4>
          <p>
            Your orders are handled with care and shipped with the utmost
            security.
          </p>
        </div>

        {/* ------- Feature 3 ---------- */}
        <div className="flex w-full flex-col items-center gap-y-3 text-center md:items-start md:text-left">
          <div className="flex-center h-20 w-20 rounded-xl bg-slate-200 p-4">
            <Image
              src={customDesignIcon}
              alt="custom design icon"
              className="h-full w-full"
            />
          </div>

          <h4 className="text-xl font-medium text-primary-black">
            Custom Design
          </h4>
          <p>
            From concept to final product, we work closely with you to ensure
            every detail matches your expectations.
          </p>
        </div>

        {/* ------- Feature 4 ---------- */}
        <div className="flex w-full flex-col items-center gap-y-3 text-center md:items-start md:text-left">
          <div className="flex-center h-20 w-20 rounded-xl bg-slate-200 p-4">
            <Image src={clockIcon} alt="clock icon" className="h-full w-full" />
          </div>

          <h4 className="text-xl font-medium text-primary-black">
            24x7 Support
          </h4>
          <p>
            Our dedicated support team is available around the clock to assist
            you.
          </p>
        </div>
      </div>
    </section>
  );
}
