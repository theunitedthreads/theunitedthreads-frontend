"use client";

import confettiAnimation from "/public/lottie/confetti.json";
import Lottie from "react-lottie";

export default function ConfettiLottie() {
  const lottieSettings = {
    loop: false,
    autoplay: true,

    animationData: confettiAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie options={lottieSettings} height={"100%"} width={"100%"} speed={2} />
  );
}
