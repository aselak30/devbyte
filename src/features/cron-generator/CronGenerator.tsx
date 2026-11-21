"use client";

import React, { useState, useMemo } from "react";
import { CalendarClock, Copy, Check, Sparkles, Clock } from "lucide-react";

interface CronPreset {
  name: string;
  expression: string;
  description: string;
}

const PRESETS: CronPreset[] = [
  { name: "Every Minute", expression: "* * * * *", description: "Runs every minute" },
  { name: "Every 5 Minutes", expression: "*/5 * * * *", description: "Runs every 5 minutes" },
  { name: "Every 15 Minutes", expression: "*/15 * * * *", description: "Runs every 15 minutes" },
  { name: "Hourly at Minute 0", expression: "0 * * * *", description: "Runs at the start of every hour" },
  { name: "Daily at Midnight", expression: "0 0 * * *", description: "Runs every day at 00:00 UTC" },
  { name: "Daily at 9:00 AM", expression: "0 9 * * *", description: "Runs every morning at 09:00" },
  { name: "Weekly on Sunday", expression: "0 0 * * 0", description: "Runs every Sunday at midnight" },
  { name: "Monthly on the 1st", expression: "0 0 1 * *", description: "Runs on the 1st of every month at midnight" },
];

function describeCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) {
    return "Invalid expression: Must have exactly 5 parts (minute hour day-of-month month day-of-week).";
  }
  const [min, hour, dom, mon, dow] = parts;

  if (min === "*" && hour === "*" && dom === "*" && mon === "*" && dow === "*") {
    return "Every minute, every day";
  }
  if (min.startsWith("*/") && hour === "*" && dom === "*" && mon === "*" && dow === "*") {
    return `Every ${min.replace("*/", "")} minutes`;
  }
  if (min === "0" && hour === "*" && dom === "*" && mon === "*" && dow === "*") {
    return "Every hour on the hour";
  }
  if (dom === "*" && mon === "*" && dow === "*") {
    return `Every day at ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`;
  }
  if (dom === "*" && mon === "*" && dow !== "*") {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[parseInt(dow, 10)] || `day ${dow}`;
    return `Every ${dayName} at ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`;
  }
  if (dom !== "*" && mon === "*" && dow === "*") {
    return `On day ${dom} of every month at ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`;
  }

  return `Scheduled execution: Minute '${min}', Hour '${hour}', Day-of-Month '${dom}', Month '${mon}', Day-of-Week '${dow}'`;
}

export function CronGenerator() {
  const [expression, setExpression] = useState("0 9 * * 1-5");
  const [copied, setCopied] = useState(false);

  const description = useMemo(() => describeCron(expression), [expression]);

  const copyExpr = async () => {
    try {
      await navigator.clipboard.writeText(expression);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const parts = expression.trim().split(/\s+/);

  return (
    <div className="space-y-6">
      {/* Expression Input & Output */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Cron Expression (5-Part)
            </span>
          </div>

          <button
            type="button"
            onClick={copyExpr}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-medium hover:bg-indigo-100 transition-colors cursor-pointer text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Expression"}
          </button>
        </div>

        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="* * * * *"
          className="w-full px-4 py-3 font-mono text-xl sm:text-2xl font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* 5-Field Breakdown Grid */}
        <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <div className="font-bold text-slate-900 dark:text-white text-sm">{parts[0] || "*"}</div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Minute (0-59)</div>
          </div>
          <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <div className="font-bold text-slate-900 dark:text-white text-sm">{parts[1] || "*"}</div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Hour (0-23)</div>
          </div>
          <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <div className="font-bold text-slate-900 dark:text-white text-sm">{parts[2] || "*"}</div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Day of Month</div>
          </div>
          <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <div className="font-bold text-slate-900 dark:text-white text-sm">{parts[3] || "*"}</div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Month (1-12)</div>
          </div>
          <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60">
            <div className="font-bold text-slate-900 dark:text-white text-sm">{parts[4] || "*"}</div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Day of Week</div>
          </div>
        </div>

        {/* Plain English Translation Banner */}
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/40 flex items-center gap-3">
          <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Human-Readable Schedule:
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {description}
            </span>
          </div>
        </div>
      </div>

      {/* Preset Buttons Grid */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
        <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Common Schedule Presets
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setExpression(p.expression)}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/50 dark:bg-slate-950/40 text-left transition-colors cursor-pointer group"
            >
              <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600">
                {p.name}
              </div>
              <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">
                {p.expression}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {p.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
