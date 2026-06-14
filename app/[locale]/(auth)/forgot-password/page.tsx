// app/[locale]/(auth)/forgot-password/page.tsx

import type { Metadata } from "next";
import AuthShell from "../_components/AuthShell";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";

export const metadata: Metadata = {
  title:       "Forgot Password | IDWE",
  description: "Request a secure password reset link for your IDWE account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell mode="forgot-password">
      <ForgotPasswordForm />
    </AuthShell>
  );
}