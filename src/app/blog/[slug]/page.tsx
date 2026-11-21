import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TUTORIALS } from "@/lib/constants/tutorials";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface TutorialPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: TutorialPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = TUTORIALS.find((t) => t.slug === slug);
  if (!tutorial) return { title: "Tutorial Not Found - DevByte" };

  return {
    title: `${tutorial.title} - DevByte Guide`,
    description: tutorial.description,
  };
}

export default async function TutorialDetailPage({
  params,
}: TutorialPageProps) {
  const { slug } = await params;
  const tutorial = TUTORIALS.find((t) => t.slug === slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to all tutorials
          </Link>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                {tutorial.category}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {tutorial.readTime}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {tutorial.publishedAt}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {tutorial.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {tutorial.description}
            </p>
          </header>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6 text-base leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-8">
            <p>
              When developing modern applications, managing data interchange between backend APIs and client state requires disciplined serialization practices. In this guide, we explore the essential considerations, trade-offs, and design patterns used by senior software engineers.
            </p>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Understanding the Problem Domain
            </h2>
            <p>
              One of the most frequent sources of runtime crashes in mobile and web applications is unexpected null values or type mismatch errors during JSON parsing. Ensuring sound type safety before your state management layer consumes the payload is paramount.
            </p>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
              <code>
                {`// Example robust data parsing model
class UserProfile {
  final String id;
  final String displayName;
  final bool isVerified;

  const UserProfile({
    required this.id,
    required this.displayName,
    this.isVerified = false,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      id: json['id'] as String,
      displayName: json['displayName'] as String? ?? 'Anonymous',
      isVerified: json['isVerified'] as bool? ?? false,
    );
  }
}`}
              </code>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Recommended DevByte Tools
            </h2>
            <p>
              Rather than writing boilerplate serialization methods manually, you can use DevByte&apos;s free, client-side tools to generate production-ready code in seconds:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <Link
                href="/tools/json-to-dart"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500 transition-colors"
              >
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  JSON to Dart Generator &rarr;
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Generate null-safe classes from raw JSON
                </div>
              </Link>

              <Link
                href="/tools/json-formatter"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500 transition-colors"
              >
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  JSON Formatter & Validator &rarr;
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Validate and beautify test payloads
                </div>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
