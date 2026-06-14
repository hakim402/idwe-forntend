"use client";

// app/[locale]/(auth)/_components/ForgotPasswordForm.tsx

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
  const isRtl  = isRtlLocale(locale);
  const t      = useTranslations("Auth");

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
        hint={t("forgotPassword.emailHint")}
        required
      />

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-color text-sm font-semibold text-white shadow-brand transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t("forgotPassword.submit")}
      </button>

      <Link
        href={localePath(locale, "/sign-in")}
        className="mx-auto inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
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