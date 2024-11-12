"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "./Hero.css";
import apparelDesignIllustration from "/public/images/hero/hero-illustration.png";
import { motion } from "framer-motion";

// Motion Variants
const fadeUp = {
  initial: {
    y: 10,
    opacity: 0,
    filter: "blur(0.5px)",
  },

  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      stiffness: 500,
      damping: 10,
      mass: 30,
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

const getToFullWidth = {
  initial: {
    width: "0",
  },
  animate: {
    width: "100%",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      delay: 0.2,
    },
  },
};

const slideLeft = {
  initial: {
    y: 10,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  return (
    <div className="flex-center-between flex-col gap-y-12 lg:flex-row lg:gap-y-0">
      {/* Left */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="text-center text-primary-black lg:w-1/2 lg:text-left"
      >
        <motion.h1
          variants={fadeUp}
          className="text-5xl font-extrabold md:text-6xl lg:leading-[1.35] 2xl:text-7xl"
        >
          Design Your Own{" "}
          <div className="relative z-10 mx-auto w-max px-5 text-white lg:mx-0">
            <motion.div
              variants={getToFullWidth}
              className="absolute left-1/2 top-1 -z-10 h-full w-full -translate-x-1/2 -rotate-[1deg] bg-primary-black lg:left-0 lg:top-2 lg:translate-x-0"
            ></motion.div>
            Apparel
          </div>
        </motion.h1>

        <motion.h3
          variants={fadeUp}
          className="mb-5 mt-8 text-3xl font-medium md:text-4xl"
        >
          Unleash Your Creativity
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="font-medium text-secondary-1 md:text-lg lg:w-3/4"
        >
          We pride ourselves in providing a curated collection of custom apparel
          designed to inspire and empower
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="md:mx-auto md:w-3/4 lg:mx-0 lg:w-[50%] 2xl:w-[43%]"
        >
          <Link href={"/products"} className="block w-full">
            <button
              className="flex-center-between lg:hover-bubble mt-10 w-full rounded-full border border-primary-black bg-transparent px-4 py-2 text-lg text-primary-black"
              id="request-quote-btn"
            >
              Request a quote
              <div className="rounded-full border border-primary-black p-[6px]">
                <ArrowRight size={20} className="-rotate-45" />
              </div>
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right */}
      <motion.div
        variants={slideLeft}
        initial="initial"
        animate="animate"
        className="w-full lg:w-1/2"
      >
        <Image
          src={apparelDesignIllustration}
          alt="Hero section banner image"
          height={1200}
          width={1200}
          className="mx-auto w-full md:w-3/4 lg:mx-0 lg:ml-auto lg:w-[90%]"
        />
      </motion.div>
    </div>
  );
}
