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

/* ------------------------------------------------------------------ */
/*  JavaScript Formatter                                               */
/* ------------------------------------------------------------------ */

export const SAMPLE_JS = `function greet(name){const msg="Hello, "+name+"!";console.log(msg);return msg;}const users=["Alice","Bob","Charlie"];users.forEach((user,i)=>{if(i%2===0){greet(user);}else{console.log("Skipping "+user);}});class Counter{constructor(start=0){this.count=start;}increment(){this.count++;return this;}decrement(){this.count--;return this;}toString(){return"Counter("+this.count+")";}}const c=new Counter(10);c.increment().increment().decrement();console.log(c.toString());`;

export function formatJavaScript(input: string, tabSize = 2): string {
  if (!input.trim()) return "";

  const pad = " ".repeat(tabSize);
  const lines: string[] = [];
  let indent = 0;
  let current = "";
  let inString: string | null = null;
  let inTemplate = false;
  let templateDepth = 0;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  const pushLine = (line: string, extraIndent = 0) => {
    const trimmed = line.trim();
    if (trimmed) {
      lines.push(pad.repeat(Math.max(0, indent + extraIndent)) + trimmed);
    } else if (lines.length > 0 && lines[lines.length - 1] !== "") {
      lines.push("");
    }
  };

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const next = input[i + 1] || "";

    // Handle escape sequences in strings
    if (escaped) {
      current += ch;
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      current += ch;
      escaped = true;
      continue;
    }

    // Line comment
    if (inLineComment) {
      current += ch;
      if (ch === "\n") {
        pushLine(current);
        current = "";
        inLineComment = false;
      }
      continue;
    }

    // Block comment
    if (inBlockComment) {
      current += ch;
      if (ch === "*" && next === "/") {
        current += "/";
        i++;
        pushLine(current);
        current = "";
        inBlockComment = false;
      }
      continue;
    }

    // Template literal
    if (inTemplate) {
      current += ch;
      if (ch === "`" && templateDepth === 0) {
        inTemplate = false;
      } else if (ch === "$" && next === "{") {
        templateDepth++;
      } else if (ch === "}" && templateDepth > 0) {
        templateDepth--;
      }
      continue;
    }

    // String literals
    if (inString) {
      current += ch;
      if (ch === inString) {
        inString = null;
      }
      continue;
    }

    // Start of string or template
    if (ch === '"' || ch === "'" || ch === "`") {
      current += ch;
      if (ch === "`") {
        inTemplate = true;
        templateDepth = 0;
      } else {
        inString = ch;
      }
      continue;
    }

    // Start of comments
    if (ch === "/" && next === "/") {
      current += "//";
      i++;
      inLineComment = true;
      continue;
    }
    if (ch === "/" && next === "*") {
      if (current.trim()) {
        pushLine(current);
        current = "";
      }
      current += "/*";
      i++;
      inBlockComment = true;
      continue;
    }

    // Braces
    if (ch === "{") {
      current += " {";
      pushLine(current);
      current = "";
      indent++;
      continue;
    }
    if (ch === "}") {
      if (current.trim()) {
        pushLine(current);
        current = "";
      }
      indent = Math.max(0, indent - 1);
      // Check for else, catch, finally after closing brace
      const remaining = input.slice(i + 1).trimStart();
      if (/^(else|catch|finally)\b/.test(remaining)) {
        current = "}";
      } else {
        pushLine("}");
        // Add blank line after top-level blocks
        if (indent === 0) {
          lines.push("");
        }
      }
      continue;
    }

    // Semicolons — end of statement
    if (ch === ";") {
      // Check if inside a for(...) header
      const before = input.slice(0, i);
      const lastOpenParen = before.lastIndexOf("(");
      const lastCloseParen = before.lastIndexOf(")");
      if (lastOpenParen > lastCloseParen) {
        // Inside parentheses (e.g. for loop header)
        current += "; ";
        continue;
      }
      current += ";";
      pushLine(current);
      current = "";
      continue;
    }

    // Newlines — normalize whitespace
    if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && next === "\n") i++;
      if (current.trim()) {
        current += " ";
      }
      continue;
    }

    // Collapse multiple spaces
    if (ch === " " || ch === "\t") {
      if (current.length > 0 && current[current.length - 1] !== " ") {
        current += " ";
      }
      continue;
    }

    current += ch;
  }

  if (current.trim()) {
    pushLine(current);
  }

  // Clean up: remove trailing blank lines, collapse multiple blank lines
  let result = lines.join("\n");
  result = result.replace(/\n{3,}/g, "\n\n");
  return result.trim();
}
