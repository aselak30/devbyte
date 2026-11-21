import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TOOLS } from "@/lib/constants/tools";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import {
  ShieldCheck,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Zap,
} from "lucide-react";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) {
    return { title: "Tool Not Found - DevByte" };
  }

  return {
    title: `${tool.name} - Free Online Developer Tool | DevByte`,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} - DevByte`,
      description: tool.description,
      type: "website",
    },
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = TOOLS.filter(
    (t) => t.id !== tool.id && (t.category === tool.category || t.popular)
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6"
          >
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Tools
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-medium truncate">
              {tool.name}
            </span>
          </nav>

          {/* Tool Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/60 flex items-center justify-center shrink-0 shadow-xs">
                <Icon name={tool.iconName} className="w-6 h-6" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="indigo" size="sm">
                    {tool.categoryLabel}
                  </Badge>
                  {tool.offlineReady && (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-900/60">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      100% Client-Side
                    </span>
                  )}
                  {tool.popular && (
                    <Badge variant="emerald" size="sm">
                      Popular
                    </Badge>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {tool.name}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>

            {/* Quick action badges */}
            <div className="flex md:flex-col items-end gap-2 text-xs text-slate-500 shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Zero Latency
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                No Sign-Up Needed
              </span>
            </div>
          </div>

          {/* Fully Interactive Tool Workspace */}
          <div className="mt-8">
            <ToolRenderer tool={tool} />
          </div>

          {/* How to Use Section */}
          <section className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              How to Use the {tool.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <div className="font-bold text-slate-900 dark:text-white mb-1">
                  1. Paste Your Input
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Paste your payload or use the sample button to load a standard test fixture.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <div className="font-bold text-slate-900 dark:text-white mb-1">
                  2. Client-Side Evaluation
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Processing happens instantly in your browser memory without sending data to servers.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <div className="font-bold text-slate-900 dark:text-white mb-1">
                  3. Copy or Download
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Export the formatted result or copy directly to your clipboard with one click.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                  Is my data or token sent to external servers?
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  No. DevByte is architected to execute all parsing, encoding, and code generation client-side within your browser. No server logging or external data transmission occurs.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                  Can I use this tool offline?
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes, once the page assets are loaded in your browser session, all computation functions locally even without an active internet connection.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                  Is DevByte free for commercial and professional use?
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes. DevByte is 100% free for individual developers, enterprise software engineers, and students worldwide.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Related Developer Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedTools.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
