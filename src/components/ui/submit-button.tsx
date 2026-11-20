"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  className,
  ...buttonProps
}: {
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "type">) {
  const { pending } = useFormStatus();

  return (
    <button {...buttonProps} className={className} disabled={pending || buttonProps.disabled} type="submit">
      {pending ? "처리 중..." : children}
    </button>
  );
}
