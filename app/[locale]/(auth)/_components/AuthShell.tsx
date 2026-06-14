"use client";

// app/[locale]/(auth)/_components/AuthShell.tsx

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  Bot,
  Code2,
  LockKeyhole,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  getSupportedLocale,
  isRtlLocale,
  localePath,
  type AuthMode,
} from "./auth-config";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ShowcasePoint = {
  title: string;
  description: string;
};

type AuthShellProps = {
  mode: AuthMode;
  children: ReactNode;
};

// ─────────────────────────────────────────────────────────────────────────────
// Per-mode copy keys
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_COPY = {
  "login": {
    title:       "login.title",
    description: "login.description",
  },
  "signup": {
    title:       "signup.title",
    description: "signup.description",
  },
  "forgot-password": {
    title:       "forgotPassword.title",
    description: "forgotPassword.description",
  },
  "verify-otp": {
    title:       "verifyOtp.title",
    description: "verifyOtp.description",
  },
} as const;

// Icons mapped to each showcase point by index
const POINT_ICONS = [Bot, Code2, ShieldCheck] as const;

// ─────────────────────────────────────────────────────────────────────────────
// IDWE logo mark — text-based, no image dependency
// ─────────────────────────────────────────────────────────────────────────────

function IdweLogo({ className }: { className?: string }) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-2xl bg-white/15 backdrop-blur",
        "size-10 text-base font-black tracking-tight text-white select-none",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      ID
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar panel
// ─────────────────────────────────────────────────────────────────────────────

function AuthSidebar({
  locale,
  isRtl,
  t,
}: {
  locale: string;
  isRtl: boolean;
  t: ReturnType<typeof useTranslations<"Auth">>;
}) {
  const points = t.raw("showcase.points") as ShowcasePoint[];

  return (
    <aside
      dir={isRtl ? "rtl" : "ltr"}
      className="relative hidden overflow-hidden lg:flex lg:min-h-[740px] lg:flex-col"
      style={{
        background:
          "linear-gradient(148deg, #0ab8fb 0%, #245ea9 45%, #324b9d 100%)",
      }}
    >
      {/* ── Decorative elements ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 size-80 rounded-full bg-white/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 size-48 rounded-full bg-white/5 blur-2xl"
      />
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/6%)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/6%)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black_30%,transparent)]"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex h-full flex-col p-10">
        {/* Brand */}
        <Link
          href={localePath(locale as any, "/")}
          className="inline-flex w-fit items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <IdweLogo />
          <span className="text-lg font-bold tracking-tight text-white">
            {t("common.brand")}
          </span>
        </Link>

        {/* Main copy */}
        <div className="my-auto py-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
            {t("showcase.eyebrow")}
          </p>

          <h2 className="mt-5 max-w-xs text-[2rem] font-bold leading-tight tracking-[-0.03em] text-white">
            {t("showcase.title")}
          </h2>

          <p className="mt-4 max-w-xs text-sm leading-7 text-white/72">
            {t("showcase.description")}
          </p>

          {/* Feature cards */}
          <div className="mt-8 grid gap-3">
            {points.map((point, index) => {
              const Icon = POINT_ICONS[index] ?? Zap;

              return (
                <div
                  key={point.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm transition-colors hover:bg-white/12"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Icon className="size-4 text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-white/65">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust note */}
        <div className="flex items-center gap-2 text-xs text-white/55">
          <LockKeyhole className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{t("common.secureNote")}</span>
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main shell
// ─────────────────────────────────────────────────────────────────────────────

export default function AuthShell({ mode, children }: AuthShellProps) {
  const locale = getSupportedLocale(useLocale());
  const isRtl  = isRtlLocale(locale);
  const t      = useTranslations("Auth");
  const copy   = PAGE_COPY[mode];

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="relative isolate min-h-svh overflow-hidden bg-background text-foreground"
    >
      {/* Page-level background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_55%_45%_at_15%_10%,rgb(10_184_251/10%),transparent_50%),radial-gradient(ellipse_50%_40%_at_85%_85%,rgb(50_75_157/10%),transparent_50%)] dark:bg-[radial-gradient(ellipse_55%_45%_at_15%_10%,rgb(10_184_251/12%),transparent_50%),radial-gradient(ellipse_50%_40%_at_85%_85%,rgb(50_75_157/12%),transparent_50%)]"
      />

      <div className="flex min-h-svh items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl shadow-primary/8 lg:grid lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* ── Left panel — sidebar ── */}
          <AuthSidebar locale={locale} isRtl={isRtl} t={t} />

          {/* ── Right panel — form ── */}
          <div className="flex min-h-[640px] flex-col p-6 sm:p-8 lg:p-10">
            {/* Top nav */}
            <div className="flex items-center justify-between gap-4">
              <Link
                href={localePath(locale, "/")}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
              >
                <ArrowLeft
                  className={`size-4 ${isRtl ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
                {t("common.backHome")}
              </Link>

              {/* Mobile brand — only visible when sidebar is hidden */}
              <Link
                href={localePath(locale, "/")}
                className="inline-flex items-center gap-2 font-bold tracking-tight text-foreground lg:hidden"
              >
                <span className="flex size-8 items-center justify-center rounded-xl bg-color text-[11px] font-black text-white">
                  ID
                </span>
                <span className="text-sm">{t("common.brandShort")}</span>
              </Link>
            </div>

            {/* Form area */}
            <div className="mx-auto my-auto w-full max-w-sm py-10">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Step label */}
                <div className="mb-6 flex items-center gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    <Zap className="size-3" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {t("common.welcome")}
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {t(copy.title as Parameters<typeof t>[0])}
                </h1>

                <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
                  {t(copy.description as Parameters<typeof t>[0])}
                </p>

                <div className="mt-8">{children}</div>
              </motion.div>
            </div>

            {/* Footer note */}
            <p className="text-center text-[11px] leading-5 text-muted-foreground/60">
              {t("common.footer")}
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}