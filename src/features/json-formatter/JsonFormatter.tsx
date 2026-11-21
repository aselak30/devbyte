"use client";

import React, { useState, useMemo } from "react";
import { CodePane } from "@/components/tools/CodePane";
import {
  validateJson,
  formatJson,
  minifyJson,
  getJsonMetrics,
  SAMPLE_JSON,
} from "./utils";
import { CheckCircle2, AlertCircle, Minimize2 } from "lucide-react";
import { Badge } from "@/components/common/Badge";

export function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indentOption, setIndentOption] = useState<number | "\t">(2);
  const [isMinified, setIsMinified] = useState(false);

  // Compute validation and output synchronously via useMemo
  const { output, error, errorPosition } = useMemo(() => {
    if (!input.trim()) {
      return { output: "", error: null, errorPosition: { line: null, column: null } };
    }

    const validation = validateJson(input);
    if (!validation.isValid) {
      return {
        output: "",
        error: validation.error,
        errorPosition: { line: validation.line, column: validation.column },
      };
    }

    if (isMinified) {
      const res = minifyJson(input);
      return {
        output: res.minified,
        error: res.error,
        errorPosition: { line: null, column: null },
      };
    } else {
      const res = formatJson(input, indentOption);
      return {
        output: res.formatted,
        error: res.error,
        errorPosition: { line: null, column: null },
      };
    }
  }, [input, indentOption, isMinified]);

  const metrics = useMemo(() => getJsonMetrics(input, output), [input, output]);

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Format dropdown / buttons */}
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => {
                setIsMinified(false);
                setIndentOption(2);
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${!isMinified && indentOption === 2
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              2 Spaces
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMinified(false);
                setIndentOption(4);
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${!isMinified && indentOption === 4
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              4 Spaces
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMinified(false);
                setIndentOption("\t");
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${!isMinified && indentOption === "\t"
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              Tabs
            </button>
            <button
              type="button"
              onClick={() => setIsMinified(true)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${isMinified
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              <Minimize2 className="w-3.5 h-3.5" />
              Minify
            </button>
          </div>

          {metrics.savingsPercent > 0 && isMinified && (
            <Badge variant="emerald" size="sm">
              Saved {metrics.savingsPercent}% in size
            </Badge>
          )}
        </div>

        {/* Validation Status Pill */}
        <div className="flex items-center gap-2 text-xs">
          {error ? (
            <span className="inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-900/60">
              <AlertCircle className="w-4 h-4" />
              Invalid JSON {errorPosition.line && `(Line ${errorPosition.line}, Col ${errorPosition.column})`}
            </span>
          ) : input.trim() ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/60">
              <CheckCircle2 className="w-4 h-4" />
              Valid JSON
            </span>
          ) : (
            <span className="text-slate-400 text-xs">Awaiting input...</span>
          )}
        </div>
      </div>

      {/* Parsing Error Detailed Alert Banner */}
      {error && (
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Syntax Error in JSON Input</div>
            <div className="font-mono text-xs text-rose-700 dark:text-rose-300">{error}</div>
            {errorPosition.line && (
              <div className="text-xs text-rose-600 dark:text-rose-400">
                Check syntax around Line {errorPosition.line}, Column {errorPosition.column}. Ensure trailing commas are removed and strings use double quotes.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Side-by-Side Code Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodePane
          title="Raw JSON Input"
          value={input}
          onChange={setInput}
          placeholder="Paste or type raw JSON here..."
          onClear={() => setInput("")}
          onSample={() => setInput(SAMPLE_JSON)}
          sampleLabel="Load Sample"
          error={error}
          heightClass="h-96 sm:h-[450px]"
          badge={
            <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              Input
            </span>
          }
        />

        <CodePane
          title={isMinified ? "Minified JSON" : "Beautified JSON"}
          value={output}
          readOnly={true}
          placeholder="Formatted JSON will appear here automatically..."
          downloadFilename={isMinified ? "data.min.json" : "data.json"}
          heightClass="h-96 sm:h-[450px]"
          badge={
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-200/60 dark:border-indigo-800/60">
              Output
            </span>
          }
        />
      </div>
    </div>
  );
}
