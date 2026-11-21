export function formatHtml(html: string, tabSize = 2): string {
  if (!html.trim()) return "";
  let formatted = "";
  let indent = 0;
  const pad = " ".repeat(tabSize);

  // Clean extra spaces between tags
  const tokens = html
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
      !token.endsWith("/>") &&
      !isSelfClosingTag(token)
    ) {
      formatted += pad.repeat(indent) + token + "\n";
      indent++;
    } else {
      formatted += pad.repeat(indent) + token + "\n";
    }
  }

  return formatted.trim();
}

function isSelfClosingTag(tag: string): boolean {
  const match = tag.match(/^<([a-zA-Z0-9]+)/);
  if (!match) return false;
  const tagName = match[1].toLowerCase();
  const voidTags = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ];
  return voidTags.includes(tagName);
}

export function formatSql(sql: string): string {
  if (!sql.trim()) return "";

  const keywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "AND",
    "OR",
    "JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "INNER JOIN",
    "OUTER JOIN",
    "CROSS JOIN",
    "ON",
    "GROUP BY",
    "ORDER BY",
    "HAVING",
    "LIMIT",
    "OFFSET",
    "INSERT INTO",
    "VALUES",
    "UPDATE",
    "SET",
    "DELETE FROM",
    "UNION",
    "UNION ALL",
    "AS",
    "DISTINCT",
    "COUNT",
    "SUM",
    "AVG",
    "MIN",
    "MAX",
    "IN",
    "BETWEEN",
    "LIKE",
    "IS NULL",
    "IS NOT NULL",
    "CREATE TABLE",
    "DROP TABLE",
    "ALTER TABLE",
  ];

  let formatted = sql.replace(/\s+/g, " ");

  // Uppercase keywords
  for (const kw of keywords) {
    const regex = new RegExp(`\\b${kw}\\b`, "gi");
    formatted = formatted.replace(regex, kw);
  }

  // Insert line breaks before major clauses
  const majorClauses = [
    "FROM",
    "WHERE",
    "GROUP BY",
    "ORDER BY",
    "HAVING",
    "LIMIT",
    "OFFSET",
    "LEFT JOIN",
    "RIGHT JOIN",
    "INNER JOIN",
    "JOIN",
    "SET",
    "VALUES",
  ];

  for (const clause of majorClauses) {
    const regex = new RegExp(`\\s+(${clause})\\s+`, "g");
    formatted = formatted.replace(regex, "\n$1 ");
  }

  // Format comma separated select columns
  formatted = formatted.replace(/,\s*/g, ",\n  ");

  return formatted.trim();
}

export const SAMPLE_HTML = `<div class="container"><header><h1>DevByte Tools</h1><nav><a href="/tools">All Tools</a><a href="/about">About</a></nav></header><main><p>Fast, privacy-friendly online developer tools.</p><button type="button" class="btn-primary">Get Started</button></main></div>`;

export const SAMPLE_SQL = `select u.id, u.username, u.email, count(p.id) as total_projects from users as u left join projects as p on u.id = p.user_id where u.active = true and u.created_at >= '2026-01-01' group by u.id, u.username, u.email order by total_projects desc limit 50;`;
