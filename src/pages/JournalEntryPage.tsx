import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { JournalForm } from '../features/journal/components/JournalForm';
import { useJournalEntries } from '../features/journal/hooks/useJournalEntries';
import { journalService } from '../features/journal/journal.service';
import type { JournalEntry } from '../types/journal.types';
import type { JournalEntryFormData } from '../features/journal/journal.schema';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export function JournalEntryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { saveEntry } = useJournalEntries();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isNewEntry = id === 'new';

  useEffect(() => {
    if (isNewEntry) {
      setLoading(false);
      return;
    }

    if (!id) {
      navigate('/');
      return;
    }

    journalService.getById(id).then((data) => {
      if (!data) {
        setError('Journal entry not found');
      } else {
        setEntry(data);
      }
      setLoading(false);
    }).catch(() => {
      setError('Failed to load journal entry');
      setLoading(false);
    });
  }, [id, isNewEntry, navigate]);

  const handleSubmit = async (data: JournalEntryFormData) => {
    try {
      await saveEntry({
        date: data.date,
        mood: data.mood,
        content: data.content,
      });
      navigate('/journals');
    } catch (err) {
      console.error('Failed to save entry:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 min-h-[60vh]">
        <div className="border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full w-16 h-16 animate-spin" />
        <div className="font-medium text-gray-500 dark:text-gray-400 loading-dots">Loading</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="slide-in-left bg-red-50 dark:bg-red-900/20 p-6 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl fade-in">
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 mb-8 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400 transition-all duration-200"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back</span>
      </button>

      <div className="mb-10">
        <h1 className="bg-clip-text bg-gradient-to-r from-gray-900 dark:from-white to-primary-700 dark:to-primary-400 mb-3 font-bold text-gray-900 text-transparent dark:text-white text-5xl">
          {isNewEntry ? '✨ New Journal Entry' : '✏️ Edit Journal Entry'}
        </h1>
        {entry && (
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            📅 {format(new Date(entry.date), 'MMMM d, yyyy')}
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-xl p-8 border border-gray-200 dark:border-gray-700 rounded-2xl">
        <JournalForm
          defaultValues={entry ? {
            date: entry.date,
            mood: entry.mood,
            content: entry.content,
          } : undefined}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          submitLabel={isNewEntry ? 'Create Entry' : 'Update Entry'}
        />
      </div>
    </div>
  );
}
