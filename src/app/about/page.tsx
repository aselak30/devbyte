import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Code2,
  ShieldCheck,
  Layers,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About DevByte - Fast, Privacy-First Developer Tools",
  description:
    "Learn about DevByte's mission, privacy-first architecture, and why thousands of software engineers trust our developer utility platform.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 mb-4">
              <span>About DevByte</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Developer tools that{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                just work.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              DevByte was built out of frustration with clunky online formatters that send private tokens to remote servers, force deceptive ads, and crash on large payloads.
            </p>
          </div>

          {/* Architectural Pillars */}
          <div className="space-y-12">
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                Our Core Privacy Guarantee
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                When you paste a JWT token, API response, or database query into DevByte, it is evaluated directly in your browser&apos;s JavaScript engine.
                We do not have backend databases logging your data. No secrets, keys, or proprietary data models are ever stored.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Zero server-side persistence or token telemetry.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Works offline once loaded into service memory.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    No deceptive third-party tracking or click-jacking.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Cryptographically secure randomness for UUIDs.
                  </span>
                </div>
              </div>
            </section>

            {/* Flutter & Dart Commitment */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-blue-500" />
                A Special Focus on Flutter & Dart
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                Cross-platform mobile and web engineers deserve tools engineered specifically for modern Dart. We treat sound null safety,
                <code className="text-indigo-600 dark:text-indigo-400 font-mono text-xs mx-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">json_serializable</code>,
                and immutable <code className="text-indigo-600 dark:text-indigo-400 font-mono text-xs mx-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Freezed</code> union types
                as first-class citizens, not afterthought regex scripts.
              </p>
            </section>

            {/* Architecture Stack */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Layers className="w-6 h-6 text-indigo-500" />
                Modern Architecture
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                Built on Next.js App Router, React 19, TypeScript in strict mode, and Tailwind CSS.
                Designed for optimal Core Web Vitals, sub-second TTFB, and zero runtime layout shifts.
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 font-semibold text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Explore the tools directory &rarr;
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Get in touch
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
