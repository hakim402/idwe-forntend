"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  Bot,
  Check,
  Code2,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import {
  getSupportedLocale,
  isRtlLocale,
  localePath,
  type AuthMode,
} from "./auth-config";

type ShowcasePoint = {
  title: string;
  description: string;
};

type AuthShellProps = {
  mode: AuthMode;
  children: ReactNode;
};

const PAGE_COPY = {
  login: {
    title: "login.title",
    description: "login.description",
  },
  signup: {
    title: "signup.title",
    description: "signup.description",
  },
  "forgot-password": {
    title: "forgotPassword.title",
    description: "forgotPassword.description",
  },
  "verify-otp": {
    title: "verifyOtp.title",
    description: "verifyOtp.description",
  },
} as const;

const pointIcons = [Bot, Code2, LockKeyhole];

export default function AuthShell({ mode, children }: AuthShellProps) {
  const locale = getSupportedLocale(useLocale());
  const isRtl = isRtlLocale(locale);
  const t = useTranslations("Auth");
  const copy = PAGE_COPY[mode];
  const points = t.raw("showcase.points") as ShowcasePoint[];

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="relative isolate min-h-svh overflow-hidden bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_14%,rgb(10_184_251_/_16%),transparent_28%),radial-gradient(circle_at_82%_82%,rgb(50_75_157_/_14%),transparent_30%)] dark:bg-[radial-gradient(circle_at_16%_14%,rgb(10_184_251_/_18%),transparent_30%),radial-gradient(circle_at_82%_82%,rgb(50_75_157_/_18%),transparent_32%)]"
      />

      <div className="mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-6xl items-center">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="grid w-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10 lg:grid-cols-[0.88fr_1.12fr]"
        >
          <aside className="relative hidden overflow-hidden bg-[linear-gradient(145deg,#0ab8fb_0%,#245ea9_48%,#324b9d_100%)] p-10 text-white lg:flex lg:min-h-[720px] lg:flex-col">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 size-80 rounded-full border border-white/20"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-24 size-96 rounded-full bg-white/10 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255_/_8%)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_8%)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
            />

            <Link
              href={localePath(locale, "/")}
              className="relative z-10 inline-flex w-fit items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="flex size-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                {t("common.brand")}
              </span>
            </Link>

            <div className="relative z-10 my-auto py-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                {t("showcase.eyebrow")}
              </p>
              <h2 className="mt-5 max-w-md text-4xl font-semibold tracking-[-0.04em]">
                {t("showcase.title")}
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/75">
                {t("showcase.description")}
              </p>

              <div className="mt-9 grid gap-3">
                {points.map((point, index) => {
                  const Icon = pointIcons[index] ?? Check;

                  return (
                    <div
                      key={point.title}
                      className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold">{point.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-white/70">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-2 text-sm text-white/70">
              <LockKeyhole className="size-4" aria-hidden="true" />
              <span>{t("common.secureNote")}</span>
            </div>
          </aside>

          <div className="flex min-h-[680px] flex-col p-6 sm:p-10 lg:p-12">
            <div className="flex items-center justify-between gap-4">
              <Link
                href={localePath(locale, "/")}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowLeft
                  className={`size-4 ${isRtl ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
                {t("common.backHome")}
              </Link>

              <Link
                href={localePath(locale, "/")}
                className="inline-flex items-center gap-2 font-semibold tracking-tight text-foreground lg:hidden"
              >
                <span className="flex size-8 items-center justify-center rounded-xl bg-color text-white!">
                  <Sparkles className="size-4" aria-hidden="true" />
                </span>
                {t("common.brandShort")}
              </Link>
            </div>

            <div className="mx-auto my-auto w-full max-w-md py-12">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: isRtl ? -14 : 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm font-semibold text-primary">
                  {t("common.welcome")}
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
                  {t(copy.title)}
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  {t(copy.description)}
                </p>

                <div className="mt-8">{children}</div>
              </motion.div>
            </div>

            <p className="text-center text-xs leading-5 text-muted-foreground">
              {t("common.footer")}
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
