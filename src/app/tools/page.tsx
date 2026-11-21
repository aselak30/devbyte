import React, { Suspense } from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { TOOLS } from "@/lib/constants/tools";
import { Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "All Developer Tools - DevByte",
  description:
    "Explore our complete suite of client-side developer utilities: JSON formatters, Dart model generators, JWT decoders, Base64 tools, UUID generators, and more.",
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 mb-3">
              <Wrench className="w-3.5 h-3.5" />
              <span>Developer Utility Suite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              All Developer Tools
            </h1>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Browse our comprehensive collection of fast, private developer utilities. Every tool runs 100% inside your browser sandbox with zero network telemetry.
            </p>
          </div>

          <Suspense fallback={<div className="py-12 text-center text-sm text-slate-500">Loading tools...</div>}>
            <ToolGrid tools={TOOLS} showFilters={true} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
