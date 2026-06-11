import type { Metadata } from "next";
import AuthShell from "../_components/AuthShell";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | Infinity Enterprise Solutions",
  description: "Request a secure password reset code for your Infinity account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell mode="forgot-password">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
