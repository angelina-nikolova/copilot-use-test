import { BookOpen, Search } from 'lucide-react';
import { useJournalEntries } from '../features/journal/hooks/useJournalEntries';
import { JournalCard } from '../features/journal/components/JournalCard';
import { MoodCalendar } from '../features/journal/components/MoodCalendar';
import { useState } from 'react';
import { useMemo, useState } from 'react';
import { Modal } from '../components/ui/Modal';

// For large journals, move filtering into the journal service and query Supabase with .ilike() plus pagination instead of loading every entry into the browser.

export function JournalsPage() {
  const { entries, loading, deleteEntry } = useJournalEntries();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredEntries = selectedDate
    ? entries.filter((e) => e.date === selectedDate)
    : entries;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return entries;
    }

    return entries.filter((entry) =>
      entry.content.toLowerCase().includes(query),
    );
  }, [entries, searchQuery]);

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
        <h1 className="mb-3 font-bold text-gray-900 dark:text-white text-5xl">
          My Journals
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-lg">
          <span className="font-semibold text-primary-600 dark:text-primary-400">
            {filteredEntries.length}
          </span>{' '}
          {filteredEntries.length === 1 ? 'entry' : 'entries'} shown
        </p>
      </div>

      <div className="relative mb-6">
        <Search
          className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2"
          aria-hidden="true"
        />
        <label htmlFor="journal-search" className="sr-only">
          Search journal entries
        </label>
        <input
          id="journal-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search your journals..."
          className="bg-white dark:bg-gray-900 px-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full text-gray-900 dark:text-white"
        />
      </div>

      {filteredEntries.length === 0 ? (
        <div className="py-20 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-2xl text-center">
          <BookOpen className="mx-auto mb-6 w-20 h-20 text-primary-400" />
          <p className="mb-2 font-semibold text-gray-900 dark:text-white text-2xl">
            {searchQuery ? 'No matching entries' : 'No journal entries yet'}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery
              ? 'Try a different search term.'
              : 'Start documenting your daily thoughts and moods.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
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
