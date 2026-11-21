"use client";

import React, { useState, useMemo } from "react";
import { CodePane } from "@/components/tools/CodePane";
import { formatCss, SAMPLE_CSS } from "./codeFormatters";

export function CssFormatter() {
  const [input, setInput] = useState(SAMPLE_CSS);

  const output = useMemo(() => formatCss(input), [input]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodePane
          title="Raw CSS Input"
          value={input}
          onChange={setInput}
          placeholder="Paste minified or messy CSS here..."
          onClear={() => setInput("")}
          onSample={() => setInput(SAMPLE_CSS)}
          sampleLabel="Load Sample"
          heightClass="h-96 sm:h-[450px]"
        />

        <CodePane
          title="Formatted CSS"
          value={output}
          readOnly={true}
          placeholder="Formatted stylesheet will appear here..."
          downloadFilename="style.css"
          heightClass="h-96 sm:h-[450px]"
        />
      </div>
    </div>
  );
}
