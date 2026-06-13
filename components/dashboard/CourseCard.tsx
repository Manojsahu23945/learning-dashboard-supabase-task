"use client";

import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { Course } from "@/types/course";

// Dynamically render any Lucide icon by string name
function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const iconName = name as keyof typeof LucideIcons;
  const Icon = LucideIcons[iconName] as React.FC<LucideProps> | undefined;
  if (!Icon) return <LucideIcons.BookOpen {...props} />;
  return <Icon {...props} />;
}

const gradients = [
  "from-violet-500/20 via-transparent to-transparent",
  "from-cyan-500/20 via-transparent to-transparent",
  "from-pink-500/20 via-transparent to-transparent",
  "from-blue-500/20 via-transparent to-transparent",
];

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <article className={`relative grain rounded-2xl bg-bg-card border border-white/5 p-5 flex flex-col gap-4 overflow-hidden cursor-pointer group`}>
      {/* Subtle mesh gradient background */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />
      {/* Hover glow border */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))",
          boxShadow: "inset 0 0 0 1px rgba(124,58,237,0.3)",
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-violet-400">
          <DynamicIcon name={course.icon_name} size={18} />
        </span>
        <span className="text-xs text-slate-500 font-medium">
          {course.progress}% done
        </span>
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="text-sm font-semibold text-slate-100 leading-snug">
          {course.title}
        </h3>
      </div>

      <div className="relative z-10 space-y-1">
        <ProgressBar value={course.progress} />
        <p className="text-xs text-slate-500">
          {course.progress < 30
            ? "Just getting started"
            : course.progress < 70
            ? "Making great progress"
            : "Almost there!"}
        </p>
      </div>
    </article>
  );
}
