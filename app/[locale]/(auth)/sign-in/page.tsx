import type { Metadata } from "next";
import AuthShell from "../_components/AuthShell";
import LoginForm from "../_components/LoginForm";

export const metadata: Metadata = {
  title: "Login | Infinity Enterprise Solutions",
  description: "Sign in securely to your Infinity account.",
};

export default function LoginPage() {
  return (
    <AuthShell mode="login">
      <LoginForm />
    </AuthShell>
  );
}
