/**
 * sidebar-context.tsx — Sidebar collapse + mobile open state
 *
 * Provides:
 *   collapsed     — desktop sidebar is in icon-only mode
 *   setCollapsed  — toggle collapse
 *   mobileOpen    — mobile drawer is visible
 *   setMobileOpen
 *   toggleMobile  — flip mobileOpen
 *   sidebarWidth  — current width in px (72 collapsed / 256 expanded)
 *
 * Width constants live ONLY here. Sidebar.tsx and DashboardMain.tsx both
 * read `sidebarWidth` from this context instead of hardcoding 256/72 in
 * two places — that duplication is what caused the double-margin bug.
 *
 * Wrap the dashboard layout with <SidebarProvider>.
 * Consume with useSidebar() in Sidebar, DashboardMain, and DashboardHeader.
 */
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ─── Width constants — single source of truth ─────────────────────────────────

export const SIDEBAR_EXPANDED_W  = 256; // px — w-64
export const SIDEBAR_COLLAPSED_W = 72;  // px — w-18

// ─── Context shape ────────────────────────────────────────────────────────────

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  toggleMobile: () => void;
  /** Current sidebar width in px — derived from `collapsed` */
  sidebarWidth: number;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = useCallback(() => setCollapsed((p) => !p), []);
  const toggleMobile     = useCallback(() => setMobileOpen((p) => !p), []);

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_W : SIDEBAR_EXPANDED_W;

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggleCollapsed,
        mobileOpen,
        setMobileOpen,
        toggleMobile,
        sidebarWidth,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("[useSidebar] must be used inside <SidebarProvider>");
  }
  return ctx;
}