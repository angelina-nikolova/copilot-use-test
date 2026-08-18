import { useMemo, useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, format, addMonths, subMonths } from 'date-fns';
import type { JournalEntry } from '../../../types/journal.types';

export interface CalendarDay {
  date: Date;
  dateString: string; // YYYY-MM-DD
  isCurrentMonth: boolean;
  isToday: boolean;
  entry: JournalEntry | null;
}

interface UseMoodCalendarResult {
  currentMonth: Date;
  calendarDays: CalendarDay[];
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
}

export function useMoodCalendar(entries: JournalEntry[]): UseMoodCalendarResult {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => startOfMonth(new Date()));

  const entryByDate = useMemo(() => {
    const map = new Map<string, JournalEntry>();
    for (const entry of entries) {
      map.set(entry.date, entry);
    }
    return map;
  }, [entries]);

  const calendarDays = useMemo<CalendarDay[]>(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const todayString = format(new Date(), 'yyyy-MM-dd');

    return eachDayOfInterval({ start: calStart, end: calEnd }).map((date) => {
      const dateString = format(date, 'yyyy-MM-dd');
      return {
        date,
        dateString,
        isCurrentMonth: date >= monthStart && date <= monthEnd,
        isToday: dateString === todayString,
        entry: entryByDate.get(dateString) ?? null,
      };
    });
  }, [currentMonth, entryByDate]);

  const goToPreviousMonth = () => setCurrentMonth((m) => startOfMonth(subMonths(m, 1)));
  const goToNextMonth = () => setCurrentMonth((m) => startOfMonth(addMonths(m, 1)));
  const goToToday = () => setCurrentMonth(startOfMonth(new Date()));

  return { currentMonth, calendarDays, goToPreviousMonth, goToNextMonth, goToToday };
}
