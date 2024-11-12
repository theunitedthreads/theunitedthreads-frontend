import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 p-6">
      <div className="h-52 w-full animate-pulse rounded-xl bg-slate-300" />
      <div className="mt-4 h-3 w-full animate-pulse rounded-xl bg-slate-300" />
      <div className="mt-4 h-3 w-3/4 animate-pulse rounded-xl bg-slate-300" />
      <div className="mt-4 h-8 w-1/2 animate-pulse rounded-full bg-slate-300" />
    </div>
  );
}
