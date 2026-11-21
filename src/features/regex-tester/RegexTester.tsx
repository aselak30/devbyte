"use client";

import React, { useState, useMemo } from "react";
import { Search, Copy, Check, Sparkles, AlertCircle } from "lucide-react";
import { Badge } from "@/components/common/Badge";

interface RegexPreset {
  name: string;
  pattern: string;
  flags: string;
  sample: string;
  description: string;
}

const PRESETS: RegexPreset[] = [
  {
    name: "Email Address",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "g",
    sample: "Contact us at support@devbyte.tools or dev.team+filter@google.com for inquiries.",
    description: "Matches standard email address formats.",
  },
  {
    name: "URL / Web Link",
    pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
    flags: "g",
    sample: "Check https://devbyte.tools and http://api.flutter.dev/docs for specifications.",
    description: "Matches HTTP and HTTPS URLs.",
  },
  {
    name: "IPv4 Address",
    pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
    flags: "g",
    sample: "Primary DNS is 8.8.8.8 and internal gateway is 192.168.1.1 (invalid: 999.1.1.1).",
    description: "Matches valid IPv4 addresses.",
  },
  {
    name: "Hex Color",
    pattern: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b",
    flags: "gi",
    sample: "The brand colors are #4F46E5, #3b82f6, and #FFF.",
    description: "Matches 3-digit and 6-digit hex color codes.",
  },
  {
    name: "UUID v4",
    pattern: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}",
    flags: "gi",
    sample: "User session: 123e4567-e89b-42d3-a456-426614174000 active.",
    description: "Matches valid UUID v4 format.",
  },
];

export function RegexTester() {
  const [pattern, setPattern] = useState(PRESETS[0].pattern);
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
  });
  const [testString, setTestString] = useState(PRESETS[0].sample);
  const [replaceString, setReplaceString] = useState("[MATCH]");
  const [showReplace, setShowReplace] = useState(false);
  const [copied, setCopied] = useState(false);

  const flagString = useMemo(() => {
    let f = "";
    if (flags.g) f += "g";
    if (flags.i) f += "i";
    if (flags.m) f += "m";
    if (flags.s) f += "s";
    return f;
  }, [flags]);

  const { matches, error, replacedText } = useMemo(() => {
    if (!pattern) {
      return { matches: [], error: null, replacedText: testString };
    }
    try {
      const regex = new RegExp(pattern, flagString);
      const list: { text: string; index: number; groups: string[] }[] = [];

      if (flags.g) {
        let match: RegExpExecArray | null;
        let count = 0;
        while ((match = regex.exec(testString)) !== null && count < 200) {
          list.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          count++;
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          list.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      let replaced = "";
      if (showReplace) {
        try {
          replaced = testString.replace(new RegExp(pattern, flagString), replaceString);
        } catch {
          replaced = testString;
        }
      }

      return { matches: list, error: null, replacedText: replaced };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid regular expression";
      return { matches: [], error: msg, replacedText: testString };
    }
  }, [pattern, flagString, testString, replaceString, showReplace, flags.g]);

  const handlePresetSelect = (preset: RegexPreset) => {
    setPattern(preset.pattern);
    setFlags({
      g: preset.flags.includes("g"),
      i: preset.flags.includes("i"),
      m: preset.flags.includes("m"),
      s: preset.flags.includes("s"),
    });
    setTestString(preset.sample);
  };

  const copyRegexCode = async () => {
    try {
      await navigator.clipboard.writeText(`/${pattern}/${flagString}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Pattern Input Bar */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Regular Expression Pattern
            </span>
          </div>

          <button
            type="button"
            onClick={copyRegexCode}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy /pattern/flags"}
          </button>
        </div>

        <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
          <span className="px-3 text-slate-400 font-mono text-base font-bold">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Type regex pattern (e.g. [a-z]+)..."
            className="flex-1 py-2.5 bg-transparent font-mono text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <span className="px-3 text-slate-400 font-mono text-base font-bold">/</span>
          <div className="pr-3 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            {flagString || "(none)"}
          </div>
        </div>

        {/* Flag toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-500 dark:text-slate-400">Flags:</span>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={flags.g}
                onChange={(e) => setFlags({ ...flags, g: e.target.checked })}
                className="rounded text-indigo-600"
              />
              <span className="font-mono">g (Global)</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={flags.i}
                onChange={(e) => setFlags({ ...flags, i: e.target.checked })}
                className="rounded text-indigo-600"
              />
              <span className="font-mono">i (Case Insensitive)</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={flags.m}
                onChange={(e) => setFlags({ ...flags, m: e.target.checked })}
                className="rounded text-indigo-600"
              />
              <span className="font-mono">m (Multiline)</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={flags.s}
                onChange={(e) => setFlags({ ...flags, s: e.target.checked })}
                className="rounded text-indigo-600"
              />
              <span className="font-mono">s (DotAll)</span>
            </label>
          </div>

          <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={showReplace}
              onChange={(e) => setShowReplace(e.target.checked)}
              className="rounded text-indigo-600"
            />
            <span>Replacement Mode</span>
          </label>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Presets:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => handlePresetSelect(p)}
            className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap transition-colors cursor-pointer"
          >
            {p.name}
          </button>
        ))}
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Regex Syntax Error</div>
            <div className="font-mono text-xs text-rose-700 dark:text-rose-300 mt-1">{error}</div>
          </div>
        </div>
      )}

      {/* Test String and Match Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test String Editor */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs flex flex-col">
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Test String
            </span>
            <span className="text-slate-500 text-[11px]">
              {testString.length} chars
            </span>
          </div>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            rows={10}
            placeholder="Enter test string to evaluate against regex..."
            className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none leading-relaxed flex-1"
          />

          {showReplace && (
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Replace Matches With:
              </label>
              <input
                type="text"
                value={replaceString}
                onChange={(e) => setReplaceString(e.target.value)}
                placeholder="Replacement string..."
                className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Results Pane */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs flex flex-col">
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {showReplace ? "Replacement Preview" : `Matches (${matches.length})`}
            </span>
            {matches.length > 0 && (
              <Badge variant="emerald" size="sm">
                {matches.length} {matches.length === 1 ? "match" : "matches"} found
              </Badge>
            )}
          </div>

          <div className="p-4 flex-1 overflow-y-auto max-h-[380px] font-mono text-xs sm:text-sm">
            {showReplace ? (
              <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed">
                {replacedText}
              </div>
            ) : matches.length > 0 ? (
              <div className="space-y-3">
                {matches.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>Match #{idx + 1} (Index: {m.index})</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                        Length: {m.text.length}
                      </span>
                    </div>
                    <div className="font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 p-1.5 rounded break-all">
                      {m.text}
                    </div>

                    {m.groups.length > 0 && (
                      <div className="mt-2 pt-1.5 border-t border-slate-200 dark:border-slate-800/80 text-[11px] space-y-1">
                        <span className="text-slate-400">Capture Groups:</span>
                        {m.groups.map((g, gIdx) => (
                          <div key={gIdx} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <span className="text-slate-400">Group {gIdx + 1}:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{g || "(empty)"}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs font-sans">
                No matches found in the test string.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

