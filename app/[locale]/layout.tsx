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

// Descriptions for all 10 locales
const descriptions: Record<string, string> = {
  en: "IDWE delivers enterprise-grade AI solutions, AI bots, business development, software development, web and app development, Claude AI integrations, API integrations, database architecture, cybersecurity services, security compliance, and scalable digital transformation services.",
  es: "IDWE ofrece soluciones de IA de nivel empresarial, bots de IA, desarrollo de negocios, desarrollo de software, desarrollo web y de aplicaciones, integraciones con Claude AI, integraciones de API, arquitectura de bases de datos, servicios de ciberseguridad, cumplimiento de seguridad y servicios escalables de transformación digital.",
  de: "IDWE bietet Unternehmens-KI-Lösungen, KI-Bots, Geschäftsentwicklung, Softwareentwicklung, Web- und App-Entwicklung, Claude AI-Integrationen, API-Integrationen, Datenbankarchitektur, Cybersicherheitsdienste, Sicherheitskonformität und skalierbare digitale Transformationsdienste.",
  fr: "IDWE fournit des solutions d'IA de niveau entreprise, des bots IA, du développement commercial, du développement logiciel, du développement web et d'applications, des intégrations Claude AI, des intégrations API, de l'architecture de bases de données, des services de cybersécurité, de la conformité sécurité et des services de transformation digitale évolutifs.",
  it: "IDWE fornisce soluzioni AI di livello enterprise, bot AI, sviluppo aziendale, sviluppo software, sviluppo web e di app, integrazioni Claude AI, integrazioni API, architettura di database, servizi di cybersecurity, conformità alla sicurezza e servizi di trasformazione digitale scalabili.",
  nl: "IDWE levert AI-oplossingen op ondernemingsniveau, AI-bots, bedrijfsontwikkeling, softwareontwikkeling, web- en app-ontwikkeling, Claude AI-integraties, API-integraties, database-architectuur, cybersecuritydiensten, beveiligingsnaleving en schaalbare diensten voor digitale transformatie.",
  zh: "IDWE 提供企业级 AI 解决方案、AI 机器人、业务开发、软件开发、网站与应用开发、Claude AI 集成、API 集成、数据库架构、网络安全服务、安全合规及数字化转型服务。",
  ar: "تقدم IDWE حلول ذكاء اصطناعي متقدمة، وروبوتات ذكاء اصطناعي، وتطوير الأعمال، وتطوير البرمجيات، وتطوير الويب والتطبيقات، وحلول Claude AI، ودمج API، وهندسة قواعد البيانات، وخدمات الأمن السيبراني، والامتثال الأمني، وخدمات التحول الرقمي القابلة للتوسع.",
  fa: "IDWE راهکارهای پیشرفته هوش مصنوعی، ربات‌های هوشمند، توسعه کسب‌وکار، توسعه نرم‌افزار، طراحی وب و اپلیکیشن، ادغام Claude AI، یکپارچه‌سازی API، معماری پایگاه داده، خدمات امنیت سایبری، انطباق امنیتی و خدمات تحول دیجیتال ارائه می‌دهد.",
  ps: "IDWE د تصدۍ کچې AI حل لارې، AI بوټونه، د سوداګرۍ پراختیا، سافټویر پراختیا، ویب او اپلیکیشن جوړونه، Claude AI ادغام، API ادغام، د ډیټابېس جوړښت، سایبري امنیت خدمتونه، امنیتي مطابقت، او د ډیجیټل بدلون پرمختللي خدمتونه وړاندې کوي.",
};

// Titles for all 10 locales
const titles: Record<string, string> = {
  en: "IDWE - Enterprise Technology Services",
  es: "IDWE - Servicios de Tecnología Empresarial",
  de: "IDWE - Unternehmens-Technologie-Dienstleistungen",
  fr: "IDWE - Services Technologiques d'Entreprise",
  it: "IDWE - Servizi Tecnologici per Imprese",
  nl: "IDWE - Zakelijke Technologiediensten",
  zh: "IDWE - 企业技术服务",
  ar: "IDWE - خدمات تقنية على مستوى المؤسسات",
  fa: "IDWE - خدمات فناوری در سطح سازمانی",
  ps: "IDWE - د تصدۍ کچې ټکنالوژۍ خدمتونه",
};

// Locale codes for OpenGraph (ISO 639-1 + country)
const localeMap: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
  nl: "nl_NL",
  zh: "zh_CN",
  ar: "ar_SA",
  fa: "fa_IR",
  ps: "ps_AF",
};

// RTL languages (no change)
const RTL_LOCALES = ["ar", "fa", "ps"] as const;

const BASE_URL = "https://idwe.tech";

// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Build alternate languages object dynamically from routing.locales
  const alternateLanguages: Record<string, string> = {};
  for (const l of routing.locales) {
    alternateLanguages[l] = `${BASE_URL}/${l}`;
  }

  return {
    title: titles[locale],
    description: descriptions[locale],

    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: alternateLanguages,
    },

    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}`,
      siteName: "IDWE",
      locale: localeMap[locale],
      type: "website",
      images: [
        {
          url: `${BASE_URL}/logo/idwe.png`,
          width: 1200,
          height: 630,
          alt: "IDWE Logo",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: [`${BASE_URL}/logo/idwe.png`],
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
    "@type": "Organization",
    name: "IDWE",
    url: `${BASE_URL}/${locale}`,
    logo: `${BASE_URL}/logo/idwe.png`,
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
          <LocaleSync locale={locale} />

      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <NextIntlClientProvider messages={messages}>
        <div dir={isRtl ? "rtl" : "ltr"}>{children}</div>
      </NextIntlClientProvider>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}