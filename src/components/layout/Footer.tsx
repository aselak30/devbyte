import React from "react";
import Link from "next/link";
import { Code2, ShieldCheck, Heart } from "lucide-react";
import { CATEGORIES } from "@/lib/constants/categories";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      {/* Privacy Guarantee Sub-Banner */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse" />
            <span className="font-semibold text-slate-900 dark:text-white">
              Zero-Server Guarantee:
            </span>
            <span>
              All code formatting, JWT decoding, and models are computed locally in your browser.
            </span>
          </div>
          <Link
            href="/privacy-policy"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium shrink-0"
          >
            Learn about our privacy architecture &rarr;
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                DevByte
              </span>
            </Link>

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Developer tools that just work. Fast, reliable, and privacy-first utilities for software engineers, Flutter & Dart developers, and students worldwide.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-2">
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Client-Side
              </span>
              <span>•</span>
              <span>No Cookies / No Telemetry</span>
            </div>
          </div>

          {/* Column: Core Tools */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Core Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/tools/json-formatter"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  JSON Formatter & Validator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/json-to-dart"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  JSON to Dart Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/jwt-decoder"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  JWT Decoder & Inspector
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/base64-converter"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Base64 Encoder / Decoder
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/uuid-generator"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  UUID v4 Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/timestamp-converter"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Unix Timestamp Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Categories */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/tools?category=${cat.id}`}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Company & Legal */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Platform & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  About DevByte
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Tutorials & Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Contact & Lead Inquiries
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} DevByte. Built with care for developers worldwide.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the community
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
