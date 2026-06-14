// app/[locale]/(auth)/sign-in/page.tsx

import type { Metadata } from "next";
import AuthShell from "../_components/AuthShell";
import LoginForm from "../_components/LoginForm";

export const metadata: Metadata = {
  title:       "Sign In | IDWE",
  description: "Sign in securely to your IDWE enterprise account.",
};

export default function SignInPage() {
  return (
    <AuthShell mode="login">
      <LoginForm />
    </AuthShell>
  );
}