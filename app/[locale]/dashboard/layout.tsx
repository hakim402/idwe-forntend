// app/[locale]/dashboard/layout.tsx
//
// Shell layout for all /dashboard/* pages.
//
// Width sync: Sidebar.tsx and DashboardMain.tsx both read sidebarWidth
// from the same useSidebar() context — there is exactly one place that
// owns the offset (DashboardMain's margin), so there's no risk of the
// content being pushed twice.

import { SidebarProvider } from "@/contexts/sidebar-context";
import { Sidebar }         from "./_components/Sidebar/Sidebar";
import { DashboardMain }   from "./_components/DashboardMain";
import { getLocale }       from "next-intl/server";

const RTL_LOCALES = new Set(["ar", "fa", "ps"]);

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const isRtl  = RTL_LOCALES.has(locale);

  return (
    <SidebarProvider>
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="flex min-h-screen bg-background"
      >
        <Sidebar isRtl={isRtl} />
        <DashboardMain>{children}</DashboardMain>
      </div>
    </SidebarProvider>
  );
}