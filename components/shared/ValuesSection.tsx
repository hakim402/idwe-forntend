"use client";

// components/shared/ValuesSection.tsx
//
// Reusable values / principles grid.
// Each card has a large icon, a color swatch, title, and body.
// On hover: lift + subtle color glow + icon scale.
// Cards are fully props-driven — pass any number, any icons, any colors.
//
// Usage:
//   const values: ValueItem[] = [
//     {
//       icon: Lightbulb,
//       color: "#0ab8fb",
//       title: "Innovation first",
//       body: "We reach for the best available tool...",
//     },
//   ];
//   <ValuesSection
//     items={values}
//     eyebrow="What we stand for"
//     title="Principles that drive every decision"
//     description="Optional body copy..."
//     isRtl={isRtl}
//   />

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.6, ease: EASE },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ValueItem {
  icon: React.ElementType;
  color: string;
  title: string;
  body: string;
}

interface ValuesSectionProps {
  items: ValueItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  isRtl?: boolean;
  className?: string;
}

// ─── Single value card ────────────────────────────────────────────────────────

function ValueCard({ item, delay }: { item: ValueItem; delay: number }) {
  const Icon = item.icon;

  return (
    <motion.div
      {...fadeUpInView(delay)}
      className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border/60 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl"
      style={
        {
          "--value-color": item.color,
        } as React.CSSProperties
      }
    >
      {/* Hover glow border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 transition-opacity duration-300 group-hover:opacity-100"
        style={{ "--tw-ring-color": `${item.color}40` } as React.CSSProperties}
      />
      {/* Ambient corner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-8 -top-8 size-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ backgroundColor: item.color }}
      />

      {/* Icon */}
      <div className="relative">
        <div
          className="flex size-13 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${item.color}15`, color: item.color }}
        >
          <Icon className="size-6" aria-hidden="true" />
        </div>
        {/* Tiny accent dot */}
        <div
          className="absolute -inset-e-1 -top-1 size-2.5 rounded-full ring-2 ring-background"
          style={{ backgroundColor: item.color }}
        />
      </div>

      {/* Text */}
      <div className="relative">
        <h3 className="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-foreground sm:text-lg">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {item.body}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export function ValuesSection({
  items,
  eyebrow,
  title,
  description,
  isRtl = false,
  className = "",
}: ValuesSectionProps) {
  const colClass =
    items.length % 3 === 0
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : items.length % 2 === 0
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="values-heading"
      className={`px-4 py-20 sm:px-6 lg:px-8 lg:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        {(eyebrow || title || description) && (
          <div className="mb-14">
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
                id="values-heading"
                {...fadeUpInView(0.07)}
                className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                {...fadeUpInView(0.14)}
                className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={`grid gap-5 ${colClass}`}>
          {items.map((item, i) => (
            <ValueCard key={item.title} item={item} delay={0.05 + i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
