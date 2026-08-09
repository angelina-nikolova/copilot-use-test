import { useState, useEffect, useCallback } from 'react';
import { journalService } from '../journal.service';
import type { JournalEntry, JournalEntryInput } from '../../../types/journal.types';

interface UseJournalEntriesResult {
  entries: JournalEntry[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  saveEntry: (input: JournalEntryInput) => Promise<JournalEntry>;
  deleteEntry: (id: string) => Promise<void>;
}

export function useJournalEntries(): UseJournalEntriesResult {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await journalService.getAll();
      setEntries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load journal entries');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveEntry = useCallback(async (input: JournalEntryInput): Promise<JournalEntry> => {
    try {
      const saved = await journalService.save(input);
      await refresh();
      return saved;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save journal entry';
      setError(message);
      throw new Error(message);
    }
  }, [refresh]);

  const deleteEntry = useCallback(async (id: string): Promise<void> => {
    try {
      await journalService.delete(id);
      await refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete journal entry';
      setError(message);
      throw new Error(message);
    }
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    entries,
    loading,
    error,
    refresh,
    saveEntry,
    deleteEntry,
  };
}
