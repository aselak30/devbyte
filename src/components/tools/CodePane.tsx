"use client";

import React, { useState } from "react";
import { Copy, Check, Download, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CodePaneProps {
  title: string;
  value: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  language?: string;
  linesCount?: boolean;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  onClear?: () => void;
  onSample?: () => void;
  sampleLabel?: string;
  downloadFilename?: string;
  error?: string | null;
  heightClass?: string;
}

export function CodePane({
  title,
  value,
  onChange,
  placeholder,
  readOnly = false,
  badge,
  actions,
  onClear,
  onSample,
  sampleLabel = "Load Sample",
  downloadFilename,
  error,
  heightClass = "h-80 sm:h-96",
}: CodePaneProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    if (!value || !downloadFilename) return;
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = value ? value.split("\n").length : 1;
  const chars = value ? value.length : 0;

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
      {/* Pane Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {title}
          </span>
          {badge}
        </div>

        <div className="flex items-center gap-1.5">
          {actions}

          {onSample && (
            <button
              type="button"
              onClick={onSample}
              className="px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
            >
              {sampleLabel}
            </button>
          )}

          {onClear && (
            <button
              type="button"
              onClick={onClear}
              disabled={!value}
              title="Clear input"
              className="p-1 rounded text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            disabled={!value}
            title={copied ? "Copied to clipboard" : "Copy to clipboard"}
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded font-medium border transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none",
              copied
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            )}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          {downloadFilename && (
            <button
              type="button"
              onClick={handleDownload}
              disabled={!value}
              title={`Download as ${downloadFilename}`}
              className="p-1 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Code Textarea Area */}
      <div className="relative flex-1">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          spellCheck={false}
          className={cn(
            "w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none leading-relaxed",
            heightClass,
            readOnly ? "bg-slate-50/50 dark:bg-slate-950/40 cursor-text" : ""
          )}
        />
      </div>

      {/* Pane Footer Stats & Error */}
      <div className="px-3.5 py-1.5 bg-slate-50/80 dark:bg-slate-950/40 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <span>{lines} {lines === 1 ? "line" : "lines"}</span>
          <span>•</span>
          <span>{chars.toLocaleString()} chars</span>
        </div>

        {error && (
          <div className="text-rose-600 dark:text-rose-400 font-medium truncate max-w-xs sm:max-w-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
