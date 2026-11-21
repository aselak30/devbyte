"use client";

import React, { useState, useMemo } from "react";
import { CodePane } from "@/components/tools/CodePane";
import { formatDartList, SAMPLE_DART_LIST } from "@/features/formatters/codeFormatters";
import { Smartphone } from "lucide-react";

export function DartListFormatter() {
  const [input, setInput] = useState(SAMPLE_DART_LIST);
  const [sortAlpha, setSortAlpha] = useState(true);
  const [dedupe, setDedupe] = useState(true);

  const output = useMemo(
    () => formatDartList(input, sortAlpha, dedupe),
    [input, sortAlpha, dedupe]
  );

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Dart List Generator
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={sortAlpha}
              onChange={(e) => setSortAlpha(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Sort Alphabetically</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={dedupe}
              onChange={(e) => setDedupe(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Remove Duplicates</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodePane
          title="Raw Items (CSV, JSON array, or list)"
          value={input}
          onChange={setInput}
          placeholder="Paste comma-separated items or JSON array..."
          onClear={() => setInput("")}
          onSample={() => setInput(SAMPLE_DART_LIST)}
          sampleLabel="Load Sample"
          heightClass="h-96 sm:h-[450px]"
        />

        <CodePane
          title="Generated Dart List"
          value={output}
          readOnly={true}
          placeholder="Dart list will appear here..."
          downloadFilename="items_list.dart"
          heightClass="h-96 sm:h-[450px]"
        />
      </div>
    </div>
  );
}
