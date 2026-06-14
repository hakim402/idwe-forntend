"use client";

// components/shared/Timeline.tsx
//
// Reusable vertical timeline with alternating left/right layout on desktop.
// Collapses to a single left-aligned track on mobile.
// RTL-aware: spine shifts to the end side; card sides flip.
//
// Signature design element: the spine is a live gradient line that "draws"
// downward as it enters the viewport, giving the section a sense of forward
// momentum — fitting for a company history that's still being written.
//
// Usage:
//   const milestones: TimelineItem[] = [
//     {
//       year: "2020",
//       title: "Company founded",
//       body: "Started as a boutique consultancy...",
//       icon: Rocket,
//       image: "https://images.unsplash.com/...",  // optional
//       tag: "Origin",                              // optional pill label
//     },
//   ];
//   <Timeline items={milestones} eyebrow="Our journey" title="Five years of building" isRtl={isRtl} />

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { delay, duration: 0.65, ease: EASE },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TimelineItem {
  year: string;
  title: string;
  body: string;
  icon: React.ElementType;
  /** Optional Unsplash / CDN image URL shown in the card */
  image?: string;
  /** Optional small pill label e.g. "Origin" | "Milestone" */
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

// ─── Animated spine line ─────────────────────────────────────────────────────

function SpineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute start-[1.125rem] top-0 h-full w-px sm:start-1/2 sm:-translate-x-px"
    >
      {/* Static ghost track */}
      <div className="absolute inset-0 bg-border/40" />
      {/* Animated progress fill */}
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 bg-gradient-to-b from-primary via-[#324b9d] to-primary/30"
      />
    </div>
  );
}

// ─── Single milestone card ────────────────────────────────────────────────────

function MilestoneCard({
  item,
  index,
  isRtl,
}: {
  item: TimelineItem;
  index: number;
  isRtl: boolean;
}) {
  const Icon = item.icon;

  // On LTR: even → left side, odd → right side.
  // On RTL: flip sides.
  const isLeft = isRtl ? index % 2 !== 0 : index % 2 === 0;

  return (
    <motion.div
      {...fadeUpInView(0.04 + index * 0.07)}
      className="relative flex items-start gap-0 sm:gap-0"
    >
      {/* ── Desktop: alternating layout ── */}

      {/* Left half-width slot */}
      <div
        className={[
          "hidden sm:block sm:w-[calc(50%-2rem)]",
          isLeft ? "" : "sm:order-3",
        ].join(" ")}
      >
        {isLeft && <CardBody item={item} alignEnd isRtl={isRtl} />}
      </div>

      {/* Center dot + connector */}
      <div className="relative z-10 mx-8 hidden shrink-0 sm:flex sm:flex-col sm:items-center sm:order-2">
        <NodeDot icon={Icon} />
      </div>

      {/* Right half-width slot */}
      <div
        className={[
          "hidden sm:block sm:w-[calc(50%-2rem)]",
          isLeft ? "sm:order-3" : "",
        ].join(" ")}
      >
        {!isLeft && <CardBody item={item} alignEnd={false} isRtl={isRtl} />}
      </div>

      {/* ── Mobile: single-column ── */}
      <div className="ms-10 flex-1 sm:hidden">
        <CardBody item={item} alignEnd={false} isRtl={isRtl} />
      </div>

      {/* Mobile dot */}
      <div className="absolute start-0 top-4 z-10 sm:hidden">
        <NodeDot icon={Icon} small />
      </div>
    </motion.div>
  );
}

function NodeDot({
  icon: Icon,
  small = false,
}: {
  icon: React.ElementType;
  small?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center justify-center rounded-full bg-color shadow-brand ring-4 ring-background",
        small ? "size-8" : "size-10",
      ].join(" ")}
    >
      <Icon
        className={small ? "size-3.5 text-white" : "size-5 text-white"}
        aria-hidden="true"
      />
    </div>
  );
}

function CardBody({
  item,
  alignEnd,
  isRtl,
}: {
  item: TimelineItem;
  alignEnd: boolean;
  isRtl: boolean;
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl",
        alignEnd && !isRtl ? "text-end" : "",
        alignEnd && isRtl ? "text-start" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Optional image */}
      {item.image && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Image gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent" />
        </div>
      )}

      <div className="p-6">
        {/* Year + tag row */}
        <div
          className={[
            "flex flex-wrap items-center gap-2",
            alignEnd && !isRtl ? "justify-end" : "justify-start",
          ].join(" ")}
        >
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
    </div>
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
        {/* Header */}
        {(eyebrow || title || description) && (
          <div className="mb-16 text-center">
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

        {/* Track */}
        <div className="relative">
          <SpineLine />
          <div className="space-y-12">
            {items.map((item, i) => (
              <MilestoneCard key={item.year + item.title} item={item} index={i} isRtl={isRtl} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}