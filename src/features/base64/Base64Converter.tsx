"use client";

import React, { useState, useMemo } from "react";
import { CodePane } from "@/components/tools/CodePane";
import {
  textToBase64,
  base64ToText,
  SAMPLE_TEXT,
  SAMPLE_BASE64,
} from "./utils";
import { ArrowLeftRight, AlertCircle } from "lucide-react";

export function Base64Converter() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [input, setInput] = useState(SAMPLE_TEXT);

  const { output, error } = useMemo(() => {
    if (!input.trim()) {
      return { output: "", error: null };
    }
    if (mode === "encode") {
      const res = textToBase64(input, urlSafe);
      return { output: res.result, error: res.error };
    } else {
      const res = base64ToText(input, urlSafe);
      return { output: res.result, error: res.error };
    }
  }, [input, mode, urlSafe]);

  const handleToggleMode = () => {
    const nextMode = mode === "encode" ? "decode" : "encode";
    setMode(nextMode);
    setInput(output || (nextMode === "encode" ? SAMPLE_TEXT : SAMPLE_BASE64));
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Pill Toggle */}
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => {
                setMode("encode");
                setInput(SAMPLE_TEXT);
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                mode === "encode"
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Encode (Text → Base64)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("decode");
                setInput(SAMPLE_BASE64);
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                mode === "decode"
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Decode (Base64 → Text)
            </button>
          </div>

          <button
            type="button"
            onClick={handleToggleMode}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-300 transition-colors cursor-pointer"
            title="Swap input and output"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Options */}
        <div className="flex items-center gap-4 text-xs">
          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>URL-Safe (- and _ without padding)</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Decoding Error</div>
            <div className="font-mono text-xs text-rose-700 dark:text-rose-300">{error}</div>
          </div>
        </div>
      )}

      {/* Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodePane
          title={mode === "encode" ? "Raw Text / UTF-8 Input" : "Base64 Input"}
          value={input}
          onChange={setInput}
          placeholder={mode === "encode" ? "Type text to encode..." : "Paste Base64 string..."}
          onClear={() => setInput("")}
          onSample={() => setInput(mode === "encode" ? SAMPLE_TEXT : SAMPLE_BASE64)}
          sampleLabel="Load Sample"
          error={error}
          heightClass="h-80 sm:h-96"
        />

        <CodePane
          title={mode === "encode" ? "Base64 Output" : "Decoded Text Output"}
          value={output}
          readOnly={true}
          placeholder="Result will appear here..."
          downloadFilename={mode === "encode" ? "encoded.b64" : "decoded.txt"}
          heightClass="h-80 sm:h-96"
        />
      </div>
    </div>
  );
}
