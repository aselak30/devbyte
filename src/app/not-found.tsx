import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Home, Wrench, BookOpen, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          {/* 404 Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 mb-6">
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
              404
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Try one of the helpful links below.
          </p>

          {/* Helpful Links */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-200"
            >
              <Home className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                Home
              </span>
            </Link>

            <Link
              href="/tools"
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-200"
            >
              <Wrench className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                All Tools
              </span>
            </Link>

            <Link
              href="/blog"
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-200"
            >
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                Tutorials
              </span>
            </Link>
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to DevByte
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
