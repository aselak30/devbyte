"use client";

import React, { useState, useMemo } from "react";
import { CodePane } from "@/components/tools/CodePane";
import { generateDartFromJson } from "@/features/json-to-dart/generator";
import { Settings2, Box, AlertCircle } from "lucide-react";

const SAMPLE_FREEZED_JSON = `{
  "id": "USR-8821",
  "username": "dash_architect",
  "is_pro": true,
  "stats": {
    "contributions": 142,
    "rating": 4.9
  },
  "roles": ["admin", "editor", "developer"]
}`;

export function JsonToFreezed() {
  const [input, setInput] = useState(SAMPLE_FREEZED_JSON);
  const [rootClassName, setRootClassName] = useState("UserResponse");
  const [allNullable, setAllNullable] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: null };
    const res = generateDartFromJson(input, {
      rootClassName,
      nullSafety: true,
      allFieldsNullable: allNullable,
      useJsonSerializable: false,
      useFreezed: true,
      generateToJson: true,
    });
    return { output: res.code, error: res.error };
  }, [input, rootClassName, allNullable]);

  return (
    <div className="space-y-6">
      {/* Options Bar */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Freezed Configuration
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <label className="text-slate-600 dark:text-slate-400 font-medium">
              Class Name:
            </label>
            <input
              type="text"
              value={rootClassName}
              onChange={(e) => setRootClassName(e.target.value)}
              className="px-2.5 py-1 text-xs font-mono rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36"
            />
          </div>

          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={allNullable}
              onChange={(e) => setAllNullable(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Nullable Fields (`?`)</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Invalid JSON Payload</div>
            <div className="font-mono text-xs text-rose-700 dark:text-rose-300 mt-1">{error}</div>
          </div>
        </div>
      )}

      {/* Side-by-side Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodePane
          title="Input JSON Payload"
          value={input}
          onChange={setInput}
          placeholder="Paste JSON to generate Freezed models..."
          onClear={() => setInput("")}
          onSample={() => setInput(SAMPLE_FREEZED_JSON)}
          sampleLabel="Load Sample"
          error={error}
          heightClass="h-96 sm:h-[480px]"
        />

        <CodePane
          title="Generated Freezed Union Classes"
          value={output}
          readOnly={true}
          placeholder="Freezed immutable code will appear here..."
          downloadFilename={`${rootClassName.toLowerCase() || "model"}.freezed.dart`}
          heightClass="h-96 sm:h-[480px]"
          badge={
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-200/60 dark:border-indigo-800/60 flex items-center gap-1">
              <Box className="w-3 h-3" />
              Freezed 2+
            </span>
          }
        />
      </div>
    </div>
  );
}
