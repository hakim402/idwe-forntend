"use client";

// components/shared/Timeline.tsx
//
// Vertical timeline — alternating left/right on desktop, single-column on mobile.
// RTL-safe: uses logical CSS properties throughout (start/end, ps/pe, ms/me).
// Scroll-driven spine: the gradient line draws itself as you scroll.
//
// Usage:
//   <Timeline
//     items={milestones}
//     eyebrow="Our journey"
//     title="Five years of building"
//     description="From a one-person consultancy..."
//     isRtl={isRtl}
//   />

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { delay, duration: 0.65, ease: EASE },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TimelineItem {
  year: string;
  title: string;
  body: string;
  icon: React.ElementType;
  image?: string;
  tag?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  isRtl?: boolean;
  className?: string;
}

// ─── Scroll-driven spine ──────────────────────────────────────────────────────

function SpineLine({ isRtl }: { isRtl: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      // Mobile: fixed 18px from start edge
      // Desktop: absolute center
      className="pointer-events-none absolute inset-y-0 inset-s-4.5w-px sm:inset-s-1/2 sm:-translate-x-px"
    >
      {/* Ghost track */}
      <div className="h-full w-full bg-border/30" />
      {/* Animated fill */}
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 bg-linear-to-b from-[#0ab8fb] via-[#324b9d] to-[#0ab8fb]/30"
      />
    </div>
  );
}

// ─── Center node dot ──────────────────────────────────────────────────────────

function NodeDot({
  icon: Icon,
  size = "md",
}: {
  icon: React.ElementType;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "size-9" : "size-11";
  const iconDim = size === "sm" ? "size-4" : "size-5";

  return (
    <div
      className={`${dim} relative z-10 flex shrink-0 items-center justify-center rounded-full bg-color shadow-brand ring-[3px] ring-background`}
    >
      <Icon className={`${iconDim} text-white`} aria-hidden="true" />
    </div>
  );
}

// ─── Card body ────────────────────────────────────────────────────────────────

function CardBody({
  item,
  side,
}: {
  item: TimelineItem;
  /** "left" = card sits on the left half; "right" = right half; "mobile" = full width */
  side: "left" | "right" | "mobile";
}) {
  // On desktop, left cards have text aligned end so copy reads toward the spine.
  // Right cards and mobile always align start.
  const textAlignCls = side === "left" ? "sm:text-end" : "";

  // Year + tag row justify
  const rowJustify = side === "left" ? "sm:justify-end" : "justify-start";

  return (
    <motion.div
      className={[
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-card",
        "shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl",
        textAlignCls,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Hover ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgb(10 184 251 / 5%), transparent)",
        }}
      />

      {/* Optional image */}
      {item.image && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-card/90 via-card/30 to-transparent" />
        </div>
      )}

      <div className="p-6">
        {/* Year + tag */}
        <div className={`flex flex-wrap items-center gap-2 ${rowJustify}`}>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {item.year}
          </span>
          {item.tag && (
            <span className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {item.tag}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-base font-bold text-foreground sm:text-lg">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {item.body}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Single milestone row ─────────────────────────────────────────────────────

function MilestoneRow({
  item,
  index,
  isRtl,
}: {
  item: TimelineItem;
  index: number;
  isRtl: boolean;
}) {
  const Icon = item.icon;

  // LTR: even = left card, odd = right card.
  // RTL flips: even = right card, odd = left card.
  const isLeftCard = isRtl ? index % 2 !== 0 : index % 2 === 0;

  return (
    <motion.div
      {...fadeUpInView(0.04 + index * 0.06)}
      className="relative flex items-start"
    >
      {/* ─── MOBILE layout (single column) ─── */}
      {/* Dot pinned at start-[18px] by the parent's relative container */}
      <div className="absolute start-s-0 top-5 z-10 sm:hidden">
        <NodeDot icon={Icon} size="sm" />
      </div>
      <div className="ms-14 flex-1 sm:hidden">
        <CardBody item={item} side="mobile" />
      </div>

      {/* ─── DESKTOP layout (alternating) ─── */}
      <div className="hidden w-full sm:flex sm:items-center sm:gap-0">
        {/* Left slot — 50% minus the dot width */}
        <div className="w-[calc(50%-1.5rem)] pe-6">
          {isLeftCard && <CardBody item={item} side="left" />}
        </div>

        {/* Center dot */}
        <div className="flex shrink-0 items-center justify-center">
          <NodeDot icon={Icon} size="md" />
        </div>

        {/* Right slot */}
        <div className="w-[calc(50%-1.5rem)] ps-6">
          {!isLeftCard && <CardBody item={item} side="right" />}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export function Timeline({
  items,
  eyebrow,
  title,
  description,
  isRtl = false,
  className = "",
}: TimelineProps) {
  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="timeline-heading"
      className={`px-4 py-20 sm:px-6 lg:px-8 lg:py-28 ${className}`}
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        {(eyebrow || title || description) && (
          <div className="mb-20 text-center">
            {eyebrow && (
              <motion.p
                {...fadeUpInView(0)}
                className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
              >
                {eyebrow}
              </motion.p>
            )}
            {title && (
              <motion.h2
                id="timeline-heading"
                {...fadeUpInView(0.07)}
                className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                {...fadeUpInView(0.14)}
                className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        {/* Timeline track */}
        <div className="relative">
          <SpineLine isRtl={isRtl} />
          <div className="flex flex-col gap-10">
            {items.map((item, i) => (
              <MilestoneRow
                key={`${item.year}-${item.title}`}
                item={item}
                index={i}
                isRtl={isRtl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
