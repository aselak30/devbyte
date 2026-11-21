"use client";

import React, { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("devbyte-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return stored === "dark" || (!stored && systemPrefersDark);
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    if (nextIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("devbyte-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("devbyte-theme", "light");
    }
    // trigger storage event so sync external store re-evaluates
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600" />
      )}
    </button>
  );
}
