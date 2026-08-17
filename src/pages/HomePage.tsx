import { Accessibility, BookOpen, Code2, FileText, PlusCircle } from 'lucide-react';
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
          <div role="alert" aria-live="assertive" aria-atomic="true" className="slide-in-left bg-red-50 dark:bg-red-900/20 mb-6 p-4 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
            <strong>Error:</strong> {error}
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
              <Button variant="primary" size="lg">Create First Entry</Button>
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

      <section className="mt-12 pt-8 border-gray-200 dark:border-gray-700 border-t">
        <div className="mb-6">
          <p className="mb-2 font-semibold text-primary-600 dark:text-primary-400 text-xs uppercase tracking-[0.2em]">
            Custom agent options
          </p>
          <h2 className="font-bold text-gray-900 dark:text-white text-3xl">
            Tailored AI review workflows
          </h2>
        </div>

        <div className="gap-6 grid md:grid-cols-3">
          <article className="bg-white dark:bg-gray-800 shadow-sm p-6 border border-gray-200 dark:border-gray-700 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-50 dark:bg-primary-900/30 p-2.5 rounded-xl text-primary-600 dark:text-primary-400">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-xl">Documentation writer</h3>
            </div>

            <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm leading-6">
              Agent can do any type of task, but it should be customized for it.
            </p>

            <ul className="space-y-3 text-gray-700 dark:text-gray-200 text-sm leading-6">
              <li>• Create a custom agent in VS Code to update README and documentation automatically.</li>
              <li>• Compare changes against previous commits to decide what should be documented and what should remain unchanged.</li>
              <li>• Generate development and contribution guidance files that reflect the current project state.</li>
            </ul>
          </article>

          <article className="bg-white dark:bg-gray-800 shadow-sm p-6 border border-gray-200 dark:border-gray-700 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2.5 rounded-xl text-blue-600 dark:text-blue-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-xl">Code reviewer</h3>
            </div>

            <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm leading-6">
              Review components, hooks, recent changes, and application performance while staying focused on code quality.
            </p>

            <ul className="space-y-3 text-gray-700 dark:text-gray-200 text-sm leading-6">
              <li>• Inspect component structure, hook logic, and recent diffs.</li>
              <li>• Highlight possible regressions and performance bottlenecks.</li>
              <li>• Use the custom reviewer agent directly in VS Code with the file or selection selected.</li>
            </ul>
          </article>

          <article className="bg-white dark:bg-gray-800 shadow-sm p-6 border border-gray-200 dark:border-gray-700 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2.5 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Accessibility className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-xl">Accessibility reviewer</h3>
            </div>

            <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm leading-6">
              Help check if pages, components, forms, buttons, and menus comply with accessibility standards and usability expectations.
            </p>

            <ul className="space-y-3 text-gray-700 dark:text-gray-200 text-sm leading-6">
              <li>• Audit keyboard support, focus states, labels, contrast, and error handling.</li>
              <li>• Validate flow quality for forms, navigation, and interactive controls.</li>
              <li>• Review production issues with specific guidance for meaningful accessibility fixes.</li>
            </ul>
          </article>
        </div>
      </section>

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
