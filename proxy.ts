/**
 * proxy.ts — Composed middleware: i18n (next-intl) + auth route protection
 *
 * Execution order:
 *   1. next-intl handles locale detection, redirect, and cookie setting
 *   2. Auth layer reads the auth_status cookie and protects/redirects routes
 *
 * Why compose manually instead of next-intl's createMiddleware alone?
 *   next-intl doesn't know about your auth state. We need to intercept
 *   AFTER locale is resolved so redirect URLs include the correct locale prefix.
 *
 * Route anatomy with i18n:
 *   Public URL:    /en/dashboard    → protected
 *   Public URL:    /en/login        → auth route (redirect if logged in)
 *   pathname from request.nextUrl:  /en/dashboard  (always has locale prefix here)
 */

import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// ─── next-intl middleware instance ───────────────────────────────────────────

const intlMiddleware = createIntlMiddleware(routing);

// ─── Route definitions (WITHOUT locale prefix — we strip it before matching) ─

/**
 * Routes that require authentication.
 * Define the path AFTER the locale segment.
 * e.g. /en/dashboard → stripped to /dashboard → matches here.
 */
const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/security",
  "/settings",
];

/**
 * Routes that logged-in users should be redirected away from.
 */
const AUTH_ROUTES = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
];

/**
 * Routes that are always accessible, even with a broken/expired token.
 * These are token-consumption pages that need to load regardless of auth state.
 */
const PUBLIC_ROUTES = [
  "/verify-email",
  "/magic-link",
  "/reset-password",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Strip the locale prefix from a pathname.
 * /en/dashboard  → /dashboard
 * /ar/login      → /login
 * /zh            → /
 */
function stripLocale(pathname: string, locales: readonly string[]): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length);
    }
  }
  return pathname;
}

function isProtected(path: string): boolean {
  return PROTECTED_ROUTES.some(
    (r) => path === r || path.startsWith(`${r}/`)
  );
}

function isAuthRoute(path: string): boolean {
  return AUTH_ROUTES.some(
    (r) => path === r || path.startsWith(`${r}/`)
  );
}

function isAlwaysPublic(path: string): boolean {
  return PUBLIC_ROUTES.some(
    (r) => path === r || path.startsWith(`${r}/`)
  );
}

// ─── Composed middleware ──────────────────────────────────────────────────────

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Step 1: Run next-intl first ────────────────────────────────────────
  // It handles locale detection, redirects (e.g. / → /en), and sets the
  // Next-Locale cookie. We capture its response and potentially override it.
  const intlResponse = intlMiddleware(request);

  // If next-intl itself issued a redirect (e.g. / → /en), honour it.
  // Auth state doesn't matter — we'd just redirect again on the next load.
  if (intlResponse.status === 307 || intlResponse.status === 308) {
    return intlResponse;
  }

  // ── Step 2: Resolve the locale-stripped path ───────────────────────────
  const locales = routing.locales as readonly string[];

  // After a 307, next-intl may redirect to a localised path. For non-redirect
  // responses we read the original pathname (already localised by the router).
  const strippedPath = stripLocale(pathname, locales);

  // Always-public routes skip auth entirely
  if (isAlwaysPublic(strippedPath)) {
    return intlResponse;
  }

  // ── Step 3: Read auth status cookie ────────────────────────────────────
  // Set by /api/auth/session route handler when the user logs in/out.
  // Contains "1" when a valid session exists, absent otherwise.
  const authStatus = request.cookies.get("auth_status")?.value;
  const isLoggedIn = authStatus === "1";

  // ── Step 4: Detect the current locale for building redirect URLs ────────
  // next-intl sets the X-Next-Intl-Locale header on its response.
  // Fall back to the default locale if not present.
  const currentLocale =
    intlResponse.headers.get("X-Next-Intl-Locale") ??
    (routing.defaultLocale as string);

  // ── Step 5: Protected route — not logged in ─────────────────────────────
  if (isProtected(strippedPath) && !isLoggedIn) {
    const loginUrl = new URL(`/${currentLocale}/login`, request.url);
    // Preserve original destination for post-login redirect
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Step 6: Auth route — already logged in ──────────────────────────────
  if (isAuthRoute(strippedPath) && isLoggedIn) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    // Only honour same-origin redirects to prevent open redirect attacks
    const isSafeRedirect =
      redirectParam &&
      redirectParam.startsWith("/") &&
      !redirectParam.startsWith("//");

    const destination = isSafeRedirect
      ? redirectParam
      : `/${currentLocale}/dashboard`;

    return NextResponse.redirect(new URL(destination, request.url));
  }

  // ── Step 7: Pass through — return next-intl's response ─────────────────
  return intlResponse;
}

// ─── Matcher configuration (only for middleware execution) ───────────────────

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *   - api routes          (/api/...)
     *   - _next internals     (/_next/...)
     *   - static assets       (files with extensions: .ico, .png, .svg, etc.)
     */
    "/((?!api|_next|.*\\..*).*)",
  ],
};