interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="slide-in-left bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
      <div className="flex items-start gap-3">
        <span className="text-xl" role="img" aria-label="warning">
          ⚠️
        </span>
        <p className="flex-1">{message}</p>
      </div>
    </div>
  );
}
