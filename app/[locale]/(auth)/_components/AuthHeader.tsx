"use client";

// app/[locale]/(auth)/_components/AuthHeader.tsx

import Image from "next/image";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────

interface AuthHeaderProps {
  title: string;
  description: string;
}

// ─────────────────────────────────────────────────────────────────────────────

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      {/* Mobile-only logo — the showcase panel shows it on desktop */}
      <div className="flex lg:hidden mb-8">
        <Image
          src="/logo/idwe.png"
          alt="IDWE"
          width={100}
          height={40}
          className="h-9 w-auto object-contain dark:brightness-150"
          priority
        />
      </div>

      {/* Thin brand accent line */}
      <div className="h-px w-10 bg-brand-gradient mb-6" aria-hidden="true" />

      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
        {title}
      </h1>
      <p className="text-[14px] leading-6 text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}