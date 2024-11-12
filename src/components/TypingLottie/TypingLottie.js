"use client";

import typingAnimation from "/public/lottie/Typing Animation.json";
import Lottie from "react-lottie";

export default function TypingLottie() {
  const lottieSettings = {
    loop: true,
    autoplay: true,

    animationData: typingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-[20px] w-[100px]">
      <Lottie options={lottieSettings} speed={1} />
    </div>
  );
}
