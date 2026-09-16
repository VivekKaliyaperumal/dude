"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonVariant } from "@/components/ui/Button";

type Props = {
  children: string;
  pendingLabel?: string;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
};

export function SubmitButton({ children, pendingLabel = "Sending", variant = "ink", arrow, className }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={variant} arrow={arrow} disabled={pending} aria-disabled={pending} className={className}>
      {pending ? `${pendingLabel}...` : children}
    </Button>
  );
}
