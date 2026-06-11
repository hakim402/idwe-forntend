// app/layout.tsx

import type { Metadata } from "next";
import { ThemeProvider } from "@/Providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import {
  Cairo,
  Poppins,
  Noto_Sans_SC,
  Noto_Naskh_Arabic,
} from "next/font/google";
import Script from "next/script";

import "./globals.css";

import { WhatsAppButton } from "@/components/WhatsAppButton";

// English Font
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-en",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Arabic Font
const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-ar",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Chinese Font
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-zh",
  weight: ["400", "500", "700"],
  display: "swap",
});

// Persian + Pashto Font
const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-fa-ps",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://infinity-solutions.pro"),

  title: {
    template: "%s | Infinity Solutions",
    default: "Infinity Solutions - Enterprise AI & Technology Services",
  },

  description:
    "Infinity Solutions delivers enterprise-grade AI solutions, AI bots, business development, software development, web development, mobile app development, Claude AI integrations, API integrations, database architecture, cybersecurity services, security compliance, and scalable digital transformation solutions.",

  keywords: [
    "Infinity Solutions",
    "AI Solutions",
    "AI Bots",
    "Software Development",
    "Web Development",
    "App Development",
    "Cybersecurity",
    "API Integration",
    "Claude AI",
    "Cloud Solutions",
    "Enterprise Solutions",
  ],

  openGraph: {
    title: "Infinity Solutions - Enterprise AI & Technology Services",

    description:
      "Enterprise-grade AI, cybersecurity, software engineering, cloud infrastructure, and digital transformation services.",

    url: "https://infinity-solutions.pro",

    siteName: "Infinity Solutions",

    type: "website",

    images: [
      {
        url: "/logo/jahez.jpg",
        width: 1200,
        height: 630,
        alt: "Infinity Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Infinity Solutions - Enterprise AI & Technology Services",

    description:
      "AI solutions, enterprise software, cybersecurity, API integrations, and cloud infrastructure services.",

    images: ["/logo/jahez.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "Organization",

    name: "Infinity Solutions",

    url: "https://infinity-solutions.pro",

    logo: "https://infinity-solutions.pro/logo/infinity.jpg",

    description:
      "Infinity Solutions is an enterprise technology company delivering AI solutions, software engineering, cybersecurity, cloud infrastructure, business automation, and digital transformation services.",

    services: [
      "Artificial Intelligence Solutions",
      "AI Bots & Automation",
      "Enterprise Software Development",
      "Web Development",
      "Mobile App Development",
      "Claude AI Integration",
      "API Integration",
      "Database Architecture",
      "Cybersecurity Services",
      "Security Compliance",
      "Cloud Infrastructure",
      "Digital Transformation",
    ],
  };

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`
        ${poppins.variable}
        ${cairo.variable}
        ${notoSansSC.variable}
        ${notoNaskhArabic.variable}
      `}
    >
      <body suppressHydrationWarning>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ThemeProvider>
          {children}

          <Toaster />

          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
