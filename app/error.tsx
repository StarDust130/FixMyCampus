"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Home, Unplug, Terminal } from "lucide-react";
import Link from "next/link";

// 1. FIXED TYPESCRIPT ERROR: Explicitly define the interface
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console or analytics
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans flex flex-col items-center justify-center p-5 relative overflow-hidden">
      {/* 2. BACKGROUND GRID */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* 3. STACKED CARD UI */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative w-full max-w-sm"
      >
        {/* Black Shadow Card (Back Layer) */}
        <div className="absolute top-3 left-3 w-full h-full bg-black rounded-3xl z-0" />

        {/* Main White Card (Front Layer) */}
        <div className="bg-white border-2 border-black rounded-3xl relative z-10 overflow-hidden flex flex-col">
          {/* TERMINAL HEADER STRIP */}
          <div className="bg-black text-white p-3 flex justify-between items-center px-5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 border border-white/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 border border-white/20" />
              <div className="w-3 h-3 rounded-full bg-green-500 border border-white/20" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-70">
              Error_Report
            </div>
          </div>

          <div className="p-8 text-center flex flex-col items-center">
            {/* ANIMATED ICON */}
            <div className="relative mb-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="w-24 h-24 bg-[#FFB7B2] rounded-2xl border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10"
              >
                <Unplug className="w-10 h-10 text-black" strokeWidth={2.5} />
              </motion.div>

              {/* Spinning Decor */}
              <div className="absolute -top-3 -right-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-8 h-8 bg-[#A2E2F9] rounded-full border-2 border-black border-dashed" />
                </motion.div>
              </div>
            </div>

            {/* TEXT */}
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 leading-none text-red-500">
              Something Went Wrong 😭
            </h2>
            <p className="text-sm font-bold text-gray-500 mb-8 leading-relaxed max-w-[260px]">
              An unexpected error occurred. Please try again or contact support
              if the issue persists.
            </p>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 w-full">
              <button
                onClick={() => reset()}
                className="w-full bg-black text-white border-2 border-black rounded-xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-[4px_4px_0px_0px_rgba(203,172,249,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>

              <Link href="/" className="block w-full">
                <button className="w-full bg-white text-black border-2 border-black rounded-xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5">
                  <Home className="w-4 h-4" />
                  Go Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FOOTER */}
      <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <Terminal className="w-3 h-3" />
        <span>Error_Code: 500_Internal_Server_Error</span>
      </div>
    </div>
  );
}
