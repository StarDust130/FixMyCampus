"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Ghost, Map, Footprints } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans flex flex-col items-center justify-center relative overflow-hidden selection:bg-[#CBACF9]">
      {/* 1. BACKGROUND DOODLES (Animated Grid) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* 2. TOP MARQUEE (Tilted & Fast) */}
      <div className="absolute top-12 -left-10 -right-10 bg-[#FFDE59] text-black py-3 border-y-2 border-black rotate-3 z-0 shadow-sm transform origin-left">
        <motion.div
          className="whitespace-nowrap font-black uppercase tracking-widest text-xs flex gap-8"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          {Array(10)
            .fill(
              "👻 GHOST TOWN • 404 ERROR • NOTHING TO SEE HERE 👀 • TURN BACK NOW 🛑 • WHOOPSIE 🤪 • "
            )
            .map((text, i) => (
              <span key={i}>{text}</span>
            ))}
        </motion.div>
      </div>

      {/* 3. BOTTOM MARQUEE (Tilted opposite way) */}
      <div className="absolute bottom-12 -left-10 -right-10 bg-[#CBACF9] text-black py-3 border-y-2 border-black -rotate-3 z-0 shadow-sm transform origin-right">
        <motion.div
          className="whitespace-nowrap font-black uppercase tracking-widest text-xs flex gap-8"
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          {Array(10)
            .fill(
              "LOST IN SPACE 🚀 • PAGE SKIPPED CLASS 🏃‍♂️ • SYSTEM OOPSIE • RETURN TO BASE 🏠 • "
            )
            .map((text, i) => (
              <span key={i}>{text}</span>
            ))}
        </motion.div>
      </div>

      {/* 4. MAIN CONTENT CARD */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.6 }}
        className="relative z-10 w-full max-w-sm px-6"
      >
        <div className="bg-white border-2 border-black rounded-3xl p-8 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative">
          {/* Floating Stickers */}
          <motion.div
            animate={{ y: [-10, 5, -10], rotate: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-8 -left-6 bg-pink-300 p-3 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-12"
          >
            <Ghost className="w-8 h-8 text-black" strokeWidth={2.5} />
          </motion.div>

          <motion.div
            animate={{ y: [5, -10, 5], rotate: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-4 bg-blue-300 p-3 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-12"
          >
            <Map className="w-8 h-8 text-black" strokeWidth={2.5} />
          </motion.div>

          {/* THE BIG 404 */}
          <div className="relative inline-block mb-4 mt-4">
            <h1 className="text-9xl font-black tracking-tighter leading-none text-black select-none relative z-10">
              4<span className="text-[#FFDE59]">0</span>4
            </h1>

            {/* Eyes inside the Zero */}
            <motion.div
              animate={{ x: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 z-20"
            >
              <div className="w-3 h-3 bg-black rounded-full" />
              <div className="w-3 h-3 bg-black rounded-full" />
            </motion.div>

            {/* Shadow Text */}
            <span className="absolute top-1 left-1 text-9xl font-black tracking-tighter leading-none text-gray-200 -z-10">
              404
            </span>
          </div>

          <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">
            Dude, You're Lost 🗺️
          </h2>
          <p className="text-sm font-bold text-gray-500 mb-8 leading-relaxed px-4">
            We looked everywhere (even under the bed) but we couldn't find this
            page.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-black text-white border-2 border-transparent rounded-xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#CBACF9] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <Home className="w-5 h-5" />
                Home
              </motion.button>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full bg-white text-black border-2 border-black rounded-xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Footprints className="w-5 h-5" strokeWidth={2.5} />
              GO Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
