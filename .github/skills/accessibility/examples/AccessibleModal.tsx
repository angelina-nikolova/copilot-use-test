import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

export function AccessibleModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousFocus = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        previousFocus?.focus();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen]);

  const handleBackdropKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setIsOpen(true)}>
        Open dialog
      </button>

      {isOpen ? (
        <div
          role="presentation"
          onClick={() => setIsOpen(false)}
          onKeyDown={handleBackdropKeyDown}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)" }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(32rem, calc(100vw - 2rem))",
              margin: "4rem auto",
              background: "white",
              borderRadius: 8,
              padding: "1.5rem",
              boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
              outline: "none",
            }}
          >
            <h2 id={titleId}>Delete item?</h2>
            <p>This action cannot be undone. Please confirm if you want to continue.</p>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button type="button" onClick={() => setIsOpen(false)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
