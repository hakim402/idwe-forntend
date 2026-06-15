"use client";

// components/shared/TeamSection.tsx
//
// Reusable leadership / team grid.
// Supports photo (next/image), initials fallback, name, role, bio, skills,
// and optional social links.
//
// Design signature: cards use a "magazine cover" layout — full-bleed photo
// with a frosted-glass overlay at the bottom for text. Hover reveals
// bio + skills in a smooth slide-up panel.
//
// Usage:
//   const members: TeamMember[] = [
//     {
//       name: "Hakim Ibrahimi",
//       role: "Founder & CEO",
//       bio: "Engineer turned entrepreneur...",
//       photo: "https://images.unsplash.com/...",
//       initials: "HI",
//       color: "#0ab8fb",
//       skills: ["AI / ML", "Product Strategy"],
//       social: {
//         linkedin: "https://linkedin.com/in/...",
//         twitter:  "https://twitter.com/...",
//       },
//     },
//   ];
//   <TeamSection members={members} eyebrow="Leadership" title="The people behind IDWE" isRtl={isRtl} />

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Globe } from "lucide-react";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.65, ease: EASE },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TeamMemberSocial {
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Unsplash or CDN image URL */
  photo?: string;
  /** Two-letter fallback shown when no photo */
  initials: string;
  /** Brand accent color for this member */
  color: string;
  skills?: string[];
  social?: TeamMemberSocial;
}

interface TeamSectionProps {
  members: TeamMember[];
  eyebrow?: string;
  title?: string;
  description?: string;
  isRtl?: boolean;
  className?: string;
}

// ─── Single member card ───────────────────────────────────────────────────────

function MemberCard({ member, delay }: { member: TeamMember; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      {...fadeUpInView(delay)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-md transition-shadow duration-300 hover:shadow-2xl focus-within:shadow-2xl"
      style={{ minHeight: 380 }}
    >
      {/* ── Photo or gradient avatar ── */}
      <div className="relative h-64 w-full overflow-hidden">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name} — ${member.role}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-5xl font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}88 100%)`,
            }}
          >
            {member.initials}
          </div>
        )}

        {/* Bottom overlay gradient — always visible */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, var(--card) 0%, var(--card)/60 30%, transparent 70%)`,
          }}
        />

        {/* Color accent bar at top */}
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ backgroundColor: member.color }}
        />
      </div>

      {/* ── Static info (always visible) ── */}
      <div className="relative px-6 pb-6 pt-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
            <p
              className="mt-0.5 text-sm font-semibold"
              style={{ color: member.color }}
            >
              {member.role}
            </p>
          </div>

          {/* Social links */}
          {member.social && (
            <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="flex size-8 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <FaLinkedin className="size-3.5" />
                </a>
              )}
              {member.social.twitter && (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on X (Twitter)`}
                  className="flex size-8 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <FaXTwitter className="size-3.5" />
                </a>
              )}
              {member.social.website && (
                <a
                  href={member.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s website`}
                  className="flex size-8 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Globe className="size-3.5" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* ── Hover reveal: bio + skills ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="bio"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {member.bio}
              </p>

              {member.skills && member.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border border-border/60 bg-accent px-3 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export function TeamSection({
  members,
  eyebrow,
  title,
  description,
  isRtl = false,
  className = "",
}: TeamSectionProps) {
  const colClass =
    members.length === 1
      ? "max-w-sm"
      : members.length === 2
        ? "sm:grid-cols-2 max-w-2xl"
        : members.length === 3
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="team-heading"
      className={`px-4 py-20 sm:px-6 lg:px-8 lg:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        {(eyebrow || title || description) && (
          <div className="mb-14">
            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
              >
                {eyebrow}
              </motion.p>
            )}
            {title && (
              <motion.h2
                id="team-heading"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.07, duration: 0.6, ease: EASE }}
                className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.14, duration: 0.6, ease: EASE }}
                className="mt-4 max-w-xl text-base leading-7 text-muted-foreground"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={`grid gap-6 ${colClass}`}>
          {members.map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              delay={0.06 + i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
