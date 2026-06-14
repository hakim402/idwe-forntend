"use client";

// app/[locale]/(auth)/_components/SignupForm.tsx

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Building2, LockKeyhole, Mail, UserRound } from "lucide-react";
import { AuthInput, PasswordInput } from "./AuthFields";
import { AUTH_ENDPOINTS, getSupportedLocale, localePath } from "./auth-config";

export default function SignupForm() {
  const locale   = getSupportedLocale(useLocale());
  const t        = useTranslations("Auth");
  const [password,     setPassword]     = useState("");
  const [confirmation, setConfirmation] = useState("");

  const mismatch = confirmation.length > 0 && password !== confirmation;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (password !== confirmation) e.preventDefault();
  }

  return (
    <form
      action={AUTH_ENDPOINTS.signup}
      method="post"
      onSubmit={handleSubmit}
      className="grid gap-4"
    >
      <input type="hidden" name="locale" value={locale} />

      {/* Name + Company — side by side on wider viewports */}
      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

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
        hint={t("signup.passwordHint")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
        onChange={(e) => setConfirmation(e.target.value)}
        error={mismatch ? t("signup.passwordMismatch") : undefined}
        required
      />

      {/* Terms */}
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-muted-foreground select-none">
        <input
          type="checkbox"
          name="acceptedTerms"
          className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary"
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

      {/* Submit */}
      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-color text-sm font-semibold text-white shadow-brand transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t("signup.submit")}
      </button>

      {/* Switch to login */}
      <p className="text-center text-sm text-muted-foreground">
        {t("signup.haveAccount")}{" "}
        <Link
          href={localePath(locale, "/sign-in")}
          className="font-semibold text-primary transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          {t("signup.loginLink")}
        </Link>
      </p>
    </form>
  );
}