import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { JournalEntry } from '../../../types/journal.types';
import { useMoodCalendar } from '../hooks/useMoodCalendar';
import { useNavigate } from 'react-router-dom';

const MOOD_COLORS: Record<string, string> = {
  very_happy: 'bg-emerald-400 dark:bg-emerald-500',
  happy: 'bg-green-300 dark:bg-green-500',
  neutral: 'bg-amber-300 dark:bg-amber-400',
  sad: 'bg-orange-400 dark:bg-orange-500',
  very_sad: 'bg-red-400 dark:bg-red-500',
};

const MOOD_TEXT_COLORS: Record<string, string> = {
  very_happy: 'text-emerald-900 dark:text-emerald-100',
  happy: 'text-green-900 dark:text-green-100',
  neutral: 'text-amber-900 dark:text-amber-100',
  sad: 'text-orange-900 dark:text-orange-100',
  very_sad: 'text-red-900 dark:text-red-100',
};

const MOOD_SHORT_LABELS: Record<string, string> = {
  very_happy: 'Great',
  happy: 'Good',
  neutral: 'Okay',
  sad: 'Low',
  very_sad: 'Bad',
};

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface MoodCalendarProps {
  entries: JournalEntry[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

export function MoodCalendar({ entries, selectedDate, onSelectDate }: MoodCalendarProps) {
  const { currentMonth, calendarDays, goToPreviousMonth, goToNextMonth, goToToday } =
    useMoodCalendar(entries);
  const navigate = useNavigate();

  const handleDayClick = (dateString: string, entry: JournalEntry | null) => {
    if (entry) {
      if (selectedDate === dateString) {
        onSelectDate(null);
      } else {
        onSelectDate(dateString);
      }
    }
  };

  const handleDayDoubleClick = (entry: JournalEntry | null) => {
    if (entry) {
      navigate(`/journal/${entry.id}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 mb-8 p-5 border border-gray-200 dark:border-gray-700 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-white text-lg">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToToday}
            className="hover:bg-primary-50 dark:hover:bg-primary-900/20 px-2 py-1 rounded-lg font-medium text-primary-600 dark:text-primary-400 text-xs transition-colors"
          >
            Today
          </button>
          <button
            type="button"
            aria-label="Previous month"
            onClick={goToPreviousMonth}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 rounded-lg text-gray-600 dark:text-gray-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={goToNextMonth}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 rounded-lg text-gray-600 dark:text-gray-400 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week day headers */}
      <div className="gap-1 grid grid-cols-7 mb-1">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="py-1 font-medium text-center text-gray-500 dark:text-gray-400 text-xs">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="gap-1 grid grid-cols-7">
        {calendarDays.map(({ date, dateString, isCurrentMonth, isToday, entry }) => {
          const isSelected = selectedDate === dateString;
          const moodColor = entry ? MOOD_COLORS[entry.mood] : null;
          const moodTextColor = entry ? MOOD_TEXT_COLORS[entry.mood] : null;

          return (
            <button
              key={dateString}
              type="button"
              aria-label={`${format(date, 'MMMM d, yyyy')}${entry ? `, mood: ${MOOD_SHORT_LABELS[entry.mood]}` : ', no entry'}`}
              aria-pressed={isSelected}
              disabled={!entry}
              onClick={() => handleDayClick(dateString, entry)}
              onDoubleClick={() => handleDayDoubleClick(entry)}
              className={[
                'relative flex flex-col items-center justify-center rounded-lg min-h-[44px] sm:min-h-[52px] text-xs transition-all duration-150',
                isCurrentMonth ? '' : 'opacity-30',
                entry ? 'cursor-pointer' : 'cursor-default',
                moodColor ?? 'bg-gray-50 dark:bg-gray-700/50',
                isSelected ? 'ring-2 ring-primary-500 ring-offset-1 scale-105' : '',
                isToday && !entry ? 'ring-1 ring-primary-400 ring-offset-1' : '',
                entry ? 'hover:scale-105 hover:shadow-md' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span
                className={[
                  'font-medium text-sm leading-none',
                  entry ? (moodTextColor ?? '') : 'text-gray-600 dark:text-gray-400',
                  isToday ? 'underline underline-offset-2' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {format(date, 'd')}
              </span>
              {entry && (
                <span className={`mt-0.5 text-[10px] leading-none font-medium ${moodTextColor ?? ''} opacity-80`}>
                  {MOOD_SHORT_LABELS[entry.mood]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        {Object.entries(MOOD_SHORT_LABELS).map(([mood, label]) => (
          <div key={mood} className="flex items-center gap-1.5">
            <span className={`inline-block w-3 h-3 rounded-sm ${MOOD_COLORS[mood]}`} aria-hidden="true" />
            <span className="text-gray-600 dark:text-gray-400 text-xs">{label}</span>
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => onSelectDate(null)}
            className="text-primary-600 dark:text-primary-400 text-xs underline underline-offset-2 hover:no-underline"
          >
            Clear filter — show all entries
          </button>
        </div>
      )}
    </div>
  );
}
