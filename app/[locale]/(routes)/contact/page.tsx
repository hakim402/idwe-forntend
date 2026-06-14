// app/[locale]/contact/page.tsx

import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Header } from "../../_components/Header/Header";
import { FooterSection } from "../../_components/Footer/FooterSections";
import ContactPageClient from "./_components/ContactPageClient";
import OrbitalSystem from "../../_components/HomeHero/OrbitalSystem";

// ─────────────────────────────────────────────────────────────────────────────
// SEO Metadata
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Contact");

  return {
    title:       t("meta.title"),
    description: t("meta.description"),
    keywords:    t("meta.keywords"),
    alternates: {
      canonical: "https://idwe.tech/contact",
    },
    openGraph: {
      title:       t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url:         "https://idwe.tech/contact",
      siteName:    "IDWE",
      type:        "website",
      images: [
        {
          url:    "https://idwe.tech/og/contact.png",
          width:  1200,
          height: 630,
          alt:    t("meta.ogImageAlt"),
        },
      ],
    },
    twitter: {
      card:        "summary_large_image",
      title:       t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      images:      ["https://idwe.tech/og/contact.png"],
    },
    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:               true,
        follow:              true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet":       -1,
      },
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD structured data
// ─────────────────────────────────────────────────────────────────────────────

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":       "Organization",
        "@id":         "https://idwe.tech/#organization",
        name:          "IDWE",
        url:           "https://idwe.tech",
        logo:          "https://idwe.tech/logo/icon.png",
        description:
          "Enterprise AI automation, custom software, and digital transformation solutions.",
        contactPoint: [
          {
            "@type":       "ContactPoint",
            telephone:     "+93-776-320-765",
            contactType:   "customer service",
            areaServed:    "AF",
            availableLanguage: ["English", "Dari", "Pashto"],
          },
          {
            "@type":       "ContactPoint",
            telephone:     "+1-206-470-9284",
            contactType:   "customer service",
            areaServed:    "US",
            availableLanguage: ["English"],
          },
        ],
        email:  "info@idwe.tech",
        sameAs: [
          "https://linkedin.com/company/idwe",
          "https://instagram.com/idwe.tech",
        ],
      },
      {
        "@type":         "WebPage",
        "@id":           "https://idwe.tech/contact#webpage",
        url:             "https://idwe.tech/contact",
        name:            "Contact IDWE — AI & Enterprise Software",
        isPartOf:        { "@id": "https://idwe.tech/#website" },
        about:           { "@id": "https://idwe.tech/#organization" },
        description:
          "Get in touch with the IDWE team to discuss AI automation, custom software, and digital transformation for your business.",
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RTL helper
// ─────────────────────────────────────────────────────────────────────────────

const RTL_LOCALES = new Set(["ar", "fa", "ps"]);

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default async function ContactPage() {
  const locale = await getLocale();
  const isRtl  = RTL_LOCALES.has(locale);

  return (
    <>
      <JsonLd />

      <main
        dir={isRtl ? "rtl" : "ltr"}
        className="relative isolate min-h-screen overflow-x-hidden bg-background text-foreground"
      >
        {/* ── Page background ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgb(10_184_251/10%),transparent)] dark:bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgb(10_184_251/7%),transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(148_198_233/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_198_233/0.05)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)"
        />
        <Header />

        <ContactPageClient isRtl={isRtl} />
           {/* Optional: decorative orbital after the main content */}
        <div className="relative mt-16 mb-20 w-full overflow-hidden py-10">
          <div className="flex justify-center opacity-60">
            <OrbitalSystem />
          </div>
        </div>
        
        <FooterSection />
      </main>
    </>
  );
}