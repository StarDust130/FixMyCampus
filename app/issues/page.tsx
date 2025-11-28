/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, Clock, X, MapPin, Filter } from "lucide-react";
import { NeoHeader } from "@/components/NeoHeader";
import { NeoBottomNav } from "@/components/NeoBottomNav";
import { NeoCard } from "@/components/NeoCards"; // Ensure path is correct

// --- CSS FOR HIDING SCROLLBAR (Internal Style) ---
const scrollbarHideStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Mock Data
const categories = [
  "All",
  "Critical",
  "Furniture",
  "Electrical",
  "Plumbing",
  "Cleaning",
  "Network",
  "Other",
];

const initialIssues = [
  {
    id: 1,
    title: "Broken Projector",
    description:
      "The projector in Lab 3 keeps flickering. We have a presentation tomorrow.",
    status: "Open",
    type: "Electrical",
    time: "2h ago",
    location: "Computer Lab 3",
    color: "pink",
  },
  {
    id: 2,
    title: "Leaking Tap",
    description: "Water is leaking continuously near the water cooler area.",
    status: "In Progress",
    type: "Plumbing",
    time: "4h ago",
    location: "2nd Floor Corridor",
    color: "blue",
  },
  {
    id: 3,
    title: "Missing Chair",
    description: "One chair is missing from the staff room.",
    status: "Resolved",
    type: "Furniture",
    time: "1d ago",
    location: "Staff Room",
    color: "green",
  },
  {
    id: 4,
    title: "Dirty Hallway",
    description: "Mud and trash scattered near the entrance.",
    status: "Open",
    type: "Cleaning",
    time: "1d ago",
    location: "Main Entrance",
    color: "orange",
  },
  {
    id: 5,
    title: "Wifi Down",
    description: "No internet access in the library.",
    status: "Critical",
    type: "Network",
    time: "2m ago",
    location: "Library",
    color: "yellow",
  },
  {
    id: 6,
    title: "Window Cracked",
    description: "Glass crack in the window pane.",
    status: "Open",
    type: "Furniture",
    time: "3h ago",
    location: "Classroom 4B",
    color: "pink",
  },
];

export default function IssuesPage() {
  const [activeTab, setActiveTab] = useState("search");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  // Filter Logic
  const filteredIssues = initialIssues.filter((issue) => {
    const matchesSearch = issue.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeFilter === "All" ||
      issue.type === activeFilter ||
      (activeFilter === "Critical" && issue.status === "Critical");
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans pb-32">
      <style>{scrollbarHideStyles}</style>

      {/* 1. HEADER */}
      <NeoHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto relative">
        {/* 2. SEARCH & FILTER BAR (Sticky) */}
        <div className="sticky top-0 z-30 bg-[#FFFDF5]/95 backdrop-blur-md border-b-2 border-black/10 py-4 px-5 space-y-4 shadow-sm transition-all">
          {/* Search Input with 'X' Clear Button */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl py-3 pl-12 pr-12 font-bold outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-0.5 transition-all placeholder:text-gray-400"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />

            {/* The 'X' Clear Button */}
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-gray-200 rounded-full hover:bg-black hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={3} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Horizontal Filter Scroll - FIXED & NO SCROLLBAR */}
          <div className="w-full overflow-x-auto no-scrollbar pb-1">
            <div className="flex gap-2 w-max px-1">
              <div className="flex items-center gap-1 pr-2 text-gray-400">
                <Filter className="w-4 h-4" />
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-lg border-2 border-black text-xs font-black uppercase whitespace-nowrap transition-all active:scale-95 ${
                    activeFilter === cat
                      ? "bg-black text-white shadow-[3px_3px_0px_0px_rgba(100,100,100,1)] -translate-y-0.5"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. ISSUES LIST */}
        <div className="p-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <motion.div
                  layout
                  key={issue.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedIssue(issue)}
                >
                  <NeoCard
                    color="white"
                    className="p-4 flex flex-col gap-3 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer h-full border-2 border-black"
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`px-2 py-1 rounded border-2 border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                          issue.status === "Critical"
                            ? "bg-red-400 text-white"
                            : issue.status === "Resolved"
                            ? "bg-green-400"
                            : "bg-[#FFDE59]"
                        }`}
                      >
                        {issue.status}
                      </span>
                      <div className="bg-black text-white p-1 rounded-full">
                        <ArrowUpRight className="w-3 h-3" strokeWidth={3} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-black leading-tight line-clamp-1">
                        {issue.title}
                      </h3>
                      <p className="text-xs font-bold text-gray-500 uppercase mt-1">
                        {issue.type}
                      </p>
                    </div>

                    <div className="w-full h-0.5 bg-gray-100" />

                    <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {issue.time}
                      </div>
                      <div className="flex items-center gap-1 text-black bg-gray-100 px-2 py-0.5 rounded-full border border-black/10">
                        <MapPin className="w-3 h-3" />
                        Block A
                      </div>
                    </div>
                  </NeoCard>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-16 flex flex-col items-center justify-center text-center opacity-40 gap-2"
              >
                <div className="bg-gray-200 p-4 rounded-full">
                  <Search className="w-8 h-8" />
                </div>
                <p className="font-bold">No issues found.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                  }}
                  className="text-sm underline text-blue-500 font-bold"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* 4. DETAILS MODAL */}
      <AnimatePresence>
        {selectedIssue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setSelectedIssue(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFFDF5] w-full max-w-lg rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 relative overflow-hidden flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button
                onClick={() => setSelectedIssue(null)}
                className="absolute top-4 right-4 bg-red-400 border-2 border-black rounded-full p-2 hover:rotate-90 transition-transform z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <X className="w-5 h-5 text-black" strokeWidth={3} />
              </button>

              <div
                className={`w-full h-32 shrink-0 rounded-xl border-2 border-black flex items-center justify-center ${
                  selectedIssue.color === "pink"
                    ? "bg-pink-200"
                    : selectedIssue.color === "blue"
                    ? "bg-blue-200"
                    : "bg-yellow-200"
                }`}
              >
                <div className="bg-white/50 px-4 py-2 rounded-lg border-2 border-black font-black uppercase tracking-widest text-sm backdrop-blur-md">
                  No Image
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded border-2 border-black text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      selectedIssue.status === "Critical"
                        ? "bg-red-400 text-white"
                        : "bg-[#FFDE59]"
                    }`}
                  >
                    {selectedIssue.status}
                  </span>
                  <span className="text-gray-400 font-bold text-xs">
                    • {selectedIssue.time}
                  </span>
                </div>
                <h2 className="text-2xl font-black uppercase leading-tight">
                  {selectedIssue.title}
                </h2>
                <p className="text-gray-500 font-bold text-sm mt-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {selectedIssue.location}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border-2 border-black text-sm font-medium leading-relaxed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {selectedIssue.description}
              </div>

              <button className="w-full bg-black text-white font-black uppercase py-4 rounded-xl border-2 border-transparent shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2">
                View Full Thread
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. NAVIGATION */}
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
