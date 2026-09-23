"use client";

import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type ShellProps = { id: string; label: string; required?: boolean; error?: string; className?: string; children: ReactNode };

function Shell({ id, label, required, error, className, children }: ShellProps) {
  return (
    <div className={cn("grid content-start gap-[7px]", className)}>
      <label htmlFor={id} className="label-mono text-muted">
        {label}
        {required ? (
          <>
            <span aria-hidden className="text-bronze">
              {" "}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[12.5px] leading-snug text-bronze">
          {error}
        </p>
      ) : null}
    </div>
  );
}

// 16px below `tight`: iOS Safari zooms the page when a focused control is under 16px.
const control =
  "w-full border bg-card px-4 text-base text-ink transition-colors focus:border-green tight:text-sm motion-reduce:transition-none";
const controlState = (error?: string) => (error ? "border-bronze" : "border-line-2");
const height = (tall?: boolean) => (tall ? "h-[62px]" : "h-12");

type Base = { label: string; name: string; error?: string; tall?: boolean; className?: string };

export function TextField({
  label,
  name,
  error,
  tall,
  className,
  required,
  ...rest
}: Base & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "className">) {
  const id = useId();
  return (
    <Shell id={id} label={label} required={required} error={error} className={className}>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, controlState(error), height(tall))}
        {...rest}
      />
    </Shell>
  );
}

export function SelectField({
  label,
  name,
  error,
  tall,
  className,
  required,
  placeholder,
  options,
  ...rest
}: Base & { placeholder?: string; options: readonly string[] } & Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "name" | "className" | "children"
  >) {
  const id = useId();
  return (
    <Shell id={id} label={label} required={required} error={error} className={className}>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, controlState(error), height(tall))}
        {...rest}
      >
        {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Shell>
  );
}

export function TextareaField({
  label,
  name,
  error,
  className,
  required,
  ...rest
}: Omit<Base, "tall"> & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "className">) {
  const id = useId();
  return (
    <Shell id={id} label={label} required={required} error={error} className={className}>
      <textarea
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, controlState(error), "block min-h-[120px] resize-y py-3.5")}
        {...rest}
      />
    </Shell>
  );
}
