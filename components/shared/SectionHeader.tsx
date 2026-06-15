"use client";

// components/shared/SectionHeader.tsx
//
// Reusable section header used across the entire site.
// Supports eyebrow label, headline with optional gradient accent word,
// body description, and optional sub-label beneath.
//
// Usage:
//   <SectionHeader
//     eyebrow="Our Story"
//     headline="Built to automate"
//     accentWord="the future"
//     description="Some body copy..."
//     align="center" | "start"
//     isRtl={isRtl}
//   />

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.6, ease: EASE },
});

interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  /** Word or phrase inside headline that receives gradient treatment */
  accentWord?: string;
  description?: string;
  align?: "center" | "start";
  isRtl?: boolean;
  /** Extra Tailwind classes on the wrapper */
  className?: string;
  /** If true, renders h1 instead of h2 */
  asH1?: boolean;
}

export function SectionHeader({
  eyebrow,
  headline,
  accentWord,
  description,
  align = "start",
  isRtl = false,
  className = "",
  asH1 = false,
}: SectionHeaderProps) {
  const textAlign = align === "center" ? "text-center" : "text-start";
  const maxW = align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl";

  // Inject gradient accent into headline
  const renderHeadline = () => {
    if (!accentWord || !headline.includes(accentWord)) {
      return <span>{headline}</span>;
    }
    const parts = headline.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="text-color">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  const HeadingTag = asH1 ? "h1" : "h2";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`${maxW} ${textAlign} ${className}`}
    >
      {eyebrow && (
        <motion.p
          {...fadeUpInView(0)}
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.div {...fadeUpInView(0.07)}>
        <HeadingTag
          className={[
            "mt-3 font-bold tracking-tight text-foreground",
            asH1
              ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              : "text-3xl sm:text-4xl",
          ].join(" ")}
        >
          {renderHeadline()}
        </HeadingTag>
      </motion.div>

      {description && (
        <motion.p
          {...fadeUpInView(0.14)}
          className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
