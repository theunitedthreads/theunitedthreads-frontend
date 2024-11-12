"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CustomSkeleton({ className, skeletonClass, length }) {
  const [skeletonLength, setSkeletonLength] = useState(0);

  useEffect(() => {
    if (!length || typeof length !== "number") {
      const randomNumber3to10 = Math.floor(Math.random() * (10 - 3 + 1) + 3);
      setSkeletonLength(randomNumber3to10);
    } else {
      setSkeletonLength(length);
    }
  }, [length]);
  return (
    <div className={className}>
      {Array.from({ length: skeletonLength }).map((_, idx) => (
        <Skeleton
          key={idx + new Date().toISOString()}
          className={`${skeletonClass} bg-slate-300`}
        />
      ))}
    </div>
  );
}
