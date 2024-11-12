"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      className={cn(
        "fixed bottom-10 right-10 z-[9999] flex h-10 w-10 items-center justify-center rounded-full bg-primary-black text-xl font-bold text-white transition-all duration-300 ease-in-out hover:bg-primary-black/75",
        isVisible ? "visible opacity-100" : "invisible opacity-0",
      )}
      onClick={scrollToTop}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopBtn;
