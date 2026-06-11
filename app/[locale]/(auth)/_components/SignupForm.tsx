"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Building2, LockKeyhole, Mail, UserRound } from "lucide-react";
import { AuthInput, PasswordInput } from "./AuthFields";
import {
  AUTH_ENDPOINTS,
  getSupportedLocale,
  localePath,
} from "./auth-config";

export default function SignupForm() {
  const locale = getSupportedLocale(useLocale());
  const t = useTranslations("Auth");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const passwordsDoNotMatch =
    confirmation.length > 0 && password !== confirmation;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (password !== confirmation) {
      event.preventDefault();
    }
  }

  return (
    <form
      action={AUTH_ENDPOINTS.signup}
      method="post"
      onSubmit={handleSubmit}
      className="grid gap-5"
    >
      <input type="hidden" name="locale" value={locale} />

      <AuthInput
        id="signup-name"
        name="name"
        type="text"
        label={t("common.fullName")}
        placeholder={t("common.fullNamePlaceholder")}
        autoComplete="name"
        icon={UserRound}
        required
      />

      <AuthInput
        id="signup-company"
        name="company"
        type="text"
        label={t("common.company")}
        placeholder={t("common.companyPlaceholder")}
        autoComplete="organization"
        icon={Building2}
      />

      <AuthInput
        id="signup-email"
        name="email"
        type="email"
        label={t("common.email")}
        placeholder={t("common.emailPlaceholder")}
        autoComplete="email"
        icon={Mail}
        required
      />

      <PasswordInput
        id="signup-password"
        name="password"
        label={t("common.password")}
        placeholder={t("common.passwordPlaceholder")}
        autoComplete="new-password"
        minLength={8}
        icon={LockKeyhole}
        showLabel={t("common.showPassword")}
        hideLabel={t("common.hidePassword")}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <PasswordInput
        id="signup-confirm-password"
        name="confirmPassword"
        label={t("common.confirmPassword")}
        placeholder={t("common.confirmPasswordPlaceholder")}
        autoComplete="new-password"
        minLength={8}
        icon={LockKeyhole}
        showLabel={t("common.showPassword")}
        hideLabel={t("common.hidePassword")}
        value={confirmation}
        onChange={(event) => setConfirmation(event.target.value)}
        error={passwordsDoNotMatch ? t("signup.passwordMismatch") : undefined}
        required
      />

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-muted-foreground">
        <input
          type="checkbox"
          name="acceptedTerms"
          className="mt-1 size-4 shrink-0 rounded border-input accent-primary"
          required
        />
        <span>
          {t("signup.termsPrefix")}{" "}
          <Link
            href={localePath(locale, "/terms")}
            className="font-medium text-primary hover:underline"
          >
            {t("signup.terms")}
          </Link>{" "}
          {t("signup.and")}{" "}
          <Link
            href={localePath(locale, "/privacy")}
            className="font-medium text-primary hover:underline"
          >
            {t("signup.privacy")}
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-xl bg-color px-5 text-sm font-semibold text-white! shadow-xl shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t("signup.submit")}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        {t("signup.haveAccount")}{" "}
        <Link
          href={localePath(locale, "/login")}
          className="font-semibold text-primary transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("signup.loginLink")}
        </Link>
      </p>
    </form>
  );
}
