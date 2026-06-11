"use client";

import {
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import {
  AUTH_ENDPOINTS,
  getSupportedLocale,
  isRtlLocale,
  localePath,
} from "./auth-config";

const OTP_LENGTH = 6;

export default function VerifyOtpForm() {
  const locale = getSupportedLocale(useLocale());
  const isRtl = isRtlLocale(locale);
  const t = useTranslations("Auth");
  const [digits, setDigits] = useState<string[]>(
    Array.from({ length: OTP_LENGTH }, () => ""),
  );
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  function updateDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    setDigits(nextDigits);

    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    if (!pastedDigits.length) {
      return;
    }

    const nextDigits = Array.from(
      { length: OTP_LENGTH },
      (_, index) => pastedDigits[index] ?? "",
    );
    setDigits(nextDigits);
    inputs.current[Math.min(pastedDigits.length, OTP_LENGTH) - 1]?.focus();
  }

  return (
    <form
      action={AUTH_ENDPOINTS.verifyOtp}
      method="post"
      className="grid gap-6"
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="code" value={digits.join("")} />

      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium text-foreground">
          {t("verifyOtp.codeLabel")}
        </legend>
        <div
          dir="ltr"
          onPaste={handlePaste}
          className="grid grid-cols-6 gap-2 sm:gap-3"
        >
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              onChange={(event) => updateDigit(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              aria-label={`${t("verifyOtp.digitLabel")} ${index + 1}`}
              className="aspect-square min-w-0 rounded-xl border border-input bg-background text-center text-xl font-semibold text-foreground shadow-sm outline-none transition hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
              required
            />
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-xl bg-color px-5 text-sm font-semibold text-white! shadow-xl shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t("verifyOtp.submit")}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        {t("verifyOtp.resendText")}{" "}
        <Link
          href={localePath(locale, "/forgot-password")}
          className="font-semibold text-primary transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("verifyOtp.resendAction")}
        </Link>
      </p>

      <Link
        href={localePath(locale, "/login")}
        className="mx-auto inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft
          className={`size-4 ${isRtl ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
        {t("verifyOtp.backToLogin")}
      </Link>
    </form>
  );
}
