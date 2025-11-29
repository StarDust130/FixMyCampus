"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  MapPin,
  X,
  UploadCloud,
  Zap,
  Droplets,
  Armchair,
  Sparkles,
  MoreHorizontal,
  Wifi,
  Loader2,
  Mic,
  Image as ImageIcon,
  StopCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
// Using standard <img> for Base64 display

const CATEGORIES = [
  {
    id: "Furniture",
    label: "Furniture",
    icon: Armchair,
    color: "bg-orange-300",
  },
  { id: "Electrical", label: "Electrical", icon: Zap, color: "bg-yellow-300" },
  { id: "Plumbing", label: "Plumbing", icon: Droplets, color: "bg-blue-300" },
  { id: "Cleaning", label: "Cleaning", icon: Sparkles, color: "bg-pink-300" },
  { id: "Network", label: "Network", icon: Wifi, color: "bg-green-300" },
  { id: "Other", label: "Other", icon: MoreHorizontal, color: "bg-gray-300" },
];

// --- TOAST COMPONENT (For clean messaging) ---
const NeoToast = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) => (
  <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -100, opacity: 0 }}
    className="fixed top-6 left-0 right-0 z-[70] flex justify-center px-4 pointer-events-none"
  >
    <div
      className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase tracking-wide text-xs ${
        type === "success" ? "bg-[#FFDE59]" : "bg-[#FFB7B2]"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 className="w-4 h-4" />
      ) : (
        <AlertCircle className="w-4 h-4" />
      )}
      {message}
    </div>
  </motion.div>
);

export default function ReportPage() {
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Other");
  const [image, setImage] = useState<string | null>(null);

  // UI State (Only essential states remain)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // --- LOCAL AUTH & TOAST ---
  useEffect(() => {
    if (!localStorage.getItem("fmc_user_id")) {
      const newId = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("fmc_user_id", newId);
    }
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // --- 1. HANDLE IMAGE UPLOAD (INSTANT DISPLAY ONLY) ---
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // --- 2. HANDLE AUDIO RECORDING (MANUAL TRANSCRIPTION) ---
  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      setToast({
        message: "Recording stopped. Transcribe text manually.",
        type: "error",
      });
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.onstop = () => {
          setToast({ message: "Audio captured!", type: "success" });
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        setToast({ message: "Microphone access denied.", type: "error" });
      }
    }
  };

  // --- 3. SUBMIT TO DB (FAST REDIRECT) ---
  const handleSubmit = async () => {
    if (!title || !description) {
      setToast({ message: "Title & Description required", type: "error" });
      return;
    }

    setIsSubmitting(true);
    const userId = localStorage.getItem("fmc_user_id");

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          location,
          imageUrl: image,
          userId,
        }),
      });

      if (!res.ok) throw new Error("Failed to save report.");

      // FINAL SPEED FIX: Redirect instantly after success API call
      setToast({ message: "Report Submitted!", type: "success" });
      window.location.href = "/issues";
    } catch (err) {
      setToast({ message: "Network Error - Try Again", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans pb-32 relative">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && <NeoToast message={toast.message} type={toast.type} />}
      </AnimatePresence>

      {/* HEADER */}
      <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-16 bg-[#FFFDF5]/90 backdrop-blur-md border-b-2 border-black">
        <Link href="/" className="p-2 -ml-2 hover:bg-black/5 rounded-full">
          <ArrowLeft className="w-6 h-6" strokeWidth={3} />
        </Link>
        <h1 className="text-lg font-black uppercase tracking-tight">
          Report Issue
        </h1>
        <div className="w-8" />
      </header>

      <main className="pt-6 px-4 max-w-lg mx-auto space-y-5">
        {/* --- 1. MEDIA CARD --- */}
        <div className="bg-white p-3 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {image ? (
            // IMAGE PREVIEW
            <div className="relative w-full h-40 rounded-xl overflow-hidden border-2 border-black bg-black group">
              <img
                src={image}
                alt="Evidence Preview"
                className="w-full h-full object-contain"
              />

              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full border-2 border-black z-20 hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            // MEDIA BUTTONS (Compact h-24)
            <div className="flex gap-2 h-24">
              {/* CAMERA BUTTON */}
              <label className="flex-1 bg-[#A2E2F9] rounded-xl border-2 border-black flex flex-col items-center justify-center cursor-pointer hover:brightness-95 active:scale-95 transition-all shadow-sm">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImage}
                />
                <Camera className="w-6 h-6 mb-1" strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase">Camera</span>
              </label>
              {/* GALLERY BUTTON */}
              <label className="flex-1 bg-[#FFB7B2] rounded-xl border-2 border-black flex flex-col items-center justify-center cursor-pointer hover:brightness-95 active:scale-95 transition-all shadow-sm">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
                <ImageIcon className="w-6 h-6 mb-1" strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase">
                  Gallery
                </span>
              </label>
            </div>
          )}
        </div>

        {/* --- 2. FORM FIELDS --- */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-xs font-black uppercase ml-1 text-gray-500">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken Chair"
              className="w-full bg-white border-2 border-black rounded-xl p-3 text-sm font-bold outline-none shadow-sm focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:font-normal placeholder:text-gray-300"
            />
          </div>

          {/* Category Chips */}
          <div>
            <label className="text-xs font-black uppercase ml-1 text-gray-500">
              Category
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg border-2 border-black text-xs font-black uppercase whitespace-nowrap transition-all ${
                    category === cat.id
                      ? `${cat.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-px`
                      : "bg-white shadow-sm active:scale-95"
                  }`}
                >
                  <cat.icon className="w-3 h-3" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-black uppercase ml-1 text-gray-500">
              Location
            </label>
            <div className="relative">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Room No / Area"
                className="w-full bg-white border-2 border-black rounded-xl p-3 pl-12 text-sm font-bold outline-none shadow-sm focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:font-normal placeholder:text-gray-300"
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Description + Voice Mic (Manual Transcription) */}
          <div>
            <label className="text-xs font-black uppercase ml-1 text-gray-500 flex justify-between items-center pr-1">
              <span>Description</span>
              {isRecording && (
                <span className="text-red-500 animate-pulse font-bold text-[10px]">
                  ● REC
                </span>
              )}
            </label>
            <div className="relative">
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={"Describe the issue..."}
                className="w-full bg-white border-2 border-black rounded-xl p-3 pr-12 text-sm font-bold outline-none shadow-sm focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all resize-none placeholder:font-normal placeholder:text-gray-300"
              />

              {/* MIC BUTTON */}
              <button
                onClick={toggleRecording}
                className={`absolute bottom-3 right-3 p-2 rounded-lg border-2 border-black transition-all shadow-sm ${
                  isRecording
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-[#FFDE59] text-black hover:scale-110 active:scale-90"
                }`}
              >
                {isRecording ? (
                  <StopCircle className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FFFDF5] border-t-2 border-black z-40">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-[#CBACF9] text-black border-2 border-black rounded-xl py-4 font-black uppercase tracking-widest text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <UploadCloud />
          )}
          Submit Report
        </button>
      </div>
    </div>
  );
}
