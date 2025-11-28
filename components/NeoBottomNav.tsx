"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, FileText, User, Plus } from "lucide-react";
import Link from "next/link";

export const NeoBottomNav = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  // Configuration: Grouping Navigation Tabs
  const navTabs = [
    { id: "home", href: "/", icon: Home, label: "Home" },
    { id: "issues", href: "/issues", icon: FileText, label: "Issues" },
    { id: "profile", href: "/profile", icon: User, label: "Profile" },
  ];

  // Scroll Hide/Show Logic
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";

      if (direction === "down" && scrollY > 10) {
        setIsVisible(false);
      } else if (direction === "up") {
        setIsVisible(true);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none pb-6 px-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
            className="flex items-end gap-3 w-full max-w-sm pointer-events-auto"
          >
            {/* 1. LEFT CAPSULE: Navigation (Home, Issues, Profile) */}
            <div className="flex-1 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1.5 flex items-center gap-1 h-16">
              {navTabs.map((tab) => (
                <NavTab
                  key={tab.id}
                  tab={tab}
                  isActive={pathname === tab.href}
                />
              ))}
            </div>

            {/* 2. RIGHT BUTTON: Report Action (Big & Distinct) */}
            <Link href="/report" className="group">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-[#CBACF9] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                <Plus
                  className="w-8 h-8 text-black group-hover:rotate-90 transition-transform duration-300"
                  strokeWidth={3}
                />
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUB COMPONENT (Nav Tab) ---
const NavTab = ({ tab, isActive }: any) => {
  return (
    <Link
      href={tab.href}
      className={`relative flex items-center justify-center h-full rounded-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isActive ? "flex-[2]" : "flex-1"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="active-bg"
          className="absolute inset-0 bg-[#FFDE59] border-2 border-black rounded-xl"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}

      <div className="relative z-10 flex items-center justify-center gap-2 overflow-hidden px-1">
        <tab.icon
          className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
            isActive
              ? "text-black stroke-[3px]"
              : "text-gray-400 stroke-[2.5px]"
          }`}
        />

        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-black text-sm font-black uppercase tracking-tight whitespace-nowrap overflow-hidden"
            >
              {tab.label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
};
