"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code2,
  Search,
  Menu,
  X,
  Smartphone,
  FileJson,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { CommandMenu } from "@/components/common/CommandMenu";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "All Tools", href: "/tools" },
    { name: "Flutter & Dart", href: "/tools?category=flutter-dart" },
    { name: "JSON & Data", href: "/tools?category=json-data" },
    { name: "Tutorials", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  DevByte
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500" />
                </span>
                <span className="text-[10px] -mt-1 font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                  Developer tools
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-colors",
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 font-semibold"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-900"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Trigger */}
            <button
              type="button"
              onClick={() => setCommandMenuOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200/80 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
              title="Quick Search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search tools...</span>
              <kbd className="hidden md:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Icon Button */}
            <button
              type="button"
              onClick={() => setCommandMenuOpen(true)}
              className="sm:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Client-side indicator badge (desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-full border border-emerald-200/70 dark:border-emerald-900/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Client-Side</span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile menu hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Popular Utilities
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/tools/json-formatter"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                >
                  <FileJson className="w-3.5 h-3.5 text-indigo-500" />
                  JSON Formatter
                </Link>
                <Link
                  href="/tools/json-to-dart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5 text-blue-500" />
                  JSON to Dart
                </Link>
                <Link
                  href="/tools/jwt-decoder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  JWT Decoder
                </Link>
                <Link
                  href="/tools/uuid-generator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                  UUID Generator
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Command Menu Dialog */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
      />
    </>
  );
}
