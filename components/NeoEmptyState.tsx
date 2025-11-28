"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const NeoEmptyState = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/20 bg-white/50 py-16 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative mb-6"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-black bg-[#4ADE80] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CheckCircle2 className="h-12 w-12 text-black" strokeWidth={3} />
        </div>
        {/* Decor */}
        <div className="absolute -right-2 top-0 h-6 w-6 animate-bounce rounded-full border-2 border-black bg-[#FFDE59]"></div>
      </motion.div>
      <h3 className="text-xl font-black uppercase tracking-tight">
        All Clear, Chief!
      </h3>
      <p className="mt-2 max-w-xs text-sm font-semibold text-gray-500">
        No recent issues reported in your area. Campus is looking fresh today.
      </p>
    </div>
  );
};
