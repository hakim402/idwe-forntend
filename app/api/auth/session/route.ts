/**
 * app/api/auth/session/route.ts — Auth status cookie sync
 *
 * This Route Handler bridges the gap between:
 *   • localStorage (where your JWTs live, client-side)
 *   • The Edge Middleware (which can only read cookies)
 *
 * It sets/clears a lightweight "auth_status" cookie that the middleware
 * reads to decide whether to allow or redirect a request.
 *
 * The cookie does NOT contain the actual JWT — it's just a presence flag.
 * The real token stays in localStorage as per your current architecture.
 *
 * Called by:
 *   • auth.ts → storeTokens() — POST to set the cookie after login
 *   • auth.ts → logout()      — DELETE to clear the cookie on logout
 *
 * Upgrade path:
 *   When you're ready to move to httpOnly cookies, you can store the
 *   actual JWT here and update TokenStorage to read from cookies instead
 *   of localStorage. The middleware stays unchanged.
 */

import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "auth_status";

const COOKIE_OPTIONS = {
  httpOnly: false,   // Must be readable by JS so auth.ts can mirror it
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  // Expire the cookie in 7 days (matches a typical refresh token lifetime)
  maxAge: 60 * 60 * 24 * 7,
};

/** POST /api/auth/session — called after successful login/OAuth */
export async function POST(_req: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "1", COOKIE_OPTIONS);
  return response;
}

/** DELETE /api/auth/session — called on logout */
export async function DELETE(_req: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "", { ...COOKIE_OPTIONS, maxAge: 0 });
  return response;
}

/** GET /api/auth/session — read current cookie state (debug/health check) */
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME);
  return NextResponse.json({ authenticated: cookie?.value === "1" });
}