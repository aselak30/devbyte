import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookOpen, Clock } from "lucide-react";
import { TUTORIALS } from "@/lib/constants/tutorials";

export const metadata: Metadata = {
  title: "Developer Tutorials & Guides - DevByte",
  description:
    "In-depth guides for software engineers and Flutter developers. Learn about JSON serialization, Dart null safety, JWT token security, and Unicode Base64 encoding.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Engineering Guides</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Developer Tutorials & Guides
            </h1>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
              Practical technical tutorials focusing on Flutter, Dart architecture, secure authentication, and data encoding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TUTORIALS.map((tutorial) => (
              <article
                key={tutorial.id}
                className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                      {tutorial.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {tutorial.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <Link href={`/blog/${tutorial.slug}`}>
                      {tutorial.title}
                    </Link>
                  </h2>

                  <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {tutorial.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{tutorial.publishedAt}</span>
                  <Link
                    href={`/blog/${tutorial.slug}`}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    Read article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
