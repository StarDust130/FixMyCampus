"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowUpRight,
  Clock,
  X,
  MapPin,
  Filter,
  User,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Calendar,
  Briefcase,
  Activity,
  Trash2,
  Edit2,
  Save,
} from "lucide-react";
import { NeoHeader } from "@/components/NeoHeader";
import { NeoBottomNav } from "@/components/NeoBottomNav";
import { NeoCard } from "@/components/NeoCards";

// --- HELPERS (Kept local for single file export) ---
const formatDate = (dateString: string) => {
  if (!dateString) return "Just now";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

const getStatusConfig = (status: string) => {
  const s = status?.toLowerCase() || "open";
  if (s === "resolved" || s === "closed")
    return { color: "bg-green-400", label: "Resolved", step: 3 };
  if (s === "in_progress")
    return { color: "bg-blue-400", label: "In Progress", step: 2 };
  if (s === "critical")
    return { color: "bg-red-500 text-white", label: "Critical", step: 1 };
  return { color: "bg-[#FFDE59]", label: "Open", step: 1 };
};

const categories = [
  "All",
  "Critical",
  "Furniture",
  "Electrical",
  "Plumbing",
  "Cleaning",
];

// --- 1. MAIN PAGE COMPONENT ---
export default function IssuesPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"all" | "mine">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // --- FETCH DATA ---
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/reports");
      const data = await res.json();
      if (Array.isArray(data)) setIssues(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1. Get or Create Local User ID (for ownership check)
    let userId = localStorage.getItem("fmc_user_id");
    if (!userId) {
      userId = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("fmc_user_id", userId);
    }
    setCurrentUserId(userId);
    refreshData();
  }, []);

  // --- FILTERING ---
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Strict Owner Check
    const matchesUser =
      viewMode === "mine"
        ? currentUserId && issue.userId === currentUserId
        : true;

    let matchesCategory = true;
    if (activeFilter !== "All") {
      if (activeFilter === "Critical")
        matchesCategory = issue.status === "critical";
      else
        matchesCategory =
          issue.category?.toLowerCase() === activeFilter.toLowerCase();
    }
    return matchesSearch && matchesUser && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans pb-32">
      <NeoHeader activeTab="issues" />

      <main className="max-w-7xl mx-auto relative">
        {/* --- STICKY FILTER BAR --- */}
        <div className="sticky top-0 z-30 bg-[#FFFDF5]/95 backdrop-blur-md border-b-2 border-black/10 py-4 px-5 space-y-3 shadow-sm transition-all">
          <div className="flex gap-2">
            <div className="relative group flex-1">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-xl py-3 pl-10 pr-4 font-bold outline-none shadow-sm focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={() => setViewMode(viewMode === "all" ? "mine" : "all")}
              className={`w-12 flex items-center justify-center border-2 border-black rounded-xl transition-all active:scale-95 ${
                viewMode === "mine"
                  ? "bg-[#FFDE59] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white"
              }`}
            >
              <User
                className={`w-5 h-5 ${
                  viewMode === "mine" ? "text-black" : "text-gray-400"
                }`}
              />
            </button>
          </div>

          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex gap-2 w-max px-1 pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg border-2 border-black text-[10px] font-black uppercase whitespace-nowrap transition-all active:scale-95 ${
                    activeFilter === cat
                      ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(100,100,100,1)]"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- LIST CONTENT --- */}
        <div className="p-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => <IssueCardSkeleton key={i} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredIssues.map((issue) => {
                const statusInfo = getStatusConfig(issue.status);
                const isOwner = currentUserId && issue.userId === currentUserId;

                return (
                  <motion.div
                    layout
                    key={issue._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <NeoCard
                      color="white"
                      className="p-0 flex flex-col hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer h-full border-2 border-black overflow-hidden group"
                    >
                      <div className="p-4 pb-2 flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded border-2 border-black text-[10px] font-black uppercase ${statusInfo.color}`}
                          >
                            {statusInfo.label}
                          </span>
                          {isOwner && (
                            <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded-full">
                              ME
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">
                          {formatDate(issue.createdAt)}
                        </span>
                      </div>

                      <div className="px-4 pb-4">
                        <h3 className="text-lg font-black leading-tight line-clamp-2 mb-1 group-hover:underline decoration-2 underline-offset-2">
                          {issue.title}
                        </h3>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                          {issue.category}
                        </p>
                      </div>

                      <div className="relative w-full h-4 bg-gray-50 border-t-2 border-black border-dashed flex items-center">
                        <div className="absolute left-[-6px] w-3 h-3 bg-[#FFFDF5] rounded-full border-r-2 border-black" />
                        <div className="absolute right-[-6px] w-3 h-3 bg-[#FFFDF5] rounded-full border-l-2 border-black" />
                      </div>

                      <div className="px-4 py-3 bg-gray-50 flex items-center justify-between text-xs font-bold">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[120px]">
                            {issue.location}
                          </span>
                        </div>
                        <div className="bg-black text-white p-1 rounded-full group-hover:rotate-45 transition-transform">
                          <ArrowUpRight className="w-3 h-3" strokeWidth={3} />
                        </div>
                      </div>
                    </NeoCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}

          {!isLoading && filteredIssues.length === 0 && (
            <div className="col-span-full py-16 text-center opacity-50 flex flex-col items-center">
              <div className="bg-gray-200 p-4 rounded-full mb-3">
                <Search className="w-8 h-8" />
              </div>
              <p className="font-bold">No reports found.</p>
            </div>
          )}
        </div>
      </main>

      {/* --- DETAILED MODAL --- */}
      <AnimatePresence>
        {selectedIssue && (
          <Modal
            issue={selectedIssue}
            currentUserId={currentUserId}
            onClose={() => setSelectedIssue(null)}
            onRefresh={refreshData}
          />
        )}
      </AnimatePresence>

      <div className="md:hidden">
        <NeoBottomNav />
      </div>
    </div>
  );
}

// --- NEW: PROFESSIONAL SKELETON LOADER (Reused for quick loading UI) ---
const IssueCardSkeleton = () => {
  return (
    <div className="bg-white border-2 border-black/10 rounded-2xl p-0 overflow-hidden h-48 animate-pulse">
      <div className="p-4 flex justify-between">
        <div className="w-16 h-6 bg-gray-200 rounded-md" />
        <div className="w-10 h-4 bg-gray-200 rounded-md" />
      </div>
      <div className="px-4 space-y-2">
        <div className="w-3/4 h-6 bg-gray-200 rounded-md" />
        <div className="w-1/2 h-4 bg-gray-200 rounded-md" />
      </div>
      <div className="mt-8 border-t-2 border-black/5 p-4 flex justify-between">
        <div className="w-20 h-4 bg-gray-200 rounded-md" />
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};

// --- MODAL SUB-COMPONENT (Contains Edit/Delete Logic) ---
const Modal = ({ issue, currentUserId, onClose, onRefresh }: any) => {
  const statusInfo = getStatusConfig(issue.status);
  const isOwner = currentUserId && issue.userId === currentUserId;

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: issue.title,
    description: issue.description,
    location: issue.location,
  });
  const [isSaving, setIsSaving] = useState(false);

  // Delete Handler
  const handleDelete = async () => {
    if (!confirm("Delete this report?")) return;
    setIsSaving(true);
    try {
      await fetch(`/api/reports/${issue._id}`, { method: "DELETE" });
      onRefresh();
      onClose();
    } catch (e) {
      alert("Failed to delete");
    } finally {
      setIsSaving(false);
    }
  };

  // Update Handler
  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      await fetch(`/api/reports/${issue._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      onRefresh();
      setIsEditing(false);
    } catch (e) {
      alert("Failed to update");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        onClick={(e) => e.stopPropagation()}
        // Fix for Mobile UI: ensure responsive height and margin
        className="bg-[#FFFDF5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col h-[85vh] sm:h-auto sm:max-h-[90vh]"
      >
        {/* 1. Header Image */}
        <div className="relative w-full h-48 sm:h-56 shrink-0 bg-black group">
          {issue.imageUrl ? (
            <img
              src={issue.imageUrl}
              className="w-full h-full object-cover opacity-90"
              alt="Evidence"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
              <Activity className="w-12 h-12 mb-2 opacity-50" />
              <span className="font-bold uppercase text-xs tracking-widest">
                No Evidence
              </span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white border-2 border-black rounded-full p-2 hover:rotate-90 transition-transform shadow-md z-20"
          >
            <X className="w-5 h-5 text-black" strokeWidth={3} />
          </button>
          <div className="absolute bottom-4 left-4">
            <span
              className={`px-3 py-1.5 rounded-lg border-2 border-black text-xs font-black uppercase shadow-md ${statusInfo.color}`}
            >
              {statusInfo.label}
            </span>
          </div>
        </div>

        {/* 2. Content */}
        <div className="p-5 overflow-y-auto flex-1 pb-24 sm:pb-5">
          {isEditing ? (
            /* --- EDIT MODE UI --- */
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400">
                  Title
                </label>
                <input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full border-2 border-black rounded-xl p-3 font-bold focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400">
                  Location
                </label>
                <input
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  className="w-full border-2 border-black rounded-xl p-3 font-bold focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full border-2 border-black rounded-xl p-3 font-bold resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleUpdate}
                  disabled={isSaving}
                  className="flex-1 bg-green-400 border-2 border-black rounded-xl py-3 font-black uppercase flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none hover:brightness-105"
                >
                  {isSaving ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}{" "}
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-white border-2 border-black rounded-xl py-3 font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* --- VIEW MODE UI --- */
            <>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-black uppercase leading-tight mb-1">
                    {issue.title}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-500 font-bold text-xs">
                    <span className="uppercase tracking-wide">
                      {issue.category}
                    </span>
                    <span>•</span>
                    <span>{formatDate(issue.createdAt)}</span>
                  </div>
                </div>

                {/* 🟢 OWNER ACTIONS (Edit/Delete) */}
                {isOwner && (
                  <div className="flex gap-2 shrink-0 ml-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 bg-yellow-300 border-2 border-black rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-transform"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-2 bg-red-400 border-2 border-black rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-transform"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 border-2 border-black/10 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center border border-black/10">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-gray-400">
                      Location
                    </p>
                    <p className="text-xs font-black truncate">
                      {issue.location}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 border-2 border-black/10 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center border border-black/10">
                    <Briefcase className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-gray-400">
                      Owner
                    </p>
                    <p className="text-xs font-black">
                      {isOwner ? "YOU" : "Student"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-black/10 rounded-xl p-4 text-sm font-medium leading-relaxed relative mb-8">
                <div className="absolute -top-3 left-4 bg-[#FFDE59] border-2 border-black px-2 py-0.5 rounded text-[9px] font-black uppercase">
                  Details
                </div>
                {issue.description}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
