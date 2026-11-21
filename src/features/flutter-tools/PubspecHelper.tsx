"use client";

import React, { useState, useMemo } from "react";
import { CodePane } from "@/components/tools/CodePane";
import { ArrowDownAZ, AlertCircle } from "lucide-react";
import { Badge } from "@/components/common/Badge";

export const SAMPLE_PUBSPEC = `name: flutter_devbyte_app
description: A modern Flutter developer application.
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  shared_preferences: ^2.2.2
  dio: ^5.4.0
  flutter_bloc: ^8.1.3
  google_fonts: ^6.1.0
  provider: ^6.1.1
  cupertino_icons: ^1.0.6
  intl: ^0.19.0
  path_provider: ^2.1.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  build_runner: ^2.4.8
  freezed: ^2.4.6
  json_serializable: ^6.7.1
  mocktail: ^1.0.3
`;

function sortYamlDependencies(yaml: string): { formatted: string; count: number; error: string | null } {
  if (!yaml.trim()) return { formatted: "", count: 0, error: null };

  try {
    const lines = yaml.split("\n");
    const resultLines: string[] = [];
    let i = 0;
    let depCount = 0;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed === "dependencies:" || trimmed === "dev_dependencies:") {
        resultLines.push(line);
        i++;

        // Collect all direct child dependencies under this section
        const depItems: { key: string; fullLines: string[] }[] = [];
        let currentDep: { key: string; fullLines: string[] } | null = null;

        while (i < lines.length) {
          const depLine = lines[i];
          // Check if section ended (empty line or non-indented key)
          if (depLine.trim() !== "" && !depLine.startsWith("  ")) {
            break;
          }
          if (depLine.trim() === "") {
            // keep blank line
            if (currentDep) {
              depItems.push(currentDep);
              currentDep = null;
            }
            i++;
            continue;
          }

          // Check if this is a top-level dependency item (indented by 2 spaces)
          if (/^ {2}[a-zA-Z0-9_-]+:/.test(depLine)) {
            if (currentDep) {
              depItems.push(currentDep);
            }
            const keyMatch = depLine.match(/^ {2}([a-zA-Z0-9_-]+):/);
            const key = keyMatch ? keyMatch[1] : depLine;
            currentDep = { key, fullLines: [depLine] };
            depCount++;
          } else if (currentDep && depLine.startsWith("    ")) {
            // Nested configuration for dependency (e.g. sdk: flutter or git)
            currentDep.fullLines.push(depLine);
          } else {
            if (currentDep) {
              depItems.push(currentDep);
              currentDep = null;
            }
            resultLines.push(depLine);
          }
          i++;
        }

        if (currentDep) {
          depItems.push(currentDep);
        }

        // Separate SDK dependencies (like flutter: sdk: flutter) to the top, sort the rest alphabetically
        const sdkDeps = depItems.filter((d) => d.fullLines.some((l) => l.includes("sdk: flutter")));
        const regularDeps = depItems.filter((d) => !d.fullLines.some((l) => l.includes("sdk: flutter")));

        regularDeps.sort((a, b) => a.key.localeCompare(b.key));

        for (const item of [...sdkDeps, ...regularDeps]) {
          resultLines.push(...item.fullLines);
        }
      } else {
        resultLines.push(line);
        i++;
      }
    }

    return { formatted: resultLines.join("\n"), count: depCount, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Parsing failed";
    return { formatted: "", count: 0, error: msg };
  }
}

export function PubspecHelper() {
  const [input, setInput] = useState(SAMPLE_PUBSPEC);

  const { formatted, count, error } = useMemo(() => sortYamlDependencies(input), [input]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center gap-2 text-xs">
          <ArrowDownAZ className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Sorts Flutter packages alphabetically and keeps SDK bindings at the top.
          </span>
        </div>

        {count > 0 && (
          <Badge variant="blue" size="sm">
            {count} packages sorted
          </Badge>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">YAML Parsing Issue</div>
            <div className="font-mono text-xs text-rose-700 dark:text-rose-300">{error}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodePane
          title="Raw pubspec.yaml"
          value={input}
          onChange={setInput}
          placeholder="Paste pubspec.yaml content here..."
          onClear={() => setInput("")}
          onSample={() => setInput(SAMPLE_PUBSPEC)}
          sampleLabel="Load Sample"
          error={error}
          heightClass="h-96 sm:h-[480px]"
        />

        <CodePane
          title="Sorted pubspec.yaml"
          value={formatted}
          readOnly={true}
          placeholder="Sorted pubspec.yaml will appear here..."
          downloadFilename="pubspec.yaml"
          heightClass="h-96 sm:h-[480px]"
        />
      </div>
    </div>
  );
}
