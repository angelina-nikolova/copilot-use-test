import type { MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonType = "button" | "submit" | "reset";

interface AccessibleButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  type?: ButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function AccessibleButton({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  ariaLabel,
  className = "",
}: AccessibleButtonProps) {
  const resolvedClassName = [
    "btn",
    variant === "primary" ? "btn-primary" : "btn-secondary",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={resolvedClassName}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? (typeof children === "string" ? children : undefined)}
    >
      {children}
    </button>
  );
}

export function ButtonExample() {
  return (
    <div className="flex gap-3">
      <AccessibleButton variant="primary" onClick={() => console.log("Saved") }>
        Save changes
      </AccessibleButton>

      <AccessibleButton variant="secondary" ariaLabel="Close dialog">
        Close
      </AccessibleButton>
    </div>
  );
}