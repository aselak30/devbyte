import React, { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { TOOLS } from "@/lib/constants/tools";
import { Wrench, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: `All ${18} Free Online Developer Tools — Browse by Category | DevByte`,
  description:
    "Browse DevByte's complete collection of free developer tools: JSON formatters, Dart model generators, JWT decoders, Base64 encoders, UUID generators, code formatters, and more. All client-side, no sign-up.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://devbyte.tools",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "All Tools",
        item: "https://devbyte.tools/tools",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <JsonLd data={breadcrumbSchema} />
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6"
          >
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-medium">
              All Tools
            </span>
          </nav>

          {/* Header section */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 mb-3">
              <Wrench className="w-3.5 h-3.5" />
              <span>Developer Utility Suite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Free Online Developer Tools — Browse All Utilities
            </h1>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Browse our comprehensive collection of {TOOLS.length} fast, private developer
              utilities across {6} categories. Every tool runs 100% inside your
              browser with zero network telemetry.
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
