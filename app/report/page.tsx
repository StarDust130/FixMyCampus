"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Category Configuration with Colors & Icons
const CATEGORIES = [
  {
    id: "furniture",
    label: "Furniture",
    icon: Armchair,
    color: "bg-orange-300",
  },
  { id: "electrical", label: "Electrical", icon: Zap, color: "bg-yellow-300" },
  { id: "plumbing", label: "Plumbing", icon: Droplets, color: "bg-blue-300" },
  { id: "cleaning", label: "Cleaning", icon: Sparkles, color: "bg-pink-300" },
  { id: "network", label: "Network", icon: Wifi, color: "bg-green-300" },
  { id: "other", label: "Other", icon: MoreHorizontal, color: "bg-gray-300" },
];

export default function ReportPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fake Submit Handler
  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Report Submitted! (Demo)");
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans selection:bg-pink-300 pb-28 md:pb-10">
      {/* BACKGROUND PATTERN */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* HEADER */}
      <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 h-20 bg-[#FFFDF5]/90 backdrop-blur-md border-b-2 border-black">
        <Link
          href="/"
          className="group flex items-center justify-center w-12 h-12 rounded-full border-2 border-transparent hover:border-black hover:bg-white transition-all"
        >
          <ArrowLeft
            className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
            strokeWidth={3}
          />
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-black uppercase tracking-tighter">
            New Report
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Ticket #0921
          </p>
        </div>
        <div className="w-12" /> {/* Spacer */}
      </header>

      <main className="pt-8 px-5 md:px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* --- LEFT COLUMN: IMAGE UPLOADER (Sticky on PC) --- */}
          <div className="md:col-span-5 lg:col-span-4 md:sticky md:top-24 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <label className="block relative group cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {/* POLAROID STYLE CONTAINER */}
                <div
                  className={`relative w-full aspect-4/5 md:aspect-square rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center transition-all active:translate-y-1 active:shadow-none overflow-hidden bg-white`}
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full p-3 pb-12 bg-white">
                      <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-black">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute bottom-4 left-0 right-0 text-center font-caveat text-xl font-bold text-gray-500 rotate-1">
                        Evidence_01.jpg
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setImagePreview(null);
                        }}
                        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full border-2 border-black hover:scale-110 transition-transform shadow-md z-20"
                      >
                        <X className="w-4 h-4" strokeWidth={3} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 p-6 bg-[#A2E2F9] w-full h-full flex flex-col items-center justify-center">
                      <div className="bg-white p-5 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform duration-300">
                        <Camera className="w-10 h-10" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="font-black uppercase text-xl">
                          Tap to Snap
                        </h3>
                        <p className="text-xs font-bold text-gray-600 max-w-[200px] mx-auto mt-2 leading-tight">
                          Take a clear photo of the issue so we can fix it
                          faster.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* PC-Only Helper Text */}
              <div className="hidden md:flex items-start gap-3 mt-6 p-4 bg-yellow-100 rounded-xl border-2 border-black border-dashed opacity-80">
                <Sparkles className="w-5 h-5 shrink-0" />
                <p className="text-xs font-bold leading-relaxed">
                  <strong>Pro Tip:</strong> Ensure good lighting. If reporting
                  electrical faults, keep a safe distance.
                </p>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: FORM FIELDS --- */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            {/* 1. TITLE INPUT */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <label className="text-xs font-black uppercase tracking-widest ml-1 text-gray-500">
                Issue Title
              </label>
              <input
                type="text"
                placeholder="e.g. Broken Chair in Library"
                className="w-full bg-white border-2 border-black rounded-xl p-5 text-lg font-bold outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-y-0.5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-300"
              />
            </motion.div>

            {/* 2. CATEGORY GRID (Replaces Dropdown) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label className="text-xs font-black uppercase tracking-widest ml-1 text-gray-500">
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 border-black transition-all ${
                      selectedCategory === cat.id
                        ? `${cat.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-y-0.5`
                        : "bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                  >
                    <cat.icon className="w-6 h-6" strokeWidth={2.5} />
                    <span className="text-xs font-black uppercase">
                      {cat.label}
                    </span>
                    {selectedCategory === cat.id && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-black rounded-full animate-bounce" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* 3. LOCATION */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="text-xs font-black uppercase tracking-widest ml-1 text-gray-500">
                Location
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Room No. or Area"
                  className="w-full bg-white border-2 border-black rounded-xl p-5 pl-14 text-lg font-bold outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-y-0.5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-300"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-100 p-2 rounded-lg border-2 border-black group-focus-within:bg-[#FFDE59] transition-colors">
                  <MapPin className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>
              </div>
            </motion.div>

            {/* 4. DETAILS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="text-xs font-black uppercase tracking-widest ml-1 text-gray-500">
                More Details
              </label>
              <textarea
                rows={4}
                placeholder="Describe the issue briefly..."
                className="w-full bg-white border-2 border-black rounded-xl p-5 text-lg font-bold outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-y-0.5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-300 resize-none leading-relaxed"
              />
            </motion.div>

            {/* 5. PC SUBMIT BUTTON (Hidden on Mobile) */}
            <div className="hidden md:block pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#CBACF9] text-black border-2 border-black rounded-xl py-5 font-black uppercase tracking-widest text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <UploadCloud
                      className="w-7 h-7 group-hover:scale-110 transition-transform"
                      strokeWidth={3}
                    />
                    Submit Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE FOOTER ACTION (Hidden on PC) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#FFFDF5] border-t-2 border-black z-40 pb-safe">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-[#CBACF9] text-black border-2 border-black rounded-xl py-4 font-black uppercase tracking-widest text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <UploadCloud className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Submit Report
            </>
          )}
        </button>
      </div>
    </div>
  );
}
