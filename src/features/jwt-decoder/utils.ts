export interface DecodedJwt {
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string;
  rawHeader: string;
  rawPayload: string;
  isValid: boolean;
  error: string | null;
  isExpired: boolean | null;
  expirationDate: Date | null;
  issuedAtDate: Date | null;
  notBeforeDate: Date | null;
  algorithm: string | null;
}

function base64UrlDecode(str: string): string {
  // Replace standard URL-safe characters
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("Illegal base64url string!");
  }
  return decodeURIComponent(
    atob(output)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
}

export function decodeJwt(token: string): DecodedJwt {
  const trimmed = token.trim();
  if (!trimmed) {
    return {
      header: null,
      payload: null,
      signature: "",
      rawHeader: "",
      rawPayload: "",
      isValid: false,
      error: null,
      isExpired: null,
      expirationDate: null,
      issuedAtDate: null,
      notBeforeDate: null,
      algorithm: null,
    };
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return {
      header: null,
      payload: null,
      signature: "",
      rawHeader: "",
      rawPayload: "",
      isValid: false,
      error: `Invalid JWT structure: Expected 3 period-delimited parts (Header.Payload.Signature), but found ${parts.length}.`,
      isExpired: null,
      expirationDate: null,
      issuedAtDate: null,
      notBeforeDate: null,
      algorithm: null,
    };
  }

  try {
    const rawHeader = base64UrlDecode(parts[0]);
    const rawPayload = base64UrlDecode(parts[1]);
    const signature = parts[2];

    const header = JSON.parse(rawHeader) as Record<string, unknown>;
    const payload = JSON.parse(rawPayload) as Record<string, unknown>;

    let expirationDate: Date | null = null;
    let isExpired: boolean | null = null;
    if (typeof payload.exp === "number") {
      expirationDate = new Date(payload.exp * 1000);
      isExpired = Date.now() >= payload.exp * 1000;
    }

    let issuedAtDate: Date | null = null;
    if (typeof payload.iat === "number") {
      issuedAtDate = new Date(payload.iat * 1000);
    }

    let notBeforeDate: Date | null = null;
    if (typeof payload.nbf === "number") {
      notBeforeDate = new Date(payload.nbf * 1000);
    }

    const algorithm = (typeof header.alg === "string" ? header.alg : null) || null;

    return {
      header,
      payload,
      signature,
      rawHeader,
      rawPayload,
      isValid: true,
      error: null,
      isExpired,
      expirationDate,
      issuedAtDate,
      notBeforeDate,
      algorithm,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to decode JWT segments";
    return {
      header: null,
      payload: null,
      signature: parts[2] || "",
      rawHeader: "",
      rawPayload: "",
      isValid: false,
      error: `Malformed token encoding: ${msg}`,
      isExpired: null,
      expirationDate: null,
      issuedAtDate: null,
      notBeforeDate: null,
      algorithm: null,
    };
  }
}

export const SAMPLE_JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZXYtMTI5ODQiLCJuYW1lIjoiQWxleCBDaGVuIiwiZW1haWwiOiJhbGV4QGRldmJ5dGUudG9vbHMiLCJyb2xlIjoiU2VuaW9yIEVuZ2luZWVyIiwiaWF0IjoxNzMyMTE4NDAwLCJleHAiOjE3NjM2NTQ0MDAsImlzcyI6Imh0dHBzOi8vYXV0aC5kZXZieXRlLnRvb2xzIiwiYXVkIjpbImFwaS12MSIsImFkbWluLXBvcnRhbCJdfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

