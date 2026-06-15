"use client";

// components/shared/StatsRow.tsx
//
// Fully reusable animated statistics row.
// Animates numbers from 0 → target using Framer Motion's animate() utility.
// Supports 2–6 stats. Each stat has an icon, numeric target, suffix, and label.
//
// Usage:
//   const stats: StatItem[] = [
//     { icon: Users, to: 50, suffix: "+", label: "Clients served" },
//     { icon: Star,  to: 98, suffix: "%", label: "Satisfaction rate" },
//   ];
//   <StatsRow items={stats} isRtl={isRtl} eyebrow="By the numbers" title="Trusted worldwide" />

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.6, ease: EASE },
});

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StatItem {
  icon: React.ElementType;
  to: number;
  suffix?: string;
  label: string;
  /** Optional accent color for the icon background (defaults to primary) */
  color?: string;
}

interface StatsRowProps {
  items: StatItem[];
  eyebrow?: string;
  title?: string;
  isRtl?: boolean;
  /** Show the soft gradient background band */
  withBackground?: boolean;
  className?: string;
}

// ─── Single stat card ────────────────────────────────────────────────────────

function StatCard({ item, delay }: { item: StatItem; delay: number }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const Icon = item.icon;

  useEffect(() => {
    if (!inView) return;
    const suffix = item.suffix ?? "";
    const controls = animate(0, item.to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(Math.round(v).toLocaleString() + suffix);
      },
    });
    return () => controls.stop();
  }, [inView, item.to, item.suffix]);

  const iconStyle = item.color
    ? { backgroundColor: `${item.color}18`, color: item.color }
    : undefined;

  return (
    <motion.div
      {...fadeUpInView(delay)}
      className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card px-6 py-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      {/* Subtle inner glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgb(10 184 251 / 5%), transparent)",
        }}
      />

      <div
        className="relative flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={
          iconStyle ?? {
            backgroundColor: "rgb(10 184 251 / 0.1)",
            color: "var(--primary)",
          }
        }
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>

      <div
        ref={ref}
        className="text-3xl font-bold tabular-nums tracking-tight text-foreground sm:text-4xl"
      >
        {display}
      </div>

      <p className="text-center text-sm font-medium text-muted-foreground">
        {item.label}
      </p>
    </motion.div>
  );
}

// ─── Exported component ──────────────────────────────────────────────────────

export function StatsRow({
  items,
  eyebrow,
  title,
  isRtl = false,
  withBackground = true,
  className = "",
}: StatsRowProps) {
  const colClass =
    items.length <= 2
      ? "grid-cols-2"
      : items.length === 3
        ? "grid-cols-3"
        : items.length === 5
          ? "grid-cols-2 sm:grid-cols-5"
          : "grid-cols-2 lg:grid-cols-4";

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-label="Statistics"
      className={`relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28 ${className}`}
    >
      {withBackground && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-primary/4 via-transparent to-[#324b9d]/4 dark:from-primary/6 dark:to-[#324b9d]/6"
        />
      )}

      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <motion.div {...fadeUpInView(0)} className="mb-12 text-center">
            {eyebrow && (
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <div className={`grid gap-4 ${colClass}`}>
          {items.map((item, i) => (
            <StatCard key={item.label} item={item} delay={0.05 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
