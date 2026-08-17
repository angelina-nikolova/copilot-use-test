import { format } from 'date-fns';
import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { JournalEntry } from '../../../types/journal.types';
import { MOOD_LABELS } from '../../../types/journal.types';

interface JournalCardProps {
  entry: JournalEntry;
  onDelete?: (id: string) => void;
}

export function JournalCard({ entry, onDelete }: JournalCardProps) {
  const formattedDate = format(new Date(entry.date), 'MMMM d, yyyy');
  const preview = entry.content.length > 150 
    ? entry.content.slice(0, 150) + '...' 
    : entry.content;

  return (
    <article className="group before:absolute relative before:inset-0 bg-white dark:bg-gray-800 before:bg-gradient-to-br before:from-primary-50/0 hover:before:from-primary-50/50 dark:hover:before:from-primary-900/20 before:to-transparent hover:shadow-xl p-6 border border-gray-200 hover:border-primary-300 dark:border-gray-700 dark:hover:border-primary-700 rounded-xl overflow-hidden transition-all before:transition-all hover:-translate-y-1 duration-300 before:pointer-events-none fade-in">
      <div className="z-10 relative flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
          <Calendar className="w-4 h-4" />
          <time dateTime={entry.date}>{formattedDate}</time>
        </div>
        <div className="flex items-center gap-1">
          <Link
            to={`/journal/${entry.id}`}
            className="hover:bg-primary-50 dark:hover:bg-primary-900/20 p-1 rounded text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 transition-all duration-200"
            aria-label="Edit entry"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(entry.id)}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:scale-110 transition-all duration-200"
              aria-label="Delete entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="z-10 relative mb-4">
        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-50 dark:from-primary-900/30 to-blue-50 dark:to-blue-900/20 px-3 py-1.5 border border-primary-200 dark:border-primary-800 rounded-full text-xl">
          <span aria-hidden="true">{MOOD_LABELS[entry.mood].split(' ')[0]}</span>
          <span className="sr-only">Mood: {MOOD_LABELS[entry.mood]}</span>
        </span>
      </div>

      <Link 
        to={`/journal/${entry.id}`}
        className="block z-10 relative text-gray-700 hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-300 leading-relaxed transition-colors"
      >
        <p className="line-clamp-3 whitespace-pre-wrap">{preview}</p>
      </Link>
    </article>
  );
}
