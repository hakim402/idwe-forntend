"use client";

import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
} from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

type AuthInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> & {
  label: string;
  icon: LucideIcon;
  error?: string;
};

const inputClassName =
  "h-12 w-full rounded-xl border border-input bg-background/80 ps-11 pe-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground/70 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60";

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  function AuthInput({ label, icon: Icon, error, id, ...props }, ref) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="grid gap-2">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <div className="relative">
          <Icon
            className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            ref={ref}
            id={inputId}
            className={inputClassName}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
        </div>
        {error ? (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

type PasswordInputProps = Omit<AuthInputProps, "type"> & {
  showLabel: string;
  hideLabel: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { label, icon: Icon, error, showLabel, hideLabel, id, ...props },
    ref,
  ) {
    const [isVisible, setIsVisible] = useState(false);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="grid gap-2">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <div className="relative">
          <Icon
            className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            ref={ref}
            id={inputId}
            type={isVisible ? "text" : "password"}
            className={`${inputClassName} pe-11`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
          <button
            type="button"
            onClick={() => setIsVisible((current) => !current)}
            className="absolute end-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={isVisible ? hideLabel : showLabel}
            aria-pressed={isVisible}
          >
            {isVisible ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {error ? (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
