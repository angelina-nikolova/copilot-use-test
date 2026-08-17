import { BookOpen } from 'lucide-react';
import { useJournalEntries } from '../features/journal/hooks/useJournalEntries';
import { JournalCard } from '../features/journal/components/JournalCard';
import { useState } from 'react';
import { Modal } from '../components/ui/Modal';

export function JournalsPage() {
  const { entries, loading, error, deleteEntry } = useJournalEntries();
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
      <div className="flex flex-col justify-center items-center gap-4 min-h-[60vh]" role="status" aria-live="polite" aria-label="Loading journal entries">
        <div className="border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full w-16 h-16 animate-spin" aria-hidden="true" />
        <div className="font-medium text-gray-500 dark:text-gray-400">Loading journal entries...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl fade-in">
      <div className="mb-10">
        <h1 className="bg-clip-text bg-gradient-to-r from-gray-900 dark:from-white to-primary-700 dark:to-primary-400 mb-3 font-bold text-gray-900 text-transparent dark:text-white text-5xl">
          My Journals
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          <span className="font-semibold text-primary-600 dark:text-primary-400">{entries.length}</span> {entries.length === 1 ? 'entry' : 'entries'} total
        </p>
      </div>

      {error && (
        <div role="alert" aria-live="assertive" aria-atomic="true" className="slide-in-left bg-red-50 dark:bg-red-900/20 mb-6 p-4 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      {entries.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 dark:from-gray-800/50 to-blue-50/50 dark:to-blue-900/10 py-20 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-2xl text-center fade-in">
          <BookOpen className="mx-auto mb-6 w-20 h-20 text-primary-400 dark:text-primary-500" />
          <p className="mb-2 font-semibold text-gray-900 dark:text-white text-2xl">No journal entries yet</p>
          <p className="mb-6 text-gray-600 dark:text-gray-400 text-lg">
            Start documenting your daily thoughts and moods
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <JournalCard 
              key={entry.id}
              entry={entry} 
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

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
