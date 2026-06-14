"use client";

// app/[locale]/about/_components/AboutPageClient.tsx
//
// Enterprise About page — Clean / Apple-Linear level polish.
// Composed entirely of reusable shared components so every section
// can be dropped into other pages with different data.
//
// Sections:
//   1. Hero          — cinematic opener with scroll-parallax tagline
//   2. Story         — editorial two-column photo + text block
//   3. Mission/Vision— dual cards with live gradient top stripe
//   4. StatsRow      — animated count-up metrics (shared)
//   5. ValuesSection — 6-value grid with hover color glows (shared)
//   6. Timeline      — scroll-animated spine + alternating cards (shared)
//   7. TeamSection   — magazine-cover cards with hover reveal (shared)
//   8. PageCTA       — gradient CTA band (shared)

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  MapPin,
  Calendar,
  Rocket,
  Globe,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  HeartHandshake,
  Star,
  Code2,
  Zap,
  Users,
  ArrowRight,
} from "lucide-react";

// ── Shared reusable components ──────────────────────────────────────────────
import { StatsRow, type StatItem } from "@/components/shared/StatsRow";
import { ValuesSection, type ValueItem } from "@/components/shared/ValuesSection";
import { Timeline, type TimelineItem } from "@/components/shared/Timeline";
import { TeamSection, type TeamMember } from "@/components/shared/TeamSection";
import { PageCTA } from "@/components/shared/PageCTA";

// ─────────────────────────────────────────────────────────────────────────────
// Motion helpers
// ─────────────────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: EASE },
});

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.65, ease: EASE },
});

// ─────────────────────────────────────────────────────────────────────────────
// Section 1 — Hero
// ─────────────────────────────────────────────────────────────────────────────

function AboutHero({
  isRtl,
  t,
}: {
  isRtl: boolean;
  t: ReturnType<typeof useTranslations<"About">>;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={heroRef}
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="about-hero-heading"
      className="relative isolate min-h-[90vh] overflow-hidden px-4 pt-28 pb-24 sm:px-6 sm:pt-36 sm:pb-32 lg:px-8 lg:pt-44 lg:pb-40 flex items-center"
    >
      {/* ── Background: full-bleed editorial image ── */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark + brand overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/60 dark:from-background/97 dark:via-background/88 dark:to-background/70" />
        {/* Radial brand glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgb(10_184_251/8%),transparent)]"
        />
      </div>

      {/* Fine grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(148_198_233/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_198_233/0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]"
      />

      {/* ── Parallax content ── */}
      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-5xl w-full">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            {t("hero.eyebrow")}
          </span>
        </motion.div>

        {/* Headline — very large, tight tracking */}
        < motion.h1
  id="about-hero-heading"
  {...fadeUp(0.08)}
  className="mt-7 text-5xl font-bold tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
>
  {t("hero.headlineLead")}
  <br />
  <span className="text-color">{t("hero.headlineAccent")}</span>
</motion.h1>

        {/* Description */}
        <motion.p
          {...fadeUp(0.18)}
          className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9"
        >
          {t("hero.description")}
        </motion.p>

        {/* Meta badges */}
        <motion.div
          {...fadeUp(0.28)}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          {[
            { icon: MapPin, label: t("hero.locationUs") },
            { icon: MapPin, label: t("hero.locationAf") },
            { icon: Calendar, label: t("hero.founded") },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-md"
            >
              <Icon className="size-3.5 text-primary shrink-0" aria-hidden="true" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* CTA row */}
        <motion.div {...fadeUp(0.36)} className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#story"
            className="group inline-flex items-center gap-2 rounded-full bg-color px-7 py-3.5 text-sm font-semibold text-white shadow-brand transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t("hero.ctaStory")}
            <ArrowRight
              className={`size-4 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 2 — Story (editorial two-column)
// ─────────────────────────────────────────────────────────────────────────────

function StorySection({
  isRtl,
  t,
}: {
  isRtl: boolean;
  t: ReturnType<typeof useTranslations<"About">>;
}) {
  return (
    <section
      id="story"
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="story-heading"
      className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left: image stack */}
          <motion.div
            {...fadeUpInView(0)}
            className={`relative ${isRtl ? "lg:order-2" : ""}`}
          >
            {/* Main image */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop"
                alt="IDWE team collaborating"
                width={900}
                height={600}
                className="w-full object-cover"
              />
              {/* Gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>

            {/* Floating stat chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring", bounce: 0.35 }}
              className="absolute -bottom-5 -end-5 flex items-center gap-3 rounded-2xl border border-border/60 bg-card/90 p-4 shadow-xl backdrop-blur-md"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">50+</p>
                <p className="text-[11px] text-muted-foreground">{t("story.chip")}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: editorial text */}
          <motion.div
            {...fadeUpInView(0.1)}
            className={`flex flex-col gap-6 ${isRtl ? "lg:order-1" : ""}`}
          >
            <div>
              <motion.p
                {...fadeUpInView(0.1)}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary"
              >
                {t("story.eyebrow")}
              </motion.p>
              <motion.h2
                id="story-heading"
                {...fadeUpInView(0.17)}
                className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {t("story.title")}
              </motion.h2>
            </div>

            {/* Pull quote */}
            <motion.blockquote
              {...fadeUpInView(0.22)}
              className="border-s-4 border-primary ps-5 text-lg font-medium italic text-foreground/80"
            >
              {t("story.pullQuote")}
            </motion.blockquote>

            <motion.div
              {...fadeUpInView(0.27)}
              className="space-y-4 text-base leading-7 text-muted-foreground"
            >
              <p>{t("story.body1")}</p>
              <p>{t("story.body2")}</p>
            </motion.div>

            {/* Inline trust badges */}
            <motion.div {...fadeUpInView(0.32)} className="flex flex-wrap gap-2 pt-2">
              {[t("story.badge1"), t("story.badge2"), t("story.badge3")].map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 rounded-full border border-border/60 bg-accent px-4 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 3 — Mission / Vision
// ─────────────────────────────────────────────────────────────────────────────

function MissionVision({
  isRtl,
  t,
}: {
  isRtl: boolean;
  t: ReturnType<typeof useTranslations<"About">>;
}) {
  const cards = [
    {
      gradient: "bg-color",
      accentLine: "from-[#0ab8fb] to-[#324b9d]",
      icon: Rocket,
      titleKey: "mission.missionTitle" as const,
      bodyKey: "mission.missionBody" as const,
      dark: true,
    },
    {
      gradient: null,
      accentLine: "from-[#324b9d] to-[#6685dc]",
      icon: Globe,
      titleKey: "mission.visionTitle" as const,
      bodyKey: "mission.visionBody" as const,
      dark: false,
    },
  ];

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="mission-heading"
      className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Narrow background stripe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -z-10 h-96 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUpInView(0)} className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            {t("mission.eyebrow")}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map(({ gradient, accentLine, icon: Icon, titleKey, bodyKey, dark }, i) => (
            <motion.div
              key={titleKey}
              {...fadeUpInView(0.06 + i * 0.1)}
              className={[
                "group relative overflow-hidden rounded-3xl p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl sm:p-10",
                dark
                  ? "bg-color text-white"
                  : "border border-border/60 bg-card",
              ].join(" ")}
            >
              {/* Decorative orb */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -end-16 -top-16 size-56 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                style={{ background: `linear-gradient(135deg, #0ab8fb, #324b9d)` }}
              />
              {/* Top accent line */}
              <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accentLine}`} />

              <div className="relative">
                <div
                  className={[
                    "mb-6 flex size-14 items-center justify-center rounded-2xl",
                    dark
                      ? "bg-white/15 text-white"
                      : "bg-primary/10 text-primary",
                  ].join(" ")}
                >
                  <Icon className="size-7" aria-hidden="true" />
                </div>
                <h2
                  className={[
                    "text-xl font-bold tracking-tight sm:text-2xl",
                    dark ? "text-white" : "text-foreground",
                  ].join(" ")}
                >
                  {t(titleKey)}
                </h2>
                <p
                  className={[
                    "mt-4 text-base leading-7",
                    dark ? "text-white/80" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {t(bodyKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root export — assembles the full page
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPageClient({
  isRtl,
  locale,
}: {
  isRtl: boolean;
  locale: string;
}) {
  const t = useTranslations("About");

  // ── Stats data ────────────────────────────────────────────────────────────
  const stats: StatItem[] = [
    { icon: Users,    to: 50,  suffix: "+", label: t("stats.clients") },
    { icon: Calendar, to: 5,   suffix: "+", label: t("stats.years") },
    { icon: Star,     to: 98,  suffix: "%", label: t("stats.satisfaction") },
    { icon: Globe,    to: 12,  suffix: "+", label: t("stats.countries") },
  ];

  // ── Values data ───────────────────────────────────────────────────────────
  const values: ValueItem[] = [
    { icon: Lightbulb,    color: "#0ab8fb", title: t("values.v1Title"), body: t("values.v1Body") },
    { icon: ShieldCheck,  color: "#324b9d", title: t("values.v2Title"), body: t("values.v2Body") },
    { icon: TrendingUp,   color: "#13a89e", title: t("values.v3Title"), body: t("values.v3Body") },
    { icon: HeartHandshake, color: "#f59e0b", title: t("values.v4Title"), body: t("values.v4Body") },
    { icon: Star,         color: "#7c3aed", title: t("values.v5Title"), body: t("values.v5Body") },
    { icon: Globe,        color: "#0ab8fb", title: t("values.v6Title"), body: t("values.v6Body") },
  ];

  // ── Timeline data ─────────────────────────────────────────────────────────
  const milestones: TimelineItem[] = [
    {
      year: "2020",
      title: t("timeline.m1Title"),
      body: t("timeline.m1Body"),
      icon: Rocket,
      tag: t("timeline.m1Tag"),
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=700&q=75&auto=format&fit=crop",
    },
    {
      year: "2021",
      title: t("timeline.m2Title"),
      body: t("timeline.m2Body"),
      icon: Code2,
      tag: t("timeline.m2Tag"),
    },
    {
      year: "2022",
      title: t("timeline.m3Title"),
      body: t("timeline.m3Body"),
      icon: Zap,
      tag: t("timeline.m3Tag"),
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=75&auto=format&fit=crop",
    },
    {
      year: "2023",
      title: t("timeline.m4Title"),
      body: t("timeline.m4Body"),
      icon: Globe,
      tag: t("timeline.m4Tag"),
    },
    {
      year: "2024",
      title: t("timeline.m5Title"),
      body: t("timeline.m5Body"),
      icon: TrendingUp,
      tag: t("timeline.m5Tag"),
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=700&q=75&auto=format&fit=crop",
    },
    {
      year: "2025",
      title: t("timeline.m6Title"),
      body: t("timeline.m6Body"),
      icon: Star,
      tag: t("timeline.m6Tag"),
    },
  ];

  // ── Team data ─────────────────────────────────────────────────────────────
  const team: TeamMember[] = [
    {
      name: t("team.m1Name"),
      role: t("team.m1Role"),
      bio: t("team.m1Bio"),
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop&crop=face",
      initials: "HI",
      color: "#0ab8fb",
      skills: [t("team.skill1"), t("team.skill2"), t("team.skill3")],
      social: {
        linkedin: "https://linkedin.com",
      },
    },
    {
      name: t("team.m2Name"),
      role: t("team.m2Role"),
      bio: t("team.m2Bio"),
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format&fit=crop&crop=face",
      initials: "SA",
      color: "#324b9d",
      skills: [t("team.skill4"), t("team.skill5"), t("team.skill6")],
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
  ];

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="relative isolate min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      {/* Global background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-50 bg-[linear-gradient(to_right,rgb(148_198_233/0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_198_233/0.03)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      {/* ── 1. Hero ── */}
      {/* <AboutHero isRtl={isRtl} t={t} /> */}

      {/* ── 2. Story ── */}
      {/* <StorySection isRtl={isRtl} t={t} /> */}

      {/* ── 3. Mission / Vision ── */}
      <MissionVision isRtl={isRtl} t={t} />

      {/* ── 4. Stats (shared) ── */}
      <StatsRow
        items={stats}
        eyebrow={t("stats.eyebrow")}
        title={t("stats.title")}
        isRtl={isRtl}
        withBackground
      />

      {/* ── 5. Values (shared) ── */}
      <ValuesSection
        items={values}
        eyebrow={t("values.eyebrow")}
        title={t("values.title")}
        description={t("values.description")}
        isRtl={isRtl}
      />

      {/* ── 6. Timeline (shared) ── */}
      {/* <Timeline
        items={milestones}
        eyebrow={t("timeline.eyebrow")}
        title={t("timeline.title")}
        description={t("timeline.description")}
        isRtl={isRtl}
      /> */}

      {/* ── 7. Team (shared) ── */}
      {/* <TeamSection
        members={team}
        eyebrow={t("team.eyebrow")}
        title={t("team.title")}
        description={t("team.description")}
        isRtl={isRtl}
      /> */}

      {/* ── 8. CTA (shared) ── */}
      <PageCTA
        title={t("cta.title")}
        description={t("cta.description")}
        primaryLabel={t("cta.primary")}
        primaryHref={`/${locale}/contact`}
        secondaryLabel={t("cta.secondary")}
        secondaryHref={`/${locale}/services`}
        isRtl={isRtl}
      />
    </main>
  );
}