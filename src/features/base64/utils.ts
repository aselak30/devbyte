export function textToBase64(
  text: string,
  urlSafe = false
): { result: string; error: string | null } {
  if (!text) return { result: "", error: null };
  try {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    let base64 = btoa(binary);
    if (urlSafe) {
      base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    return { result: base64, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Encoding failed";
    return { result: "", error: msg };
  }
}

export function base64ToText(
  base64: string,
  urlSafe = false
): { result: string; error: string | null } {
  const trimmed = base64.trim();
  if (!trimmed) return { result: "", error: null };
  try {
    let normalized = trimmed;
    if (urlSafe || trimmed.includes("-") || trimmed.includes("_")) {
      normalized = normalized.replace(/-/g, "+").replace(/_/g, "/");
      while (normalized.length % 4) {
        normalized += "=";
      }
    }
    const binary = atob(normalized);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const text = new TextDecoder().decode(bytes);
    return { result: text, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Decoding failed. Input is not valid Base64.";
    return { result: "", error: msg };
  }
}

export const SAMPLE_TEXT = `Hello, DevByte! 🚀
Fast, privacy-friendly online developer tools.
Unicode & Emojis: 🌍 ✨ 👨‍💻 ⚡
Languages: 日本語, Español, Français, 中文`;

export const SAMPLE_BASE64 = `SGVsbG8sIERldkJ5dGUhIPCfkYACompetency:IEZhc3QsIHByaXZhY3ktZnJpZW5kbHkgb25saW5lIGRldmVsb3BlciB0b29scy4KVW5pY29kZSAmIEVtb2ppczog8J+MjCDinKgg8J+RjOKAjfCfkrsg4pqhCkxhbmd1YWdlczog5pel5pys6KqeLCBFc3Bhw7FvbCwgRnJhbsOnYWlzLCDkuK3mloc=`;
