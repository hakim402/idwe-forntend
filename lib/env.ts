/**
 * env.ts — Centralised environment variable validation
 *
 * Import this at the top of any file that needs env vars.
 * Throws at module-load time so a misconfigured deployment
 * fails loudly instead of silently at runtime.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    throw new Error(
      `[env] Missing required environment variable: "${key}"\n` +
        `Make sure it is defined in .env.local (development) or your deployment environment.`
    );
  }
  return value.trim();
}

function optionalEnv(key: string, fallback: string): string {
  const value = process.env[key];
  return value?.trim() || fallback;
}

// ─── Validated exports ──────────────────────────────────────────────────────

/**
 * Base URL for all API calls, e.g. http://localhost:8000/api
 * Must NOT have a trailing slash.
 */
export const API_BASE_URL = requireEnv("NEXT_PUBLIC_API_BASE_URL").replace(
  /\/+$/,
  ""
);

/**
 * Google OAuth client ID from Google Cloud Console.
 * Only needed on the client; prefixed with NEXT_PUBLIC_.
 */
export const GOOGLE_CLIENT_ID = requireEnv("NEXT_PUBLIC_GOOGLE_CLIENT_ID");

/**
 * Application base URL, used for building redirect URLs.
 * Falls back to localhost:3000 in development.
 */
export const APP_URL = optionalEnv(
  "NEXT_PUBLIC_APP_URL",
  "http://localhost:3000"
).replace(/\/+$/, "");

/**
 * Current environment.
 */
export const IS_PRODUCTION = process.env.NODE_ENV === "production";

// ─── Validate on import (server + client) ───────────────────────────────────
// The requireEnv calls above already throw; this block is an explicit
// guard for any future additions.
const _REQUIRED_KEYS = [
  "NEXT_PUBLIC_API_BASE_URL",
  "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
] as const;

export function validateEnv(): void {
  const missing: string[] = [];

  for (const key of _REQUIRED_KEYS) {
    if (!process.env[key]?.trim()) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `[env] The following required environment variables are missing:\n` +
        missing.map((k) => `  • ${k}`).join("\n") +
        `\n\nAdd them to your .env.local file.`
    );
  }
}
