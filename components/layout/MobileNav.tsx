"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/courses", icon: BookOpen, label: "Courses" },
  { href: "/progress", icon: BarChart2, label: "Progress" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-bg-secondary/90 backdrop-blur-xl border-t border-white/5 px-2 py-2 safe-area-bottom"
      aria-label="Mobile navigation"
    >
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl group"
            aria-current={isActive ? "page" : undefined}
          >
            {isActive && (
              <motion.span
                layoutId="mobile-active"
                className="absolute inset-0 rounded-xl bg-violet-600/20"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              size={20}
              className={`relative z-10 transition-colors ${
                isActive ? "text-violet-400" : "text-slate-500"
              }`}
            />
            <span
              className={`relative z-10 text-[10px] ${
                isActive ? "text-violet-300" : "text-slate-500"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
