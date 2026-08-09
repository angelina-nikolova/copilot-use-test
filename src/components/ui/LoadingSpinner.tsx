interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text = 'Loading' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-16 h-16 border-4',
    lg: 'w-24 h-24 border-4',
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div
        className={`${sizeClasses[size]} border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <div className="font-medium text-gray-500 dark:text-gray-400 loading-dots">
          {text}
        </div>
      )}
    </div>
  );
}
