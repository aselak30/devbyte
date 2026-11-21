"use client";

import React, { useState, useMemo } from "react";
import { Tool, ToolCategory } from "@/types/tool";
import { ToolCard } from "./ToolCard";
import { CATEGORIES } from "@/lib/constants/categories";
import { Filter, Search } from "lucide-react";

interface ToolGridProps {
  tools: Tool[];
  title?: string;
  subtitle?: string;
  initialCategory?: ToolCategory | "all";
  showFilters?: boolean;
}

export function ToolGrid({
  tools,
  title,
  subtitle,
  initialCategory = "all",
  showFilters = true,
}: ToolGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "all">(initialCategory);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      const matchesSearch =
        !searchFilter.trim() ||
        tool.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(searchFilter.toLowerCase()) ||
        tool.keywords.some((k) => k.toLowerCase().includes(searchFilter.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [tools, selectedCategory, searchFilter]);

  return (
    <section className="w-full">
      {(title || subtitle || showFilters) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            {title && (
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1.5 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>

          {showFilters && (
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter tools..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>
      )}

      {/* Category Pills */}
      {showFilters && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            All Tools ({tools.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = tools.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Grid of Tools */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
          <Filter className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            No matching tools found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Try adjusting your category selection or clear your search query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchFilter("");
            }}
            className="mt-4 inline-flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Reset all filters
          </button>
        </div>
      )}
    </section>
  );
}
