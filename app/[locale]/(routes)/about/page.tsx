// app/[locale]/about/page.tsx
//
// Server component — resolves locale, detects RTL, injects metadata.
// Zero client-side logic here; everything visual is in AboutPageClient.

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutPageClient from "./_components/AboutPageClient";

const RTL_LOCALES = new Set(["ar", "fa", "ps"]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRtl = RTL_LOCALES.has(locale);

  return <AboutPageClient isRtl={isRtl} locale={locale} />;
}