/**
 * sign-in/page.tsx — Email + password login page
 *
 * Features:
 *   • Email + password fields with validation (zod + react-hook-form)
 *   • Show/hide password toggle
 *   • "Keep me signed in" checkbox
 *   • Forgot password link
 *   • Google OAuth button
 *   • Redirects to ?redirect= param or /[locale]/dashboard after login
 *   • Inline field errors + sonner toast for API errors
 */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/i18n/routing";

import { login, getMe, getErrorMessage } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";

import { AuthCard }       from "../_components/AuthCard";
import { AuthHeader }     from "../_components/AuthHeader";
import { AuthFormField }  from "../_components/AuthFormField";
import { PasswordInput }  from "../_components/PasswordInput";
import { AuthDivider }    from "../_components/AuthDivider";
import { GoogleButton }   from "../_components/GoogleButton";
import { AuthFooterLink } from "../_components/AuthFooterLink";
import { BackToHome }     from "../_components/BackToHome";

// ─── Validation schema ────────────────────────────────────────────────────────

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
  remember: z.boolean().optional(),
});

type SignInValues = z.infer<typeof signInSchema>;

// ─────────────────────────────────────────────────────────────────────────────

export default function SignInPage() {
  const t          = useTranslations("Auth");
  const router     = useRouter();
  const locale     = useLocale();
  const params     = useSearchParams();
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  // Destination after successful login — respects middleware redirect param
  const redirectTo = params.get("redirect") ?? `/${locale}/dashboard`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  // ── Submit ──────────────────────────────────────────────────────────────
  async function onSubmit(values: SignInValues) {
    setLoading(true);
    try {
      await login({ email: values.email, password: values.password });

      // Hydrate auth context immediately so Header updates without reload
      const user = await getMe();
      setUser(user);

      toast.success(`Welcome back, ${user.full_name.split(" ")[0]}!`);
      router.push(redirectTo);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <BackToHome />

      <AuthHeader
        title={t("login.title")}
        description={t("login.description")}
      />

      <AuthCard>
        {/* ── Google OAuth ── */}
        <GoogleButton redirectTo={redirectTo} />

        <AuthDivider />

        {/* ── Email / password form ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

          {/* Email */}
          <AuthFormField
            id="email"
            label={t("common.email")}
            error={errors.email?.message}
            required
          >
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t("common.emailPlaceholder")}
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </AuthFormField>

          {/* Password */}
          <AuthFormField
            id="password"
            label={t("common.password")}
            error={errors.password?.message}
            required
          >
            <PasswordInput
              id="password"
              autoComplete="current-password"
              placeholder={t("common.passwordPlaceholder")}
              aria-invalid={!!errors.password}
              showLabel={t("common.showPassword")}
              hideLabel={t("common.hidePassword")}
              {...register("password")}
            />
          </AuthFormField>

          {/* Remember me + Forgot password row */}
          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox
                id="remember"
                {...register("remember")}
              />
              <span className="text-[13px] text-muted-foreground">
                {t("login.remember")}
              </span>
            </label>

            <Link
              href={"/forgot-password" as any}
              className="text-[13px] font-medium text-primary
                         hover:underline underline-offset-4 shrink-0"
            >
              {t("login.forgot")}
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-color shadow-brand
                       hover:-translate-y-0.5 transition-transform duration-200
                       font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 me-2 animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              t("login.submit")
            )}
          </Button>
        </form>
      </AuthCard>

      {/* Footer link */}
      <AuthFooterLink
        text={t("login.noAccount")}
        linkLabel={t("login.signupLink")}
        href="/sign-up"
      />
    </>
  );
}