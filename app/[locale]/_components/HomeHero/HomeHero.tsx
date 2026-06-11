"use client";

import type { ElementType } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Bot,
  Sparkles,
  Zap,
  Brain,
  Globe,
  Smartphone,
  Plug,
  Workflow,
  BarChart3,
  ShieldCheck,
  Cloud,
  Code2,
  MessageSquare,
  Database,
  Cpu,
} from "lucide-react";

type Locale = "en" | "zh" | "ar" | "fa" | "ps";

type TickerItem = {
  icon: string;
  text: string;
  badge: string;
  badgeVariant: "cyan" | "blue" | "teal";
};

type HomeHeroContent = {
  headlineLead: string;
  headlineAccent: string;
  headlineSuffix: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  tickerItems: TickerItem[];
};

type OrbitalNode = {
  Icon: ElementType;
  label: string;
  color: string;
  offset: number;
};

type OrbitalRing = {
  radius: number;
  duration: number;
  clockwise: boolean;
  nodes: OrbitalNode[];
};

const SUPPORTED_LOCALES: Locale[] = ["en", "zh", "ar", "fa", "ps"];
const RTL_LOCALES = new Set<Locale>(["ar", "fa", "ps"]);
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ORBITAL_RINGS: OrbitalRing[] = [
  {
    radius: 88,
    duration: 22,
    clockwise: true,
    nodes: [
      { Icon: Brain, label: "AI", color: "#0ab8fb", offset: 0 },
      { Icon: Bot, label: "Agents", color: "#324b9d", offset: 90 },
      { Icon: Workflow, label: "Automation", color: "#0ab8fb", offset: 180 },
      { Icon: MessageSquare, label: "Chatbots", color: "#13a89e", offset: 270 },
    ],
  },
  {
    radius: 154,
    duration: 36,
    clockwise: false,
    nodes: [
      { Icon: Globe, label: "Web", color: "#0ab8fb", offset: 30 },
      { Icon: Smartphone, label: "Mobile", color: "#7c3aed", offset: 102 },
      { Icon: Code2, label: "SaaS", color: "#324b9d", offset: 174 },
      { Icon: Plug, label: "APIs", color: "#f59e0b", offset: 246 },
      { Icon: Database, label: "DB", color: "#13a89e", offset: 318 },
    ],
  },
  {
    radius: 222,
    duration: 52,
    clockwise: true,
    nodes: [
      { Icon: Cloud, label: "Cloud", color: "#0ab8fb", offset: 15 },
      { Icon: ShieldCheck, label: "Security", color: "#324b9d", offset: 75 },
      { Icon: BarChart3, label: "Analytics", color: "#13a89e", offset: 135 },
      { Icon: Zap, label: "Speed", color: "#f59e0b", offset: 195 },
      { Icon: Cpu, label: "AI Infra", color: "#7c3aed", offset: 255 },
      { Icon: Sparkles, label: "GPT", color: "#0ab8fb", offset: 315 },
    ],
  },
];

const FLOAT_LABELS = [
  { text: "AI Agents", left: "71%", top: "8%", delay: 1.3 },
  { text: "Web & Mobile", left: "66%", top: "82%", delay: 1.6 },
  { text: "Cloud & APIs", left: "-2%", top: "58%", delay: 1.9 },
];

const TICKER_ICON_MAP: Record<string, ElementType> = {
  bot: Bot,
  zap: Zap,
  sparkles: Sparkles,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: smoothEase, delay: 0.25 },
  },
};

function getSupportedLocale(locale: string): Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale) ? (locale as Locale) : "en";
}

function buildLocalePath(locale: Locale, path: string) {
  return `/${locale}${path}`;
}

function getArrayValue<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function useHomeHeroContent(): { locale: Locale; content: HomeHeroContent } {
  const locale = getSupportedLocale(useLocale());
  const t = useTranslations("HomeHero");

  return {
    locale,
    content: {
      headlineLead: t("headlineLead"),
      headlineAccent: t("headlineAccent"),
      headlineSuffix: t("headlineSuffix"),
      description: t("description"),
      primaryAction: t("primaryAction"),
      secondaryAction: t("secondaryAction"),
      tickerItems: getArrayValue<TickerItem>(t.raw("tickerItems"), []),
    },
  };
}

function ActivityTicker({ items }: { items: TickerItem[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/60 shadow-sm backdrop-blur-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background/80 to-transparent" />

        <div className="flex items-center">
          <div className="relative z-20 flex shrink-0 items-center gap-2 border-r border-border/50 bg-background/80 px-4 py-3 backdrop-blur-sm">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Live
            </span>
          </div>

          <div className="min-w-0 overflow-hidden py-3">
            <motion.div
              className="flex gap-1 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            >
              {doubled.map((item, i) => {
                const Icon = TICKER_ICON_MAP[item.icon] ?? Sparkles;

                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2.5 rounded-xl border border-transparent px-4 py-1 text-xs text-muted-foreground transition-colors duration-200 hover:border-border/60 hover:bg-accent/40 hover:text-foreground"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
                      <Icon className="size-3" />
                    </span>
                    <span>{item.text}</span>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-1.5 py-px text-[9px] font-bold leading-none text-primary">
                      {item.badge}
                    </span>
                    <span className="size-1 shrink-0 rounded-full bg-border" />
                  </span>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrbitalRingLayer({
  ring,
  ringIndex,
}: {
  ring: OrbitalRing;
  ringIndex: number;
}) {
  const size = ring.radius * 2;
  const nodeSize = [40, 44, 48][ringIndex] ?? 44;

  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        marginTop: -ring.radius,
        marginLeft: -ring.radius,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35 + ringIndex * 0.18, duration: 0.7, ease: smoothEase }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: ring.clockwise ? 360 : -360 }}
        transition={{ duration: ring.duration, ease: "linear", repeat: Infinity }}
      >
        {ring.nodes.map((node, ni) => {
          const angleRad = ((node.offset - 90) * Math.PI) / 180;
          const x = ring.radius + ring.radius * Math.cos(angleRad) - nodeSize / 2;
          const y = ring.radius + ring.radius * Math.sin(angleRad) - nodeSize / 2;

          return (
            <div
              key={`${node.label}-${ni}`}
              className="absolute"
              style={{ left: x, top: y, width: nodeSize, height: nodeSize }}
            >
              <motion.div
                className="size-full"
                animate={{ rotate: ring.clockwise ? -360 : 360 }}
                transition={{ duration: ring.duration, ease: "linear", repeat: Infinity }}
              >
                <div
                  className="flex size-full items-center justify-center rounded-full border border-border/60 bg-card shadow-sm transition-transform duration-300 hover:scale-125"
                  style={{
                    boxShadow: `0 0 14px ${node.color}28, 0 2px 8px rgb(0 0 0 / 0.12)`,
                  }}
                >
                  <node.Icon className="size-[44%]" style={{ color: node.color }} />
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

function OrbitalSystem() {
  const outerRadius = ORBITAL_RINGS[ORBITAL_RINGS.length - 1].radius;
  const pad = 60;
  const containerSize = outerRadius * 2 + pad;
  const cx = containerSize / 2;
  const cy = containerSize / 2;

  return (
    <div
      className="relative shrink-0 select-none"
      style={{ width: containerSize, height: containerSize }}
      aria-hidden="true"
    >
      <svg
        className="pointer-events-none absolute inset-0"
        width={containerSize}
        height={containerSize}
        viewBox={`0 0 ${containerSize} ${containerSize}`}
      >
        <defs>
          <radialGradient id="orbitCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0ab8fb" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0ab8fb" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="ringStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ab8fb" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#324b9d" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0ab8fb" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <circle cx={cx} cy={cy} r={100} fill="url(#orbitCenterGlow)" />

        {ORBITAL_RINGS.map((ring, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={ring.radius}
            fill="none"
            stroke="url(#ringStroke)"
            strokeWidth={i === 1 ? "1" : "0.75"}
            strokeDasharray={i === 1 ? "none" : i === 0 ? "3 7" : "5 10"}
            opacity={i === 1 ? 0.4 : 0.28}
          />
        ))}
      </svg>

      {ORBITAL_RINGS.map((ring, i) => (
        <OrbitalRingLayer key={i} ring={ring} ringIndex={i} />
      ))}

      <motion.div
        className="absolute flex items-center justify-center rounded-full bg-color shadow-brand"
        style={{
          width: 72,
          height: 72,
          top: "50%",
          left: "50%",
          marginTop: -36,
          marginLeft: -36,
        }}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, duration: 0.7, type: "spring", bounce: 0.5 }}
      >
        <Zap className="size-8 text-white" />
      </motion.div>

      {FLOAT_LABELS.map(({ text, left, top, delay }) => (
        <motion.div
          key={text}
          className="absolute whitespace-nowrap rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-[9px] font-semibold text-muted-foreground shadow-sm backdrop-blur-sm"
          style={{ left, top }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.4 }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
}

export default function HomeHero() {
  const { locale, content } = useHomeHeroContent();
  const isRtl = RTL_LOCALES.has(locale);
  const direction = isRtl ? "rtl" : "ltr";

  return (
    <section
      dir={direction}
      aria-labelledby="home-hero-title"
      className="relative isolate w-full overflow-hidden bg-background px-5 pb-20 pt-32 text-foreground sm:px-5 lg:px-5 lg:pb-28 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgb(10_184_251/12%),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgb(10_184_251/8%),transparent)]" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6 xl:gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={[
              "flex w-full min-w-0 flex-col gap-8 text-center lg:basis-0 lg:flex-1",
              isRtl ? "lg:text-right" : "lg:text-left",
            ].join(" ")}
          >
            <motion.h1
              id="home-hero-title"
              variants={fadeUpVariants}
              className="text-balance text-4xl font-bold leading-tight tracking-tighter text-foreground sm:text-5xl sm:leading-[1.22] md:text-6xl md:leading-[1.18] xl:text-6xl xl:leading-[1.14]"
            >
              {content.headlineLead}{" "}
              <span className="text-color">{content.headlineAccent}</span>
              {content.headlineSuffix && <> {content.headlineSuffix}</>}
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mx-auto max-w-lg text-pretty text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0"
            >
              {content.description}
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="flex w-full flex-row flex-wrap items-center justify-center gap-3 lg:justify-start"
              style={{
                justifyContent: isRtl ? "flex-end" : "flex-start",
              }}
            >
              <Link
                href={buildLocalePath(locale, "/contact")}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-color px-6 py-3 text-sm font-semibold shadow-brand transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:px-8"
              >
                {content.primaryAction}
                <ArrowRight
                  className={`size-4 transition-transform ${
                    isRtl
                      ? "rotate-180 group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                  }`}
                />
              </Link>

              <Link
                href={buildLocalePath(locale, "/services")}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-background/75 px-6 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary sm:px-8"
              >
                {content.secondaryAction}
              </Link>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="w-full max-w-xl lg:hidden lg:max-w-none">
              <ActivityTicker items={content.tickerItems} />
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="show"
            className="relative flex h-90 w-full min-w-0 shrink-0 items-center justify-center sm:h-107.5 lg:h-auto lg:basis-125 xl:basis-140"
          >
            <div
              className="absolute rounded-full bg-primary/6 blur-3xl dark:bg-primary/10"
              style={{ width: 530, height: 530 }}
            />

            <div className="scale-[0.58] sm:scale-[0.72] lg:scale-[0.88] xl:scale-[0.92]">
              <OrbitalSystem />
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUpVariants}
          className="hidden w-full max-w-xl lg:block lg:max-w-none"
        >
          <ActivityTicker items={content.tickerItems} />
        </motion.div>
      </div>
    </section>
  );
}