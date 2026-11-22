export interface ToolSeoEntry {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  faqs: { question: string; answer: string }[];
  howToSteps: [string, string, string];
}

export const TOOL_SEO: Record<string, ToolSeoEntry> = {
  "json-formatter": {
    seoTitle: "JSON Formatter & Validator Online - Free | DevByte",
    seoDescription:
      "Format, beautify, and validate JSON instantly in your browser. Catch syntax errors with line numbers, minify for production, and copy or download — no sign-up required.",
    h1: "Format & Validate JSON Online",
    faqs: [
      {
        question: "How do I validate JSON syntax online?",
        answer:
          "Paste your JSON into the editor and DevByte highlights syntax errors with exact line and column numbers in real time. No server round-trip is needed.",
      },
      {
        question: "Can I minify JSON for production use?",
        answer:
          "Yes. After pasting or formatting your JSON, click the Minify button to remove all whitespace and produce a compact, production-ready payload.",
      },
      {
        question: "Is my JSON data sent to any server?",
        answer:
          "No. All formatting and validation runs 100% client-side inside your browser. Your data never leaves your device.",
      },
      {
        question: "What is the maximum JSON size this tool can handle?",
        answer:
          "The tool processes payloads up to several megabytes directly in browser memory. Performance depends on your device, but typical API responses are handled instantly.",
      },
    ],
    howToSteps: [
      "Paste your raw or minified JSON into the input editor.",
      "The tool validates syntax and highlights errors automatically; click Format to beautify.",
      "Copy the formatted output to your clipboard or download it as a .json file.",
    ],
  },

  "json-to-dart": {
    seoTitle: "JSON to Dart Model Generator - Null Safe | DevByte",
    seoDescription:
      "Convert JSON to null-safe Dart model classes instantly. Generate type-safe PODOs with json_serializable annotations, nested object support, and fromJson/toJson methods.",
    h1: "Generate Dart Models from JSON",
    faqs: [
      {
        question: "Does this generator support Dart null safety?",
        answer:
          "Yes. Every generated class uses sound null safety with nullable (?) and required annotations following Dart 3+ conventions.",
      },
      {
        question: "Can I generate nested Dart classes from complex JSON?",
        answer:
          "Absolutely. The generator recursively inspects nested objects and arrays, creating separate Dart classes for each nested structure.",
      },
      {
        question: "Are json_serializable annotations included?",
        answer:
          "Yes. You can toggle json_serializable annotations on or off. When enabled, the generated code includes part directives and @JsonKey decorators.",
      },
      {
        question: "Can I customize the root class name?",
        answer:
          "Yes. Enter a custom root class name before generating. All child classes are named based on their JSON key automatically.",
      },
    ],
    howToSteps: [
      "Paste a sample JSON object into the input area.",
      "Set your preferences: root class name, null safety, and serialization annotations.",
      "Click Generate to produce Dart classes, then copy them into your Flutter project.",
    ],
  },

  "jwt-decoder": {
    seoTitle: "JWT Decoder Online - Decode JSON Web Tokens Free | DevByte",
    seoDescription:
      "Decode and inspect JSON Web Tokens in your browser. View header, payload claims, expiration countdown, and signature info — 100% client-side with zero data transmission.",
    h1: "Decode & Inspect JSON Web Tokens",
    faqs: [
      {
        question: "Is it safe to paste my JWT token here?",
        answer:
          "Yes. DevByte decodes tokens entirely in your browser. No data is transmitted to any server, so your secrets and claims stay private.",
      },
      {
        question: "What JWT claims are displayed?",
        answer:
          "The decoder shows all standard claims including iss, sub, aud, exp, nbf, iat, and jti, plus any custom claims present in the payload.",
      },
      {
        question: "Does this tool verify the JWT signature?",
        answer:
          "This tool decodes and displays the token contents. Signature verification requires the signing key, which is intentionally not collected to protect your security.",
      },
      {
        question: "Can I check if my JWT has expired?",
        answer:
          "Yes. The decoder reads the exp claim and shows a visual countdown indicating whether the token is still valid or has expired.",
      },
    ],
    howToSteps: [
      "Paste your complete JWT string (header.payload.signature) into the input field.",
      "The decoder instantly displays the parsed header and payload with all claims.",
      "Review the expiration status and copy individual claim values as needed.",
    ],
  },

  "base64-converter": {
    seoTitle: "Base64 Encoder & Decoder Online - Free | DevByte",
    seoDescription:
      "Encode text to Base64 or decode Base64 strings instantly in your browser. Supports UTF-8, Unicode, emojis, and URL-safe Base64 — no server uploads required.",
    h1: "Encode & Decode Base64 Online",
    faqs: [
      {
        question: "What is Base64 encoding used for?",
        answer:
          "Base64 converts binary data into ASCII text, commonly used to embed images in HTML/CSS, transmit data in JSON APIs, and encode email attachments.",
      },
      {
        question: "Does this tool support URL-safe Base64?",
        answer:
          "Yes. You can toggle between standard Base64 and URL-safe Base64 (using - and _ instead of + and /) for use in URLs and filenames.",
      },
      {
        question: "Can I encode Unicode and emoji characters?",
        answer:
          "Yes. The encoder correctly handles multi-byte UTF-8 characters, including emojis, CJK characters, and diacritics.",
      },
      {
        question: "Is there a file size limit for encoding?",
        answer:
          "There is no hard limit. The tool processes payloads in browser memory, so large files are supported as long as your device has sufficient RAM.",
      },
    ],
    howToSteps: [
      "Paste plain text or a Base64 string into the input area.",
      "Select Encode or Decode and choose standard or URL-safe mode.",
      "Copy the result to your clipboard or download the output file.",
    ],
  },

  "url-encoder": {
    seoTitle: "URL Encoder & Decoder Online - Free Tool | DevByte",
    seoDescription:
      "Encode or decode URLs and query parameters using RFC 3986 percent-encoding. Handle special characters, Unicode, and malformed URIs — all processed in your browser.",
    h1: "Encode & Decode URLs Online",
    faqs: [
      {
        question: "What is URL percent-encoding?",
        answer:
          "Percent-encoding (RFC 3986) replaces unsafe ASCII characters with a % followed by two hex digits, ensuring URLs are transmitted correctly across all systems.",
      },
      {
        question: "When should I URL-encode query parameters?",
        answer:
          "Encode query values whenever they contain special characters like &, =, ?, spaces, or non-ASCII characters to prevent parsing errors in HTTP requests.",
      },
      {
        question: "Does this handle full URLs or just components?",
        answer:
          "Both. You can encode/decode entire URLs or individual URI components like query strings and path segments.",
      },
      {
        question: "How does this tool handle malformed URLs?",
        answer:
          "The decoder gracefully handles malformed percent-encoding sequences, decoding valid portions while preserving invalid sequences for manual review.",
      },
    ],
    howToSteps: [
      "Paste your URL or query string into the input field.",
      "Click Encode to percent-encode special characters, or Decode to convert them back.",
      "Copy the processed URL and use it in your application or API request.",
    ],
  },

  "uuid-generator": {
    seoTitle: "UUID Generator Online - Free UUID v4 Generator | DevByte",
    seoDescription:
      "Generate cryptographically secure UUID v4 values instantly. Create single or bulk UUIDs (up to 1,000), toggle case formatting, and copy with one click — all in your browser.",
    h1: "Generate UUID v4 Values Online",
    faqs: [
      {
        question: "Are the generated UUIDs cryptographically secure?",
        answer:
          "Yes. UUIDs are generated using the browser's crypto.getRandomValues() API, which provides cryptographically strong random numbers.",
      },
      {
        question: "Can I generate multiple UUIDs at once?",
        answer:
          "Yes. Set the quantity up to 1,000 and generate a bulk list of unique UUIDs in one click, ready to copy or download.",
      },
      {
        question: "What is the difference between UUID and GUID?",
        answer:
          "UUID (Universally Unique Identifier) and GUID (Globally Unique Identifier) are the same thing. GUID is the term used by Microsoft; UUID is the IETF standard name.",
      },
      {
        question: "Can I choose uppercase or lowercase UUIDs?",
        answer:
          "Yes. Toggle between lowercase (standard) and uppercase formatting depending on your project's naming convention.",
      },
    ],
    howToSteps: [
      "Set the number of UUIDs to generate and choose uppercase or lowercase.",
      "Click Generate to create cryptographically secure UUID v4 strings.",
      "Copy individual UUIDs or the entire list to your clipboard.",
    ],
  },

  "timestamp-converter": {
    seoTitle: "Unix Timestamp Converter Online - Free | DevByte",
    seoDescription:
      "Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds, UTC and local time zones, with relative time calculations.",
    h1: "Convert Unix Timestamps to Dates",
    faqs: [
      {
        question: "What is a Unix timestamp?",
        answer:
          "A Unix timestamp is the number of seconds (or milliseconds) elapsed since January 1, 1970 00:00:00 UTC, commonly used to store and transmit date-time values in APIs and databases.",
      },
      {
        question: "Does this tool support millisecond timestamps?",
        answer:
          "Yes. The converter auto-detects whether your input is in seconds or milliseconds and displays the correct date-time in both formats.",
      },
      {
        question: "Can I convert a date string back to a Unix timestamp?",
        answer:
          "Yes. Enter a human-readable date and the tool produces the corresponding epoch value in both seconds and milliseconds.",
      },
      {
        question: "What time zones are supported?",
        answer:
          "The converter displays results in both UTC and your browser's local time zone, with a full timezone offset breakdown.",
      },
    ],
    howToSteps: [
      "Enter a Unix timestamp (seconds or milliseconds) or a human-readable date string.",
      "The converter instantly shows the equivalent date, time, and relative time.",
      "Copy the timestamp or date in your preferred format.",
    ],
  },

  "regex-tester": {
    seoTitle: "Regex Tester Online - Regular Expression Tester | DevByte",
    seoDescription:
      "Test regular expressions with real-time match highlighting, capture group inspection, and replacement simulation. Includes a built-in regex cheat sheet for quick reference.",
    h1: "Test Regular Expressions Online",
    faqs: [
      {
        question: "What regex flavors are supported?",
        answer:
          "The tester uses JavaScript's built-in RegExp engine, which supports standard regex syntax including lookahead, lookbehind, named groups, and Unicode property escapes.",
      },
      {
        question: "Can I see capture group matches?",
        answer:
          "Yes. Each match displays its captured groups with index and named group labels, making it easy to debug complex patterns.",
      },
      {
        question: "Does this tool support regex replacement?",
        answer:
          "Yes. Enter a replacement pattern to preview substitution results in real time, including back-references to capture groups.",
      },
      {
        question: "Is there a regex cheat sheet built in?",
        answer:
          "Yes. A comprehensive cheat sheet is available directly in the tool, covering character classes, quantifiers, anchors, groups, and common patterns.",
      },
      {
        question: "Are regex flags like global and case-insensitive supported?",
        answer:
          "Yes. Toggle flags including global (g), case-insensitive (i), multiline (m), dotAll (s), and Unicode (u) to modify your pattern's behavior.",
      },
    ],
    howToSteps: [
      "Type your regular expression pattern and set the desired flags (g, i, m).",
      "Paste your test string — matches highlight instantly with capture group details.",
      "Optionally enter a replacement pattern to preview substitution results.",
    ],
  },

  "color-converter": {
    seoTitle: "Color Converter - HEX RGB HSL Flutter | DevByte",
    seoDescription:
      "Convert colors between HEX, RGB, HSL, HSV, and Flutter Color(0xFF...) formats. Live preview, alpha channel support, and instant code output for web and Flutter projects.",
    h1: "Convert Colors Between HEX, RGB, HSL & Flutter",
    faqs: [
      {
        question: "What color formats are supported?",
        answer:
          "The converter handles HEX (3, 6, and 8 digit), RGB, RGBA, HSL, HSLA, HSV, and Flutter's Color(0xAARRGGBB) format.",
      },
      {
        question: "Can I get Flutter Color code output?",
        answer:
          "Yes. Enter any color value and the converter instantly provides the Flutter `Color(0xFF...)` code ready to paste into your Dart files.",
      },
      {
        question: "Does this support alpha transparency?",
        answer:
          "Yes. Adjust the alpha channel slider to set transparency, and all output formats update to include the alpha value.",
      },
      {
        question: "Can I preview the color in real time?",
        answer:
          "Yes. A live color swatch updates as you type or adjust values, so you can visually verify the color before copying the code.",
      },
    ],
    howToSteps: [
      "Enter a color value in any supported format (HEX, RGB, HSL, or Flutter Color).",
      "View the live preview and all equivalent color format conversions.",
      "Copy the converted color code you need for your web or Flutter project.",
    ],
  },

  "cron-generator": {
    seoTitle: "Cron Expression Generator Online - Free | DevByte",
    seoDescription:
      "Build and parse cron expressions with an intuitive visual editor. See plain-English descriptions, calculate next execution times, and validate cron syntax — all in your browser.",
    h1: "Build & Parse Cron Expressions",
    faqs: [
      {
        question: "What cron format does this generator use?",
        answer:
          "The generator uses the standard 5-field cron format (minute, hour, day-of-month, month, day-of-week) compatible with crontab, AWS CloudWatch, and most schedulers.",
      },
      {
        question: "Can I see when my cron job will run next?",
        answer:
          "Yes. The tool calculates and displays the next several execution times based on your cron expression so you can verify the schedule.",
      },
      {
        question: "Can I parse an existing cron expression?",
        answer:
          "Yes. Paste any valid cron string and the tool breaks it down into a plain-English description of the schedule.",
      },
      {
        question: "Does this support special cron characters?",
        answer:
          "Yes. All standard cron characters are supported, including * (every), , (list), - (range), and / (step values).",
      },
    ],
    howToSteps: [
      "Use the visual editor to select minute, hour, day, month, and weekday values.",
      "Review the generated cron expression and its plain-English description.",
      "Copy the cron expression and check the upcoming execution times.",
    ],
  },

  "html-formatter": {
    seoTitle: "HTML Formatter & Beautifier Online - Free | DevByte",
    seoDescription:
      "Format and beautify messy HTML code online. Clean indentation, configurable tab width, attribute wrapping, and entity decoding — all processed client-side in your browser.",
    h1: "Format & Beautify HTML Online",
    faqs: [
      {
        question: "Can I customize the indentation size?",
        answer:
          "Yes. Choose between 2-space, 4-space, or tab indentation to match your project's coding style.",
      },
      {
        question: "Does this tool handle inline styles and scripts?",
        answer:
          "Yes. Embedded CSS in <style> tags and JavaScript in <script> tags are properly indented within the HTML structure.",
      },
      {
        question: "Can I format partial HTML snippets?",
        answer:
          "Yes. The formatter works with full HTML documents as well as partial snippets like a single <div> block or a table fragment.",
      },
      {
        question: "Does it fix broken HTML tags?",
        answer:
          "The formatter focuses on indentation and readability. It does not alter tag structure, so malformed HTML is preserved as-is for you to fix manually.",
      },
    ],
    howToSteps: [
      "Paste your unformatted or minified HTML into the input editor.",
      "Choose your preferred indentation width and click Format.",
      "Copy the beautified HTML or download it as an .html file.",
    ],
  },

  "sql-formatter": {
    seoTitle: "SQL Formatter Online - Free SQL Beautifier | DevByte",
    seoDescription:
      "Format and beautify SQL queries online for free. Supports PostgreSQL, MySQL, SQLite, and ANSI SQL with keyword uppercasing, smart indentation, and clean alignment.",
    h1: "Format & Beautify SQL Queries Online",
    faqs: [
      {
        question: "What SQL dialects are supported?",
        answer:
          "The formatter supports PostgreSQL, MySQL, SQLite, MariaDB, and ANSI SQL syntax, handling dialect-specific keywords and functions correctly.",
      },
      {
        question: "Does this uppercase SQL keywords?",
        answer:
          "Yes. Keywords like SELECT, FROM, WHERE, and JOIN are automatically uppercased for readability, while identifiers and values remain unchanged.",
      },
      {
        question: "Can I format complex queries with subqueries?",
        answer:
          "Yes. Nested subqueries, CTEs (WITH clauses), and multi-join statements are properly indented for clear visual hierarchy.",
      },
      {
        question: "Is my SQL query sent to a server?",
        answer:
          "No. All formatting happens in your browser. Your queries and database schema information never leave your device.",
      },
    ],
    howToSteps: [
      "Paste your unformatted SQL query into the editor.",
      "Select your SQL dialect and click Format to beautify the query.",
      "Copy the clean, indented SQL to your clipboard or download it.",
    ],
  },

  "css-formatter": {
    seoTitle: "CSS Formatter & Beautifier Online - Free | DevByte",
    seoDescription:
      "Format and beautify minified CSS code online. Auto-indent rules, add line breaks, and organize selectors — all processed instantly in your browser with no server uploads.",
    h1: "Format & Beautify CSS Online",
    faqs: [
      {
        question: "Can I format minified CSS files?",
        answer:
          "Yes. Paste your minified CSS and the tool expands it into properly indented, readable rules with line breaks after every declaration.",
      },
      {
        question: "Does this handle nested CSS like SCSS?",
        answer:
          "The formatter processes standard CSS. For SCSS or Sass syntax, compile to CSS first, then format the output.",
      },
      {
        question: "Can I customize the indentation style?",
        answer:
          "Yes. Choose between 2-space and 4-space indentation to match your team's style guide.",
      },
      {
        question: "Does it sort CSS properties alphabetically?",
        answer:
          "The formatter focuses on indentation and structure. Property sorting is not applied by default to preserve your original declaration order.",
      },
    ],
    howToSteps: [
      "Paste your minified or messy CSS code into the input area.",
      "Choose indentation preferences and click Format to beautify.",
      "Copy the clean CSS stylesheet or download it for your project.",
    ],
  },

  "xml-formatter": {
    seoTitle: "XML Formatter & Beautifier Online - Free | DevByte",
    seoDescription:
      "Pretty-print and format XML documents online. Configurable indentation, support for AndroidManifest, RSS, SOAP, and self-closing tags — processed entirely in your browser.",
    h1: "Format & Pretty-Print XML Online",
    faqs: [
      {
        question: "What types of XML documents are supported?",
        answer:
          "The formatter handles all valid XML including AndroidManifest.xml, RSS feeds, SOAP envelopes, SVG files, and configuration XML with processing instructions.",
      },
      {
        question: "Can I choose 2-space or 4-space indentation?",
        answer:
          "Yes. Select your preferred indent width (2 or 4 spaces) and the formatter applies it consistently to all nested elements.",
      },
      {
        question: "Does this handle self-closing tags?",
        answer:
          "Yes. Self-closing tags like <br/> and <input/> are properly recognized and formatted without adding unnecessary closing tags.",
      },
      {
        question: "Will formatting change my XML data or attributes?",
        answer:
          "No. The formatter only adjusts whitespace and indentation. All element names, attribute values, and text content remain exactly as entered.",
      },
    ],
    howToSteps: [
      "Paste your unformatted XML string into the input editor.",
      "Select your indentation preference and click Format.",
      "Copy the pretty-printed XML or download it as an .xml file.",
    ],
  },

  "javascript-formatter": {
    seoTitle: "JavaScript Formatter & Beautifier Online | DevByte",
    seoDescription:
      "Format and beautify minified or obfuscated JavaScript code online. Supports ES2024+ syntax, arrow functions, template literals, and customizable indentation — all client-side.",
    h1: "Format & Beautify JavaScript Online",
    faqs: [
      {
        question: "Does this support modern ES2024+ JavaScript syntax?",
        answer:
          "Yes. The formatter handles arrow functions, template literals, optional chaining, nullish coalescing, top-level await, and other modern syntax.",
      },
      {
        question: "Can I deobfuscate minified JavaScript?",
        answer:
          "The tool reformats minified code into readable, indented source. It does not reverse variable renaming from obfuscation, but makes the structure clear.",
      },
      {
        question: "Does this work with TypeScript?",
        answer:
          "The formatter is optimized for JavaScript. TypeScript type annotations may be preserved but are not specifically handled.",
      },
      {
        question: "Can I customize indentation and brace style?",
        answer:
          "Yes. Choose your preferred indentation width to match your project's ESLint or Prettier configuration.",
      },
    ],
    howToSteps: [
      "Paste your minified or messy JavaScript code into the editor.",
      "Set your preferred indentation width and click Format.",
      "Copy the beautified JavaScript code or download it as a .js file.",
    ],
  },

  "json-to-freezed": {
    seoTitle: "JSON to Freezed Model Generator - Flutter | DevByte",
    seoDescription:
      "Generate immutable Freezed data classes from JSON for Flutter. Includes union types, custom annotations, and built-in JSON serialization — all processed in your browser.",
    h1: "Generate Freezed Models from JSON",
    faqs: [
      {
        question: "What is Freezed and why should I use it?",
        answer:
          "Freezed is a Dart code generation package that creates immutable data classes with built-in copyWith, equality, toString, and JSON serialization. It reduces boilerplate significantly.",
      },
      {
        question: "Does this generate union types and sealed classes?",
        answer:
          "Yes. The generator creates Freezed union types that work as sealed classes, allowing pattern matching on different data variants.",
      },
      {
        question: "Are the generated classes compatible with json_serializable?",
        answer:
          "Yes. Generated Freezed classes include the @JsonSerializable annotations and fromJson/toJson factories required for JSON serialization.",
      },
      {
        question: "Can I customize the generated class and field names?",
        answer:
          "Yes. Set a custom root class name and the generator automatically names nested classes based on their JSON keys using Dart naming conventions.",
      },
    ],
    howToSteps: [
      "Paste a sample JSON object that represents your data model.",
      "Configure the root class name and generation options.",
      "Click Generate to create immutable Freezed classes ready for your Flutter project.",
    ],
  },

  "flutter-pubspec-helper": {
    seoTitle: "Flutter Pubspec Helper - Dependency Analyzer | DevByte",
    seoDescription:
      "Analyze and validate Flutter pubspec.yaml files. Sort dependencies, audit version constraints, check indentation, and inspect package metadata — all in your browser.",
    h1: "Analyze & Validate Flutter Pubspec Files",
    faqs: [
      {
        question: "What does the pubspec analyzer check?",
        answer:
          "The analyzer inspects dependency declarations, semantic version constraints, YAML indentation, and overall structure to catch common pubspec.yaml mistakes.",
      },
      {
        question: "Can I sort my dependencies alphabetically?",
        answer:
          "Yes. Click Sort to reorder both dependencies and dev_dependencies alphabetically, keeping your pubspec.yaml clean and consistent.",
      },
      {
        question: "Does this check for outdated package versions?",
        answer:
          "The tool validates version constraint syntax (^, >=, etc.) and flags overly broad or pinned versions. For latest pub.dev versions, check the pub.dev site directly.",
      },
      {
        question: "Can I paste my entire pubspec.yaml?",
        answer:
          "Yes. Paste the full pubspec.yaml content and the tool parses all sections including name, description, environment, dependencies, and dev_dependencies.",
      },
    ],
    howToSteps: [
      "Paste the contents of your Flutter pubspec.yaml file into the editor.",
      "Review the analysis results: dependency audit, version constraints, and formatting issues.",
      "Copy the cleaned or sorted pubspec.yaml back into your project.",
    ],
  },

  "dart-list-formatter": {
    seoTitle: "Dart List Formatter - Convert CSV to Dart | DevByte",
    seoDescription:
      "Convert CSV strings, JSON arrays, or newline-separated values into formatted Dart List<String> constants. Sort, deduplicate, and copy clean Dart code in one click.",
    h1: "Format CSV & Arrays as Dart Lists",
    faqs: [
      {
        question: "What input formats are supported?",
        answer:
          "The formatter accepts comma-separated values (CSV), JSON arrays, and newline-separated strings, converting them all into clean Dart list declarations.",
      },
      {
        question: "Does this remove duplicate values?",
        answer:
          "Yes. Enable the deduplicate option to automatically remove duplicate entries from the generated Dart list.",
      },
      {
        question: "Can I generate a const list?",
        answer:
          "Yes. The output produces a Dart `const List<String>` declaration that you can paste directly into your Flutter or Dart project.",
      },
      {
        question: "Will the values be sorted?",
        answer:
          "You can toggle alphabetical sorting on or off depending on whether you need ordered or original-sequence output.",
      },
    ],
    howToSteps: [
      "Paste comma-separated values, a JSON array, or newline-separated items into the input.",
      "Choose sorting and deduplication options, then click Format.",
      "Copy the generated Dart List<String> constant into your Flutter project.",
    ],
  },
};
