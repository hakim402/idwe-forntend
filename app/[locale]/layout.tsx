// app/[locale]/layout.tsx

import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ReactNode } from "react";
import { LocaleSync } from "./_components/Language/LocaleSync";
import { Metadata } from "next";
import Script from "next/script";

// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

// ─────────────────────────────────────────────────────────────────────────────

const descriptions: Record<string, string> = {
  en: "Infinity Solutions delivers enterprise-grade AI solutions, AI bots, business development, software development, web and app development, Claude AI integrations, API integrations, database architecture, cybersecurity services, security compliance, and scalable digital transformation services.",
  zh: "Infinity Solutions 提供企业级 AI 解决方案、AI 机器人、业务开发、软件开发、网站与应用开发、Claude AI 集成、API 集成、数据库架构、网络安全服务、安全合规及数字化转型服务。",
  ar: "تقدم Infinity Solutions حلول ذكاء اصطناعي متقدمة، وروبوتات ذكاء اصطناعي، وتطوير الأعمال، وتطوير البرمجيات، وتطوير الويب والتطبيقات، وحلول Claude AI، ودمج API، وهندسة قواعد البيانات، وخدمات الأمن السيبراني، والامتثال الأمني، وخدمات التحول الرقمي القابلة للتوسع.",
  fa: "Infinity Solutions راهکارهای پیشرفته هوش مصنوعی، ربات‌های هوشمند، توسعه کسب‌وکار، توسعه نرم‌افزار، طراحی وب و اپلیکیشن، ادغام Claude AI، یکپارچه‌سازی API، معماری پایگاه داده، خدمات امنیت سایبری، انطباق امنیتی و خدمات تحول دیجیتال ارائه می‌دهد.",
  ps: "Infinity Solutions د تصدۍ کچې AI حل لارې، AI بوټونه، د سوداګرۍ پراختیا، سافټویر پراختیا، ویب او اپلیکیشن جوړونه، Claude AI ادغام، API ادغام، د ډیټابېس جوړښت، سایبري امنیت خدمتونه، امنیتي مطابقت، او د ډیجیټل بدلون پرمختللي خدمتونه وړاندې کوي.",
};

const titles: Record<string, string> = {
  en: "Infinity Solutions - Enterprise Technology Services",
  zh: "Infinity Solutions - 企业级技术服务",
  ar: "إنفينيتي سولوشنز - خدمات تقنية على مستوى المؤسسات",
  fa: "Infinity Solutions - خدمات فناوری در سطح سازمانی",
  ps: "Infinity Solutions - د تصدۍ کچې ټکنالوژۍ خدمتونه",
};

const localeMap: Record<string, string> = {
  en: "en_US",
  zh: "zh_CN",
  ar: "ar_SA",
  fa: "fa_IR",
  ps: "ps_AF",
};

const RTL_LOCALES = ["ar", "fa", "ps"] as const;

const BASE_URL = "https://jahez.online";

// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:       titles[locale],
    description: descriptions[locale],

    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        zh: `${BASE_URL}/zh`,
        ar: `${BASE_URL}/ar`,
        fa: `${BASE_URL}/fa`,
        ps: `${BASE_URL}/ps`,
      },
    },

    openGraph: {
      title:       titles[locale],
      description: descriptions[locale],
      url:         `${BASE_URL}/${locale}`,
      siteName:    "Infinity Solutions",
      locale:      localeMap[locale],
      type:        "website",
    },

    twitter: {
      card:        "summary_large_image",
      title:       titles[locale],
      description: descriptions[locale],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const isRtl = RTL_LOCALES.includes(locale as (typeof RTL_LOCALES)[number]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type":    "Organization",
    name:        "Infinity Solutions",
    url:         `${BASE_URL}/${locale}`,
    description: descriptions[locale],
    services: [
      "Artificial Intelligence",
      "AI Bots",
      "Business Development",
      "Software Development",
      "Web Development",
      "Mobile App Development",
      "Claude AI Solutions",
      "API Integration",
      "Database Architecture",
      "Cybersecurity Services",
      "Security Compliance",
      "Digital Transformation",
    ],
  };

  return (
    <>
      {/*
       * Syncs <html lang="…" dir="…"> on every locale change
       * and persists the choice to localStorage.
       * Replaces the old SetHtmlLangDir + UserLocaleSync pair.
       */}
      <LocaleSync />

      {/*
       * SSR-safe JSON-LD — rendered as a plain <script> in <head>
       * via next/script so React never touches it on the client.
       */}
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
       * dir prop here gives the correct reading direction to the
       * server-rendered HTML before LocaleSync hydrates on the client,
       * preventing a brief flash of wrong-direction layout.
       */}
      <NextIntlClientProvider messages={messages}>
        <div dir={isRtl ? "rtl" : "ltr"}>
          {children}
        </div>
      </NextIntlClientProvider>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}