// app/[locale]/page.tsx
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Header } from "./_components/Header/Header";
import { FooterSection } from "./_components/Footer/FooterSections";
import HomeHero from "./_components/HomeHero/HomeHero";
import { AiShowcase } from "./_components/AiShowcase/AiShowcase";

type Props = {
  params: Promise<{ locale: string }>;
};

// ─────────────────────────────────────────────
// MULTI-LANGUAGE CONTENT MAP
// ─────────────────────────────────────────────
const content = {
  en: {
    title: "Infinity Solutions - Enterprise AI & Technology Services",
    description:
      "Infinity Solutions delivers AI solutions, software development, web & mobile apps, cybersecurity, API integrations, and scalable enterprise technology services.",
    servicesHeading: "Our Services",
    servicesSub:
      "We deliver AI solutions, software engineering, cybersecurity, API integrations, and enterprise-grade digital transformation services.",
  },
  ar: {
    title: "إنفينيتي سولوشنز - حلول ذكاء اصطناعي وتقنيات للمؤسسات",
    description:
      "نقدم حلول الذكاء الاصطناعي، تطوير البرمجيات، التطبيقات، الأمن السيبراني، تكامل API، وخدمات التحول الرقمي للشركات.",
    servicesHeading: "خدماتنا",
    servicesSub:
      "نقدم حلول ذكاء اصطناعي وتطوير برمجيات وأمن سيبراني وتكامل أنظمة للشركات.",
  },
  fa: {
    title: "اینفینیتی سولوشنز - خدمات هوش مصنوعی و فناوری سازمانی",
    description:
      "ارائه راهکارهای هوش مصنوعی، توسعه نرم‌افزار، اپلیکیشن، امنیت سایبری، و خدمات تحول دیجیتال برای کسب‌وکارها.",
    servicesHeading: "خدمات ما",
    servicesSub:
      "ما راهکارهای هوش مصنوعی، توسعه نرم‌افزار و امنیت سایبری برای کسب‌وکارها ارائه می‌دهیم.",
  },
  ps: {
    title: "Infinity Solutions - د AI او ټکنالوژۍ حل لارې",
    description:
      "موږ د AI حل لارې، سافټویر جوړونه، اپلیکیشنونه، سایبري امنیت او د ډیجیټل بدلون خدمات وړاندې کوو.",
    servicesHeading: "زموږ خدمات",
    servicesSub:
      "موږ د AI، سافټویر جوړونې او امنیتي حل لارې وړاندې کوو.",
  },
  zh: {
    title: "Infinity Solutions - 企业级AI与技术服务",
    description:
      "提供人工智能解决方案、软件开发、网站与应用开发、网络安全、API集成及企业数字化转型服务。",
    servicesHeading: "我们的服务",
    servicesSub:
      "我们提供AI、软件工程、网络安全与企业数字化解决方案。",
  },
} as const;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://infinity-solutions.pro";

  const t = content[locale as keyof typeof content] ?? content.en;

  const ogImage = {
    url: `${baseUrl}/images/home-og.jpg`,
    width: 1200,
    height: 630,
    alt: t.title,
  };

  return {
    title: t.title,
    description: t.description,

    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        fa: `${baseUrl}/fa`,
        ps: `${baseUrl}/ps`,
        zh: `${baseUrl}/zh`,
      },
    },

    openGraph: {
      title: t.title,
      description: t.description,
      url: `${baseUrl}/${locale}`,
      siteName: "Infinity Solutions",
      type: "website",
      images: ogImage,
    },

    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ogImage,
    },
  };
}

export default async function Home() {
  const locale = await getLocale();

  const t = content[locale as keyof typeof content] ?? content.en;

  const isRtl = ["ar", "fa", "ps"].includes(locale);

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      <Header />

      <HomeHero />

      <AiShowcase />

      <FooterSection />
    </div>
  );
}