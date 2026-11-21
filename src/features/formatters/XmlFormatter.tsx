"use client";

import React, { useState, useMemo } from "react";
import { CodePane } from "@/components/tools/CodePane";
import { formatXml, SAMPLE_XML } from "./codeFormatters";

export function XmlFormatter() {
  const [input, setInput] = useState(SAMPLE_XML);
  const [tabSize, setTabSize] = useState<number>(2);

  const output = useMemo(() => formatXml(input, tabSize), [input, tabSize]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Indentation:
          </span>
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-0.5">
            <button
              type="button"
              onClick={() => setTabSize(2)}
              className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
                tabSize === 2
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              2 Spaces
            </button>
            <button
              type="button"
              onClick={() => setTabSize(4)}
              className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
                tabSize === 4
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              4 Spaces
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodePane
          title="Raw XML Input"
          value={input}
          onChange={setInput}
          placeholder="Paste XML or AndroidManifest.xml here..."
          onClear={() => setInput("")}
          onSample={() => setInput(SAMPLE_XML)}
          sampleLabel="Load Sample"
          heightClass="h-96 sm:h-[450px]"
        />

        <CodePane
          title="Formatted XML"
          value={output}
          readOnly={true}
          placeholder="Formatted XML will appear here..."
          downloadFilename="document.xml"
          heightClass="h-96 sm:h-[450px]"
        />
      </div>
    </div>
  );
}
