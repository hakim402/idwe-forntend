/**
 * auth/magic-link/page.tsx — Consume a magic link token
 *
 * Flow:
 *   1. User requests magic link → backend emails /[locale]/auth/magic-link?token=XXX
 *   2. This page reads token from URL on mount
 *   3. Calls POST /auth/magic-link/verify/ — stores tokens on success
 *   4. Hydrates AuthContext → redirects to dashboard
 *
 * PUBLIC_ROUTE — accessible whether logged in or not.
 */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Loader2, XCircle } from "lucide-react";
import { Link } from "@/i18n/routing";

import { verifyMagicLink, getMe, getErrorMessage } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { BackToHome } from "../../_components/BackToHome";

// ─────────────────────────────────────────────────────────────────────────────

type State = "loading" | "error";

export default function MagicLinkPage() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const locale       = useLocale();
  const { setUser }  = useAuth();

  const [state, setState]   = useState<State>("loading");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setState("error");
      setErrMsg("No magic link token found. Please request a new link.");
      return;
    }

    verifyMagicLink(token)
      .then(async () => {
        // Hydrate the auth context so Header updates immediately
        const user = await getMe();
        setUser(user);
        router.replace(`/${locale}/dashboard`);
        // State stays "loading" during redirect — the page unmounts
      })
      .catch((err) => {
        setState("error");
        setErrMsg(getErrorMessage(err));
      });
  }, [searchParams, locale, router, setUser]);

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

        {/* ── Loading / redirecting ── */}
        {state === "loading" && (
          <>
            <div className="flex size-16 items-center justify-center
                            rounded-2xl bg-accent">
              <Loader2 className="size-8 text-primary animate-spin" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground mb-2">
                Signing you in…
              </h1>
              <p className="text-[14px] text-muted-foreground">
                Verifying your magic link. You&apos;ll be redirected shortly.
              </p>
            </div>
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
                Link expired or invalid
              </h1>
              <p className="text-[14px] leading-6 text-muted-foreground">
                {errMsg}
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Button
                asChild
                className="w-full rounded-full bg-color shadow-brand
                           hover:-translate-y-0.5 transition-transform duration-200
                           font-semibold"
              >
                <Link href="/sign-in">Back to sign in</Link>
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}