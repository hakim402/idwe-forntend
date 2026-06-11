"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, Mail } from "lucide-react";
import { AuthInput } from "./AuthFields";
import {
  AUTH_ENDPOINTS,
  getSupportedLocale,
  isRtlLocale,
  localePath,
} from "./auth-config";

export default function ForgotPasswordForm() {
  const locale = getSupportedLocale(useLocale());
  const isRtl = isRtlLocale(locale);
  const t = useTranslations("Auth");

  return (
    <form
      action={AUTH_ENDPOINTS.forgotPassword}
      method="post"
      className="grid gap-5"
    >
      <input type="hidden" name="locale" value={locale} />

      <AuthInput
        id="forgot-email"
        name="email"
        type="email"
        label={t("common.email")}
        placeholder={t("common.emailPlaceholder")}
        autoComplete="email"
        icon={Mail}
        required
      />

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-xl bg-color px-5 text-sm font-semibold text-white! shadow-xl shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t("forgotPassword.submit")}
      </button>

      <Link
        href={localePath(locale, "/login")}
        className="mx-auto inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft
          className={`size-4 ${isRtl ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
        {t("forgotPassword.backToLogin")}
      </Link>
    </form>
  );
}
