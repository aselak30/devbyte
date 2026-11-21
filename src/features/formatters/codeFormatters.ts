export function formatCss(css: string): string {
  if (!css.trim()) return "";
  let formatted = css
    .replace(/\s*\{\s*/g, " {\n  ")
    .replace(/\s*;\s*/g, ";\n  ")
    .replace(/\s*\}\s*/g, "\n}\n\n")
    .replace(/\s*,\s*/g, ", ");

  // Clean trailing spaces before closing brace
  formatted = formatted.replace(/\n\s*\n\}/g, "\n}");
  return formatted.trim();
}

export function formatXml(xml: string, tabSize = 2): string {
  if (!xml.trim()) return "";
  let formatted = "";
  let indent = 0;
  const pad = " ".repeat(tabSize);

  const tokens = xml
    .replace(/>\s*</g, "><")
    .replace(/</g, "~::~<")
    .split("~::~")
    .filter(Boolean);

  for (const token of tokens) {
    if (token.startsWith("</")) {
      indent = Math.max(0, indent - 1);
      formatted += pad.repeat(indent) + token + "\n";
    } else if (
      token.startsWith("<") &&
      !token.startsWith("<!") &&
      !token.startsWith("<?") &&
      !token.endsWith("/>")
    ) {
      formatted += pad.repeat(indent) + token + "\n";
      indent++;
    } else {
      formatted += pad.repeat(indent) + token + "\n";
    }
  }

  return formatted.trim();
}

export function formatDartList(input: string, sortAlpha = true, dedupe = true): string {
  if (!input.trim()) return "[]";

  let items: string[] = [];

  // Try parsing as JSON array
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      items = parsed.map((item) => String(item).trim());
    }
  } catch {
    // Split by comma or newline
    items = input
      .split(/[,\n]/)
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }

  if (dedupe) {
    items = Array.from(new Set(items));
  }
  if (sortAlpha) {
    items.sort((a, b) => a.localeCompare(b));
  }

  const dartElements = items.map((item) => `  '${item}',`).join("\n");
  return `const List<String> items = [\n${dartElements}\n];`;
}

export const SAMPLE_CSS = `header{display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;background:#0f172a;color:#ffffff;}.btn-primary{background-color:#4f46e5;color:#fff;border-radius:0.5rem;padding:0.5rem 1rem;font-weight:600;}.btn-primary:hover{background-color:#4338ca;}`;

export const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?><manifest xmlns:android="http://schemas.android.com/apk/res/android" package="tools.devbyte.app"><application android:label="DevByte" android:icon="@mipmap/ic_launcher"><activity android:name=".MainActivity" android:exported="true"><intent-filter><action android:name="android.intent.action.MAIN"/><category android:name="android.intent.category.LAUNCHER"/></intent-filter></activity></application></manifest>`;

export const SAMPLE_DART_LIST = `flutter, dart, react, nextjs, typescript, tailwind, flutter, nodejs, python`;
