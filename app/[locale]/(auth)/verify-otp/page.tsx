import type { Metadata } from "next";
import AuthShell from "../_components/AuthShell";
import VerifyOtpForm from "../_components/VerifyOtpForm";

export const metadata: Metadata = {
  title: "Verify Code | Infinity Enterprise Solutions",
  description: "Verify the secure code sent to your email address.",
};

export default function VerifyOtpPage() {
  return (
    <AuthShell mode="verify-otp">
      <VerifyOtpForm />
    </AuthShell>
  );
}
