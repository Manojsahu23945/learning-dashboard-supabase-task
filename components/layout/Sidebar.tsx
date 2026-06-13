"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  ChevronLeft,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/courses", icon: BookOpen, label: "Courses" },
  { href: "/progress", icon: BarChart2, label: "Progress" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Auto-collapse on tablet (< 1024px), expand on desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.nav
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col shrink-0 bg-bg-secondary border-r border-white/5 h-screen sticky top-0 overflow-hidden z-40"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600 text-white">
          <GraduationCap size={16} />
        </span>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              key="logo-text"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="font-bold text-white text-sm whitespace-nowrap"
            >
              LearnFlow
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <ul className="flex-1 py-4 px-2 space-y-1" role="list">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl group"
                aria-current={isActive ? "page" : undefined}
                title={collapsed ? label : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-violet-600/20 border border-violet-500/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={18}
                  className={`relative z-10 shrink-0 transition-colors ${
                    isActive
                      ? "text-violet-400"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      key={`label-${href}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                      className={`relative z-10 text-sm whitespace-nowrap ${
                        isActive
                          ? "text-violet-300 font-medium"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Collapse toggle — only show on desktop */}
      <div className="hidden lg:block p-3 border-t border-white/5">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <motion.span
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <ChevronLeft size={16} />
          </motion.span>
        </button>
      </div>
    </motion.nav>
  );
}
