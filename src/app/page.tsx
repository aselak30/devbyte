import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  Sparkles,
  Smartphone,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSearch } from "@/components/tools/HeroSearch";
import { ToolCard } from "@/components/tools/ToolCard";
import { Icon } from "@/components/common/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { CATEGORIES } from "@/lib/constants/categories";
import { TOOLS, POPULAR_TOOLS, RECENT_TOOLS } from "@/lib/constants/tools";
import { TUTORIALS } from "@/lib/constants/tutorials";

export const metadata: Metadata = {
  title: "Free Online Developer Tools — JSON, Dart, JWT, Base64 & More | DevByte",
  description:
    "Free privacy-friendly online developer tools. Format JSON, generate Dart models, decode JWTs, encode Base64, generate UUIDs, convert timestamps — all client-side, no sign-up required.",
  alternates: { canonical: "/" },
};

const HOMEPAGE_FAQS = [
  {
    question: "What is DevByte?",
    answer:
      "DevByte is a free online developer tools platform offering JSON formatters, Dart model generators, JWT decoders, Base64 encoders, UUID generators, and many more utilities — all processing data locally in your browser with zero server uploads.",
  },
  {
    question: "Are DevByte tools free to use?",
    answer:
      "Yes. All DevByte tools are completely free for individual developers, teams, and students worldwide. No account or sign-up is required.",
  },
  {
    question: "Is my data safe when using DevByte?",
    answer:
      "Yes. Every DevByte tool runs 100% client-side in your browser. Your JSON payloads, JWT tokens, source code, and other data are never sent to our servers or stored in any database.",
  },
  {
    question: "What developer tools does DevByte offer?",
    answer:
      "DevByte offers JSON formatting and validation, JSON-to-Dart model generation, JWT decoding, Base64 encoding/decoding, URL encoding, UUID generation, Unix timestamp conversion, regex testing, color conversion, cron expression building, and code formatters for HTML, CSS, JavaScript, SQL, and XML.",
  },
  {
    question: "Does DevByte support Flutter and Dart development?",
    answer:
      "Yes. DevByte has dedicated Flutter and Dart tools including a JSON-to-Dart model generator with null safety, a Freezed model generator, a Pubspec.yaml helper, and a Dart list formatter.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "DevByte",
          url: "https://devbyte.tools",
          description:
            "Free privacy-friendly online developer tools. Format JSON, generate Dart models, decode JWTs, encode Base64, generate UUIDs, and more.",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://devbyte.tools/tools?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "DevByte",
          url: "https://devbyte.tools",
          logo: "https://devbyte.tools/icon.svg",
          description:
            "Free online developer tools platform. Privacy-friendly utilities for software engineers and Flutter developers.",
        }}
      />
      <Header />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/70 dark:border-slate-800/80 bg-linear-to-b from-white via-slate-50/50 to-slate-100/30 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-linear-to-tr from-indigo-500/10 via-blue-500/5 to-violet-500/10 blur-3xl pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Top Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 mb-6 shadow-xs animate-in fade-in duration-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Fast, Privacy-Friendly Developer Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Free Online{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                Developer Tools
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Fast, privacy-first utilities for software engineers, web and Flutter developers worldwide.
              Zero telemetry, zero latency, 100% computed in your browser.
            </p>

            {/* Live Search Component */}
            <div className="mt-8 sm:mt-10">
              <HeroSearch />
            </div>

            {/* Feature Highlights Pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Client-Side Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>Flutter & Dart Sound Null Safety</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span>Zero Logged Data & Secrets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-500" />
                <span>Free & Open Access</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. POPULAR TOOLS SECTION */}
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4" />
                <span>Most Frequently Used</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Popular Developer Tools
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Core daily essentials optimized for speed, precision, and privacy.
              </p>
            </div>

            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              Browse all {TOOLS.length} tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POPULAR_TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* 3. TOOL CATEGORIES SECTION */}
        <section className="py-14 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Organized Workspaces
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                Explore by Category
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Discover specialized developer suites designed for each phase of your development stack.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES.map((category) => {
                const count = TOOLS.filter((t) => t.category === category.id).length;
                return (
                  <Link
                    key={category.id}
                    href={`/tools?category=${category.id}`}
                    className="group rounded-xl border border-slate-200/80 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-center">
                          <Icon name={category.iconName} className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {count} {count === 1 ? "tool" : "tools"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {category.name}
                      </h3>

                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      <span>View category</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. RECENTLY ADDED TOOLS SECTION */}
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Freshly Added & Updated</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Recently Added Tools
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Latest additions supporting Flutter, Dart, and multi-format conversion workflows.
              </p>
            </div>

            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              Explore all utilities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RECENT_TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* 5. WHY DEVELOPERS CHOOSE DEVBYTE */}
        <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Engineered for Integrity
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                Why Developers Choose DevByte
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                Standard online converters leak tokens, upload your private payloads, or flood your screen with intrusive ads. DevByte is built differently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    100% Client-Side Privacy
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    JSON payloads, JWT tokens, and Dart models never touch our servers. Computation runs purely in your browser runtime.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-emerald-400 font-medium">
                  Zero data collection
                </div>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-4">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Flutter & Dart First
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    Dedicated generators for sound null safety, nested models, json_serializable, and Freezed union types.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-blue-400 font-medium">
                  Dart 3+ compliant
                </div>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Instant & Zero Latency
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    Zero server roundtrips means sub-millisecond execution even with huge multi-megabyte JSON payloads.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-indigo-400 font-medium">
                  Instant reactivity
                </div>
              </div>

              {/* Feature 4 */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center justify-center mb-4">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Zero Distractions
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    No deceptive download buttons, popups, or login walls. Just clean keyboard shortcuts and professional interfaces.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-violet-400 font-medium">
                  Built by engineers
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. DEVELOPER TUTORIALS / ARTICLES SECTION */}
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Developer Knowledge Base</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Useful Developer Tutorials
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Practical guides on serialization, API token handling, and multi-byte encoding.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              Browse all tutorials
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TUTORIALS.map((tutorial) => (
              <article
                key={tutorial.id}
                className="group rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 flex flex-col justify-between hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                      {tutorial.category}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tutorial.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                    <Link href={`/blog/${tutorial.slug}`}>
                      {tutorial.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {tutorial.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {tutorial.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-slate-500 dark:text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${tutorial.slug}`}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    Read guide &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 7. HOMEPAGE FAQ SECTION */}
        <section className="py-14 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {HOMEPAGE_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                  {faq.question}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. PRIVACY CALL TO ACTION BANNER */}
        <section className="py-12 bg-linear-to-r from-indigo-900 via-blue-900 to-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to streamline your daily engineering workflow?
            </h2>
            <p className="mt-3 text-indigo-200 text-sm sm:text-base max-w-xl mx-auto">
              Bookmark DevByte for instant, private developer utilities. Zero configuration required.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/tools"
                className="px-5 py-2.5 rounded-lg bg-white text-indigo-900 font-semibold text-sm hover:bg-indigo-50 shadow-md transition-all"
              >
                Browse All Tools
              </Link>
              <Link
                href="/about"
                className="px-5 py-2.5 rounded-lg bg-indigo-800/80 text-white font-semibold text-sm border border-indigo-700 hover:bg-indigo-700 transition-all"
              >
                Our Privacy Pledge
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
