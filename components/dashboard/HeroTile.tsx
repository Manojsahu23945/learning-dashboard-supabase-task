"use client";

import { Flame, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroTile() {
  const streak = 12; // mock streak value

  return (
    <article className="relative grain col-span-1 md:col-span-2 rounded-2xl overflow-hidden bg-bg-card border border-white/5 p-6 md:p-8 flex flex-col justify-between min-h-[200px]">
      {/* Gradient background blobs */}
      <div
        aria-hidden
        className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-violet-600/20 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <Zap size={14} className="text-yellow-400" />
          <span>Wednesday, Jun 10</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Alex
          </span>{" "}
          👋
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          You&apos;re on a roll. Keep the momentum going.
        </p>
      </div>

      {/* Streak badge */}
      <motion.div
        className="relative z-10 mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium w-fit"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
      >
        <Flame size={16} className="text-orange-400" />
        {streak} Day Streak
      </motion.div>
    </article>
  );
}
