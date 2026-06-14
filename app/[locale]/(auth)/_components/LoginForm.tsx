"use client";

// app/[locale]/(auth)/_components/LoginForm.tsx

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LockKeyhole, Mail } from "lucide-react";
import { AuthInput, PasswordInput } from "./AuthFields";
import { AUTH_ENDPOINTS, getSupportedLocale, localePath } from "./auth-config";

export default function LoginForm() {
  const locale = getSupportedLocale(useLocale());
  const t      = useTranslations("Auth");

  return (
    <form
      action={AUTH_ENDPOINTS.login}
      method="post"
      className="grid gap-5"
    >
      <input type="hidden" name="locale" value={locale} />

      <AuthInput
        id="login-email"
        name="email"
        type="email"
        label={t("common.email")}
        placeholder={t("common.emailPlaceholder")}
        autoComplete="email"
        icon={Mail}
        required
      />

      <PasswordInput
        id="login-password"
        name="password"
        label={t("common.password")}
        placeholder={t("common.passwordPlaceholder")}
        autoComplete="current-password"
        icon={LockKeyhole}
        showLabel={t("common.showPassword")}
        hideLabel={t("common.hidePassword")}
        required
      />

      {/* Remember + forgot */}
      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="inline-flex cursor-pointer items-center gap-2 text-muted-foreground select-none">
          <input
            type="checkbox"
            name="remember"
            className="size-4 rounded border-input accent-primary"
          />
          {t("login.remember")}
        </label>

        <Link
          href={localePath(locale, "/forgot-password")}
          className="text-sm font-medium text-primary transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          {t("login.forgot")}
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-xl bg-color text-sm font-semibold text-white shadow-brand transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t("login.submit")}
      </button>

      {/* Switch to sign-up */}
      <p className="text-center text-sm text-muted-foreground">
        {t("login.noAccount")}{" "}
        <Link
          href={localePath(locale, "/sign-up")}
          className="font-semibold text-primary transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          {t("login.signupLink")}
        </Link>
      </p>
    </form>
  );
}