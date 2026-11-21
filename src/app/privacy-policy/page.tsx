import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - DevByte",
  description:
    "DevByte's privacy policy. Learn how all developer tools run client-side in your browser with zero remote data collection.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy-First Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              DevByte Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Last updated: November 2026
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-8 text-sm sm:text-base leading-relaxed">
            <section className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                The DevByte Client-Side Guarantee
              </h2>
              <p className="text-sm">
                DevByte is engineered around a strict privacy architecture: <strong>all formatting, encoding, parsing, JWT decoding, and code generation executes client-side directly within your web browser</strong>. Your payloads, JSON objects, tokens, and data models are never transmitted to our servers or stored in any database.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                1. Data We Do Not Collect
              </h3>
              <p>
                Unlike conventional online utility sites, DevByte does not collect, log, or inspect:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>Your JSON payloads or schema definitions</li>
                <li>JSON Web Tokens (JWT) or authentication credentials</li>
                <li>Base64 strings or decoded text</li>
                <li>Generated Dart classes or application source code</li>
                <li>User session keystrokes or clipboard inputs</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                2. JWT Security Warning
              </h3>
              <p className="text-sm">
                The JWT Decoder tool parses the unencrypted Header and Payload segments of a JSON Web Token client-side for debugging purposes. <strong>Decoding a token does NOT verify its cryptographic signature</strong>. You should never paste production secrets or production private keys into any web browser.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                3. Local Storage Usage
              </h3>
              <p className="text-sm">
                We only use browser <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code> to persist your theme preference (Light or Dark mode). No tracking identifiers, user fingerprints, or personal credentials are stored.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                4. Analytics & Advertising
              </h3>
              <p className="text-sm">
                To keep DevByte free for developers worldwide, we may display non-intrusive contextual developer advertising (such as Google AdSense) or privacy-respecting aggregate analytics. These services never inspect or access the contents of your tool workspaces.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                5. Contact Information
              </h3>
              <p className="text-sm">
                For questions regarding this policy or our privacy safeguards, contact us via our <a href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
