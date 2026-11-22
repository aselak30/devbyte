export interface ArticleSection {
  heading: string;
  body: string;
  code?: string;
}

export interface ArticleContent {
  sections: ArticleSection[];
  relatedToolSlugs: string[];
  relatedArticleSlugs: string[];
}

export const BLOG_CONTENT: Record<string, ArticleContent> = {
  "flutter-null-safety-json-serialization": {
    sections: [
      {
        heading: "Understanding the Problem Domain",
        body: "One of the most frequent sources of runtime crashes in mobile and web applications is unexpected null values or type mismatch errors during JSON parsing. Ensuring sound type safety before your state management layer consumes the payload is paramount. Modern Dart enforces null safety at compile time, which means you must explicitly handle nullable fields in your model classes.",
        code: `class UserProfile {
  final String id;
  final String displayName;
  final bool isVerified;

  const UserProfile({
    required this.id,
    required this.displayName,
    this.isVerified = false,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      id: json['id'] as String,
      displayName: json['displayName'] as String? ?? 'Anonymous',
      isVerified: json['isVerified'] as bool? ?? false,
    );
  }
}`,
      },
      {
        heading: "Handling Nested Objects and Lists",
        body: "Real-world API responses rarely contain flat structures. You need to handle nested objects, arrays of objects, and nullable nested fields. The key pattern is to create separate model classes for each nested structure and use factory constructors that safely parse each level.",
        code: `class ApiResponse {
  final List<UserProfile> users;
  final PaginationMeta meta;

  const ApiResponse({required this.users, required this.meta});

  factory ApiResponse.fromJson(Map<String, dynamic> json) {
    return ApiResponse(
      users: (json['users'] as List<dynamic>?)
          ?.map((e) => UserProfile.fromJson(e as Map<String, dynamic>))
          .toList() ?? [],
      meta: PaginationMeta.fromJson(json['meta'] as Map<String, dynamic>),
    );
  }
}`,
      },
      {
        heading: "Using json_serializable for Code Generation",
        body: "Writing fromJson and toJson methods manually is error-prone for large APIs. The json_serializable package generates these methods automatically from annotations, reducing boilerplate and eliminating typos in key names. Add the package to your dev_dependencies and run build_runner to generate the serialization code.",
      },
    ],
    relatedToolSlugs: ["json-to-dart", "json-formatter", "json-to-freezed"],
    relatedArticleSlugs: ["how-to-convert-json-to-dart", "how-to-format-json-online"],
  },

  "understanding-jwt-claims-and-signature-security": {
    sections: [
      {
        heading: "The Three Parts of a JWT",
        body: "A JSON Web Token consists of three Base64URL-encoded segments separated by dots: the Header, the Payload, and the Signature. The Header specifies the signing algorithm (e.g., HS256, RS256). The Payload contains the claims — key-value pairs carrying information about the user or session. The Signature is a cryptographic hash that proves the token hasn't been tampered with.",
        code: `// JWT Structure
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  <- Header
// eyJzdWIiOiIxMjM0NTY3ODkwIn0.              <- Payload
// SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  <- Signature`,
      },
      {
        heading: "Why Decoding Is Not Verification",
        body: "Decoding a JWT simply means Base64URL-decoding the Header and Payload segments to read their contents. This tells you what claims the token carries, but it does not prove the token is authentic. Verification requires the signing key (a shared secret for HMAC algorithms, or the public key for RSA/ECDSA) and validates that the Signature segment matches the Header and Payload. Never trust decoded claims without server-side signature verification.",
      },
      {
        heading: "Best Practices for Token Hygiene",
        body: "Store tokens securely — prefer HTTP-only cookies over localStorage to prevent XSS attacks. Always validate tokens server-side before granting access. Set short expiration times and use refresh tokens for long sessions. Never embed sensitive data like passwords or credit card numbers in JWT payloads, as they are only encoded, not encrypted. Rotate signing keys periodically.",
      },
    ],
    relatedToolSlugs: ["jwt-decoder", "base64-converter"],
    relatedArticleSlugs: ["how-to-decode-jwt-tokens", "the-complete-guide-to-base64-in-modern-web-and-mobile"],
  },

  "the-complete-guide-to-base64-in-modern-web-and-mobile": {
    sections: [
      {
        heading: "What Is Base64 Encoding?",
        body: "Base64 is a binary-to-text encoding scheme that represents binary data as an ASCII string using 64 characters (A-Z, a-z, 0-9, +, /). It's commonly used to embed images in HTML/CSS data URIs, transmit binary data in JSON APIs, encode email attachments (MIME), and store binary data in text-only systems like XML or CSV.",
      },
      {
        heading: "Why window.btoa Fails on Unicode",
        body: "JavaScript's built-in btoa() function only accepts Latin-1 (ISO 8859-1) characters. If your string contains multi-byte UTF-8 characters like emojis, accented letters, or CJK characters, btoa() throws an InvalidCharacterError. The solution is to first encode the string to UTF-8 bytes using TextEncoder, then convert those bytes to a binary string that btoa() can handle.",
        code: `// Correct UTF-8 Base64 encoding
function utf8ToBase64(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = '';
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary);
}

// Works with emojis and Unicode
utf8ToBase64('Hello 🌍'); // "SGVsbG8g8J+MjQ=="`,
      },
      {
        heading: "URL-Safe Base64 Variants",
        body: "Standard Base64 uses + and / characters which have special meaning in URLs and filenames. The URL-safe variant (RFC 4648 Section 5) replaces + with -, / with _, and optionally omits the padding = characters. This format is used in JWTs, OAuth tokens, and anywhere Base64 data appears in URLs or query parameters.",
      },
    ],
    relatedToolSlugs: ["base64-converter", "url-encoder", "jwt-decoder"],
    relatedArticleSlugs: ["understanding-jwt-claims-and-signature-security", "url-encoding-explained"],
  },

  "how-to-format-json-online": {
    sections: [
      {
        heading: "What Is JSON Formatting?",
        body: "JSON formatting (also called beautifying or pretty-printing) adds indentation and line breaks to JSON data to make it human-readable. Minified JSON is compact for transmission but difficult to read. Formatting transforms a single-line JSON string into a structured, indented layout where you can easily see the hierarchy of objects and arrays.",
        code: `// Before formatting (minified):
{"name":"Alice","age":30,"address":{"city":"London","zip":"EC1A"}}

// After formatting (beautified):
{
  "name": "Alice",
  "age": 30,
  "address": {
    "city": "London",
    "zip": "EC1A"
  }
}`,
      },
      {
        heading: "When to Format vs. Minify JSON",
        body: "Use formatted JSON during development, debugging, code reviews, and documentation. Use minified JSON in production API responses, configuration files deployed to servers, and anywhere bandwidth or storage size matters. A typical JSON payload can be 30-60% smaller when minified.",
      },
      {
        heading: "Common JSON Syntax Errors",
        body: "The most frequent JSON errors include: trailing commas after the last element in an array or object, single quotes instead of double quotes around strings, unquoted property names, comments (JSON doesn't support them), and undefined/NaN values. A good JSON validator identifies these errors with line numbers so you can fix them quickly.",
      },
    ],
    relatedToolSlugs: ["json-formatter", "json-to-dart"],
    relatedArticleSlugs: ["how-to-validate-json-fix-errors", "flutter-null-safety-json-serialization"],
  },

  "how-to-validate-json-fix-errors": {
    sections: [
      {
        heading: "How JSON Validation Works",
        body: "JSON validation checks whether a string conforms to the JSON specification (RFC 8259). Valid JSON must use double quotes for strings and property names, cannot contain trailing commas, does not support comments, and must have properly matched brackets and braces. A validator parses the string and reports syntax errors with their location.",
      },
      {
        heading: "Top 5 JSON Errors and Fixes",
        body: "1. Trailing commas: Remove the comma after the last element. 2. Single quotes: Replace 'value' with \"value\". 3. Unquoted keys: Change {name: \"Alice\"} to {\"name\": \"Alice\"}. 4. Missing commas between elements: Add commas between array items or object properties. 5. Mismatched brackets: Count opening and closing brackets to find the mismatch.",
        code: `// ❌ Invalid JSON (trailing comma):
{ "items": ["a", "b", "c", ] }

// ✅ Valid JSON:
{ "items": ["a", "b", "c"] }

// ❌ Invalid JSON (single quotes):
{ 'name': 'Alice' }

// ✅ Valid JSON:
{ "name": "Alice" }`,
      },
      {
        heading: "Validating JSON in Different Languages",
        body: "In JavaScript, use JSON.parse() inside a try-catch block. In Python, use json.loads(). In Dart/Flutter, use jsonDecode(). All of these throw descriptive errors for malformed JSON. For quick validation without writing code, use an online JSON validator that highlights errors with line and column numbers.",
      },
    ],
    relatedToolSlugs: ["json-formatter", "json-to-dart"],
    relatedArticleSlugs: ["how-to-format-json-online", "how-to-convert-json-to-dart"],
  },

  "how-to-convert-json-to-dart": {
    sections: [
      {
        heading: "Why Generate Dart Models from JSON?",
        body: "When building Flutter apps that consume REST APIs, you need Dart model classes that safely parse JSON responses into typed objects. Manually writing these classes is tedious and error-prone, especially for large API responses with nested objects. A JSON-to-Dart generator automates this process, creating type-safe classes with fromJson constructors and toJson methods.",
      },
      {
        heading: "Step-by-Step: JSON to Dart Conversion",
        body: "Start with a sample JSON response from your API. Paste it into a JSON-to-Dart generator tool. Set the root class name (e.g., UserResponse). The tool analyzes the JSON structure and generates Dart classes for every object, handling String, int, double, bool, List, and nested Map types with proper null safety annotations.",
        code: `// Input JSON:
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "address": {
    "street": "123 Main St",
    "city": "London"
  }
}

// Generated Dart:
class UserResponse {
  final int id;
  final String name;
  final String email;
  final Address address;

  const UserResponse({
    required this.id,
    required this.name,
    required this.email,
    required this.address,
  });

  factory UserResponse.fromJson(Map<String, dynamic> json) {
    return UserResponse(
      id: json['id'] as int,
      name: json['name'] as String,
      email: json['email'] as String,
      address: Address.fromJson(json['address'] as Map<String, dynamic>),
    );
  }
}`,
      },
      {
        heading: "Adding json_serializable Annotations",
        body: "For production Flutter apps, consider using json_serializable with build_runner. This approach generates fromJson and toJson methods from annotations, ensuring they stay in sync with your class fields. Add json_annotation to dependencies and json_serializable and build_runner to dev_dependencies in your pubspec.yaml.",
      },
    ],
    relatedToolSlugs: ["json-to-dart", "json-formatter", "json-to-freezed"],
    relatedArticleSlugs: ["flutter-null-safety-json-serialization", "how-to-format-json-online"],
  },

  "how-to-decode-jwt-tokens": {
    sections: [
      {
        heading: "What Is a JWT Token?",
        body: "A JSON Web Token (JWT) is a compact, URL-safe token format used for authentication and information exchange. It consists of three parts separated by dots: a Header (algorithm and token type), a Payload (claims about the user), and a Signature (cryptographic proof of integrity). JWTs are widely used in OAuth 2.0, OpenID Connect, and stateless API authentication.",
      },
      {
        heading: "How to Decode a JWT",
        body: "Decoding a JWT is straightforward — split the token by dots, then Base64URL-decode the first two segments. The Header and Payload are plain JSON objects that you can read without any secret key. The Signature requires the signing key to verify, but you can still decode the claims without it.",
        code: `// Decode JWT in JavaScript:
function decodeJWT(token) {
  const [header, payload] = token.split('.').slice(0, 2);

  const decode = (str) =>
    JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));

  return {
    header: decode(header),
    payload: decode(payload),
  };
}`,
      },
      {
        heading: "Important Security Considerations",
        body: "Decoding a JWT does NOT verify its authenticity. Anyone can create a JWT with any claims — the Signature is what proves the token was issued by a trusted party. Always verify signatures server-side before trusting claims. Never paste production tokens containing real user data into online tools. Use test tokens for debugging. Store tokens in HTTP-only cookies rather than localStorage to prevent XSS attacks.",
      },
    ],
    relatedToolSlugs: ["jwt-decoder", "base64-converter"],
    relatedArticleSlugs: ["understanding-jwt-claims-and-signature-security", "the-complete-guide-to-base64-in-modern-web-and-mobile"],
  },

  "what-is-uuid-guide": {
    sections: [
      {
        heading: "UUID Basics",
        body: "A UUID (Universally Unique Identifier) is a 128-bit identifier represented as 32 hexadecimal characters in the format 8-4-4-4-12 (e.g., 550e8400-e29b-41d4-a716-446655440000). UUIDs are designed to be globally unique without requiring a central authority, making them ideal for distributed systems, database primary keys, and resource identifiers.",
      },
      {
        heading: "UUID Versions Explained",
        body: "UUID v1 uses the current timestamp and MAC address — unique but reveals the creation time and hardware identity. UUID v4 is generated from random numbers — the most popular version for general use. UUID v5 is generated from a namespace and name using SHA-1 hashing — deterministic and reproducible. UUID v7 (RFC 9562) combines a timestamp with random data — sortable and efficient for database indexes.",
      },
      {
        heading: "When to Use UUIDs vs Auto-Increment IDs",
        body: "Use UUIDs when you need globally unique identifiers without coordination (distributed systems, microservices, offline-first apps, client-generated IDs). Use auto-increment IDs when you need compact, sortable identifiers in a single database. UUIDs are 128 bits (16 bytes) vs 32-64 bits for integers, so they use more storage but eliminate ID conflicts across systems.",
      },
    ],
    relatedToolSlugs: ["uuid-generator", "timestamp-converter"],
    relatedArticleSlugs: ["unix-timestamp-explained", "how-to-format-json-online"],
  },

  "unix-timestamp-explained": {
    sections: [
      {
        heading: "What Is Unix Time?",
        body: "Unix time (also called epoch time or POSIX time) counts the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC — known as the Unix Epoch. It provides a timezone-independent way to represent a point in time as a single integer, making it ideal for storing dates in databases, APIs, log files, and cross-platform applications.",
      },
      {
        heading: "Seconds vs Milliseconds",
        body: "Traditional Unix timestamps use seconds (10 digits, e.g., 1700000000). JavaScript's Date.now() and many modern APIs return milliseconds (13 digits, e.g., 1700000000000). Java's System.currentTimeMillis() also uses milliseconds. When converting, check the number of digits to determine the format — 10 digits is seconds, 13 digits is milliseconds.",
        code: `// JavaScript
Date.now();           // 1700000000000 (milliseconds)
Math.floor(Date.now() / 1000); // 1700000000 (seconds)

// Python
import time
int(time.time())      # 1700000000 (seconds)

// Dart
DateTime.now().millisecondsSinceEpoch  // milliseconds`,
      },
      {
        heading: "The Year 2038 Problem",
        body: "Systems that store Unix timestamps as 32-bit signed integers will overflow on January 19, 2038, at 03:14:07 UTC. After this point, the timestamp wraps to a large negative number, representing a date in December 1901. Modern systems use 64-bit integers, which won't overflow for billions of years. If you're building new systems, always use 64-bit timestamps.",
      },
    ],
    relatedToolSlugs: ["timestamp-converter", "uuid-generator"],
    relatedArticleSlugs: ["what-is-uuid-guide", "how-to-format-json-online"],
  },

  "url-encoding-explained": {
    sections: [
      {
        heading: "What Is URL Encoding?",
        body: "URL encoding (percent-encoding) replaces unsafe ASCII characters in URLs with a percent sign (%) followed by two hexadecimal digits representing the character's byte value. For example, a space becomes %20, and an ampersand becomes %26. This ensures URLs are transmitted correctly across all systems, as certain characters have special meanings in URL syntax.",
      },
      {
        heading: "encodeURI vs encodeURIComponent",
        body: "JavaScript provides two encoding functions with different purposes. encodeURI() encodes a complete URI but preserves characters with special URL meaning (://?#[]@!$&'()*+,;=). encodeURIComponent() encodes everything except unreserved characters (letters, digits, - _ . ~), making it safe for encoding query parameter values.",
        code: `// encodeURI — for complete URLs:
encodeURI('https://example.com/path?name=John Doe')
// "https://example.com/path?name=John%20Doe"

// encodeURIComponent — for query values:
'?search=' + encodeURIComponent('C++ & Java')
// "?search=C%2B%2B%20%26%20Java"`,
      },
      {
        heading: "Common Encoding Mistakes",
        body: "Double-encoding occurs when you encode an already-encoded string, turning %20 into %2520. Always encode raw values, not already-encoded URLs. Another common mistake is using encodeURI for query parameter values — this leaves &, =, and + unencoded, breaking query string parsing. Use encodeURIComponent for individual parameter values.",
      },
    ],
    relatedToolSlugs: ["url-encoder", "base64-converter"],
    relatedArticleSlugs: ["the-complete-guide-to-base64-in-modern-web-and-mobile", "how-to-format-json-online"],
  },
};
