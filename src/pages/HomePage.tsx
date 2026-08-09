import { BookOpen, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useJournalEntries } from '../features/journal/hooks/useJournalEntries';
import { JournalCard } from '../features/journal/components/JournalCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { format } from 'date-fns';

export function HomePage() {
  const { entries, loading, error, deleteEntry } = useJournalEntries();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Get entries from current month
  const currentMonth = format(new Date(), 'yyyy-MM');
  const currentMonthEntries = entries.filter(entry => 
    entry.date.startsWith(currentMonth)
  );

  const totalEntries = entries.length;
  const thisMonthCount = currentMonthEntries.length;

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteEntry(deleteId);
        setDeleteId(null);
      } catch (err) {
        console.error('Failed to delete entry:', err);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 min-h-[60vh]">
        <div className="border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full w-16 h-16 animate-spin" />
        <div className="font-medium text-gray-500 dark:text-gray-400 loading-dots">Loading</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl fade-in">
      <div className="mb-10">
        <h1 className="bg-clip-text bg-gradient-to-r from-gray-900 dark:from-white to-primary-700 dark:to-primary-400 mb-3 font-bold text-gray-900 text-transparent dark:text-white text-5xl">
          Daily Journal
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Welcome back! Keep track of your thoughts and moods every day.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="gap-4 grid grid-cols-2 mb-10">
        <div className="group bg-gradient-to-br from-white dark:from-gray-800 to-primary-50/30 dark:to-primary-900/10 shadow-lg hover:shadow-xl p-8 border border-gray-200 dark:border-gray-700 rounded-2xl transition-all hover:-translate-y-1 duration-300">
          <div className="mb-2 font-bold text-primary-600 dark:text-primary-400 text-4xl group-hover:scale-110 transition-transform">
            {totalEntries}
          </div>
          <div className="font-medium text-gray-600 dark:text-gray-400">Total Entries</div>
        </div>
        <div className="group bg-gradient-to-br from-white dark:from-gray-800 to-blue-50/30 dark:to-blue-900/10 shadow-lg hover:shadow-xl p-8 border border-gray-200 dark:border-gray-700 rounded-2xl transition-all hover:-translate-y-1 duration-300">
          <div className="mb-2 font-bold text-primary-600 dark:text-primary-400 text-4xl group-hover:scale-110 transition-transform">
            {thisMonthCount}
          </div>
          <div className="font-medium text-gray-600 dark:text-gray-400">This Month</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-8">
        <Link to="/journal/new" className="flex-1">
          <Button variant="primary" className="flex justify-center items-center gap-2 w-full">
            <PlusCircle className="w-5 h-5" />
            Add Today's Entry
          </Button>
        </Link>
        <Link to="/journals" className="flex-1">
          <Button variant="secondary" className="flex justify-center items-center gap-2 w-full">
            <BookOpen className="w-5 h-5" />
            View All Journals
          </Button>
        </Link>
      </div>

      {/* Recent Entries */}
      <div>
        <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-2xl">
          Recent Entries
        </h2>
        
        {error && (
          <div className="slide-in-left bg-red-50 dark:bg-red-900/20 mb-6 p-4 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
            ⚠️ {error}
          </div>
        )}

        {entries.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-50 dark:from-gray-800/50 to-blue-50/50 dark:to-blue-900/10 py-16 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-2xl text-center fade-in">
            <BookOpen className="mx-auto mb-6 w-16 h-16 text-primary-400 dark:text-primary-500" />
            <p className="mb-2 font-semibold text-gray-900 dark:text-white text-xl">
              No journal entries yet
            </p>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Start writing your first entry!
            </p>
            <Link to="/journal/new">
              <Button variant="primary" size="lg">✨ Create First Entry</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.slice(0, 3).map((entry) => (
              <JournalCard key={entry.id} entry={entry} onDelete={handleDeleteClick} />
            ))}
            {entries.length > 3 && (
              <div className="pt-4 text-center">
                <Link to="/journals">
                  <Button variant="secondary">View All {entries.length} Entries</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteId !== null}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Journal Entry"
        message="Are you sure you want to delete this journal entry? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
