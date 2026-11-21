"use client";

import React, { useState, useMemo } from "react";
import { CodePane } from "@/components/tools/CodePane";
import { formatSql, SAMPLE_SQL } from "./formatUtils";

export function SqlFormatter() {
  const [input, setInput] = useState(SAMPLE_SQL);

  const output = useMemo(() => formatSql(input), [input]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodePane
          title="Raw SQL Query"
          value={input}
          onChange={setInput}
          placeholder="Paste SQL query here (PostgreSQL, MySQL, SQLite, ANSI)..."
          onClear={() => setInput("")}
          onSample={() => setInput(SAMPLE_SQL)}
          sampleLabel="Load Sample"
          heightClass="h-96 sm:h-[450px]"
        />

        <CodePane
          title="Formatted SQL Query"
          value={output}
          readOnly={true}
          placeholder="Clean, keyword-capitalized SQL will appear here..."
          downloadFilename="query.sql"
          heightClass="h-96 sm:h-[450px]"
        />
      </div>
    </div>
  );
}
