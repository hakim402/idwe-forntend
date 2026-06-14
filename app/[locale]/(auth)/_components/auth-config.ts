// app/[locale]/(auth)/_components/auth-config.ts

export type Locale =
  | "en"
  | "zh"
  | "ar"
  | "fa"
  | "ps"
  | "de"
  | "es"
  | "nl"
  | "it"
  | "fr";

export type AuthMode =
  | "login"
  | "signup"
  | "forgot-password"
  | "verify-otp";

export const AUTH_ENDPOINTS = {
  login:          "/api/auth/login",
  signup:         "/api/auth/signup",
  forgotPassword: "/api/auth/forgot-password",
  verifyOtp:      "/api/auth/verify-otp",
} as const;

const SUPPORTED_LOCALES: Locale[] = [
  "en", "zh", "ar", "fa", "ps", "de", "es", "nl", "it", "fr",
];

const RTL_LOCALES = new Set<Locale>(["ar", "fa", "ps"]);

export function getSupportedLocale(locale: string): Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
}

export function isRtlLocale(locale: Locale): boolean {
  return RTL_LOCALES.has(locale);
}

export function localePath(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}