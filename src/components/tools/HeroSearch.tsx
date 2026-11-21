"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { TOOLS } from "@/lib/constants/tools";
import { Icon } from "@/components/common/Icon";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return TOOLS.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.categoryLabel.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }).slice(0, 6);
  }, [query]);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation for dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredTools.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredTools.length - 1
      );
    } else if (e.key === "Enter" && filteredTools.length > 0) {
      e.preventDefault();
      const target = filteredTools[selectedIndex];
      if (target) {
        router.push(`/tools/${target.slug}`);
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const popularShortcuts = [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "JSON to Dart", slug: "json-to-dart" },
    { name: "JWT Decoder", slug: "jwt-decoder" },
    { name: "UUID v4", slug: "uuid-generator" },
    { name: "Base64", slug: "base64-converter" },
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input Box */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search 15+ tools (e.g. JSON to Dart, JWT, UUID, Base64)..."
          className="w-full pl-11 pr-24 py-3.5 sm:py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base transition-all"
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              <span>/</span>
            </kbd>
          )}
        </div>
      </div>

      {/* Instant Dropdown Preview */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {filteredTools.length > 0 ? (
            <div className="p-2 space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
                <span>Matching Tools ({filteredTools.length})</span>
                <span>Press Enter to open</span>
              </div>
              {filteredTools.map((tool, idx) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-lg text-sm transition-colors ${
                    selectedIndex === idx
                      ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-indigo-100/60 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Icon name={tool.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        {tool.name}
                        {tool.offlineReady && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3" />
                            Client-Side
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 shrink-0" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                No tools matched &ldquo;{query}&rdquo;.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Try searching for &quot;JSON&quot;, &quot;Dart&quot;, &quot;JWT&quot;, or &quot;UUID&quot;.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Popular Quick Suggestions */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Popular:
        </span>
        {popularShortcuts.map((item) => (
          <Link
            key={item.slug}
            href={`/tools/${item.slug}`}
            className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-xs"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
