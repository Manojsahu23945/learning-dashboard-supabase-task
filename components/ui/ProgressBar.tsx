"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  color?: string;
}

export default function ProgressBar({
  value,
  color = "from-violet-500 to-cyan-400",
}: ProgressBarProps) {
  return (
    <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <motion.div
        className={`absolute left-0 top-0 h-full w-full rounded-full bg-gradient-to-r ${color}`}
        style={{ transformOrigin: "left center" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value / 100 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}
