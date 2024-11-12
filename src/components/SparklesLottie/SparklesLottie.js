"use client";

import sparklesAnimation from "/public/lottie/sparkles.json";
import Lottie from "react-lottie";

export default function SparklesLottie() {
  const lottieSettings = {
    loop: true,
    autoplay: true,

    animationData: sparklesAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={lottieSettings}
      height={"100px"}
      width={"100px"}
      speed={2}
    />
  );
}
