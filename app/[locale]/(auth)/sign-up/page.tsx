// app/[locale]/(auth)/sign-up/page.tsx

import type { Metadata } from "next";
import AuthShell from "../_components/AuthShell";
import SignupForm from "../_components/SignupForm";

export const metadata: Metadata = {
  title:       "Create Account | IDWE",
  description: "Create your IDWE account and start building smarter systems.",
};

export default function SignUpPage() {
  return (
    <AuthShell mode="signup">
      <SignupForm />
    </AuthShell>
  );
}