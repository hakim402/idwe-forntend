"use client";

// components/shared/PageCTA.tsx
//
// Reusable full-width gradient CTA band used at the bottom of pages.
// Supports a primary button (white, solid) and secondary button (glass).
// Decorative animated background orbs give it visual depth.
//
// Usage:
//   <PageCTA
//     title="Ready to build something that lasts?"
//     description="Tell us what you're working on..."
//     primaryLabel="Start a conversation"
//     primaryHref="/contact"
//     secondaryLabel="Explore our services"
//     secondaryHref="/services"
//     isRtl={isRtl}
//   />

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface PageCTAProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  isRtl?: boolean;
  className?: string;
}

export function PageCTA({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  isRtl = false,
  className = "",
}: PageCTAProps) {
  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="page-cta-heading"
      className={`px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative isolate overflow-hidden rounded-3xl bg-color px-8 py-14 shadow-brand sm:px-14 sm:py-20"
        >
          {/* ── Decorative orbs ── */}
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -inset-e-24 -top-24 size-80 rounded-full bg-white/[0.07] blur-3xl"
          />
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="pointer-events-none absolute -inset-s-24 -bottom-24 size-96 rounded-full bg-white/5 blur-3xl"
          />
          {/* Fine grid overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-size-[48px_48px]"
          />

          {/* ── Content ── */}
          <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-lg">
              <h2
                id="page-cta-heading"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
              >
                {title}
              </h2>
              {description && (
                <p className="mt-4 text-base leading-7 text-white/75">
                  {description}
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              {/* Primary */}
              <Link
                href={primaryHref}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#245ea9]"
              >
                {primaryLabel}
                <ArrowRight
                  className={`size-4 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                  aria-hidden="true"
                />
              </Link>

              {/* Secondary */}
              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#245ea9]"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
