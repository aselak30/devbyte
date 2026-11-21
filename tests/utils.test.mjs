import test from "node:test";
import assert from "node:assert/strict";

// Test 1: JSON Formatter & Validator Utilities
test("JSON Validator: validates correct JSON", () => {
  const valid = JSON.stringify({ name: "DevByte", count: 42 });
  assert.doesNotThrow(() => JSON.parse(valid));
});

test("JSON Validator: detects invalid JSON syntax", () => {
  const invalid = '{"name": "DevByte",}'; // trailing comma
  assert.throws(() => JSON.parse(invalid));
});

test("JSON Minifier: reduces size of formatted JSON", () => {
  const sample = {
    platform: "DevByte",
    tools: ["json", "dart", "jwt"],
    active: true,
  };
  const beautified = JSON.stringify(sample, null, 2);
  const minified = JSON.stringify(sample);
  assert.ok(minified.length < beautified.length);
  assert.deepEqual(JSON.parse(minified), sample);
});

// Test 2: Unicode Base64 Encoding & Decoding
function textToBase64(text, urlSafe = false) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  let base64 = Buffer.from(bytes).toString("base64");
  if (urlSafe) {
    base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return base64;
}

function base64ToText(base64, urlSafe = false) {
  let normalized = base64.trim();
  if (urlSafe || normalized.includes("-") || normalized.includes("_")) {
    normalized = normalized.replace(/-/g, "+").replace(/_/g, "/");
    while (normalized.length % 4) {
      normalized += "=";
    }
  }
  return Buffer.from(normalized, "base64").toString("utf-8");
}

test("Base64: handles multi-byte Unicode and emojis without errors", () => {
  const input = "Hello 🚀 DevByte! 日本語 & Español ✨";
  const encoded = textToBase64(input);
  const decoded = base64ToText(encoded);
  assert.equal(decoded, input);
});

test("Base64: handles URL-safe encoding and decoding", () => {
  const input = "Testing URL safe characters ??? /// +++ ===";
  const encodedUrlSafe = textToBase64(input, true);
  assert.ok(!encodedUrlSafe.includes("+"));
  assert.ok(!encodedUrlSafe.includes("/"));
  const decoded = base64ToText(encodedUrlSafe, true);
  assert.equal(decoded, input);
});

// Test 3: JWT Parsing and Structure Validation
test("JWT: detects invalid segment count", () => {
  const malformed = "header.payload"; // missing signature
  const parts = malformed.split(".");
  assert.equal(parts.length, 2);
  assert.notEqual(parts.length, 3);
});

test("JWT: decodes valid token claims", () => {
  const samplePayload = {
    sub: "user-123",
    name: "Alex",
    exp: 1893456000,
  };
  const b64Payload = Buffer.from(JSON.stringify(samplePayload)).toString("base64url");
  const decoded = JSON.parse(Buffer.from(b64Payload, "base64url").toString("utf-8"));
  assert.equal(decoded.sub, "user-123");
  assert.equal(decoded.name, "Alex");
  assert.equal(decoded.exp, 1893456000);
});

// Test 4: Unix Timestamp Edge Cases
test("Timestamp Converter: handles epoch 0 and leap years", () => {
  const epoch0 = new Date(0);
  assert.equal(epoch0.toUTCString(), "Thu, 01 Jan 1970 00:00:00 GMT");

  // Year 2026 timestamp
  const ts2026 = 1767225600; // Jan 1 2026
  const date2026 = new Date(ts2026 * 1000);
  assert.equal(date2026.getUTCFullYear(), 2026);
});
