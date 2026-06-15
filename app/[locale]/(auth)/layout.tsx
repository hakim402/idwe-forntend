/**
 * (auth)/layout.tsx — Shared layout for all authentication pages
 *
 * Two-column split:
 *   Left  (hidden on mobile) → AuthShowcase: brand story + feature list
 *   Right                    → Form content (children)
 *
 * RTL: the dir attribute + globals.css handle font routing and gradient
 * direction automatically. No manual overrides needed in children.
 */

import { getLocale } from "next-intl/server";
import { AuthShowcase } from "./_components/AuthShowcase";

// ─────────────────────────────────────────────────────────────────────────────

const RTL_LOCALES = ["ar", "fa", "ps"];

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const isRtl = RTL_LOCALES.includes(locale);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen w-full bg-background flex"
    >
      {/*
       * ── Left panel ────────────────────────────────────────────────────────
       * Branded showcase — visible only on lg and above.
       * On RTL the flex row direction reverses via CSS so the showcase
       * naturally sits on the visual "start" side.
       */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative">
        <AuthShowcase locale={locale} />
      </div>

      {/*
       * ── Right panel ───────────────────────────────────────────────────────
       * Full-width on mobile, form column on desktop.
       * Each auth page provides its own form via {children}.
       */}
      <main
        className="flex-1 flex flex-col items-center justify-center
                   min-h-screen px-5 py-12 sm:px-8 lg:px-12 xl:px-16
                   bg-background relative overflow-hidden"
      >
        {/* Subtle ambient glow — matches brand palette, invisible in light mode */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10
                     bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgb(10_184_251/6%),transparent)]
                     dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgb(10_184_251/5%),transparent)]"
        />

        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}