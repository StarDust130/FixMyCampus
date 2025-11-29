"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  AlertTriangle,
  Plus,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Activity,
  BellRing,
  Zap,
  Droplets,
  Armchair,
  Wifi,
  Loader2,
  Award,
  User,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { fetchIssuesWithCache } from "@/lib/cache-fetch"; // Import SWR Logic

import { NeoBottomNav } from "@/components/NeoBottomNav";
import { NeoHeader } from "@/components/NeoHeader";
import { NeoMarquee } from "@/components/NeoMarquee";
import { NeoCard } from "@/components/NeoCards";

// --- HELPER: Time Ago ---
const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// --- HELPER: Random Avatar ---
const getAvatar = (seed: string) =>
  `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=FFDE59,FFB7B2,A2E2F9`;

// --- DATA: Quick Actions ---
const quickActions = [
  {
    icon: Zap,
    label: "Electric",
    color: "bg-yellow-300",
    link: "/issues?filter=Electrical",
  },
  {
    icon: Droplets,
    label: "Water",
    color: "bg-blue-300",
    link: "/issues?filter=Plumbing",
  },
  {
    icon: Armchair,
    label: "Furniture",
    color: "bg-orange-300",
    link: "/issues?filter=Furniture",
  },
  {
    icon: Wifi,
    label: "Wifi",
    color: "bg-green-300",
    link: "/issues?filter=Network",
  },
];

// --- SUB-COMPONENTS (Local Definitions) ---

const StatusPill = ({ status }: { status: string }) => {
  let color = "bg-yellow-300";
  let text = "Open";
  if (status === "Resolved") {
    color = "bg-green-400";
    text = "Fixed";
  }
  if (status === "Critical") {
    color = "bg-red-500 text-white";
    text = "Critical";
  }
  if (status === "In Progress") {
    color = "bg-blue-400";
    text = "In Progress";
  }

  return (
    <span
      className={`text-[10px] font-black uppercase border-2 border-black px-3 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${color}`}
    >
      {text}
    </span>
  );
};

const EmptyStateCool = () => (
  <div className="border-2 border-black border-dashed rounded-3xl p-12 flex flex-col items-center text-center bg-gray-50/50">
    <div className="w-24 h-24 bg-[#FFDE59] rounded-full border-2 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
      <CheckCircle2 className="w-12 h-12 text-black" strokeWidth={2.5} />
    </div>
    <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">
      All Clear
    </h3>
    <p className="text-sm font-bold text-gray-500 max-w-xs leading-relaxed">
      No active issues reported right now. Campus is looking 100% clean.
    </p>
  </div>
);

const StatCard = ({ label, value, color }: any) => (
  <div
    className={`${color} border-2 border-black rounded-3xl p-6 flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all`}
  >
    <span className="text-5xl font-black tracking-tighter leading-none mb-1">
      {value}
    </span>
    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 bg-black/10 px-3 py-1 rounded-full">
      {label}
    </span>
  </div>
);

// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [issues, setIssues] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ pending: 0, resolved: 0, critical: 0 });
  const [localIssues, setLocalIssues] = useState<any[]>([]);

  // FETCH REAL DATA USING CACHING (SWR PATTERN)
  useEffect(() => {
    fetchIssuesWithCache(setIssues, setIsLoading);
    const interval = setInterval(() => {
      fetchIssuesWithCache(setIssues, () => {});
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculate Stats and Limit Feed Items
  useEffect(() => {
    if (issues.length > 0) {
      const resolvedCount = issues.filter(
        (i: any) => i.status === "Resolved"
      ).length;
      const pendingCount = issues.filter(
        (i: any) => i.status !== "Resolved"
      ).length;
      const criticalCount = issues.filter(
        (i: any) => i.status === "Critical"
      ).length;
      setStats({
        pending: pendingCount,
        resolved: resolvedCount,
        critical: criticalCount,
      });

      // Limit to top 5 for the feed display
      setLocalIssues(issues.slice(0, 5));
    } else {
      setLocalIssues([]);
    }
  }, [issues]);

  return (
    <div className="min-h-screen bg-[#FFFDF5] font-sans text-black selection:bg-pink-300 pb-36">
      {/* Background Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <NeoHeader activeTab="home" />
      <NeoMarquee />

      <main className="relative z-10 mx-auto max-w-7xl px-5 pt-8 space-y-12 md:space-y-8">
        {/* --- GRID LAYOUT --- */}
        <div className="grid gap-10 md:gap-8 md:grid-cols-12 items-start">
          {/* === LEFT SIDEBAR (Mobile Spacing Fixed) === */}
          <div className="space-y-8 md:col-span-5 lg:col-span-4 md:sticky md:top-24">
            {/* 1. CAMPUS ALERTS */}
            <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-lg border-2 border-black animate-pulse">
                <BellRing className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-wide mb-1">
                  Maintenance Alert
                </h4>
                <p className="text-xs font-bold text-gray-500 leading-tight">
                  Power outage scheduled in Library Block from 6 PM to 7 PM.
                </p>
              </div>
            </div>

            {/* 2. HERO REPORT CTA */}
            <Link href="/report">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <NeoCard
                  color="pink"
                  className="group relative h-80 md:h-72 flex flex-col justify-between overflow-hidden cursor-pointer border-2 border-black hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all rounded-3xl"
                >
                  <div className="relative z-10 flex justify-between items-start p-4">
                    <div className="bg-white border-2 border-black p-4 rounded-2xl rotate-3 group-hover:rotate-12 transition-transform shadow-sm">
                      <Plus className="h-8 w-8 text-black" strokeWidth={3} />
                    </div>
                    <div className="bg-black text-white px-4 py-1.5 rounded-full border-2 border-white text-[10px] font-black uppercase tracking-widest animate-pulse">
                      Priority Action
                    </div>
                  </div>

                  <div className="relative z-10 p-4">
                    <h3 className="text-5xl md:text-6xl font-black leading-[0.85] tracking-tighter mb-4 drop-shadow-sm">
                      FIX IT <br /> NOW
                    </h3>
                    <div className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full border-2 border-transparent group-hover:bg-white group-hover:text-black group-hover:border-black transition-colors shadow-lg">
                      <span className="text-xs font-bold uppercase tracking-widest">
                        Open Camera
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Decor */}
                  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#A2E2F9] rounded-full border-2 border-black z-0 group-hover:scale-110 transition-transform opacity-100" />
                </NeoCard>
              </motion.div>
            </Link>

            {/* 3. STATS GRID */}
            <div className="grid grid-cols-2 gap-4 mt-3">
              <StatCard
                label="Pending"
                value={stats.pending}
                color="bg-yellow-300"
              />
              <StatCard
                label="Resolved"
                value={stats.resolved}
                color="bg-green-300"
              />
            </div>

            {/* 4. LEADERBOARD / TOP CONTRIBUTORS (Added for density) */}
            <div className="hidden md:block bg-white border-2 border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="font-black uppercase text-sm mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" /> Top Solvers
                (Karma)
              </h4>
              {/* Mock Data for the Leaderboard */}
              {[
                { name: "John D.", resolved: 12, rank: 1, color: "#FFDE59" },
                { name: "S. Khan", resolved: 9, rank: 2, color: "#CBACF9" },
                { name: "A. Smith", resolved: 7, rank: 3, color: "#A2E2F9" },
              ].map((solver) => (
                <div
                  key={solver.rank}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-black/10 mt-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-black text-lg w-6 h-6 rounded-full flex items-center justify-center text-black border border-black shadow-sm`}
                      style={{ backgroundColor: solver.color }}
                    >
                      {solver.rank}
                    </span>
                    <span className="font-bold text-sm">{solver.name}</span>
                  </div>
                  <span className="text-xs font-black uppercase bg-black text-white px-2 py-0.5 rounded-full">
                    {solver.resolved} FIXES
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* === RIGHT MAIN FEED === */}
          <div className="md:col-span-7 lg:col-span-8 space-y-10">
            {/* 5. QUICK ACCESS */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">
                Quick Access
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.link}>
                    <div className="flex flex-col items-center gap-2 min-w-[80px] group">
                      <div
                        className={`w-16 h-16 ${action.color} border-2 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-active:translate-y-1 group-active:shadow-none transition-all cursor-pointer`}
                      >
                        <action.icon className="w-7 h-7" strokeWidth={2.5} />
                      </div>
                      <span className="text-[10px] font-black uppercase">
                        {action.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* FEED HEADER */}
            <div className="flex items-end justify-between border-b-2 border-black/10 pb-4">
              <div>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-600">
                  The Feed
                </h2>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mt-1">
                  Real-time issue tracking
                </p>
              </div>
              <Link
                href="/issues"
                className="hidden sm:flex items-center gap-2 text-xs font-black uppercase hover:underline bg-[#FFDE59] px-4 py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-px hover:shadow-none transition-all"
              >
                View All <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* ISSUES FEED */}
            <div className="space-y-8">
              {isLoading && localIssues.length === 0 ? (
                // SKELETON LOADERS
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-64 rounded-3xl border-2 border-black/5 bg-white animate-pulse"
                  />
                ))
              ) : localIssues.length > 0 ? (
                localIssues.map((issue, index) => (
                  <motion.div
                    key={issue._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href="/issues">
                      <NeoCard
                        color="white"
                        className="p-0 flex flex-col transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] border-2 border-black group rounded-3xl overflow-hidden"
                      >
                        {/* Header Stripe */}
                        <div className="px-6 py-4 border-b-2 border-black flex justify-between items-center bg-gray-50 group-hover:bg-[#FFFDF5] transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-black rounded-full border-2 border-black flex items-center justify-center text-white font-black text-xs">
                              {issue.category.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-black uppercase">
                                Student
                              </span>
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                Verified
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold bg-black text-white px-3 py-1 rounded-full">
                              {getTimeAgo(issue.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Main Body */}
                        <div className="p-6 md:p-8">
                          <div className="flex justify-between items-start mb-4 gap-4">
                            <h3 className="text-2xl md:text-3xl font-black leading-tight line-clamp-2 uppercase group-hover:underline decoration-4 underline-offset-4 decoration-[#FFDE59]">
                              {issue.title}
                            </h3>
                            {issue.status === "Critical" && (
                              <div className="bg-red-100 p-2 rounded-xl border-2 border-black shrink-0 animate-pulse">
                                <AlertTriangle className="text-red-600 w-6 h-6" />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 mt-6">
                            <StatusPill status={issue.status} />
                            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase bg-gray-100 px-3 py-1.5 rounded-lg border border-black/10">
                              <MapPin className="w-3 h-3" /> {issue.location}
                            </div>
                          </div>
                        </div>

                        {/* Interactive Footer */}
                        <div className="px-6 py-4 border-t-2 border-black flex justify-between items-center bg-white group-hover:bg-gray-50 transition-colors">
                          <div className="flex gap-6">
                            <button
                              onClick={(e) => e.preventDefault()}
                              className="flex items-center gap-2 text-xs font-black hover:text-green-600 transition-colors group/btn active:scale-95"
                            >
                              <ThumbsUp className="w-4 h-4 group-active/btn:scale-125 transition-transform" />
                              <span>{issue.votes || 0}</span>
                            </button>
                            <button
                              onClick={(e) => e.preventDefault()}
                              className="flex items-center gap-2 text-xs font-black hover:text-blue-600 transition-colors group/btn active:scale-95"
                            >
                              <MessageSquare className="w-4 h-4 group-active/btn:scale-125 transition-transform" />
                              <span>{Math.floor(Math.random() * 5)}</span>
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <span className="text-[10px] font-bold uppercase tracking-wide">
                              View Details
                            </span>
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </NeoCard>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <EmptyStateCool />
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="md:hidden">
        <NeoBottomNav />
      </div>
    </div>
  );
}
