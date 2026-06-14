"use client";

// app/[locale]/(auth)/_components/AuthFields.tsx

import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
} from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Shared input style
// ─────────────────────────────────────────────────────────────────────────────

const baseInput =
  "h-12 w-full rounded-xl border border-input bg-background/80 ps-11 pe-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground/60 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/10";

// ─────────────────────────────────────────────────────────────────────────────
// AuthInput
// ─────────────────────────────────────────────────────────────────────────────

export type AuthInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> & {
  label: string;
  icon: LucideIcon;
  error?: string;
  hint?: string;
};

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  function AuthInput({ label, icon: Icon, error, hint, id, ...props }, ref) {
    const generated = useId();
    const inputId   = id ?? generated;
    const errorId   = `${inputId}-error`;
    const hintId    = `${inputId}-hint`;

    return (
      <div className="grid gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
          {props.required && (
            <span className="ms-1 text-destructive" aria-hidden="true">*</span>
          )}
        </label>

        <div className="relative">
          <Icon
            className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70"
            aria-hidden="true"
          />
          <input
            ref={ref}
            id={inputId}
            className={baseInput}
            aria-invalid={Boolean(error)}
            aria-describedby={
              [error ? errorId : null, hint ? hintId : null]
                .filter(Boolean)
                .join(" ") || undefined
            }
            {...props}
          />
        </div>

        {hint && !error && (
          <p id={hintId} className="text-xs text-muted-foreground">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// PasswordInput
// ─────────────────────────────────────────────────────────────────────────────

export type PasswordInputProps = Omit<AuthInputProps, "type"> & {
  showLabel: string;
  hideLabel: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { label, icon: Icon, error, hint, showLabel, hideLabel, id, ...props },
    ref,
  ) {
    const [visible, setVisible] = useState(false);
    const generated = useId();
    const inputId   = id ?? generated;
    const errorId   = `${inputId}-error`;
    const hintId    = `${inputId}-hint`;

    return (
      <div className="grid gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
          {props.required && (
            <span className="ms-1 text-destructive" aria-hidden="true">*</span>
          )}
        </label>

        <div className="relative">
          <Icon
            className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70"
            aria-hidden="true"
          />
          <input
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            className={`${baseInput} pe-11`}
            aria-invalid={Boolean(error)}
            aria-describedby={
              [error ? errorId : null, hint ? hintId : null]
                .filter(Boolean)
                .join(" ") || undefined
            }
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? hideLabel : showLabel}
            aria-pressed={visible}
            className="absolute end-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {visible
              ? <EyeOff className="size-4" aria-hidden="true" />
              : <Eye    className="size-4" aria-hidden="true" />}
          </button>
        </div>

        {hint && !error && (
          <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  },
);