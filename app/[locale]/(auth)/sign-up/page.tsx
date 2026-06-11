import type { Metadata } from "next";
import AuthShell from "../_components/AuthShell";
import SignupForm from "../_components/SignupForm";

export const metadata: Metadata = {
  title: "Create Account | Infinity Enterprise Solutions",
  description: "Create your Infinity account and start building smarter systems.",
};

export default function SignupPage() {
  return (
    <AuthShell mode="signup">
      <SignupForm />
    </AuthShell>
  );
}
