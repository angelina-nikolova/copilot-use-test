import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/ui/Navigation';

export function Layout() {
  return (
    <div className="bg-gradient-to-br from-gray-50 dark:from-gray-950 via-gray-50 dark:via-gray-900 to-blue-50/30 dark:to-gray-900 min-h-screen">
      <Navigation />

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
}
