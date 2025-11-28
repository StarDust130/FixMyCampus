"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">
      {/* Container: Row Layout */}
      <div className="flex items-center gap-3">
        {/* Spinner: Black, Fast Rotation (0.8s) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-black" strokeWidth={3} />
        </motion.div>

        {/* Text: Black, Uppercase */}
        <h2 className="text-2xl font-black uppercase tracking-widest text-black">
          Loading...
        </h2>
      </div>
    </div>
  );
}
