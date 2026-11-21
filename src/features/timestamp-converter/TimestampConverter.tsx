"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Clock, Copy, Check, Calendar } from "lucide-react";

function subscribeSeconds(callback: () => void) {
  const interval = setInterval(callback, 1000);
  return () => clearInterval(interval);
}

function getSecondsSnapshot() {
  return Math.floor(Date.now() / 1000);
}

function getServerSecondsSnapshot() {
  return 1732118400;
}

export function TimestampConverter() {
  const currentEpoch = useSyncExternalStore(
    subscribeSeconds,
    getSecondsSnapshot,
    getServerSecondsSnapshot
  );

  const [timestampInput, setTimestampInput] = useState<string>("1732118400");
  const [isMilliseconds, setIsMilliseconds] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [dateInput, setDateInput] = useState<string>("2026-11-21T00:00:00");

  // Parse timestamp
  const parsedDate = (() => {
    const num = parseInt(timestampInput.trim(), 10);
    if (isNaN(num)) return null;
    const ms = isMilliseconds || num > 99999999999 ? num : num * 1000;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  })();

  // Parse date string to timestamp
  const parsedTimestampFromDate = (() => {
    if (!dateInput) return null;
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return null;
    return {
      seconds: Math.floor(d.getTime() / 1000),
      milliseconds: d.getTime(),
    };
  })();

  const copyVal = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Live Epoch Banner */}
      <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Current Unix Epoch Time
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-indigo-700 dark:text-indigo-300">
              {currentEpoch}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setTimestampInput(currentEpoch.toString());
            setIsMilliseconds(false);
          }}
          className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Use Current Time
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: Timestamp to Human Date */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Timestamp to Human Date
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Unix Timestamp:
              </label>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="epochUnit"
                    checked={!isMilliseconds}
                    onChange={() => setIsMilliseconds(false)}
                    className="text-indigo-600"
                  />
                  <span>Seconds</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="epochUnit"
                    checked={isMilliseconds}
                    onChange={() => setIsMilliseconds(true)}
                    className="text-indigo-600"
                  />
                  <span>Milliseconds</span>
                </label>
              </div>
            </div>

            <input
              type="text"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              placeholder="e.g. 1732118400"
              className="w-full px-3.5 py-2.5 font-mono text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {parsedDate ? (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                    UTC Time:
                  </span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white text-xs sm:text-sm">
                    {parsedDate.toUTCString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyVal(parsedDate.toUTCString(), "utc")}
                  className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  {copiedKey === "utc" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                    Local Time:
                  </span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white text-xs sm:text-sm">
                    {parsedDate.toString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyVal(parsedDate.toString(), "local")}
                  className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  {copiedKey === "local" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                    ISO 8601:
                  </span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white text-xs sm:text-sm">
                    {parsedDate.toISOString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyVal(parsedDate.toISOString(), "iso")}
                  className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  {copiedKey === "iso" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-rose-500">
              Please enter a valid numeric timestamp.
            </div>
          )}
        </div>

        {/* Panel 2: Human Date to Timestamp */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Human Date to Unix Timestamp
          </h3>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Select or Enter Date & Time:
            </label>
            <input
              type="datetime-local"
              step="1"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full px-3.5 py-2.5 font-mono text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {parsedTimestampFromDate ? (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                    Epoch in Seconds:
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {parsedTimestampFromDate.seconds}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyVal(parsedTimestampFromDate.seconds.toString(), "sec")
                  }
                  className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  {copiedKey === "sec" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                    Epoch in Milliseconds:
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {parsedTimestampFromDate.milliseconds}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyVal(parsedTimestampFromDate.milliseconds.toString(), "ms")
                  }
                  className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  {copiedKey === "ms" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-slate-400">
              Select a valid date to convert.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
