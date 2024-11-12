"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AnimatedCategoryLink({ children, route }) {
  return (
    <motion.div className="group relative max-w-max px-2">
      <motion.div
        layoutId="category-link"
        className="absolute inset-0 -z-10 rounded bg-gray-200/60 opacity-0 group-hover:opacity-100"
      ></motion.div>
      <Link href={"/products?c=" + route}>{children}</Link>
    </motion.div>
  );
}
