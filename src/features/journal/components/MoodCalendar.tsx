import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isToday,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { JournalEntry, MoodType } from '../../../types/journal.types';
import { MOOD_LABELS } from '../../../types/journal.types';

const MOOD_COLORS: Record<MoodType, string> = {
  very_happy: 'bg-emerald-400 dark:bg-emerald-500',
  happy: 'bg-green-300 dark:bg-green-400',
  neutral: 'bg-yellow-300 dark:bg-yellow-400',
  sad: 'bg-orange-300 dark:bg-orange-400',
  very_sad: 'bg-red-400 dark:bg-red-500',
};

const MOOD_RING_COLORS: Record<MoodType, string> = {
  very_happy: 'ring-emerald-400 dark:ring-emerald-500',
  happy: 'ring-green-300 dark:ring-green-400',
  neutral: 'ring-yellow-300 dark:ring-yellow-400',
  sad: 'ring-orange-300 dark:ring-orange-400',
  very_sad: 'ring-red-400 dark:ring-red-500',
};

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface MoodCalendarProps {
  entries: JournalEntry[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

export function MoodCalendar({ entries, selectedDate, onSelectDate }: MoodCalendarProps) {
  const [viewDate, setViewDate] = useState(() => new Date());

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Map date strings to entries for quick lookup
  const entryByDate = new Map<string, JournalEntry>();
  for (const entry of entries) {
    entryByDate.set(entry.date, entry);
  }

  const leadingBlanks = getDay(monthStart);

  const handleDayClick = (dateStr: string) => {
    onSelectDate(selectedDate === dateStr ? null : dateStr);
  };

  const handlePrevMonth = () => setViewDate((d) => subMonths(d, 1));
  const handleNextMonth = () => setViewDate((d) => addMonths(d, 1));

  return (
    <section
      aria-label="Mood calendar"
      className="bg-white dark:bg-gray-800 p-5 border border-gray-200 dark:border-gray-700 rounded-xl"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          aria-label="Previous month"
          className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="font-semibold text-gray-900 dark:text-white text-base">
          {format(viewDate, 'MMMM yyyy')}
        </h2>

        <button
          type="button"
          onClick={handleNextMonth}
          aria-label="Next month"
          className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day-of-week labels */}
      <div className="gap-1 grid grid-cols-7 mb-1">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="py-1 font-medium text-center text-gray-400 dark:text-gray-500 text-xs"
            aria-hidden="true"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="gap-1 grid grid-cols-7">
        {/* Leading blanks */}
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <div key={`blank-${i}`} />
        ))}

        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const entry = entryByDate.get(dateStr);
          const isSelected = selectedDate === dateStr;
          const todayDate = isToday(day);

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => handleDayClick(dateStr)}
              aria-label={`${format(day, 'MMMM d, yyyy')}${entry ? `, mood: ${MOOD_LABELS[entry.mood]}` : ''}`}
              aria-pressed={isSelected}
              className={[
                'relative flex flex-col items-center justify-center rounded-lg aspect-square text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                isSelected
                  ? 'bg-primary-100 dark:bg-primary-900/40 ring-2 ring-primary-500 dark:ring-primary-400 text-primary-700 dark:text-primary-300'
                  : entry
                  ? `${MOOD_RING_COLORS[entry.mood]} ring-1 hover:ring-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50`
                  : todayDate
                  ? 'text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50',
              ].join(' ')}
            >
              {/* Today indicator */}
              {todayDate && (
                <span className="top-0.5 right-0.5 absolute bg-primary-500 rounded-full w-1.5 h-1.5" aria-hidden="true" />
              )}

              <span>{format(day, 'd')}</span>

              {/* Mood dot */}
              {entry && (
                <span
                  className={`mt-0.5 w-2 h-2 rounded-full ${MOOD_COLORS[entry.mood]}`}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        {(Object.entries(MOOD_LABELS) as [MoodType, string][]).map(([mood, label]) => (
          <div key={mood} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${MOOD_COLORS[mood]}`} aria-hidden="true" />
            <span className="text-gray-500 dark:text-gray-400 text-xs">{label.split(' ').slice(1).join(' ')}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
