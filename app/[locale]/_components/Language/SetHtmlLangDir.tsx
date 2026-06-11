// app/[locale]/_components/Language/SetHtmlLangDir.tsx

"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

export function SetHtmlLangDir() {
  const locale = useLocale();

  useEffect(() => {
    // Set language
    document.documentElement.lang = locale;

    // RTL languages (Arabic, Persian, Pashto)
    const rtlLocales = ["ar", "fa", "ps"];

    document.documentElement.dir = rtlLocales.includes(locale)
      ? "rtl"
      : "ltr";
  }, [locale]);

  return null;
}