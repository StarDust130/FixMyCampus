"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Home, Bomb, AlertOctagon } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FFF5F5] text-black font-sans flex flex-col items-center justify-center p-5 relative overflow-hidden selection:bg-red-500 selection:text-white">
      {/* 1. BACKGROUND PATTERN (Red Alert Style) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#ff0000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* 2. DECORATIVE BACKGROUND BLOBS */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-[-5%] right-[-10%] w-64 h-64 bg-red-200 rounded-full blur-3xl opacity-50 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-[-5%] left-[-10%] w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-50 pointer-events-none"
      />

      {/* 3. MAIN ERROR CARD */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white border-2 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          {/* Caution Tape Strip */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-yellow-400 border-b-2 border-black flex items-center overflow-hidden">
            <div className="flex gap-4 text-[8px] font-black uppercase tracking-widest whitespace-nowrap animate-marquee">
              {Array(10)
                .fill("SYSTEM ERROR • DO NOT PANIC • RESTART REQUIRED • ")
                .map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center text-center">
            {/* ANIMATED ICON */}
            <motion.div
              animate={{ rotate: [-5, 5, -5, 5, 0], x: [-2, 2, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 2 }}
              className="w-20 h-20 bg-red-500 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-6 relative"
            >
              <Bomb className="w-10 h-10 text-white" strokeWidth={2.5} />
              <div className="absolute -top-2 -right-2 bg-yellow-400 border-2 border-black rounded-full p-1.5 animate-bounce">
                <AlertOctagon className="w-4 h-4 text-black" />
              </div>
            </motion.div>

            <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
              System Meltdown
            </h1>
            <p className="text-sm font-bold text-gray-500 mb-6 max-w-xs">
              Something went wrong on our end. The hamsters running our servers
              have stopped running.
            </p>

            {/* FAKE TERMINAL (Makes it look techy) */}
            <div className="w-full bg-black rounded-xl border-2 border-black p-4 mb-6 text-left overflow-hidden relative group">
              <div className="flex gap-1.5 mb-3 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <code className="text-[10px] md:text-xs font-mono text-green-400 block leading-relaxed">
                <span className="text-pink-500">root@campus:</span>
                <span className="text-blue-400">~</span>$ initiate_recovery
                <br />
                <span className="text-red-500">
                  Error: 500 Internal Server Error
                </span>
                <br />
                <span className="opacity-50">
                  {error.message || "Unknown error occurred..."}
                </span>
                <br />
                <span className="animate-pulse">_</span>
              </code>

              {/* Glitch Overlay */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 pointer-events-none animate-pulse" />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-3 w-full">
              <motion.button
                onClick={reset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#CBACF9] border-2 border-black rounded-xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] transition-all"
              >
                <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
                Reboot System (Try Again)
              </motion.button>

              <Link href="/" className="w-full">
                <button className="w-full bg-white border-2 border-black rounded-xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] transition-all">
                  <Home className="w-5 h-5" strokeWidth={2.5} />
                  Safe Mode (Home)
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
