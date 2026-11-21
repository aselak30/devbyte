"use client";

import React, { useState, useMemo } from "react";
import { CodePane } from "@/components/tools/CodePane";
import { ArrowLeftRight, AlertCircle } from "lucide-react";

export function UrlEncoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [encodeEverything, setEncodeEverything] = useState(true);
  const [input, setInput] = useState("https://api.devbyte.tools/v1/search?query=Flutter & Dart&tags=mobile,web");

  const { output, error } = useMemo(() => {
    if (!input) {
      return { output: "", error: null };
    }
    try {
      if (mode === "encode") {
        const res = encodeEverything ? encodeURIComponent(input) : encodeURI(input);
        return { output: res, error: null };
      } else {
        const res = decodeURIComponent(input.replace(/\+/g, " "));
        return { output: res, error: null };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Malformed URI sequence";
      return { output: "", error: msg };
    }
  }, [input, mode, encodeEverything]);

  const handleToggleMode = () => {
    const nextMode = mode === "encode" ? "decode" : "encode";
    setMode(nextMode);
    setInput(output || (nextMode === "encode" ? "https://devbyte.tools/?q=hello world" : "https%3A%2F%2Fdevbyte.tools%2F%3Fq%3Dhello%20world"));
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setMode("encode")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                mode === "encode"
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Encode (Percent-Encoding)
            </button>
            <button
              type="button"
              onClick={() => setMode("decode")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                mode === "decode"
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Decode (URI Components)
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

        {mode === "encode" && (
          <div className="flex items-center gap-4 text-xs">
            <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={encodeEverything}
                onChange={(e) => setEncodeEverything(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Encode Component (`encodeURIComponent`)</span>
            </label>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">URI Decoding Error</div>
            <div className="font-mono text-xs text-rose-700 dark:text-rose-300 mt-1">{error}</div>
          </div>
        </div>
      )}

      {/* Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodePane
          title={mode === "encode" ? "Raw URL / Text Input" : "Encoded URL Input"}
          value={input}
          onChange={setInput}
          placeholder="Enter URL to encode or decode..."
          onClear={() => setInput("")}
          onSample={() =>
            setInput(
              mode === "encode"
                ? "https://api.devbyte.tools/v1/search?query=Flutter & Dart&tags=mobile,web"
                : "https%3A%2F%2Fapi.devbyte.tools%2Fv1%2Fsearch%3Fquery%3DFlutter%20%26%20Dart%26tags%3Dmobile%2Cweb"
            )
          }
          sampleLabel="Load Sample"
          error={error}
          heightClass="h-80 sm:h-96"
        />

        <CodePane
          title={mode === "encode" ? "Encoded URL Result" : "Decoded URL Result"}
          value={output}
          readOnly={true}
          placeholder="Processed result will appear here..."
          downloadFilename="url-result.txt"
          heightClass="h-80 sm:h-96"
        />
      </div>
    </div>
  );
}
