"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] p-5 space-y-6 pt-24 max-w-7xl mx-auto">
      {/* 1. Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-4">
          <Skeleton className="w-16 h-16 rounded-xl" /> {/* Logo */}
          <div className="space-y-2">
            <Skeleton className="w-40 h-8 rounded-lg" /> {/* Title */}
            <Skeleton className="w-24 h-4 rounded-md" /> {/* Subtitle */}
          </div>
        </div>
        <Skeleton className="w-12 h-12 rounded-full md:hidden" />{" "}
        {/* Avatar Mobile */}
        <div className="hidden md:flex gap-2">
          <Skeleton className="w-24 h-12 rounded-xl" />
          <Skeleton className="w-24 h-12 rounded-xl" />
          <Skeleton className="w-24 h-12 rounded-xl" />
        </div>
      </div>

      {/* 2. Hero / Main Card Skeleton */}
      <div className="w-full h-48 rounded-3xl border-2 border-black/10 bg-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent animate-shimmer" />
        <div className="flex flex-col gap-4">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <Skeleton className="w-1/2 h-10 rounded-lg" />
          <Skeleton className="w-1/3 h-4 rounded-md" />
        </div>
      </div>

      {/* 3. Grid Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-40 rounded-2xl border-2 border-black/10 bg-white p-4 space-y-3 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent animate-shimmer" />
            <div className="flex justify-between">
              <Skeleton className="w-16 h-6 rounded-md" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
            <Skeleton className="w-3/4 h-6 rounded-md" />
            <Skeleton className="w-full h-12 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Reusable Skeleton Component
const Skeleton = ({ className }: { className: string }) => (
  <div className={`bg-black/5 animate-pulse ${className}`} />
);
