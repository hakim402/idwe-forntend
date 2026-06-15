/**
 * auth/verify-email/page.tsx — Consume the email verification token
 *
 * Flow:
 *   1. Backend sends email → link points to /[locale]/auth/verify-email?token=XXX
 *   2. This page reads `token` from the URL on mount
 *   3. Calls POST /auth/verify-email/ with the token
 *   4. Shows success (with link to sign-in) or error state
 *
 * This is a "token consumption" page — no form input needed.
 * It must be accessible regardless of auth state (proxy.ts PUBLIC_ROUTES).
 */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Link } from "@/i18n/routing";

import { verifyEmail, getErrorMessage } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { BackToHome } from "../../_components/BackToHome";

// ─── State variants ───────────────────────────────────────────────────────────

type VerifyState = "loading" | "success" | "error";

// ─────────────────────────────────────────────────────────────────────────────

export default function VerifyEmailPage() {
  const t           = useTranslations("Auth");
  const searchParams = useSearchParams();

  const [state, setState]   = useState<VerifyState>("loading");
  const [errMsg, setErrMsg] = useState("");

  // ── Auto-verify on mount ────────────────────────────────────────────────
  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setState("error");
      setErrMsg("No verification token found in the URL. Please use the link from your email.");
      return;
    }

    verifyEmail(token)
      .then(() => setState("success"))
      .catch((err) => {
        setState("error");
        setErrMsg(getErrorMessage(err));
      });
  }, [searchParams]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen items-center justify-center
                    px-5 py-12 bg-background">
      <BackToHome />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-2xl border border-border/60
                   bg-card/80 backdrop-blur-sm shadow-sm p-8
                   flex flex-col items-center text-center gap-6"
      >

        {/* ── Loading ── */}
        {state === "loading" && (
          <>
            <div className="flex size-16 items-center justify-center
                            rounded-2xl bg-accent">
              <Loader2 className="size-8 text-primary animate-spin" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground mb-2">
                Verifying your email…
              </h1>
              <p className="text-[14px] text-muted-foreground">
                This only takes a moment.
              </p>
            </div>
          </>
        )}

        {/* ── Success ── */}
        {state === "success" && (
          <>
            <div className="flex size-16 items-center justify-center
                            rounded-2xl bg-color shadow-brand">
              <CheckCircle className="size-8 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground mb-2">
                Email verified!
              </h1>
              <p className="text-[14px] leading-6 text-muted-foreground">
                Your account is active. You can now sign in to your IDWE workspace.
              </p>
            </div>
            <Button
              asChild
              className="w-full rounded-full bg-color shadow-brand
                         hover:-translate-y-0.5 transition-transform duration-200
                         font-semibold"
            >
              <Link href="/sign-in">Sign in to your account</Link>
            </Button>
          </>
        )}

        {/* ── Error ── */}
        {state === "error" && (
          <>
            <div className="flex size-16 items-center justify-center
                            rounded-2xl bg-destructive/10">
              <XCircle className="size-8 text-destructive" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground mb-2">
                Verification failed
              </h1>
              <p className="text-[14px] leading-6 text-muted-foreground">
                {errMsg || "This link may have expired or already been used."}
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Button
                asChild
                className="w-full rounded-full bg-color shadow-brand
                           hover:-translate-y-0.5 transition-transform duration-200
                           font-semibold"
              >
                <Link href="/sign-in">Go to sign in</Link>
              </Button>
              <Link
                href="/sign-up"
                className="text-[13px] text-center text-muted-foreground
                           hover:text-foreground transition-colors"
              >
                Create a new account
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}