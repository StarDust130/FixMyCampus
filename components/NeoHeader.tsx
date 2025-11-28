// components/NeoHeader.tsx
"use client";

import { motion } from "framer-motion";
import { Bell, Home, Search, User, LogOut } from "lucide-react";
import Image from "next/image";

interface NeoHeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const NeoHeader = ({ activeTab, setActiveTab }: NeoHeaderProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "activity", label: "Activity", icon: Bell },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <header className="w-full border-b-2 border-black bg-[#FFFDF5] z-40">
      <div className="mx-auto flex h-16 md:h-24 max-w-7xl items-center justify-between px-3 md:px-8">
        {/* --- LEFT SIDE: LOGO & BRAND --- */}
        <div className="flex items-center gap-0 md:gap-3">
          {/* LOGO */}
          <div className="relative h-20 w-20 shrink-0 ">
            <Image
              src="/logo.png"
              alt="FixMyCampus Logo"
              fill
              className="object-contain hover:scale-105 transition-transform"
              priority
            />
          </div>

          {/* TEXT BRANDING */}
          <div className="flex flex-col justify-center">
            <h1 className="text-xl md:text-3xl font-black uppercase leading-none tracking-tighter flex items-center gap-2">
              FixMyCampus
            </h1>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">
              Student Admin
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE (PC): FULL NAVIGATION --- */}
        <nav className="hidden md:flex items-center gap-1">
          <div className="flex items-center rounded-xl border-2 border-black bg-white p-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mr-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab?.(item.id)}
                  className={`relative flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-all ${
                    isActive
                      ? "text-black"
                      : "text-gray-500 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "stroke-[3px]" : "stroke-[2.5px]"
                    }`}
                  />
                  <span>{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="desktop-nav-bg"
                      className="absolute inset-0 rounded-lg bg-[#FFDE59] border-2 border-black -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button className="group flex items-center gap-2 rounded-xl border-2 border-black bg-[#FFB7B2] px-5 py-3 text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <LogOut
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              strokeWidth={2.5}
            />
            Logout
          </button>
        </nav>

        {/* --- RIGHT SIDE (PHONE): AVATAR --- */}
        <div className="md:hidden">
          <div className="relative cursor-pointer active:scale-95 transition-transform">
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Muzan&backgroundColor=A2E2F9"
                alt="Muzan's avatar"
                className="h-full w-full bg-[#A2E2F9]"
              />
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border border-black animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
