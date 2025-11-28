"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, AlertTriangle, Construction } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans flex flex-col items-center justify-center relative overflow-hidden selection:bg-red-400">
      {/* 1. BACKGROUND NOISE & GRID */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* 2. INFINITE MARQUEE (Top & Bottom) */}
      <div className="absolute top-0 left-0 right-0 bg-black text-[#FFDE59] py-2 overflow-hidden border-b-2 border-black rotate-1 scale-105 z-0">
        <motion.div
          className="whitespace-nowrap font-black uppercase tracking-widest text-xs flex gap-4"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {Array(20)
            .fill(
              "PAGE NOT FOUND • LOST IN THE HALLWAY • ERROR 404 • WHERE ARE YOU? • "
            )
            .map((text, i) => (
              <span key={i}>{text}</span>
            ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black text-[#FFDE59] py-2 overflow-hidden border-t-2 border-black -rotate-1 scale-105 z-0">
        <motion.div
          className="whitespace-nowrap font-black uppercase tracking-widest text-xs flex gap-4"
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {Array(20)
            .fill("GO BACK HOME • WRONG TURN • SYSTEM FAULT • FIX MY CAMPUS • ")
            .map((text, i) => (
              <span key={i}>{text}</span>
            ))}
        </motion.div>
      </div>

      {/* 3. MAIN CONTENT CARD */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative z-10 max-w-sm w-full px-5"
      >
        <div className="bg-white border-2 border-black rounded-3xl p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
          {/* Floating Icons */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-8 -left-8 bg-yellow-300 p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Construction className="w-8 h-8" strokeWidth={2.5} />
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 bg-red-300 p-3 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <AlertTriangle className="w-8 h-8" strokeWidth={2.5} />
          </motion.div>

          {/* THE GIANT 404 */}
          <div className="font-black text-9xl tracking-tighter leading-none mb-2 relative inline-block">
            <span className="relative z-10">404</span>
            <span className="absolute top-1 left-1 text-gray-300 -z-10 select-none">
              404
            </span>

            {/* Glitch Line */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-1 bg-black"
              animate={{ scaleX: [1, 1.2, 0.8, 1], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
            />
          </div>

          <h1 className="text-2xl font-black uppercase tracking-tight mb-2">
            Wrong Turn?
          </h1>
          <p className="text-sm font-bold text-gray-500 mb-8 leading-relaxed">
            We can't find the page you're looking for. It might have been fixed
            already (or stolen).
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#CBACF9] border-2 border-black rounded-xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] transition-all"
              >
                <Home className="w-5 h-5" strokeWidth={2.5} />
                Go Home
              </motion.button>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full bg-white border-2 border-black rounded-xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] transition-all"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
