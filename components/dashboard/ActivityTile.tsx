"use client";

import { Activity } from "lucide-react";
import { motion } from "framer-motion";

// Mock 7x7 contribution grid
const weeks = Array.from({ length: 7 }, (_, wi) =>
  Array.from({ length: 7 }, (_, di) => {
    const r = Math.random();
    if (r > 0.75) return 3;
    if (r > 0.5) return 2;
    if (r > 0.25) return 1;
    return 0;
  })
);

const intensityClass: Record<number, string> = {
  0: "bg-white/5",
  1: "bg-violet-600/30",
  2: "bg-violet-500/60",
  3: "bg-violet-400",
};

export default function ActivityTile() {
  return (
    <article className="relative grain rounded-2xl bg-bg-card border border-white/5 p-5 flex flex-col gap-4 min-h-[200px] overflow-hidden">
      <div
        aria-hidden
        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-pink-600/10 blur-3xl pointer-events-none"
      />

      <header className="flex items-center gap-2 text-slate-300 text-sm font-medium relative z-10">
        <Activity size={15} className="text-violet-400" />
        Learning Activity
      </header>

      <div className="relative z-10 flex gap-1" role="img" aria-label="Contribution grid showing learning activity">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <motion.div
                key={di}
                className={`w-4 h-4 rounded-sm ${intensityClass[level]}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: (wi * 7 + di) * 0.01,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 relative z-10">Last 7 weeks of activity</p>
    </article>
  );
}
