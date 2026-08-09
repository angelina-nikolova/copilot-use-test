import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 dark:from-gray-800/50 to-blue-50/50 dark:to-blue-900/10 py-20 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-2xl text-center fade-in">
      <Icon className="mx-auto mb-6 w-20 h-20 text-primary-400 dark:text-primary-500" />
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-2xl">{title}</h3>
      {description && (
        <p className="mb-6 text-gray-600 dark:text-gray-400 text-lg">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
