// components/NeoBottomNav.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Bell, User, Plus } from "lucide-react";

interface NeoBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onFabClick: () => void;
}

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "search", icon: Search, label: "Find" },
  { id: "activity", icon: Bell, label: "Alerts" },
  { id: "profile", icon: User, label: "Profile" },
];

export const NeoBottomNav = ({
  activeTab,
  setActiveTab,
  onFabClick,
}: NeoBottomNavProps) => {
  // 1. Built-in Scroll Logic (No extra file needed)
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";

      // Hide if scrolling down more than 10px, Show if scrolling up
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
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none pb-6">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
            className="pointer-events-auto bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1.5 flex items-center gap-1 w-full max-w-sm h-16"
          >
            {/* LEFT TABS */}
            {tabs.slice(0, 2).map((tab) => (
              <NavTab
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}

            {/* CENTER ACTION BUTTON */}
            <motion.button
              onClick={onFabClick}
              whileTap={{ scale: 0.9 }}
              className="relative w-12 h-full bg-[#CBACF9] border-2 border-black rounded-xl flex items-center justify-center shrink-0 mx-1 overflow-hidden group active:bg-[#b08adb]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Plus className="w-6 h-6 text-black" strokeWidth={3} />
            </motion.button>

            {/* RIGHT TABS */}
            {tabs.slice(2, 4).map((tab) => (
              <NavTab
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUB COMPONENT ---
const NavTab = ({ tab, isActive, onClick }: any) => {
  return (
    <button
      onClick={onClick}
      // "flex-[2]" makes the button expand when active
      className={`relative flex items-center justify-center h-full rounded-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isActive ? "flex-[2.5]" : "flex-1"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="active-bg"
          // FIXED: Yellow Background instead of Black
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

        {/* Text Label - Shows smoothly when active */}
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
    </button>
  );
};
