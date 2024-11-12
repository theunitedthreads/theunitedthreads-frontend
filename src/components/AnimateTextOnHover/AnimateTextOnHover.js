"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AnimateTextOnHover({ children, link, path }) {
  const currentPathname = usePathname();

  if (link) {
    return (
      <Link
        href={link}
        className={cn("block", currentPathname === path && "font-bold")}
      >
        <Container>{children}</Container>
      </Link>
    );
  }

  return (
    <Container path={path} currentPathname={currentPathname}>
      {children}
    </Container>
  );
}

function Container({ children, path, currentPathname }) {
  return (
    <motion.div
      className={cn(
        "relative max-h-max max-w-max overflow-hidden",
        currentPathname === path && "font-bold",
      )}
      initial="initial"
      whileHover="hovered"
      style={{ lineHeight: 1.2 }}
    >
      <motion.div>
        {children.split("").map((l, idx) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.85, 0, 0.15, 1],
              delay: 0.025 * idx,
            }}
            key={idx + new Date().toISOString()}
            className="inline-block"
          >
            {l === " " ? <span>&nbsp;</span> : l}
          </motion.span>
        ))}
      </motion.div>

      <motion.div className="absolute inset-0">
        {children.split("").map((l, idx) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.95, 0, 0.15, 1],
              delay: 0.025 * idx,
            }}
            key={idx + new Date().toISOString()}
            className="inline-block"
          >
            {l === " " ? <span>&nbsp;</span> : l}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
