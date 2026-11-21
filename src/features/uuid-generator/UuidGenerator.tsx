"use client";

import React, { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download } from "lucide-react";

function generateUuids(count: number, uppercase: boolean, hyphens: boolean): string[] {
  const list: string[] = [];
  for (let i = 0; i < count; i++) {
    let val: string;
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      val = crypto.randomUUID();
    } else {
      let d = Date.now();
      val = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    }
    if (!hyphens) val = val.replace(/-/g, "");
    list.push(uppercase ? val.toUpperCase() : val.toLowerCase());
  }
  return list;
}

export function UuidGenerator() {
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);

  // Initialize with initial list
  const [uuids, setUuids] = useState<string[]>(() => generateUuids(5, false, true));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const regenerate = useCallback(() => {
    setUuids(generateUuids(count, uppercase, hyphens));
  }, [count, uppercase, hyphens]);

  const handleCountChange = (newCount: number) => {
    setCount(newCount);
    setUuids(generateUuids(newCount, uppercase, hyphens));
  };

  const handleUppercaseChange = (checked: boolean) => {
    setUppercase(checked);
    setUuids(generateUuids(count, checked, hyphens));
  };

  const handleHyphensChange = (checked: boolean) => {
    setHyphens(checked);
    setUuids(generateUuids(count, uppercase, checked));
  };

  const copySingle = async (val: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // fallback
    }
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // fallback
    }
  };

  const downloadAll = () => {
    const blob = new Blob([uuids.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `uuids-${count}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Quantity:
            </label>
            <select
              value={count}
              onChange={(e) => handleCountChange(parseInt(e.target.value, 10))}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value={1}>1 UUID</option>
              <option value={5}>5 UUIDs</option>
              <option value={10}>10 UUIDs</option>
              <option value={25}>25 UUIDs</option>
              <option value={50}>50 UUIDs</option>
              <option value={100}>100 UUIDs</option>
            </select>
          </div>

          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => handleUppercaseChange(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>UPPERCASE</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => handleHyphensChange(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Include Hyphens</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={regenerate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Generate New
          </button>
        </div>
      </div>

      {/* UUIDs Display List */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            Generated UUID v4 List ({uuids.length})
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedAll ? "Copied All" : "Copy All"}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={downloadAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download .txt
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-[500px] overflow-y-auto">
          {uuids.map((uuid, idx) => (
            <div
              key={idx}
              className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
            >
              <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                <span className="text-slate-400 text-xs w-6">{idx + 1}.</span>
                <span>{uuid}</span>
              </div>

              <button
                type="button"
                onClick={() => copySingle(uuid, idx)}
                className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Copy individual UUID"
              >
                {copiedIndex === idx ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
