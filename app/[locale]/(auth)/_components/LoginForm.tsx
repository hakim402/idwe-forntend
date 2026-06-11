"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LockKeyhole, Mail } from "lucide-react";
import { AuthInput, PasswordInput } from "./AuthFields";
import {
  AUTH_ENDPOINTS,
  getSupportedLocale,
  localePath,
} from "./auth-config";

export default function LoginForm() {
  const locale = getSupportedLocale(useLocale());
  const t = useTranslations("Auth");

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

      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="inline-flex cursor-pointer items-center gap-2 text-muted-foreground">
          <input
            type="checkbox"
            name="remember"
            className="size-4 rounded border-input accent-primary"
          />
          <span>{t("login.remember")}</span>
        </label>

        <Link
          href={localePath(locale, "/forgot-password")}
          className="font-medium text-primary transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("login.forgot")}
        </Link>
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex h-12 items-center justify-center rounded-xl bg-color px-5 text-sm font-semibold text-white! shadow-xl shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t("login.submit")}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        {t("login.noAccount")}{" "}
        <Link
          href={localePath(locale, "/signup")}
          className="font-semibold text-primary transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("login.signupLink")}
        </Link>
      </p>
    </form>
  );
}
