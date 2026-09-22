import type { ButtonHTMLAttributes, ReactNode } from "react";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function AppButton({ children, className = "", ...props }: AppButtonProps) {
  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  );
}