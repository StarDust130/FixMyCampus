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
  ScanEye,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ... [Keep CATEGORIES array same as before] ...
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

export default function ReportPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Other");
  const [image, setImage] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // --- LOCAL AUTH LOGIC ---
  useEffect(() => {
    // Check if user ID exists, if not create one
    if (!localStorage.getItem("fmc_user_id")) {
      const newId = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("fmc_user_id", newId);
    }
  }, []);

  // ... [Keep handleImage and toggleRecording logic same as before] ...
  // (Just ensuring handleImage calls the AI API and handles errors gracefully)

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setImage(base64);
        setIsAnalyzing(true);
        try {
          const res = await fetch("/api/analyze-image", {
            method: "POST",
            body: JSON.stringify({ imageBase64: base64 }),
          });
          if (!res.ok) throw new Error("AI Failed");
          const data = await res.json();
          if (data.title && data.title !== "null") setTitle(data.title);
          if (data.description && data.description !== "null")
            setDescription(data.description);
          if (data.category) {
            const matchedCat = CATEGORIES.find(
              (c) => c.id.toLowerCase() === data.category.toLowerCase()
            );
            if (matchedCat) setCategory(matchedCat.id);
          }
          setToast({ message: "AI Analysis Complete", type: "success" });
        } catch (err) {
          // Silently fail or simple toast, don't block user
          console.log("AI skipped or failed");
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleRecording = async () => {
    // ... same recording logic as previous response ...
    // Just ensure error handling is safe
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const audioChunks: Blob[] = [];
        mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/mp4" });
          const formData = new FormData();
          formData.append("file", audioBlob, "audio.mp4");
          setToast({ message: "Transcribing...", type: "success" });
          try {
            const res = await fetch("/api/transcribe", {
              method: "POST",
              body: formData,
            });
            const data = await res.json();
            if (data.text)
              setDescription((prev) =>
                prev ? prev + " " + data.text : data.text
              );
          } catch {
            setToast({ message: "Transcribe failed", type: "error" });
          }
        };
        mediaRecorder.start();
        setIsRecording(true);
      } catch {
        setToast({ message: "Mic blocked", type: "error" });
      }
    }
  };

  // --- UPDATED SUBMIT ---
  const handleSubmit = async () => {
    if (!title || !description) {
      setToast({ message: "Title & Description required", type: "error" });
      return;
    }

    setIsSubmitting(true);
    const userId = localStorage.getItem("fmc_user_id"); // Get ID

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
          userId, // Send ID
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setToast({ message: "Submitted Successfully!", type: "success" });
      // Optional: Redirect after delay
      setTimeout(() => (window.location.href = "/issues"), 1000);
    } catch (err) {
      setToast({ message: "Network Error - Try Again", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans pb-32 relative">
      {/* ... [Rest of UI exactly as previous response] ... */}
      {/* Just ensure to copy the Toast, Header, Main Form, and Footer from previous code */}

      {/* Toast Component */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-6 left-0 right-0 z-[70] flex justify-center px-4 pointer-events-none"
          >
            <div
              className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase tracking-wide text-xs ${
                toast.type === "success" ? "bg-[#FFDE59]" : "bg-[#FFB7B2]"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of the form UI from previous answer goes here... */}
      <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-16 bg-[#FFFDF5]/90 backdrop-blur-md border-b-2 border-black">
        <Link href="/" className="p-2 -ml-2 hover:bg-black/5 rounded-full">
          <ArrowLeft className="w-6 h-6" strokeWidth={3} />
        </Link>
        <h1 className="text-lg font-black uppercase tracking-tight">
          Report Issue
        </h1>
        <div className="w-8" />
      </header>

      <main className="pt-6 px-5 max-w-lg mx-auto space-y-6">
        {/* ... Camera Card & Inputs ... (Same as previous code) */}
        <div className="bg-white p-4 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {image ? (
            <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-black bg-black">
              <Image
                src={image}
                alt="Evidence"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full border-2 border-black"
              >
                <X className="w-4 h-4" />
              </button>
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <span className="font-bold text-xs uppercase tracking-widest">
                    Scanning...
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3 h-32">
              <label className="flex-1 bg-[#A2E2F9] rounded-xl border-2 border-black flex flex-col items-center justify-center cursor-pointer hover:brightness-95 active:scale-95 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImage}
                />
                <Camera className="w-8 h-8 mb-1" strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase">Camera</span>
              </label>
              <label className="flex-1 bg-[#FFB7B2] rounded-xl border-2 border-black flex flex-col items-center justify-center cursor-pointer hover:brightness-95 active:scale-95 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
                <ImageIcon className="w-8 h-8 mb-1" strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase">
                  Gallery
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-black uppercase ml-1 text-gray-500">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                isAnalyzing ? "AI is typing..." : "e.g. Broken Chair"
              }
              className="w-full bg-white border-2 border-black rounded-xl p-4 font-bold outline-none shadow-sm transition-all"
            />
          </div>
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
                      : "bg-white"
                  }`}
                >
                  <cat.icon className="w-3 h-3" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-black uppercase ml-1 text-gray-500">
              Location
            </label>
            <div className="relative">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Room No / Area"
                className="w-full bg-white border-2 border-black rounded-xl p-4 pl-12 font-bold outline-none shadow-sm transition-all"
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <label className="text-xs font-black uppercase ml-1 text-gray-500">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                isAnalyzing ? "AI is analyzing..." : "Describe the issue..."
              }
              className="w-full bg-white border-2 border-black rounded-xl p-4 pr-14 font-bold outline-none shadow-sm resize-none"
            />
            <button
              onClick={toggleRecording}
              className={`absolute bottom-3 right-3 p-2 rounded-lg border-2 border-black transition-all ${
                isRecording
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-[#FFDE59] text-black"
              }`}
            >
              {isRecording ? (
                <StopCircle className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FFFDF5] border-t-2 border-black z-40">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || isAnalyzing}
          className="w-full md:w-100 md:mx-auto bg-[#CBACF9] text-black border-2 border-black rounded-xl py-4 font-black uppercase tracking-widest text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <UploadCloud />
          )}{" "}
          Submit Report
        </button>
      </div>
    </div>
  );
}
