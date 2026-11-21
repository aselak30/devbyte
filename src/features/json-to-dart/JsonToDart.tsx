"use client";

import React, { useState, useMemo } from "react";
import { CodePane } from "@/components/tools/CodePane";
import {
  generateDartFromJson,
  SAMPLE_DART_JSON,
  DartGeneratorOptions,
} from "./generator";
import { Settings2, Smartphone, AlertCircle } from "lucide-react";

export function JsonToDart() {
  const [input, setInput] = useState(SAMPLE_DART_JSON);

  const [options, setOptions] = useState<DartGeneratorOptions>({
    rootClassName: "UserModel",
    nullSafety: true,
    allFieldsNullable: true,
    useJsonSerializable: false,
    useFreezed: false,
    generateToJson: true,
  });

  // Calculate Dart code synchronously via useMemo
  const { output, error } = useMemo(() => {
    if (!input.trim()) {
      return { output: "", error: null };
    }
    const res = generateDartFromJson(input, options);
    return {
      output: res.code,
      error: res.error,
    };
  }, [input, options]);

  return (
    <div className="space-y-6">
      {/* Options Bar */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Generator Configuration
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <label className="text-slate-600 dark:text-slate-400 font-medium">
              Root Class Name:
            </label>
            <input
              type="text"
              value={options.rootClassName}
              onChange={(e) =>
                setOptions({ ...options, rootClassName: e.target.value })
              }
              placeholder="Root class..."
              className="px-2.5 py-1 text-xs font-mono rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={options.nullSafety}
              onChange={(e) =>
                setOptions({ ...options, nullSafety: e.target.checked })
              }
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Null Safety</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={options.allFieldsNullable}
              onChange={(e) =>
                setOptions({ ...options, allFieldsNullable: e.target.checked })
              }
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Optional / Nullable Fields (`?`)</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={options.generateToJson}
              onChange={(e) =>
                setOptions({ ...options, generateToJson: e.target.checked })
              }
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Generate `toJson()`</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={options.useJsonSerializable}
              onChange={(e) =>
                setOptions({
                  ...options,
                  useJsonSerializable: e.target.checked,
                  useFreezed: false,
                })
              }
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>json_serializable</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={options.useFreezed}
              onChange={(e) =>
                setOptions({
                  ...options,
                  useFreezed: e.target.checked,
                  useJsonSerializable: false,
                })
              }
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Freezed</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Invalid JSON Payload</div>
            <div className="font-mono text-xs text-rose-700 dark:text-rose-300">{error}</div>
          </div>
        </div>
      )}

      {/* Side-by-Side Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodePane
          title="Input JSON Object"
          value={input}
          onChange={setInput}
          placeholder="Paste JSON here to generate Dart model..."
          onClear={() => setInput("")}
          onSample={() => setInput(SAMPLE_DART_JSON)}
          sampleLabel="Load Sample"
          error={error}
          heightClass="h-96 sm:h-[480px]"
          badge={
            <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              JSON
            </span>
          }
        />

        <CodePane
          title="Generated Dart Code"
          value={output}
          readOnly={true}
          placeholder="Dart model class will appear here..."
          downloadFilename={`${options.rootClassName.toLowerCase() || "model"}.dart`}
          heightClass="h-96 sm:h-[480px]"
          badge={
            <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200/60 dark:border-blue-800/60 flex items-center gap-1">
              <Smartphone className="w-3 h-3" />
              Dart 3+
            </span>
          }
        />
      </div>
    </div>
  );
}
