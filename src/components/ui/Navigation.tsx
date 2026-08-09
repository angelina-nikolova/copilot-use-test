import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Plus } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="top-0 z-50 sticky bg-white/80 dark:bg-gray-800/80 shadow-sm backdrop-blur-md border-gray-200/50 dark:border-gray-700/50 border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="group flex items-center gap-2 font-bold text-gray-900 hover:text-primary-600 dark:hover:text-primary-400 dark:text-white text-xl transition-colors">
            <img src="/logo.avif" alt="Daily Journal Logo" className="w-8 h-8 group-hover:scale-110 transition-transform" />
            Daily Journal
          </Link>

          <div className="flex gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 dark:from-primary-900/30 dark:to-primary-900/20 dark:text-primary-400 shadow-sm scale-105'
                  : 'text-gray-600 hover:bg-gray-100/70 dark:text-gray-400 dark:hover:bg-gray-700/70 hover:scale-105'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/journals"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/journals')
                  ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 dark:from-primary-900/30 dark:to-primary-900/20 dark:text-primary-400 shadow-sm scale-105'
                  : 'text-gray-600 hover:bg-gray-100/70 dark:text-gray-400 dark:hover:bg-gray-700/70 hover:scale-105'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="hidden sm:inline">My Journals</span>
            </Link>
            <Link
              to="/journal/new"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/journal')
                  ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 dark:from-primary-900/30 dark:to-primary-900/20 dark:text-primary-400 shadow-sm scale-105'
                  : 'text-gray-600 hover:bg-gray-100/70 dark:text-gray-400 dark:hover:bg-gray-700/70 hover:scale-105'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New Entry</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
