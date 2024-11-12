import React from "react";
import Image from "next/image";
import bgFlowers from "/public/images/floating-flowers.png";

export default function AuthLayout({ children }) {
  return (
    <div className="relative lg:mx-auto lg:w-3/4">
      {/* Background flowers */}
      <Image
        src={bgFlowers}
        alt="background effect"
        className="absolute -top-16 right-10 -z-10"
        height={700}
        width={700}
      />

      <div className="mx-auto max-w-max">{children}</div>
    </div>
  );
}
