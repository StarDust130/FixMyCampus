"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Trophy,
  Edit2,
  Share2,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { NeoHeader } from "@/components/NeoHeader";
import { NeoBottomNav } from "@/components/NeoBottomNav";
import { NeoCard } from "@/components/NeoCards"; // Ensure correct path

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Mock User Data
  const user = {
    name: "Muzan",
    handle: "@demon_king_01",
    role: "Student Admin",
    level: 5,
    xp: 75,
    stats: {
      reported: 12,
      resolved: 8,
      karma: 450,
    },
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      console.log("Logging out...");
      // Add actual logout logic here
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans pb-32">
      {/* BACKGROUND TEXTURE */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* 1. HEADER */}
      <NeoHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-2xl mx-auto px-5 pt-8 space-y-6 relative z-10">
        {/* 2. HERO CARD (Character Sheet Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <NeoCard
            color="white"
            className="pt-10 pb-6 px-4 flex flex-col items-center text-center border-2 border-black relative mt-8"
          >
            {/* AVATAR (Floats half out of card) */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 group cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 rounded-full border-2 border-black bg-[#A2E2F9] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10"
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Muzan&backgroundColor=A2E2F9"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Level Badge */}
              <div className="absolute -bottom-2 -right-4 bg-[#FFDE59] border-2 border-black px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 z-20">
                <Trophy className="w-3 h-3" />
                Lvl {user.level}
              </div>
            </div>

            {/* TOP RIGHT ACTIONS */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg border-2 border-transparent hover:border-black transition-all active:scale-90">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg border-2 border-transparent hover:border-black transition-all active:scale-90">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {/* USER DETAILS */}
            <div className="mt-12 space-y-1 w-full">
              <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">
                {user.name}
              </h1>
              <p className="text-sm font-bold text-gray-400 tracking-wide">
                {user.handle}
              </p>

              <div className="pt-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-black bg-[#CBACF9] px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {user.role}
                </span>
              </div>
            </div>

            {/* XP BAR */}
            <div className="w-full mt-6 px-2 space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-gray-500">
                <span>XP Progress</span>
                <span>{user.xp} / 100</span>
              </div>
              <div className="w-full h-5 bg-gray-100 border-2 border-black rounded-full overflow-hidden relative shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${user.xp}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-green-400 relative border-r-2 border-black"
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)",
                      backgroundSize: "8px 8px",
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </NeoCard>
        </motion.div>

        {/* 3. STATS ROW (Clickable) */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Issues",
              value: user.stats.reported,
              color: "bg-pink-300",
              icon: "📝",
            },
            {
              label: "Fixed",
              value: user.stats.resolved,
              color: "bg-[#A2E2F9]",
              icon: "✅",
            },
            {
              label: "Karma",
              value: user.stats.karma,
              color: "bg-yellow-300",
              icon: "⚡",
            },
          ].map((stat, i) => (
            <motion.button
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${stat.color} border-2 border-black rounded-xl p-3 flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <span className="text-xl font-black leading-none">
                {stat.value}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-80">
                {stat.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* 4. MENU ITEMS (Working Links) */}
        <div className="space-y-3 pt-2">
          <h2 className="text-lg font-black uppercase tracking-tight ml-1 flex items-center gap-2">
            <Settings className="w-5 h-5" /> Settings
          </h2>

          {/* Personal Details */}
          <MenuLink
            href="/profile/edit"
            icon={User}
            label="Personal Details"
            color="bg-white"
            delay={0.2}
          />

          {/* Notifications Toggle (Interactive) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-white border-2 border-black rounded-xl p-4 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-200 rounded-lg border-2 border-black flex items-center justify-center">
                <Bell className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-sm uppercase tracking-wide">
                Notifications
              </span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 rounded-full border-2 border-black flex items-center p-1 transition-colors ${
                notificationsEnabled
                  ? "bg-green-400 justify-end"
                  : "bg-gray-300 justify-start"
              }`}
            >
              <motion.div
                layout
                className="w-4 h-4 bg-white border-2 border-black rounded-full shadow-sm"
              />
            </button>
          </motion.div>

          <MenuLink
            href="/help"
            icon={HelpCircle}
            label="Help & Support"
            color="bg-white"
            delay={0.4}
          />
          <MenuLink
            href="/security"
            icon={Shield}
            label="Security"
            color="bg-white"
            delay={0.5}
          />
        </div>

        {/* 5. LOGOUT BUTTON */}
        <motion.button
          onClick={handleLogout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#FFB7B2] border-2 border-black rounded-xl p-4 font-black uppercase tracking-widest text-red-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 mt-4 hover:bg-red-300"
        >
          <LogOut className="w-5 h-5" strokeWidth={2.5} />
          Log Out
        </motion.button>

        {/* Footer Credit */}
        <div className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 pt-2">
          FixMyCampus v1.0 • ID: 8823-X
        </div>
      </main>

      {/* 6. NAVIGATION */}
      <div className="md:hidden">
        <NeoBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onFabClick={() => {}}
        />
      </div>
    </div>
  );
}

// Reusable Link Component
const MenuLink = ({ href, icon: Icon, label, color, delay }: any) => (
  <Link href={href}>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full ${color} border-2 border-black rounded-xl p-4 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all mb-3`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg border-2 border-black flex items-center justify-center">
          <Icon className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-sm uppercase tracking-wide">
          {label}
        </span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </motion.div>
  </Link>
);
