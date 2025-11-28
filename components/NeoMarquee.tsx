"use client";
import { motion } from "framer-motion";

export const NeoMarquee = () => {
  return (
    <div className="overflow-hidden border-b-2 border-black bg-[#FFDE59] py-2">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="mx-4 text-xs font-black uppercase tracking-widest text-black"
          >
            ⚡ KEEP CAMPUS CLEAN • EARN KARMA POINTS • REPORT ISSUES INSTANTLY •
          </span>
        ))}
      </motion.div>
    </div>
  );
};
