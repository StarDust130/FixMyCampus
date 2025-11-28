"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  AlertTriangle,
  Clock,
  Home,
  Plus,
  X,
  Filter,
  ChevronRight,
} from "lucide-react";

import { NeoBottomNav } from "@/components/NeoBottomNav";
import { NeoHeader } from "@/components/NeoHeader"; // New
import { NeoEmptyState } from "@/components/NeoEmptyState"; // New
import { NeoMarquee } from "@/components/NeoMarquee"; // New
import { NeoCard } from "@/components/NeoCards";

// --- Mock Data (Set to empty array [] to test Empty State) ---
const mockIssues = [
  {
    id: 1,
    title: "Broken Chair",
    category: "Furniture",
    status: "Critical",
    location: "Library, 2nd Floor",
    date: "2 mins ago",
    color: "orange" as const,
    icon: <Home className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Water Leak",
    category: "Infrastructure",
    status: "In Progress",
    location: "Hallway, Block B",
    date: "1 hour ago",
    color: "pink" as const,
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "AC Not Cooling",
    category: "Electrical",
    status: "Pending",
    location: "Lab 3, CS Dept",
    date: "3 hours ago",
    color: "blue" as const,
    icon: <Clock className="w-6 h-6" />,
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#FFFDF5] font-sans text-black selection:bg-pink-300">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* HEADER & MARQUEE */}
      <NeoHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <NeoMarquee />

      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-32 pt-8">
        {/* PC GRID LAYOUT */}
        <div className="grid gap-8 md:grid-cols-12">
          {/* LEFT COLUMN (Sidebar on PC) */}
          <div className="space-y-8 md:col-span-5 lg:col-span-4 lg:space-y-10">
            {/* HERO CTA */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <NeoCard
                color="pink"
                className="group relative flex h-52 flex-col justify-between overflow-hidden cursor-pointer transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                onClick={() => setIsReportModalOpen(true)}
              >
                <div className="relative z-10 flex justify-between items-start">
                  <div className="rounded-xl border-2 border-black bg-white/40 p-3 backdrop-blur-md transition-transform group-hover:rotate-12">
                    <Plus className="h-8 w-8 text-black" strokeWidth={3} />
                  </div>
                  <div className="rounded-full border-2 border-black bg-black px-2 py-1 text-[10px] font-bold text-white">
                    PRIORITY HIGH
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-4xl font-black leading-none tracking-tighter">
                    REPORT <br /> ISSUE
                  </h3>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                      Start Now
                    </p>
                  </div>
                </div>

                {/* Animated Decor */}
                <motion.div
                  className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full border-2 border-black bg-[#CBACF9] z-0"
                  animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </NeoCard>
            </motion.div>

            {/* STATS ROW */}
            <div className="grid grid-cols-2 gap-4">
              <NeoCard
                color="yellow"
                className="flex flex-col items-center justify-center gap-1 py-6 hover:-translate-y-1 transition-transform"
              >
                <span className="text-5xl font-black tracking-tighter">12</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-black/60">
                  Pending
                </span>
              </NeoCard>
              <NeoCard
                color="green"
                className="flex flex-col items-center justify-center gap-1 py-6 hover:-translate-y-1 transition-transform"
              >
                <span className="text-5xl font-black tracking-tighter">45</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-black/60">
                  Resolved
                </span>
              </NeoCard>
            </div>
          </div>

          {/* RIGHT COLUMN (Feed Area) */}
          <div className="md:col-span-7 lg:col-span-8">
            {/* Feed Header & Filters */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                  Recent Updates
                </h2>
                <p className="text-sm font-semibold text-gray-500">
                  What's happening around campus
                </p>
              </div>

              {/* Filter Chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                {["All", "Critical", "Furniture", "Tech"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-full border-2 border-black px-3 py-1 text-xs font-bold uppercase transition-all ${
                      filter === f
                        ? "bg-black text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* FEED CONTENT */}
            <div className="space-y-4">
              {mockIssues.length > 0 ? (
                mockIssues.map((issue) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <NeoCard
                      color="white"
                      className="flex items-center gap-4 p-4 transition-shadow hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {/* Icon */}
                      <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-2 border-black shadow-sm ${
                          issue.color === "orange"
                            ? "bg-orange-300"
                            : issue.color === "pink"
                            ? "bg-pink-300"
                            : "bg-blue-300"
                        }`}
                      >
                        {issue.icon}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="mr-2 truncate text-lg font-black leading-tight">
                            {issue.title}
                          </h4>
                          <span
                            className={`rounded border border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                              issue.status === "Critical"
                                ? "bg-red-400 text-white"
                                : "bg-[#FFDE59]"
                            }`}
                          >
                            {issue.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                          {issue.category}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-[11px] font-bold text-gray-400">
                          <span className="flex items-center gap-1 text-black">
                            <MapPin className="h-3 w-3" /> {issue.location}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                          <span>{issue.date}</span>
                        </div>
                      </div>

                      {/* Chevron for Desktop Interaction */}
                      <div className="hidden sm:block">
                        <div className="rounded-full border-2 border-black bg-gray-100 p-2 text-black transition-colors hover:bg-black hover:text-white">
                          <ChevronRight className="h-5 w-5" />
                        </div>
                      </div>
                    </NeoCard>
                  </motion.div>
                ))
              ) : (
                <NeoEmptyState />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAV (Hidden on PC) */}
      <div className="md:hidden">
        <NeoBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onFabClick={() => setIsReportModalOpen(true)}
        />
      </div>

      {/* REPORT MODAL */}
      <AnimatePresence>
        {isReportModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setIsReportModalOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
            >
              <div
                className="absolute right-4 top-4"
                onClick={() => setIsReportModalOpen(false)}
              >
                <div className="group cursor-pointer rounded-full border-2 border-black bg-red-400 p-1 transition-transform hover:rotate-90">
                  <X className="h-5 w-5 text-black" strokeWidth={3} />
                </div>
              </div>

              <h2 className="mb-2 text-3xl font-black uppercase">New Report</h2>
              <p className="mb-8 font-medium text-gray-500">
                Document the issue to help us fix it faster.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <button className="group flex h-40 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-black bg-[#A2E2F9] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-y-1 hover:shadow-none">
                  <div className="rounded-full border-2 border-black bg-white p-4 transition-transform group-hover:scale-110">
                    <div className="text-2xl">📷</div>
                  </div>
                  <span className="font-black uppercase tracking-wide">
                    Take Photo
                  </span>
                </button>
                <button className="group flex h-40 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-black bg-[#FFB7B2] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-y-1 hover:shadow-none">
                  <div className="rounded-full border-2 border-black bg-white p-4 transition-transform group-hover:scale-110">
                    <div className="text-2xl">📝</div>
                  </div>
                  <span className="font-black uppercase tracking-wide">
                    Text Only
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
