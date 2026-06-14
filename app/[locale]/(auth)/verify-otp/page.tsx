// app/[locale]/(auth)/verify-otp/page.tsx

import type { Metadata } from "next";
import AuthShell from "../_components/AuthShell";
import VerifyOtpForm from "../_components/VerifyOtpForm";

export const metadata: Metadata = {
  title:       "Verify Code | IDWE",
  description: "Enter the secure code sent to your email address.",
};

export default function VerifyOtpPage() {
  return (
    <AuthShell mode="verify-otp">
      <VerifyOtpForm />
    </AuthShell>
  );
}