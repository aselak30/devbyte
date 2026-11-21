"use client";

import React, { useState, useMemo } from "react";
import { decodeJwt, SAMPLE_JWT } from "./utils";
import {
  ShieldAlert,
  Clock,
  KeyRound,
  AlertTriangle,
  Copy,
  Check,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/common/Badge";

export function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const decoded = useMemo(() => decodeJwt(token), [token]);

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch {
      // fallback
    }
  };

  const tokenParts = token.trim().split(".");
  const headerPart = tokenParts[0] || "";
  const payloadPart = tokenParts[1] || "";
  const signaturePart = tokenParts[2] || "";

  return (
    <div className="space-y-6">
      {/* Security Warning Notice */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold flex items-center gap-2">
            <span>Important Security Notice</span>
            <Badge variant="amber" size="sm">Client-Side Only</Badge>
          </div>
          <p className="text-amber-800 dark:text-amber-300 leading-relaxed text-xs">
            <strong>Decoding does NOT verify the cryptographic signature</strong>. It simply deserializes base64url data in your browser memory.
            Your tokens are never transmitted across the network. Never paste live production secrets or private signing keys.
          </p>
        </div>
      </div>

      {/* Token Input Box with Color Legend */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Encoded JWT String
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setToken(SAMPLE_JWT)}
              className="px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 font-medium hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={() => setToken("")}
              disabled={!token}
              className="p-1 rounded text-slate-500 hover:text-rose-600 disabled:opacity-30 cursor-pointer"
              title="Clear input"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste encoded JWT here (e.g. eyJhbGci...)..."
          rows={4}
          className="w-full p-3 font-mono text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 break-all resize-none leading-relaxed"
        />

        {/* Color-Coded Token Segment Preview */}
        {token.trim() && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px] font-mono break-all leading-normal">
            <span className="font-sans font-semibold text-slate-400">Segments:</span>
            <span className="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-1.5 py-0.5 rounded">
              {headerPart ? headerPart.slice(0, 16) + "..." : "Header"}
            </span>
            <span className="text-slate-400">.</span>
            <span className="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-1.5 py-0.5 rounded">
              {payloadPart ? payloadPart.slice(0, 16) + "..." : "Payload"}
            </span>
            <span className="text-slate-400">.</span>
            <span className="text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50 px-1.5 py-0.5 rounded">
              {signaturePart ? signaturePart.slice(0, 16) + "..." : "Signature"}
            </span>
          </div>
        )}
      </div>

      {decoded.error && (
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Decoding Failed</div>
            <div className="font-mono text-xs mt-1 text-rose-700 dark:text-rose-300">
              {decoded.error}
            </div>
          </div>
        </div>
      )}

      {/* Decoded Claims Inspection Cards */}
      {decoded.isValid && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Expiration Status Strip */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  decoded.isExpired === true
                    ? "bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
                    : decoded.isExpired === false
                    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}
              >
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Token Expiration Status
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                  {decoded.isExpired === true ? (
                    <span className="text-rose-600 dark:text-rose-400">
                      Expired on {decoded.expirationDate?.toLocaleString()}
                    </span>
                  ) : decoded.isExpired === false ? (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Active (Expires {decoded.expirationDate?.toLocaleString()})
                    </span>
                  ) : (
                    <span>No expiration claim (`exp`) provided</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              {decoded.algorithm && (
                <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 font-mono">
                  Alg: {decoded.algorithm}
                </span>
              )}
              {decoded.issuedAtDate && (
                <span className="hidden sm:inline">
                  Issued: {decoded.issuedAtDate.toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          {/* Two-Column Decoded View: Header & Payload */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Header (Algorithm & Token Type) */}
            <div className="rounded-xl border border-rose-200 dark:border-rose-950 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
              <div className="px-4 py-3 bg-rose-50/60 dark:bg-rose-950/40 border-b border-rose-200 dark:border-rose-950 flex items-center justify-between">
                <span className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                  1. Header: Algorithm & Token Type
                </span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify(decoded.header, null, 2),
                      "header"
                    )
                  }
                  className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 dark:text-rose-300 hover:underline cursor-pointer"
                >
                  {copiedSection === "header" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy JSON
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 font-mono text-xs sm:text-sm bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 overflow-x-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            {/* 2. Payload (Claims) */}
            <div className="rounded-xl border border-purple-200 dark:border-purple-950 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
              <div className="px-4 py-3 bg-purple-50/60 dark:bg-purple-950/40 border-b border-purple-200 dark:border-purple-950 flex items-center justify-between">
                <span className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                  2. Payload: Data & Claims
                </span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify(decoded.payload, null, 2),
                      "payload"
                    )
                  }
                  className="inline-flex items-center gap-1 text-xs font-medium text-purple-700 dark:text-purple-300 hover:underline cursor-pointer"
                >
                  {copiedSection === "payload" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy JSON
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 font-mono text-xs sm:text-sm bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 overflow-x-auto max-h-96">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>

          {/* 3. Signature Verification Note */}
          <div className="p-4 rounded-xl border border-cyan-200 dark:border-cyan-950 bg-cyan-50/40 dark:bg-cyan-950/20 text-cyan-900 dark:text-cyan-200 text-xs">
            <div className="font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>3. Signature: Verification Block</span>
            </div>
            <p className="font-mono break-all text-slate-600 dark:text-slate-400">
              {decoded.signature || "[No signature]"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
