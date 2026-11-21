export interface JsonValidationResult {
  isValid: boolean;
  error: string | null;
  line: number | null;
  column: number | null;
  parsed: unknown | null;
}

export function validateJson(raw: string): JsonValidationResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      isValid: true,
      error: null,
      line: null,
      column: null,
      parsed: null,
    };
  }

  try {
    const parsed = JSON.parse(trimmed);
    return {
      isValid: true,
      error: null,
      line: null,
      column: null,
      parsed,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid JSON";
    
    // Attempt to extract position from error message (e.g., "at position 42" or "line 3 column 5")
    let line: number | null = null;
    let column: number | null = null;

    const lineColMatch = message.match(/line (\d+) column (\d+)/i);
    if (lineColMatch) {
      line = parseInt(lineColMatch[1], 10);
      column = parseInt(lineColMatch[2], 10);
    } else {
      const posMatch = message.match(/position (\d+)/i);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const linesUpToPos = raw.substring(0, pos).split("\n");
        line = linesUpToPos.length;
        column = (linesUpToPos[linesUpToPos.length - 1]?.length || 0) + 1;
      }
    }

    return {
      isValid: false,
      error: message,
      line,
      column,
      parsed: null,
    };
  }
}

export function formatJson(
  raw: string,
  indent: number | "\t" = 2
): { formatted: string; error: string | null } {
  const validation = validateJson(raw);
  if (!validation.isValid) {
    return { formatted: "", error: validation.error };
  }
  if (validation.parsed === null) {
    return { formatted: "", error: null };
  }
  try {
    const formatted = JSON.stringify(validation.parsed, null, indent);
    return { formatted, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to format JSON";
    return { formatted: "", error: message };
  }
}

export function minifyJson(raw: string): { minified: string; error: string | null } {
  const validation = validateJson(raw);
  if (!validation.isValid) {
    return { minified: "", error: validation.error };
  }
  if (validation.parsed === null) {
    return { minified: "", error: null };
  }
  try {
    const minified = JSON.stringify(validation.parsed);
    return { minified, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to minify JSON";
    return { minified: "", error: message };
  }
}

export function getJsonMetrics(raw: string, processed: string) {
  const originalBytes = new TextEncoder().encode(raw).length;
  const processedBytes = new TextEncoder().encode(processed).length;
  const savingsPercent =
    originalBytes > 0 && processedBytes < originalBytes
      ? Math.round(((originalBytes - processedBytes) / originalBytes) * 100)
      : 0;

  return {
    originalBytes,
    processedBytes,
    savingsPercent,
  };
}

export const SAMPLE_JSON = `{
  "platform": "DevByte",
  "version": "1.0.0",
  "active": true,
  "stats": {
    "totalUsers": 25480,
    "uptime": 99.98,
    "latencyMs": 0.45
  },
  "tags": [
    "developer-tools",
    "flutter",
    "dart",
    "privacy-first"
  ],
  "author": {
    "name": "DevByte Engineering Team",
    "verified": true,
    "email": "engineering@devbyte.tools"
  }
}`;
